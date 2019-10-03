import Koa from 'koa'

export class TwoFactorAuthController {
  
  public async enable(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()
  }
}
