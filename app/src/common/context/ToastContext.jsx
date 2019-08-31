import React, { useState } from 'react'

const DEFAULT_STATE = {
  show: false,
  displayText: '',
  type: 'info',
  timeOut: 5000,
}

export const ToastContext = React.createContext(DEFAULT_STATE)

export function ToastProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE)

  function showToast(
    message,
    type = DEFAULT_STATE.type,
    timeOut = DEFAULT_STATE.timeOut
  ) {
    setState({
      show: true,
      message,
      type,
      timeOut,
    })
    setTimeout(() => {
      setState({
        show: false,
        message: '',
        type: '',
        timeOut,
      })
    }, state.timeOut)
  }

  return (
    <ToastContext.Provider value={{ ...state, showToast }}>
      {children}
    </ToastContext.Provider>
  )
}
