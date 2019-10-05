import { Repository, getRepository } from 'typeorm'
import speakeasy from 'speakeasy'
import { User } from '../user/user.entity'
import {TwoFactorAuthSecret } from './two-factor-auth-secret.interface'

export class TwoFactorAuthService {
  private userRepo: Repository<User>

  public constructor() {
    this.userRepo = getRepository(User)
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

    return speakeasy.totp.verify({
        secret: twoFactorAuthSecret,
        encoding: 'base32',
        token,
    })
  }
}
