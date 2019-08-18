import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Session } from '../session/session.interface'

export class JWT {
  private static ALGORITHM = 'RS256'
  private static CERTS = `${__dirname}/../../certs`
  private static PRIVATE = `${JWT.CERTS}/rsa.pem`
  private static PUBLIC = `${JWT.CERTS}/rsa_pub.pem`

  public static generate(email: string): { token: string; session: Session } {
    const privateKey = fs.readFileSync(JWT.PRIVATE)

    const iat = Math.trunc(new Date().getTime() / 1000)
    const exp = iat + 2 * 24 * 60 * 60 // m * s => timeout of 10 minutes
    const session: Session = { iat, exp, email }
    return {
      token: jwt.sign(session, privateKey, {
        algorithm: JWT.ALGORITHM,
      }),
      session,
    }
  }

  public static verify(token: string): Session {
    const publicKey = fs.readFileSync(JWT.PUBLIC)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = jwt.verify(token, publicKey, {
      algorithms: [JWT.ALGORITHM],
    })

    return res
  }
}
