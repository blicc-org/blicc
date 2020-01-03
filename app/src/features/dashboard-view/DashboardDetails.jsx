import React from 'react'
import { Card } from '../../common/components/ui'

export function DashboardDetails({
  edit,
  title,
  setTitle,
  userId,
  creationDate,
  description,
  setDescription,
}) {
  return (
    <div className="col px-0">
      <Card>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <b>Title</b>
              </td>
              <td>
                {edit ? (
                  <input
                    className="form-control col-6 my-2"
                    value={title}
                    onChange={evt => setTitle(evt.target.value)}
                  />
                ) : (
                  title
                )}
              </td>
            </tr>
            <tr>
              <td>
                <b>Description:</b>
              </td>
              <td>
                {edit ? (
                  <textarea
                    className="form-control my-2"
                    value={description}
                    rows="3"
                    onChange={evt => setDescription(evt.target.value)}
                  ></textarea>
                ) : (
                  description
                )}
              </td>
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
          </tbody>
        </table>
      </Card>
    </div>
  )
}
