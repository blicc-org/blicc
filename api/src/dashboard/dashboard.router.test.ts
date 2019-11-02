import uuid from 'uuid/v4'
import { user } from '../../mocks/user.mock'
import axios from 'axios'
import { API_TEST_TARGET } from '../config'

const instance = axios.create({
  baseURL: API_TEST_TARGET,
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 500,
})

async function initializeUser() {
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

describe('POST: /dashboards', () => {
  let params = { email: '', userId: '', cookie: '' }
  beforeEach(async () => {
    params = await initializeUser()
  })

  it('201: Created', () => {
    console.log(params.email)
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
