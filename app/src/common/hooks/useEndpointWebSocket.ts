import { useEffect, useState, useContext, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { AppContext } from '../context'
import { DELIVERY } from '../../config'

export let socket: any = null
export const cache: any = []

type Data = any
type Callback = (data: Data) => void
type Publish = (channel: string, data?: Data) => void
type Subscribe = (channel: string, callback: Callback) => Data

interface Stack<T> {
  [key: string]: T
}

export function useEndpointWebSocket(): [Publish, Subscribe] {
  const [cbStack, setCbStack] = useState<Stack<Callback>>({})
  const [subStack, setSubStack] = useState<Stack<Data>>([])
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState
  const initialState = socket !== null ? socket.readyState : WebSocket.CLOSED
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (loggedIn && socket === null) {
      setState(WebSocket.CONNECTING)
      socket = new WebSocket(`${DELIVERY.ORIGIN_WEBSOCKET}/connection`)

      socket.onopen = (): void => {
        Object.keys(cbStack).forEach((channel) => {
          const payload = JSON.stringify({
            channel,
            data: cbStack[channel],
          })
          socket.send(payload)
        })
        setState(WebSocket.OPEN)
        setCbStack({})
      }

      socket.onclose = (): void => {
        socket = null
        setState(WebSocket.CLOSED)
      }

      socket.onerror = (err: any): void => {
        console.log(
          `An websocket error occured: ${JSON.stringify(err, [
            'message',
            'arguments',
            'type',
            'name',
          ])}`
        )
      }
    }

    if (loggedIn && socket !== null) {
      socket.onmessage = (evt: any): void => {
        const { channel, data } = JSON.parse(evt.data)
        cache[channel] = data
        if (channel && data && subStack) {
          for (const key of Object.keys(subStack)) {
            if (key.includes(channel)) subStack[key](data)
          }
        }
      }
    }

    if (!loggedIn && socket !== null) {
      socket.close()
      setState(WebSocket.CLOSING)

      return (): void => {
        socket = null
      }
    }
  }, [loggedIn, subStack, state, cbStack, setCbStack])

  useEffect(() => {
    return (): void => {
      if (socket) {
        socket.close()
        setState(WebSocket.CLOSED)
        socket = null
      }
    }
  }, [])

  const publish: Publish = (channel: string, data: any = null): void => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data ? { channel, data } : { channel }))
    } else {
      setCbStack((prev: any): any => {
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
      const id = channel + uuid()
      setSubStack((stack: Stack<Data>) => ({
        ...stack,
        [id]: callback,
      }))
      return cache[channel] ? cache[channel] : null
    },
    [setSubStack]
  )

  return [publish, subscribe]
}
