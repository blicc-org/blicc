import { Repository, getRepository } from 'typeorm'
import { TwoFactorAuthService } from '../two-factor-auth'
import { UserEntity } from '../user'
import { Hash } from '../../util'

export class TokenService {
  private userRepo: Repository<UserEntity>
  private twoFactorAuthService: TwoFactorAuthService

  public constructor() {
    this.userRepo = getRepository(UserEntity)
    this.twoFactorAuthService = new TwoFactorAuthService()
  }

  public async authenticate(
    email: string,
    password: string,
    check2FA: boolean,
    token = ''
  ): Promise<boolean> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .addSelect('user.twoFactorAuthSecret')
      .where('user.email = :email', { email })
      .getOne()

    if (user === undefined) return false

    if (!Hash.authenticate(password, user.passwordHash)) {
      return false
    }

    if (!check2FA) return true

    if (user.hasTwoFactorAuth) {
      return this.twoFactorAuthService.validateToken(
        user.twoFactorAuthSecret,
        token
      )
    }

    return true
  }
}
