// Store cache version and url
const cacheVersion = 'v1.00';
const cacheFiles = [
    '/',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
        .open(cacheVersion)
        .then((cach) => cache.addAll(cacheFiles))
    )
});

self.addEventListener('active', (e) => {
    e.waitUntil(
        caches
        .keys()
        .then((all) => {
            return Promise.all(all.map((cacheName) => {
                if (cacheName !== cacheVersion) {
                    return caches.delete(cacheName);
                }
            }))
        })
    )
});

// Fetch all requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches
        .match(e.request)
        .then((response) => {
            if (response) {
                return response;
            }
            return fetch(e.request);
        })
    )
});