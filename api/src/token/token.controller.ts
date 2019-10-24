import Koa from 'koa'
import status from 'http-status-codes'
import { TokenService } from './token.service'
import { UserService } from '../user/user.service'
import { JWT } from '../util/jwt'
import { IS_PROD, APP } from '../config'

export class TokenController {
  private tokenService: TokenService
  private userService: UserService

  public constructor() {
    this.tokenService = new TokenService()
    this.userService = new UserService()
  }

  public async request(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { body } = ctx.request
    const { email, password } = body

    const user = await this.userService.select(email)

    if (!user) {
      ctx.status = status.NOT_FOUND
      return
    }

    if (!body.token) {
      const check2FA = false
      if (!(await this.tokenService.authenticate(email, password, check2FA))) {
        ctx.status = status.FORBIDDEN
        return
      }
      if (user.hasTwoFactorAuth) {
        ctx.status = status.OK
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
        ctx.status = status.FORBIDDEN
        return
      }
    }

    const { token, payload } = JWT.generate(email)
    const maxAge = (payload.exp - payload.iat) * 1000 // maxAge requires miliseconds

    ctx.cookies.set('access_token', token, {
      maxAge,
      domain: APP.HOSTNAME,
      secure: IS_PROD,
      httpOnly: IS_PROD,
      sameSite: IS_PROD ? 'Strict' : undefined,
    })

    ctx.status = status.ACCEPTED
    ctx.body = {
      ...user,
    }
  }

  public async clear(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.status = status.OK
    ctx.cookies.set('access_token', '', {
      maxAge: new Date().getTime(),
    })
  }
}
