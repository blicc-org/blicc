import {
  instance,
  initializeUser,
  clearUser,
  getAdmin,
} from '../../../common/tests/user.helper'
import { user } from '../mocks/user.mock'
import { User } from '../user.interface'

describe('GET: /users', () => {
  let params = { email: '', cookie: '' }

  beforeEach(async () => {
    params = await getAdmin()
  })

  it('200: OK', async () => {
    const newUser = await initializeUser()
    let response = await instance.get('/users', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)

    response = await instance.get('/users?fields=id,firstName,lastName', {
      headers: {
        Cookie: params.cookie,
      },
    })
    const fields = ['id', 'firstName', 'lastName']
    expect(response.status).toBe(200)
    expect(
      response.data.users.every((user: User): boolean => {
        return Object.keys(user).every(field => {
          return fields.includes(field)
        })
      })
    ).toBe(true)

    for (let i = 1; i <= 10; i++) {
      response = await instance.post(
        '/users',
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: `john.doe${i}@email.com`,
          password: user.password,
        },
        {
          headers: {
            Cookie: params.cookie,
          },
        }
      )
    }

    response = await instance.get('/users?skip=2&take=10', {
      headers: {
        Cookie: params.cookie,
      },
    })
    expect(response.status).toBe(200)
    expect(response.data.users.length).toEqual(10)

    response = await instance.post(
      '/users',
      {
        firstName: 'Find',
        lastName: 'Me',
        email: `find.me@email.com`,
        password: user.password,
      },
      {
        headers: {
          Cookie: params.cookie,
        },
      }
    )

    response = await instance.get(`/users?search=Find`, {
      headers: {
        Cookie: params.cookie,
      },
    })

    expect(response.status).toBe(200)
    expect(response.data.users[0].firstName).toEqual('Find')

    response = await instance.get(`/users?search=Me`, {
      headers: {
        Cookie: params.cookie,
      },
    })

    expect(response.status).toBe(200)
    expect(response.data.users[0].lastName).toEqual('Me')

    // clean up
    await clearUser(newUser.userId, newUser.cookie, user.password)
  })

  it('401: Unauthorized', async () => {
    const { status } = await instance.get('/users')
    expect(status).toBe(401)
  })

  it('403: Forbidden', async () => {
    const newUser = await initializeUser()
    const response = await instance.get('/users', {
      headers: {
        Cookie: newUser.cookie,
      },
    })
    expect(response.status).toBe(403)

    // clean up
    await clearUser(newUser.userId, newUser.cookie, user.password)
  })
})
