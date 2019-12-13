import Koa from 'koa'
import status from 'http-status-codes'
import { JWT } from '../../util/jwt'
import { TokenPayload } from '../../features/token'

export class AuthMiddleware {
  public static async handle(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    try {
      let token: string = ctx.cookies.get('access_token')
      if (!token) {
        const { authorization } = ctx.headers
        token = authorization.split(' ')[1]
      }
      const payload: TokenPayload = JWT.verify(token)
      if (payload) {
        ctx.user = payload
        await next()
      } else {
        ctx.status = status.NOT_FOUND
        ctx.body = 'User does not exist.'
      }
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        ctx.status = status.UNAUTHORIZED
        ctx.body = `Authorization token has expired on ${new Date(
          e.expiredAt
        )}.`
      } else if (e.name === 'ValidationError') {
        ctx.status = status.BAD_REQUEST
        ctx.body = e.message
      } else {
        ctx.status = status.UNAUTHORIZED
        ctx.body = 'Please provide a valid authorization token.'
      }
    }
  }
}
