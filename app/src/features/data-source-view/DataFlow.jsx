import React from 'react'
import { Card } from '../../common/components/ui'

export function DataFlow({ dataSource, setDataSource }) {
  return (
    <Card title="Data Flow">
      <h3>Url: </h3>
      <input
        className="form-control col-md-4"
        value={dataSource.data.url}
        onChange={evt =>
          setDataSource({ ...dataSource, data: { url: evt.target.value } })
        }
      />
    </Card>
  )
}
