self.addEventListener('push', function(event) {
    event.waitUntil(
      self.registration.showNotification(event.data.user, {
        body: event.data.message,
        icon: event.data.image
      })
    );
  });