/* eslint-disable no-restricted-globals */

self.addEventListener('install', () =>
  console.log('Service worker has been installed')
)

self.addEventListener('activate', () =>
  console.log('Service worker has been activated')
)
