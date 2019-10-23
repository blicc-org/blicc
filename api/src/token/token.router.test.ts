import axios from 'axios'
import uuid from 'uuid/v4'
import speakeasy from 'speakeasy'
import { user } from '../../mocks/user.mock'
import { API_TEST_TARGET } from '../config'

describe('POST: /tokens', () => {
  let email = ''
  let userId = ''
  const instance = axios.create({
    baseURL: API_TEST_TARGET,
    withCredentials: true,
    validateStatus: status => status >= 200 && status < 500,
  })

  beforeEach(async () => {
    email = `${uuid()}@example.com`
    const response = await instance.post('/users', {
      ...user,
      email,
    })
    userId = response.data.id
  })

  it('200: OK', async () => {
    let response = await instance.post('/tokens', {
      email,
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

    response = await instance.post('/tokens', {
      email,
      password: user.password,
    })
    expect(response.status).toBe(200)
    expect(response.data.hasTwoFactorAuth).toBe(true)
  })

  it('202: Accepted', async () => {
    // with hasTwoFactorAuth = false
    let response = await instance.post('/tokens', {
      email,
      password: user.password,
    })
    expect(response.status).toBe(202)
    expect(response.data.id).toBe(userId)

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
    const d = new Date()
    let seconds = d.getTime() / 1000

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
          Cookie: cookie,
        },
      }
    )
    expect(response.status).toBe(204)

    seconds = d.getTime() / 1000

    token = speakeasy.totp({
      secret,
      encoding: 'base32',
      time: seconds,
    })

    response = await instance.post('/tokens', {
      email,
      password: user.password,
      token,
    })
    expect(response.status).toBe(202)
    expect(response.data.id).toBe(userId)
  })

  it('400: Bad request', async () => {
    let response = await instance.post('/tokens', {
      email,
    })
    expect(response.status).toBe(400)

    response = await instance.post('/tokens', {
      password: user.password,
    })
    expect(response.status).toBe(400)
  })

  it('403: Forbidden', async () => {
    // wrong password
    const wrongPassword = ';Kf,wxXPB5"c7z!q'
    let response = await instance.post('/tokens', {
      email,
      password: wrongPassword,
    })
    expect(response.status).toBe(403)

    // wrong two factor auth
    response = await instance.post('/tokens', {
      email,
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

    const wrongToken = '234745'

    response = await instance.post('/tokens', {
      email,
      password: user.password,
      token: wrongToken,
    })
    expect(response.status).toBe(403)
  })

  it('404: Not found', async () => {
    const response = await instance.post('/tokens', {
      email: 'not_registered_yet_email@example.com',
      password: '123456',
    })
    expect(response.status).toBe(404)
  })
})

describe('DELETE: /tokens', () => {
  let email = ''
  let userId = ''
  const instance = axios.create({
    baseURL: API_TEST_TARGET,
    withCredentials: true,
    validateStatus: status => status >= 200 && status < 500,
  })

  beforeEach(async () => {
    email = `${uuid()}@example.com`
    const response = await instance.post('/users', {
      ...user,
      email,
    })
    userId = response.data.id
  })

  it('205: Reset content', async () => {
    let response = await instance.post('/tokens', {
      email,
      password: user.password,
    })
    expect(response.status).toBe(202)

    const cookies = response.headers['set-cookie']
    const cookie = cookies
      .find((cookie: string): boolean => cookie.startsWith('access_token'))
      .split(';')[0]

    response = await instance.delete('/tokens', {
      headers: {
        Cookie: cookie,
      },
    })
    expect(response.status).toBe(205)
  })
  it('401: Unauthorized', async () => {
    const response = await instance.delete('/tokens')
    expect(response.status).toBe(401)
  })
})
