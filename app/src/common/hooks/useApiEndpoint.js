import statusCode from 'http-status-codes'
import { API } from '../../config'
import { useLogout } from './useLogout'

export function useApiEndpoint(path = '') {
  const fullPath = `${API.ORIGIN}${path}`
  const logout = useLogout()

  const defaultConfig = {
    credentials: 'include',
  }

  async function postRequest(resource, config = {}) {
    return await handleRes(
      await fetch(fullPath, {
        ...defaultConfig,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resource),
        ...config,
      })
    )
  }

  async function getRequest(config = {}) {
    var url = new URL(fullPath)
    if (config.params) {
      url.search = new URLSearchParams(config.params).toString()
    }
    return await handleRes(
      await fetch(url, {
        ...defaultConfig,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        ...config,
      })
    )
  }

  async function putRequest(resource, config = {}) {
    return handleRes(
      await fetch(fullPath, {
        ...defaultConfig,
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resource),
        ...config,
      })
    )
  }

  async function deleteRequest(config = {}) {
    return handleRes(
      await fetch(fullPath, {
        ...defaultConfig,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        ...config,
      })
    )
  }

  async function handleRes(res) {
    const { status } = res
    let result = [status, {}]

    if (status === statusCode.NO_CONTENT) return result

    if (
      status === statusCode.UNAUTHORIZED ||
      status === statusCode.FORBIDDEN ||
      isHealthCheckInvalid(status)
    ) {
      await logout()
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
