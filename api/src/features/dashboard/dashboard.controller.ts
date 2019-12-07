import Koa from 'koa'
import statusCode from 'http-status-codes'
import { DashboardService } from './dashboard.service'
import { Validation } from '../../util/validation'

export class DashboardController {
  private dashboardService: DashboardService

  public constructor() {
    this.dashboardService = new DashboardService()
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { title, description = '', data } = ctx.request.body
    const { id } = ctx.user
    ctx.body = await this.dashboardService.create(title, description, id, data)
    ctx.status = 201
  }

  public async access(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.params
    const dashboard = await this.dashboardService.select(id)
    if (dashboard !== undefined && ctx.user.id === dashboard.userId) {
      ctx.body = dashboard
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
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

    const dashboards = await this.dashboardService.listByUserId(
      ctx.user.id,
      fields,
      searchTerm,
      skip,
      take
    )
    const total = await this.dashboardService.getTotalEntriesByUserId(
      ctx.user.id,
      searchTerm
    )

    ctx.body = { total, dashboards }
    ctx.status = statusCode.OK
  }

  public async update(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { id } = ctx.params
    const dashboard = await this.dashboardService.select(id)

    if (dashboard && ctx.user.id === dashboard.userId) {
      if (
        ctx.request.body.id === dashboard.id &&
        ctx.request.body.userId === dashboard.userId &&
        ctx.request.body.creationDate === dashboard.creationDate
      ) {
        ctx.body = await this.dashboardService.update(ctx.request.body)
        ctx.status = statusCode.OK
        return
      }
      ctx.status = statusCode.BAD_REQUEST
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async delete(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.params
    const dashboard = await this.dashboardService.select(id)
    if (dashboard && ctx.user.id === dashboard.userId) {
      ctx.body = await this.dashboardService.remove(dashboard)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }
}
