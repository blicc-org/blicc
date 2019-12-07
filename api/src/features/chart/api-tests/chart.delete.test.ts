import { instance, getAdmin } from '../../../common/tests/user.helper'
import { chart } from '../mocks/chart.mock'

describe('DELETE: /charts/:id', () => {
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
    const { status } = await instance.delete(`/charts/${id}`, {
      headers: {
        Cookie: adminParams.cookie,
      },
    })
    expect(status).toBe(200)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.delete(`/charts/${id}`)
    expect(status).toBe(401)
  })
})
