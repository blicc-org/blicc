import React, { useState } from 'react'
import { Modal } from '../components/modal/Modal'

export const ModalContext = React.createContext<Array<any>>([])

export function ModalProvider({ children }: any) {
  const [modal, setModal] = useState({
    show: false,
    content: () => {
      return <></>
    },
  })
  const { show, content } = modal

  function showModal(content: any) {
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
