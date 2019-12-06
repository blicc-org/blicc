import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { dataSource } from '../mocks/data-source.mock'

describe('GET: /data-source/:id', () => {
  let params = { email: '', userId: '', cookie: '' }
  let id = ''
  beforeEach(async () => {
    params = await initializeUser()
    const { data } = await instance.post('/data-source', dataSource, {
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
    let response = await instance.get(`/data-source/${id}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.id).toBe(id)
    expect(response.data.title).toBe(dataSource.title)
  })

  it('401: Unauthorized', async () => {
    let response = await instance.get(`/data-source/${id}`)
    expect(response.status).toBe(401)
  })

  it('403: Forbidden', async () => {
    let response = await instance.get(`/data-source/id_which_does_not_exist`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(403)
  })
})
