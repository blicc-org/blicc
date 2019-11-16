import axios from 'axios'
import uuid from 'uuid/v4'
import { user } from '../../../mocks/user.mock'
import { API_TEST_TARGET } from '../../config'

export const instance = axios.create({
  baseURL: API_TEST_TARGET,
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 500,
})

export async function initializeUser(): Promise<any> {
  const email = `${uuid()}@example.com`
  const { data } = await instance.post('/users', {
    ...user,
    email,
  })

  const userId = data.id

  const response = await instance.post('/tokens', {
    email,
    password: user.password,
  })

  const cookies = response.headers['set-cookie']
  const cookie = cookies
    .find((cookie: string): boolean => cookie.startsWith('access_token'))
    .split(';')[0]

  return { email, userId, cookie }
}
