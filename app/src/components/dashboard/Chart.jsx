import React from 'react'
import './Chart.scss'

export function Chart({ type, id }) {
  const color = '#' + ((Math.random() * 0xffffff) << 0).toString(16)

  return (
    <div className="col-6 chart p-5" style={{ backgroundColor: color }}>
      <h3>{type}</h3>
      <h5>{id}</h5>
    </div>
  )
}
