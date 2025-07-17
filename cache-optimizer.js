/**
 * Cache Optimizer - Política de Cache Eficiente para Recursos Estáticos
 * Baseado nas recomendações do Chrome Developers: https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl
 */

class CacheOptimizer {
    constructor() {
        this.cacheConfig = {
            // Cache de longo prazo para recursos estáticos imutáveis (1 ano)
            staticAssets: {
                images: 'max-age=31536000, immutable',
                fonts: 'max-age=31536000, immutable',
                css: 'max-age=31536000, immutable',
                js: 'max-age=31536000, immutable',
                media: 'max-age=31536000, immutable'
            },
            // Cache de médio prazo para recursos que podem mudar
            dynamicAssets: {
                html: 'max-age=3600, must-revalidate',
                api: 'max-age=300, must-revalidate'
            },
            // Cache de curto prazo para recursos críticos
            criticalAssets: {
                critical: 'max-age=86400, must-revalidate'
            }
        };
        
        this.init();
    }

    init() {
        console.log('🚀 Iniciando otimização de cache...');
        
        // Configurar service worker para cache inteligente
        this.setupServiceWorker();
        
        // Otimizar carregamento de recursos
        this.optimizeResourceLoading();
        
        // Configurar cache headers via meta tags
        this.setupCacheHeaders();
        
        // Implementar versionamento de recursos
        this.implementResourceVersioning();
    }

    /**
     * Configurar Service Worker para cache inteligente
     */
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado:', registration);
                    this.setupCacheStrategies(registration);
                })
                .catch(error => {
                    console.error('❌ Erro ao registrar Service Worker:', error);
                });
        }
    }

    /**
     * Configurar estratégias de cache
     */
    setupCacheStrategies(registration) {
        // Cache First para recursos estáticos
        const staticCacheStrategy = {
            name: 'static-cache-v1',
            urls: [
                '/assets/images/',
                '/assets/fonts/',
                '/assets/icons/',
                '/styles.css',
                '/script.js',
                '/layout-optimizer.js'
            ]
        };

        // Network First para recursos críticos
        const criticalCacheStrategy = {
            name: 'critical-cache-v1',
            urls: [
                '/index.html',
                '/manifest.json'
            ]
        };

        // Stale While Revalidate para recursos dinâmicos
        const dynamicCacheStrategy = {
            name: 'dynamic-cache-v1',
            urls: [
                '/api/',
                '/data/'
            ]
        };

        console.log('📋 Estratégias de cache configuradas');
    }

    /**
     * Otimizar carregamento de recursos
     */
    optimizeResourceLoading() {
        // Preload de recursos críticos
        this.preloadCriticalResources();
        
        // Lazy loading de recursos não críticos
        this.setupLazyLoading();
        
        // Otimizar carregamento de imagens
        this.optimizeImageLoading();
        
        // Otimizar carregamento de fontes
        this.optimizeFontLoading();
    }

    /**
     * Preload de recursos críticos
     */
    preloadCriticalResources() {
        const criticalResources = [
            { href: '/assets/images/Renov-Logo.webp', as: 'image', type: 'image/webp' },
            { href: '/assets/fonts/Montserrat-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
            { href: '/styles.css', as: 'style' },
            { href: '/layout-optimizer.js', as: 'script' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            
            if (resource.type) {
                link.type = resource.type;
            }
            
            if (resource.crossorigin) {
                link.crossOrigin = 'anonymous';
            }
            
            document.head.appendChild(link);
        });

        console.log('📦 Recursos críticos preloadados');
    }

    /**
     * Configurar lazy loading
     */
    setupLazyLoading() {
        // Lazy loading de imagens
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));

        // Lazy loading de vídeos
        const videos = document.querySelectorAll('video[data-src]');
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.src = video.dataset.src;
                    videoObserver.unobserve(video);
                }
            });
        });

        videos.forEach(video => videoObserver.observe(video));

        console.log('🔄 Lazy loading configurado');
    }

    /**
     * Otimizar carregamento de imagens
     */
    optimizeImageLoading() {
        // Usar picture element para formatos modernos
        const images = document.querySelectorAll('img[data-srcset]');
        
        images.forEach(img => {
            const picture = document.createElement('picture');
            
            // WebP para navegadores que suportam
            const webpSource = document.createElement('source');
            webpSource.srcset = img.dataset.srcset.replace(/\.(jpg|png)/g, '.webp');
            webpSource.type = 'image/webp';
            picture.appendChild(webpSource);
            
            // Fallback para formatos tradicionais
            img.srcset = img.dataset.srcset;
            picture.appendChild(img);
            
            img.parentNode.insertBefore(picture, img);
            img.parentNode.removeChild(img);
        });

        console.log('🖼️ Carregamento de imagens otimizado');
    }

    /**
     * Otimizar carregamento de fontes
     */
    optimizeFontLoading() {
        // Font display swap para melhor performance
        const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
        
        fontLinks.forEach(link => {
            link.setAttribute('font-display', 'swap');
        });

        // Preload de fontes críticas
        const criticalFonts = [
            'Montserrat-Regular.woff2',
            'Montserrat-Medium.woff2'
        ];

        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = `/assets/fonts/${font}`;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });

        console.log('🔤 Carregamento de fontes otimizado');
    }

    /**
     * Configurar cache headers via meta tags
     */
    setupCacheHeaders() {
        // Adicionar meta tags para cache
        const cacheMeta = document.createElement('meta');
        cacheMeta.httpEquiv = 'Cache-Control';
        cacheMeta.content = 'public, max-age=31536000, immutable';
        document.head.appendChild(cacheMeta);

        // Adicionar meta tag para expiração
        const expiresMeta = document.createElement('meta');
        expiresMeta.httpEquiv = 'Expires';
        expiresMeta.content = 'Thu, 31 Dec 2025 23:59:59 GMT';
        document.head.appendChild(expiresMeta);

        console.log('📋 Cache headers configurados');
    }

    /**
     * Implementar versionamento de recursos
     */
    implementResourceVersioning() {
        const version = '1.6.0';
        const timestamp = Date.now();
        
        // Atualizar URLs de recursos com versionamento
        const resources = document.querySelectorAll('link[href], script[src], img[src]');
        
        resources.forEach(resource => {
            const url = resource.href || resource.src;
            if (url && !url.includes('http') && !url.includes('data:')) {
                const separator = url.includes('?') ? '&' : '?';
                const newUrl = `${url}${separator}v=${version}&t=${timestamp}`;
                
                if (resource.href) {
                    resource.href = newUrl;
                } else if (resource.src) {
                    resource.src = newUrl;
                }
            }
        });

        console.log('🔄 Versionamento de recursos implementado');
    }

    /**
     * Gerar relatório de cache
     */
    generateCacheReport() {
        const report = {
            timestamp: new Date().toISOString(),
            cacheConfig: this.cacheConfig,
            resources: {
                static: this.getStaticResources(),
                dynamic: this.getDynamicResources(),
                critical: this.getCriticalResources()
            },
            recommendations: [
                'Configurar Cache-Control headers no servidor',
                'Implementar Service Worker para cache offline',
                'Usar versionamento de recursos para cache busting',
                'Otimizar carregamento de imagens com formatos modernos',
                'Implementar lazy loading para recursos não críticos'
            ]
        };

        return report;
    }

    /**
     * Obter recursos estáticos
     */
    getStaticResources() {
        return [
            '/assets/images/',
            '/assets/fonts/',
            '/assets/icons/',
            '/styles.css',
            '/script.js',
            '/layout-optimizer.js'
        ];
    }

    /**
     * Obter recursos dinâmicos
     */
    getDynamicResources() {
        return [
            '/index.html',
            '/manifest.json'
        ];
    }

    /**
     * Obter recursos críticos
     */
    getCriticalResources() {
        return [
            '/assets/images/Renov-Logo.webp',
            '/assets/fonts/Montserrat-Regular.woff2',
            '/styles.css'
        ];
    }

    /**
     * Verificar status do cache
     */
    async checkCacheStatus() {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            const cacheStatus = {};
            
            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const keys = await cache.keys();
                cacheStatus[cacheName] = keys.length;
            }
            
            console.log('📊 Status do cache:', cacheStatus);
            return cacheStatus;
        }
        
        return null;
    }

    /**
     * Limpar cache antigo
     */
    async clearOldCache() {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            const currentVersion = 'v1';
            
            for (const cacheName of cacheNames) {
                if (!cacheName.includes(currentVersion)) {
                    await caches.delete(cacheName);
                    console.log(`🗑️ Cache antigo removido: ${cacheName}`);
                }
            }
        }
    }
}

// Inicializar otimizador de cache
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cacheOptimizer = new CacheOptimizer();
    });
} else {
    window.cacheOptimizer = new CacheOptimizer();
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CacheOptimizer;
} 