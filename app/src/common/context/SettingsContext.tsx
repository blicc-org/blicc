import React, { useState } from 'react'

export const SettingsContext = React.createContext<Array<any>>([])

export function SettingsProvider({ children }: any) {
  const [settings, setSettings] = useState({})
  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  )
}
