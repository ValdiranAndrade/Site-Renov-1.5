/**
 * MOBILE LITESPEED CACHE OPTIMIZER
 * Otimizações específicas para métricas mobile: FCP, Speed Index, CLS, LCP
 * Versão 3.0 - Speed Index Ultra-Otimizado
 */

class MobileLiteSpeedOptimizer {
    constructor() {
        this.isMobile = this.detectMobile();
        if (this.isMobile) {
            this.init();
        }
    }

    init() {
        console.log('📱 Mobile LiteSpeed Optimizer iniciado');
        this.applyMobileOptimizations();
        this.monitorPerformance();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }

    /**
     * Aplicar otimizações específicas para mobile
     */
    applyMobileOptimizations() {
        console.log('⚡ Aplicando otimizações Mobile LiteSpeed...');
        
        // 1. FCP OPTIMIZATION
        this.optimizeFCP();
        
        // 2. SPEED INDEX OPTIMIZATION (ULTRA-OTIMIZADO)
        this.optimizeSpeedIndexUltra();
        
        // 3. CLS OPTIMIZATION
        this.optimizeCLS();
        
        // 4. LCP OPTIMIZATION
        this.optimizeLCP();
        
        console.log('✅ Otimizações Mobile LiteSpeed aplicadas');
    }

    /**
     * Otimizar First Contentful Paint (FCP)
     */
    optimizeFCP() {
        // Injetar CSS crítico inline para FCP
        const criticalCSS = `
            /* MOBILE CRITICAL CSS FOR FCP */
            .logo img { contain: layout style paint; }
            .header-content { contain: layout; }
            .hero { contain: layout style paint; }
            .hero-content { contain: layout; }
            .hero-text h1 { contain: layout style paint; }
            .hero-text p { contain: layout style paint; }
            
            @media (max-width: 768px) {
                .logo img { width: 120px; height: 30px; contain: layout style paint; }
                .hero-text h1 { font-size: 2rem; line-height: 1.2; contain: layout style paint; }
                .hero-text p { font-size: 1rem; line-height: 1.4; contain: layout style paint; }
                .mobile-bg { contain: layout style paint; }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        style.setAttribute('data-optimizer', 'mobile-fcp-critical');
        document.head.appendChild(style);
        
        // Preload recursos críticos para FCP
        this.preloadCriticalResources();
    }

    /**
     * Otimizar Speed Index (ULTRA-OTIMIZADO)
     */
    optimizeSpeedIndexUltra() {
        console.log('⚡ Otimizando Speed Index Ultra...');
        
        // 1. FORÇAR RENDERIZAÇÃO IMEDIATA
        this.forceImmediateRendering();
        
        // 2. OTIMIZAR ELEMENTOS CRÍTICOS
        this.optimizeCriticalElements();
        
        // 3. PRECARREGAR RECURSOS VISUAIS
        this.preloadVisualResources();
        
        // 4. APLICAR CSS ULTRA-CRÍTICO
        this.applyUltraCriticalCSS();
        
        // 5. FORÇAR LAYOUT SÍNCRONO
        this.forceSynchronousLayout();
    }

    /**
     * Forçar renderização imediata
     */
    forceImmediateRendering() {
        // Forçar display de elementos críticos
        const criticalElements = [
            '.header-content',
            '.logo',
            '.hero-content',
            '.hero-text',
            '.hero-text h1',
            '.hero-text p'
        ];
        
        criticalElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.display = 'block';
                element.style.visibility = 'visible';
                element.style.opacity = '1';
                element.style.willChange = 'transform';
                element.style.transform = 'translateZ(0)';
                element.style.contain = 'layout style paint';
            });
        });
        
        // Forçar body visível
        document.body.style.display = 'block';
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';
    }

    /**
     * Otimizar elementos críticos
     */
    optimizeCriticalElements() {
        // Logo - elemento crítico para Speed Index
        const logo = document.querySelector('.logo img');
        if (logo) {
            logo.style.display = 'block';
            logo.style.visibility = 'visible';
            logo.style.opacity = '1';
            logo.style.width = '120px';
            logo.style.height = '30px';
            logo.style.objectFit = 'contain';
            logo.loading = 'eager';
            logo.decoding = 'sync';
            logo.fetchPriority = 'high';
        }
        
        // Hero text - elemento crítico para Speed Index
        const heroText = document.querySelector('.hero-text h1');
        if (heroText) {
            heroText.style.display = 'block';
            heroText.style.visibility = 'visible';
            heroText.style.opacity = '1';
            heroText.style.color = '#fff';
            heroText.style.fontSize = '2rem';
            heroText.style.fontWeight = '700';
            heroText.style.lineHeight = '1.2';
            heroText.style.textAlign = 'center';
        }
        
        // Hero content - container crítico
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.display = 'flex';
            heroContent.style.visibility = 'visible';
            heroContent.style.opacity = '1';
            heroContent.style.position = 'relative';
            heroContent.style.zIndex = '1';
        }
    }

    /**
     * Precargar recursos visuais
     */
    preloadVisualResources() {
        const visualResources = [
            'assets/images/Renov-Logo.webp',
            'assets/images/mobile/bg-como-funciona.webp',
            'assets/fonts/Montserrat-Regular.woff2',
            'assets/fonts/Montserrat-Medium.woff2'
        ];
        
        visualResources.forEach(resource => {
            if (resource.includes('.woff2')) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = 'font';
                link.type = 'font/woff2';
                link.crossOrigin = 'anonymous';
                link.fetchPriority = 'high';
                document.head.appendChild(link);
            } else if (resource.includes('.webp')) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = 'image';
                link.fetchPriority = 'high';
                document.head.appendChild(link);
                
                // Também carregar a imagem imediatamente
                const img = new Image();
                img.src = resource;
                img.decoding = 'sync';
            }
        });
    }

    /**
     * Aplicar CSS ultra-crítico
     */
    applyUltraCriticalCSS() {
        const ultraCriticalCSS = `
            /* ULTRA-CRITICAL CSS FOR SPEED INDEX */
            * { box-sizing: border-box; }
            
            body { 
                margin: 0; 
                padding: 0; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                overflow-x: hidden;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            /* CRITICAL ELEMENTS FOR SPEED INDEX */
            .header-content { 
                display: flex !important; 
                align-items: center; 
                justify-content: space-between; 
                padding: 1rem 2rem; 
                max-width: 1200px; 
                margin: 0 auto; 
                position: relative; 
                z-index: 10; 
                background: #fff; 
                min-height: 70px;
                visibility: visible !important;
                opacity: 1 !important;
                contain: layout;
            }
            
            .logo { 
                display: block !important; 
                visibility: visible !important; 
                opacity: 1 !important;
            }
            
            .logo img { 
                width: 120px; 
                height: 30px; 
                object-fit: contain; 
                display: block !important; 
                max-width: 100%;
                visibility: visible !important;
                opacity: 1 !important;
                contain: layout style paint;
            }
            
            .hero { 
                position: relative; 
                width: 100vw; 
                height: 100vh; 
                display: flex; 
                align-items: flex-start; 
                overflow: hidden; 
                margin-top: 0; 
                margin-bottom: 0; 
                background: #000;
                contain: layout style paint;
            }
            
            .hero-content { 
                position: relative; 
                z-index: 1; 
                width: 100%; 
                max-width: 1200px; 
                margin: 0 auto; 
                padding: 0 5%; 
                margin-top: 120px;
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                contain: layout;
            }
            
            .hero-text { 
                color: #fff; 
                text-align: center; 
                margin-bottom: 2rem;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                contain: layout;
            }
            
            .hero-text h1 { 
                font-size: 2rem; 
                font-weight: 700; 
                margin-bottom: 1rem; 
                line-height: 1.2;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                contain: layout style paint;
            }
            
            .hero-text p { 
                font-size: 1rem; 
                margin-bottom: 2rem; 
                opacity: 0.9;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                contain: layout style paint;
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
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                contain: layout style paint;
            }
            
            .video-bg { 
                display: none !important;
            }
            
            /* HIDE NON-CRITICAL ELEMENTS FOR SPEED INDEX */
            .social-links,
            .main-nav,
            .tab-buttons,
            .diferenciais-grid,
            .parceiros-slider,
            .respostas-rapidas,
            .impactos-renov,
            .mvv-renov-img,
            .fundadores,
            .trabalhe-content,
            .contato-l5-wrapper {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = ultraCriticalCSS;
        style.setAttribute('data-optimizer', 'mobile-speed-index-ultra');
        document.head.appendChild(style);
    }

    /**
     * Forçar layout síncrono
     */
    forceSynchronousLayout() {
        // Forçar reflow para elementos críticos
        const criticalElements = [
            '.header-content',
            '.logo img',
            '.hero-content',
            '.hero-text h1',
            '.hero-text p'
        ];
        
        criticalElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                // Forçar reflow
                element.offsetHeight;
                element.offsetWidth;
                element.getBoundingClientRect();
            });
        });
        
        // Forçar repaint global
        requestAnimationFrame(() => {
            document.body.offsetHeight; // Force reflow
            console.log('⚡ Speed Index Ultra-otimizado aplicado');
        });
    }

    /**
     * Otimizar Cumulative Layout Shift (CLS)
     */
    optimizeCLS() {
        // Definir dimensões fixas para elementos críticos
        const clsElements = [
            { selector: '.logo img', width: '120px', height: '30px' },
            { selector: '.hero-text h1', minHeight: '60px' },
            { selector: '.hero-text p', minHeight: '40px' },
            { selector: '.parceiro-experiencia-card', height: '450px' }
        ];
        
        clsElements.forEach(({ selector, width, height, minHeight }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (width) element.style.width = width;
                if (height) element.style.height = height;
                if (minHeight) element.style.minHeight = minHeight;
                element.style.aspectRatio = 'auto';
            });
        });
        
        // Reservar espaço para imagens
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.style.width && !img.style.height) {
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.aspectRatio = 'auto';
            }
        });
    }

    /**
     * Otimizar Largest Contentful Paint (LCP)
     */
    optimizeLCP() {
        // Identificar e otimizar candidatos LCP
        const lcpCandidates = [
            '.hero-text h1',
            '.logo img',
            '.parceiro-experiencia-card'
        ];
        
        lcpCandidates.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.willChange = 'transform';
                element.style.transform = 'translateZ(0)';
                element.style.contain = 'layout style paint';
                element.offsetHeight; // Force reflow
            });
        });
        
        // Otimizar carregamento de imagens LCP
        const lcpImages = document.querySelectorAll('img[src*="Renov-Logo"], img[src*="bg-como-funciona"], img[src*="quero-ser"]');
        lcpImages.forEach(img => {
            img.loading = 'eager';
            img.decoding = 'sync';
            img.fetchPriority = 'high';
            
            // Preload imagens críticas
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            link.fetchPriority = 'high';
            document.head.appendChild(link);
        });
        
        // Remover vídeos não críticos no mobile
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.style.display = 'none';
            video.pause();
            video.removeAttribute('src');
        });
    }

    /**
     * Preload recursos críticos
     */
    preloadCriticalResources() {
        const criticalResources = [
            { href: 'assets/images/Renov-Logo.webp', as: 'image' },
            { href: 'assets/images/mobile/bg-como-funciona.webp', as: 'image' },
            { href: 'assets/fonts/Montserrat-Regular.woff2', as: 'font', type: 'font/woff2' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.type) link.type = resource.type;
            link.crossOrigin = 'anonymous';
            link.fetchPriority = 'high';
            document.head.appendChild(link);
        });
    }

    /**
     * Monitorar performance
     */
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitorar FCP
            const fcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'first-contentful-paint') {
                        console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`);
                    }
                });
            });
            fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });
            
            // Monitorar LCP
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log(`🎯 LCP: ${entry.startTime.toFixed(2)}ms`);
                    }
                });
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Monitorar CLS
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'layout-shift') {
                        console.log(`📐 CLS: ${entry.value.toFixed(3)}`);
                    }
                });
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
        
        console.log('📊 Mobile LiteSpeed Optimizer - Speed Index Ultra-otimizado');
    }
}

// Inicializar Mobile LiteSpeed Optimizer
new MobileLiteSpeedOptimizer(); 