import { instance, initializeUser } from '../../../common/tests/user.helper'
import { user } from '../mocks/user.mock'

describe('POST: /users/:id/delete', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  it('200: OK', async () => {
    const { status } = await instance.post(
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
    expect(status).toBe(200)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.post(`/users/${params.userId}/delete`, {
      password: user.password,
    })
    expect(status).toBe(401)
  })
})
