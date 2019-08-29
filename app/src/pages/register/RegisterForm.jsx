import React, { useState } from 'react'

export default function RegisterForm() {
  const [confirm, setConfirm] = useState(true)

  return (
    <div
      className="col-md-4 mx-auto py-5 my-5 text-center"
      style={{ maxWidth: '500px' }}
    >
      <button onClick={() => setConfirm(!confirm)}>Hallo</button>
      <h1 className="h3 mb-3 font-weight-normal">Register</h1>
      <form className="needs-validation">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="John"
              required
            />
            <div className="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Doe"
              required
            />
            <div className="invalid-feedback">Valid last name is required.</div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="you@example.com"
            required
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
          <div className="invalid-feedback">Please enter your password.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="address">
            Password<span className="text-muted"> (Re-enter)</span>
          </label>
          <input
            type="password"
            className={`form-control ${confirm ? 'is-valid' : 'is-invalid'}`}
            id="password_confirm"
            placeholder="Password Confirmation"
            required
          />
          <div className="invalid-feedback">
            Please confirm your password with the exact same characters.
          </div>
        </div>
        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Register
        </button>
      </form>
    </div>
  )
}
