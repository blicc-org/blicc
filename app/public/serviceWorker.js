self.addEventListener('install', () => {
  console.log('Service worker has been installed.')
})

self.addEventListener('activate', () =>
  console.log('Service worker has been activated.')
)

self.addEventListener('fetch', () => {
  console.log('fetch was falled')
})
