import { useEffect, useState, useRef } from 'react'
import { DELIVERY } from '../config/env'

export let sockets = undefined

export function useDeliveryEndpoint() {
  const url = `${DELIVERY.ORIGIN}/connection`
  const ref = useRef(null)
  const [state, setState] = useState(WebSocket.CLOSED)

  useEffect(() => {
    console.log(state)
    function start() {
      if (sockets === undefined) {
        setState(WebSocket.CONNECTING)
        sockets = new WebSocket(url)
      }

      ref.current = sockets

      ref.current.onopen = () => {
        setState(WebSocket.OPEN)
        ref.current.send('hey')
      }

      ref.current.onclose = () => {
        setState(WebSocket.CLOSED)
      }

      ref.current.onmessage = ({ data }) => {
        console.log(`Socket received message: ${data}`)
      }

      ref.current.onerror = event => {
        console.log(`Socket error occured: ${event}`)
      }
    }

    start()
    return () => {
      setState(WebSocket.CLOSING)
      // sockets.close()
    }
  })

  function publish(data) {}
  function subscribe() {}

  return [publish, subscribe]
}
