import React, { useState } from 'react'
import statusCode from 'http-status-codes'
import { Link } from 'react-router-dom'
import { Card } from '../../../common/components/ui'
import { DeleteUserModal } from './DeleteUserModal'
import {
  useModal,
  useLogout,
  useApiEndpoint,
  useToast,
} from '../../../common/hooks'

export function DeleteAccount({ id, hasTwoFactorAuth }) {
  const [deleteUser, , ,] = useApiEndpoint(`/users/${id}/delete`)
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const logout = useLogout()
  const showToast = useToast()
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
    }
  }

  return (
    <Card title="Delete Account">
      <p className="card-text">
        Deleting an account will also delete all the content created by the
        user.
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
  )
}
