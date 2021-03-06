import React, { useEffect, useState, useRef, ReactElement } from 'react'
import { Loading } from '../ui'
import { API } from '../../../config'
import { useSettings } from '../../hooks'

export function PluginLoader({
  id,
  type,
  keepAlive,
  publish,
  subscribe,
}: any): ReactElement {
  const [accessSet, insertSet] = useSettings()
  const [bundle, plugin] = type.split('/')
  const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const dataSourceId = accessSet(id, 'data_source')
  const channel = `/data-sources/${dataSourceId}`
  const data = { labels: [], datasets: [] }

  const style = {
    overflow: 'auto',
    width: '100%',
    height: '100%',
  }

  function onDataUpdate(callback = (res: any): any => res): void {
    const cb = (res: any): any => {
      keepAlive()
      return callback(res)
    }

    const preloaded = subscribe(channel, cb)
    if (preloaded) cb(preloaded)
  }

  const key = 'plugin_settings'
  const settings = accessSet(id, key)

  function setSettings(value: any): void {
    insertSet(id, key, value)
  }

  useEffect(() => {
    async function requestData(): Promise<void> {
      await publish(channel)
    }

    if (dataSourceId) requestData()
    // eslint-disable-next-line
  }, [dataSourceId, channel])

  useEffect(() => {
    async function fetchPlugin(): Promise<void> {
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
