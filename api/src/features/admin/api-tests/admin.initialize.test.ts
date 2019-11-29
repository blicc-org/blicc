import {
  instance,
  clearUser,
  getCookie,
} from '../../../common/tests/user.helper'

describe('POST: /admins', () => {
  const admin = {
    firstName: 'Root',
    lastName: 'Admin',
    email: 'admin@email.com',
    password: 'PJTjthaX2kSM8hvG',
  }

  it('201: Created', async () => {
    const response = await instance.post('/admins', {
      ...admin,
    })
    expect(response.status).toBe(201)

    // clear up
    const cookie = await getCookie(admin.email)
    await clearUser(response.data.id, cookie, admin.password)
  })
})
