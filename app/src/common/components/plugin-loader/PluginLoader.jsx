import React, { useEffect, useState, useRef } from 'react'
import { Loading } from '../loading/Loading'
import { API } from '../../../config'
import { useSettings, useApiEndpoint, useDeliveryEndpoint } from '../../hooks'

export function PluginLoader({ id, type }) {
  const [accessSet, insertSet] = useSettings()
  const [bundle, plugin] = type.split('/')
  const ref = useRef()
  const [loading, setLoading] = useState(true)
  const dataSourceId = accessSet(id, 'data_source')
  const [, access] = useApiEndpoint(`/data-sources/${dataSourceId}`)
  const [publish, subscribe] = useDeliveryEndpoint()
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
    async function getDataSource() {
      const [status, res] = await access()
      if (status === 200) {
        const { data } = res
        if (data && data.url && data.query) {
          console.log(JSON.stringify({ channel, data }))
          publish(channel, data)
        }
      }
    }
    getDataSource()
  })

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
  }, [type])

  return loading ? <Loading /> : <div className="spread" ref={ref} />
}
