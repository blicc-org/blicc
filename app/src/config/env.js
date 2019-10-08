const isDev = process.env.NODE_ENV === 'development'

export const API_ORIGIN = isDev ? 'http://localhost' : 'https://api.blicc.org'
export const APP_ORIGIN = isDev ? 'http://localhost:3000' : 'https://blicc.org'
export const DELIVERY_ORIGIN = isDev
  ? 'ws://localhost:8080'
  : 'wss://delivery.blicc.org'
