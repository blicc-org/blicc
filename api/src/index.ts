import flags from 'commander'
import { App } from './app'
import { createConnection } from 'typeorm'
import { PORT } from './config'
import { DatabaseInitializer } from './util/database-initializer'

flags.option('-p, --port <number>', 'Port the server listens on')
flags.parse(process.argv)

createConnection()
  .catch((e): void => {
    console.log(e)
  })
  .then((): void => {
    new DatabaseInitializer().populate().then(() => {
      const port = flags.port ? flags.port : PORT
      new App().listen(port)
      console.log(`Listening on port ${port}...`)
    })
  })
