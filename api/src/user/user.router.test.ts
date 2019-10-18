import axios from 'axios'
import uuid from 'uuid/v4'
import { user, invalidEmails, invalidPasswords } from './user.mock'
import { API_TEST_TARGET } from '../config'

describe('POST: /users', () => {
  let email = ''
  const instance = axios.create({
    baseURL: API_TEST_TARGET,
    withCredentials: true,
    validateStatus: status => status >= 200 && status < 500,
  })

  beforeEach(() => {
    email = `${uuid()}@example.com`
  })

  it('201: Created', async () => {
    const response = await instance.post('/users', {
      ...user,
      email,
    })
    expect(response.status).toBe(201)
  })

  it('400: Bad request', async () => {
    const invalidInputs = [
      'no json',
      {
        ...user,
        field: 'more than requested',
      },
      {
        firstName: 'John',
        email: 'john@example.com',
        password: 'BES7/y!mczU#D]FK',
      },
    ]
    for (const input of invalidInputs) {
      const response = await instance.post('/users', input)
      expect(response.status).toBe(400)
    }
  })

  it('409: Conflict', async () => {
    await instance.post('/users', {
      ...user,
      email,
    })
    const response = await instance.post('/users', {
      ...user,
      email,
    })
    expect(response.status).toBe(409)
  })

  it('422: Unprocessable entity', async () => {
    for (const email of invalidEmails) {
      const response = await instance.post('/users', {
        ...user,
        email,
      })
      expect(response.status).toBe(422)
    }

    for (const password of invalidPasswords) {
      const response = await instance.post('/users', {
        ...user,
        password,
      })
      expect(response.status).toBe(422)
    }
  })
})
