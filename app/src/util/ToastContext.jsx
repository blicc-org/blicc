import React, { useState } from 'react'

const DEFAULT_STATE = {
  show: false,
  displayText: '',
  type: 'info',
  timeOut: 5000,
}

export const SnackBarContext = React.createContext(DEFAULT_STATE)

export function SnackBarProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE)

  function showSnackBar(
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
    <SnackBarContext.Provider value={{ ...state, showSnackBar }}>
      {children}
    </SnackBarContext.Provider>
  )
}
