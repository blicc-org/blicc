import React from 'react'
import { Row } from './Row'
import './Dashboard.scss'

export function DashboardView({ data, update }) {
  function onDragOverHandler(event) {
    event.preventDefault()
  }

  return (
    <div className="dashboard" onDragOver={onDragOverHandler}>
      <Row row={data.data.row} onDrop={update} />
    </div>
  )
}
