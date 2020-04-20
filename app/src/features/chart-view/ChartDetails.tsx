import React, { ReactElement } from 'react'
import { useLanguage } from '../../common/hooks'

export function ChartDetails({
  bundle,
  description,
  creationDate,
}: any): ReactElement {
  const content = useLanguage()

  return (
    <div className="col px-0">
      <div className="card">
        <h5 className="card-header">Details</h5>
        <div className="card-body">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>
                  <b>{content.bundle}:</b>
                </td>
                <td>{bundle}</td>
              </tr>
              <tr>
                <td>
                  <b>{content.description}:</b>
                </td>
                <td>{description}:</td>
              </tr>
              <tr>
                <td>
                  <b>{content.creationDate}:</b>
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
