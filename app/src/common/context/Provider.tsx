import React, { ReactElement } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from './AppContext'
import { SubscriberProvider } from './SubscriberContext'
import { SidebarProvider } from './SidebarContext'
import { ToastProvider } from './ToastContext'
import { ModalProvider } from './ModalContext'
import { DragProvider } from './DragContext'
import { SettingsProvider } from './SettingsContext'
import { ArrangementProvider } from './ArrangementContext'
import { QueryStackProvider } from './QueryStackContext'
import { FeatureProvider } from './FeatureContext'

export function Provider({ children }: any): ReactElement {
  return (
    <HelmetProvider>
      <AppProvider>
        <FeatureProvider>
          <SettingsProvider>
            <QueryStackProvider>
              <ArrangementProvider>
                <SubscriberProvider>
                  <SidebarProvider>
                    <ToastProvider>
                      <ModalProvider>
                        <DragProvider>{children}</DragProvider>
                      </ModalProvider>
                    </ToastProvider>
                  </SidebarProvider>
                </SubscriberProvider>
              </ArrangementProvider>
            </QueryStackProvider>
          </SettingsProvider>
        </FeatureProvider>
      </AppProvider>
    </HelmetProvider>
  )
}
