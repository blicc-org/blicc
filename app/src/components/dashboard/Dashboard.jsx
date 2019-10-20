import React, { useState } from 'react'

export const CHART_TYPE = {
  pieChart: 'pie-chart',
  barChart: 'bar-chart',
}

export function Dashboard() {
  const [chartType, setChartType] = useState('init')
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  })

  function drop(event) {
    event.preventDefault()
    setChartType(event.dataTransfer.getData('chart_type'))
    setPos({ x: event.clientX, y: event.clientY })
  }

  return (
    <div className="col-md-5 mx-auto py-5 my-5 text-center">
      <h1>Drag in here</h1>
      <div
        id="div1"
        onDrop={drop}
        onDragOver={event => event.preventDefault()}
        style={{
          width: '500px',
          height: '250px',
          border: '1px solid #aaaaaa',
        }}
      />
      <p>{`You just dropped a ${chartType} on position x=${pos.x}, y=${pos.y}`}</p>
    </div>
  )
}
