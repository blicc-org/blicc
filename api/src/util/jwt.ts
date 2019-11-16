import fs from 'fs'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../features/token/token-payload.interface'
import { CERTS } from '../config'

export class JWT {
  private static ALGORITHM = 'RS256'
  private static PRIVATE = `${CERTS}/rsa.pem`
  private static PUBLIC = `${CERTS}/rsa_pub.pem`

  public static generate(
    email: string
  ): { token: string; payload: TokenPayload } {
    const privateKey = fs.readFileSync(JWT.PRIVATE)

    const iat = Math.trunc(new Date().getTime() / 1000)
    const exp = iat + 2 * 24 * 60 * 60 // m * s => timeout of 10 minutes
    const payload: TokenPayload = { iat, exp, email }
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
