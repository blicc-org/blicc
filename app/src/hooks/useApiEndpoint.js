import axios from 'axios'
import { API_ORIGIN } from '../config/env'

export function useApiEndpoint(path = '') {
  const instance = axios.create({
    baseURL: API_ORIGIN,
  })

  async function create(resource) {
    const { data, status } = await instance.post(path, resource)
    return [status, data]
  }

  async function access() {
    const { data, status } = await instance.get(path)
    return [status, data]
  }

  async function update(resource) {
    const { data, status } = await instance.put(path, resource)
    return [status, data]
  }

  async function remove() {
    const { data, status } = await instance.delete(path)
    return [status, data]
  }

  return [create, access, update, remove]
}
