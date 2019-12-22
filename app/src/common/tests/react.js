import React from 'react'
import { render } from '@testing-library/react'
import { ArrangementProvider } from '../context/ArrangementContext'

const Provider = ({ children }) => {
  return <ArrangementProvider>{children}</ArrangementProvider>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Provider, ...options })

export * from '@testing-library/react'
export { customRender as render }
