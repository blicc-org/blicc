import React, { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'

export function Modal() {
  const [modal] = useContext(ModalContext)
  const {
    isActive,
    label,
    message,
    cancelLabel,
    submitLabel,
    cancel,
    submit,
  } = modal

  return (
    <>
      <div
        className={`modal fade ${isActive ? 'show' : ''}`}
        style={{ display: isActive ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{label}</h5>
              <button onClick={cancel} type="button" className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button
                onClick={cancel}
                type="button"
                className="btn btn-outline-secondary"
              >
                {cancelLabel}
              </button>
              <button
                onClick={submit}
                type="button"
                className="btn btn-primary"
              >
                {submitLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={isActive ? 'modal-backdrop fade show' : ''}></div>
    </>
  )
}
