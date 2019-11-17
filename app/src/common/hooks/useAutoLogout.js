import { useEffect, useContext } from 'react'
import { useApiEndpoint } from './useApiEndpoint'
import { AppContext } from '../context'

export function useAutoLogout() {
  const [appState] = useContext(AppContext)
  const { loggedIn, id } = appState
  const [, access, ,] = useApiEndpoint(`/users/${id}`)

  useEffect(() => {
    async function checkStatus() {
      // auto logout triggered by useApiEndpoint on unauthorized
      if (loggedIn) await access()
    }

    const refreshIntervalId = setInterval(checkStatus, 10000)
    return () => clearInterval(refreshIntervalId)
  }, [loggedIn, access])
}
