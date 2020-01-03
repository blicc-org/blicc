import React, { useState } from 'react'
import { Card, UpdateButton } from '../../../common/components/ui'

export function Details({ user, setUser, update }) {
  const { firstName, lastName, email, role, creationDate } = user
  const [edit, setEdit] = useState(false)

  async function onClick() {
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
          <tr>
            <td>
              <b>First name:</b>
            </td>
            <td>
              {edit ? (
                <input
                  className="form-control col-md-6 my-2"
                  value={firstName}
                  onChange={evt =>
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
                  onChange={evt =>
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
            <td>{edit ? (
                <input
                  className="form-control col-md-6 my-2"
                  value={email}
                  onChange={evt =>
                    setUser({ ...user, email: evt.target.value })
                  }
                />
              ) : (
                email
              )}</td>
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
      <UpdateButton edit={edit} onClick={onClick} />
    </Card>
  )
}
