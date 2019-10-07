import React, { useState, useContext, useEffect } from 'react'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import { API_URL } from '../../config/config'
import { AppContext } from '../../context/AppContext'

export function Profile() {
  const [appState] = useContext(AppContext)
  const { id } = appState
  const [, accessUser, ,] = useApiEndpoint(`${API_URL}/users/${id}`)
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  })
  const { firstName, lastName, email, role } = user

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
      <div className="col-md-5 mx-auto py-5 my-5">
        <h1 className="h3 mb-3 font-weight-normal">Profile</h1>
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
    </>
  )
}
