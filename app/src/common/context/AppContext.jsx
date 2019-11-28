import React, { createContext } from 'react'
import { useLocalStorage } from '../hooks'

function useBrowserLanguage() {
  let language = 'en'
  if (navigator.language.toLowerCase().startsWith('de')) language = 'de'
  return language
}

export const INITIAL_APP_STATE = {
  id: '',
  firstName: '',
  lastName: '',
  loggedIn: false,
  language: useBrowserLanguage(),
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
