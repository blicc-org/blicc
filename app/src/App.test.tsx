import React from 'react'
import { App } from './App'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

describe('App tests', () => {
  it('should render properly', () => {
    expect(() => render(<App />)).not.toThrowError()
  })
})
