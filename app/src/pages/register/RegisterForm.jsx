import React from 'react'

export default function RegisterForm() {
  return (
    <div
      className="col-md-4 mx-auto py-5 my-5 text-center"
      style={{ maxWidth: '500px' }}
    >
      <h1 className="h3 mb-3 font-weight-normal">Register</h1>
      <form className="needs-validation" novalidate>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="John"
              value=""
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
              value=""
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
          />
          <div className="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
          <div className="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address">
            Password<span className="text-muted"> (Re-enter)</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
          <div className="invalid-feedback">
            Please enter your shipping address.
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
