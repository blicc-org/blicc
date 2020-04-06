import Koa from 'koa'
import { ApiDocsService } from './api-docs.service'
import { MinioClient } from '../../util/minio-client'

export class ApiDocsController {
  private apiDocsService: ApiDocsService

  public constructor() {
    this.apiDocsService = new ApiDocsService()
  }

  public async swagger(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.set('Content-Type', 'application/json')
    ctx.body = this.apiDocsService.getSwaggerJSON()
  }

  public async thumbnails(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    const { imageName } = ctx.params
    ctx.set('Content-Type', 'image/png')
    ctx.body = await MinioClient.load('dashboard-thumbnails', imageName)
  }
}
