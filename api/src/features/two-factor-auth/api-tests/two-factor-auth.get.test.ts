import speakeasy from 'speakeasy'
import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { user } from '../../user/mocks/user.mock'

describe('GET: /two-factor-auth', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  it('200: OK', async () => {
    const response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.otpAuthUrl.split('=')[0]).toBe(
      'otpauth://totp/SecretKey?secret'
    )

    await clearUser(params.userId, params.cookie)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.get('/two-factor-auth')
    expect(response.status).toBe(401)

    await clearUser(params.userId, params.cookie)
  })

  it('409: Conflict', async () => {
    let response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)

    const secret = response.data.otpAuthUrl.split('=')[1]
    const d = new Date()
    const seconds = d.getTime() / 1000

    let token = speakeasy.totp({
      secret,
      encoding: 'base32',
      time: seconds,
    })

    response = await instance.post(
      '/two-factor-auth',
      {
        token,
      },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(response.status).toBe(204)

    response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(409)

    // clean up
    token = speakeasy.totp({
      secret,
      encoding: 'base32',
      time: seconds,
    })
    await clearUser(params.userId, params.cookie, user.password, token)
  })
})
