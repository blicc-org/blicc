import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useMobile } from '../../hooks'
import { Image } from './Image'

export function Item({
  title,
  subtitle,
  description,
  link,
  linkLabel,
  thumbnail = '',
}: any): ReactElement {
  const isMobile = useMobile()

  return (
    <ul>
      {thumbnail && (
        <li style={{ width: '100px' }} className="px-0">
          <Link className="card-link" to={link}>
            <Image
              src={thumbnail}
              width={isMobile ? 144 : 208}
              height={isMobile ? 81 : 117}
            />
          </Link>
        </li>
      )}
      <li>
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="card-text">{description}</p>
        <Link className="card-link" to={link}>
          {linkLabel}
        </Link>
      </li>
    </ul>
  )
}
