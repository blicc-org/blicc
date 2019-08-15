import Koa from 'koa'
import status from 'http-status-codes'
import { JWT } from '../common/jwt.util'

export class AuthMiddleware {
  public static async handle(
    ctx: Koa.BaseContext,
    next: Function
  ): Promise<void> {
    const { authorization } = ctx.headers
    const token = authorization.split(' ')[1]

    try {
      JWT.verify(token)
      next()
    } catch (e) {
      ctx.status = status.FORBIDDEN
    }
  }
}
