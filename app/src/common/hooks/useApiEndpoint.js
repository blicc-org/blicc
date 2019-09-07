import { useState } from 'react'
import axios from 'axios'
import code from 'http-status-codes'

export function useApiEndpoint(path) {
  const config = { withCredentials: true }
  const [storage, setStorage] = useState(null)

  async function create(resource) {
    const { data, status } = await axios.post(path, resource, config)
    if (status === code.CREATED) setStorage(resource)
    return [status, data]
  }

  async function access(forceApiRequest = false) {
    if (!forceApiRequest && storage !== null) return [code.OK, storage]
    const { data, status } = await axios.get(path, config)
    return [status, data]
  }

  async function update(resource) {
    const { data, status } = await axios.put(path, resource, config)
    if (status === code.NO_CONTENT) setStorage(resource)
    return [status, data]
  }

  async function remove() {
    const { data, status } = await axios.delete(path, config)
    if (status === code.NO_CONTENT) setStorage(null)
    return [status, data]
  }

  return [create, access, update, remove]
}
