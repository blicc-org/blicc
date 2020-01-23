import React, { useEffect, useState, useRef } from 'react'
import { Loading } from '../loading/Loading'
import { API } from '../../../config'
import { useSettings, useDeliveryEndpoint } from '../../hooks'

export function PluginLoader({ id, type }) {
  const [accessSet, insertSet] = useSettings()
  const [bundle, plugin] = type.split('/')
  const [loading, setLoading] = useState(true)
  const [, subscribe] = useDeliveryEndpoint()
  const ref = useRef()
  const dataSourceId = accessSet(id, 'data_source')
  const channel = `/data-delivery/${dataSourceId}`

  function onDataUpdate(callback = res => res) {
    subscribe(channel, callback)
  }

  const key = 'plugin_settings'
  const settings = accessSet(id, key)

  function setSettings(value) {
    insertSet(id, key, value)
  }

  useEffect(() => {
    async function fetchPlugin() {
      await import(
        /*webpackIgnore: true*/ `${API.ORIGIN}/bundles/${bundle}`
      ).then(module => {
        setLoading(false)
        const data = { labels: [], datasets: [] }
        const node = module[plugin](data, onDataUpdate, settings, setSettings)

        if (ref.current) {
          if (typeof node === 'string') {
            ref.current.innerHTML = node
          } else {
            if (ref.current.hasChildNodes()) {
              ref.current.replaceChild(node, ref.current.firstChild)
            } else {
              ref.current.appendChild(node)
            }
          }
        }
      })
    }

    if (type) fetchPlugin()
    // eslint-disable-next-line
  }, [type, dataSourceId])

  return loading ? <Loading /> : <div className="spread" ref={ref} />
}