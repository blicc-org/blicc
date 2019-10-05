import Koa from 'koa'
import status from 'http-status-codes'
import { TokenService } from './token.service'
import { UserService } from '../user/user.service'
import { JWT } from '../util/jwt'
import { IS_PROD } from '../config'

export class TokenController {
  private tokenService: TokenService
  private userService: UserService

  public constructor() {
    this.tokenService = new TokenService()
    this.userService = new UserService()
  }

  public async request(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()

    const { body } = ctx.request
    const { email, password } = body

    if (!email || !password) {
      ctx.status = status.UNPROCESSABLE_ENTITY
      return
    }

    const user = await this.userService.select(email)

    if (!user) {
      ctx.status = status.NOT_FOUND
      return
    }

    if (user.hasTwoFactorAuth) {
      if (!body.token) {
        ctx.status = status.BAD_REQUEST
        return
      }
      const { token } = body
      if (!(await this.tokenService.authenticate(email, password, token))) {
        ctx.status = status.FORBIDDEN
        return
      }
    } else if (!(await this.tokenService.authenticate(email, password))) {
      ctx.status = status.FORBIDDEN
      return
    }

    const { token, payload } = JWT.generate(email)
    const maxAge = (payload.exp - payload.iat) * 1000 // maxAge requires miliseconds

    ctx.cookies.set('access_token', token, {
      maxAge,
      secure: IS_PROD,
      httpOnly: IS_PROD,
      sameSize: 'Strict',
    })

    ctx.status = status.ACCEPTED
    ctx.body = {
      ...user,
    }
  }

  public async clear(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()
    ctx.cookies.set('access_token', null)
    ctx.status = status.NO_CONTENT
  }
}
