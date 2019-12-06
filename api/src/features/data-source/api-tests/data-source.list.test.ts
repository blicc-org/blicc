import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { dataSource } from '../mocks/data-source.mock'

describe('GET: /data-source', () => {
  let params = { email: '', userId: '', cookie: '' }
  beforeEach(async () => {
    params = await initializeUser()
    await instance.post('/data-source', dataSource, {
      headers: {
        Cookie: params.cookie,
      },
    })
  })

  afterEach(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('200: OK', async () => {
    let response = await instance.get('/data-source', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.total).toBeGreaterThan(0)
    expect(response.data.dataSources.length).toBeGreaterThan(0)

    await instance.post(
      '/data-source',
      { ...dataSource, title: 'Title2' },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )

    response = await instance.get('/data-source?search=Title2', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.dataSources[0].title).toEqual('Title2')
  })

  it('400: Bad request', async () => {
    const response = await instance.get('/data-source?fields=wrongFieldName', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(400)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.get('/data-source')
    expect(response.status).toBe(401)
  })
})
