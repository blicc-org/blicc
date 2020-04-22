import React, { useEffect, useState, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { Pagination, Listing, Item } from '../../common/components/ui'
import { useApiEndpoint, useDateFormatter } from '../../common/hooks'
import { User, List } from '../../common/interfaces'

export function Users(): ReactElement {
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [list, setList] = useState<List<User>>()
  const [, accessUsers, ,] = useApiEndpoint('/users')
  const format = useDateFormatter()

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const [status, data] = await accessUsers({
        params: {
          fields: 'id,firstName,lastName,creationDate,twoFactorAuth,email',
          skip: itemsPerPage * page,
          take: itemsPerPage,
        },
      })
      if (status === statusCode.OK) {
        setList({ total: data.total, list: data.users })
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [page])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h4 className="my-0">
          Users{' '}
          <span className="badge badge-secondary">{list ? list.total : 0}</span>
        </h4>
      </div>
      <Listing<User> list={list} emptyText="No users found.">
        {(user): ReactElement => (
          <Item
            key={user.id}
            title={`${user.firstName} ${user.lastName}`}
            subtitle={format(user.creationDate)}
            description={`${user.email} ${
              user.hasTwoFactorAuth ? '(TFA)' : ''
            }`}
            badge={user.role.toString()}
          />
        )}
      </Listing>
      <Pagination
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        total={list ? list.total : 0}
      />
    </>
  )
}
