import React, { useEffect, useState, useRef } from 'react'
import { Loading } from './Loading'
import { API } from '../../../config'

export function PluginLoader({ slug }) {
  const [bundle, plugin] = slug.split('/')
  const ref = useRef()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlugin() {
      await import(
        /*webpackIgnore: true*/ `${API.ORIGIN}/bundles/${bundle}`
      ).then(module => {
        setLoading(false)

        const data = [12, 19, 3, 5, 2, 3]

        function sayHello() {
          console.log('Hello World!!!')
        }

        ref.current.appendChild(module[plugin](data, sayHello))
      })
    }

    fetchPlugin()
    // eslint-disable-next-line
  }, [slug])

  return loading ? <Loading /> : <div ref={ref} />
}
