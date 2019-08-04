import { App } from './app'

const app = new App()
app.connect().then((): void => {
  app.listen(80)
  console.log(`The server is listening...`)
})
