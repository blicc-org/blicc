import { DefaultContext, Next } from 'koa'
import { ApiDocsService } from './api-docs.service'

export class ApiDocsController {
  private apiDocsService: ApiDocsService

  public constructor() {
    this.apiDocsService = new ApiDocsService()
  }

  public async swagger(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    ctx.set('Content-Type', 'application/json')
    ctx.body = this.apiDocsService.getSwaggerJSON()
  }
}
