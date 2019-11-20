import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../context'
import { API } from '../../config'

export function useLogout() {
  const [appState, setAppState] = useContext(AppContext)

  async function logout() {
    await axios.delete('/tokens', {
      baseURL: API.ORIGIN,
    })
    setAppState({
      ...appState,
      id: '',
      firstName: '',
      lastName: '',
      loggedIn: false,
    })
  }

  return logout
}
