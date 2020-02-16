import { useContext } from 'react'
import { AppContext } from '../context'
import { API } from '../../config'

export function useLogout() {
  const [appState, setAppState] = useContext(AppContext)

  async function logout() {
    await fetch(`${API.ORIGIN}/tokens`, {
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
