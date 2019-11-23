import React, { useContext, useState } from 'react'
import { Positioning } from '../dashboard-view/positioning/Positioning'
import { DragContext } from '../../context'
import { DragHere } from './DragHere'
import { ChartGenerator } from './ChartGenerator'
import { ChartSelectionModal } from './ChartSelectionModal'
import { useModal } from '../../hooks'
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

  const [chartType, setChartType] = useState('')
  const [sector, setSector] = useState(0)
  const [showModal, hideModal] = useModal(() => (
    <ChartSelectionModal
      cancel={hideModal}
      submit={() => {
        setChartType('@essentials/pie-chart')
        onDrop(sector, '@essentials/pie-chart')
        hideModal()
      }}
    />
  ))

  function onDropHandler(sector, type) {
    console.log('hier in chart: ', sector, type)
    setSector(sector)
    showModal()
  }

  function getChart(type) {
    switch (type) {
      case TYPE.DRAG_HERE:
        return <DragHere />
      default:
        return <ChartGenerator chartType={type} />
    }
  }

  return (
    <div className={`chart ${type !== TYPE.DRAG_HERE ? 'frame' : ''}`} key={id}>
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

      {dragging && <Positioning onDrop={onDropHandler} />}
    </div>
  )
}
