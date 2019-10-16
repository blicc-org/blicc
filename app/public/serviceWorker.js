self.addEventListener('install', event => {
  console.log('Service worker has been installed')
  event.waitUntil(console.log('caching shell assets'))
})

self.addEventListener('activate', () =>
  console.log('Service worker has been activated')
)

self.addEventListener('fetch', event => {
  console.log('Request url: ', event.request.url)
})
