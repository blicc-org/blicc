import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useColor } from '../../../hooks'
import theme from '../../../../Theme.scss'
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
  const contextRef = useRef(null)
  const [hexToRgb] = useColor()
  const color = hexToRgb(theme.primary)
  const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, 0.25)`

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    const scale = window.devicePixelRatio
    const width = canvasRef.current.offsetWidth * scale
    const height = canvasRef.current.offsetHeight * scale
    canvasRef.current.width = width
    canvasRef.current.height = height
    ctx.lineWidth = scale
    contextRef.current = ctx
  })

  const drawQuad = useCallback(
    (p1, p2, p3, p4) => {
      contextRef.current.fillStyle = rgba
      contextRef.current.beginPath()
      contextRef.current.moveTo(p1.x, p1.y)
      contextRef.current.lineTo(p2.x, p2.y)
      contextRef.current.lineTo(p3.x, p3.y)
      contextRef.current.lineTo(p4.x, p4.y)
      contextRef.current.closePath()
      contextRef.current.fill()
    },
    [rgba]
  )

  useEffect(() => {
    function draw() {
      const width = canvasRef.current.width
      const height = canvasRef.current.height
      const p1 = { x: 0, y: 0 }
      const p2 = { x: width, y: 0 }
      const p3 = { x: width, y: height }
      const p4 = { x: 0, y: height }
      const p5 = { x: width / 4, y: height / 4 }
      const p6 = { x: (width * 3) / 4, y: height / 4 }
      const p7 = { x: (width * 3) / 4, y: (height * 3) / 4 }
      const p8 = { x: width / 4, y: (height * 3) / 4 }

      switch (sector) {
        case POSITION.TOP:
          drawQuad(p1, p2, p6, p5)
          break
        case POSITION.RIGHT:
          drawQuad(p2, p3, p7, p6)
          break
        case POSITION.BOTTOM:
          drawQuad(p3, p4, p8, p7)
          break
        case POSITION.LEFT:
          drawQuad(p4, p1, p5, p8)
          break
        case POSITION.REPLACE:
          drawQuad(p5, p6, p7, p8)
          break
        default:
      }
    }
    draw()
  }, [sector, color, drawQuad])

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
    setSector(POSITION.NONE)
    onDrop(sector, event.dataTransfer.getData('chart_type'))
  }

  function onDragLeave() {
    setSector(POSITION.NONE)
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
