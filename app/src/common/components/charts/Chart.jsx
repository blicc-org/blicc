import React, { useContext } from 'react'
import { Positioning } from '../dashboard-view/positioning/Positioning'
import { DragContext } from '../../context'
import { DragHere } from './DragHere'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { BarChart } from './BarChart'
import { X } from 'react-feather'
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
        return
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
      {type === TYPE.DRAG_HERE ? (
        <DragHere />
      ) : (
        <>
          <div className="row text-muted px-2">
            <div className="col col-8">
              <p>{type}</p>
            </div>
            <div className="col col-4 text-right">
              <X size={18} />
            </div>
          </div>
          <hr />
          <div className="px-2">{getChart(type)}</div>
        </>
      )}

      {dragging && <Positioning onDrop={onDrop} />}
    </div>
  )
}
