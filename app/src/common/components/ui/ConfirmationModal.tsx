import React, { ReactElement } from 'react'

export function ConfirmationModal({
  title,
  description,
  submitPhrase,
  cancel,
  submit,
}: any): ReactElement {
  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              title="Close modal"
              onClick={cancel}
              type="button"
              className="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{description}</p>
          </div>
          <div className="modal-footer">
            <button
              title="Cancel modal"
              onClick={cancel}
              type="button"
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>
            <button
              title="Submit modal"
              onClick={submit}
              type="button"
              className="btn btn-danger"
            >
              {submitPhrase}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
