import { useContext } from 'react'
import { useApiEndpoint } from './useApiEndpoint'
import { API_URL } from '../../config'
import { AppContext, INITIAL_APP_STATE } from '../context/AppContext'
import { ToastContext } from '../context/ToastContext'
import statusCode from 'http-status-codes'

export function useSession() {
  const [open, , , close] = useApiEndpoint(`${API_URL}/sessions`)
  const [appState, setAppState] = useContext(AppContext)
  const [, showToast] = useContext(ToastContext)

  async function login(email, password) {
    const [status, data] = await open({ email, password })
    if (status === statusCode.ACCEPTED) {
      setAppState({
        ...appState,
        loggedIn: true,
        firstName: data.firstName,
        lastName: data.lastName,
      })
      showToast('Login', 'The login was successful.')
    }
  }

  async function logout() {
    const [status] = await close()
    if (status === statusCode.NO_CONTENT) {
      setAppState(INITIAL_APP_STATE)
      showToast('Logout', 'The logout was successful.')
    }
  }

  return [login, logout]
}
