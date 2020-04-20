import React, { useState, ReactElement } from 'react'
import { ToastContainer } from '../components/toast/ToastContainer'

export const ToastContext = React.createContext<Array<any>>([])

export function ToastProvider({ children }: any): ReactElement {
  const [toasts, setToasts] = useState([])

  function showToast(label: string, message: string, type: string): void {
    setToasts((prev: any) => {
      if (prev.filter((e: any) => e.label === label).length > 0) return prev
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
