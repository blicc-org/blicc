import React, { useState, useEffect, useRef } from 'react'
import { usePositioning, ACTION } from '../../hooks'
import './Positioning.scss'

export function Positioning({ onDrop, mask }) {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const [action, setAction] = useState(ACTION.NONE)
  const [whichAction, drawQuad] = usePositioning()

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    const scale = window.devicePixelRatio
    const width = canvasRef.current.offsetWidth * scale
    const height = canvasRef.current.offsetHeight * scale
    canvasRef.current.width = width
    canvasRef.current.height = height
    ctx.lineWidth = scale
    ctxRef.current = ctx
  })

  useEffect(() => {
    drawQuad(canvasRef, ctxRef, action, mask)
  }, [action, drawQuad])

  function onDropHandler(evt) {
    onDrop(action, evt.dataTransfer.getData('type'))
  }

  function onDragOver(evt) {
    setAction(whichAction(canvasRef, evt, mask))
    console.log('action: ', whichAction(canvasRef, evt, mask))
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
