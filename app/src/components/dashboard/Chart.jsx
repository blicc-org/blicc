import React from 'react'
import { Positioning } from './Positioning'
import './Chart.scss'

export function Chart({ type, id, isMobile, onDrop }) {
  const color = '#' + ((Math.random() * 0xffffff) << 0).toString(16)
  return (
    <div className="chart" key={id} style={{ backgroundColor: color }}>
      <Positioning onDrop={onDrop} />
      <h3>{type}</h3>
      <h5>{id}</h5>
      <div style={{ height: isMobile ? '200px' : '100px' }}></div>
    </div>
  )
}
