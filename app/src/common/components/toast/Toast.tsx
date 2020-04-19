import React, { useState } from 'react'

export function Toast({ label, message, type = '' }: any) {
  const [hidden, setHidden] = useState(false)
  const types = ['primary', 'success', 'danger', 'info', 'warning']

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
          <div
            className={`toast-header ${
              types.includes(type) ? 'bg-' + type : ''
            }`}
          >
            <strong
              className={`mr-auto ${types.includes(type) ? 'text-light' : ''}`}
            >
              {label}
            </strong>
            <button
              title="Close hint"
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
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
