import { useEffect, useContext } from 'react'
import statusCode from 'http-status-codes'
import axios from 'axios'
import { API } from '../../config'
import { useApiEndpoint } from './useApiEndpoint'
import { AppContext } from '../context'

export function useAutoLogout() {
  const [appState, setAppState] = useContext(AppContext)
  const [, healthCheck, ,] = useApiEndpoint('/health-check/auth')

  useEffect(() => {
    async function checkStatus() {
      if (appState.loggedIn) {
        const [status] = await healthCheck()
        if (
          status === statusCode.NOT_FOUND ||
          status === statusCode.UNAUTHORIZED
        ) {
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
      }
    }

    const refreshIntervalId = setInterval(checkStatus, 10000)
    return () => clearInterval(refreshIntervalId)
  }, [healthCheck, appState, setAppState])
}
