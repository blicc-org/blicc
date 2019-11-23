import React, { useContext } from 'react'
import { DragContext } from '../../context'
import './Selector.scss'

export function Selector({ type, children }) {
  const [, setDragState] = useContext(DragContext)

  function onDragStart(event) {
    event.dataTransfer.setData('type', type)
    event.dataTransfer.setDragImage(event.target, 0, 0)
    setDragState(true)
  }

  function onDragEnd() {
    setDragState(false)
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
