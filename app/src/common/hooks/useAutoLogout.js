import { useEffect, useContext } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from './useApiEndpoint'
import { AppContext } from '../context'
import { useLogout } from './useLogout'

export function useAutoLogout() {
  const logoutInMs = 30000
  const [appState] = useContext(AppContext)
  const [, healthCheck, ,] = useApiEndpoint('/health-check/auth')
  const logout = useLogout()

  useEffect(() => {
    async function checkStatus() {
      if (appState.loggedIn) {
        const [status] = await healthCheck()
        if (
          status === statusCode.NOT_FOUND ||
          status === statusCode.UNAUTHORIZED
        ) {
          await logout()
        }
      }
    }

    const refreshIntervalId = setInterval(checkStatus, logoutInMs)
    return () => clearInterval(refreshIntervalId)
  }, [healthCheck, logout, appState])
}
