import uuid from 'uuid/v4'
import {
  user,
  invalidEmails,
  invalidPasswords,
  injectionAttacks,
} from '../mocks/user.mock'
import {
  instance,
  getCookie,
  clearUser,
} from '../../../common/tests/user.helper'

describe('POST: /users', () => {
  let email = ''

  beforeEach(() => {
    email = `${uuid()}@example.com`
  })

  it('201: Created', async () => {
    let response = await instance.post('/users', {
      ...user,
      email,
    })
    expect(response.status).toBe(201)

    // clear up
    const cookie = await getCookie(email)
    await clearUser(response.data.id, cookie, user.password)
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
      const { status } = await instance.post('/users', input)
      expect(status).toBe(400)
    }

    const validUser = {
      ...user,
      email,
    }

    for (const injection of injectionAttacks) {
      Object.keys(validUser).forEach(async key => {
        const { status } = await instance.post('/users', {
          ...validUser,
          [key]: injection,
        })
        expect(status).toBeGreaterThanOrEqual(400)
      })
    }
  })

  it('409: Conflict', async () => {
    await instance.post('/users', {
      ...user,
      email,
    })
    const { status } = await instance.post('/users', {
      ...user,
      email,
    })
    expect(status).toBe(409)
  })

  it('422: Unprocessable entity', async () => {
    for (const email of invalidEmails) {
      const { status } = await instance.post('/users', {
        ...user,
        email,
      })
      expect(status).toBe(422)
    }

    for (const password of invalidPasswords) {
      const { status } = await instance.post('/users', {
        ...user,
        password,
      })
      expect(status).toBe(422)
    }
  })
})
