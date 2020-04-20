export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  hasTwoFactorAuth: boolean
  creationDate: string
}

export interface UserList {
  users: Array<User>
  total: number
}

export enum Role {
  user,
  developer,
  admin,
}
