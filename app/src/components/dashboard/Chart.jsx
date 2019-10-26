import React from 'react'
import { Positioning } from './Positioning'
import './Chart.scss'

export function Chart({ type, id, onDrop }) {
  const color = '#' + ((Math.random() * 0xffffff) << 0).toString(16)

  return (
    <div
      className="col-6 chart p-5"
      key={id}
      style={{ backgroundColor: color }}
    >
      <Positioning onDrop={onDrop} />
      <h3>{type}</h3>
      <h5>{id}</h5>
    </div>
  )
}
