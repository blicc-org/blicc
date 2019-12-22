import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { ArrangementProvider } from '../context/ArrangementContext'

const Provider = ({ children }) => {
  return <ArrangementProvider>{children}</ArrangementProvider>
}

const customRender = (ui, options) =>
  renderHook(ui, { wrapper: Provider, ...options })

export * from '@testing-library/react-hooks'
export { customRender as renderHook }
