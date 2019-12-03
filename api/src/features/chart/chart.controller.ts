import Koa from 'koa'
import statusCode from 'http-status-codes'
import { ChartService } from './chart.service'

export class ChartController {
  private chartService: ChartService

  public constructor() {
    this.chartService = new ChartService()
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    try {
      const { title, bundle, description = '' } = ctx.request.body
      const { id } = ctx.user
      ctx.body = await this.chartService.create(title, bundle, description, id)
      ctx.status = statusCode.CREATED
    } catch (e) {
      ctx.status = statusCode.INTERNAL_SERVER_ERROR
      ctx.body = ''
    }
  }

  public async get(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    try {
      const { id } = ctx.params
      ctx.body = await this.chartService.selectById(id)
      ctx.status = statusCode.OK
    } catch (e) {
      ctx.status = statusCode.INTERNAL_SERVER_ERROR
      ctx.body = ''
    }
  }

  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    try {
      const total = await this.chartService.getTotalEntries()
      const charts = await this.chartService.selectAll(
        ctx.query.skip,
        ctx.query.take
      )

      if (!charts) {
        ctx.status = statusCode.BAD_REQUEST
        return
      }

      ctx.body = { total, charts }
      ctx.status = statusCode.OK
    } catch (e) {
      ctx.status = statusCode.INTERNAL_SERVER_ERROR
      ctx.body = ''
    }
  }
}
