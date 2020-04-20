import React, { createContext, ReactElement } from 'react'
import { useLocalStorage } from '../hooks'

function useBrowserLanguage(): string {
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
  refreshToken: '',
  role: '',
}

export const AppContext = createContext<Array<any>>([])
export const { Consumer: AppConsumer } = AppContext

export function AppProvider({ children }: any): ReactElement {
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
