import Koa from 'koa'
import status from 'http-status-codes'
import { ChartService } from './chart.service'

export class ChartController {
  private chartService: ChartService

  public constructor() {
    this.chartService = new ChartService()
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { title, bundle, description = '' } = ctx.request.body
    const { id } = ctx.user
    ctx.body = await this.chartService.create(
      title,
      bundle,
      description,
      id,
      ''
    )
    ctx.status = 201
  }

  public async uploadFile(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()

    ctx.status = 201
  }

  public async get(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.set('Content-Type', 'text/javascript')
    ctx.body = ``
    ctx.status = status.OK
  }
}
