import { instance, initializeUser } from '../../../common/tests/user.helper'

describe('POST: /dashboards', () => {
  let params = { email: '', userId: '', cookie: '' }
  const body = {
    title: 'Title',
    description: '...',
    data: {},
  }

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
