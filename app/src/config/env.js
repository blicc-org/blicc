const isDev = process.env.NODE_ENV === 'development'

export const API = isDev ? 'http://localhost' : 'https://api.blicc.org'
export const APP = isDev ? 'http://localhost:3000' : 'https://blicc.org'
export const DELIVERY = isDev
  ? 'ws://localhost:8080/connection'
  : 'wss://delivery.blicc.org/connection'
