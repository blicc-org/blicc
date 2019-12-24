import React, { useEffect, useState, useRef } from 'react'
import { Loading } from '../loading/Loading'
import { API } from '../../../config'
import { useSettings } from '../../hooks/settings/useSettings'

export function PluginLoader({ id }) {
  const [accessSet] = useSettings()
  const slug = accessSet(id, 'type')
  const [bundle, plugin] = slug.split('/')
  const ref = useRef()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlugin() {
      await import(
        /*webpackIgnore: true*/ `${API.ORIGIN}/bundles/${bundle}`
      ).then(module => {
        setLoading(false)

        const data = [213, 342, 23, 123, 23]
        const node = module[plugin](data, {}, () => {})

        if (typeof node === 'string') {
          ref.current.innerHTML = node
        } else {
          ref.current.appendChild(node)
        }
      })
    }

    if (slug) fetchPlugin()
    // eslint-disable-next-line
  }, [slug])

  return loading ? <Loading /> : <div ref={ref} />
}
