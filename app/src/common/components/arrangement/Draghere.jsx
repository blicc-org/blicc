import React, { useContext } from 'react'
import { Positioning } from '../positioning/Positioning'
import { useArrangement } from '../../hooks'
import { DragContext } from '../../context'
import './DragHere.scss'

export function DragHere() {
  const [, insert] = useArrangement()
  const [dragging] = useContext(DragContext)

  function onDrop(action, type) {
    insert(null, action)
  }

  return (
    <div className="drag-here text-center pt-4">
      <p className="text-muted">Drag a chart in here!</p>
      {dragging && <Positioning onDrop={onDrop} />}
    </div>
  )
}
