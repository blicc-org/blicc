export interface Dashboard {
  id: string
  title: string
  description: string
  userId: string
  creationDate: string
  data: object
  published: boolean
}

export interface DashboardList {
  dashboards: Array<Dashboard>
  total: number
}
