import { useApiEndpoint } from './useApiEndpoint'
import statusCode from 'http-status-codes'
import { AppContext } from '../context'

export function useAutoLogout() {
  const [, access, ,] = useApiEndpoint('/users')
  const [appState, setAppState] = useContext(AppContext)

  useEffect(() => {
    async function checkStatus() {
      const [status] = await access()
      if (status === statusCode.UNAUTHORIZED) {
        setAppState({ ...appState, loggedIn: false })
      }
    }

    const refreshIntervalId = setInterval(checkStatus, 10000)
    return () => clearInterval(refreshIntervalId)
  }, [])
}
