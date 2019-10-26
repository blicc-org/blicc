import React, { useState } from 'react'
import uuid from 'uuid'
import { Chart } from './Chart'
import { init } from './arrangement'
import './Dashboard.scss'

export function Dashboard() {
  const [arrangement] = useState(init)

  function onDropHandler(id, pos, type) {
    console.log('id: ', id, ', pos: ', pos, ', type: ', type)
  }

  function Row({ row }) {
    return (
      <div className="row">
        {row.map(obj => {
          return obj.row ? (
            <div className="col" key={uuid()}>
              <Row row={obj.row} />
            </div>
          ) : (
            <Chart
              id={obj.id}
              key={uuid()}
              type={obj.type}
              onDrop={(sector, type) => onDropHandler(obj.id, sector, type)}
            />
          )
        })}
      </div>
    )
  }

  return (
    <>
      <div className="dashboard" onDragOver={event => event.preventDefault()}>
        <div className="container">
          <Row row={arrangement.row} />
        </div>
      </div>
    </>
  )
}
