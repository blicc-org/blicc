import React from 'react'

export function ToastContainer() {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style="position: relative; min-height: 200px;"
    >
      <div style="position: absolute; top: 0; right: 0;">Put toasts here!</div>
    </div>
  )
}
