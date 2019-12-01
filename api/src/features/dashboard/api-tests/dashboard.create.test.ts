import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { dashboard } from '../mocks/dashboard.mock'

describe('POST: /dashboards', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  afterEach(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('201: Created', async () => {
    const { status, data } = await instance.post('/dashboards', dashboard, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(201)
    expect(data.userId).toBe(params.userId)
  })

  it('401: Unauthorized', async () => {
    let response = await instance.post('/dashboards', dashboard, {})
    expect(response.status).toBe(401)

    response = await instance.post('/dashboards', { data: {} }, {})
    expect(response.status).toBe(401)
  })
})
