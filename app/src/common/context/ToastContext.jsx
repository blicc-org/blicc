import React, { useState } from 'react'
import { ToastContainer } from '../components/toast/ToastContainer'

export const ToastContext = React.createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function showToast(label, message, type) {
    setToasts((prev) => {
      if (prev.filter((e) => e.label === label).length > 0) return prev
      return [{ label, message, type }, ...prev]
    })
    setTimeout(() => {
      setToasts((prev) => prev.splice(0, prev.length - 1))
    }, 5000)
  }

  return (
    <ToastContext.Provider value={[toasts, showToast]}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}
