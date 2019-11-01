import React, { useContext, useState, useRef } from 'react'
import { Holdable, defineHold } from 'react-touch'
import { PieChart, BarChart2, Activity, Menu } from 'react-feather'
import { DragContext } from '../../context/DragContext'
import { TYPE } from '../charts/Chart'
import './Selector.scss'

export function Selector({ type, closeSidebar }) {
  const [, setDragState] = useContext(DragContext)
  const [draggable, setDraggable] = useState(false)
  const ref = useRef()

  function getIcon(type) {
    switch (type) {
      case TYPE.LINE_CHART:
        return <Activity className="feather icon" />
      case TYPE.BAR_CHART:
        return <BarChart2 className="feather icon" />
      default:
        return <PieChart className="feather icon" />
    }
  }

  function onDragStartHandler(event) {
    event.dataTransfer.setData('chart_type', type)
    event.dataTransfer.setDragImage(event.target, 0, 0)
    setDragState(true)
    closeSidebar()
  }

  function onDragEndHandler() {
    setDragState(false)
    setDraggable(false)
  }

  return (
    <Holdable
      config={defineHold({ updateEvery: 50, holdFor: 250 })}
      onHoldComplete={() => {
        setDraggable(true)
        ref.current.click()
      }}
    >
      <div
        ref={ref}
        className="selector px-3 py-2"
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
        draggable={draggable}
      >
        {getIcon(type)}
        {type}
        <Menu className="feather drag-icon float-right" />
      </div>
    </Holdable>
  )
}
