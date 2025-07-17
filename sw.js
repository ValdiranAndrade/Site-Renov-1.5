const CACHE_VERSION = '1.6.0';
const CACHE_NAME = `renov-cache-v${CACHE_VERSION}`;

// Detectar se é dispositivo mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Ultra-optimized mobile config for LCP - Minimal critical path
const MOBILE_CONFIG = {
  // Reduced cache for faster LCP
  maxCacheSize: isMobile ? 20 * 1024 * 1024 : 100 * 1024 * 1024, // 20MB vs 100MB
  cacheStrategy: isMobile ? 'cache-first' : 'stale-while-revalidate',
  
  // Ultra-critical resources - Minimal chain
  criticalResources: [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/assets/images/Renov-Logo.webp'
  ],
  
  // LCP ultra-optimization
  lcpOptimization: {
    criticalElements: ['.hero-text h1', '.logo img'],
    deferNonCritical: true,
    fontDisplay: 'swap',
    // Ultra-mobile optimizations
    reduceAnimations: true,
    optimizeImages: true,
    minimizeRequests: true
  }
};

// Ultra-optimized cache strategies for LCP - Minimal critical path
const CACHE_STRATEGIES = {
  // Ultra-critical resources - Minimal chain
  CRITICAL: {
    name: 'critical',
    urls: [
      '/',
      '/index.html',
      '/styles.css',
      '/script.js',
      '/assets/images/Renov-Logo.webp'
    ],
    strategy: 'cache-first',
    maxAge: 31536000 // 1 ano
  },
  
  // Static resources - Ultra-optimized for mobile
  STATIC: {
    name: 'static',
    urls: [
      '/assets/video/bg-video.mp4.mp4',
      '/assets/video/bg-IA.mp4 (1).mp4',
      '/assets/images/missao.webp',
      '/assets/images/visao.webp',
      '/assets/images/valores.webp',
      '/assets/images/ismael-kolling.webp',
      '/assets/images/matheus-mundstock.webp',
      '/assets/icons/ia-icon.webp',
      '/assets/icons/app-icon.webp',
      '/assets/icons/api-icon.webp',
      '/assets/icons/logistics-icon.webp',
      '/assets/icons/results-icon.webp',
      '/assets/icons/esg-icon.webp'
    ],
    strategy: 'cache-first',
    maxAge: isMobile ? 302400 : 2592000 // 3.5 dias mobile vs 30 dias desktop
  },
  
  // External resources - Ultra-deferred
  EXTERNAL: {
    name: 'external',
    urls: [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    ],
    strategy: 'stale-while-revalidate',
    maxAge: isMobile ? 21600 : 86400 // 6h mobile vs 24h desktop
  },
  
  // Dynamic resources - Ultra-fast
  DYNAMIC: {
    name: 'dynamic',
    urls: [],
    strategy: 'network-first',
    maxAge: isMobile ? 900 : 3600 // 15min mobile vs 1h desktop
  }
};

// Cache de metadados para controle de versão
const CACHE_METADATA = {
  version: CACHE_VERSION,
  timestamp: Date.now(),
  strategies: CACHE_STRATEGIES
};

// Instalação do Service Worker com cache otimizado - Reduz cadeias de solicitações
self.addEventListener('install', event => {
  event.waitUntil(
    // Cache crítico primeiro - instalação imediata
    caches.open(`${CACHE_NAME}-critical`)
      .then(cache => {
        console.log('Instalando cache crítico...');
        return cache.addAll(CACHE_STRATEGIES.CRITICAL.urls);
      })
      .then(() => {
        // Ativação imediata para melhor performance
        return self.skipWaiting();
      })
      .then(() => {
        // Cache estático e externo em background - não bloqueia
        return Promise.allSettled([
          caches.open(`${CACHE_NAME}-static`)
            .then(cache => cache.addAll(CACHE_STRATEGIES.STATIC.urls)),
          caches.open(`${CACHE_NAME}-external`)
            .then(cache => cache.addAll(CACHE_STRATEGIES.EXTERNAL.urls))
        ]);
      })
      .then(() => {
        console.log(`Service Worker v${CACHE_VERSION} instalado com sucesso`);
      })
      .catch(error => {
        console.error('Erro na instalação do cache:', error);
      })
  );
});

// Estratégia de fetch otimizada com cache inteligente
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Remove parâmetros de versão para cache lookup
  const cacheKey = url.origin + url.pathname;
  
  // Determina a estratégia baseada no tipo de recurso
  const strategy = getCacheStrategy(request);
  
  event.respondWith(handleRequest(request, cacheKey, strategy));
});

// Função para determinar a estratégia de cache
function getCacheStrategy(request) {
  const url = new URL(request.url);
  
  // Recursos críticos
  if (CACHE_STRATEGIES.CRITICAL.urls.includes(url.pathname) || 
      url.pathname === '/' || 
      url.pathname === '/index.html') {
    return CACHE_STRATEGIES.CRITICAL;
  }
  
  // Recursos estáticos
  if (CACHE_STRATEGIES.STATIC.urls.includes(url.pathname) ||
      isStaticResource(request)) {
    return CACHE_STRATEGIES.STATIC;
  }
  
  // Recursos externos
  if (url.hostname === 'cdnjs.cloudflare.com' || 
      url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com') {
    return CACHE_STRATEGIES.EXTERNAL;
  }
  
  // HTML e outros recursos dinâmicos
  if (request.destination === 'document' || 
      request.destination === 'script' ||
      url.pathname.endsWith('.html')) {
    return CACHE_STRATEGIES.DYNAMIC;
  }
  
  // Padrão: cache de curto prazo
  return CACHE_STRATEGIES.DYNAMIC;
}

// Função para identificar recursos estáticos
function isStaticResource(request) {
  const url = new URL(request.url);
  const staticExtensions = [
    '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', 
    '.webp', '.woff', '.woff2', '.ttf', '.otf', '.mp4', '.webm', '.ogg'
  ];
  
  return staticExtensions.some(ext => url.pathname.includes(ext)) ||
         request.destination === 'image' ||
         request.destination === 'video' ||
         request.destination === 'font';
}

// Função principal para lidar com requisições
async function handleRequest(request, cacheKey, strategy) {
  const cacheName = `${CACHE_NAME}-${strategy.name}`;
  
  try {
    switch (strategy.strategy) {
      case 'cache-first':
        return await cacheFirstStrategy(request, cacheKey, cacheName, strategy.maxAge);
      
      case 'network-first':
        return await networkFirstStrategy(request, cacheKey, cacheName, strategy.maxAge);
      
      case 'stale-while-revalidate':
        return await staleWhileRevalidateStrategy(request, cacheKey, cacheName, strategy.maxAge);
      
      default:
        return await networkFirstStrategy(request, cacheKey, cacheName, strategy.maxAge);
    }
  } catch (error) {
    console.error('Erro no handleRequest:', error);
    // Fallback para cache ou resposta de erro
    const cachedResponse = await caches.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Erro de rede', { status: 503 });
  }
}

// Estratégia Cache-First para recursos estáticos
async function cacheFirstStrategy(request, cacheKey, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(cacheKey);
  
  if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
    console.log('Serving from cache (cache-first):', cacheKey);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const responseToCache = networkResponse.clone();
      await cache.put(cacheKey, addCacheHeaders(responseToCache, maxAge));
      console.log('Updated cache (cache-first):', cacheKey);
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, using cached response:', cacheKey);
    return cachedResponse || new Response('Erro de rede', { status: 503 });
  }
}

// Estratégia Network-First para recursos dinâmicos
async function networkFirstStrategy(request, cacheKey, cacheName, maxAge) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      const responseToCache = networkResponse.clone();
      await cache.put(cacheKey, addCacheHeaders(responseToCache, maxAge));
      console.log('Updated cache (network-first):', cacheKey);
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', cacheKey);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(cacheKey);
    return cachedResponse || new Response('Erro de rede', { status: 503 });
  }
}

// Estratégia Stale-While-Revalidate para recursos externos
async function staleWhileRevalidateStrategy(request, cacheKey, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(cacheKey);
  
  // Retorna cache imediatamente se disponível e não expirado
  if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
    console.log('Serving from cache (stale-while-revalidate):', cacheKey);
    
    // Atualiza cache em background
    fetch(request).then(async networkResponse => {
      if (networkResponse && networkResponse.status === 200) {
        const responseToCache = networkResponse.clone();
        await cache.put(cacheKey, addCacheHeaders(responseToCache, maxAge));
        console.log('Background cache update:', cacheKey);
      }
    }).catch(error => {
      console.log('Background update failed:', cacheKey, error);
    });
    
    return cachedResponse;
  }
  
  // Se não há cache, busca da rede
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const responseToCache = networkResponse.clone();
      await cache.put(cacheKey, addCacheHeaders(responseToCache, maxAge));
      console.log('Updated cache (stale-while-revalidate):', cacheKey);
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, using expired cache:', cacheKey);
    return cachedResponse || new Response('Erro de rede', { status: 503 });
  }
}

// Função para verificar se o cache expirou
function isExpired(response, maxAge) {
  const cacheTime = response.headers.get('x-cache-time');
  if (!cacheTime) return false;
  
  const age = Date.now() - parseInt(cacheTime);
  return age > maxAge * 1000;
}

// Função para adicionar headers de cache
function addCacheHeaders(response, maxAge) {
  const headers = new Headers(response.headers);
  headers.set('x-cache-time', Date.now().toString());
  headers.set('x-cache-max-age', maxAge.toString());
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

// Ativação e limpeza inteligente de caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Limpa caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheName.startsWith(CACHE_NAME)) {
              console.log('Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Ativação imediata
      self.clients.claim()
    ]).then(() => {
      console.log(`Service Worker v${CACHE_VERSION} ativado`);
    })
  );
});

// Mensagens para controle de cache
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
    });
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    caches.keys().then(cacheNames => {
      const cacheInfo = {
        version: CACHE_VERSION,
        timestamp: Date.now(),
        caches: cacheNames
      };
      event.ports[0].postMessage({ type: 'CACHE_INFO', data: cacheInfo });
    });
  }
}); 