import React from 'react'

export function Input({
  children,
  size,
  isSubmitted = false,
  isValid = false,
  feedback = 'Please provide a corresponding value.',
  ...props
}) {
  return (
    <div className={size}>
      <label>{children}</label>
      <input
        className={`form-control ${
          isSubmitted ? (isValid ? 'is-valid' : 'is-invalid') : ''
        }`}
        required
        {...props}
      />
      <div className="invalid-feedback">{feedback}</div>
    </div>
  )
}
