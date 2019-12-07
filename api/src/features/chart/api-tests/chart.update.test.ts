import { instance, getAdmin } from '../../../common/tests/user.helper'
import { chart } from '../mocks/chart.mock'

describe('UPDATE: /charts/:id', () => {
  let adminParams = { email: '', cookie: '' }
  let id = ''

  beforeEach(async () => {
    adminParams = await getAdmin()
    const response = await instance.post('/charts', chart, {
      headers: {
        Cookie: adminParams.cookie,
      },
    })
    id = response.data.id
  })

  it('200: OK', async () => {
    const { data } = await instance.get(`/charts/${id}`, {
      headers: {
        Cookie: adminParams.cookie,
      },
    })

    let response = await instance.put(
      `/charts/${id}`,
      { ...data, title: 'Title2' },
      {
        headers: {
          Cookie: adminParams.cookie,
        },
      }
    )
    expect(response.status).toBe(200)

    response = await instance.get(`/charts/${id}`, {
      headers: {
        Cookie: adminParams.cookie,
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
