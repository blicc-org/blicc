import { useContext } from 'react'
import statusCode from 'http-status-codes'
import { useToast } from '.'
import { useEndpoint } from './useEndpoint'
import { AppContext } from '../context'

type Login = (
  email: string,
  password: string,
  token?: string
) => Promise<boolean>

export function useLogin(
  onSuccess = (): void => {},
  onFailure = (): void => {}
): Login {
  const [open, , ,] = useEndpoint('/tokens')
  const [appState, setAppState] = useContext(AppContext)
  const showToast = useToast()

  async function login(
    email: string,
    password: string,
    token = ''
  ): Promise<boolean> {
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
        refreshToken: data.refreshToken,
        firstName: data.firstName,
        lastName: data.lastName,
        loggedIn: true,
        role: data.role,
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
