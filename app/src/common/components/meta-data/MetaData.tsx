import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet-async'
import { APP } from '../../../config'

export function MetaData({ title, description, path = '' }: any): ReactElement {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <link rel="canonical" href={`${APP.ORIGIN}${path}`} />
    </Helmet>
  )
}
