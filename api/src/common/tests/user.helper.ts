import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { user } from '../../features/user/mocks/user.mock'
import { API_TEST_TARGET, ADMIN_MAIL, ADMIN_PASSWORD } from '../../config'

export const instance = axios.create({
  baseURL: API_TEST_TARGET,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
})

export async function getAdmin(): Promise<{
  email: string
  cookie: string
}> {
  const email = ADMIN_MAIL
  const password = ADMIN_PASSWORD
  const response = await instance.post('/tokens', {
    email,
    password,
  })

  const cookies = response.headers['set-cookie']
  const cookie = cookies
    .find((cookie: string): boolean => cookie.startsWith('access_token'))
    .split(';')[0]

  return { email, cookie }
}

export async function initializeUser(): Promise<{
  email: string
  userId: string
  cookie: string
}> {
  const email = `${uuid()}@example.com`
  let response = await instance.post('/users', {
    ...user,
    email,
  })

  const { data } = response

  response = await instance.post('/tokens', {
    email,
    password: user.password,
  })

  const cookies = response.headers['set-cookie']
  const cookie = cookies
    .find((cookie: string): boolean => cookie.startsWith('access_token'))
    .split(';')[0]

  return { email, userId: data.id, cookie }
}

export async function getCookie(email: string): Promise<string> {
  const response = await instance.post('/tokens', {
    email,
    password: user.password,
  })
  const cookies = response.headers['set-cookie']
  return cookies
    .find((cookie: string): boolean => cookie.startsWith('access_token'))
    .split(';')[0]
}

export async function clearUser(
  userId: string,
  cookie: string,
  password: string = user.password,
  token = ''
): Promise<void> {
  await instance.post(
    `/users/${userId}/delete`,
    {
      token,
      password,
    },
    {
      headers: {
        Cookie: cookie,
      },
    }
  )
}
