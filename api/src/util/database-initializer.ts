import { UserService } from '../features/user'
import { ADMIN_MAIL, ADMIN_PASSWORD } from '../config'

export class DatabaseInitializer {
  private userService: UserService

  public constructor() {
    this.userService = new UserService()
  }

  public async populate(): Promise<void> {
    this.userService.register(
      'Root',
      'Admin',
      ADMIN_MAIL,
      ADMIN_PASSWORD,
      'admin'
    )
  }
}
