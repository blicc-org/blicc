import {
  instance,
  initializeUser,
  clearUser,
} from '../../../common/tests/user.helper'
import { dataSource } from '../mocks/data-source.mock'

describe('DELETE: /data-source/:id', () => {
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
    let response = await instance.delete(`/data-source/${id}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)

    response = await instance.delete(`/data-source/${id}`, {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(403)
  })

  it('401: Unauthorized', async () => {
    const response = await instance.delete(`/data-source/${id}`)
    expect(response.status).toBe(401)
  })

  it('403: Forbidden', async () => {
    const response = await instance.delete(
      `/data-source/id_which_does_not_exist`,
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )
    expect(response.status).toBe(403)
  })
})
