import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../common/components/ui'
import { FREQUENCY } from '../data-sources/DataSources'

export function DataSourceDetails({
  edit,
  title,
  setTitle,
  description,
  setDescription,
  persistData,
  setPersistData,
  fetchFrequency,
  setFetchFrequency,
  creationDate,
  remove,
}) {
  return (
    <div className="col px-0">
      <Card title="Details">
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <b>Title:</b>
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
                <b>Persist data:</b>
              </td>
              <td>
                {edit ? (
                  <input
                    type="checkbox"
                    className="my-2"
                    checked={persistData}
                    onChange={event => setPersistData(event.target.checked)}
                  />
                ) : persistData ? (
                  'enabled'
                ) : (
                  'disabled'
                )}
              </td>
            </tr>
            <tr>
              <td>
                <b>Fetch frequency:</b>
              </td>
              <td>
                {edit ? (
                  <select
                    className="form-control col-4 my-2"
                    value={fetchFrequency}
                    onChange={event =>
                      setFetchFrequency(parseInt(event.target.value))
                    }
                  >
                    <option value={FREQUENCY.DAILY}>daily</option>
                    <option value={FREQUENCY.MONTHLY}>mounthly</option>
                    <option value={FREQUENCY.YEARLY}>yearly</option>
                  </select>
                ) : (
                  <>Every {fetchFrequency / (60 * 60 * 1000)} hours</>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <b>Creation date:</b>
              </td>
              <td>{creationDate ? creationDate.split('T')[0] : ''}</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <Card title="Delete">
        <p className="card-text">
          Keep in mind that you cannot restore the deleted data source.
        </p>
        <Link
          className="btn btn-danger"
          to="/"
          onClick={evt => {
            evt.preventDefault()
            remove()
          }}
        >
          Delete
        </Link>
      </Card>
    </div>
  )
}
