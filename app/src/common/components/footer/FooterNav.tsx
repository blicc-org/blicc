import React, { ReactElement } from 'react'
import { FooterNavList } from './FooterNavList'
import { useFooterArrangement } from './useFooterArrangement'

export function FooterNav({ close }: any): ReactElement {
  const arrangement = useFooterArrangement()
  return (
    <>
      {arrangement.map(
        (list: any): ReactElement => (
          <FooterNavList key={list.category} list={list} close={close} />
        )
      )}
    </>
  )
}
