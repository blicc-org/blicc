import Koa from 'koa'
import status from 'http-status-codes'
import { JWT } from '../util/jwt'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { Session } from '../session/session.interface'

export class AuthMiddleware {
  public static async handle(
    ctx: Koa.BaseContext,
    next: Function
  ): Promise<void> {
    try {
      let token: string = ctx.cookies.get('access_token')
      if (!token) {
        const { authorization } = ctx.headers
        token = authorization.split(' ')[1]
      }
      const session: Session = JWT.verify(token)
      const user: User | undefined = await new UserService().select(
        session.email
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
        ctx.status = status.UNAUTHORIZED
        ctx.body = 'Please provide a valid authorization token.'
      }
    }
  }
}
