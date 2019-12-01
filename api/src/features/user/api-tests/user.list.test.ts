import {
  instance,
  initializeUser,
  clearUser,
  getAdmin,
} from '../../../common/tests/user.helper'
import { user } from '../mocks/user.mock'

describe('GET: /users', () => {
  let params = { email: '', cookie: '' }

  beforeEach(async () => {
    params = await getAdmin()
  })

  it('200: OK', async () => {
    const newUser = await initializeUser()
    const response = await instance.get('/users', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)

    // clean up
    await clearUser(newUser.userId, newUser.cookie, user.password)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.get('/users')
    expect(status).toBe(401)
  })

  it('403: Forbidden', async () => {
    const newUser = await initializeUser()
    const response = await instance.get('/users', {
      headers: {
        Cookie: newUser.cookie,
      },
    })
    expect(response.status).toBe(403)

    // clean up
    await clearUser(newUser.userId, newUser.cookie, user.password)
  })
})
