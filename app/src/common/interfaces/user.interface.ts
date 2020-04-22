export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  hasTwoFactorAuth: boolean
  creationDate: string
}

export enum Role {
  User = 'user',
  Developer = 'developer',
  Admin = 'admin',
}
