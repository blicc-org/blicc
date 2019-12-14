import Koa from 'koa'
import statusCode from 'http-status-codes'
import { UserService } from '../user'
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

    const user = await this.userService.selectById(ctx.state.jwt.userId)

    if (user) {
      if (user.hasTwoFactorAuth) {
        ctx.status = statusCode.CONFLICT
      } else {
        const {
          secret,
          otpAuthUrl,
        } = this.twoFactorAuthService.generateSecret()
        user.twoFactorAuthSecret = secret
        await this.userService.update(user)
        ctx.body = { otpAuthUrl }
        ctx.status = statusCode.OK
      }
    } else {
      ctx.status = statusCode.NOT_FOUND
    }
  }

  public async enable(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { token } = ctx.request.body
    const user = await this.userService.selectById(ctx.state.jwt.userId)

    if (user) {
      if (await this.twoFactorAuthService.authenticate(user.email, token)) {
        user.hasTwoFactorAuth = true
        await this.userService.update(user)
        ctx.status = statusCode.NO_CONTENT
      } else {
        ctx.status = statusCode.BAD_REQUEST
      }
    } else {
      ctx.status = statusCode.NOT_FOUND
    }
  }

  public async disable(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { token } = ctx.request.body
    const user = await this.userService.selectById(ctx.state.jwt.userId)

    if (user) {
      if (await this.twoFactorAuthService.authenticate(user.email, token)) {
        user.hasTwoFactorAuth = false
        user.twoFactorAuthSecret = ''
        await this.userService.update(user)
        ctx.status = statusCode.NO_CONTENT
      } else {
        ctx.status = statusCode.BAD_REQUEST
      }
    } else {
      ctx.status = statusCode.NOT_FOUND
    }
  }
}
