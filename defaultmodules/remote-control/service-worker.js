const CACHE_NAME = "logandey-remote-v5";
const urlsToCache = [
  "./remote.html",
  "./css/main.css",
  "./css/roboto.css",
  "./css/font-awesome.css",
  "./socket.io/socket.io.js",
  "./js/socketclient.js",
  "./defaultmodules/remote-control/remote/remote.css",
  "./defaultmodules/remote-control/manifest.json",
  "./defaultmodules/remote-control/img/lo-gandey-icon.png",
  "./defaultmodules/remote-control/img/icon-192.png",
  "./defaultmodules/remote-control/img/icon-512.png",
  "./defaultmodules/remote-control/remote/remote.mjs",
  "./defaultmodules/remote-control/remote/remote-menu-routing.mjs",
  "./defaultmodules/remote-control/remote/remote-menu-ui.mjs",
  "./defaultmodules/remote-control/remote/remote-menu.mjs",
  "./defaultmodules/remote-control/remote/remote-utils.mjs",
  "./defaultmodules/remote-control/remote/remote-socket.mjs",
  "./defaultmodules/remote-control/remote/remote-modules.mjs",
  "./defaultmodules/remote-control/remote/remote-config.mjs",
  "./defaultmodules/remote-control/remote/remote-render.mjs",
  "./node_modules/marked/lib/marked.esm.js"
];

// Install service worker and skip waiting
addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(urlsToCache.map(async (url) => {
      try {
        await cache.add(url);
      } catch (error) {
        console.warn(`Cache: skipping ${url}:`, error);
      }
    }));
    globalThis.skipWaiting();
  })());
});

// Prefer network for HTML/JS so updates land quickly; cache as fallback
addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  const isAppShell = url.pathname.endsWith(".html") || url.pathname.endsWith(".mjs") || url.pathname.endsWith(".js");

  event.respondWith((async () => {
    if (isAppShell) {
      try {
        const response = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());
        return response;
      } catch {
        return caches.match(event.request);
      }
    }

    const cached = await caches.match(event.request);
    if (cached) {
      return cached;
    }
    return fetch(event.request);
  })());
});

// Update service worker
addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    }));
    return globalThis.clients.claim();
  })());
});
