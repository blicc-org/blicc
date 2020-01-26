const cacheName = 'v1'
const limit = 500
const { scope } = registration

self.addEventListener('install', () => console.log('Service worker installed'))
self.addEventListener('activate', () => console.log('Service worker activated'))

self.addEventListener('fetch', evt => {
  const { request } = evt
  const { url } = request
  // if (url.indexOf('http') === 0 && url.includes('chunk')) {
  //   evt.respondWith(cacheFirst(request))
  // } else if (url.includes(scope)) {
  //   evt.respondWith(networkFirst(request))
  // }
})

async function cacheFirst(request) {
  return await caches.match(request).then(res => {
    return (
      res ||
      fetch(request)
        .then(res => setCache(cacheName, request, res))
        .catch(err => console.log('Service worker error: ', err))
    )
  })
}

async function networkFirst(request) {
  return await fetch(request)
    .then(res => setCache(cacheName, request, res))
    .catch(async () => {
      return await caches
        .match(request)
        .then(res => res)
        .catch(err => console.log('Service worker error: ', err))
    })
}

function setCache(name, request, res) {
  const resClone = res.clone()
  caches.open(name).then(cache => {
    cache.put(request, resClone)
    limitCacheSize(name, limit)
  })
  return res
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
