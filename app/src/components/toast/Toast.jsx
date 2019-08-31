import React from 'react'

export function Toast({ label, message }) {
  return (
    <div
      className="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ autohide: false }}
    >
      <div className="toast-header">
        <strong className="mr-auto">{label}</strong>
        <small className="text-muted">just now</small>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  )
}
