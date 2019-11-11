import React from 'react'
import { FooterNavList } from './FooterNavList'
import { arrangement } from './arrangement'

export function FooterNav() {
  return (
    <>
      {arrangement.map(list => (
        <FooterNavList key={list.category} list={list} />
      ))}
    </>
  )
}
