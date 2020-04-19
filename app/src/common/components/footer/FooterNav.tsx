import React from 'react'
import { FooterNavList } from './FooterNavList'
import { useFooterArrangement } from './useFooterArrangement'

export function FooterNav({ close }: any) {
  const arrangement = useFooterArrangement()
  return (
    <>
      {arrangement.map((list: any) => (
        <FooterNavList key={list.category} list={list} close={close} />
      ))}
    </>
  )
}
