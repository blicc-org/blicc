import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useMobile } from '../../hooks'
import { Image } from './Image'
import styles from './Item.module.scss'

interface ImageSize {
  width: number
  height: number
}

export function Item({
  title,
  subtitle,
  description,
  link,
  linkLabel,
  thumbnail = '',
}: any): ReactElement {
  const mobile: ImageSize = { width: 144, height: 81 }
  const desktop: ImageSize = { width: 208, height: 117 }
  const isMobile = useMobile()

  return (
    <div className={styles.item}>
      {thumbnail && (
        <Link to={link} className={styles.image}>
          <Image
            src={thumbnail}
            width={isMobile ? mobile.width : desktop.width}
            height={isMobile ? mobile.height : desktop.height}
          />
        </Link>
      )}
      <div>
        <h5>{title}</h5>
        <h6 className="text-muted">{subtitle}</h6>
        <p>{description}</p>
        <Link to={link}>{linkLabel}</Link>
      </div>
    </div>
  )
}
