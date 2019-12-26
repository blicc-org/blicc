import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ACTION } from '../../hooks'
import './Positioning.scss'

export const MASK = {
  NONE: 0,
  SINGLE: 1,
  ROW: 2,
  COLUMN: 3,
}

export function Positioning({ onDrop, mask }) {
  const canvasRef = useRef(null)
  const [action, setAction] = useState(ACTION.NONE)

  useEffect(() => {
    function draw() {
      //TODO: draw mask according to action and mask
    }
    draw()
  }, [action])

  function onDropHandler(evt) {
    onDrop(action, evt.dataTransfer.getData('type'))
  }

  function onDragOver() {
    // TODO: set action according to pos and mask
    setAction(ACTION.REPLACE)
  }

  function onDragLeave() {
    setAction(ACTION.NONE)
  }

  return (
    <canvas
      className="positioning"
      ref={canvasRef}
      onDragOver={onDragOver}
      onDrop={onDropHandler}
      onDragLeave={onDragLeave}
    ></canvas>
  )
}
