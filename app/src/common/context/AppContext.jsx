import React, { createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const INITIAL_APP_STATE = {
  loggedIn: false,
  firstName: '',
  lastName: '',
}

export const AppContext = createContext()
export const { Consumer: AppConsumer } = AppContext

export function AppProvider({ children }) {
  const [appState, setAppState] = useLocalStorage(
    'app_state',
    INITIAL_APP_STATE
  )

  return (
    <AppContext.Provider value={[appState, setAppState]}>
      {children}
    </AppContext.Provider>
  )
}
