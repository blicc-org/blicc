import React, { ReactElement } from 'react'
import { Loading } from './Loading'
import { Empty } from './Empty'
import { List } from '../../interfaces'
import styles from './Listing.scss'

interface Props<T> {
  list: List<T> | undefined
  emptyText: string
  children: (values: T) => ReactElement
}

export function Listing<T>({
  list,
  emptyText,
  children,
}: Props<T>): ReactElement {
  return (
    <div className={styles.listing}>
      {list === undefined ? (
        <Loading />
      ) : (
        <>
          {list.total === 0 ? (
            <Empty>{emptyText}</Empty>
          ) : (
            <>
              {list.list.map((elem: T) => {
                return children(elem)
              })}
            </>
          )}
        </>
      )}
    </div>
  )
}
