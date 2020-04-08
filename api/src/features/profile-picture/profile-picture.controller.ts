import Koa from 'koa'
import statusCode from 'http-status-codes'
import { Logger } from '../../util/logger'

export class ProfilePictureController {
  public async serve(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    Logger.info('received image put!!!')
    console.log('ctx.state.fields', ctx.state.fields)
    console.log('ctx.state.files.image', ctx.state.files.image)
    ctx.status = statusCode.OK
  }
}
