import React from 'react'
import { Row } from './Row'
import { useDashboard } from '../../hooks/useDashboard'
import './Dashboard.scss'

export function Dashboard({ data }) {
  const [dashboard, update] = useDashboard(data)
  const { row } = dashboard

  function onDragOverHandler(event) {
    event.preventDefault()
  }

  return (
    <div className="dashboard" onDragOver={onDragOverHandler}>
      <Row row={row} onDrop={update} />
    </div>
  )
}
