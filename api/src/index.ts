import flags from 'commander'
// import amqplib from 'amqplib'
import { App } from './app'
import { createConnection } from 'typeorm'
import { PORT } from './config'
import { DatabaseInitializer } from './util/database-initializer'
import { RedisClient } from './util/redis-client'
import { Logger } from './util/logger'

flags.option('-p, --port <number>', 'Port the server listens on')
flags.parse(process.argv)

async function start(): Promise<void> {
  RedisClient.getInstance()
  await createConnection()
  await new DatabaseInitializer().populate()
  const port = flags.port ? flags.port : PORT
  new App().listen(port)
  Logger.info(`Listening on port ${port}`)
}

start()

// async function connectionToRabbitMQ() {
//   const protocol = 'amqp'
//   const user = 'admin'
//   const password = process.env.RABBITMQ_PASSWORD
//   const host = 'rabbitmq'
//   const port = 5672
//   const url = `${protocol}://${user}:${password}@${host}:${port}`
//   console.log(url)

//   try {
//     const connection = await amqplib.connect(url)
//     console.log(connection)
//     const channel = await connection.createChannel()
//     console.log(channel)
//   } catch (error) {
//     console.error(error)
//   }
// }

// connectionToRabbitMQ()
