import React, { Suspense, lazy } from 'react'
import { Loading } from './Loading'

export function PluginLoader({ name }) {
  const Plugin = lazy(() =>
    import(/* webpackChunkName: "[request]" */ `../../../plugins/${name}/index`)
  )

  const ApiPlugin = lazy(() =>
    import(/*webpackIgnore: true*/ 'http://localhost/charts')
  )

  const data = {
    test: 'test',
  }

  return (
    <Suspense fallback={<Loading />}>
      <ApiPlugin data={data} />
    </Suspense>
  )
}
