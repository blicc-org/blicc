import React, { useState } from 'react'
import { useMobile } from '../../hooks/useMobile'
import { Chart } from './Chart'
import { init } from './arrangement'
import './Dashboard.scss'

function Row({ row, onDrop, isMobile, depth = 1 }) {
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

export function Dashboard() {
  const isMobile = useMobile()
  const [id, setId] = useState('')
  const [pos, setPos] = useState(0)
  const [type, setType] = useState('initial')
  const [arrangement] = useState(init)
  return (
    <>
      <div className="dashboard" onDragOver={event => event.preventDefault()}>
        <Row
          row={arrangement.row}
          isMobile={isMobile}
          onDrop={(id, pos, type) => {
            setId(id)
            setPos(pos)
            setType(type)
          }}
        />
      </div>
      <p>{`id: ${id}, pos: ${pos}, type: ${type}`}</p>
    </>
  )
}
