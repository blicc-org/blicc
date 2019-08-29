import React, { useState } from 'react'
import { API_URL } from '../../config'
import { useApiEndpoint } from '../../util/useApiEndpoint'

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [create, , ,] = useApiEndpoint(`${API_URL}/users`)

  async function register(e) {
    e.preventDefault()
    const [status, data] = await create({
      email,
      password,
    })
    console.log(status)
    console.log(data)
  }

  return (
    <div
      className="col-md-4 mx-auto py-5 my-5 text-center"
      style={{ maxWidth: '500px' }}
    >
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
              onChange={e => setFirstName(e.target.value)}
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
              onChange={e => setLastName(e.target.value)}
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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
          />
          <div className="invalid-feedback">Please enter your password.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="address">
            Password<span className="text-muted"> (Re-enter)</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="password_confirm"
            placeholder="Password Confirmation"
            required
            onChange={e => setPasswordConfirm(e.target.value)}
          />
          <div className="invalid-feedback">
            Please confirm your password with the exact same characters.
          </div>
        </div>
        <hr className="mb-4" />
        <button
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          onClick={register}
        >
          Register
        </button>
      </form>
    </div>
  )
}
