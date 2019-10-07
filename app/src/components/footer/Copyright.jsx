import React from 'react'
import { content } from '../../config/language/english'

export function Copyright() {
  return <p> {`${content.metadata.copyright} ${new Date().getFullYear()}`}</p>
}
