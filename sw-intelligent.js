// INTELLIGENT SERVICE WORKER - Network-aware caching
const CACHE_VERSION = 'v1.6.7';
const CACHE_NAME = `renov-cache-${CACHE_VERSION}`;

// Cache strategies based on connection speed
const CACHE_STRATEGIES = {
  fast: {
    images: 'cache-first',
    videos: 'stale-while-revalidate',
    fonts: 'cache-first',
    scripts: 'stale-while-revalidate',
    css: 'cache-first'
  },
  medium: {
    images: 'cache-first',
    videos: 'network-first',
    fonts: 'cache-first',
    scripts: 'network-first',
    css: 'cache-first'
  },
  slow: {
    images: 'cache-first',
    videos: 'network-only',
    fonts: 'cache-first',
    scripts: 'network-only',
    css: 'cache-first'
  }
};

// Get connection speed
function getConnectionSpeed() {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'slow';
    } else if (connection.effectiveType === '3g') {
      return 'medium';
    } else {
      return 'fast';
    }
  }
  return 'fast';
}

// Cache strategies
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Network error', { status: 503 });
  }
}

async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Network error', { status: 503 });
  }
}

async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

async function networkOnlyStrategy(request) {
  try {
    return await fetch(request);
  } catch (error) {
    return new Response('Network error', { status: 503 });
  }
}

// Handle requests
async function handleRequest(request) {
  const url = new URL(request.url);
  const connectionSpeed = getConnectionSpeed();
  const strategies = CACHE_STRATEGIES[connectionSpeed];
  
  // Determine resource type
  let resourceType = 'scripts';
  if (url.pathname.includes('.css')) resourceType = 'css';
  else if (url.pathname.includes('.woff2') || url.pathname.includes('.woff')) resourceType = 'fonts';
  else if (url.pathname.includes('.webp') || url.pathname.includes('.png') || url.pathname.includes('.jpg')) resourceType = 'images';
  else if (url.pathname.includes('.mp4') || url.pathname.includes('.webm') || url.pathname.includes('.gif')) resourceType = 'videos';
  
  const strategy = strategies[resourceType];
  
  switch (strategy) {
    case 'cache-first':
      return cacheFirstStrategy(request, CACHE_NAME);
    case 'network-first':
      return networkFirstStrategy(request, CACHE_NAME);
    case 'stale-while-revalidate':
      return staleWhileRevalidateStrategy(request, CACHE_NAME);
    case 'network-only':
      return networkOnlyStrategy(request);
    default:
      return fetch(request);
  }
}

// Install event
self.addEventListener('install', event => {
  console.log('🔄 Installing Intelligent Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache critical resources
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/images/Renov-Logo.webp',
        // Fontes Montserrat removidas - migração para Google Fonts
        '/assets/images/bg-como-funciona.webp'
      ]);
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(handleRequest(event.request));
});

// Activate event
self.addEventListener('activate', event => {
  console.log('✅ Intelligent Service Worker activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Message handling
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 