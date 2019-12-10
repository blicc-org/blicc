import {
  instance,
  initializeUser,
  clearUser,
  getAdmin,
} from '../../../common/tests/user.helper'
import { bundle } from '../mocks/bundles.mock'

describe('GET: /bundles/:slug', () => {
  let userParams = { email: '', userId: '', cookie: '' }
  let adminParams = { email: '', cookie: '' }
  const slug = 'essentials'

  beforeEach(async () => {
    userParams = await initializeUser()
    adminParams = await getAdmin()
    await instance.put(`/bundles/${slug}`, bundle, {
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
    const response = await instance.get(`/bundles/${slug}`, {
      headers: {
        Cookie: userParams.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data).toBe(bundle)
  })
})
