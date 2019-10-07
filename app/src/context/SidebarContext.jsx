import React, { createContext, useState } from 'react'

export const INITIAL_SIDEBAR_STATE = {
  open: false,
}

export const SidebarContext = createContext()
export const { Consumer: SidebarConsumer } = SidebarContext

export function SidebarProvider({ children }) {
  const [sidebarState, setSidebarState] = useState(INITIAL_SIDEBAR_STATE)

  return (
    <SidebarContext.Provider value={[sidebarState, setSidebarState]}>
      {children}
    </SidebarContext.Provider>
  )
}
