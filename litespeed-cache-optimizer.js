/**
 * LITESPEED CACHE OPTIMIZER
 * Implementa otimizações baseadas no plugin LiteSpeed Cache
 * Versão 1.0 - Performance máxima
 */

class LiteSpeedCacheOptimizer {
    constructor() {
        this.cacheVersion = '1.0.0';
        this.cacheKey = 'litespeed_cache_v1';
        this.init();
    }

    init() {
        console.log('🚀 LiteSpeed Cache Optimizer iniciado');
        
        // Aplicar otimizações imediatamente
        this.applyLiteSpeedOptimizations();
        this.setupCache();
        this.optimizeResources();
        this.setupLazyLoading();
    }

    /**
     * Aplicar otimizações do LiteSpeed Cache
     */
    applyLiteSpeedOptimizations() {
        console.log('⚡ Aplicando otimizações LiteSpeed Cache...');
        
        // 1. CSS CRÍTICO INLINE
        this.injectCriticalCSS();
        
        // 2. DEFER NON-CRITICAL CSS
        this.deferNonCriticalCSS();
        
        // 3. OPTIMIZE IMAGES
        this.optimizeImages();
        
        // 4. SETUP BROWSER CACHE
        this.setupBrowserCache();
        
        // 5. OPTIMIZE FONTS
        this.optimizeFonts();
        
        // 6. SETUP CDN HEADERS
        this.setupCDNHeaders();
        
        console.log('✅ Otimizações LiteSpeed Cache aplicadas');
    }

    /**
     * Injetar CSS crítico inline
     */
    injectCriticalCSS() {
        const criticalCSS = `
            /* LITESPEED CRITICAL CSS */
            * { box-sizing: border-box; }
            body { 
                margin: 0; 
                padding: 0; 
                font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                overflow-x: hidden;
            }
            
            /* CRITICAL ELEMENTS */
            .logo img { 
                width: 160px; 
                height: 40px; 
                object-fit: contain; 
                display: block; 
                max-width: 100%;
            }
            
            .header-content { 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                padding: 1rem 2rem; 
                max-width: 1200px; 
                margin: 0 auto; 
                position: relative; 
                z-index: 10; 
                background: #fff; 
                min-height: 70px;
            }
            
            .hero { 
                position: relative; 
                width: 100vw; 
                height: 140vh; 
                display: flex; 
                align-items: flex-start; 
                overflow: hidden; 
                margin-top: 0; 
                margin-bottom: -350px; 
                background: #000;
            }
            
            .hero-content { 
                position: relative; 
                z-index: 1; 
                width: 100%; 
                max-width: 1200px; 
                margin: 0 auto; 
                padding: 0 5%; 
                margin-top: 300px;
            }
            
            .hero-text { 
                color: #fff; 
                text-align: center; 
                margin-bottom: 2rem;
            }
            
            .hero-text h1 { 
                font-size: 3.5rem; 
                font-weight: 700; 
                margin-bottom: 1rem; 
                line-height: 1.2;
            }
            
            .hero-text p { 
                font-size: 1.2rem; 
                margin-bottom: 2rem; 
                opacity: 0.9;
            }
            
            /* MOBILE CRITICAL */
            @media (max-width: 768px) {
                .hero { 
                    height: 100vh; 
                    margin-bottom: 0; 
                    min-height: 600px; 
                    align-items: stretch;
                }
                
                .hero-content { 
                    margin-top: 120px; 
                    padding: 0 20px; 
                    z-index: 2;
                }
                
                .logo img { 
                    width: 120px; 
                    height: 30px;
                }
                
                .hero-text h1 { 
                    font-size: 32px; 
                    line-height: 1.2;
                }
                
                .hero-text p { 
                    font-size: 16px; 
                    line-height: 1.4;
                }
                
                .mobile-bg { 
                    position: absolute; 
                    top: 0; 
                    left: 0; 
                    width: 100vw; 
                    height: 100%; 
                    background-image: url('assets/images/mobile/bg-como-funciona.webp'); 
                    background-size: cover; 
                    background-position: center; 
                    background-repeat: no-repeat; 
                    z-index: 0; 
                    display: block;
                }
                
                .video-bg { 
                    display: none;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        style.setAttribute('data-optimizer', 'litespeed-critical');
        document.head.appendChild(style);
    }

    /**
     * Defer CSS não crítico
     */
    deferNonCriticalCSS() {
        // Remover CSS não crítico do carregamento inicial
        const nonCriticalCSS = document.querySelector('link[href*="styles.css"]');
        if (nonCriticalCSS) {
            nonCriticalCSS.setAttribute('media', 'print');
            nonCriticalCSS.setAttribute('onload', "this.media='all'");
        }
        
        // Carregar CSS não crítico de forma assíncrona
        setTimeout(() => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'styles.css?v=1.6.6';
            link.media = 'all';
            document.head.appendChild(link);
        }, 1000);
    }

    /**
     * Otimizar imagens
     */
    optimizeImages() {
        // Adicionar lazy loading para imagens não críticas
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            if (!img.classList.contains('critical-image')) {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
        });
        
        // Otimizar imagens críticas
        const criticalImages = document.querySelectorAll('.logo img, .hero-text img');
        criticalImages.forEach(img => {
            img.loading = 'eager';
            img.decoding = 'sync';
            img.fetchPriority = 'high';
        });
    }

    /**
     * Configurar cache do navegador
     */
    setupBrowserCache() {
        // Adicionar headers de cache via meta tags
        const cacheMeta = document.createElement('meta');
        cacheMeta.httpEquiv = 'Cache-Control';
        cacheMeta.content = 'public, max-age=31536000, immutable';
        document.head.appendChild(cacheMeta);
        
        // Configurar cache para recursos estáticos
        const staticResources = [
            'assets/images/',
            'assets/fonts/',
            'assets/icons/',
            'assets/video/'
        ];
        
        staticResources.forEach(path => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = path;
            document.head.appendChild(link);
        });
    }

    /**
     * Otimizar fontes
     */
    optimizeFonts() {
        // Preload fontes críticas
        const criticalFonts = [
            'assets/fonts/Montserrat-Regular.woff2',
            'assets/fonts/Montserrat-Medium.woff2'
        ];
        
        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.fetchPriority = 'high';
            document.head.appendChild(link);
        });
        
        // Configurar font-display: swap - Removido (não é um seletor válido)
        // const fontFaces = document.querySelectorAll('@font-face');
        // fontFaces.forEach(face => {
        //     face.style.fontDisplay = 'swap';
        // });
    }

    /**
     * Configurar headers CDN
     */
    setupCDNHeaders() {
        // Headers de segurança devem ser configurados no servidor
        // X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
        // só podem ser definidos via HTTP headers, não via meta tags
        
        // Apenas headers que podem ser simulados via meta tags
        const allowedHeaders = [
            { name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ];
        
        // Simular headers permitidos via meta tags
        allowedHeaders.forEach(header => {
            const meta = document.createElement('meta');
            meta.httpEquiv = header.name;
            meta.content = header.value;
            document.head.appendChild(meta);
        });
    }

    /**
     * Configurar cache
     */
    setupCache() {
        // Implementar cache local
        if ('caches' in window) {
            caches.open(this.cacheKey).then(cache => {
                // Cache recursos críticos
                const criticalResources = [
                    'assets/images/Renov-Logo.webp',
                    'assets/fonts/Montserrat-Regular.woff2',
                    'assets/fonts/Montserrat-Medium.woff2',
                    'assets/images/mobile/bg-como-funciona.webp'
                ];
                
                criticalResources.forEach(resource => {
                    cache.add(resource).catch(err => {
                        console.log('Cache error:', err);
                    });
                });
            });
        }
    }

    /**
     * Otimizar recursos
     */
    optimizeResources() {
        // Comprimir recursos
        this.compressResources();
        
        // Minificar CSS inline
        this.minifyInlineCSS();
        
        // Otimizar JavaScript
        this.optimizeJavaScript();
    }

    /**
     * Comprimir recursos
     */
    compressResources() {
        // Adicionar compressão gzip via meta tags
        const compressionMeta = document.createElement('meta');
        compressionMeta.httpEquiv = 'Accept-Encoding';
        compressionMeta.content = 'gzip, deflate, br';
        document.head.appendChild(compressionMeta);
    }

    /**
     * Minificar CSS inline
     */
    minifyInlineCSS() {
        const styles = document.querySelectorAll('style');
        styles.forEach(style => {
            // Remover comentários e espaços desnecessários
            let css = style.textContent;
            css = css.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments
            css = css.replace(/\s+/g, ' '); // Remove extra spaces
            css = css.replace(/;\s*}/g, '}'); // Remove trailing semicolons
            style.textContent = css;
        });
    }

    /**
     * Otimizar JavaScript
     */
    optimizeJavaScript() {
        // Defer scripts não críticos
        const nonCriticalScripts = document.querySelectorAll('script:not([src*="script.min.js"])');
        nonCriticalScripts.forEach(script => {
            if (!script.async && !script.defer) {
                script.defer = true;
            }
        });
    }

    /**
     * Configurar lazy loading
     */
    setupLazyLoading() {
        // Implementar Intersection Observer para lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            // Observar imagens com lazy loading
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Monitorar performance
     */
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitorar LCP
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log(`🚀 LiteSpeed LCP: ${entry.startTime.toFixed(2)}ms`);
                    }
                });
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Monitorar CLS
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'layout-shift') {
                        console.log(`📐 LiteSpeed CLS: ${entry.value.toFixed(3)}`);
                    }
                });
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }
}

// Inicializar LiteSpeed Cache Optimizer
new LiteSpeedCacheOptimizer(); 