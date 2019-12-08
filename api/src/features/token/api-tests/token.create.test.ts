import speakeasy from 'speakeasy'
import { user } from '../../user/mocks/user.mock'
import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'

describe('POST: /tokens', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  it('200: OK', async () => {
    let response = await instance.post('/tokens', {
      email: params.email,
      password: user.password,
    })

    expect(response.status).toBe(202)

    // request token with 2FA enabled
    const cookies = response.headers['set-cookie']
    const cookie = cookies
      .find((cookie: string): boolean => cookie.startsWith('access_token'))
      .split(';')[0]

    response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: cookie,
      },
    })
    expect(response.status).toBe(200)

    const secret = response.data.otpAuthUrl.split('=')[1]

    let token = speakeasy.totp({
      secret,
      encoding: 'base32',
    })

    response = await instance.post(
      '/two-factor-auth',
      {
        token,
      },
      {
        headers: {
          Cookie: cookie,
        },
      }
    )
    expect(response.status).toBe(204)

    response = await instance.post('/tokens', {
      email: params.email,
      password: user.password,
    })
    expect(response.status).toBe(200)
    expect(response.data.hasTwoFactorAuth).toBe(true)

    // clean up
    token = speakeasy.totp({
      secret,
      encoding: 'base32',
    })
    clearUser(params.userId, cookie, user.password, token)
  })

  it('202: Accepted', async () => {
    // with hasTwoFactorAuth = false
    let response = await instance.post('/tokens', {
      email: params.email,
      password: user.password,
    })
    expect(response.status).toBe(202)
    expect(response.data.id).toBe(params.userId)

    // with hasTwoFactorAuth = true
    const cookies = response.headers['set-cookie']
    const cookie = cookies
      .find((cookie: string): boolean => cookie.startsWith('access_token'))
      .split(';')[0]

    response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: cookie,
      },
    })
    expect(response.status).toBe(200)

    const secret = response.data.otpAuthUrl.split('=')[1]

    let token = speakeasy.totp({
      secret,
      encoding: 'base32',
    })

    response = await instance.post(
      '/two-factor-auth',
      {
        token,
      },
      {
        headers: {
          Cookie: cookie,
        },
      }
    )
    expect(response.status).toBe(204)

    token = speakeasy.totp({
      secret,
      encoding: 'base32',
    })

    response = await instance.post('/tokens', {
      email: params.email,
      password: user.password,
      token,
    })
    expect(response.status).toBe(202)
    expect(response.data.id).toBe(params.userId)

    // clean up
    token = speakeasy.totp({
      secret,
      encoding: 'base32',
    })
    clearUser(params.userId, cookie, user.password, token)
  })

  it('400: Bad request', async () => {
    let response = await instance.post('/tokens', {
      email: params.email,
    })
    expect(response.status).toBe(400)

    response = await instance.post('/tokens', {
      password: user.password,
    })
    expect(response.status).toBe(400)

    await clearUser(params.userId, params.cookie)
  })

  it('403: Forbidden', async () => {
    // wrong password
    const wrongPassword = ';Kf,wxXPB5"c7z!q'
    let response = await instance.post('/tokens', {
      email: params.email,
      password: wrongPassword,
    })
    expect(response.status).toBe(403)

    // wrong two factor auth
    response = await instance.post('/tokens', {
      email: params.email,
      password: user.password,
    })
    expect(response.status).toBe(202)

    const cookies = response.headers['set-cookie']
    const cookie = cookies
      .find((cookie: string): boolean => cookie.startsWith('access_token'))
      .split(';')[0]

    response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: cookie,
      },
    })
    expect(response.status).toBe(200)

    const secret = response.data.otpAuthUrl.split('=')[1]

    let token = speakeasy.totp({
      secret,
      encoding: 'base32',
    })

    response = await instance.post(
      '/two-factor-auth',
      {
        token,
      },
      {
        headers: {
          Cookie: cookie,
        },
      }
    )
    expect(response.status).toBe(204)

    const wrongToken = '234745'

    response = await instance.post('/tokens', {
      email: params.email,
      password: user.password,
      token: wrongToken,
    })
    expect(response.status).toBe(403)

    // clean up
    token = speakeasy.totp({
      secret,
      encoding: 'base32',
    })
    clearUser(params.userId, cookie, user.password, token)
  })

  it('404: Not found', async () => {
    const response = await instance.post('/tokens', {
      email: 'not_registered_yet_email@example.com',
      password: '123456',
    })
    expect(response.status).toBe(404)
    await clearUser(params.userId, params.cookie)
  })
})
