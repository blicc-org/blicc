import { DefaultContext, Next } from 'koa'
import statusCode from 'http-status-codes'
import { DashboardService } from './dashboard.service'
import { Validation } from '../../util'

export class DashboardController {
  private dashboardService: DashboardService

  public constructor() {
    this.dashboardService = new DashboardService()
  }

  public async create(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { title, description = '', data } = ctx.request.body
    const { userId } = ctx.state.jwt
    const dashboard = await this.dashboardService.create(
      title,
      description,
      userId,
      data
    )
    ctx.body = dashboard
    ctx.status = 201
  }

  public async access(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { id } = ctx.params
    const dashboard = await this.dashboardService.select(id)
    if (
      dashboard &&
      (ctx.state.jwt.userId === dashboard.userId ||
        ctx.state.jwt.role === 'admin')
    ) {
      ctx.body = dashboard
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
      'visibility',
    ])
    const searchTerm = Validation.escapeSearchQuery(ctx.query.search)
    const skip = Validation.escapeQueryNumber(ctx.query.skip)
    const take = Validation.escapeQueryNumber(ctx.query.take)

    const dashboards = await this.dashboardService.listByUserId(
      userId,
      fields,
      searchTerm,
      skip,
      take
    )
    const total = await this.dashboardService.getTotalEntriesByUserId(
      userId,
      searchTerm
    )

    ctx.body = { total, dashboards }
    ctx.status = statusCode.OK
  }

  public async update(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { id } = ctx.params
    const dashboard = await this.dashboardService.select(id)

    if (dashboard && ctx.state.jwt.userId === dashboard.userId) {
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

  public async delete(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { id } = ctx.params
    const dashboard = await this.dashboardService.select(id)
    if (dashboard && ctx.state.jwt.userId === dashboard.userId) {
      ctx.body = await this.dashboardService.remove(dashboard)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }
}
