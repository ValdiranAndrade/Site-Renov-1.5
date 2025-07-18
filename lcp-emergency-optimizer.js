/**
 * LCP Emergency Optimizer
 * Sistema de otimização de emergência para resolver LCP crítico (8,1s)
 */

class LCPEmergencyOptimizer {
    constructor() {
        this.lcpTarget = 2500; // 2.5s target (boa)
        this.lcpCritical = 4000; // 4s crítico
        this.currentLCP = null;
        this.optimizations = new Set();
        this.deviceInfo = this.detectDevice();
        this.connectionInfo = this.detectConnection();
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
            memory: navigator.deviceMemory || 8
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
     * Inicializar otimizações de emergência
     */
    init() {
        console.log('🚨 Iniciando otimizações de emergência para LCP crítico (8,1s)...');
        
        // Aplicar otimizações críticas imediatas
        this.applyEmergencyOptimizations();
        
        // Configurar monitoramento de emergência
        this.setupEmergencyMonitoring();
        
        // Otimizar recursos críticos
        this.optimizeCriticalResources();
        
        // Configurar preloads de emergência
        this.setupEmergencyPreloads();
        
        // Otimizar renderização crítica
        this.optimizeCriticalRendering();
        
        console.log('✅ Otimizações de emergência LCP aplicadas');
    }

    /**
     * Aplicar otimizações de emergência
     */
    applyEmergencyOptimizations() {
        // 1. CSS crítico ultra-minimalista
        this.applyUltraMinimalCSS();
        
        // 2. Otimizar elementos LCP críticos
        this.optimizeCriticalLPCElements();
        
        // 3. Configurar font-display: swap
        this.setupFontDisplaySwap();
        
        // 4. Otimizar imagens críticas
        this.optimizeCriticalImages();
        
        // 5. Configurar fetchpriority máximo
        this.setupMaximumFetchPriority();
        
        this.optimizations.add('emergency-optimizations');
    }

    /**
     * Aplicar CSS crítico ultra-minimalista
     */
    applyUltraMinimalCSS() {
        const ultraMinimalCSS = `
        /* Ultra-minimal CSS for emergency LCP optimization */
        .logo img{width:160px;height:40px;object-fit:contain;display:block;max-width:100%;contain:layout style paint}
        .header-content{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;max-width:1200px;margin:0 auto;position:relative;z-index:10;contain:layout}
        .hero{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;height:140vh;display:flex;align-items:flex-start;overflow:hidden;margin-top:0!important;margin-bottom:-350px;background:#000;contain:layout style paint}
        .hero-content{position:relative;z-index:1;width:100%;max-width:1200px;margin:0 auto;padding:0 5%;margin-top:300px;contain:layout}
        .hero-text h1{font-size:48px;line-height:1.05;margin-bottom:24px;color:#fff;font-weight:700;text-align:left;text-shadow:2px 2px 4px rgba(0,0,0,0.8);contain:layout style paint}
        .hero-text p{color:#fff;font-size:18px;line-height:1.5;margin:0;text-shadow:1px 1px 2px rgba(0,0,0,0.7);contain:layout style paint}
        .video-bg-wrapper{position:absolute;top:0;left:0;width:100vw;height:100%;z-index:0;overflow:hidden;pointer-events:none;transform:translateY(-300px);display:block!important;contain:layout style paint}
        .video-bg{position:absolute;top:0;left:50%;width:100vw;height:100%;min-width:100vw;min-height:100%;object-fit:cover;transform:translateX(-50%);opacity:1!important;visibility:visible!important;contain:layout style paint}
        
        /* Social icons - minimal */
        .social-links{display:flex!important;gap:16px!important;margin-top:-5px!important;margin-left:10px!important;contain:layout}
        .social-links a{color:#000!important;font-size:1.5rem!important;transition:color 0.2s!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        .social-links i{display:inline-block!important;visibility:visible!important;opacity:1!important;font-style:normal!important;contain:layout style paint}
        .fab{font-family:"Font Awesome 6 Brands"!important;font-weight:400!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        .fas{font-family:"Font Awesome 6 Free"!important;font-weight:900!important;display:inline-block!important;visibility:visible!important;opacity:1!important;contain:layout style paint}
        
        /* Prevent layout shifts - critical for LCP */
        .logo{min-width:160px;min-height:40px;contain:layout}
        .hero-text{min-height:200px;contain:layout}
        .social-links{min-width:120px;min-height:24px;contain:layout}
        
        /* Font loading optimization */
        @font-face{font-family:'Montserrat';src:url('assets/fonts/Montserrat-Regular.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
        @font-face{font-family:'Montserrat';src:url('assets/fonts/Montserrat-Medium.woff2') format('woff2');font-weight:500;font-style:normal;font-display:swap}
        
        /* Fallback fonts for immediate display */
        body{font-family:'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif}
        
        /* Screen reader only text - Accessibility */
        .sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
        
        /* Mobile optimizations - minimal */
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
        `;

        // Remover CSS crítico existente
        const existingCriticalCSS = document.querySelector('style[data-critical], style[data-fcp-lcp-optimized]');
        if (existingCriticalCSS) {
            existingCriticalCSS.remove();
        }

        // Inserir CSS crítico ultra-minimalista
        const style = document.createElement('style');
        style.textContent = ultraMinimalCSS;
        style.setAttribute('data-critical', 'true');
        style.setAttribute('data-emergency-lcp', 'true');
        document.head.insertBefore(style, document.head.firstChild);
        
        this.optimizations.add('ultra-minimal-css');
    }

    /**
     * Otimizar elementos LCP críticos
     */
    optimizeCriticalLPCElements() {
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
                element.setAttribute('data-critical', 'true');
                
                // Aplicar otimizações específicas
                if (element.tagName === 'IMG') {
                    element.setAttribute('fetchpriority', 'high');
                    element.setAttribute('decoding', 'sync');
                    element.setAttribute('loading', 'eager');
                    element.setAttribute('importance', 'high');
                }
                
                // Otimizar vídeo
                if (element.tagName === 'VIDEO') {
                    element.setAttribute('preload', 'metadata');
                    element.setAttribute('importance', 'high');
                }
            });
        });
        
        this.optimizations.add('critical-lcp-elements');
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
                link.setAttribute('fetchpriority', 'high');
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
            img.setAttribute('importance', 'high');
            
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
     * Configurar fetchpriority máximo
     */
    setupMaximumFetchPriority() {
        // Configurar prioridade máxima para recursos críticos
        const criticalResources = document.querySelectorAll('[data-critical]');
        criticalResources.forEach(resource => {
            if (resource.tagName === 'LINK') {
                resource.setAttribute('fetchpriority', 'high');
            }
        });
        
        this.optimizations.add('maximum-fetch-priority');
    }

    /**
     * Configurar monitoramento de emergência
     */
    setupEmergencyMonitoring() {
        // Monitorar LCP
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.currentLCP = entry.startTime;
                        console.log(`🚨 LCP: ${entry.startTime.toFixed(2)}ms (Target: ${this.lcpTarget}ms)`);
                        this.analyzeLCPPerformance(entry.startTime);
                    }
                });
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        }
        
        this.optimizations.add('emergency-monitoring');
    }

    /**
     * Analisar performance do LCP
     */
    analyzeLCPPerformance(lcpTime) {
        const performance = lcpTime <= this.lcpTarget ? 'excellent' : 
                           lcpTime <= this.lcpCritical ? 'good' : 'critical';
        
        console.log(`📊 LCP Performance: ${performance}`);
        
        if (performance === 'critical') {
            this.applyEmergencyLPCOptimizations();
        }
    }

    /**
     * Aplicar otimizações de emergência para LCP
     */
    applyEmergencyLPCOptimizations() {
        // Reduzir ainda mais o CSS crítico
        this.reduceCriticalCSS();
        
        // Otimizar carregamento de fontes
        this.optimizeFontLoading();
        
        // Configurar preloads de emergência
        this.setupEmergencyPreloads();
        
        // Otimizar renderização crítica
        this.optimizeCriticalRendering();
        
        this.optimizations.add('emergency-lcp-optimizations');
    }

    /**
     * Reduzir CSS crítico
     */
    reduceCriticalCSS() {
        // Remover estilos não essenciais do CSS crítico
        const criticalStyle = document.querySelector('style[data-emergency-lcp]');
        if (criticalStyle) {
            let css = criticalStyle.textContent;
            
            // Remover animações e transições
            css = css.replace(/animation[^;]+;/g, '');
            css = css.replace(/transition[^;]+;/g, '');
            
            // Remover estilos não críticos
            css = css.replace(/@media[^{]+{[^}]+}/g, '');
            
            // Remover propriedades não essenciais
            css = css.replace(/text-shadow[^;]+;/g, '');
            css = css.replace(/backdrop-filter[^;]+;/g, '');
            
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
     * Configurar preloads de emergência
     */
    setupEmergencyPreloads() {
        // Preload apenas recursos essenciais
        const emergencyPreloads = [
            {
                href: 'assets/images/Renov-Logo.webp?v=1.6.0',
                as: 'image',
                type: 'image/webp'
            }
        ];

        emergencyPreloads.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            link.type = resource.type;
            link.setAttribute('fetchpriority', 'high');
            link.setAttribute('data-critical', 'true');
            document.head.appendChild(link);
        });
        
        this.optimizations.add('emergency-preload');
    }

    /**
     * Otimizar renderização crítica
     */
    optimizeCriticalRendering() {
        // Usar requestIdleCallback para tarefas não críticas
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.loadNonCriticalResources();
            }, { timeout: 3000 });
        } else {
            setTimeout(() => {
                this.loadNonCriticalResources();
            }, 2000);
        }
        
        this.optimizations.add('critical-rendering');
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
            currentLCP: this.currentLCP,
            lcpTarget: this.lcpTarget,
            lcpCritical: this.lcpCritical,
            optimizations: Array.from(this.optimizations),
            device: this.deviceInfo,
            connection: this.connectionInfo,
            performance: {
                lcpStatus: this.currentLCP ? 
                    (this.currentLCP <= this.lcpTarget ? 'excellent' : 
                     this.currentLCP <= this.lcpCritical ? 'good' : 'critical') : 'pending'
            }
        };
    }
}

// Inicializar otimizador de emergência quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const optimizer = new LCPEmergencyOptimizer();
        optimizer.init();
        window.lcpEmergencyOptimizer = optimizer;
    });
} else {
    const optimizer = new LCPEmergencyOptimizer();
    optimizer.init();
    window.lcpEmergencyOptimizer = optimizer;
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LCPEmergencyOptimizer;
} 