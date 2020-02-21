import flags from 'commander'
import os from 'os'
import { App } from './app'
import { createConnection } from 'typeorm'
import { PORT } from './config'
import { DatabaseInitializer } from './util/database-initializer'
import { RedisClient } from './util/redis-client'
import { Logger } from './util/logger'

flags.option('-p, --port <number>', 'Port the server listens on')
flags.parse(process.argv)

var ifaces = os.networkInterfaces()

Object.keys(ifaces).forEach(function(ifname) {
  var alias = 0

  ifaces[ifname].forEach(function(iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address)
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address)
    }
    ++alias
  })
})

async function start(): Promise<void> {
  RedisClient.getInstance()
  await createConnection()
  await new DatabaseInitializer().populate()
  const port = flags.port ? flags.port : PORT
  new App().listen(port)
  Logger.info(`Listening on port ${port}`)
}

start()
