import React from 'react'
import { AppProvider } from './AppContext'
import { ToastProvider } from './ToastContext'
import { ModalProvider } from './ModalContext'
import { SidebarProvider } from './SidebarContext'
import { SubscriberProvider } from './SubscriberContext'

export function Provider({ children }) {
  return (
    <AppProvider>
      <SubscriberProvider>
        <SidebarProvider>
          <ToastProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </SidebarProvider>
      </SubscriberProvider>
    </AppProvider>
  )
}
