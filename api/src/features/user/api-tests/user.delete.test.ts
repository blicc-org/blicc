import speakeasy from 'speakeasy'
import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { user } from '../mocks/user.mock'

describe('POST: /users/:id/delete', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  it('200: OK', async () => {
    let response = await instance.post(
      `/users/${params.userId}/delete`,
      {
        password: user.password,
      },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(response.status).toBe(200)

    // delete with two factor atuh
    params = await initializeUser()

    response = await instance.get('/two-factor-auth', {
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

    token = speakeasy.totp({
      secret,
      encoding: 'base32',
      time: seconds,
    })

    response = await instance.post(
      `/users/${params.userId}/delete`,
      {
        token,
        password: user.password,
      },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(response.status).toBe(200)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.post(`/users/${params.userId}/delete`, {
      password: user.password,
    })
    expect(response.status).toBe(401)

    // clear up
    await clearUser(response.data.id, params.cookie, user.password)
  })
})
