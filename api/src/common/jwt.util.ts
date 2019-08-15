import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Session } from '../session/session.interface'

export class JWT {
  private static CERTS = `${__dirname}/../../certs`
  private static PRIVATE = `${JWT.CERTS}/rsa.pem`

  public static generate(email: string): string {
    const privateKey = fs.readFileSync(JWT.PRIVATE)

    const iat = Math.trunc(new Date().getTime() / 1000)
    const exp = iat + 10 * 60 // m * s => timeout of 10 minutes
    const session: Session = { iat, exp, email }
    return jwt.sign(session, privateKey, {
      algorithm: 'RS256',
    })
  }

  public static verify(token: string): string | object {
    const privateKey = fs.readFileSync(JWT.PRIVATE)

    return jwt.verify(token, privateKey, {
      algorithms: ['RS256'],
    })
  }
}
