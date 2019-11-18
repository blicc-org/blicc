import React from 'react'
import { Link } from 'react-router-dom'

export function FooterNavListItem({ item, close }) {
  const listItem = !item.link.includes('http') ? (
    <Link className="text-muted" to={item.link} onClick={close}>
      {item.title}
    </Link>
  ) : (
    <a
      className="text-muted"
      target="_blank"
      rel="noopener noreferrer"
      href={item.link}
      onClick={close}
    >
      {item.title}
    </a>
  )

  return <li>{listItem}</li>
}
