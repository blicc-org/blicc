import React from 'react'
import { FooterNavList } from './FooterNavList'
import { content } from '../../../Content'

export function FooterNav() {
  return (
    <>
      {content.footerNavigation.map(list => (
        <FooterNavList key={list.category} list={list} />
      ))}
    </>
  )
}
