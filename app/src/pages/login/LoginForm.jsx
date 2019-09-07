import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import './LoginForm.css'
import { AppContext } from '../../common/context/AppContext'
import { useSession } from '../../common/hooks/session/useSession'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [appState] = useContext(AppContext)
  const [login] = useSession()

  return (
    <>
      {appState.loggedIn && <Redirect to="/dashboards" />}
      <div className="col-md-5 mx-auto py-5 my-5 text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
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
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={async e => {
              e.preventDefault()
              await login(email, password)
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  )
}
