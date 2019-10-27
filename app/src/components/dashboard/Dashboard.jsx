import React from 'react'
import { Row } from './Row'
import { useMobile } from '../../hooks/useMobile'
import { useDashboard } from '../../hooks/useDashboard'
import './Dashboard.scss'

export function Dashboard() {
  const isMobile = useMobile()
  const [dashboard, update] = useDashboard()
  const { row } = dashboard

  function onDragOver(event) {
    event.preventDefault()
  }

  return (
    <div className="dashboard" onDragOver={onDragOver}>
      <Row row={row} isMobile={isMobile} onDrop={update} />
    </div>
  )
}
