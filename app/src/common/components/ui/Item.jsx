import React from 'react'
import { Link } from 'react-router-dom'
import { lightgray } from '../../../Theme.scss'
import { useMobile } from '../../hooks'

export function Item({
  title,
  subtitle,
  description,
  link,
  linkLabel,
  thumbnail = '',
}) {
  const isMobile = useMobile()
  const style = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: lightgray,
  }

  return (
    <tr>
      {thumbnail && (
        <td style={{ width: '100px' }} className="px-0">
          <Link className="card-link" to={link}>
            <img
              style={style}
              src={thumbnail}
              width={isMobile ? '150px' : '200px'}
            />
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
