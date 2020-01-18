const cacheName = 'v1'
const limit = 100
const { scope } = registration

self.addEventListener('install', () => console.log('Service worker installed'))
self.addEventListener('activate', () => console.log('Service worker activated'))

self.addEventListener('fetch', evt => {
  const { request } = evt
  const { url } = request
  if (url.indexOf('http') === 0 && url.includes('chunk')) {
    evt.respondWith(cacheFirst(request))
  } else if (url.includes(scope)) {
    evt.respondWith(networkFirst(request))
  }
})

async function cacheFirst(request) {
  const { url } = request
  return await caches.match(request).then(res => {
    if (res) console.log(`Service worker cache first ${url}`)
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
          console.log('Service worker cache first error: ', err)
        })
    )
  })
}

async function networkFirst(request) {
  const { url } = request
  return await fetch(request)
    .then(res => {
      const resClone = res.clone()
      caches.open(cacheName).then(cache => {
        cache.put(request, resClone)
        limitCacheSize(cacheName, limit)
      })
      return res
    })
    .catch(async () => {
      return await caches
        .match(request)
        .then(res => {
          console.log(`Service worker network first ${url}`)
          return res
        })
        .catch(err => {
          console.log('Service worker network first error: ', err)
        })
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
