import fs from 'fs'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../features/token'
import { CERTS } from '../config'
import { User } from '../features/user'

export class JWT {
  private static ALGORITHM = 'RS256'
  private static PRIVATE = `${CERTS}/rsa.pem`
  private static PUBLIC = `${CERTS}/rsa_pub.pem`

  public static generate(user: User): { token: string; payload: TokenPayload } {
    const privateKey = fs.readFileSync(JWT.PRIVATE)

    const iat = Math.trunc(new Date().getTime() / 1000)
    const exp = iat + 15 * 60 // m * s => timeout of 15 minutes
    if (!user.id) throw Error('User id is undefined!')
    const payload: TokenPayload = {
      iat,
      exp,
      userId: user.id,
      role: user.role,
    }
    return {
      token: jwt.sign(payload, privateKey, {
        algorithm: JWT.ALGORITHM,
      }),
      payload,
    }
  }

  public static verify(token: string): TokenPayload {
    const publicKey = fs.readFileSync(JWT.PUBLIC)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = jwt.verify(token, publicKey, {
      algorithms: [JWT.ALGORITHM],
    })

    return res
  }
}
