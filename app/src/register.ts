export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(() => console.log('Service worker registered.'))
      .catch((e) => console.log('Service worker failed to register: ', e))
  } else {
    console.log('Browser does not support service worker!')
  }
}
