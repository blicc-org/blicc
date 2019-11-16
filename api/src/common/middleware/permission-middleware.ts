import Koa from 'koa'
import status from 'http-status-codes'

export class PermissionMiddleware {
  public static async handle(
    roles: string[],
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    if (ctx.user && roles.some(role => ctx.user.role === role)) await next()
    else {
      ctx.status = status.FORBIDDEN
      ctx.body = `You need ${
        roles.length <= 1
          ? roles[0]
          : roles.slice(0, -1).join(', ') + ' or ' + roles.slice(-1)
      } rights to access this resource.`
    }
  }
}
