const isDev = process.env.NODE_ENV === 'localdev'
const HOST = isDev ? 'localhost' : 'db'
const ENTITIES = isDev ? '**/**/*.entity.ts' : '**/**/*.entity.js'

module.exports = {
  type: 'postgres',
  host: HOST,
  port: 5432,
  database: 'db',
  username: 'api',
  password: '1234',
  synchronize: true,
  entities: [ENTITIES],
}
