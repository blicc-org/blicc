import bcrypt from 'bcryptjs'

export class Hash {
  private SALT = 10

  public static generate(password: string): string {
    return bcrypt.hashSync(password, 10)
  }

  public static authenticate(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash)
  }
}
