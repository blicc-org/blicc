import React from 'react'
import { Link } from 'react-router-dom'
import './ItemThumbnail.scss'

export function ItemThumbnail({
  title,
  thumbnail,
  subtitle,
  description,
  link,
  linkLabel,
}) {
  return (
    <tr>
      <td width="110px">
        <img className="thumbnail" src={thumbnail} width="200px" />
      </td>
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
