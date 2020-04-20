import React, { useContext, ReactElement } from 'react'
import { DragContext, DRAG } from '../../context'
import './Selector.scss'

export function Selector({ title, type, children }: any): ReactElement {
  const [, setDragState] = useContext(DragContext)

  function onDragStart(event: any): void {
    event.dataTransfer.setDragImage(event.target, 0, 0)
    setDragState(type)
  }

  function onDragEnd(): void {
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
