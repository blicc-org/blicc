import React from 'react'
import { Row } from './Row'
import { useMobile } from '../../hooks/useMobile'
import { useDashboard } from '../../hooks/useDashboard'
import './Dashboard.scss'

export function Dashboard() {
  const [dashboard, update] = useDashboard()
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
