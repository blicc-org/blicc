import { useContext } from 'react'
import { useApiEndpoint } from './useApiEndpoint'
import { API_URL } from '../../config'
import { AppContext, INITIAL_APP_STATE } from '../context/AppContext'
import { ToastContext } from '../context/ToastContext'
import statusCode from 'http-status-codes'

export function useSession() {
  const [open, , , close] = useApiEndpoint(`${API_URL}/sessions`)
  const [appState, setAppState] = useContext(AppContext)
  const [toasts, showToast] = useContext(ToastContext)

  async function login(email, password) {
    const [status, data] = await open({ email, password })
    if (status === statusCode.ACCEPTED) {
      setAppState({
        ...appState,
        loggedIn: true,
        firstName: data.firstName,
        lastName: data.lastName,
      })
      showToast('Login', 'You just successfully logged in.')
    }
  }

  async function logout() {
    const [status] = await close()
    if (status === statusCode.RESET_CONTENT) {
      setAppState(INITIAL_APP_STATE)
    }
  }

  return [login, logout]
}
