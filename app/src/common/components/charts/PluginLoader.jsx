import React, { Suspense, lazy } from 'react'
import { Loading } from './Loading'

export function PluginLoader({ name }) {
  const Plugin = lazy(() =>
    import(/* webpackChunkName: "[request]" */ `../../../plugins/${name}/index`)
  )
  return (
    <Suspense fallback={<Loading />}>
      <Plugin />
    </Suspense>
  )
}
