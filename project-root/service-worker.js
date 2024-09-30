const CACHE_NAME = 'peds-er-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/medications.js',
  '/main.js',
  '/scripts.js',
  '/data.js', // Add data.js to the cache list
  '/manifest.json',
  // Add any other static assets like images or fonts here
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error caching files:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; 
        }

        return fetch(event.request)
          .then(networkResponse => {
            if (networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
          .catch(error => {
            console.error('Error fetching resource:', error);
            return new Response("<h1>You are offline!</h1>", {
              headers: { 'Content-Type': 'text/html' }
            });
          });
      })
  );
});