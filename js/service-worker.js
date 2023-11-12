self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function (event) {
  showNotification(event.data);
});

function showNotification(message) {
  self.registration.showNotification('New Message', {
    body: message,
    icon: '/path/to/notification-icon.png'
  });
}
