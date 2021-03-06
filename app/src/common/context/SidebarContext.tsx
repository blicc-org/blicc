import React, { createContext, useState, ReactElement } from 'react'

export const INITIAL_SIDEBAR_STATE = {
  open: false,
}

export const SidebarContext = createContext<Array<any>>([])
export const { Consumer: SidebarConsumer } = SidebarContext

export function SidebarProvider({ children }: any): ReactElement {
  const [sidebarState, setSidebarState] = useState(INITIAL_SIDEBAR_STATE)

  return (
    <SidebarContext.Provider value={[sidebarState, setSidebarState]}>
      {children}
    </SidebarContext.Provider>
  )
}
