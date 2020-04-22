import React, { ReactElement } from 'react'

interface Props {
  title: string
  children?: ReactElement | Array<ReactElement>
}

export function Heading({ title, children }: Props): ReactElement {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
      <h2 className="my-2">{title}</h2>
      <div className="btn-toolbar">{children}</div>
    </div>
  )
}
