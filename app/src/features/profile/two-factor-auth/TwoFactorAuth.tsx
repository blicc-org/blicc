import React, { useState } from 'react'
import statusCode from 'http-status-codes'
import { Link } from 'react-router-dom'
import { Card } from '../../../common/components/ui'
import { useApiEndpoint, useToast, useModal } from '../../../common/hooks'
import { TwoFactorAuthModal } from './TwoFactorAuthModal'

export function TwoFactorAuth({ user, setUser }: any) {
  const { hasTwoFactorAuth } = user
  const [disable, , ,] = useApiEndpoint('/two-factor-auth/delete')
  const [token, setToken] = useState('')
  const showToast = useToast()
  const [showModal, hideModal] = useModal(
    () => (
      <TwoFactorAuthModal
        setToken={setToken}
        cancel={hideModal}
        submit={submit}
      />
    ),
    [token]
  )

  async function submit() {
    const [status] = await disable({ token })
    if (status === statusCode.NO_CONTENT) {
      setUser((prev: any) => {
        return { ...prev, hasTwoFactorAuth: false }
      })
      showToast('Success', 'Two-factor auth is now disabled.', 'success')
    } else {
      showToast(
        'Error',
        'An error occured while trying to disable two-factor auth.',
        'danger'
      )
    }
    hideModal()
  }

  function onClick(event: any) {
    event.preventDefault()
    showModal()
  }

  return (
    <Card title="Two-factor Authorization">
      {hasTwoFactorAuth ? (
        <>
          <p className="card-text">Two-factor authorization is enabled.</p>
          <Link className="btn btn-outline-danger" to="/" onClick={onClick}>
            Disable
          </Link>
        </>
      ) : (
        <>
          <p className="card-text">
            To increase the security of the entrance level of your application,
            enable two-factor authorization.
          </p>
          <Link className="btn btn-success" to="/two-factor-auth">
            Enable
          </Link>
        </>
      )}
    </Card>
  )
}
