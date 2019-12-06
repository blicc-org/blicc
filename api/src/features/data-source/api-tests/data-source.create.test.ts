import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { dataSource } from '../mocks/data-source.mock'

describe('POST: /data-source', () => {
  let params = { email: '', userId: '', cookie: '' }

  beforeEach(async () => {
    params = await initializeUser()
  })

  afterEach(async () => {
    await clearUser(params.userId, params.cookie)
  })

  it('201: Created', async () => {
    const { status, data } = await instance.post('/data-source', dataSource, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(status).toBe(201)
    expect(data.userId).toBe(params.userId)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.post('/data-source', dataSource, {})
    expect(response.status).toBe(401)
  })
})
