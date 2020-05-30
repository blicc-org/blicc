import { useContext } from 'react'
import { AppContext } from '../context'
import { API } from '../../config'

type Refresh = () => Promise<boolean>

export function useRefresh(): Refresh {
  const [appState] = useContext(AppContext)

  async function refresh(): Promise<boolean> {
    const { id, refreshToken } = appState
    const resp = await fetch(`${API.ORIGIN}/refresh`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, refreshToken }),
    })
    return resp.status === 202
  }

  return refresh
}
