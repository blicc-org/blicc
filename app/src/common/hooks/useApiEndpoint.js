import statusCode from 'http-status-codes'
import axios from 'axios'
import { API } from '../../config'
import { useLogout } from './useLogout'

export function useApiEndpoint(path = '') {
  const logout = useLogout()
  const instance = axios.create({
    baseURL: API.ORIGIN,
    withCredentials: true,
    validateStatus,
  })

  async function postRequest(resource, config = {}) {
    const { data, status } = await instance.post(path, resource, config)
    return [status, data]
  }

  async function getRequest(config = {}) {
    const { data, status } = await instance.get(path, config)
    return [status, data]
  }

  async function putRequest(resource, config = {}) {
    const { data, status } = await instance.put(path, resource, config)
    return [status, data]
  }

  async function deleteRequest(config = {}) {
    const { data, status } = await instance.delete(path, config)
    return [status, data]
  }

  async function validateStatus(status) {
    // invalid authentication or deleted user
    if (
      status === statusCode.UNAUTHORIZED ||
      (status === statusCode.NOT_FOUND && path.startsWith('/health-check'))
    ) {
      await logout()
    }
    return status >= 200 && status < 500
  }

  return [postRequest, getRequest, putRequest, deleteRequest]
}
