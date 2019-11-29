import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'

describe('PUT: /dashboards/:id', () => {
  let params = { email: '', userId: '', cookie: '' }
  let id = ''
  let creationDate = ''
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
    creationDate = data.creationDate
  })

  afterEach(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('200: OK', async () => {
    const newData = {
      id,
      title: 'New Title',
      description: 'New Description',
      userId: params.userId,
      data: {},
      creationDate,
    }
    const { status, data } = await instance.put(`/dashboards/${id}`, newData, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(200)
    expect(data).toStrictEqual(newData)
  })

  it('400: Bad request', async () => {
    let newData = {
      id: 'change dashboard id',
      title: 'New Title',
      description: 'New Description',
      userId: params.userId,
      data: {},
      creationDate,
    }
    let response = await instance.put(`/dashboards/${id}`, newData, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(400)

    newData = {
      id,
      title: 'New Title',
      description: 'New Description',
      userId: 'change user id',
      data: {},
      creationDate,
    }
    response = await instance.put(`/dashboards/${id}`, newData, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(400)

    newData = {
      id,
      title: 'New Title',
      description: 'New Description',
      userId: params.userId,
      data: {},
      creationDate: '2019-11-03T16:34:09.408Z',
    }
    response = await instance.put(`/dashboards/${id}`, newData, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(400)
  })

  it('401: Unauthorized', async () => {
    const newData = {
      id,
      title: 'New Title',
      description: 'New Description',
      userId: params.userId,
      data: {},
      creationDate,
    }
    const { status } = await instance.put(`/dashboards/${id}`, newData)
    expect(status).toBe(401)
  })

  it('403: Unauthorized', async () => {
    const newData = {
      id,
      title: 'New Title',
      description: 'New Description',
      userId: params.userId,
      data: {},
      creationDate,
    }
    const wrongUser = await initializeUser()
    const { status } = await instance.put(`/dashboards/${id}`, newData, {
      headers: {
        Cookie: wrongUser.cookie,
      },
    })
    expect(status).toBe(403)
    await clearUser(wrongUser.userId, wrongUser.cookie)
  })
})
