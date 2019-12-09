import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'

describe('GET: /health-check', () => {
  it('204: No content', async () => {
    const { status } = await instance.get('/health-check')
    expect(status).toBe(204)
  })
})

describe('GET: /health-check/auth', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  afterEach(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('204: No content', async () => {
    const { status } = await instance.get('/health-check/auth', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(204)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.get('/health-check/auth')
    expect(status).toBe(401)
  })
})
