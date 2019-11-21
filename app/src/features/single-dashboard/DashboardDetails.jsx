import React from 'react'

export function DashboardDetails({ data }) {
  return (
    <div className="col px-0">
      <div className="card">
        <div className="card-body">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>
                  <b>Title</b>
                </td>
                <td>{data.title}</td>
              </tr>
              <tr>
                <td>
                  <b>Owner:</b>
                </td>
                <td>{data.userId}</td>
              </tr>
              <tr>
                <td>
                  <b>Creation date:</b>
                </td>
                <td>{data.creationDate.split('T')[0]}</td>
              </tr>
              <tr>
                <td>
                  <b>Description:</b>
                </td>
                <td>{data.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
