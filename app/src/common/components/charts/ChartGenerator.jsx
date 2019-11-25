import React, { useEffect } from 'react'
import { API } from '../../../config'

export function ChartGenerator({ chartType }) {
  useEffect(() => {
    var script = document.createElement('script')
    script.onload = function() {
      console.log('loaded!!!')
    }

    script.crossOrigin = 'use-credentials'
    script.async = 'true'
    script.type = 'module'
    script.src = `${API.ORIGIN}/charts/plugin.mjs`

    document.head.appendChild(script) //or something of the likes
  }, [])

  return <></>
}
