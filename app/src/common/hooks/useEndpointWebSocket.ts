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

export function useEndpointWebSocket(): [Publish, Subscribe] {
  const [callbackStack, setCallbackStack] = useState<Stack<Callback>>({})
  const [outgoing, setOutgoing] = useState<Stack<Data>>({})
  const [incoming, setIncoming] = useState<Stack<Data>>({})
  const wb = useRef<WebSocket | null>()

  useEffect(() => {
    if (wb.current) {
      wb.current.onmessage = (evt: any): void => {
        const { channel, data } = JSON.parse(evt.data)
        setIncoming((prev) => ({ ...prev, [channel]: data }))
        if (channel && data) {
          Object.keys(callbackStack).forEach((key) => {
            if (key.includes(channel)) callbackStack[key](data)
          })
        }
      }
    } else {
      wb.current = new WebSocket(`${DELIVERY.ORIGIN_WEBSOCKET}/connection`)

      wb.current.onopen = (): void => {
        Object.keys(outgoing).forEach((key) => {
          const payload = JSON.stringify({
            channel: key,
            data: outgoing[key],
          })
          if (wb.current) wb.current.send(payload)
        })
      }

      wb.current.onclose = (): void => {
        wb.current = null
      }

      wb.current.onerror = (evt: Event): void => console.log(evt)
    }
  }, [incoming, outgoing, callbackStack])

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
      setOutgoing((prev) => ({ ...prev, [channel]: data }))
    }
  }

  const subscribe: Subscribe = (channel, callback) => {
    const key = channel + uuid()
    setCallbackStack((prev) => ({ ...prev, [key]: callback }))
    return incoming[channel]
  }

  return [publish, subscribe]
}
