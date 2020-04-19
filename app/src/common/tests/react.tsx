import React from 'react'
import { render } from '@testing-library/react'
import { ArrangementProvider } from '../context/ArrangementContext'

function Provider({ children }: any) {
  return <ArrangementProvider>{children}</ArrangementProvider>
}

const customRender = (ui: any, options: any) =>
  render(ui, { wrapper: Provider, ...options })

export * from '@testing-library/react'
export { customRender as render }
