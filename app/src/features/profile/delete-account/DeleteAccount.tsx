import React, { useState, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { Link } from 'react-router-dom'
import { Card } from '../../../common/components/ui'
import { DeleteAccountModal } from './DeleteAccountModal'
import {
  useModal,
  useLogout,
  useEndpoint,
  useToast,
} from '../../../common/hooks'

export function DeleteAccount({ user }: any): ReactElement {
  const { id, hasTwoFactorAuth } = user
  const logout = useLogout()
  const showToast = useToast()
  const [deleteUser, , ,] = useEndpoint(`/users/${id}/delete`)
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')

  const [showModal, hideModal] = useModal(
    () => (
      <DeleteAccountModal
        setToken={setToken}
        setPassword={setPassword}
        cancel={hideModal}
        submit={submit}
        hasTwoFactorAuth={hasTwoFactorAuth}
      />
    ),
    [token, password]
  )

  async function submit(): Promise<void> {
    const [status] = await deleteUser({ token, password })
    hideModal()
    if (status === statusCode.OK) {
      showToast('Success', 'You successfully deleted your account.', 'success')
      await logout()
    } else {
      showToast(
        'Error',
        'An error occured while trying to delete your account.',
        'danger'
      )
    }
  }

  function onClick(event: any): void {
    event.preventDefault()
    showModal()
  }

  return (
    <Card title="Delete Account">
      <p className="card-text">
        Deleting an account will also delete all the content created by the
        user.
      </p>
      <Link className="btn btn-danger" to="/" onClick={onClick}>
        Delete
      </Link>
    </Card>
  )
}
