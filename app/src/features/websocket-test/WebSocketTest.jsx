import React, { useEffect } from 'react'
import { useDeliveryEndpoint, WebSocketState } from '../../common/hooks'

export function WebSocketTest() {
  const [publish, subscribe, state] = useDeliveryEndpoint()

  useEffect(() => {
    subscribe('example', data => console.log(data))
  }, [subscribe])

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Websocket Test</h2>
        </div>
        <div className="col-md-5 mx-auto py-5 my-5 text-center">
          <p>
            {`WebSocket connection state: ${WebSocketState[state]}, click to test: `}
            <button onClick={() => publish('Hello World!!!')}>
              Say Hallo!
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
