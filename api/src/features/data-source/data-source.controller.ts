import Koa from 'koa'
import status from 'http-status-codes'
import { DataSourceService } from './data-source.service'

export class DataSourceController {
  private dataSourceService: DataSourceService

  public constructor() {
    this.dataSourceService = new DataSourceService()
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const {
      title,
      description = '',
      requestConfig,
      persistData,
      fetchFrequency,
    } = ctx.request.body
    const { userId } = ctx.user
    ctx.body = await this.dataSourceService.create(
      title,
      description,
      userId,
      requestConfig,
      persistData,
      fetchFrequency
    )
    ctx.status = 201
  }

  public async access(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    try {
      const { id } = ctx.params
      const dataSource = await this.dataSourceService.select(id)
      if (dataSource !== undefined && ctx.user.id === dataSource.userId) {
        ctx.body = dataSource
        ctx.status = status.OK
        return
      }
      ctx.status = status.FORBIDDEN
    } catch (e) {
      ctx.status = status.INTERNAL_SERVER_ERROR
    }
  }

  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.status = status.OK
  }

  public async update(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.status = status.OK
  }

  public async remove(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.status = status.OK
  }
}
