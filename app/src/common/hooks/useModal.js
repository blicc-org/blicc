import { useContext } from 'react'
import { ModalContext } from '../context'

export function useModal(content) {
  const [showModalHandler, hideModal] = useContext(ModalContext)

  function showModal() {
    showModalHandler(content)
  }

  return [showModal, hideModal]
}
