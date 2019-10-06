import React from 'react'
import { content } from '../../language/Content'

export function NotFound() {
  const { pages } = content
  return (
    <div className="col-md-5 mx-auto py-5 my-5 text-center">
      <h1 className="display-4 font-weight-normal">{pages.notFound.title}</h1>
    </div>
  )
}
