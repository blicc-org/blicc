import axios from 'axios'
import { mockUser } from './user.mock'
import { API_TESTS_TARGET } from '../config'

describe('Test', () => {
  it('register', async () => {
    const response = await axios.post(`${API_TESTS_TARGET}/users`, mockUser)
    expect(response.status).toBe(201)
  })
})
