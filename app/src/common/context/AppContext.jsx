import { createContext } from 'react'

export const INITIAL_APP_STATE = {
  loggedIn: false,
  firstName: '',
  lastName: '',
}

export const AppContext = createContext()
export const { Provider: AppProvider, Consumer: AppConsumer } = AppContext
