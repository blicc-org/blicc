import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApiEndpoint } from '../../common/hooks'
import { AppContext } from '../../common/context'

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
    creationDate: '',
  })
  const {
    firstName,
    lastName,
    email,
    role,
    creationDate,
    hasTwoFactorAuth,
  } = user

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
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Profile</h2>
        </div>
        <div className="col px-0">
          <div className="card">
            <h5 className="card-header">Details</h5>
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
                  <tr>
                    <td>
                      <b>Registration date:</b>
                    </td>
                    <td>{creationDate ? creationDate.split('T')[0] : ''}</td>
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
                <p className="card-text">
                  Two-factor authorization is enabled.
                </p>
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
      </div>
    </>
  )
}
