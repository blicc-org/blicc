import { useContext } from 'react'
import { useApiEndpoint } from '../useApiEndpoint'
import { API_URL } from '../../../config'
import { AppContext } from '../../context/AppContext'
import statusCode from 'http-status-codes'

export function useSession() {
  const [open, , , close] = useApiEndpoint(`${API_URL}/sessions`)
  const [appState, setAppState] = useContext(AppContext)

  async function login(email, password) {
    const [status, data] = await open({ email, password })
    if (status === statusCode.ACCEPTED) {
      setAppState({
        ...appState,
        loggedIn: true,
        firstName: data.firstName,
        lastName: data.lastName,
      })
    }
  }

  async function logout() {
    const [status] = await close()
    if (status === statusCode.RESET_CONTENT) {
      setAppState({ ...appState, loggedIn: false })
    }
  }

  return [login, logout]
}
