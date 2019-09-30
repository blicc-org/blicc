import axios from 'axios'

export function useApiEndpoint(path) {
  const config = { withCredentials: true }

  async function create(resource) {
    try {
      const { data, status } = await axios.post(path, resource, config)
      return [status, data]
    } catch (e) {
      throw e
    }
  }

  async function access() {
    try {
      const { data, status } = await axios.get(path, config)
      return [status, data]
    } catch (e) {
      throw e
    }
  }

  async function update(resource) {
    try {
      const { data, status } = await axios.put(path, resource, config)
      return [status, data]
    } catch (e) {
      throw e
    }
  }

  async function remove() {
    try {
      const { data, status } = await axios.delete(path, config)
      return [status, data]
    } catch (e) {
      throw e
    }
  }

  return [create, access, update, remove]
}
