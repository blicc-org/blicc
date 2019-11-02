import { user } from '../../mocks/user.mock'
import { instance, initializeUser } from '../test/user.helper'

describe('POST: /dashboards', () => {
  let params = { email: '', userId: '', cookie: '' }
  beforeEach(async () => {
    params = await initializeUser()
  })

  it('201: Created', async () => {
    const data = {
      name: 'Dashboard Name',
      userId: params.userId,
      creationDate: 'isostring',
      views: 0,
      watchTimeInSeconds: 0,
      data: {},
    }
    // const response = await instance.post('/dashboards', data, {
    //   headers: {
    //     Cookie: params.cookie,
    //   },
    // })
  })
})

describe('PUT: /dashboards/:id', () => {
  it('200: OK', () => {})
})

describe('DELETE: /dashboards/:id', () => {
  it('200: OK', () => {})
})

describe('GET: /dashboards', () => {
  it('200: OK', () => {})
})

describe('GET: /dashboards/:id', () => {
  it('200: OK', () => {})
})
