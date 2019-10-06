import axios from 'axios'

export function useApiEndpoint(path) {
  const config = { withCredentials: true }

  async function create(resource) {
    const { data, status } = await axios.post(path, resource, config)
    return [status, data]
  }

  async function access() {
    const { data, status } = await axios.get(path, config)
    return [status, data]
  }

  async function update(resource) {
    const { data, status } = await axios.put(path, resource, config)
    return [status, data]
  }

  async function remove() {
    const { data, status } = await axios.delete(path, config)
    return [status, data]
  }

  return [create, access, update, remove]
}
