import React from 'react'
import { Link } from 'react-router-dom'

export function Item({ title, subtitle, description, link, linkLabel }) {
  return (
    <tr>
      <td>
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="card-text">{description}</p>
        <Link className="card-link" to={link}>
          {linkLabel}
        </Link>
      </td>
    </tr>
  )
}
