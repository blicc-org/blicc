import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Repository, getRepository } from 'typeorm'
import { User } from '../user/user.entity'
import { Hash } from '../common/hash.util'

export class SessionService {
  private userRepo: Repository<User>

  public constructor() {
    this.userRepo = getRepository(User)
  }

  public async authenticate(email: string, password: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ email })
    if (user === undefined) return false
    return Hash.authenticate(password, user.passwordHash)
  }

  public generateJWT(email: string): string {
    const path = `${__dirname}/../../certs/jwtRS256.key`
    const privateKey = fs.readFileSync(path)
    const startTime = new Date()
    const timeOut = new Date()

    timeOut.setTime(startTime.getTime() + 10 * 60 * 1000) // m * s * ms

    return jwt.sign(
      {
        email,
        startTime: startTime.toISOString(),
        timeOut: timeOut.toISOString(),
      },
      privateKey,
      {
        algorithm: 'RS256',
      }
    )
  }
}
