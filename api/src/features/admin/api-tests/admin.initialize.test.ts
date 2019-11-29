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

  /**
   * Problem running tests sequentially due to performance.
   * Since this features relies on order it can only be tested
   * sequentially. It is currently skipped since running
   * tests sequentially with the --runInBand tag would take
   * too much time.
   */
  it.skip('201: Created', async () => {
    const response = await instance.post('/admins', {
      ...admin,
    })
    expect(response.status).toBe(201)

    // clean up
    const cookie = await getCookie(admin.email)
    await clearUser(response.data.id, cookie, admin.password)
  })
})
