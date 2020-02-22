const http = require('http')
let port = 80

if (process.argv[2] === '-p' && process.argv[3]) port = process.argv[3]

const options = {
  host: '0.0.0.0',
  port,
  timeout: 2000,
  path: '/health-check',
}

const healthCheck = http.request(options, res => {
  if (res.statusCode == 204) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})

healthCheck.on('error', () => {
  process.exit(1)
})

healthCheck.end()
