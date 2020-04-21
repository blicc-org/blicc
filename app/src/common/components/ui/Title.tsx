import React from 'react'

interface Props {
  title: string
}

export function Title({ title }: Props) {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
      <h2 className="my-0">{title}</h2>
    </div>
  )
}
