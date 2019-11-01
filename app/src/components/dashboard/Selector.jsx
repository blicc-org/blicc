import React, { useContext, useState, useRef, useEffect } from 'react'
import { Holdable, defineHold } from 'react-touch'
import { PieChart, BarChart2, Activity, Menu } from 'react-feather'
import { DragContext } from '../../context/DragContext'
import { useTouch } from '../../hooks/useTouch'
import { TYPE } from '../charts/Chart'
import { sidebarWidth } from '../../config/gui'
import './Selector.scss'

export function Selector({ type, closeSidebar }) {
  const [, setDragState] = useContext(DragContext)
  const [draggable, setDraggable] = useState(false)
  const isTouch = useTouch()
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
  }

  function onDragEndHandler() {
    setDraggable(false)
    setDragState(false)
  }

  function onDragCapture(event) {
    if (event.clientX > sidebarWidth) closeSidebar()
  }

  useEffect(() => {
    if (draggable) ref.current.click()
  }, [draggable])

  return (
    <>
      {isTouch ? (
        <Holdable
          config={defineHold({ updateEvery: 10, holdFor: 150 })}
          onHoldComplete={() => {
            setDraggable(true)
          }}
        >
          <div
            ref={ref}
            className="selector px-3 py-2"
            onDragStart={onDragStartHandler}
            onDragCapture={onDragCapture}
            onDragEnd={onDragEndHandler}
            draggable={draggable}
          >
            {getIcon(type)}
            {type}
            <Menu className="feather drag-icon float-right" />
          </div>
        </Holdable>
      ) : (
        <div
          ref={ref}
          className="selector px-3 py-2"
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          draggable={true}
        >
          {getIcon(type)}
          {type}
          <Menu className="feather drag-icon float-right" />
        </div>
      )}
    </>
  )
}
