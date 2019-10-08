const isDev = process.env.NODE_ENV === 'development'

export const API = {
  ORIGIN: isDev ? 'http://localhost' : 'https://api.blicc.org',
  HOST: isDev ? 'localhost' : 'api.blicc.org',
}

export const APP = {
  ORIGIN: isDev ? 'http://localhost:3000' : 'https://blicc.org',
}

export const DELIVERY = {
  ORIGIN: isDev ? 'ws://localhost:8080' : 'wss://delivery.blicc.org',
}
