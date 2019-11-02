import { user } from '../../mocks/user.mock'
import { instance, initializeUser } from '../test/helper'

describe('POST: /dashboards', () => {
  let params = { email: '', userId: '', cookie: '' }
  beforeEach(async () => {
    params = await initializeUser()
  })

  it('201: Created', () => {
    console.log(params.email)
  })
})

describe('PUT: /dashboards/:id', () => {
  it('200: OK', () => {})
})

describe('DELETE: /dashboards/:id', () => {
  it('200: OK', () => {})
})

describe('GET: /dashboards', () => {
  it('200: OK', () => {})
})

describe('GET: /dashboards/:id', () => {
  it('200: OK', () => {})
})
