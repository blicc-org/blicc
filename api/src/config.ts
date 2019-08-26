const isDev = process.env.NODE_ENV === 'development'

export const DOMAIN = isDev ? '127.0.0.1' : 'blicc.org'
export const IS_PROD = !isDev
