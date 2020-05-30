import { DefaultContext, Next } from 'koa'
import { mock } from './mocks/time.mock'

export class TimeController {
  public async mock(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    ctx.body = mock
    ctx.status = 200
  }
}
