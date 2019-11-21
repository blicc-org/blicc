import { instance, initializeUser } from '../../../common/tests/user.helper'

describe('GET: /dashboards/:id', () => {
  let params = { email: '', userId: '', cookie: '' }
  let id = ''
  const body = {
    title: 'Title',
    description: '...',
    data: {},
  }

  beforeEach(async () => {
    params = await initializeUser()
    const { data } = await instance.post('/dashboards', body, {
      headers: {
        Cookie: params.cookie,
      },
    })
    id = data.id
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
