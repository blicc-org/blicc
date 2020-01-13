const cacheName = 'v1'
const limit = 100

self.addEventListener('install', () =>
  console.log('Service worker has been installed')
)

self.addEventListener('activate', () =>
  console.log('Service worker has been activated')
)

self.addEventListener('fetch', evt => {
  const { request } = evt
  const { url } = request
  if (url.indexOf('http') === 0 && url.includes('chunk')) {
    evt.respondWith(firstCacheThenNetwork(request))
  }
})

async function firstCacheThenNetwork(request) {
  const { url } = request
  return await caches.match(request).then(res => {
    if (res) console.log(`Service worker takes ${url} from cache`)
    return (
      res ||
      fetch(request)
        .then(res => {
          const resClone = res.clone()
          caches.open(cacheName).then(cache => {
            cache.put(request, resClone)
            limitCacheSize(cacheName, limit)
          })
          return res
        })
        .catch(err => {
          console.log('Error in service worker: ', err)
        })
    )
  })
}

function limitCacheSize(name, size) {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}
