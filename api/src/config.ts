const isDev = process.env.NODE_ENV === 'development'

export const DOMAIN = isDev ? '127.0.0.1' : 'blicc.org'
export const IS_PROD = !isDev

export const MAIL_ADDRESS = process.env.MAIL_ADDRESS
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD
export const MAIL_HOST = process.env.MAIL_HOST
