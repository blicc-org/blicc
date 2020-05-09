const isDev = process.env.NODE_ENV === 'development'

export const APP = {
  HOSTNAME: isDev ? 'localhost' : 'blicc.org',
  ORIGIN_INSIDE: isDev ? 'http://app:3000' : 'http://app',
}

export const REDIS_HOST = 'redis'

export const IS_PROD = !isDev

export const PORT = 80
export const REDIS_PORT = 6379

export const MAIL_ADDRESS = process.env.MAIL_ADDRESS
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD
export const MAIL_HOST = process.env.MAIL_HOST

export const CERTS = `${__dirname}/../certs`

export const API_TEST_TARGET = process.env.API_TEST_TARGET || ''
export const ADMIN_MAIL = process.env.ADMIN_MAIL || ''
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

export const MINIO_USERNAME = process.env.MINIO_USERNAME || ''
export const MINIO_PASSWORD = process.env.MINIO_PASSWORD || ''

export const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME || ''
export const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD || ''
