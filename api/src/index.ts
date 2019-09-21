import { App } from './app'
import { createConnection } from 'typeorm'
import { PORT } from './config'

createConnection()
  .catch((e): void => {
    console.log(e)
  })
  .then((): void => {
    new App().listen(PORT)
    console.log(`The server is listening on port ${PORT} ...`)
  })
