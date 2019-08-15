import Koa from 'koa'
import status from 'http-status-codes'

export class PermissionMiddleware {
  public static async handle(
    role: string,
    ctx: Koa.BaseContext,
    next: Function
  ): Promise<void> {
    if (ctx.user && ctx.user.role === role) next()
    else {
      ctx.status = status.FORBIDDEN
      ctx.body = `You need ${role} rights to access this resource.`
    }
  }
}
