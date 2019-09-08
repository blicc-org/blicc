import React, { useState } from 'react'

export function Toast({ label, message }) {
  const [hidden, setHidden] = useState(false)

  return (
    <>
      {!hidden && (
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ opacity: 100 }}
        >
          <div className="toast-header">
            <strong className="mr-auto">{label}</strong>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
              onClick={() => setHidden(true)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      )}
    </>
  )
}
