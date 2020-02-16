import speakeasy from 'speakeasy'
import { user } from '../../user/mocks/user.mock'
import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'

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

    expect(response.status).toBe(200)

    console.log(response)

    // response = await instance.post('/refresh', {
    //     id,
    //     refreshToken,
    //   })

    clearUser(params.userId, params.cookie, user.password)
  })
})
