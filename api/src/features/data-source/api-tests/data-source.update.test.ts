import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { dataSource } from '../mocks/data-source.mock'

describe('UPDATE: /data-source/:id', () => {
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
    const newTitle = 'New Title'
    const response = await instance.put(
      `/data-source/${id}`,
      { ...dataSource, title: newTitle },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(response.status).toBe(200)
    expect(response.data.id).toBe(id)
    expect(response.data.title).toBe(newTitle)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.put(`/data-source/${id}`)
    expect(response.status).toBe(401)
  })
})
