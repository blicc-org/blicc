import React, { ReactElement } from 'react'
import { FooterNavListItem } from './FooterNavListItem'

export function FooterNavList({ list, close }: any): ReactElement {
  return (
    <div className="m-3">
      <h5>{list.category}</h5>
      <ul className="list-unstyled text-small">
        {list.items.map((item: any) => (
          <FooterNavListItem key={item.title} item={item} close={close} />
        ))}
      </ul>
    </div>
  )
}
