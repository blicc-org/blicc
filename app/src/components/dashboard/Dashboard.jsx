import React, { useState } from 'react'
import uuid from 'uuid'
import { Chart } from './Chart'
import './Dashboard.scss'

export function Dashboard() {
  const [chartType, setChartType] = useState('init')
  const [charts, setCharts] = useState([])
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  })

  const targetChart = ''

  function drop(event) {
    event.preventDefault()
    const type = event.dataTransfer.getData('chart_type')
    setChartType(type)
    setCharts(prev => [...prev, type])
    setPos({ x: event.clientX, y: event.clientY })
  }

  return (
    <>
      <div
        className="dashboard"
        onDrop={drop}
        onDragOver={event => event.preventDefault()}
      >
        <div className="container">
          <div className="row">
            {charts.map(type => {
              const id = uuid()
              return <Chart key={id} id={id} type={type} />
            })}
          </div>
        </div>
      </div>
      <p>{`You just dropped a ${chartType} on ${targetChart} with pos x=${pos.x}, y=${pos.y}`}</p>
    </>
  )
}
