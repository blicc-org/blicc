import { useContext } from 'react'
import statusCode from 'http-status-codes'
import axios from 'axios'
import { AppContext } from '../context'
import { API } from '../../config'

export function useApiEndpoint(path = '') {
  const [appState, setAppState] = useContext(AppContext)
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
    if (status === statusCode.UNAUTHORIZED || status === statusCode.NOT_FOUND) {
      await axios.delete('/tokens', {
        baseURL: API.ORIGIN,
        withCredentials: true,
      })
      setAppState({
        ...appState,
        id: '',
        firstName: '',
        lastName: '',
        loggedIn: false,
      })
    }
    return status >= 200 && status < 500
  }

  return [create, access, update, remove]
}
