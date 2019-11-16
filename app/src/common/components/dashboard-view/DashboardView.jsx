import React from 'react'
import { Row } from './Row'
import './Dashboard.scss'

export function DashboardView({ dashboard, update }) {
  function onDragOverHandler(event) {
    event.preventDefault()
  }

  return (
    <div className="dashboard" onDragOver={onDragOverHandler}>
      <Row row={dashboard.data.row} onDrop={update} />
    </div>
  )
}
