import { instance, initializeUser } from '../../../common/tests/user.helper'

describe('GET: /health-check', () => {
  it('200: OK', async () => {
    const { status } = await instance.get('/health-check')
    expect(status).toBe(200)
  })
})

describe('GET: /health-check/auth', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  it('200: OK', async () => {
    const { status } = await instance.get('/health-check/auth', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(200)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.get('/health-check/auth')
    expect(status).toBe(401)
  })
})