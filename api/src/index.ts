import { App } from './app'
import { createConnection } from 'typeorm'

createConnection()
  .catch(e => {
    console.log(e)
  })
  .then((): void => {
    new App().listen(80)
    console.log(`The server is listening...`)
  })
