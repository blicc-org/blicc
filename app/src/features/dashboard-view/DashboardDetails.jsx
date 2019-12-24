import React from 'react'
import { Card } from '../../common/components/ui'

export function DashboardDetails({ title, userId, creationDate, description }) {
  return (
    <div className="col px-0">
      <Card>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <b>Title</b>
              </td>
              <td>{title}</td>
            </tr>
            <tr>
              <td>
                <b>Owner:</b>
              </td>
              <td>{userId}</td>
            </tr>
            <tr>
              <td>
                <b>Creation date:</b>
              </td>
              <td>{creationDate.split('T')[0]}</td>
            </tr>
            <tr>
              <td>
                <b>Description:</b>
              </td>
              <td>{description}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  )
}
