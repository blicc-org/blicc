import React, { useEffect, useState, useRef } from 'react'
import { Loading } from '../loading/Loading'
import { API } from '../../../config'
import { useSettings } from '../../hooks/settings/useSettings'

export function PluginLoader({ id, type }) {
  const [accessSet, insertSet] = useSettings()
  const [bundle, plugin] = type.split('/')
  const ref = useRef()
  const [loading, setLoading] = useState(true)

  const labels = [
    'A',
    'B',
    'C',
    'D',
    'C',
    'F',
    'G',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
  ]

  const dataArray = [12, 19, 3, 5, 2, 3, 7, 11, 16, 7, 3, 18, 16, 1, 6, 8]
  const max = Math.floor(Math.random() * 15) + 1
  const data = {
    labels: labels.slice(0, max),
    data: dataArray.slice(0, max),
  }

  function onDataUpdate() {}

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

        const node = module[plugin](data, onDataUpdate, settings, setSettings)

        if (typeof node === 'string') {
          ref.current.innerHTML = node
        } else {
          if (ref.current.hasChildNodes()) {
            ref.current.replaceChild(node, ref.current.firstChild)
          } else {
            ref.current.appendChild(node)
          }
        }
      })
    }

    if (type) fetchPlugin()
    // eslint-disable-next-line
  }, [type])

  return loading ? <Loading /> : <div className="spread" ref={ref} />
}
