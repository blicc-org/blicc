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
    adminParams = await getAdmin()
  })
  it('200: OK', async () => {
    const response = await instance.put(`/bundles/${slug}`, bundle, {
      headers: {
        Cookie: adminParams.cookie,
        'Content-Type': 'application/javascript',
      },
    })
    expect(response.status).toBe(200)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.put(`/bundles/${slug}`, bundle, {
      headers: {
        'Content-Type': 'application/javascript',
      },
    })
    expect(response.status).toBe(401)
  })

  it('403: Forbidden', async () => {
    userParams = await initializeUser()
    const response = await instance.put(`/bundles/${slug}`, bundle, {
      headers: {
        'Content-Type': 'application/javascript',
      },
    })
    expect(response.status).toBe(401)
    await clearUser(userParams.userId, userParams.cookie)
  })
})
