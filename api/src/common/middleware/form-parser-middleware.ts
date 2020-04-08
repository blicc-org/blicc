import Koa from 'koa'
import formidable from 'formidable'

export class FormParserMiddleware {
  public static async handle(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    const form = new formidable.IncomingForm()

    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err)
        } else {
          ctx.request.body = fields
          ctx.request.files = files
          resolve()
        }
      })
    })
    await next()
  }
}
