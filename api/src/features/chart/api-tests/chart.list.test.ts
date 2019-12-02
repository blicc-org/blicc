import {
  initializeUser,
  instance,
  getAdmin,
  clearUser,
} from '../../../common/tests/user.helper'
import { chart } from '../mocks/chart.mock'

describe('get: /charts/', () => {
  let userParams = { email: '', userId: '', cookie: '' }
  let adminParams = { email: '', cookie: '' }
  let id = ''

  beforeEach(async () => {
    userParams = await initializeUser()
    adminParams = await getAdmin()
    const response = await instance.post('/charts', chart, {
      headers: {
        Cookie: adminParams.cookie,
      },
    })
    id = response.data.id
  })

  afterEach(async () => {
    await clearUser(userParams.userId, userParams.cookie)
  })

  it('200: OK', async () => {
    const response = await instance.get(`/charts`, {
      headers: {
        Cookie: userParams.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.total).toBeGreaterThan(0)
    expect(response.data.charts.length).toBeGreaterThan(0)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.get(`/charts/${id}`)
    expect(status).toBe(401)
  })
})
