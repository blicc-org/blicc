import React from 'react'
import { Row } from './Row'
import { useMobile } from '../../hooks/useMobile'
import { useDashboard } from '../../hooks/useDashboard'
import './Dashboard.scss'

export function Dashboard() {
  const isMobile = useMobile()
  const [dashboard, update] = useDashboard()

  return (
    <div className="dashboard" onDragOver={event => event.preventDefault()}>
      <Row row={dashboard.row} isMobile={isMobile} onDrop={update} />
    </div>
  )
}
