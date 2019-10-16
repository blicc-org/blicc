export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(reg => console.log('Service worker registered: ', reg))
      .catch(e => console.log('Service worker failed to register: ', e))
  } else {
    console.log('Browser does not support service worker!')
  }
}
