import React from 'react'
import { Toast } from './Toast'

export function ToastContainer() {
  const toast1 = {
    key: 1,
    label: 'Register',
    message:
      'You successfully registered and are now able to use our new features to analyse your data.',
  }

  const toast2 = {
    key: 2,
    label: 'Login',
    message: 'You successfully logged in',
  }

  const toasts = [toast1, toast2]

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{ position: 'relative', minHeight: '200px' }}
    >
      <div
        style={{ position: 'absolute', top: 0, right: 0 }}
        className="moveUnderNavBar"
      >
        {toasts.map(({ key, label, message }) => {
          return <Toast key={key} label={label} message={message} />
        })}
      </div>
    </div>
  )
}
