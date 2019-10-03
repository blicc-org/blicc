import Koa from 'koa'
import status from 'http-status-codes'
import speakeasy from 'speakeasy'
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

  public async login(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()

    const { email, password } = ctx.request.body

    if (!email || !password) {
      ctx.status = status.UNPROCESSABLE_ENTITY
      return
    }

    const user = await this.userService.select(email)

    if (!user) {
      ctx.status = status.NOT_FOUND
      return
    }

    if (!(await this.tokenService.authenticate(email, password))) {
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
      jwt: token,
      ...user,
    }
  }

  public async twofactor(ctx: Koa.BaseContext, next: Function): Promise<void>{
    await next()
    var secret = speakeasy.generateSecret();
    ctx.body = {url: secret.otpauth_url}
  }

  public async logout(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()
    ctx.cookies.set('access_token', null)
    ctx.status = status.NO_CONTENT
  }
}
