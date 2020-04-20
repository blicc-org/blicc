import React, { ReactElement } from 'react'
import './Modal.scss'

export function Modal({ show, content }: any): ReactElement {
  const modal = content()
  return (
    <>
      <div
        className={`modal fade ${show ? 'show' : ''}`}
        style={{ display: show ? 'block' : 'none' }}
      >
        {modal}
      </div>
      <div className={show ? 'modal-backdrop fade show' : ''}></div>
    </>
  )
}
