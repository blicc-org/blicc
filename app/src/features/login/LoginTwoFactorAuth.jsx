import React from 'react'
import { Lock } from 'react-feather'

export function LoginTwoFactorAuth({ setToken, login }) {
  return (
    <form className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Two-Factor Auth</h1>
      <div className="checkbox mb-3">
        Provide the six digit token from your chosen authentication device.
      </div>
      <label htmlFor="token" className="sr-only">
        Token
      </label>
      <div className="input-group mb-3 px-5">
        <input
          className="form-control"
          type="text"
          onChange={(event) => setToken(event.target.value)}
          autoComplete="off"
          required
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <Lock size={18} />
          </span>
        </div>
      </div>
      <button
        title="Submit two-factor authentication"
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        onClick={login}
      >
        Authenticate
      </button>
    </form>
  )
}
