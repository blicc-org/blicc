import { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../context'

export function useModal(
  content: any,
  references: Array<any> = []
): Array<any> {
  const [showModalHandler, hideModalHandler] = useContext(ModalContext)
  const [show, setShow] = useState(false)

  function showModal(): void {
    showModalHandler(content)
    setShow(true)
  }

  function hideModal(): void {
    hideModalHandler()
    setShow(false)
  }

  useEffect(() => {
    if (show) showModalHandler(content)
    // eslint-disable-next-line
  }, [...references, show])

  return [showModal, hideModal]
}
