import Koa from 'koa'
import statusCode from 'http-status-codes'
import { DataSourceService } from './data-source.service'
import { Validation } from '../../util/validation'

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
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { id } = ctx.user

    const fields = Validation.escapeFields(ctx.query.fields, [
      'id',
      'title',
      'description',
      'userId',
      'creationDate',
      'requestConfig',
      'persistData',
      'fetchFrequency',
    ])
    const searchTerm = Validation.escapeSearchQuery(ctx.query.search)
    const skip = Validation.escapeQueryNumber(ctx.query.skip)
    const take = Validation.escapeQueryNumber(ctx.query.take)

    const dataSources = await this.dataSourceService.listByUserId(
      id,
      fields,
      searchTerm,
      skip,
      take
    )
    const total = await this.dataSourceService.getTotalEntriesByUserId(id)

    if (!dataSources) {
      ctx.status = statusCode.BAD_REQUEST
      return
    }

    ctx.body = { total, dataSources }
    ctx.status = statusCode.OK
  }

  public async update(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.params
    const dataSource = await this.dataSourceService.select(id)

    if (dataSource && ctx.user.id === dataSource.userId) {
      if (
        ctx.request.body.id === dataSource.id &&
        ctx.request.body.userId === dataSource.userId &&
        ctx.request.body.creationDate === dataSource.creationDate
      ) {
        ctx.body = await this.dataSourceService.update(ctx.request.body)
        ctx.status = statusCode.OK
        return
      }
      ctx.status = statusCode.BAD_REQUEST
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async remove(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.params
    const dataSource = await this.dataSourceService.select(id)
    if (dataSource && ctx.user.id === dataSource.userId) {
      ctx.body = await this.dataSourceService.remove(dataSource)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }
}
