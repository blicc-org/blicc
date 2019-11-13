import { instance, initializeUser } from '../test/user.helper'
import { Dashboard } from './dashboard.interface'

describe('POST: /dashboards', () => {
  let params = { email: '', userId: '', cookie: '' }
  const body = {
    title: 'Title',
    data: {},
  }

  beforeEach(async () => {
    params = await initializeUser()
  })

  it('201: Created', async () => {
    const { status, data } = await instance.post('/dashboards', body, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(201)
    expect(data.userId).toBe(params.userId)
  })

  it('401: Unauthorized', async () => {
    let response = await instance.post('/dashboards', body, {})
    expect(response.status).toBe(401)

    response = await instance.post('/dashboards', { data: {} }, {})
    expect(response.status).toBe(401)
  })
})

describe('GET: /dashboards/:id', () => {
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

describe('GET: /dashboards', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
    await instance.post(
      '/dashboards',
      {
        title: 'Title',
        data: {},
      },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    await instance.post(
      '/dashboards',
      {
        title: 'Title2',
        data: {},
      },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
  })

  it('200: OK', async () => {
    let response = await instance.get('/dashboards', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)

    response = await instance.get('/dashboards?fields=id,data', {
      headers: {
        Cookie: params.cookie,
      },
    })
    const fields = ['id', 'data']
    expect(response.status).toBe(200)
    expect(
      response.data.dashboards.every((dashboard: Dashboard): boolean => {
        return Object.keys(dashboard).every(field => {
          return fields.includes(field)
        })
      })
    ).toBe(true)

    response = await instance.get('dashboards?search=Title2',{
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.dashboards[0].title).toEqual('Title2')

    // check validation for empty result
    params = await initializeUser()
    response = await instance.get('/dashboards', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
  })

  it('400: Bad request', async () => {
    const { status } = await instance.get('/dashboards?fields=wrongFieldName', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(400)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.get('/dashboards')
    expect(status).toBe(401)
  })
})

describe('PUT: /dashboards/:id', () => {
  let params = { email: '', userId: '', cookie: '' }
  let id = ''
  let creationDate = ''
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
    creationDate = data.creationDate
  })

  it('200: OK', async () => {
    const newData = {
      id,
      title: 'New Title',
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
      userId: params.userId,
      data: {},
      creationDate,
    }
    params = await initializeUser()
    const { status } = await instance.put(`/dashboards/${id}`, newData, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(403)
  })
})

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
