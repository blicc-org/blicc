import Koa from 'koa'
import status from 'http-status-codes'
import { UserService } from '../user/user.service'
import { TwoFactorAuthService } from './two-factor-auth.service'

export class TwoFactorAuthController {
  private userService: UserService
  private twoFactorAuthService: TwoFactorAuthService

  public constructor() {
    this.userService = new UserService()
    this.twoFactorAuthService = new TwoFactorAuthService()
  }

  public async request(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    if (ctx.user.hasTwoFactorAuth) {
      ctx.status = status.CONFLICT
    } else {
      const { secret, otpAuthUrl } = this.twoFactorAuthService.generateSecret()
      ctx.user.twoFactorAuthSecret = secret
      this.userService.update(ctx.user)
      ctx.body = { otpAuthUrl }
      ctx.status = status.OK
    }
  }

  public async enable(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { token } = ctx.request.body

    if (await this.twoFactorAuthService.authenticate(ctx.user.email, token)) {
      ctx.user.hasTwoFactorAuth = true
      await this.userService.update(ctx.user)
      ctx.status = status.NO_CONTENT
    } else {
      ctx.status = status.BAD_REQUEST
    }
  }
}
