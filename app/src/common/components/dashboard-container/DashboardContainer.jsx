import React from 'react'
import { Row } from './Row'

export function DashboardContainer({ data, update }) {
  function onDragOverHandler(event) {
    event.preventDefault()
  }

  return (
    <div onDragOver={onDragOverHandler} style={{ height: '100%' }}>
      <Row row={data.data.row} onDrop={update} />
    </div>
  )
}
