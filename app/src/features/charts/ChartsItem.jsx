import React from 'react'
import { Link } from 'react-router-dom'

export function ChartsItem({ chart }) {
  const { id, title, slug, description } = chart
  return (
    <tr>
      <td>
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{`@${slug}`}</h6>
        <p className="card-text">{description}</p>
        <Link className="card-link" to={`/charts/${id}`}>
          View Chart
        </Link>
      </td>
    </tr>
  )
}
