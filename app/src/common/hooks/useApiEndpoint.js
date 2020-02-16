import statusCode from 'http-status-codes'
import { API } from '../../config'
import { useLogout } from './useLogout'
import { useRefresh } from './useRefresh'

export function useApiEndpoint(path = '') {
  var fullPath = `${API.ORIGIN}${path}`
  const logout = useLogout()
  const refresh = useRefresh()

  const defaultConfig = {
    credentials: 'include',
  }

  async function postRequest(resource, config = {}) {
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

  async function getRequest(config = {}) {
    if (config.url) fullPath = config.url
    var url = new URL(fullPath)
    if (config.params) {
      url.search = new URLSearchParams(config.params).toString()
    }
    return await handleRequest(url, {
      ...defaultConfig,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      ...config,
    })
  }

  async function putRequest(resource, config = {}) {
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

  async function deleteRequest(config = {}) {
    return handleRequest(fullPath, {
      ...defaultConfig,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    })
  }

  async function handleRequest(url, config) {
    const res = await fetch(url, config)
    const { status } = res
    let result = [status, {}]

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

    return [status, await res.json()]
  }

  function isHealthCheckInvalid(status) {
    return (
      (status === statusCode.BAD_REQUEST || status === statusCode.NOT_FOUND) &&
      path.startsWith('/health-check')
    )
  }

  return [postRequest, getRequest, putRequest, deleteRequest]
}
