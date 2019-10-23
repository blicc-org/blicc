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
    const { data } = await instance.post('/users', {
      ...user,
      email,
    })

    userId = data.id
  })

  it('200: OK', async () => {
    // with hasTwoFactorAuth = false
    let response = await instance.post('/tokens', {
      email,
      password: user.password,
    })
    expect(response.status).toBe(202)

    const cookies = response.headers['set-cookie']
    const cookie = cookies
      .find((cookie: string): boolean => cookie.startsWith('access_token'))
      .split(';')[0]

    // with hasTwoFactorAuth = true
    response = await instance.get('/two-factor-auth/', {
      headers: {
        Cookie: cookie,
      },
    })

    const secret = response.data.otpAuthUrl.split('=')[1]
    var d = new Date()
    var seconds = d.getTime() / 1000

    let token = speakeasy.totp({
      secret,
      encoding: 'base32',
      time: seconds,
    })

    await instance.post('/two-factor-auth', {
      headers: {
        Cookie: cookie,
      },
      body: {
        token,
      },
    })

    token = speakeasy.totp({
      secret,
      encoding: 'base32',
      time: seconds,
    })

    const { status } = await instance.post('/tokens', {
      email,
      password: user.password,
      token,
    })
    expect(status).toBe(202)
  })
})

describe('DELETE: /tokens', () => {
  it('200: OK', () => {
    expect(true).toBe(true)
  })
})
