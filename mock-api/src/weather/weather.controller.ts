import Koa from 'koa'
import { mock } from './mocks/weather.mock'

export class WeatherController {
  public async mock(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.body = mock
    ctx.status = 200
  }
}
