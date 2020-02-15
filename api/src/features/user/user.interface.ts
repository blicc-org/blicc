export interface User {
  id?: string
  firstName: string
  lastName: string
  email: string
  passwordHash?: string
  refreshToken?: string
  role: string
  hasTwoFactorAuth: boolean
  twoFactorAuthSecret?: string
  creationDate?: string
}
