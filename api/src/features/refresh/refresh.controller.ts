import Koa from 'koa'
import statusCode from 'http-status-codes'
import { UserService } from '../user'
import { APP, IS_PROD } from '../../config'
import { JWT } from '../../util'

export class RefreshController {
  private userService: UserService

  public constructor() {
    this.userService = new UserService()
  }

  public async refresh(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { body } = ctx.request
    const { id, refreshToken } = body

    const user = await this.userService.selectByIdWithRefreshToken(id)

    if (user && user.refreshToken === refreshToken) {
      const { token, payload } = JWT.generate(user)
      const maxAge = (payload.exp - payload.iat) * 1000 // maxAge requires miliseconds

      ctx.cookies.set('access_token', token, {
        maxAge,
        domain: APP.HOSTNAME,
        secure: IS_PROD,
        httpOnly: IS_PROD,
        sameSite: IS_PROD ? 'Strict' : undefined,
      })

      ctx.status = statusCode.ACCEPTED
      ctx.body = {
        ...user,
      }
    } else {
      ctx.status = statusCode.UNAUTHORIZED
      ctx.body = 'Refresh token is not valid.'
    }
  }
}
