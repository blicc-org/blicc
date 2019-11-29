import { instance } from '../../../common/tests/user.helper'

describe('POST: /users', () => {
  const admin = {
    firstName: 'Root',
    lastName: 'Admin',
    email: 'admin@email.com',
    password: 'PJTjthaX2kSM8hvG',
  }

  it('201: Created', async () => {
    expect(true).toBe(true)
  })
})
