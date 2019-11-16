import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from './AppContext'
import { SubscriberProvider } from './SubscriberContext'
import { SidebarProvider } from './SidebarContext'
import { ToastProvider } from './ToastContext'
import { ModalProvider } from './ModalContext'
import { DragProvider } from './DragContext'

export function Provider({ children }) {
  return (
    <HelmetProvider>
      <AppProvider>
        <SubscriberProvider>
          <SidebarProvider>
            <ToastProvider>
              <ModalProvider>
                <DragProvider>{children}</DragProvider>
              </ModalProvider>
            </ToastProvider>
          </SidebarProvider>
        </SubscriberProvider>
      </AppProvider>
    </HelmetProvider>
  )
}
