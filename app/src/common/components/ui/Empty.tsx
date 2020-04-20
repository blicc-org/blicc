import React, { ReactElement } from 'react'

export function Empty({ children }: any): ReactElement {
  return <p className="text-muted mx-auto py-5 my-5 text-center">{children}</p>
}
