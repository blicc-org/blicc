import Koa from 'koa'
import { DashboardService } from './dashboard.service'

export class DashboardController {
  private dashboardService: DashboardService

  public constructor() {
    this.dashboardService = new DashboardService()
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { title, data } = ctx.request.body
    const { id } = ctx.user
    ctx.body = await this.dashboardService.create(title, id, data)
    ctx.status = 201
  }

  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.body = 'Has to be logged in!!!'
  }
}
