// Pit Happens' service worker, served next to the page on GitHub Pages (copied there with index.html).
// The game is one page: it is kept on the phone and opened from there at once, with or without a network.
// Each opening also asks the website for the page quietly; when it has changed, the new one is kept, and the
// game (which asks once it has started: 'check') is told 'update', so it can offer "new version: tap to update".
// The online server (Render) is another address and never goes through here.
const CACHE = 'pit-happens-v1';
const PAGE = './';
const FILES = [PAGE, 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
/** The check for a newer page started by the last opening, and whether it found one the open game lacks. */
let refreshing = Promise.resolve(), newer = false;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/** Asks the website for the page; if it differs from the kept one, keeps it (the next opening uses it). */
async function refreshPage() {
  try {
    const fresh = await fetch(PAGE, { cache: 'no-cache' });
    if (!fresh.ok) return;
    const cache = await caches.open(CACHE), old = await cache.match(PAGE);
    const [a, b] = await Promise.all([fresh.clone().text(), old ? old.text() : Promise.resolve('')]);
    if (a === b) return;
    await cache.put(PAGE, fresh);
    if (old) newer = true;
  } catch { /* offline: the kept page goes on */ }
}

self.addEventListener('message', e => { // the game has started and asks whether a newer version is kept
  if (!e.data || e.data.t !== 'check') return;
  e.waitUntil(refreshing.then(() => { if (newer && e.source) e.source.postMessage({ t: 'update' }); }));
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return; // the server's API and sockets: straight to the network
  if (req.mode === 'navigate') { // the page (any address in the game's folder, an invite's ?sala= too): the kept one at once
    e.respondWith((async () => {
      const kept = await caches.match(PAGE);
      newer = false; // what it opens now is the newest kept
      refreshing = refreshPage();
      e.waitUntil(refreshing);
      return kept || fetch(req);
    })());
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req))); // icons and the app file
});
