import { App } from './app'
import { createConnection } from 'typeorm'

createConnection().then((): void => {
  new App().listen(80)
  console.log(`The server is listening...`)
})
