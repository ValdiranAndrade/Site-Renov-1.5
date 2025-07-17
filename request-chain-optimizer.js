/**
 * Request Chain Optimizer - Sistema Avançado de Otimização de Cadeias de Solicitação
 * Evita encadear solicitações críticas reduzindo tamanho das cadeias e otimizando downloads
 */

class RequestChainOptimizer {
    constructor() {
        this.criticalResources = new Map();
        this.nonCriticalResources = new Map();
        this.resourceQueue = [];
        this.isProcessing = false;
        this.connectionSpeed = 'fast'; // fast, slow, 2g, 3g, 4g
        this.deviceType = 'desktop'; // desktop, mobile, tablet
        
        this.init();
    }

    init() {
        // Detectar tipo de dispositivo e velocidade de conexão
        this.detectDeviceAndConnection();
        
        // Configurar estratégias de otimização
        this.setupOptimizationStrategies();
        
        // Inicializar otimizações
        this.initializeOptimizations();
        
        // Configurar monitoramento
        this.setupMonitoring();
    }

    /**
     * Detectar dispositivo e velocidade de conexão
     */
    detectDeviceAndConnection() {
        // Detectar tipo de dispositivo
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.deviceType = 'mobile';
        } else if (/iPad|Android.*Tablet/i.test(navigator.userAgent)) {
            this.deviceType = 'tablet';
        } else {
            this.deviceType = 'desktop';
        }

        // Detectar velocidade de conexão
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.connectionSpeed = connection.effectiveType || 'fast';
            
            // Escutar mudanças na conexão
            connection.addEventListener('change', () => {
                this.connectionSpeed = connection.effectiveType || 'fast';
                this.adaptToConnectionChange();
            });
        }
    }

    /**
     * Configurar estratégias de otimização baseadas no dispositivo e conexão
     */
    setupOptimizationStrategies() {
        this.strategies = {
            desktop: {
                fast: {
                    criticalChainLimit: 3,
                    preloadStrategy: 'aggressive',
                    deferStrategy: 'moderate',
                    compressionLevel: 'high'
                },
                slow: {
                    criticalChainLimit: 2,
                    preloadStrategy: 'conservative',
                    deferStrategy: 'aggressive',
                    compressionLevel: 'maximum'
                }
            },
            mobile: {
                fast: {
                    criticalChainLimit: 2,
                    preloadStrategy: 'conservative',
                    deferStrategy: 'aggressive',
                    compressionLevel: 'maximum'
                },
                slow: {
                    criticalChainLimit: 1,
                    preloadStrategy: 'minimal',
                    deferStrategy: 'maximum',
                    compressionLevel: 'maximum'
                }
            },
            tablet: {
                fast: {
                    criticalChainLimit: 2,
                    preloadStrategy: 'moderate',
                    deferStrategy: 'aggressive',
                    compressionLevel: 'high'
                },
                slow: {
                    criticalChainLimit: 1,
                    preloadStrategy: 'conservative',
                    deferStrategy: 'maximum',
                    compressionLevel: 'maximum'
                }
            }
        };
    }

    /**
     * Inicializar otimizações
     */
    initializeOptimizations() {
        // Otimizar recursos críticos
        this.optimizeCriticalResources();
        
        // Configurar carregamento assíncrono de recursos não críticos
        this.setupAsyncLoading();
        
        // Otimizar cadeias de solicitação
        this.optimizeRequestChains();
        
        // Configurar resource hints
        this.setupResourceHints();
    }

    /**
     * Otimizar recursos críticos
     */
    optimizeCriticalResources() {
        const strategy = this.getCurrentStrategy();
        
        // Definir recursos críticos baseados na estratégia
        this.criticalResources.set('logo', {
            url: 'assets/images/Renov-Logo.webp',
            type: 'image',
            priority: 'high',
            preload: strategy.preloadStrategy !== 'minimal'
        });

        this.criticalResources.set('critical-css', {
            url: 'styles.css',
            type: 'css',
            priority: 'high',
            preload: true,
            inline: true // Inline CSS crítico
        });

        this.criticalResources.set('primary-font', {
            url: 'assets/fonts/Montserrat-Regular.woff2',
            type: 'font',
            priority: 'high',
            preload: strategy.preloadStrategy !== 'minimal'
        });

        // Aplicar otimizações
        this.applyCriticalOptimizations();
    }

    /**
     * Aplicar otimizações críticas
     */
    applyCriticalOptimizations() {
        const strategy = this.getCurrentStrategy();
        
        // Inline CSS crítico
        this.inlineCriticalCSS();
        
        // Otimizar preloads
        this.optimizePreloads();
        
        // Configurar carregamento de fontes
        this.optimizeFontLoading();
        
        // Otimizar imagens críticas
        this.optimizeCriticalImages();
    }

    /**
     * Inline CSS crítico
     */
    inlineCriticalCSS() {
        const criticalCSS = `
        /* Critical CSS - Above the fold only */
        .logo img{width:160px;height:40px;object-fit:contain;display:block;max-width:100%}
        .header-content{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;max-width:1200px;margin:0 auto;position:relative;z-index:10}
        .hero{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;height:140vh;display:flex;align-items:flex-start;overflow:hidden;margin-top:0!important;margin-bottom:-350px;background:#000}
        .hero-content{position:relative;z-index:1;width:100%;max-width:1200px;margin:0 auto;padding:0 5%;margin-top:300px}
        .hero-text h1{font-size:48px;line-height:1.05;margin-bottom:24px;color:#fff;font-weight:700;text-align:left;text-shadow:2px 2px 4px rgba(0,0,0,0.8)}
        .hero-text p{color:#fff;font-size:18px;line-height:1.5;margin:0;text-shadow:1px 1px 2px rgba(0,0,0,0.7)}
        @media (max-width:768px){.hero{height:100vh;margin-bottom:0;min-height:600px}.hero-content{margin-top:120px;padding:0 20px;z-index:2}.hero-text h1{font-size:32px;line-height:1.1}.hero-text p{font-size:16px;line-height:1.5}.header-content{padding:0.5rem 1rem;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px)}.logo img{width:120px;height:30px}}
        `;

        // Inserir CSS crítico inline
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    /**
     * Otimizar preloads baseado na estratégia
     */
    optimizePreloads() {
        const strategy = this.getCurrentStrategy();
        
        // Remover preloads desnecessários
        const existingPreloads = document.querySelectorAll('link[rel="preload"]');
        existingPreloads.forEach(preload => {
            if (strategy.preloadStrategy === 'minimal' && !preload.hasAttribute('data-critical')) {
                preload.remove();
            }
        });

        // Adicionar preloads críticos apenas
        if (strategy.preloadStrategy !== 'minimal') {
            this.addCriticalPreloads();
        }
    }

    /**
     * Adicionar preloads críticos
     */
    addCriticalPreloads() {
        const criticalPreloads = [
            {
                href: 'assets/images/Renov-Logo.webp',
                as: 'image',
                type: 'image/webp',
                fetchpriority: 'high'
            }
        ];

        criticalPreloads.forEach(preload => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = preload.href;
            link.as = preload.as;
            link.type = preload.type;
            link.setAttribute('fetchpriority', preload.fetchpriority);
            link.setAttribute('data-critical', 'true');
            document.head.appendChild(link);
        });
    }

    /**
     * Otimizar carregamento de fontes
     */
    optimizeFontLoading() {
        const strategy = this.getCurrentStrategy();
        
        // Configurar carregamento de fontes baseado na estratégia
        if (strategy.preloadStrategy !== 'minimal') {
            this.preloadCriticalFonts();
        }
        
        // Configurar font-display otimizado
        this.setupOptimizedFontDisplay();
    }

    /**
     * Preload de fontes críticas
     */
    preloadCriticalFonts() {
        const criticalFonts = [
            {
                href: 'assets/fonts/Montserrat-Regular.woff2',
                type: 'font/woff2',
                crossorigin: 'anonymous'
            }
        ];

        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font.href;
            link.as = 'font';
            link.type = font.type;
            link.crossOrigin = font.crossorigin;
            link.setAttribute('data-critical', 'true');
            document.head.appendChild(link);
        });
    }

    /**
     * Configurar font-display otimizado
     */
    setupOptimizedFontDisplay() {
        // Adicionar CSS para font-display otimizado
        const fontDisplayCSS = `
        @font-face {
            font-family: 'Montserrat';
            src: url('assets/fonts/Montserrat-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
            font-synthesis: none;
        }
        `;

        const style = document.createElement('style');
        style.textContent = fontDisplayCSS;
        document.head.appendChild(style);
    }

    /**
     * Otimizar imagens críticas
     */
    optimizeCriticalImages() {
        // Configurar imagens críticas com loading otimizado
        const criticalImages = document.querySelectorAll('img[data-critical]');
        criticalImages.forEach(img => {
            img.loading = 'eager';
            img.fetchpriority = 'high';
            img.decoding = 'sync';
        });
    }

    /**
     * Configurar carregamento assíncrono de recursos não críticos
     */
    setupAsyncLoading() {
        const strategy = this.getCurrentStrategy();
        
        // Definir recursos não críticos
        this.nonCriticalResources.set('non-critical-css', {
            url: 'styles.css',
            type: 'css',
            priority: 'low',
            defer: true
        });

        this.nonCriticalResources.set('scripts', {
            url: 'script.js',
            type: 'script',
            priority: 'low',
            defer: true
        });

        this.nonCriticalResources.set('font-awesome', {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
            type: 'css',
            priority: 'low',
            defer: true
        });

        // Aplicar estratégia de defer
        this.applyDeferStrategy();
    }

    /**
     * Aplicar estratégia de defer
     */
    applyDeferStrategy() {
        const strategy = this.getCurrentStrategy();
        
        // Defer CSS não crítico
        if (strategy.deferStrategy === 'aggressive' || strategy.deferStrategy === 'maximum') {
            this.deferNonCriticalCSS();
        }
        
        // Defer scripts
        this.deferScripts();
        
        // Defer recursos externos
        this.deferExternalResources();
    }

    /**
     * Defer CSS não crítico
     */
    deferNonCriticalCSS() {
        const nonCriticalCSS = document.querySelector('link[href*="styles.css"]');
        if (nonCriticalCSS) {
            nonCriticalCSS.rel = 'preload';
            nonCriticalCSS.as = 'style';
            nonCriticalCSS.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
        }
    }

    /**
     * Defer scripts
     */
    deferScripts() {
        const scripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
        scripts.forEach(script => {
            script.defer = true;
        });
    }

    /**
     * Defer recursos externos
     */
    deferExternalResources() {
        // Font Awesome não deve ser deferido para garantir que os ícones apareçam imediatamente
        const fontAwesome = document.querySelector('link[href*="font-awesome"]');
        if (fontAwesome) {
            // Garantir que o Font Awesome seja carregado imediatamente
            fontAwesome.media = 'all';
            fontAwesome.removeAttribute('onload');
        }
    }

    /**
     * Otimizar cadeias de solicitação
     */
    optimizeRequestChains() {
        const strategy = this.getCurrentStrategy();
        
        // Reduzir número de solicitações críticas
        this.reduceCriticalRequests();
        
        // Consolidar recursos
        this.consolidateResources();
        
        // Otimizar ordem de carregamento
        this.optimizeLoadingOrder();
    }

    /**
     * Reduzir número de solicitações críticas
     */
    reduceCriticalRequests() {
        const strategy = this.getCurrentStrategy();
        const maxCriticalRequests = strategy.criticalChainLimit;
        
        // Limitar preloads críticos
        const criticalPreloads = document.querySelectorAll('link[rel="preload"][data-critical]');
        if (criticalPreloads.length > maxCriticalRequests) {
            // Manter apenas os mais críticos
            Array.from(criticalPreloads)
                .slice(maxCriticalRequests)
                .forEach(preload => preload.remove());
        }
    }

    /**
     * Consolidar recursos
     */
    consolidateResources() {
        // Consolidar CSS
        this.consolidateCSS();
        
        // Consolidar JavaScript
        this.consolidateJavaScript();
        
        // Otimizar imagens
        this.optimizeImages();
    }

    /**
     * Consolidar CSS
     */
    consolidateCSS() {
        // Verificar se há múltiplos arquivos CSS
        const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
        if (cssFiles.length > 1) {
            console.log('Multiple CSS files detected. Consider consolidating.');
        }
    }

    /**
     * Consolidar JavaScript
     */
    consolidateJavaScript() {
        // Verificar se há múltiplos arquivos JS
        const jsFiles = document.querySelectorAll('script[src]');
        if (jsFiles.length > 3) {
            console.log('Multiple JS files detected. Consider consolidating.');
        }
    }

    /**
     * Otimizar imagens
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Configurar loading lazy para imagens não críticas
            if (!img.hasAttribute('data-critical')) {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
            
            // Adicionar srcset para responsividade
            if (!img.srcset && img.src.includes('.webp')) {
                this.addResponsiveSrcset(img);
            }
        });
    }

    /**
     * Adicionar srcset responsivo
     */
    addResponsiveSrcset(img) {
        const baseSrc = img.src;
        const baseName = baseSrc.replace('.webp', '');
        
        img.srcset = `
            ${baseName}-mobile.webp 480w,
            ${baseName}-tablet.webp 768w,
            ${baseSrc} 1200w
        `;
        img.sizes = '(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px';
    }

    /**
     * Otimizar ordem de carregamento
     */
    optimizeLoadingOrder() {
        // Mover recursos críticos para o topo
        this.moveCriticalResourcesToTop();
        
        // Configurar prioridades
        this.setResourcePriorities();
    }

    /**
     * Mover recursos críticos para o topo
     */
    moveCriticalResourcesToTop() {
        const criticalResources = document.querySelectorAll('[data-critical]');
        criticalResources.forEach(resource => {
            if (resource.parentNode === document.head) {
                document.head.insertBefore(resource, document.head.firstChild);
            }
        });
    }

    /**
     * Configurar prioridades de recursos
     */
    setResourcePriorities() {
        // Configurar fetchpriority para recursos críticos
        const criticalResources = document.querySelectorAll('[data-critical]');
        criticalResources.forEach(resource => {
            if (resource.tagName === 'LINK') {
                resource.setAttribute('fetchpriority', 'high');
            }
        });
    }

    /**
     * Configurar resource hints
     */
    setupResourceHints() {
        // DNS prefetch para domínios externos
        this.addDNSPrefetch();
        
        // Preconnect para recursos críticos
        this.addPreconnect();
        
        // Prefetch para recursos futuros
        this.addPrefetch();
    }

    /**
     * Adicionar DNS prefetch
     */
    addDNSPrefetch() {
        const domains = [
            'cdnjs.cloudflare.com',
            'fonts.googleapis.com',
            'fonts.gstatic.com'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            document.head.appendChild(link);
        });
    }

    /**
     * Adicionar preconnect
     */
    addPreconnect() {
        const criticalDomains = [
            'cdnjs.cloudflare.com'
        ];

        criticalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = `https://${domain}`;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    /**
     * Adicionar prefetch
     */
    addPrefetch() {
        const strategy = this.getCurrentStrategy();
        
        if (strategy.preloadStrategy === 'aggressive') {
            const prefetchResources = [
                'assets/fonts/Montserrat-Medium.woff2',
                'assets/images/bg-como-funciona.webp'
            ];

            prefetchResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = resource;
                document.head.appendChild(link);
            });
        }
    }

    /**
     * Adaptar a mudanças na conexão
     */
    adaptToConnectionChange() {
        console.log(`Connection changed to: ${this.connectionSpeed}`);
        
        // Reaplicar estratégias baseadas na nova conexão
        this.setupOptimizationStrategies();
        this.optimizeCriticalResources();
        this.setupAsyncLoading();
    }

    /**
     * Obter estratégia atual
     */
    getCurrentStrategy() {
        return this.strategies[this.deviceType][this.connectionSpeed] || 
               this.strategies[this.deviceType]['fast'];
    }

    /**
     * Configurar monitoramento
     */
    setupMonitoring() {
        // Monitorar performance de carregamento
        this.monitorLoadingPerformance();
        
        // Monitorar cadeias de solicitação
        this.monitorRequestChains();
        
        // Monitorar recursos críticos
        this.monitorCriticalResources();
    }

    /**
     * Monitorar performance de carregamento
     */
    monitorLoadingPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        this.analyzeLoadingPerformance(entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['navigation'] });
        }
    }

    /**
     * Analisar performance de carregamento
     */
    analyzeLoadingPerformance(navigationEntry) {
        const metrics = {
            domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
            loadComplete: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
            firstPaint: navigationEntry.firstPaint,
            firstContentfulPaint: navigationEntry.firstContentfulPaint
        };

        console.log('Loading Performance Metrics:', metrics);
        
        // Otimizar baseado nas métricas
        this.optimizeBasedOnMetrics(metrics);
    }

    /**
     * Otimizar baseado nas métricas
     */
    optimizeBasedOnMetrics(metrics) {
        if (metrics.domContentLoaded > 1000) {
            console.warn('DOM Content Loaded is slow. Consider reducing critical resources.');
        }
        
        if (metrics.loadComplete > 3000) {
            console.warn('Page load is slow. Consider deferring more resources.');
        }
    }

    /**
     * Monitorar cadeias de solicitação
     */
    monitorRequestChains() {
        // Monitorar número de solicitações críticas
        const criticalRequests = document.querySelectorAll('[data-critical]').length;
        console.log(`Critical requests: ${criticalRequests}`);
        
        if (criticalRequests > this.getCurrentStrategy().criticalChainLimit) {
            console.warn('Too many critical requests. Consider reducing.');
        }
    }

    /**
     * Monitorar recursos críticos
     */
    monitorCriticalResources() {
        // Verificar se recursos críticos carregaram
        this.criticalResources.forEach((resource, key) => {
            if (resource.preload) {
                this.checkResourceLoad(key, resource);
            }
        });
    }

    /**
     * Verificar carregamento de recurso
     */
    checkResourceLoad(key, resource) {
        const element = document.querySelector(`[href*="${resource.url}"]`);
        if (element) {
            element.addEventListener('load', () => {
                console.log(`Critical resource loaded: ${key}`);
            });
            
            element.addEventListener('error', () => {
                console.error(`Critical resource failed to load: ${key}`);
            });
        }
    }

    /**
     * API pública para otimizações manuais
     */
    optimizeResource(url, options = {}) {
        const resource = {
            url,
            type: options.type || 'script',
            priority: options.priority || 'low',
            defer: options.defer || false,
            preload: options.preload || false
        };

        if (resource.preload) {
            this.preloadResource(resource);
        } else if (resource.defer) {
            this.deferResource(resource);
        }
    }

    /**
     * Preload de recurso
     */
    preloadResource(resource) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.url;
        link.as = resource.type;
        
        if (resource.type === 'script') {
            link.as = 'script';
        } else if (resource.type === 'style') {
            link.as = 'style';
        }
        
        document.head.appendChild(link);
    }

    /**
     * Defer de recurso
     */
    deferResource(resource) {
        if (resource.type === 'script') {
            const script = document.createElement('script');
            script.src = resource.url;
            script.defer = true;
            document.body.appendChild(script);
        } else if (resource.type === 'style') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = resource.url;
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
            document.head.appendChild(link);
        }
    }

    /**
     * Obter estatísticas de otimização
     */
    getOptimizationStats() {
        const criticalRequests = document.querySelectorAll('[data-critical]').length;
        const totalRequests = document.querySelectorAll('link[rel="preload"], link[rel="stylesheet"], script[src]').length;
        
        return {
            deviceType: this.deviceType,
            connectionSpeed: this.connectionSpeed,
            criticalRequests,
            totalRequests,
            optimizationLevel: this.getCurrentStrategy().criticalChainLimit,
            preloadStrategy: this.getCurrentStrategy().preloadStrategy,
            deferStrategy: this.getCurrentStrategy().deferStrategy
        };
    }
}

// Inicializar otimizador quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.requestChainOptimizer = new RequestChainOptimizer();
    });
} else {
    window.requestChainOptimizer = new RequestChainOptimizer();
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RequestChainOptimizer;
} 