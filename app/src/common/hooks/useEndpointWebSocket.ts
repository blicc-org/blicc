import { useEffect, useState, useCallback, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { DELIVERY } from '../../config'

export const cache: any = []

type Data = any
type Callback = (data: Data) => void
type Publish = (channel: string, data?: Data) => void
type Subscribe = (channel: string, callback: Callback) => Data

interface Stack<T> {
  [key: string]: T
}

export function useEndpointWebSocket(): [Publish, Subscribe] {
  const wb = useRef<WebSocket | null>()
  const [cb, setCb] = useState<Stack<Callback>>({})
  const [sub, setSub] = useState<Stack<Data>>({})

  useEffect(() => {
    if (!wb.current) {
      wb.current = new WebSocket(`${DELIVERY.ORIGIN_WEBSOCKET}/connection`)

      wb.current.onopen = (): void => {
        Object.keys(cb).forEach((channel) => {
          const payload = JSON.stringify({
            channel,
            data: cb[channel],
          })
          if (wb.current) wb.current.send(payload)
        })
      }

      wb.current.onclose = (): void => {
        wb.current = null
      }

      wb.current.onerror = (err: any): void => {
        console.log(`Websocket error: ${err}`)
      }
    } else {
      wb.current.onmessage = (evt: any): void => {
        const { channel, data } = JSON.parse(evt.data)
        cache[channel] = data
        if (channel && data && sub) {
          for (const key of Object.keys(sub)) {
            if (key.includes(channel)) sub[key](data)
          }
        }
      }
    }
  }, [sub, cb, setCb])

  useEffect(() => {
    return (): void => {
      if (wb.current) {
        wb.current.close()
        wb.current = null
      }
    }
  }, [])

  const publish: Publish = (channel: string, data: any = null): void => {
    if (wb.current && wb.current.readyState === WebSocket.OPEN) {
      wb.current.send(JSON.stringify(data ? { channel, data } : { channel }))
    } else {
      setCb((prev) => {
        prev[channel] = data
        return prev
      })
    }
  }

  const subscribe: Subscribe = useCallback(
    (channel, callback) => {
      if (typeof callback !== 'function') {
        return
      }
      const key = channel + uuid()
      setSub((prev) => ({
        ...prev,
        [key]: callback,
      }))
      return cache[channel]
    },
    [setSub]
  )

  return [publish, subscribe]
}
