const isDev = process.env.NODE_ENV === 'development'
const host = isDev ? 'localhost' : 'db'
const entities = isDev ? '**/**/*.entity.ts' : '**/**/*.entity.js'

module.exports = {
  type: 'postgres',
  host: host,
  port: 5432,
  database: 'db',
  username: 'api',
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  entities: [entities],
}
