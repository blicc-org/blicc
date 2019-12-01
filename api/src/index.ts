import flags from 'commander'
import { App } from './app'
import { createConnection } from 'typeorm'
import { PORT } from './config'
import { DatabaseInitializer } from './util/database-initializer'
import { RedisClient } from './util/redis-client'

flags.option('-p, --port <number>', 'Port the server listens on')
flags.parse(process.argv)

async function start(): Promise<void> {
  RedisClient.getInstance().set('hello_world', 'Hello World!!!')
  const helloWorld = await RedisClient.getInstance().get('hello_world')
  console.log(
    helloWorld === 'Hello World!!!'
      ? 'It fucking works!!!!'
      : 'Damn son try again'
  )
  await createConnection()
  await new DatabaseInitializer().populate()
  const port = flags.port ? flags.port : PORT
  new App().listen(port)
  console.log(`Listening on port ${port}...`)
}

start()
