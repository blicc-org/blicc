import Koa from 'koa'
import statusCode from 'http-status-codes'
import { Logger } from '../../util/logger'

export class ProfilePictureController {
  public async serve(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    Logger.info('received image put!!!')
    console.log('ctx.request.file', ctx.request.file)
    console.log('ctx.file', ctx.file)
    console.log('ctx.request.body', ctx.request.body)
    ctx.status = statusCode.OK
  }
}
