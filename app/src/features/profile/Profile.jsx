import React, { useState, useContext, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { Link } from 'react-router-dom'
import { useApiEndpoint, useModal, useToast } from '../../common/hooks'
import { AppContext } from '../../common/context'
import { Card } from '../../common/components/ui'
import { Disable2FAModal } from './Disable2FAModal'
import { Details } from './details/Details'
import { DeleteAccount } from './delete-account/DeleteAccount'

export function Profile() {
  const [appState] = useContext(AppContext)
  const { id } = appState
  const [, accessUser, ,] = useApiEndpoint(`/users/${id}`)
  const [disable, , ,] = useApiEndpoint('/two-factor-auth/delete')
  const [token, setToken] = useState('')
  const showToast = useToast()
  const [reload, setReload] = useState(0)
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    creationDate: '',
  })

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

  return (
    <>
      <div className="container pb-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Profile</h2>
        </div>
        <div className="col px-0">
          <Details user={user} />
          <br />
          <Card title="Two-factor Authorization">
            {user.hasTwoFactorAuth ? (
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
          <DeleteAccount id={id} hasTwoFactorAuth={user.hasTwoFactorAuth} />
        </div>
      </div>
    </>
  )
}
