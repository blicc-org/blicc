import React, { useContext } from 'react'
import { Positioning } from '../positioning/Positioning'
import { MASK } from '../../hooks'
import { DragContext, DRAG } from '../../context'
import './DragHere.scss'

export function DragHere({ onDrop }) {
  const [dragging] = useContext(DragContext)

  return (
    <div className="drag-here text-center pt-4">
      <p className="text-muted">Drag a chart in here!</p>
      {dragging !== DRAG.NONE && (
        <Positioning
          type={dragging}
          onDrop={action => onDrop(action)}
          mask={MASK.NONE}
        />
      )}
    </div>
  )
}
