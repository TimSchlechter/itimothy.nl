var CACHE_NAME = 'itimothy';
var urlsToCache = [
  '/',
  '/assets/css/styles.css',
  '/assets/css/logos.css',
  '/assets/fontello/css/fontello.css',
  '/assets/font/raleway-regular.woff2',
  '/assets/fontello/font/fontello.eot?93285516 ',
  '/assets/fontello/font/fontello.svg?93285516 ',
  '/assets/fontello/font/fontello.ttf?93285516 ',
  '/assets/fontello/font/fontello.woff?93285516 ',
  '/assets/fontello/font/fontello.woff2?93285516 ',
  '/assets/img/bg.png',
  '/assets/img/favicons/favicon-16x16.png',
  '/assets/img/favicons/favicon-32x32.png',
  '/assets/img/favicons/favicon-96x96.png',
  '/assets/img/favicons/favicon-160x160.png',
  '/assets/img/favicons/favicon-192x192.png'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', function (event) {
  var cacheWhitelist = ['itimothy'];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
