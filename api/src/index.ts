import flags from 'commander'
import { App } from './app'
import { createConnection } from 'typeorm'
import { PORT } from './config'
import { Logger, DatabaseInitializer } from './util'

flags.option('-p, --port <number>', 'Port the server listens on')
flags.parse(process.argv)

async function start(): Promise<void> {
  await createConnection()
  await new DatabaseInitializer().populate()
  const port = flags.port ? flags.port : PORT
  new App().listen(port)
  Logger.info(`Listening on port ${port}`)
}

start()
