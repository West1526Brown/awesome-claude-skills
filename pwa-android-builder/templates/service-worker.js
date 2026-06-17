// service-worker.js
// Offline-first service worker for an installable Android PWA.
//
// Strategy:
//   - Static assets (CSS/JS/images/fonts): cache-first.
//   - Navigations (HTML pages): network-first, fall back to cache, then offline.html.
//
// IMPORTANT: bump CACHE_NAME on every deploy so clients pick up new assets.

const CACHE_NAME = "app-cache-v1";

// Files cached during install so the app shell works offline immediately.
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/offline.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  // Add your core CSS/JS bundles here, e.g. "/styles.css", "/app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  // Activate the new worker as soon as it finishes installing.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests.
  if (request.method !== "GET") return;

  // Navigations → network-first with offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match("/offline.html");
        })
    );
    return;
  }

  // Static assets → cache-first, then network (and cache the result).
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
