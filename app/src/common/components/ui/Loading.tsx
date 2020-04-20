import React, { ReactElement } from 'react'
import { lightgray } from '../../../Theme.scss'

export function Loading(): ReactElement {
  const style = {
    alignSelf: 'center',
    margin: 'auto',
    color: lightgray,
  }
  return (
    <div className="spinner-border" style={style} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}
