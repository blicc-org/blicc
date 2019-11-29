import axios from 'axios'
import uuid from 'uuid/v4'
import { user } from '../../features/user/mocks/user.mock'
import { API_TEST_TARGET } from '../../config'

export const instance = axios.create({
  baseURL: API_TEST_TARGET,
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 500,
})

export async function initializeUser(): Promise<{
  email: string
  userId: string
  cookie: string
}> {
  const email = `${uuid()}@example.com`
  const { data } = await instance.post('/users', {
    ...user,
    email,
  })

  const response = await instance.post('/tokens', {
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
  const response = await instance.post(
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

  if (response.status !== 200) {
    console.log(response)
  }
}
