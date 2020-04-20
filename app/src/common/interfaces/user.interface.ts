export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  hasTwoFactorAuth: boolean
  creationDate: Date
}

export enum Role {
  user,
  developer,
  admin,
}
