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

  function Arrangement({ row }) {
    return (
      <>
        {row.map(obj => {
          if (obj.row) {
            return <Arrangement key={uuid()} row={obj.row} />
          } else {
            return (
              <Chart
                id={obj.id}
                key={uuid()}
                type={obj.type}
                onDrop={(sector, type) => onDropHandler(obj.id, sector, type)}
              />
            )
          }
        })}
      </>
    )
  }

  return (
    <>
      <div className="dashboard" onDragOver={event => event.preventDefault()}>
        <div className="container">
          <Arrangement row={arrangement.row} />
        </div>
      </div>
    </>
  )
}
