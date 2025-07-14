const CACHE_VERSION = '1.5.1';
const CACHE_NAME = `renov-cache-v${CACHE_VERSION}`;

// Recursos estáticos imutáveis - Cache de 1 ano
// Conforme documentação oficial: "Armazene em cache os recursos estáticos imutáveis por um longo período"
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/assets/images/Renov-Logo.png',
  '/assets/video/bg-video.mp4.mp4',
  '/assets/video/bg-IA.mp4 (1).mp4',
  '/assets/images/missao.png',
  '/assets/images/visao.png',
  '/assets/images/valores.png',
  '/assets/images/ismael-kolling.png',
  '/assets/images/matheus-mundstock.png',
  '/assets/icons/ia-icon.png',
  '/assets/icons/app-icon.png',
  '/assets/icons/api-icon.png',
  '/assets/icons/logistics-icon.png',
  '/assets/icons/results-icon.png',
  '/assets/icons/esg-icon.png',
  '/assets/icons/sustentabilidade.png',
  '/assets/icons/economia-circular-icon.png',
  '/assets/icons/responsabilidade-ambiental.png',
  '/assets/icons/desigualdade-digital.png'
];

// Recursos externos com cache de longo prazo
const EXTERNAL_CACHE_URLS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
];

// Instalação do Service Worker - Cache de recursos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`Cache v${CACHE_VERSION} aberto - Recursos estáticos`);
        
        // Cache de recursos estáticos imutáveis
        const staticCachePromise = cache.addAll(STATIC_CACHE_URLS);
        
        // Cache de recursos externos
        const externalCachePromise = cache.addAll(EXTERNAL_CACHE_URLS);
        
        return Promise.all([staticCachePromise, externalCachePromise]);
      })
      .catch(error => {
        console.error('Erro ao instalar cache:', error);
      })
  );
});

// Estratégia de cache baseada na documentação oficial do Chrome
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Remove parâmetros de versão para cache lookup
  const cacheKey = url.origin + url.pathname;
  
  // Estratégia Cache-First para recursos estáticos imutáveis
  if (isStaticResource(request)) {
    event.respondWith(
      caches.match(cacheKey)
        .then(response => {
          if (response) {
            console.log('Serving static resource from cache:', cacheKey);
            return response;
          }
          
          // Se não estiver no cache, busca da rede e armazena
          return fetch(request)
            .then(response => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(cacheKey, responseToCache);
                    console.log('Cached new static resource:', cacheKey);
                  });
              }
              return response;
            });
        })
    );
  }
  
  // Estratégia Network-First para HTML (permitir atualizações rápidas)
  else if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request.url, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request.url);
        })
    );
  }
  
  // Estratégia Stale-While-Revalidate para outros recursos
  else {
    event.respondWith(
      caches.match(cacheKey)
        .then(cachedResponse => {
          const fetchPromise = fetch(request)
            .then(response => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(cacheKey, responseToCache);
                  });
              }
              return response;
            });
          
          return cachedResponse || fetchPromise;
        })
    );
  }
});

// Função para identificar recursos estáticos imutáveis
function isStaticResource(request) {
  const url = new URL(request.url);
  const staticExtensions = [
    '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', 
    '.webp', '.woff', '.woff2', '.ttf', '.otf', '.mp4', '.webm', '.ogg'
  ];
  
  return staticExtensions.some(ext => url.pathname.includes(ext)) ||
         request.destination === 'image' ||
         request.destination === 'video' ||
         request.destination === 'font' ||
         url.hostname === 'cdnjs.cloudflare.com' ||
         url.hostname === 'fonts.googleapis.com';
}

// Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Mensagem para atualização de cache
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 