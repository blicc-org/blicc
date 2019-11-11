import React from 'react'
import { FooterNavList } from './FooterNavList'
import { content } from '../../content/english'

export function FooterNav() {
  return (
    <>
      {content.footerNavigation.map(list => (
        <FooterNavList key={list.category} list={list} />
      ))}
    </>
  )
}
