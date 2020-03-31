import React, { useEffect, useState, useRef } from 'react'
import { Loading } from '../loading/Loading'
import { API } from '../../../config'
import { useSettings, useDeliveryEndpoint } from '../../hooks'

export function PluginLoader({ id, type, keepAlive }) {
  const [accessSet, insertSet] = useSettings()
  const [bundle, plugin] = type.split('/')
  const [loading, setLoading] = useState(true)
  const [, subscribe] = useDeliveryEndpoint()
  const ref = useRef()
  const dataSourceId = accessSet(id, 'data_source')
  const channel = `/data-delivery/${dataSourceId}`
  const data = { labels: [], datasets: [] }

  const style = {
    overflow: 'auto',
    width: '100%',
    height: '100%',
  }

  function onDataUpdate(callback = (res) => res) {
    const cb = (res) => {
      keepAlive()
      return callback(res)
    }

    const preloaded = subscribe(channel, cb)
    if (preloaded) cb(preloaded)
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
      ).then((module) => {
        setLoading(false)
        const node = module[plugin](data, onDataUpdate, settings, setSettings)

        if (ref.current) {
          ref.current.innerHTML = ''
          if (typeof node === 'string') {
            ref.current.innerHTML = node
          } else {
            ref.current.appendChild(node)
          }
        }
      })
    }

    if (type) fetchPlugin()
    // eslint-disable-next-line
  }, [type, dataSourceId])

  return loading ? <Loading /> : <div style={style} ref={ref} />
}
