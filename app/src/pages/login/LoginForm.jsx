import React, { useState } from 'react'
import './LoginForm.css'
import { API_URL } from '../../config'
import { useApiEndpoint } from '../../util/useApiEndpoint'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createSession, , ,] = useApiEndpoint(`${API_URL}/sessions`)
  const [, accessResource, ,] = useApiEndpoint(API_URL)

  async function login(e) {
    e.preventDefault()
    const [status] = await createSession({ email, password })

    console.log(status)
    console.log(document.cookie)

    const [, data] = await accessResource()
    console.log(data)
  }

  return (
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
  )
}
