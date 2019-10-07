import React from 'react'
import { AppProvider } from './AppContext'
import { ToastProvider } from './ToastContext'
import { ModalProvider } from './ModalContext'
import { SidebarProvider } from './SidebarContext'

export function Provider({ children }) {
  return (
    <AppProvider>
      <SidebarProvider>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </SidebarProvider>
    </AppProvider>
  )
}
