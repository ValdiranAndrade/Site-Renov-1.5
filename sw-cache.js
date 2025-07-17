/**
 * Service Worker - Cache Eficiente para Recursos Estáticos
 * Baseado nas recomendações do Chrome Developers: https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl
 */

const CACHE_VERSION = 'v1.6.0';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const CRITICAL_CACHE = `critical-${CACHE_VERSION}`;

// Recursos estáticos para cache de longo prazo (1 ano)
const STATIC_RESOURCES = [
    // Imagens
    '/assets/images/Renov-Logo.webp',
    '/assets/images/bg-como-funciona.webp',
    '/assets/images/mobile/bg-como-funciona.webp',
    
    // Fontes
    '/assets/fonts/Montserrat-Regular.woff2',
    '/assets/fonts/Montserrat-Medium.woff2',
    
    // Ícones
    '/assets/icons/avaliacao-icon.webp',
    '/assets/icons/diagnostico-icon.webp',
    '/assets/icons/logistica-icon.webp',
    '/assets/icons/pagamento-icon.webp',
    
    // CSS e JS
    '/styles.css',
    '/script.js',
    '/layout-optimizer.js',
    '/cache-optimizer.js',
    '/performance-optimizer.js',
    '/mobile-performance-optimizer.js',
    
    // Vídeos
    '/assets/video/bg-video.mp4.mp4',
    '/assets/video/bg-IA.mp4 (1).mp4',
    
    // Manifest
    '/manifest.json'
];

// Recursos críticos para cache de curto prazo
const CRITICAL_RESOURCES = [
    '/index.html',
    '/Sustentabilidade.html',
    '/vagas.html',
    '/contato-parceiros.html'
];

// Recursos dinâmicos para cache de médio prazo
const DYNAMIC_RESOURCES = [
    '/api/',
    '/data/'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
    // Cache First para recursos estáticos
    STATIC_FIRST: 'static-first',
    // Network First para recursos críticos
    NETWORK_FIRST: 'network-first',
    // Stale While Revalidate para recursos dinâmicos
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

/**
 * Instalação do Service Worker
 */
self.addEventListener('install', (event) => {
    console.log('🚀 Service Worker instalando...');
    
    event.waitUntil(
        Promise.all([
            // Cache de recursos estáticos
            caches.open(STATIC_CACHE).then(cache => {
                console.log('📦 Cacheando recursos estáticos...');
                return cache.addAll(STATIC_RESOURCES);
            }),
            
            // Cache de recursos críticos
            caches.open(CRITICAL_CACHE).then(cache => {
                console.log('🔥 Cacheando recursos críticos...');
                return cache.addAll(CRITICAL_RESOURCES);
            })
        ]).then(() => {
            console.log('✅ Service Worker instalado com sucesso');
            // Ativar imediatamente
            return self.skipWaiting();
        }).catch(error => {
            console.error('❌ Erro na instalação do Service Worker:', error);
        })
    );
});

/**
 * Ativação do Service Worker
 */
self.addEventListener('activate', (event) => {
    console.log('🔄 Service Worker ativando...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Remover caches antigos
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== DYNAMIC_CACHE && 
                        cacheName !== CRITICAL_CACHE) {
                        console.log('🗑️ Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker ativado');
            // Tomar controle de todas as páginas
            return self.clients.claim();
        })
    );
});

/**
 * Interceptação de requisições
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorar requisições não-GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Ignorar requisições para APIs externas
    if (url.origin !== self.location.origin) {
        return;
    }
    
    // Determinar estratégia de cache baseada no tipo de recurso
    const strategy = getCacheStrategy(url.pathname);
    
    event.respondWith(
        handleRequest(request, strategy)
    );
});

/**
 * Determinar estratégia de cache baseada no tipo de recurso
 */
function getCacheStrategy(pathname) {
    // Recursos estáticos
    if (pathname.includes('/assets/') || 
        pathname.endsWith('.css') || 
        pathname.endsWith('.js') ||
        pathname.endsWith('.webp') ||
        pathname.endsWith('.woff2') ||
        pathname.endsWith('.mp4')) {
        return CACHE_STRATEGIES.STATIC_FIRST;
    }
    
    // Recursos críticos (HTML)
    if (pathname.endsWith('.html') || pathname === '/') {
        return CACHE_STRATEGIES.NETWORK_FIRST;
    }
    
    // Recursos dinâmicos
    if (pathname.includes('/api/') || pathname.includes('/data/')) {
        return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
    }
    
    // Padrão: Network First
    return CACHE_STRATEGIES.NETWORK_FIRST;
}

/**
 * Manipular requisição baseada na estratégia
 */
async function handleRequest(request, strategy) {
    try {
        switch (strategy) {
            case CACHE_STRATEGIES.STATIC_FIRST:
                return await cacheFirst(request, STATIC_CACHE);
            
            case CACHE_STRATEGIES.NETWORK_FIRST:
                return await networkFirst(request, CRITICAL_CACHE);
            
            case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
                return await staleWhileRevalidate(request, DYNAMIC_CACHE);
            
            default:
                return await networkFirst(request, DYNAMIC_CACHE);
        }
    } catch (error) {
        console.error('❌ Erro ao processar requisição:', error);
        return new Response('Erro interno', { status: 500 });
    }
}

/**
 * Estratégia Cache First
 * Para recursos estáticos que raramente mudam
 */
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        console.log('📦 Servindo do cache:', request.url);
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            console.log('💾 Cacheando novo recurso:', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Erro na rede:', error);
        return new Response('Recurso não encontrado', { status: 404 });
    }
}

/**
 * Estratégia Network First
 * Para recursos críticos que podem mudar
 */
async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
            console.log('💾 Cacheando recurso crítico:', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🌐 Rede indisponível, servindo do cache:', request.url);
        
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response('Recurso não disponível offline', { status: 503 });
    }
}

/**
 * Estratégia Stale While Revalidate
 * Para recursos dinâmicos
 */
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    // Retornar cache imediatamente se disponível
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            console.log('🔄 Atualizando cache:', request.url);
        }
        return networkResponse;
    }).catch(error => {
        console.error('❌ Erro ao atualizar cache:', error);
    });
    
    if (cachedResponse) {
        console.log('📦 Servindo cache desatualizado:', request.url);
        return cachedResponse;
    }
    
    return fetchPromise;
}

/**
 * Mensagens do Service Worker
 */
self.addEventListener('message', (event) => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'GET_CACHE_STATUS':
            getCacheStatus().then(status => {
                event.ports[0].postMessage(status);
            });
            break;
        
        case 'CLEAR_CACHE':
            clearCache().then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;
        
        case 'UPDATE_CACHE':
            updateCache().then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;
        
        default:
            console.log('📨 Mensagem desconhecida:', type);
    }
});

/**
 * Obter status do cache
 */
async function getCacheStatus() {
    const cacheNames = await caches.keys();
    const status = {};
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        status[cacheName] = {
            count: keys.length,
            size: await getCacheSize(cache)
        };
    }
    
    return status;
}

/**
 * Calcular tamanho do cache
 */
async function getCacheSize(cache) {
    const keys = await cache.keys();
    let totalSize = 0;
    
    for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
        }
    }
    
    return totalSize;
}

/**
 * Limpar cache
 */
async function clearCache() {
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
        console.log('🗑️ Cache removido:', cacheName);
    }
}

/**
 * Atualizar cache
 */
async function updateCache() {
    console.log('🔄 Atualizando cache...');
    
    // Recarregar recursos críticos
    const cache = await caches.open(CRITICAL_CACHE);
    
    for (const resource of CRITICAL_RESOURCES) {
        try {
            const response = await fetch(resource);
            if (response.ok) {
                await cache.put(resource, response);
                console.log('✅ Recurso atualizado:', resource);
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar:', resource, error);
        }
    }
}

/**
 * Background Sync (quando suportado)
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Background sync iniciado');
        event.waitUntil(updateCache());
    }
});

/**
 * Push notifications (quando suportado)
 */
self.addEventListener('push', (event) => {
    const options = {
        body: 'Renov - Atualizações disponíveis',
        icon: '/assets/images/Renov-Logo.webp',
        badge: '/assets/images/Renov-Logo.webp',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Renov', options)
    );
});

console.log('🚀 Service Worker carregado'); 