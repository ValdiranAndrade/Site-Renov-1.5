/**
 * FCP, Speed Index e LCP Optimizer
 * Sistema avançado de otimização para métricas críticas de performance
 */

class FCPSpeedLCPOptimizer {
    constructor() {
        this.metrics = {
            fcp: null,
            lcp: null,
            speedIndex: null
        };
        this.optimizations = {
            applied: new Set(),
            performance: {}
        };
        this.deviceInfo = this.detectDevice();
        this.connectionInfo = this.detectConnection();
    }

    /**
     * Detectar dispositivo e capacidade
     */
    detectDevice() {
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
        
        return {
            isMobile,
            isLowEnd,
            cores: navigator.hardwareConcurrency || 4,
            memory: navigator.deviceMemory || 8,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height
        };
    }

    /**
     * Detectar tipo de conexão
     */
    detectConnection() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        return {
            effectiveType: connection?.effectiveType || '4g',
            downlink: connection?.downlink || 10,
            rtt: connection?.rtt || 50,
            saveData: connection?.saveData || false
        };
    }

    /**
     * Inicializar otimizações
     */
    init() {
        console.log('🚀 Iniciando otimizações FCP, Speed Index e LCP...');
        
        // Aplicar otimizações imediatas
        this.applyImmediateOptimizations();
        
        // Configurar monitoramento
        this.setupMonitoring();
        
        // Aplicar otimizações baseadas no dispositivo
        this.applyDeviceSpecificOptimizations();
        
        // Otimizar recursos críticos
        this.optimizeCriticalResources();
        
        // Configurar lazy loading inteligente
        this.setupIntelligentLazyLoading();
        
        // Otimizar renderização
        this.optimizeRendering();
        
        console.log('✅ Otimizações FCP, Speed Index e LCP aplicadas');
    }

    /**
     * Aplicar otimizações imediatas
     */
    applyImmediateOptimizations() {
        // 1. Otimizar CSS crítico inline
        this.optimizeCriticalCSS();
        
        // 2. Otimizar carregamento de fontes
        this.optimizeFontLoading();
        
        // 3. Otimizar imagens críticas
        this.optimizeCriticalImages();
        
        // 4. Configurar resource hints
        this.setupResourceHints();
        
        // 5. Otimizar JavaScript crítico
        this.optimizeCriticalJavaScript();
    }

    /**
     * Otimizar CSS crítico inline
     */
    optimizeCriticalCSS() {
        const criticalCSS = `
        /* Ultra-critical CSS for FCP/LCP optimization */
        .logo img{width:160px;height:40px;object-fit:contain;display:block;max-width:100%;contain:layout style paint}
        .header-content{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;max-width:1200px;margin:0 auto;position:relative;z-index:10;contain:layout}
        .hero{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;height:140vh;display:flex;align-items:flex-start;overflow:hidden;margin-top:0!important;margin-bottom:-350px;background:#000;contain:layout style paint}
        .hero-content{position:relative;z-index:1;width:100%;max-width:1200px;margin:0 auto;padding:0 5%;margin-top:300px;contain:layout}
        .hero-text h1{font-size:48px;line-height:1.05;margin-bottom:24px;color:#fff;font-weight:700;text-align:left;text-shadow:2px 2px 4px rgba(0,0,0,0.8);contain:layout style paint}
        .hero-text p{color:#fff;font-size:18px;line-height:1.5;margin:0;text-shadow:1px 1px 2px rgba(0,0,0,0.7);contain:layout style paint}
        .video-bg-wrapper{position:absolute;top:0;left:0;width:100vw;height:100%;z-index:0;overflow:hidden;pointer-events:none;transform:translateY(-300px);display:block!important;contain:layout style paint}
        .video-bg{position:absolute;top:0;left:50%;width:100vw;height:100%;min-width:100vw;min-height:100%;object-fit:cover;transform:translateX(-50%);opacity:1!important;visibility:visible!important;contain:layout style paint}
        
        /* Social icons optimization */
        .social-links{display:flex!important;gap:16px!important;margin-top:-5px!important;margin-left:10px!important;contain:layout}
        .social-links a{color:#000!important;font-size:1.5rem!important;transition:color 0.2s!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        .social-links i{display:inline-block!important;visibility:visible!important;opacity:1!important;font-style:normal!important;contain:layout style paint}
        .fab{font-family:"Font Awesome 6 Brands"!important;font-weight:400!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        .fas{font-family:"Font Awesome 6 Free"!important;font-weight:900!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        
        /* Mobile optimizations */
        @media (max-width:768px){
            .hero{height:100vh;margin-bottom:0;min-height:600px;contain:layout style paint}
            .hero-content{margin-top:120px;padding:0 20px;z-index:2;contain:layout}
            .hero-text h1{font-size:32px;line-height:1.1;contain:layout style paint}
            .hero-text p{font-size:16px;line-height:1.5;contain:layout style paint}
            .header-content{padding:0.5rem 1rem;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);contain:layout}
            .logo img{width:120px;height:30px;contain:layout style paint}
        }
        @media (max-width:480px){
            .hero-text h1{font-size:28px;line-height:1.2;contain:layout style paint}
            .hero-text p{font-size:14px;line-height:1.4;contain:layout style paint}
            .logo img{width:100px;height:25px;contain:layout style paint}
        }
        
        /* Hardware acceleration for animations */
        .hero-text h1,.hero-text p,.logo img{will-change:transform;transform:translateZ(0)}
        
        /* Prevent layout shifts */
        .logo{min-width:160px;min-height:40px}
        .hero-text{min-height:200px}
        .social-links{min-width:120px;min-height:24px}
        `;

        // Inserir CSS crítico no head
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        style.setAttribute('data-critical', 'true');
        document.head.insertBefore(style, document.head.firstChild);
        
        this.optimizations.applied.add('critical-css');
    }

    /**
     * Otimizar carregamento de fontes
     */
    optimizeFontLoading() {
        // Preload fontes críticas
        const fontPreloads = [
            {
                href: 'assets/fonts/Montserrat-Regular.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: true
            },
            {
                href: 'assets/fonts/Montserrat-Medium.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: true
            }
        ];

        fontPreloads.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font.href;
            link.as = font.as;
            link.type = font.type;
            link.crossOrigin = font.crossorigin;
            link.setAttribute('data-critical', 'true');
            document.head.appendChild(link);
        });

        // Configurar font-display: swap
        const fontFaceCSS = `
        @font-face {
            font-family: 'Montserrat';
            src: url('assets/fonts/Montserrat-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }
        @font-face {
            font-family: 'Montserrat';
            src: url('assets/fonts/Montserrat-Medium.woff2') format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
        }
        `;

        const fontStyle = document.createElement('style');
        fontStyle.textContent = fontFaceCSS;
        document.head.appendChild(fontStyle);
        
        this.optimizations.applied.add('font-optimization');
    }

    /**
     * Otimizar imagens críticas
     */
    optimizeCriticalImages() {
        // Otimizar logo (elemento LCP mais provável)
        const logo = document.querySelector('.logo img');
        if (logo) {
            logo.setAttribute('fetchpriority', 'high');
            logo.setAttribute('decoding', 'sync');
            logo.setAttribute('loading', 'eager');
            logo.setAttribute('data-critical', 'true');
        }

        // Otimizar vídeo de fundo
        const video = document.querySelector('.video-bg');
        if (video) {
            video.setAttribute('preload', 'metadata');
            video.setAttribute('data-critical', 'true');
        }

        // Configurar imagens responsivas
        const images = document.querySelectorAll('img[src*=".webp"]');
        images.forEach(img => {
            if (!img.hasAttribute('data-critical')) {
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
            }
        });
        
        this.optimizations.applied.add('image-optimization');
    }

    /**
     * Configurar resource hints
     */
    setupResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://formspree.io' }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            document.head.appendChild(link);
        });
        
        this.optimizations.applied.add('resource-hints');
    }

    /**
     * Otimizar JavaScript crítico
     */
    optimizeCriticalJavaScript() {
        // Defer scripts não críticos
        const scripts = document.querySelectorAll('script[src]:not([data-critical])');
        scripts.forEach(script => {
            if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
                script.setAttribute('defer', 'true');
            }
        });
        
        this.optimizations.applied.add('js-optimization');
    }

    /**
     * Aplicar otimizações específicas do dispositivo
     */
    applyDeviceSpecificOptimizations() {
        if (this.deviceInfo.isMobile) {
            this.applyMobileOptimizations();
        }
        
        if (this.deviceInfo.isLowEnd) {
            this.applyLowEndOptimizations();
        }
        
        if (this.connectionInfo.effectiveType === 'slow-2g' || this.connectionInfo.effectiveType === '2g') {
            this.applySlowConnectionOptimizations();
        }
    }

    /**
     * Otimizações para mobile
     */
    applyMobileOptimizations() {
        // Reduzir animações em mobile
        const mobileCSS = `
        @media (max-width: 768px) {
            * { animation-duration: 0.1s !important; transition-duration: 0.1s !important; }
            .hero { contain: layout style paint; }
            .video-bg { object-fit: cover; }
        }
        `;
        
        const style = document.createElement('style');
        style.textContent = mobileCSS;
        document.head.appendChild(style);
        
        this.optimizations.applied.add('mobile-optimization');
    }

    /**
     * Otimizações para dispositivos de baixo desempenho
     */
    applyLowEndOptimizations() {
        // Desabilitar animações complexas
        const lowEndCSS = `
        * { animation: none !important; transition: none !important; }
        .hero { contain: layout style paint; }
        `;
        
        const style = document.createElement('style');
        style.textContent = lowEndCSS;
        document.head.appendChild(style);
        
        this.optimizations.applied.add('low-end-optimization');
    }

    /**
     * Otimizações para conexões lentas
     */
    applySlowConnectionOptimizations() {
        // Carregar apenas recursos essenciais
        const nonCriticalElements = document.querySelectorAll('[data-non-critical]');
        nonCriticalElements.forEach(el => {
            el.style.display = 'none';
        });
        
        this.optimizations.applied.add('slow-connection-optimization');
    }

    /**
     * Otimizar recursos críticos
     */
    optimizeCriticalResources() {
        // Priorizar recursos críticos
        const criticalResources = document.querySelectorAll('[data-critical]');
        criticalResources.forEach(resource => {
            if (resource.tagName === 'LINK') {
                resource.setAttribute('fetchpriority', 'high');
            }
        });
        
        this.optimizations.applied.add('critical-resources');
    }

    /**
     * Configurar lazy loading inteligente
     */
    setupIntelligentLazyLoading() {
        // Usar Intersection Observer para lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        this.optimizations.applied.add('intelligent-lazy-loading');
    }

    /**
     * Otimizar renderização
     */
    optimizeRendering() {
        // Usar requestIdleCallback para tarefas não críticas
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.loadNonCriticalResources();
            });
        } else {
            setTimeout(() => {
                this.loadNonCriticalResources();
            }, 1000);
        }
        
        this.optimizations.applied.add('rendering-optimization');
    }

    /**
     * Carregar recursos não críticos
     */
    loadNonCriticalResources() {
        // Carregar CSS não crítico
        const nonCriticalCSS = document.querySelector('link[href*="styles.css"]');
        if (nonCriticalCSS) {
            nonCriticalCSS.rel = 'stylesheet';
        }
        
        this.optimizations.applied.add('non-critical-resources');
    }

    /**
     * Configurar monitoramento
     */
    setupMonitoring() {
        // Monitorar FCP
        if ('PerformanceObserver' in window) {
            const fcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.fcp = entry.startTime;
                        console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`);
                    }
                });
            });
            fcpObserver.observe({ entryTypes: ['paint'] });

            // Monitorar LCP
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.metrics.lcp = entry.startTime;
                        console.log(`📏 LCP: ${entry.startTime.toFixed(2)}ms`);
                    }
                });
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        }

        // Monitorar Speed Index (aproximação)
        this.monitorSpeedIndex();
        
        this.optimizations.applied.add('monitoring');
    }

    /**
     * Monitorar Speed Index
     */
    monitorSpeedIndex() {
        let lastPaintTime = 0;
        let paintCount = 0;
        
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.name === 'first-contentful-paint' || entry.name === 'first-paint') {
                    paintCount++;
                    lastPaintTime = entry.startTime;
                }
            });
            
            // Calcular Speed Index aproximado
            if (paintCount >= 2) {
                this.metrics.speedIndex = lastPaintTime;
                console.log(`⚡ Speed Index aproximado: ${lastPaintTime.toFixed(2)}ms`);
            }
        });
        
        observer.observe({ entryTypes: ['paint'] });
    }

    /**
     * Obter estatísticas de otimização
     */
    getOptimizationStats() {
        return {
            metrics: this.metrics,
            optimizations: Array.from(this.optimizations.applied),
            device: this.deviceInfo,
            connection: this.connectionInfo,
            performance: this.optimizations.performance
        };
    }
}

// Inicializar otimizador quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const optimizer = new FCPSpeedLCPOptimizer();
        optimizer.init();
        window.fcpSpeedLCPOptimizer = optimizer;
    });
} else {
    const optimizer = new FCPSpeedLCPOptimizer();
    optimizer.init();
    window.fcpSpeedLCPOptimizer = optimizer;
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FCPSpeedLCPOptimizer;
} 