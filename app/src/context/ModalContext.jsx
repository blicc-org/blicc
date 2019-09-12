import React, { useState } from 'react'

export const ModalContext = React.createContext()

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    isActive: false,
    label: '',
    message: '',
    cancelLabel: '',
    submitLabel: '',
    cancel: () => {},
    submit: () => {},
  })

  function showModal(
    label,
    message,
    cancelLabel,
    submitLabel,
    cancelCallback,
    submitCallback
  ) {
    function cancel() {
      setModal(prev => {
        return { ...prev, isActive: false }
      })
      cancelCallback()
    }

    function submit() {
      setModal(prev => {
        return { ...prev, isActive: false }
      })
      submitCallback()
    }

    setModal({
      isActive: true,
      label,
      message,
      cancelLabel,
      submitLabel,
      cancel,
      submit,
    })
  }

  return (
    <ModalContext.Provider value={[modal, showModal]}>
      {children}
    </ModalContext.Provider>
  )
}
