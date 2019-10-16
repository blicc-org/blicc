import axios from 'axios'
import { mockUser } from './user.mock'

describe('Test', () => {
  it('register', async () => {
    const response = await axios.post('http://localhost/users', mockUser)
    expect(response.status).toBe(201)
  })
})
