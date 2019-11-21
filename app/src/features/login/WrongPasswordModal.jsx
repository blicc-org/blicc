import React from 'react'

export function WrongPasswordModal({ cancel, submit }) {
  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Title</h5>
            <button onClick={cancel} type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              You just entered the wrong password. Do you want to request a
              reset password email?
            </p>
          </div>
          <div className="modal-footer">
            <button
              onClick={cancel}
              type="button"
              className="btn btn-outline-secondary"
            >
              Send Email
            </button>
            <button onClick={submit} type="button" className="btn btn-primary">
              Try it again
            </button>
          </div>
        </div>
      </div>
    </>
  )
}