import React from 'react'
import { FooterNavListItem } from './FooterNavListItem'

export function FooterNavList({ list }) {
  return (
    <div className="col-6 col-md">
      <h5>{list.category}</h5>
      <ul className="list-unstyled text-small">
        {list.items.map(item => (
          <FooterNavListItem key={item.title} item={item} />
        ))}
      </ul>
    </div>
  )
}
