import flags from 'commander'
import { Api } from './api'

flags.option('-p, --port <number>', 'Port the server listens on')
flags.parse(process.argv)

const port = flags.port || 80
new Api().listen(port)
console.log(`Listening on port ${port}`)
