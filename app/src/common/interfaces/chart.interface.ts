export interface Chart {
  id: string
  title: string
  bundle: string
  description: string
  userId: string
  creationDate: string
  key: string
  slug: string
}

export interface ChartList {
  charts: Array<Chart>
  total: number
}
