import React, { Suspense, lazy, useState } from 'react'
import { Loading } from './Loading'
import { API } from '../../../config'

export function PluginLoader({ slug }) {
  const ApiPlugin = lazy(() =>
    import(/*webpackIgnore: true*/ `${API.ORIGIN}/plugin-data/${slug}`)
  )
  const [settings, setSettings] = useState({})

  const data = {
    test: 'test',
  }

  function onDataUpdate(callback) {
    callback()
  }

  return (
    <Suspense fallback={<Loading />}>
      <ApiPlugin
        data={data}
        onDataUpdate={onDataUpdate}
        settings={settings}
        setSettings={setSettings}
      />
    </Suspense>
  )
}
