import React, { useContext } from 'react'
import { DragContext, DRAG } from '../../context'
import './Selector.scss'

export function Selector({ type, children }) {
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
