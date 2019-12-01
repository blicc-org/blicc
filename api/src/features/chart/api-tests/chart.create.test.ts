import {
  getAdmin,
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { chart } from '../mocks/chart.mock'

describe('POST: /charts', () => {
  let params = { email: '', cookie: '' }

  beforeEach(async () => {
    params = await getAdmin()
  })

  it('201: Created', async () => {
    const { status } = await instance.post('/charts', chart, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(201)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.post('/charts', chart)
    expect(status).toBe(401)
  })

  it('403: Forbidden', async () => {
    const notAdminUser = await initializeUser()
    const { status } = await instance.post('/charts', chart, {
      headers: {
        Cookie: notAdminUser.cookie,
      },
    })
    expect(status).toBe(403)
    await clearUser(notAdminUser.userId, notAdminUser.cookie)
  })
})
