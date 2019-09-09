import React, { useContext } from 'react'
import { Toast } from './Toast'
import { ToastContext } from '../../helpers/context/ToastContext'

export function ToastContainer() {
  const [toasts] = useContext(ToastContext)

  return (
    <div aria-live="polite" aria-atomic="true">
      <div style={{ position: 'absolute', top: '48px', right: '1rem' }}>
        {toasts.map(({ label, message }) => (
          <Toast key={label} label={label} message={message} />
        ))}
      </div>
    </div>
  )
}
