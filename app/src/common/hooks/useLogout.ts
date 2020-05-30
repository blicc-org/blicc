import { useContext } from 'react'
import { AppContext } from '../context'
import { API } from '../../config'

type Logout = () => Promise<void>

export function useLogout(): Logout {
  const [appState, setAppState] = useContext(AppContext)

  async function logout(): Promise<void> {
    await fetch(`${API.ORIGIN}/tokens`, {
      credentials: 'include',
      method: 'DELETE',
    })
    setAppState({
      ...appState,
      id: '',
      firstName: '',
      lastName: '',
      loggedIn: false,
      refreshToken: '',
    })
  }

  return logout
}
