export interface DataSource {
  id?: string
  title?: string
  description?: string
  userId?: string
  creationDate?: string
  requestConfig?: object
  persistData?: boolean
  fetchFrequency?: number
}
