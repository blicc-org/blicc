import React from 'react'

export const CHART_TYPE = {
  pieChart: 'pie-chart',
  barChart: 'bar-chart',
}

export function Dashboard() {
  function drop(event) {
    event.preventDefault()
    const type = event.dataTransfer.getData('chart_type')
    switch (type) {
      case CHART_TYPE.pieChart:
        console.log(CHART_TYPE.pieChart)
        break
      case CHART_TYPE.barChart:
        console.log(CHART_TYPE.barChart)
        break
    }
  }

  return (
    <div className="col-md-5 mx-auto py-5 my-5 text-center">
      <h1>Drag in here</h1>
      <div
        id="div1"
        onDrop={drop}
        onDragOver={event => event.preventDefault()}
        style={{
          width: '350px',
          height: '70px',
          padding: '10px',
          border: '1px solid #aaaaaa',
        }}
      ></div>
    </div>
  )
}
