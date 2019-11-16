import { Repository, getRepository } from 'typeorm'
import speakeasy from 'speakeasy'
import { UserEntity } from '../user'
import { TwoFactorAuthSecret } from './two-factor-auth-secret.interface'

export class TwoFactorAuthService {
  private userRepo: Repository<UserEntity>

  public constructor() {
    this.userRepo = getRepository(UserEntity)
  }

  public generateSecret(): TwoFactorAuthSecret {
    const secret = speakeasy.generateSecret()
    return { secret: secret.base32, otpAuthUrl: secret.otpauth_url }
  }

  public async authenticate(email: string, token: string): Promise<boolean> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.twoFactorAuthSecret')
      .where('user.email = :email', { email })
      .getOne()

    if (user === undefined) return false
    const { twoFactorAuthSecret } = user
    return this.validateToken(twoFactorAuthSecret, token)
  }

  public validateToken(twoFactorAuthSecret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: twoFactorAuthSecret,
      encoding: 'base32',
      token,
    })
  }
}
