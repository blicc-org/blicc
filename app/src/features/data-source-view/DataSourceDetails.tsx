import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../common/components/ui'
import { useLanguage } from '../../common/hooks'

export function DataSourceDetails({
  edit,
  dataSource,
  setDataSource,
  remove,
}: any): ReactElement {
  const content = useLanguage()
  const { title, description, creationDate } = dataSource
  return (
    <div className="col px-0">
      <Card title="Details">
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <b>{content.title}:</b>
              </td>
              <td>
                {edit ? (
                  <input
                    className="form-control col-md-6 my-2"
                    value={title}
                    onChange={(evt): void =>
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
                <b>{content.description}:</b>
              </td>
              <td>
                {edit ? (
                  <textarea
                    className="form-control my-2"
                    value={description}
                    rows={3}
                    onChange={(evt): void =>
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
                <b>{content.creationDate}:</b>
              </td>
              <td>{creationDate ? creationDate.split('T')[0] : ''}</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <Card title={content.delete}>
        <p className="card-text">{content.deleteWarning}</p>
        <Link
          className="btn btn-danger"
          to="/"
          onClick={(evt): void => {
            evt.preventDefault()
            remove()
          }}
        >
          {content.delete}
        </Link>
      </Card>
    </div>
  )
}
