import { useEffect, useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { DELIVERY } from '../../config'

type Data = any
type Callback = (data: Data) => void
type Publish = (channel: string, data?: Data) => void
type Subscribe = (channel: string, callback: Callback) => Data

interface Stack<T> {
  [key: string]: T
}

export let incoming: Stack<Data> = {}
export let outgoing: Stack<Data> = {}

export function useEndpointWebSocket(): [Publish, Subscribe] {
  const url = `${DELIVERY.ORIGIN_WEBSOCKET}/connection`
  const wb = useRef<WebSocket | null>()
  const [stack, setStack] = useState<Stack<Callback>>({})

  useEffect(() => {
    if (!wb.current) wb.current = new WebSocket(url)

    wb.current.onopen = (): void => {
      Object.keys(outgoing).forEach((key) => {
        const payload = JSON.stringify({
          channel: key,
          data: outgoing[key],
        })
        if (wb.current) wb.current.send(payload)
      })
    }

    wb.current.onmessage = (evt: any): void => {
      const { channel, data } = JSON.parse(evt.data)
      incoming[channel] = data
      if (channel && data) {
        Object.keys(stack).forEach((key) => {
          if (key.includes(channel)) stack[key](data)
        })
      }
    }

    wb.current.onclose = (): void => {
      wb.current = null
    }

    wb.current.onerror = (evt: Event): void => console.log(evt)
  }, [stack])

  useEffect(() => {
    return (): void => {
      if (wb.current) wb.current.close()
      wb.current = null
      incoming = outgoing = {}
    }
  }, [])

  const publish: Publish = (channel: string, data: any = null): void => {
    if (wb.current && wb.current.readyState === WebSocket.OPEN) {
      const msg = JSON.stringify(data ? { channel, data } : { channel })
      wb.current.send(msg)
    } else {
      outgoing[channel] = data
    }
  }

  const subscribe: Subscribe = (channel, callback) => {
    const key = channel + uuid()
    setStack((prev) => ({ ...prev, [key]: callback }))
    return incoming[channel]
  }

  return [publish, subscribe]
}
