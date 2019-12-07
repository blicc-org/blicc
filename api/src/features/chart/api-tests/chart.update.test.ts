import {
  initializeUser,
  instance,
  getAdmin,
  clearUser,
} from '../../../common/tests/user.helper'
import { chart } from '../mocks/chart.mock'

describe('UPDATE: /charts/:id', () => {
  let userParams = { email: '', userId: '', cookie: '' }
  let adminParams = { email: '', cookie: '' }
  let id = ''

  beforeEach(async () => {
    userParams = await initializeUser()
    adminParams = await getAdmin()
    const response = await instance.post('/charts', chart, {
      headers: {
        Cookie: adminParams.cookie,
      },
    })
    id = response.data.id
  })

  afterEach(async () => {
    await clearUser(userParams.userId, userParams.cookie)
  })

  it('200: OK', async () => {
    let response = await instance.put(
      `/charts/${id}`,
      { ...chart, title: 'Title2' },
      {
        headers: {
          Cookie: userParams.cookie,
        },
      }
    )
    expect(response.status).toBe(200)
    response = await instance.get(`/charts/${id}`, {
      headers: {
        Cookie: userParams.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.title).toBe('Title2')
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.delete(`/charts/${id}`)
    expect(status).toBe(401)
  })
})
