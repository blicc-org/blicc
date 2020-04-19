import { useEffect, useContext } from 'react'
import { useApiEndpoint } from './useApiEndpoint'
import { AppContext } from '../context'
import { useLogout } from './useLogout'

export function useAutoLogout(): void {
  const logoutInMs = 10000
  const [appState] = useContext(AppContext)
  const [, healthCheck, ,] = useApiEndpoint('/health-check/auth')
  const logout = useLogout()

  useEffect(() => {
    async function checkStatus() {
      if (appState.loggedIn) {
        await healthCheck()
      }
    }

    const refreshIntervalId = setInterval(checkStatus, logoutInMs)
    return () => clearInterval(refreshIntervalId)
  }, [healthCheck, logout, appState])
}
