import React, { useState, ReactElement } from 'react'
import { Card, Button, ButtonType } from '../../../common/components/ui'
import { ProfilePicture } from './ProfilePicture'

interface Props {
  user: User
  setUser: (user: User) => void
  update: () => Promise<void>
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

export function Details({ user, setUser, update }: Props): ReactElement {
  const { firstName, lastName, email, role, creationDate } = user
  const [edit, setEdit] = useState(false)

  async function onClick(): Promise<void> {
    if (edit) {
      await update()
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  return (
    <Card title="Details">
      <table style={{ width: '100%' }}>
        <tbody>
          <ProfilePicture user={user} />
          <tr>
            <td>
              <b>First name:</b>
            </td>
            <td>
              {edit ? (
                <input
                  className="form-control col-md-6 my-2"
                  value={firstName}
                  onChange={(evt): void =>
                    setUser({ ...user, firstName: evt.target.value })
                  }
                />
              ) : (
                firstName
              )}
            </td>
          </tr>
          <tr>
            <td>
              <b>Last name:</b>
            </td>
            <td>
              {edit ? (
                <input
                  className="form-control col-md-6 my-2"
                  value={lastName}
                  onChange={(evt): void =>
                    setUser({ ...user, lastName: evt.target.value })
                  }
                />
              ) : (
                lastName
              )}
            </td>
          </tr>
          <tr>
            <td>
              <b>Email:</b>
            </td>
            <td>
              {edit ? (
                <input
                  className="form-control col-md-6 my-2"
                  value={email}
                  onChange={(evt): void =>
                    setUser({ ...user, email: evt.target.value })
                  }
                />
              ) : (
                email
              )}
            </td>
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
      <br />
      <Button
        type={edit ? ButtonType.Primary : ButtonType.OutlineSecondary}
        onClick={onClick}
      >
        {edit ? 'Save' : 'Edit'}
      </Button>
    </Card>
  )
}
