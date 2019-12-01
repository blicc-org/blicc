import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { dashboard } from '../mocks/dashboard.mock'

describe('GET: /dashboards/:id', () => {
  let params = { email: '', userId: '', cookie: '' }
  let id = ''

  beforeEach(async () => {
    params = await initializeUser()
    const { data } = await instance.post('/dashboards', dashboard, {
      headers: {
        Cookie: params.cookie,
      },
    })
    id = data.id
  })

  afterEach(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('200: OK', async () => {
    const { status } = await instance.get(`/dashboards/${id}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(200)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.get(`/dashboards/${id}`)
    expect(status).toBe(401)
  })

  it('403: Forbidden', async () => {
    // wrong user with no permissions
    const wrongUser = await initializeUser()
    let response = await instance.get(`/dashboards/${id}`, {
      headers: {
        Cookie: wrongUser.cookie,
      },
    })
    expect(response.status).toBe(403)
    await clearUser(wrongUser.userId, wrongUser.cookie)

    // none existing id
    const noneExistingId = '0FTY2Ne6iE42E'
    response = await instance.get(`/dashboards/${noneExistingId}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(403)
  })
})
