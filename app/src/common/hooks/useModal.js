import { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../context'

export function useModal(content, references = []) {
  const [showModalHandler, hideModalHandler] = useContext(ModalContext)
  const [show, setShow] = useState(false)

  function showModal() {
    showModalHandler(content)
    setShow(true)
  }

  function hideModal(){
    hideModalHandler()
    setShow(false)
  }

  useEffect(() => {
    if (show) showModalHandler(content)
    // eslint-disable-next-line
  }, [...references, show])

  return [showModal, hideModal]
}
