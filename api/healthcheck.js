const http = require('http')
const options = {
  host: '0.0.0.0',
  port: 80,
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
