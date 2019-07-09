import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

export default function Copyright() {
  const { metadata } = useContext(AppContext)
  return <p> {`${metadata.copyright} ${new Date().getFullYear()}`}</p>
}
