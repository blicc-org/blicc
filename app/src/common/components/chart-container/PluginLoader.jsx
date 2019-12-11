import React, { useEffect, useState, useRef } from 'react'
import { Loading } from './Loading'
import { API } from '../../../config'

export function PluginLoader({ slug }) {
  const [bundle, plugin] = slug.split('/')
  const ref = useRef()
  const [loading, setLoading] = useState(true)

  console.log(bundle + ' ' + plugin)

  useEffect(() => {
    async function fetchPlugin() {
      await import(
        /*webpackIgnore: true*/ `${API.ORIGIN}/bundles/${bundle}`
      ).then(module => {
        setLoading(false)

        const node = module[plugin]()

        if (typeof node === 'string') {
          ref.current.innerHTML = node
        } else {
          ref.current.appendChild(node)
        }
      })
    }

    fetchPlugin()
    // eslint-disable-next-line
  }, [slug])

  return loading ? <Loading /> : <div ref={ref} />
}
