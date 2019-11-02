import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import { AppContext } from '../../context/AppContext'

export function Profile() {
  const [appState] = useContext(AppContext)
  const { id } = appState
  const [, accessUser, ,] = useApiEndpoint(`/users/${id}`)
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  })
  const { firstName, lastName, email, role, hasTwoFactorAuth } = user

  useEffect(() => {
    async function fetchUser() {
      const [, user] = await accessUser()
      setUser(user)
    }
    fetchUser()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="col-md-8 mx-auto py-5 my-5">
        <div className="card">
          <h5 className="card-header">Profile</h5>
          <div className="card-body">
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td>
                    <b>First name:</b>
                  </td>
                  <td>{firstName}</td>
                </tr>
                <tr>
                  <td>
                    <b>Last name:</b>
                  </td>
                  <td>{lastName}</td>
                </tr>
                <tr>
                  <td>
                    <b>Email:</b>
                  </td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>
                    <b>Role:</b>
                  </td>
                  <td>{role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div className="card">
          <h5 className="card-header">Two-factor Authorization</h5>
          <div className="card-body">
            {hasTwoFactorAuth ? (
              <p className="card-text">Two-factor authorization is enabled.</p>
            ) : (
              <>
                <p className="card-text">
                  To increase the security of the entrance level of your
                  application, enable two-factor authorization.
                </p>
                <Link className="btn btn-primary" to="/two-factor-auth">
                  Enable
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
