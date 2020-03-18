import Koa from 'koa'
import { mock } from './mocks/manufacturng-data.mock'

export class ManufacturingDataController {
  public async mock(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.body = mock
    ctx.status = 200
  }
}
