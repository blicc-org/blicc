import React, { useEffect, useRef, useState } from 'react'
import { Loading } from './Loading'
import { API } from '../../../config'
import theme from '../../../Theme.scss'

export function PluginLoader({ slug }) {
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState({})
  const ref = useRef()

  useEffect(() => {
    async function fetchPlugin() {
      const Plugin = await import(
        /*webpackIgnore: true*/ `${API.ORIGIN}/plugin-data/${slug}`
      )
        .then(() => {
          setIsLoading(false)

          const data = [1.0, 0.4, 0.6, 2.3, 0.9, 7.5]
          function onDataUpdate(callback) {
            callback()
          }

          const layout = {
            color: theme.primary,
          }

          Plugin.render(
            ref.current,
            data,
            onDataUpdate,
            settings,
            setSettings,
            layout
          )
        })
        .catch(error => {
          console.log(error)
        })
    }

    fetchPlugin()
  }, [])

  return <>{isLoading ? <Loading /> : <div ref={ref} />}</>
}
