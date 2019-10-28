import React, { useContext } from 'react'
import { Positioning } from '../dashboard/Positioning'
import { DragContext } from '../../context/DragContext'
import { DragHere } from './DragHere'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { BarChart } from './BarChart'
import './Chart.scss'

export const TYPE = {
  DRAG_HERE: 'drag-here',
  LINE_CHART: 'line-chart',
  PIE_CHART: 'pie-chart',
  BAR_CHART: 'bar-chart',
}

export function Chart({ type, id, onDrop }) {
  const [dragging] = useContext(DragContext)

  function getChart(type) {
    switch (type) {
      case TYPE.DRAG_HERE:
        return <DragHere />
      case TYPE.LINE_CHART:
        return <LineChart id={id} />
      case TYPE.PIE_CHART:
        return <PieChart id={id} />
      case TYPE.BAR_CHART:
        return <BarChart id={id} />
      default:
        return <DragHere />
    }
  }

  return (
    <div className="chart" key={id}>
      {getChart(type)}
      {dragging && <Positioning onDrop={onDrop} />}
    </div>
  )
}
