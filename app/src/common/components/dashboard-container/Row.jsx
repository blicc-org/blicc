import React from 'react'
import { ChartContainer } from '../chart-container/ChartContainer'
import { useMobile } from '../../hooks'
import './Row.scss'

export const GRID = {
  FULL: '12',
  HALF: '6',
}

export function Row({ row, onDrop, depth = 1 }) {
  const isMobile = useMobile()
  return (
    <div className="row h-100">
      {row.map((obj, index) => (
        <div
          key={index}
          className={`col col-${depth <= 2 && isMobile ? GRID.FULL : obj.col}`}
        >
          {obj.row ? (
            <Row row={obj.row} depth={depth + 1} onDrop={onDrop} />
          ) : (
            <ChartContainer
              id={obj.id}
              type={obj.type}
              onDrop={(sector, type) => onDrop(obj.id, sector, type)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
