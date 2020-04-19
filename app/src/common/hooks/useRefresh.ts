import { useContext } from 'react'
import { AppContext } from '../context'
import { API } from '../../config'

export function useRefresh(): Function {
  const [appState] = useContext(AppContext)

  async function refresh() {
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
