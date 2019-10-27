import React, { useState, useEffect, useRef } from 'react'
import './Positioning.scss'

export const POSITION = {
  NONE: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
  LEFT: 4,
  REPLACE: 5,
}

export function Positioning({ onDrop }) {
  const [sector, setSector] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    const scale = window.devicePixelRatio
    const width = canvasRef.current.offsetWidth * scale
    const height = canvasRef.current.offsetHeight * scale
    canvasRef.current.width = width
    canvasRef.current.height = height

    ctx.lineWidth = scale
    // ctx.beginPath()
    // ctx.moveTo(0, 0)
    // ctx.lineTo(width, height)
    // ctx.stroke()
    // ctx.beginPath()
    // ctx.moveTo(0, height)
    // ctx.lineTo(width, 0)
    // ctx.stroke()
    // ctx.strokeRect(width / 4, height / 4, width / 2, height / 2)
  })

  function isCenter(x, y) {
    return x > 0.25 && x < 0.75 && (y > 0.25 && y < 0.75)
  }

  function getDirection(x, y) {
    if (x > y) {
      return x + y < 1 ? 1 : 2
    } else {
      return x + y >= 1 ? 3 : 4
    }
  }

  function normalize(x, y, width, height) {
    return [x / width, y / height]
  }

  function getCanvasCoordinates(clientX, clientY) {
    const rect = canvasRef.current.getBoundingClientRect()
    return [clientX - rect.left, clientY - rect.top]
  }

  function onDragOver(event) {
    const [x, y] = getCanvasCoordinates(event.clientX, event.clientY)

    const width = canvasRef.current.offsetWidth
    const height = canvasRef.current.offsetHeight
    const [normalizedX, normalizedY] = normalize(x, y, width, height)

    setSector(
      isCenter(normalizedX, normalizedY)
        ? POSITION.REPLACE
        : getDirection(normalizedX, normalizedY)
    )
  }

  function onDropHandler(event) {
    onDrop(sector, event.dataTransfer.getData('chart_type'))
  }

  return (
    <canvas
      className="positioning"
      ref={canvasRef}
      onDragOver={onDragOver}
      onDrop={onDropHandler}
    ></canvas>
  )
}
