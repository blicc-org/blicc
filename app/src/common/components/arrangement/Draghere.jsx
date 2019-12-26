import React, { useContext } from 'react'
import { Positioning, MASK } from '../positioning/Positioning'
import { DragContext } from '../../context'
import './DragHere.scss'

export function DragHere({ onDrop }) {
  const [dragging] = useContext(DragContext)

  return (
    <div className="drag-here text-center pt-4">
      <p className="text-muted">Drag a chart in here!</p>
      {dragging && (
        <Positioning onDrop={action => onDrop(action)} mask={MASK.NONE} />
      )}
    </div>
  )
}
