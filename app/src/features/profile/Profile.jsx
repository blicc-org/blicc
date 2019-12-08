import React, { useState, useContext, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { Link } from 'react-router-dom'
import {
  useApiEndpoint,
  useModal,
  useToast,
  useLogout,
} from '../../common/hooks'
import { AppContext } from '../../common/context'
import { Card } from '../../common/components/ui'
import { Disable2FAModal } from './Disable2FAModal'
import { DeleteUserModal } from './DeleteUserModal'

export function Profile() {
  const [appState] = useContext(AppContext)
  const { id } = appState
  const [, accessUser, ,] = useApiEndpoint(`/users/${id}`)
  const [deleteUser, , ,] = useApiEndpoint(`/users/${id}/delete`)
  const [disable, , ,] = useApiEndpoint('/two-factor-auth/delete')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const showToast = useToast()
  const logout = useLogout()
  const [reload, setReload] = useState(0)
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
  }, [reload])

  const [showDisable2FAModal, hideDisable2FAModal] = useModal(
    () => (
      <Disable2FAModal
        setToken={setToken}
        cancel={hideDisable2FAModal}
        submit={submitDisable2FA}
      />
    ),
    [token]
  )

  async function submitDisable2FA() {
    const [status] = await disable({ token })
    setToken('')
    if (status === statusCode.NO_CONTENT) {
      hideDisable2FAModal()
      showToast('Success', 'Two-factor auth is now disabled.', 'success')
      setReload(prev => ++prev)
    } else {
      hideDisable2FAModal()
      showToast(
        'Error',
        'An error occured while trying to disable two-factor auth.',
        'danger'
      )
      setReload(prev => ++prev)
    }
  }

  const [showDeleteUserModal, hideDeleteUserModal] = useModal(
    () => (
      <DeleteUserModal
        setToken={setToken}
        setPassword={setPassword}
        cancel={hideDeleteUserModal}
        submit={submitDeleteUser}
        hasTwoFactorAuth={hasTwoFactorAuth}
      />
    ),
    [token, password]
  )

  async function submitDeleteUser() {
    const [status] = await deleteUser({ token, password })
    setPassword('')
    setToken('')
    if (status === statusCode.OK) {
      hideDeleteUserModal()
      showToast('Success', 'You successfully deleted your account.', 'success')
      await logout()
    } else {
      hideDeleteUserModal()
      showToast(
        'Error',
        'An error occured while trying to delete your account.',
        'danger'
      )
      setReload(prev => ++prev)
    }
  }

  return (
    <>
      <div className="container pb-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Profile</h2>
        </div>
        <div className="col px-0">
          <Card title="Details">
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
              </tbody>
            </table>
          </Card>
          <br />
          <Card title="Role">
            <table style={{ width: '100%' }}>
              <tbody>
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
          </Card>
          <br />
          <Card title="Two-factor Authorization">
            {hasTwoFactorAuth ? (
              <>
                <p className="card-text">
                  Two-factor authorization is enabled.
                </p>
                <Link
                  className="btn btn-outline-danger"
                  to="/"
                  onClick={e => {
                    e.preventDefault()
                    showDisable2FAModal()
                  }}
                >
                  Disable
                </Link>
              </>
            ) : (
              <>
                <p className="card-text">
                  To increase the security of the entrance level of your
                  application, enable two-factor authorization.
                </p>
                <Link className="btn btn-success" to="/two-factor-auth">
                  Enable
                </Link>
              </>
            )}
          </Card>
          <br />
          <Card title="Delete Account">
            <p className="card-text">
              Deleting an account will also delete all the content created by
              the user.
            </p>
            <Link
              className="btn btn-danger"
              to="/"
              onClick={e => {
                e.preventDefault()
                showDeleteUserModal()
              }}
            >
              Delete
            </Link>
          </Card>
        </div>
      </div>
    </>
  )
}
