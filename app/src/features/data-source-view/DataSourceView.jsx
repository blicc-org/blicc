import React from 'react'

export function DataSourceView({ match }) {
  return <h1>{match.params.id}</h1>
}
