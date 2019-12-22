import React, { useState } from 'react'

export const SettingsContext = React.createContext()

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({})
  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  )
}
