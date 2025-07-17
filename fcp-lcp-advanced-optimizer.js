/**
 * FCP & LCP Advanced Optimizer
 * Sistema de otimização avançada para First Contentful Paint e Largest Contentful Paint
 */

class FCPLCPAdvancedOptimizer {
    constructor() {
        this.metrics = {
            fcp: null,
            lcp: null,
            fcpTarget: 1000, // 1s target
            lcpTarget: 1500  // 1.5s target
        };
        this.optimizations = new Set();
        this.deviceInfo = this.detectDevice();
        this.connectionInfo = this.detectConnection();
        this.criticalElements = new Set();
    }

    /**
     * Detectar dispositivo
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
     * Detectar conexão
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
     * Inicializar otimizações avançadas
     */
    init() {
        console.log('🚀 Iniciando otimizações avançadas FCP & LCP...');
        
        // Aplicar otimizações críticas imediatas
        this.applyCriticalOptimizations();
        
        // Configurar monitoramento avançado
        this.setupAdvancedMonitoring();
        
        // Otimizar elementos críticos
        this.optimizeCriticalElements();
        
        // Configurar resource hints avançados
        this.setupAdvancedResourceHints();
        
        // Otimizar carregamento de fontes
        this.optimizeFontLoading();
        
        // Configurar preload estratégico
        this.setupStrategicPreload();
        
        // Otimizar renderização
        this.optimizeRendering();
        
        console.log('✅ Otimizações avançadas FCP & LCP aplicadas');
    }

    /**
     * Aplicar otimizações críticas
     */
    applyCriticalOptimizations() {
        // 1. CSS crítico ultra-otimizado
        this.applyUltraCriticalCSS();
        
        // 2. Otimizar elementos LCP
        this.optimizeLPCElements();
        
        // 3. Configurar font-display: swap
        this.setupFontDisplaySwap();
        
        // 4. Otimizar imagens críticas
        this.optimizeCriticalImages();
        
        // 5. Configurar fetchpriority
        this.setupFetchPriority();
        
        this.optimizations.add('critical-optimizations');
    }

    /**
     * Aplicar CSS crítico ultra-otimizado
     */
    applyUltraCriticalCSS() {
        const ultraCriticalCSS = `
        /* Ultra-critical CSS for FCP/LCP - Minimal and optimized */
        .logo img{width:160px;height:40px;object-fit:contain;display:block;max-width:100%;contain:layout style paint;will-change:transform;transform:translateZ(0)}
        .header-content{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;max-width:1200px;margin:0 auto;position:relative;z-index:10;contain:layout}
        .hero{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;height:140vh;display:flex;align-items:flex-start;overflow:hidden;margin-top:0!important;margin-bottom:-350px;background:#000;contain:layout style paint}
        .hero-content{position:relative;z-index:1;width:100%;max-width:1200px;margin:0 auto;padding:0 5%;margin-top:300px;contain:layout}
        .hero-text h1{font-size:48px;line-height:1.05;margin-bottom:24px;color:#fff;font-weight:700;text-align:left;text-shadow:2px 2px 4px rgba(0,0,0,0.8);contain:layout style paint;will-change:transform;transform:translateZ(0)}
        .hero-text p{color:#fff;font-size:18px;line-height:1.5;margin:0;text-shadow:1px 1px 2px rgba(0,0,0,0.7);contain:layout style paint;will-change:transform;transform:translateZ(0)}
        .video-bg-wrapper{position:absolute;top:0;left:0;width:100vw;height:100%;z-index:0;overflow:hidden;pointer-events:none;transform:translateY(-300px);display:block!important;contain:layout style paint}
        .video-bg{position:absolute;top:0;left:50%;width:100vw;height:100%;min-width:100vw;min-height:100%;object-fit:cover;transform:translateX(-50%);opacity:1!important;visibility:visible!important;contain:layout style paint}
        
        /* Social icons - optimized for FCP */
        .social-links{display:flex!important;gap:16px!important;margin-top:-5px!important;margin-left:10px!important;contain:layout}
        .social-links a{color:#000!important;font-size:1.5rem!important;transition:color 0.2s!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        .social-links i{display:inline-block!important;visibility:visible!important;opacity:1!important;font-style:normal!important;contain:layout style paint}
        .fab{font-family:"Font Awesome 6 Brands"!important;font-weight:400!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        .fas{font-family:"Font Awesome 6 Free"!important;font-weight:900!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        
        /* Prevent layout shifts - critical for LCP */
        .logo{min-width:160px;min-height:40px;contain:layout}
        .hero-text{min-height:200px;contain:layout}
        .social-links{min-width:120px;min-height:24px;contain:layout}
        
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
        
        /* Font loading optimization */
        @font-face{font-family:'Montserrat';src:url('assets/fonts/Montserrat-Regular.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
        @font-face{font-family:'Montserrat';src:url('assets/fonts/Montserrat-Medium.woff2') format('woff2');font-weight:500;font-style:normal;font-display:swap}
        
        /* Fallback fonts for immediate display */
        body{font-family:'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif}
        `;

        // Inserir CSS crítico no início do head
        const style = document.createElement('style');
        style.textContent = ultraCriticalCSS;
        style.setAttribute('data-critical', 'true');
        style.setAttribute('data-fcp-lcp-optimized', 'true');
        document.head.insertBefore(style, document.head.firstChild);
        
        this.optimizations.add('ultra-critical-css');
    }

    /**
     * Otimizar elementos LCP
     */
    optimizeLPCElements() {
        // Identificar e otimizar elementos LCP potenciais
        const lcpCandidates = [
            '.logo img',
            '.hero-text h1',
            '.hero-text p',
            '.video-bg'
        ];

        lcpCandidates.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.setAttribute('data-lcp-candidate', 'true');
                this.criticalElements.add(element);
                
                // Aplicar otimizações específicas
                if (element.tagName === 'IMG') {
                    element.setAttribute('fetchpriority', 'high');
                    element.setAttribute('decoding', 'sync');
                    element.setAttribute('loading', 'eager');
                }
            });
        });
        
        this.optimizations.add('lcp-elements');
    }

    /**
     * Configurar font-display: swap
     */
    setupFontDisplaySwap() {
        // Garantir que as fontes sejam carregadas com swap
        const fontLinks = document.querySelectorAll('link[href*="font"]');
        fontLinks.forEach(link => {
            if (link.href.includes('Montserrat')) {
                link.setAttribute('data-critical', 'true');
            }
        });
        
        this.optimizations.add('font-display-swap');
    }

    /**
     * Otimizar imagens críticas
     */
    optimizeCriticalImages() {
        const criticalImages = document.querySelectorAll('img[data-critical], .logo img, .hero img');
        
        criticalImages.forEach(img => {
            // Configurações para máxima prioridade
            img.setAttribute('fetchpriority', 'high');
            img.setAttribute('decoding', 'sync');
            img.setAttribute('loading', 'eager');
            img.setAttribute('data-critical', 'true');
            
            // Otimizar srcset se disponível
            if (img.srcset) {
                this.optimizeSrcset(img);
            }
        });
        
        this.optimizations.add('critical-images');
    }

    /**
     * Otimizar srcset
     */
    optimizeSrcset(img) {
        const srcset = img.srcset;
        if (srcset) {
            // Priorizar imagens menores para mobile
            if (this.deviceInfo.isMobile) {
                const mobileSrcset = srcset.replace(/ \d+w/g, '').split(',')[0];
                img.srcset = mobileSrcset;
            }
        }
    }

    /**
     * Configurar fetchpriority
     */
    setupFetchPriority() {
        // Configurar prioridade para recursos críticos
        const criticalResources = document.querySelectorAll('[data-critical]');
        criticalResources.forEach(resource => {
            if (resource.tagName === 'LINK') {
                resource.setAttribute('fetchpriority', 'high');
            }
        });
        
        this.optimizations.add('fetch-priority');
    }

    /**
     * Configurar monitoramento avançado
     */
    setupAdvancedMonitoring() {
        // Monitorar FCP
        if ('PerformanceObserver' in window) {
            const fcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.fcp = entry.startTime;
                        console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms (Target: ${this.metrics.fcpTarget}ms)`);
                        this.analyzeFCPPerformance(entry.startTime);
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
                        console.log(`📏 LCP: ${entry.startTime.toFixed(2)}ms (Target: ${this.metrics.lcpTarget}ms)`);
                        this.analyzeLCPPerformance(entry.startTime);
                    }
                });
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        }
        
        this.optimizations.add('advanced-monitoring');
    }

    /**
     * Analisar performance do FCP
     */
    analyzeFCPPerformance(fcpTime) {
        const performance = fcpTime <= this.metrics.fcpTarget ? 'excellent' : 
                           fcpTime <= 1800 ? 'good' : 'needs-improvement';
        
        console.log(`📊 FCP Performance: ${performance}`);
        
        if (performance === 'needs-improvement') {
            this.applyFCPOptimizations();
        }
    }

    /**
     * Analisar performance do LCP
     */
    analyzeLCPPerformance(lcpTime) {
        const performance = lcpTime <= this.metrics.lcpTarget ? 'excellent' : 
                           lcpTime <= 2500 ? 'good' : 'needs-improvement';
        
        console.log(`📊 LCP Performance: ${performance}`);
        
        if (performance === 'needs-improvement') {
            this.applyLCPOptimizations();
        }
    }

    /**
     * Aplicar otimizações adicionais para FCP
     */
    applyFCPOptimizations() {
        // Reduzir ainda mais o CSS crítico
        this.reduceCriticalCSS();
        
        // Otimizar carregamento de fontes
        this.optimizeFontLoading();
        
        // Configurar preloads estratégicos
        this.setupStrategicPreload();
        
        this.optimizations.add('fcp-optimizations');
    }

    /**
     * Aplicar otimizações adicionais para LCP
     */
    applyLCPOptimizations() {
        // Otimizar elementos LCP
        this.optimizeLPCElements();
        
        // Configurar resource hints
        this.setupAdvancedResourceHints();
        
        // Otimizar imagens críticas
        this.optimizeCriticalImages();
        
        this.optimizations.add('lcp-optimizations');
    }

    /**
     * Reduzir CSS crítico
     */
    reduceCriticalCSS() {
        // Remover estilos não essenciais do CSS crítico
        const criticalStyle = document.querySelector('style[data-fcp-lcp-optimized]');
        if (criticalStyle) {
            let css = criticalStyle.textContent;
            
            // Remover animações e transições
            css = css.replace(/animation[^;]+;/g, '');
            css = css.replace(/transition[^;]+;/g, '');
            
            // Remover estilos não críticos
            css = css.replace(/@media[^{]+{[^}]+}/g, '');
            
            criticalStyle.textContent = css;
        }
        
        this.optimizations.add('reduced-critical-css');
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
            link.setAttribute('fetchpriority', 'high');
            document.head.appendChild(link);
        });
        
        this.optimizations.add('font-optimization');
    }

    /**
     * Configurar preload estratégico
     */
    setupStrategicPreload() {
        // Preload apenas recursos essenciais
        const strategicPreloads = [
            {
                href: 'assets/images/Renov-Logo.webp?v=1.6.0',
                as: 'image',
                type: 'image/webp'
            }
        ];

        strategicPreloads.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            link.type = resource.type;
            link.setAttribute('fetchpriority', 'high');
            link.setAttribute('data-critical', 'true');
            document.head.appendChild(link);
        });
        
        this.optimizations.add('strategic-preload');
    }

    /**
     * Configurar resource hints avançados
     */
    setupAdvancedResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://formspree.io' },
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            document.head.appendChild(link);
        });
        
        this.optimizations.add('advanced-resource-hints');
    }

    /**
     * Otimizar renderização
     */
    optimizeRendering() {
        // Usar requestIdleCallback para tarefas não críticas
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.loadNonCriticalResources();
            }, { timeout: 2000 });
        } else {
            setTimeout(() => {
                this.loadNonCriticalResources();
            }, 1000);
        }
        
        this.optimizations.add('rendering-optimization');
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
        
        this.optimizations.add('non-critical-resources');
    }

    /**
     * Obter estatísticas de otimização
     */
    getOptimizationStats() {
        return {
            metrics: this.metrics,
            optimizations: Array.from(this.optimizations),
            device: this.deviceInfo,
            connection: this.connectionInfo,
            criticalElements: this.criticalElements.size,
            performance: {
                fcpStatus: this.metrics.fcp ? 
                    (this.metrics.fcp <= this.metrics.fcpTarget ? 'excellent' : 
                     this.metrics.fcp <= 1800 ? 'good' : 'needs-improvement') : 'pending',
                lcpStatus: this.metrics.lcp ? 
                    (this.metrics.lcp <= this.metrics.lcpTarget ? 'excellent' : 
                     this.metrics.lcp <= 2500 ? 'good' : 'needs-improvement') : 'pending'
            }
        };
    }
}

// Inicializar otimizador quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const optimizer = new FCPLCPAdvancedOptimizer();
        optimizer.init();
        window.fcpLCPAdvancedOptimizer = optimizer;
    });
} else {
    const optimizer = new FCPLCPAdvancedOptimizer();
    optimizer.init();
    window.fcpLCPAdvancedOptimizer = optimizer;
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FCPLCPAdvancedOptimizer;
} 