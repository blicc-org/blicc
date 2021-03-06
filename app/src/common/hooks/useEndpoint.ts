import statusCode from 'http-status-codes'
import { API } from '../../config'
import { useLogout } from './useLogout'
import { useRefresh } from './useRefresh'

export enum Accept {
  JSON = 'application/json',
  JPEG = 'image/jpeg',
}

export function useEndpoint(
  path = '',
  origin: string = API.ORIGIN,
  accept: Accept = Accept.JSON
): Array<any> {
  let fullPath = `${origin}${path}`
  const logout = useLogout()
  const refresh = useRefresh()

  const defaultConfig = {
    credentials: 'include',
  }

  async function postRequest(resource: any, config: any = {}): Promise<any> {
    return await handleRequest(fullPath, {
      ...defaultConfig,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
      ...config,
    })
  }

  async function getRequest(config: any = {}): Promise<any> {
    if (config.url) fullPath = config.url
    const url: any = new URL(fullPath)
    if (config.params) {
      url.search = new URLSearchParams(config.params).toString()
    }
    return await handleRequest(url, {
      ...defaultConfig,
      method: 'GET',
      headers: {
        Accept: accept,
      },
      ...config,
    })
  }

  async function putRequest(resource: any, config: any = {}): Promise<any> {
    return handleRequest(fullPath, {
      ...defaultConfig,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
      ...config,
    })
  }

  async function deleteRequest(config: any = {}): Promise<any> {
    return handleRequest(fullPath, {
      ...defaultConfig,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    })
  }

  async function handleRequest(url: string, config: any): Promise<Array<any>> {
    const res = await fetch(url, config)
    let data = null
    const { status } = res
    const result = [status, data]

    if (status === statusCode.NO_CONTENT) return result

    if (
      status === statusCode.UNAUTHORIZED ||
      status === statusCode.FORBIDDEN ||
      isHealthCheckInvalid(status)
    ) {
      if (await refresh()) {
        return await handleRequest(url, config)
      } else {
        await logout()
      }
      return result
    }

    if (status >= 400) return result

    if (accept === Accept.JSON) data = await res.json()
    if (accept === Accept.JPEG) data = await res.blob()

    return [status, data]
  }

  function isHealthCheckInvalid(status: any): boolean {
    return (
      (status === statusCode.BAD_REQUEST || status === statusCode.NOT_FOUND) &&
      path.startsWith('/health-check')
    )
  }

  return [postRequest, getRequest, putRequest, deleteRequest]
}
