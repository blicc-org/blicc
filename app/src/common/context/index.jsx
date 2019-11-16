export { AppContext, INITIAL_APP_STATE } from './AppContext'
export { DragContext } from './DragContext'
export { ModalContext } from './ModalContext'
export { SidebarContext } from './SidebarContext'
export { SubscriberContext } from './SubscriberContext'
export { ToastContext } from './ToastContext'

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
