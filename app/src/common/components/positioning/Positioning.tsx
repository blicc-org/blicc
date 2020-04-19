import React, { useState, useEffect, useRef } from 'react'
import { useSelectAction, useDrawQuad, ACTION, MASK } from '../../hooks'
import { DRAG } from '../../context'
import './Positioning.scss'

export function Positioning({ onDrop, mask }: any) {
  const canvasRef: any = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef(null)
  const [action, setAction] = useState(ACTION.NONE)
  const selectAction = useSelectAction()
  const drawQuad = useDrawQuad()

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
  }, [action, drawQuad, mask])

  function onDropHandler() {
    if (mask === MASK.DATA) {
      onDrop(DRAG.DATA, {})
    } else {
      onDrop(DRAG.CHART, { action })
    }
  }

  function onDragOver(evt: any) {
    setAction(selectAction(canvasRef, evt, mask))
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
