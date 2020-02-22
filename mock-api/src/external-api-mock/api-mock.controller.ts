import Koa from 'koa'
import { mock } from './mocks/external-api-mock.mock'

export class ApiMockController {
  public async mock(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.body = mock
    ctx.status = 200
  }
}
