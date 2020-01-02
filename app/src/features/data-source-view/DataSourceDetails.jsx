import React from 'react'
import { Card } from '../../common/components/ui'

export function DataSourceDetails({
  title,
  description,
  persistData,
  fetchFrequency,
  creationDate,
}) {
  return (
    <div className="col px-0">
      <Card>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <b>Title:</b>
              </td>
              <td>{title}</td>
            </tr>
            <tr>
              <td>
                <b>Description:</b>
              </td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>
                <b>Persist data:</b>
              </td>
              <td>{persistData ? 'enabled' : 'disabled'}</td>
            </tr>
            <tr>
              <td>
                <b>Fetch frequency:</b>
              </td>
              <td>Every {fetchFrequency / (60 * 60 * 1000)} hours</td>
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
    </div>
  )
}
