import React, { useState, useEffect, useRef } from 'react'

export function Positioning({ onDrop }) {
  // 0: none, 1: top, 2: right, 3: bottom, 4: left, 5: middle
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
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width, height)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, height)
    ctx.lineTo(width, 0)
    ctx.stroke()
    ctx.strokeRect(width / 4, height / 4, width / 2, height / 2)
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

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'transparent',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onDragEnter={() => setSector(0)}
      onDragLeave={() => setSector(0)}
      onDragOver={event => {
        const [x, y] = getCanvasCoordinates(event.clientX, event.clientY)

        const width = canvasRef.current.offsetWidth
        const height = canvasRef.current.offsetHeight
        const [normalizedX, normalizedY] = normalize(x, y, width, height)

        setSector(
          isCenter(normalizedX, normalizedY)
            ? 5
            : getDirection(normalizedX, normalizedY)
        )
      }}
      onDrop={() => onDrop(sector)}
    ></canvas>
  )
}
