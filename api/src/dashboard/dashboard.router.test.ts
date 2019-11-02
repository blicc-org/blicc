import { instance, initializeUser } from '../test/user.helper'

describe('POST: /dashboards', () => {
  const body = {
    title: 'Dashboard Name',
    data: {},
  }
  let params = { email: '', userId: '', cookie: '' }
  beforeEach(async () => {
    params = await initializeUser()
  })

  it('201: Created', async () => {
    const { status, data } = await instance.post('/dashboards', body, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(201)
    expect(data.userId).toBe(params.userId)
  })

  it('401: Unauthorized', async () => {
    let response = await instance.post('/dashboards', body, {})
    expect(response.status).toBe(401)

    response = await instance.post('/dashboards', { data: {} }, {})
    expect(response.status).toBe(401)
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
