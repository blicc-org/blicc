import Koa from 'koa'
import statusCode from 'http-status-codes'
import { ChartService } from './chart.service'
import { Validation } from '../../util'

export class ChartController {
  private chartService: ChartService

  public constructor() {
    this.chartService = new ChartService()
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { title, bundle, description = '', key, slug } = ctx.request.body
    const { userId } = ctx.state.jwt
    ctx.body = await this.chartService.create(
      title,
      bundle,
      description,
      key,
      slug,
      userId
    )
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
      'key',
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

  public async update(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { id } = ctx.params
    const chart = await this.chartService.selectById(id)

    if (chart && chart.userId === ctx.state.jwt.userId) {
      if (
        ctx.request.body.id === chart.id &&
        ctx.request.body.userId === chart.userId &&
        ctx.request.body.creationDate === chart.creationDate
      ) {
        ctx.body = await this.chartService.update(ctx.request.body)
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
    const chart = await this.chartService.selectById(id)
    if (chart && ctx.state.jwt.userId === chart.userId) {
      ctx.body = await this.chartService.remove(chart)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }
}
