import { DefaultContext, Next } from 'koa'
import { IncomingForm } from 'formidable'

export class FormParserMiddleware {
  public static async handle(ctx: DefaultContext, next: Next): Promise<void> {
    const form = new IncomingForm()

    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err)
        } else {
          ctx.state.fields = fields
          ctx.state.files = files
          resolve()
        }
      })
    })
    await next()
  }
}
