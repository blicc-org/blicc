import { instance } from '../../../common/tests/user.helper'

describe('DELETE: /tokens', () => {
  it('205: Reset content', async () => {
    const response = await instance.delete('/tokens')
    const cookies = response.headers['set-cookie']
    const cookie = cookies
      .find((cookie: string): boolean => cookie.startsWith('access_token'))
      .split(';')[0]
    expect(response.status).toBe(200)
    expect(cookie).toBe('access_token=')
  })
})
