const isDev = process.env.NODE_ENV === 'development'

export const APP = {
  HOSTNAME: isDev ? 'localhost' : 'blicc.org',
  ORIGIN: isDev ? 'http://localhost' : 'https://blicc.org',
}

export const REDIS_HOST = isDev ? '127.0.0.1' : 'redis'

export const IS_PROD = !isDev

export const PORT = 80
export const REDIS_PORT = 6379

export const MAIL_ADDRESS = process.env.MAIL_ADDRESS
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD
export const MAIL_HOST = process.env.MAIL_HOST

export const CERTS = `${__dirname}/../certs`

export const API_TEST_TARGET = process.env.API_TEST_TARGET
export const ADMIN_MAIL = process.env.ADMIN_MAIL || ''
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

export const bodyParserOptions = {
  enableTypes: ['json', 'text'],
  extendTypes: {
    text: ['application/javascript'],
  },
  textLimit: '500kb'
}
