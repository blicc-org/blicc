import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'

describe('GET: /users/:id', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  afterEach(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('200: OK', async () => {
    const { status } = await instance.get(`/users/${params.userId}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(200)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.get(`/users/${params.userId}`)
    expect(status).toBe(401)
  })

  it('403: Forbidden', async () => {
    const { status } = await instance.get(`/users/not-yours-or-non-existent`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(403)
  })
})
