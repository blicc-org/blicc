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
    const { id } = ctx.user
    ctx.body = await this.dataSourceService.create(
      title,
      description,
      id,
      requestConfig,
      persistData,
      fetchFrequency
    )
    ctx.status = 201
  }

  public async access(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.params
    const dataSource = await this.dataSourceService.select(id)
    if (dataSource !== undefined && ctx.user.id === dataSource.userId) {
      ctx.body = dataSource
      ctx.status = status.OK
      return
    }
    ctx.status = status.FORBIDDEN
  }

  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.user
    const dataSources = await this.dataSourceService.listByUserId(id)
    const total = await this.dataSourceService.getTotalEntriesByUserId(id)
    ctx.body = { total, dataSources }
    ctx.status = status.OK
  }

  public async update(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.params
    let dataSource = await this.dataSourceService.select(id)

    if (dataSource !== undefined && ctx.user.id === dataSource.userId) {
      if (
        ctx.request.body.id !== dataSource.id ||
        ctx.request.body.userId !== dataSource.userId ||
        ctx.request.body.creationDate !== dataSource.creationDate
      ) {
        ctx.status = status.BAD_REQUEST
        return
      }

      dataSource = await this.dataSourceService.update(ctx.request.body)
      ctx.body = dataSource
      ctx.status = status.OK
      return
    }
    ctx.status = status.FORBIDDEN
  }

  public async remove(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.params
    const dataSource = await this.dataSourceService.select(id)
    if (dataSource !== undefined && ctx.user.id === dataSource.userId) {
      ctx.body = await this.dataSourceService.remove(dataSource)
      ctx.status = status.OK
      return
    }
    ctx.status = status.FORBIDDEN
  }
}
