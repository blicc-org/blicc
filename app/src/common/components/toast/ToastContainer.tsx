import React, { useContext, ReactElement } from 'react'
import { Toast } from './Toast'
import { ToastContext } from '../../context'

export function ToastContainer(): ReactElement {
  const [toasts] = useContext(ToastContext)

  return (
    <div aria-live="polite" aria-atomic="true">
      <div style={{ position: 'absolute', top: '48px', right: '1rem' }}>
        {toasts.map(
          ({ label, message, type }: any): ReactElement => (
            <Toast key={label} label={label} message={message} type={type} />
          )
        )}
      </div>
    </div>
  )
}
