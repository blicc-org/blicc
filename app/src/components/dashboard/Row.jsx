import React from 'react'
import { Chart } from '../charts/Chart'
import './Dashboard.scss'

export function Row({ row, onDrop, isMobile, depth = 1 }) {
  return (
    <div className="row h-100">
      {row.map((obj, index) => (
        <div
          key={index}
          className={`col col-${depth <= 2 && isMobile ? 12 : obj.col}`}
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
