import React from 'react'

export function ChartsItem({ chart }) {
  return (
    <tr>
      <td>
        <h5 className="card-title">{chart.title}</h5>
        <p>{chart.id}</p>
        <p>{chart.bundle}</p>
        <p>{chart.description}</p>
        <p>{chart.creationDate}</p>
        <p>{chart.slug}</p>
      </td>
    </tr>
  )
}
