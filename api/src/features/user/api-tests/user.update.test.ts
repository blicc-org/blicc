import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'

describe('PUT: /users/:id', () => {
  let params = { email: '', userId: '', cookie: '' }
  let user = {}

  beforeEach(async () => {
    params = await initializeUser()
    const { data } = await instance.get(`/users/${params.userId}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    user = data
  })

  afterEach(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('200: OK', async () => {
    const response = await instance.put(
      `/users/${params.userId}`,
      { ...user, firstName: 'George', lastName: 'Touli' },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(response.status).toBe(200)
  })

  it('400: Bad request', async () => {
    const { status } = await instance.put(
      `/users/${params.userId}`,
      { ...user, role: 'admin' },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(status).toBe(400)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.put(`/users/${params.userId}`, user)
    expect(status).toBe(401)
  })

  it('403: Forbidden', async () => {
    const { status } = await instance.put(
      `/users/not-yours-or-non-existent`,
      user,
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(status).toBe(403)
  })
})
