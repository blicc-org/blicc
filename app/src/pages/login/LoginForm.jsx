import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import './LoginForm.css'
import { API_URL } from '../../config'
import { useApiEndpoint } from '../../common/hooks/useApiEndpoint'
import { AppContext } from '../../common/context/AppContext'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createSession, , ,] = useApiEndpoint(`${API_URL}/sessions`)

  const [appState, setAppState] = useContext(AppContext)

  async function login(e) {
    e.preventDefault()

    const [status, data] = await createSession({ email, password })

    setAppState({
      ...appState,
      loggedIn: true,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
    })
  }

  return (
    <>
      {appState.loggedIn && <Redirect to="/dashboard" />}
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
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={login}
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  )
}
