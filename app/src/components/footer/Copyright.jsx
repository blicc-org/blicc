import React from 'react'
import { content } from '../../language/Content'

export function Copyright() {
  return <p> {`${content.metadata.copyright} ${new Date().getFullYear()}`}</p>
}
