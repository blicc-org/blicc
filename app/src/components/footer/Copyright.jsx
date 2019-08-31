import React, { useContext } from 'react'
import { AppContext } from '../../common/context/AppContext'

export function Copyright() {
  const { metadata } = useContext(AppContext)
  return <p> {`${metadata.copyright} ${new Date().getFullYear()}`}</p>
}
