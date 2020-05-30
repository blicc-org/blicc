import { DefaultContext, Next } from 'koa'
import { mock } from './mocks/weather.mock'

export class WeatherController {
  public async mock(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    ctx.body = mock
    ctx.status = 200
  }
}
