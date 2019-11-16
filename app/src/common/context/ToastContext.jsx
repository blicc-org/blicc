import React, { useState } from 'react'

export const ToastContext = React.createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function showToast(label, message) {
    setToasts(prev => {
      if (prev.filter(e => e.label === label).length > 0) return prev
      return [{ label, message }, ...prev]
    })
    setTimeout(() => {
      setToasts(prev => prev.splice(0, prev.length - 1))
    }, 5000)
  }

  return (
    <ToastContext.Provider value={[toasts, showToast]}>
      {children}
    </ToastContext.Provider>
  )
}
