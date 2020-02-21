import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { Empty, Pagination } from '../../common/components/ui'
import { useApiEndpoint } from '../../common/hooks'

export function Users() {
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [result, setResult] = useState({ total: 0, users: [] })
  const [, accessUsers, ,] = useApiEndpoint('/users')

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await accessUsers({
        params: {
          fields: 'id,firstName,lastName,creationDate,twoFactorAuth,email',
          skip: itemsPerPage * page,
          take: itemsPerPage,
        },
      })
      if (status === statusCode.OK) {
        setResult(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [page])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h4 className="my-0">
          Users <span className="badge badge-secondary">{result.total}</span>
        </h4>
      </div>
      {result.total === 0 ? (
        <Empty>No charts fount.</Empty>
      ) : (
        <table className="table">
          <tbody>
            {result.users.map(
              ({
                id,
                firstName,
                lastName,
                role,
                email,
                creationDate,
                hasTwoFactorAuth,
              }) => (
                <tr key={id}>
                  <td>
                    <h5 className="card-title">
                      {`${firstName} ${lastName} `}
                      <span
                        className={`badge badge-${
                          role === 'admin' ? 'danger' : 'info'
                        }`}
                      >
                        {role}
                      </span>{' '}
                      {hasTwoFactorAuth && (
                        <span className="badge badge-success">2FA</span>
                      )}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {creationDate.split('T')[0]}
                    </h6>
                    <p className="card-text">{email}</p>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        total={result.total}
      />
    </>
  )
}
