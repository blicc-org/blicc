import React, { useEffect } from 'react'
import { API } from '../../../config'

export function PluginLoader({ slug }) {
  useEffect(() => {
    async function fetchPlugin() {
      await import(
        /*webpackIgnore: true*/ `${API.ORIGIN}/bundles/${slug}`
      ).then(module => {
        module.default()
        // → logs 'Hi from the default export!'
        module.doStuff()
        // → logs 'Doing stuff…'
      })
    }

    fetchPlugin()
    // eslint-disable-next-line
  }, [slug])

  return <div>Hello World!!!</div>
}
