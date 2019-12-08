import React from 'react'
import { Card } from '../../../common/components/ui'

export function Details({ user }) {
  const { firstName, lastName, email, role, creationDate } = user
  return (
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
  )
}
