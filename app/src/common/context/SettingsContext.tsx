import React, { useState, ReactElement } from 'react'

export const SettingsContext = React.createContext<Array<any>>([])

export function SettingsProvider({ children }: any): ReactElement {
  const [settings, setSettings] = useState({})
  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  )
}
