import React, { Suspense, lazy } from 'react'
import { Loading } from './Loading'

export function PluginLoader({ name }) {
  const ApiPlugin = lazy(() =>
    import(/*webpackIgnore: true*/ 'http://localhost/charts')
  )

  const data = {
    test: 'test',
  }

  function setSettings() {
    console.log('settings updated')
  }

  const settings = {}

  return (
    <Suspense fallback={<Loading />}>
      <ApiPlugin data={data} settings={settings} setSettings={setSettings} />
    </Suspense>
  )
}
