import React from 'react'
import { Link } from 'react-router-dom'
import './ItemThumbnail.scss'
import { useMobile } from '../../hooks'

export function ItemThumbnail({
  title,
  thumbnail,
  subtitle,
  description,
  link,
  linkLabel,
}) {
  const isMobile = useMobile()
  return (
    <tr>
      {!isMobile && (
        <td width="110px">
          <Link className="card-link" to={link}>
            <img className="thumbnail" src={thumbnail} width="200px" />
          </Link>
        </td>
      )}
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
