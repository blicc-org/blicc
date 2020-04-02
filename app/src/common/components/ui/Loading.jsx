import React from 'react'

export function Loading() {
  const style = {
    alignSelf: 'center',
    margin: 'auto',
  }
  return (
    <div className="spinner-border text-primary" style={style} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}
