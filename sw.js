const CACHE_NAME = 'renov-cache-v1.5';
const urlsToCache = [
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
  '/assets/icons/desigualdade-digital.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se disponível
        if (response) {
          return response;
        }
        
        // Se não estiver no cache, busca da rede
        return fetch(event.request).then(
          response => {
            // Verifica se a resposta é válida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

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

// Estratégia de cache para recursos estáticos
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image' || 
      event.request.destination === 'video' ||
      event.request.destination === 'font' ||
      event.request.url.includes('.css') ||
      event.request.url.includes('.js')) {
    
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
}); 