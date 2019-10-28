import React from 'react'
import { Chart } from '../charts/Chart'
import { useMobile } from '../../hooks/useMobile'
import { useDashboard } from '../../hooks/useDashboard'
import './Dashboard.scss'

export const GRID = {
  FULL: '12',
  HALF: '6',
}

export function Row({ row, onDrop, isMobile, depth = 1 }) {
  return (
    <div className="row h-100">
      {row.map((obj, index) => (
        <div
          key={index}
          className={`col col-${depth <= 2 && isMobile ? GRID.FULL : obj.col}`}
        >
          {obj.row ? (
            <Row
              row={obj.row}
              isMobile={isMobile}
              depth={depth + 1}
              onDrop={onDrop}
            />
          ) : (
            <Chart
              id={obj.id}
              isMobile={isMobile}
              type={obj.type}
              onDrop={(sector, type) => onDrop(obj.id, sector, type)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

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
