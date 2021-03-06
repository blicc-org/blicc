import { DefaultContext, Next } from 'koa'
import statusCode from 'http-status-codes'
import { TokenService } from './token.service'
import { UserService } from '../user'
import { JWT } from '../../util'
import { IS_PROD, APP } from '../../config'

export class TokenController {
  private tokenService: TokenService
  private userService: UserService

  public constructor() {
    this.tokenService = new TokenService()
    this.userService = new UserService()
  }

  public async request(ctx: DefaultContext, next: Next): Promise<void> {
    await next()

    const { body } = ctx.request
    const { email, password } = body

    const user = await this.userService.selectByEmailWithRefreshToken(email)

    if (!user) {
      ctx.status = statusCode.NOT_FOUND
      return
    }

    if (!body.token) {
      const check2FA = false
      if (!(await this.tokenService.authenticate(email, password, check2FA))) {
        ctx.status = statusCode.FORBIDDEN
        return
      }
      if (user.hasTwoFactorAuth) {
        ctx.status = statusCode.OK
        ctx.body = { hasTwoFactorAuth: true }
        return
      }
    } else {
      const check2FA = true
      const { token } = body
      if (
        !(await this.tokenService.authenticate(
          email,
          password,
          check2FA,
          token
        ))
      ) {
        ctx.status = statusCode.FORBIDDEN
        return
      }
    }

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
  }

  public async clear(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    ctx.status = statusCode.OK
    ctx.cookies.set('access_token', '', {
      maxAge: 1,
      domain: APP.HOSTNAME,
      secure: IS_PROD,
      httpOnly: IS_PROD,
      sameSite: IS_PROD ? 'Strict' : undefined,
    })
  }
}
