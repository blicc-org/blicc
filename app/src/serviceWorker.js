/* eslint-disable no-restricted-globals */

export function register() {
  if ('serviceWorker' in navigator) {
    console.log('browser supports service worker')
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
    navigator.serviceWorker
      .register(swUrl)
      .then(reg => console.log('service worker registered', reg))
      .catch(e => console.log('service worker failed to register: ', e))
  }
}

self.addEventListener('install', () =>
  console.log('Service worker is installed')
)
self.addEventListener('activate', () =>
  console.log('Service worker is activated')
)
