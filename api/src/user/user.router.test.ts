import axios from 'axios'
import uuid from 'uuid/v4'
import { mockUser } from './user.mock'
import { API_TESTS_TARGET } from '../config'

describe('POST: /users', () => {
  let email = ''
  const instance = axios.create({
    baseURL: API_TESTS_TARGET,
    withCredentials: true,
    validateStatus: status => status >= 200 && status < 500,
  })

  beforeEach(() => {
    email = `${uuid()}@email.com`
  })

  it('201: Created', async () => {
    const response = await instance.post('/users', {
      ...mockUser,
      email,
    })
    expect(response.status).toBe(201)
  })

  it('409: Conflict', async () => {
    await instance.post('/users', {
      ...mockUser,
      email,
    })
    const response = await instance.post('/users', {
      ...mockUser,
      email,
    })
    expect(response.status).toBe(409)
  })

  it('422: Unprocessable entity', async () => {
    email = '#@%^%#$@#$@#.com'
    const response = await instance.post('/users', {
      ...mockUser,
      email,
    })
    expect(response.status).toBe(422)
  })
})
