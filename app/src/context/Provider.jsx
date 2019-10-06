import React from 'react'
import { AppProvider } from './AppContext'
import { ToastProvider } from './ToastContext'
import { ModalProvider } from './ModalContext'
import { MenuProvider } from './MenuContext'

export function Provider({ children }) {
  return (
    <AppProvider>
      <MenuProvider>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </MenuProvider>
    </AppProvider>
  )
}
