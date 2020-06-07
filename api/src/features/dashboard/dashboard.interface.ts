type Data = any

export interface Dashboard {
  id?: string
  title?: string
  description?: string
  userId?: string
  creationDate?: string
  data?: Data
  visibility?: string
}
