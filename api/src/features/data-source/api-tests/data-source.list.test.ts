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
    const response = await instance.get('/data-source', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.total).toBeGreaterThan(0)
    expect(response.data.dataSources.length).toBeGreaterThan(0)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.get('/data-source')
    expect(response.status).toBe(401)
  })
})
