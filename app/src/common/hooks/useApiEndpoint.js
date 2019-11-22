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

  async function create(resource, config = {}) {
    const { data, status } = await instance.post(path, resource, config)
    return [status, data]
  }

  async function access(config = {}) {
    const { data, status } = await instance.get(path, config)
    return [status, data]
  }

  async function update(resource, config = {}) {
    const { data, status } = await instance.put(path, resource, config)
    return [status, data]
  }

  async function remove(config = {}) {
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

  return [create, access, update, remove]
}
