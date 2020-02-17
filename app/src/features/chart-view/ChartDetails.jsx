import React from 'react'

export function ChartDetails({ bundle, description, creationDate }) {
  return (
    <div className="col px-0">
      <div className="card">
        <h5 className="card-header">Details</h5>
        <div className="card-body">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>
                  <b>Bundle:</b>
                </td>
                <td>{bundle}</td>
              </tr>
              <tr>
                <td>
                  <b>Description:</b>
                </td>
                <td>{description}</td>
              </tr>
              <tr>
                <td>
                  <b>Creation date:</b>
                </td>
                <td>{creationDate ? creationDate.split('T')[0] : ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
