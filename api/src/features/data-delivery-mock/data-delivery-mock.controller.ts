import Koa from 'koa'
import statusCode from 'http-status-codes'
import { mock } from './mocks/data-delivery.mock'

export class DataDeliveryMockController {
  public async mock(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.body = mock
    ctx.status = statusCode.OK
  }
}
