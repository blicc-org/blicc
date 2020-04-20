import React, { ReactElement } from 'react'

export function Offline(): ReactElement {
  return (
    <div className="col-md-5 mx-auto py-5 my-5 text-center">
      <h1 className="display-4 font-weight-normal">Offline</h1>
      <p>
        You are currently offline and the requested page is not yet stored in
        the cache!
      </p>
    </div>
  )
}
