import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterNavListItem({ item }) {
  const listItem = !item.link.includes('http') ? (
    <Link className="text-muted" to={item.link}>
      {item.title}
    </Link>
  ) : (
    <a
      className="text-muted"
      target="_blank"
      rel="noopener noreferrer"
      href={item.link}
    >
      {item.title}
    </a>
  )

  return <li>{listItem}</li>
}
