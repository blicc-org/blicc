import React, { useContext } from 'react'
import { DragContext, DRAG } from '../../context'
import './Selector.scss'

export function Selector({ title, type, children }) {
  const [, setDragState] = useContext(DragContext)

  function onDragStart(event) {
    event.dataTransfer.setDragImage(event.target, 0, 0)
    setDragState(type)
  }

  function onDragEnd() {
    setDragState(DRAG.NONE)
  }

  return (
    <>
      <div
        title={title}
        data-toggle="tooltip"
        data-placement="left"
        className="draggable"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable={true}
      >
        {children}
      </div>
    </>
  )
}
