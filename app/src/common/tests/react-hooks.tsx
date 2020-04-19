import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { ArrangementProvider } from '../context/ArrangementContext'

const Provider = ({ children }: any) => {
  return <ArrangementProvider>{children}</ArrangementProvider>
}

const customRender = (ui: any, options: any) =>
  renderHook(ui, { wrapper: Provider, ...options })

export * from '@testing-library/react-hooks'
export { customRender as renderHook }
