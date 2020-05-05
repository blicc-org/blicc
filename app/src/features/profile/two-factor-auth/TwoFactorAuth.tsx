import React, {
  useState,
  ReactElement,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react'
import statusCode from 'http-status-codes'
import { Link } from 'react-router-dom'
import { Card } from '../../../common/components/ui'
import { useEndpoint, useToast, useModal } from '../../../common/hooks'
import { TwoFactorAuthModal } from './TwoFactorAuthModal'

interface Props {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  creationDate: string
  hasTwoFactorAuth: boolean
}

export function TwoFactorAuth({ user, setUser }: Props): ReactElement {
  const { hasTwoFactorAuth } = user
  const [disable, , ,] = useEndpoint('/two-factor-auth/delete')
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

  async function submit(): Promise<void> {
    const [status] = await disable({ token })
    if (status === statusCode.NO_CONTENT) {
      setUser((prev) => {
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

  function onClick(event: MouseEvent<HTMLAnchorElement>): void {
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
