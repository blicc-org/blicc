import Koa from 'koa'
import status from 'http-status-codes'
import { JWT } from '../util/jwt'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'

export class AuthMiddleware {
  public static async handle(
    ctx: Koa.BaseContext,
    next: Function
  ): Promise<void> {
    const { authorization } = ctx.headers
    const token: string = authorization.split(' ')[1]
    try {
      const response: any = JWT.verify(token)
      const user: User | undefined = await new UserService().select(
        response.email
      )
      if (user) {
        ctx.user = user
        next()
      } else {
        ctx.status = status.NOT_FOUND
        ctx.body = 'User does not exist anymore.'
      }
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        ctx.status = status.UNAUTHORIZED
        ctx.body = `Authorization token has expired on ${new Date(
          e.expiredAt
        )}.`
      } else {
        ctx.status = status.FORBIDDEN
        ctx.body = 'Please provide valid authorization token.'
      }
    }
  }
}
