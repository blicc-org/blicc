import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { ModalContext } from '../../context'

export function Modal() {
  const [modal] = useContext(ModalContext)
  const [isCompleted, setIsCompleted] = useState(false)
  const {
    isActive,
    label,
    message,
    cancelLabel,
    submitLabel,
    cancel,
    submit,
    redirect,
  } = modal

  function submitHandler() {
    setIsCompleted(true)
    submit()
  }

  return (
    <>
      {isCompleted && (
        <Redirect to={redirect} />
      ) /* reset isCompleted after redirect */}
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
                onClick={submitHandler}
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
