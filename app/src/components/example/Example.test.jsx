import React from 'react'
import Example from './Example'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

describe('App tests', () => {
  it('Example', () => {
    const { container } = render(<Example />)
    expect(container).toBe(false)
  })
})
