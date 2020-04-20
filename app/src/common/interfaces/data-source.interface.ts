export interface DataSource {
  id: string
  title: string
  description: string
  userId: string
  creationDate: string
  data: object
  persistData: boolean
  fetchFrequency: number
}

export interface DataSourceList {
  dataSources: Array<DataSource>
  total: number
}
