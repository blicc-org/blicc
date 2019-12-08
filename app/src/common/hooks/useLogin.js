import { useContext } from 'react'
import statusCode from 'http-status-codes'
import { useToast } from '../hooks'
import { useApiEndpoint } from './useApiEndpoint'
import { AppContext } from '../context'

export function useLogin(onSuccess = () => {}, onFailure = () => {}) {
  const [open, , ,] = useApiEndpoint('/tokens')
  const [appState, setAppState] = useContext(AppContext)
  const showToast = useToast()

  async function login(email, password, token = '') {
    const requestBody =
      token === '' ? { email, password } : { email, password, token }
    let hasTwoFactorAuth = false

    const [status, data] = await open(requestBody)

    if (status === statusCode.OK) {
      hasTwoFactorAuth = true
    } else if (status === statusCode.ACCEPTED) {
      setAppState({
        ...appState,
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        loggedIn: true,
      })
      onSuccess()
    } else if (status === statusCode.FORBIDDEN) {
      onFailure()
    } else if (status === statusCode.NOT_FOUND) {
      showToast('Please register', 'No account for the given email.', 'warning')
    } else {
      showToast('Login error', 'Login process failed.', 'danger')
    }
    return hasTwoFactorAuth
  }

  return login
}
