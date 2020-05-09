import bcrypt from 'bcryptjs'

export class Hash {
  private static SALT: number = 10

  public static generate(password: string): string {
    return bcrypt.hashSync(password, this.SALT)
  }

  public static authenticate(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash)
  }
}
