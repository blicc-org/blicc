import React, { useState } from 'react'

export const ToastContext = React.createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [key, setKey] = useState(0)

  function showToast(label, message, type = 'info') {
    let copy = [...toasts]

    copy.push({
      key,
      label,
      message,
      type,
    })

    setKey(key + 1)
    setToasts(copy)

    setTimeout(() => {
      let copy = [...toasts]
      copy.pop()
      setToasts(copy)
    }, 5000)
  }

  return (
    <ToastContext.Provider value={[toasts, showToast]}>
      {children}
    </ToastContext.Provider>
  )
}
