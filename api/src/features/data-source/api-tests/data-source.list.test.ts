import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { dataSource } from '../mocks/data-source.mock'

describe('GET: /data-sources', () => {
  let params = { email: '', userId: '', cookie: '' }
  beforeAll(async () => {
    params = await initializeUser()
    await instance.post('/data-sources', dataSource, {
      headers: {
        Cookie: params.cookie,
      },
    })
  })

  afterAll(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('200: OK', async () => {
    let response = await instance.get('/data-sources', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.total).toBeGreaterThan(0)
    expect(response.data.dataSources.length).toBeGreaterThan(0)

    await instance.post(
      '/data-sources',
      { ...dataSource, title: 'Title2' },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )

    response = await instance.get('/data-sources?search=Title2', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.dataSources[0].title).toEqual('Title2')

    response = await instance.get('/data-sources?fields=id,fetchFrequency', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.dataSources[0].persistData).toBeUndefined()
    expect(response.data.dataSources[0].fetchFrequency).toBeDefined()
  })

  it('401: Unauthorized', async () => {
    const response = await instance.get('/data-sources')
    expect(response.status).toBe(401)
  })
})
