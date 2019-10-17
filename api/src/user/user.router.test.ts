import axios from 'axios'
import { mockUser } from './user.mock'
import { API } from '../config'

describe('Test', () => {
  it('register', async () => {
    const response = await axios.post(`${API.ORIGIN}/users`, mockUser)
    expect(response.status).toBe(201)
  })
})
