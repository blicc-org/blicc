import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export function LoginPassword({
  email,
  setEmail,
  password,
  setPassword,
  login,
}: any): ReactElement {
  return (
    <form className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        value={email}
        onChange={(evt): void => setEmail(evt.target.value)}
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        required
        autoFocus
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        value={password}
        onChange={(evt): void => setPassword(evt.target.value)}
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required
      />
      <div className="checkbox mb-3">
        {`No account yet? `}
        <Link to="/register">Register now</Link>
      </div>
      <button
        id="submitLogin"
        title="Sign in"
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        onClick={async (evt): Promise<void> => {
          evt.preventDefault()
          await login(email, password)
        }}
      >
        Sign in
      </button>
    </form>
  )
}
