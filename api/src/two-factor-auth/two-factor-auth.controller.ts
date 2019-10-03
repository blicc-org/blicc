import Koa from 'koa'
import speakeasy from 'speakeasy'
import status from 'http-status-codes'
import { UserService } from '../user/user.service'

export class TwoFactorAuthController {
  private userService: UserService

  public constructor() {
    this.userService = new UserService()
  }

  public async request(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()

    if (ctx.user.hasTwoFactorAuth) {
      ctx.status = status.CONFLICT
    } else {
      const secret = speakeasy.generateSecret()
      ctx.user.twoFactorAuthSecret = secret.base32
      ctx.body = { otpAuthUrl: secret.otpauth_url }
      ctx.status = status.OK
    }
  }

  public async enable(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()

    const { token } = ctx.request.body
    const { twoFactorAuthSecret } = ctx.user
    if (
      speakeasy.totp.verify({
        secret: twoFactorAuthSecret,
        encoding: 'base32',
        token,
      })
    ) {
      ctx.user.hasTwoFactorAuth = true
      this.userService.update(ctx.user)
      ctx.status = status.NO_CONTENT
    } else {
      ctx.status = status.BAD_REQUEST
    }
  }
}
