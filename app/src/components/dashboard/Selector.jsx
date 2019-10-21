import React from 'react'
import { PieChart, BarChart2, Activity } from 'react-feather'

export const CHART_TYPE = {
  pieChart: 'pie-chart',
  barChart: 'bar-chart',
  lineChart: 'line-chart',
}

export function Selector({ id, onDragStart }) {
  let icon
  let name
  switch (id) {
    case CHART_TYPE.pieChart:
      icon = <PieChart className="feather" />
      name = 'Pie Chart'
      break
    case CHART_TYPE.barChart:
      icon = <BarChart2 className="feather" />
      name = 'Bar Chart'
      break
    case CHART_TYPE.lineChart:
      icon = <Activity className="feather" />
      name = 'Line Chart'
      break
    default:
      icon = <></>
      name = ''
  }

  return (
    <div
      id={id}
      className="px-3 py-2"
      draggable="true"
      onDragStart={event => {
        onDragStart()
        event.dataTransfer.setData('chart_type', event.target.id)
      }}
      style={{ cursor: 'pointer' }}
    >
      {icon}
      {name}
    </div>
  )
}
