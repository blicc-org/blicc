import { instance, initializeUser } from '../../../common/tests/user.helper'

describe('DELETE: /dashboards/:id', () => {
  let params = { email: '', userId: '', cookie: '' }
  let id = ''
  const body = {
    title: 'Title',
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
    let response = await instance.delete(`/dashboards/${id}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.id).toBe(undefined)
    expect(response.data.title).toBe(body.title)

    response = await instance.get(`/dashboards/${id}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(403)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.delete(`/dashboards/${id}`)
    expect(response.status).toBe(401)
  })

  it('403: Forbidden', async () => {
    params = await initializeUser()
    const response = await instance.delete(`/dashboards/${id}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(403)
  })
})
