import React, { useContext } from 'react'
import { FooterNavList } from './FooterNavList'
import { AppContext } from '../../../common/context/AppContext'

export function FooterNav() {
  const data = useContext(AppContext)
  return (
    <>
      {data.footerNavigation.map(list => (
        <FooterNavList key={list.category} list={list} />
      ))}
    </>
  )
}
