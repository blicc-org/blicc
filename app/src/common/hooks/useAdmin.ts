import { useContext } from 'react'
import { AppContext } from '../context'

export function useAdmin(): boolean {
  const [appState] = useContext(AppContext)
  const { role } = appState

  return role === 'admin'
}
