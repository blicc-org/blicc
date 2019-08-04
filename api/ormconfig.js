const isDev = process.env.NODE_ENV === 'localdev'
const HOST = isDev ? 'localhost' : 'db'

module.exports = {
  type: 'postgres',
  host: HOST,
  port: 5432,
  database: 'database',
  username: 'root',
  password: 'root',
  synchronize: true,
  entities: ['**/**/*.entity.{js,ts}'],
}
