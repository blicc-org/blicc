import React from 'react'
import { Pin } from '../../../components/form/pin/Pin'

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
      <Pin size={6} setPin={setToken} />
      <button
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        onClick={login}
      >
        Authenticate
      </button>
    </form>
  )
}
