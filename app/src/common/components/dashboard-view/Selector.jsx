import React, { useContext } from 'react'
import { PieChart, BarChart2, Activity, Menu } from 'react-feather'
import { DragContext } from '../../context'
import { TYPE } from '../charts/Chart'
import './Selector.scss'

export function Selector({ type, closeSidebar }) {
  const [, setDragState] = useContext(DragContext)

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
  }

  return (
    <div
      className="selector px-3 py-2"
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      draggable={true}
    >
      {getIcon(type)}
      {type}
      <Menu className="feather drag-icon float-right" />
    </div>
  )
}
