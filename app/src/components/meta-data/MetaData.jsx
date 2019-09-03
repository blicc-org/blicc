import React from 'react'
import { Helmet } from 'react-helmet'
import { APP_URL } from '../../config'

export default function MetaData({ title, description, path = '' }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <link rel="canonical" href={`${APP_URL}${path}`} />
    </Helmet>
  )
}
