import Koa from 'koa'
import statusCode from 'http-status-codes'

export class ChartController {
  public async access(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { fileName } = ctx.params
    console.log(fileName)
    ctx.body = 'alert("Hello World");'
    ctx.set('Content-Type', 'text/javascript')
    ctx.status = statusCode.OK
  }
}
