import {
  instance,
  initializeUser,
  clearUser,
  getAdmin,
} from '../../../common/tests/user.helper'
import { pluginData } from '../mocks/plugin-data.mock'

describe('GET: /plugin-data/:bundle/:plugin', () => {
  let userParams = { email: '', userId: '', cookie: '' }
  let adminParams = { email: '', cookie: '' }
  const bundle = 'essentials'
  const plugin = 'pie-chart'

  beforeEach(async () => {
    userParams = await initializeUser()
    adminParams = await getAdmin()
    await instance.put(`/plugin-data/${bundle}/${plugin}`, pluginData, {
      headers: {
        Cookie: adminParams.cookie,
        'Content-Type': 'application/javascript',
      },
    })
  })

  afterEach(async () => {
    await clearUser(userParams.userId, userParams.cookie)
  })

  it('200: OK', async () => {
    const response = await instance.get(`/plugin-data/${bundle}/${plugin}`, {
      headers: {
        Cookie: userParams.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data).toBe(pluginData)
  })
})
