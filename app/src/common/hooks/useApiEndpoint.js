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
    const res = await fetch(fullPath, {
      ...defaultConfig,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
      ...config,
    })
    const { status } = res
    const data = (await res.json()) || {}
    await checkForLogout(res.status)
    return [status, data]
  }

  async function getRequest(config = {}) {
    const res = await fetch(fullPath, {
      ...defaultConfig,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      ...config,
    })
    const { status } = res
    const data = status === 204 ? {} : await res.json()
    await checkForLogout(res.status)
    return [status, data]
  }

  async function putRequest(resource, config = {}) {
    const res = await fetch(fullPath, {
      ...defaultConfig,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
      ...config,
    })
    const { status } = res
    const data = (await res.json()) || {}
    await checkForLogout(res.status)
    return [status, data]
  }

  async function deleteRequest(config = {}) {
    const res = await fetch(fullPath, {
      ...defaultConfig,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    })
    const { status } = res
    const data = (await res.json()) || {}
    await checkForLogout(res.status)
    return [status, data]
  }

  async function checkForLogout(status) {
    // invalid authentication or deleted user
    if (
      status === statusCode.UNAUTHORIZED ||
      status === statusCode.FORBIDDEN ||
      (status === statusCode.BAD_REQUEST &&
        path.startsWith('/health-check'))
    ) {
      await logout()
    }
  }

  return [postRequest, getRequest, putRequest, deleteRequest]
}
