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
    redirect: '',
  })

  function showModal(
    label,
    message,
    cancelLabel,
    submitLabel,
    cancelCallback,
    submitCallback,
    redirect = ''
  ) {
    async function cancel() {
      const redirect = await cancelCallback()
      setModal(prev => {
        return { ...prev, isActive: false, redirect }
      })
    }

    async function submit() {
      const redirect = await submitCallback()
      setModal(prev => {
        return { ...prev, isActive: false, redirect }
      })
    }

    setModal({
      isActive: true,
      label,
      message,
      cancelLabel,
      submitLabel,
      cancel,
      submit,
      redirect,
    })
  }

  return (
    <ModalContext.Provider value={[modal, showModal]}>
      {children}
    </ModalContext.Provider>
  )
}
