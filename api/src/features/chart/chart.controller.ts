import Koa from 'koa'
import { ChartService } from './chart.service'

export class ChartController {
  private chartService: ChartService

  public constructor() {
    this.chartService = new ChartService()
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { title, bundle, description = '', path } = ctx.request.body
    const { id } = ctx.user
    ctx.body = await this.chartService.create(
      title,
      bundle,
      description,
      id,
      path
    )
    ctx.status = 201
  }
}
