import React, { createContext } from 'react'
import { useSessionStorage } from '../hooks'

export const INITIAL_FEATURES = {
  installed: false,
}

export const FeatureContext = createContext()
export const { Consumer: FeatureConsumer } = FeatureContext

export function FeatureProvider({ children }) {
  const [features, setFeatures] = useSessionStorage(
    'app_session_state',
    INITIAL_FEATURES
  )
  return (
    <FeatureContext.Provider value={[features, setFeatures]}>
      {children}
    </FeatureContext.Provider>
  )
}
