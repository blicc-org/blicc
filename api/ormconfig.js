const isDev = process.env.NODE_ENV === 'development'
const entities = isDev ? '**/**/*.entity.ts' : '**/**/*.entity.js'

module.exports = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  database: 'db',
  username: 'api',
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  entities: [entities],
}
