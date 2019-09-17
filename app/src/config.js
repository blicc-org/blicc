const isDev = process.env.NODE_ENV === 'development'

export const API_URL = isDev ? 'http://localhost' : 'https://api.blicc.org'
export const APP_URL = isDev ? 'http://localhost:3000' : 'https://blicc.org'
export const DELIVERY_URL = isDev
  ? 'http://localhost:8080'
  : 'https://delivery.blicc.org'
