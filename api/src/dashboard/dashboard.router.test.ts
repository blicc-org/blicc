import { instance, initializeUser } from '../test/user.helper'

describe('POST: /dashboards', () => {
  let params = { email: '', userId: '', cookie: '' }
  beforeEach(async () => {
    params = await initializeUser()
  })

  it('201: Created', async () => {
    const data = {
      title: 'Dashboard Name',
      data: {},
    }

    const response = await instance.post('/dashboards', data, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(201)
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
