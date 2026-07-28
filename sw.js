const CACHE = 'ocd-checkin-v3';

// Resolved against the worker's own location, so the app works both at a
// domain root and from a project subpath such as /OCD-app/ on GitHub Pages.
const INDEX = new URL('index.html', self.location).toString();
const ASSETS = [
  'index.html',
  'manifest.json',
  'icons/icon-180.png',
  'icons/icon-167.png',
  'icons/icon-152.png',
  'icons/icon-120.png',
].map(p => new URL(p, self.location).toString());

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const isDoc = e.request.mode === 'navigate' || e.request.destination === 'document';
  if (isDoc) {
    // Network-first for the app itself, so updates land instead of being pinned
    // to whatever was cached on first install. Falls back to cache when offline.
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(INDEX, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(INDEX))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match(INDEX)))
  );
});
