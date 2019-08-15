import Koa from 'koa'
import status from 'http-status-codes'
import { JWT } from '../util/jwt'

export class AuthMiddleware {
  public static async handle(
    ctx: Koa.BaseContext,
    next: Function
  ): Promise<void> {
    const { authorization } = ctx.headers
    const token: string = authorization.split(' ')[1]

    try {
      JWT.verify(token)
      next()
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        ctx.status = status.UNAUTHORIZED
        ctx.body = `Authorization token has expired on ${new Date(
          e.expiredAt
        )}.`
      } else {
        ctx.status = status.FORBIDDEN
        ctx.body = `Please provide valid authorization token.`
      }
    }
  }
}
