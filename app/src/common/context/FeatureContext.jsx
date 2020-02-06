import React, { createContext, useState } from 'react'

export const INITIAL_FEATURES = {
  installed: false,
}

export const FeatureContext = createContext()
export const { Consumer: FeatureConsumer } = FeatureContext

export function FeatureProvider({ children }) {
  const [features, setFeatures] = useState(INITIAL_FEATURES)

  return (
    <FeatureContext.Provider value={[features, setFeatures]}>
      {children}
    </FeatureContext.Provider>
  )
}
