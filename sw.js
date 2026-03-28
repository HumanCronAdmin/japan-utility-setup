const CACHE_NAME = 'jp-utility-v1';
const ASSETS = [
  '/japan-utility-setup/',
  '/japan-utility-setup/index.html',
  '/japan-utility-setup/css/style.css',
  '/japan-utility-setup/js/main.js',
  '/japan-utility-setup/images/favicon.svg',
  '/japan-utility-setup/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
