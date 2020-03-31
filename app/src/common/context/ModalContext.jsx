import React, { useState } from 'react'
import { Modal } from '../components/modal/Modal'

export const ModalContext = React.createContext()

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    show: false,
    content: () => {
      return <></>
    },
  })
  const { show, content } = modal

  function showModal(content) {
    setModal({ show: true, content })
  }

  function hideModal() {
    setModal((prev) => {
      return { ...prev, show: false }
    })
  }

  return (
    <ModalContext.Provider value={[showModal, hideModal]}>
      {children}
      <Modal show={show} content={content} />
    </ModalContext.Provider>
  )
}
