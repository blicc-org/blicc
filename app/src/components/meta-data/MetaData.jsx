import React from 'react'
import { Helmet } from 'react-helmet'
import { APP } from '../../config/env'

export default function MetaData({ title, description, path = '' }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <link rel="canonical" href={`${APP}${path}`} />
    </Helmet>
  )
}
