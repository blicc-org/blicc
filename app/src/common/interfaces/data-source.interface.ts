export interface DataSource {
  id: string
  title: string
  description: string
  userId: string
  creationDate: Date
  data: object
  persistData: boolean
  fetchFrequency: number
}
