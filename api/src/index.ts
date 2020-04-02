import flags from 'commander'
import { App } from './app'
import { createConnection } from 'typeorm'
import { PORT } from './config'
import { DatabaseInitializer } from './util/database-initializer'
import { RedisClient } from './util/redis-client'
import { RabbitMQClient } from './util/rabbitmq-client'
import { Logger } from './util/logger'

flags.option('-p, --port <number>', 'Port the server listens on')
flags.parse(process.argv)

async function start(): Promise<void> {
  RedisClient.getInstance()
  new RabbitMQClient()

  await createConnection()
  await new DatabaseInitializer().populate()
  const port = flags.port ? flags.port : PORT
  new App().listen(port)
  Logger.info(`Listening on port ${port}`)
}

start()
