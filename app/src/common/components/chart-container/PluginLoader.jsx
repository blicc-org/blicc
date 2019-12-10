import React, { useEffect, useState, useRef } from 'react'
import { Loading } from './Loading'
import { API } from '../../../config'

export function PluginLoader({ slug }) {
  const ref = useRef()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlugin() {
      await import(
        /*webpackIgnore: true*/ `${API.ORIGIN}/bundles/${slug}`
      ).then(module => {
        setLoading(false)
        ref.current.appendChild(module['HelloWorld']())
      })
    }

    fetchPlugin()
    // eslint-disable-next-line
  }, [slug])

  return loading ? <Loading /> : <div ref={ref} />
}
