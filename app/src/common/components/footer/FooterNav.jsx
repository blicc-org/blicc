import React from 'react'
import { FooterNavList } from './FooterNavList'
import { useFooterArrangement } from './useFooterArrangement'

export function FooterNav({ close }) {
  const arrangement = useFooterArrangement()
  return (
    <>
      {arrangement.map((list) => (
        <FooterNavList key={list.category} list={list} close={close} />
      ))}
    </>
  )
}
