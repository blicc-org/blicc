import speakeasy from 'speakeasy'
import axios from 'axios'
import { API_TEST_TARGET } from '../config'
import uuid from 'uuid/v4'
import { user } from '../../mocks/user.mock'

const instance = axios.create({
  baseURL: API_TEST_TARGET,
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 500,
})

async function initializeUser() {
  const email = `${uuid()}@example.com`
  const { data } = await instance.post('/users', {
    ...user,
    email,
  })

  const userId = data.id

  const response = await instance.post('/tokens', {
    email,
    password: user.password,
  })

  const cookies = response.headers['set-cookie']
  const cookie = cookies
    .find((cookie: string): boolean => cookie.startsWith('access_token'))
    .split(';')[0]

  return { email, userId, cookie }
}

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
  })

  it('401: Unauthorized', async () => {
    const response = await instance.get('/two-factor-auth')
    expect(response.status).toBe(401)
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
  })
})

describe('POST: /two-factor-auth', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  it('204: No content', async () => {
    let response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: params.cookie,
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
          Cookie: params.cookie,
        },
      }
    )
    expect(response.status).toBe(204)
  })
  it('400: Bad request', async () => {
    let response = await instance.get('/two-factor-auth', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    const wrongToken = '923532'
    response = await instance.post(
      '/two-factor-auth',
      {
        token: wrongToken,
      },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(response.status).toBe(400)
  })
  it('401: Unauthorized', async () => {
    const response = await instance.post('/two-factor-auth', {
      token: '323436',
    })
    expect(response.status).toBe(401)
  })
})
