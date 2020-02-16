import speakeasy from 'speakeasy'
import { user } from '../../user/mocks/user.mock'
import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { JWT } from '../../../util/jwt'
import { TokenPayload } from '../../token'

describe('POST: /refresh', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  it('202: Accepted', async () => {
    let response = await instance.post('/tokens', {
      email: params.email,
      password: user.password,
    })
    expect(response.status).toBe(202)

    const { id, refreshToken } = response.data
    response = await instance.post('/refresh', {
      id,
      refreshToken,
    })
    expect(response.status).toBe(202)

    // request token with 2FA enabled
    const cookies = response.headers['set-cookie']
    const cookie = cookies
      .find((cookie: string): boolean => cookie.startsWith('access_token'))
      .split(';')[0]

    response = await instance.get('/health-check/auth', {
      headers: {
        Cookie: cookie,
      },
    })
    expect(response.status).toBe(204)
  })

  it('401: Unauthorized', async () => {
    let response = await instance.post('/tokens', {
      email: params.email,
      password: user.password,
    })
    expect(response.status).toBe(202)

    const { id } = response.data
    response = await instance.post('/refresh', {
      id,
      refreshToken: 'wrong-refresh-token',
    })
    expect(response.status).toBe(401)
  })
})
