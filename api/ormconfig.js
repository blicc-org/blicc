module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: 'db',
  username: 'api',
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  entities: ['**/**/*.entity.{ts,js}'],
}
