import axios from 'axios'
import uuid from 'uuid/v4'
import speakeasy from 'speakeasy'
import { user } from '../../mocks/user.mock'
import { API_TEST_TARGET } from '../config'

describe('GET: /two-factor-auth', () => {
  let email = ''
  let cookie = ''
  const instance = axios.create({
    baseURL: API_TEST_TARGET,
    withCredentials: true,
    validateStatus: status => status >= 200 && status < 500,
  })

  beforeEach(async () => {
    email = `${uuid()}@example.com`
    await instance.post('/users', {
      ...user,
      email,
    })

    const response = await instance.post('/tokens', {
      email,
      password: user.password,
    })

    const cookies = response.headers['set-cookie']
    cookie = cookies
      .find((cookie: string): boolean => cookie.startsWith('access_token'))
      .split(';')[0]
  })

  it('200: OK', async () => {
    const response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.otpAuthUrl.split('=')[0]).toBe(
      'otpauth://totp/SecretKey?secret'
    )
  })

  it('401: Unauthorized', async () => {
    const response = await instance.get('/two-factor-auth')
    expect(response.status).toBe(401)
  })

  it('409: Conflict', async () => {
    let response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: cookie,
      },
    })
    expect(response.status).toBe(200)

    const secret = response.data.otpAuthUrl.split('=')[1]
    const d = new Date()
    const seconds = d.getTime() / 1000

    const token = speakeasy.totp({
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
          Cookie: cookie,
        },
      }
    )
    expect(response.status).toBe(204)

    response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: cookie,
      },
    })
    expect(response.status).toBe(409)
  })
})

describe('POST: /two-factor-auth', () => {
  beforeEach(() => {})

  it('204: No content', () => {})
  it('400: Bad request', () => {})
  it('401: Unauthorized', () => {})
  it('403: Forbidden', () => {})
  it('404: Not found', () => {})
})
