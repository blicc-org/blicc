import React, { useState } from 'react'
import './Chart.scss'

export function Chart({ type, id }) {
  const color = '#' + ((Math.random() * 0xffffff) << 0).toString(16)
  const [active, setActive] = useState(false)

  return (
    <div
      className="col-6 chart p-5"
      style={{ backgroundColor: color }}
      onDragEnter={() => setActive(true)}
      onDragLeave={() => setActive(false)}
      onDrop={event => {
        event.preventDefault()
        console.log(`You dropped on ${id}`)
      }}
    >
      <h3>{type}</h3>
      <h5>{id}</h5>
      <h6>{active.toString()}</h6>
    </div>
  )
}
