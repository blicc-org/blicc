import { DefaultContext, Next } from 'koa'
import statusCode from 'http-status-codes'
import { DataSourceService } from './data-source.service'
import { Validation } from '../../util'

export class DataSourceController {
  private dataSourceService: DataSourceService

  public constructor() {
    this.dataSourceService = new DataSourceService()
  }

  public async create(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { title, description = '', data } = ctx.request.body
    const { userId } = ctx.state.jwt
    const dataSource = await this.dataSourceService.create(
      title,
      description,
      userId,
      data
    )
    ctx.body = dataSource
    ctx.status = 201
  }

  public async access(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { id } = ctx.params
    const dataSource = await this.dataSourceService.select(id)
    if (
      dataSource &&
      (ctx.state.jwt.userId === dataSource.userId ||
        ctx.state.jwt.role === 'admin')
    ) {
      ctx.body = dataSource
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async list(ctx: DefaultContext, next: Next): Promise<void> {
    await next()

    const { userId } = ctx.state.jwt

    const fields = Validation.escapeFields(ctx.query.fields, [
      'id',
      'title',
      'description',
      'userId',
      'creationDate',
      'data',
    ])
    const searchTerm = Validation.escapeSearchQuery(ctx.query.search)
    const skip = Validation.escapeQueryNumber(ctx.query.skip)
    const take = Validation.escapeQueryNumber(ctx.query.take)

    const dataSources = await this.dataSourceService.listByUserId(
      userId,
      fields,
      searchTerm,
      skip,
      take
    )
    const total = await this.dataSourceService.getTotalEntriesByUserId(userId)

    if (!dataSources) {
      ctx.status = statusCode.BAD_REQUEST
      return
    }

    ctx.body = { total, dataSources }
    ctx.status = statusCode.OK
  }

  public async update(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { id } = ctx.params
    const dataSource = await this.dataSourceService.select(id)

    if (dataSource && ctx.state.jwt.userId === dataSource.userId) {
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

  public async remove(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { id } = ctx.params
    const dataSource = await this.dataSourceService.select(id)
    if (dataSource && ctx.state.jwt.userId === dataSource.userId) {
      ctx.body = await this.dataSourceService.remove(dataSource)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }
}
