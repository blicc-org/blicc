import React, { useState } from 'react'
import { Chart } from './Chart'
import { init } from './arrangement'
import './Dashboard.scss'

function Row({ row, onDrop, depth = 1 }) {
  const numOfRows = row.length
  console.log(numOfRows)

  return (
    <div className="row">
      {row.map((obj, index) => (
        <div key={index} className={`col col-${12 / numOfRows}`}>
          {obj.row ? (
            <Row row={obj.row} depth={depth + 1} onDrop={onDrop} />
          ) : (
            <Chart
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

export function Dashboard() {
  const [arrangement] = useState(init)
  return (
    <div className="dashboard" onDragOver={event => event.preventDefault()}>
      <Row
        row={arrangement.row}
        onDrop={(id, pos, type) =>
          console.log('id: ', id, ', pos: ', pos, ', type: ', type)
        }
      />
    </div>
  )
}
