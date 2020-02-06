import React from 'react'
import { useDeliveryEndpoint } from '../../common/hooks'

export function Pwa() {
  // close websocket connection on logged out
  useDeliveryEndpoint()

  return (
    <>
      <div className="col-md-5 mx-auto py-5 my-5 text-center">
        This is a PWA installed!!!
      </div>
      {window.matchMedia('(display-mode: standalone)').matches &&
        'INSTALLED APP'}
    </>
  )
}
