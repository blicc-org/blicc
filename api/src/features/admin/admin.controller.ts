import Koa from 'koa'
import status from 'http-status-codes'
import { UserService } from '../user/user.service'
import { AdminService } from './admin.service'
import { Validation } from '../../util/validation'

export class AdminController {
  private userService: UserService
  private adminService: AdminService

  public constructor() {
    this.userService = new UserService()
    this.adminService = new AdminService()
  }

  public async initialize(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    if (await this.adminService.isInitializeAdminAllowed()) {
      const { firstName, lastName, email, password } = ctx.request.body

      if (
        !Validation.isName(firstName) ||
        !Validation.isName(lastName) ||
        !Validation.isEmail(email) ||
        !Validation.isPassword(password)
      ) {
        ctx.status = status.UNPROCESSABLE_ENTITY
        return
      }

      const user = await this.userService.register(
        firstName,
        lastName,
        email,
        password,
        'admin'
      )
      if (user !== undefined) {
        ctx.status = status.CREATED
        ctx.body = user
        return
      } else {
        ctx.status = status.INTERNAL_SERVER_ERROR
      }
    } else {
      ctx.status = status.BAD_REQUEST
      ctx.body = 'You can only initialize the root admin on a new setup.'
    }
  }
}
