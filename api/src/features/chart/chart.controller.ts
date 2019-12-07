import Koa from 'koa'
import statusCode from 'http-status-codes'
import { ChartService } from './chart.service'
import { Validation } from '../../util/validation'

export class ChartController {
  private chartService: ChartService

  public constructor() {
    this.chartService = new ChartService()
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { title, bundle, description = '' } = ctx.request.body
    const { id } = ctx.user
    ctx.body = await this.chartService.create(title, bundle, description, id)
    ctx.status = statusCode.CREATED
  }

  public async get(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { id } = ctx.params
    ctx.body = await this.chartService.selectById(id)
    ctx.status = statusCode.OK
  }

  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const fields = Validation.escapeFields(ctx.query.fields, [
      'id',
      'title',
      'bundle',
      'description',
      'userId',
      'creationDate',
      'slug',
    ])
    const searchTerm = Validation.escapeSearchQuery(ctx.query.search)
    const skip = Validation.escapeQueryNumber(ctx.query.skip)
    const take = Validation.escapeQueryNumber(ctx.query.take)

    const total = await this.chartService.getTotalEntries(searchTerm)
    const charts = await this.chartService.selectAll(
      fields,
      searchTerm,
      skip,
      take
    )

    ctx.body = { total, charts }
    ctx.status = statusCode.OK
  }
}
