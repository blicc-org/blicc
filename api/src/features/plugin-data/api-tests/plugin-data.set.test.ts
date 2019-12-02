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
    adminParams = await getAdmin()
  })
  it('200: OK', async () => {
    const response = await instance.put(
      `/plugin-data/${bundle}/${plugin}`,
      pluginData,
      {
        headers: {
          Cookie: adminParams.cookie,
          'Content-Type': 'application/javascript',
        },
      }
    )
    expect(response.status).toBe(200)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.put(
      `/plugin-data/${bundle}/${plugin}`,
      pluginData,
      {
        headers: {
          'Content-Type': 'application/javascript',
        },
      }
    )
    expect(response.status).toBe(401)
  })

  it('403: Forbidden', async () => {
    userParams = await initializeUser()
    const response = await instance.put(
      `/plugin-data/${bundle}/${plugin}`,
      pluginData,
      {
        headers: {
          'Content-Type': 'application/javascript',
        },
      }
    )
    expect(response.status).toBe(401)
    await clearUser(userParams.userId, userParams.cookie)
  })
})
