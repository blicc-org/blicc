import { useContext } from 'react'
import { useApiEndpoint } from './useApiEndpoint'
import { API_URL } from '../config'
import { AppContext, INITIAL_APP_STATE } from '../context/AppContext'
import statusCode from 'http-status-codes'
import { ToastContext } from '../context/ToastContext'
import { ModalContext } from '../context/ModalContext'

export function useSession() {
  const [open, , , close] = useApiEndpoint(`${API_URL}/sessions`)
  const [appState, setAppState] = useContext(AppContext)
  const [, showToast] = useContext(ToastContext)
  const [, showModal] = useContext(ModalContext)

  async function login(email, password) {
    const [status, data] = await open({ email, password })
    if (status === statusCode.ACCEPTED) {
      setAppState({
        ...appState,
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        loggedIn: true,
      })
    } else if (status === statusCode.FORBIDDEN) {
      showModal(
        'Did you forget your password?',
        'In case you cannot remember your password, we can send you an email to reset it.',
        'Try again',
        'Reset password',
        () => {},
        () => {
          console.log('send reset link to email!')
        },
        '/'
      )
    } else if (status === statusCode.NOT_FOUND) {
      showToast('Please register', 'No account for the given email.')
    } else {
      showToast('Login error', 'Login process failed.')
    }
  }

  async function logout() {
    const [status] = await close()
    if (status === statusCode.NO_CONTENT) {
      setAppState(INITIAL_APP_STATE)
    } else {
      showToast('Logout error', 'The logout proccess failed.')
    }
  }

  return [login, logout]
}
