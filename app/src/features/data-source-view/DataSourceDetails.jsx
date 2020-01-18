import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../common/components/ui'
import { FREQUENCY } from '../data-sources/DataSources'

export function DataSourceDetails({ edit, dataSource, setDataSource, remove }) {
  const {
    title,
    description,
    persistData,
    fetchFrequency,
    creationDate,
  } = dataSource
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
                    className="form-control col-md-6 my-2"
                    value={title}
                    onChange={evt =>
                      setDataSource({ ...dataSource, title: evt.target.value })
                    }
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
                    onChange={evt =>
                      setDataSource({
                        ...dataSource,
                        description: evt.target.value,
                      })
                    }
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
                    onChange={evt =>
                      setDataSource({
                        ...dataSource,
                        persistData: evt.target.checked,
                      })
                    }
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
                    className="form-control col-md-4 my-2"
                    value={fetchFrequency}
                    onChange={evt =>
                      setDataSource({
                        ...dataSource,
                        fetchFrequency: parseInt(evt.target.value),
                      })
                    }
                  >
                    <option value={FREQUENCY.DAILY}>daily</option>
                    <option value={FREQUENCY.MONTHLY}>monthly</option>
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
