/**
 * MOBILE LITESPEED CACHE OPTIMIZER
 * Otimizações específicas para métricas mobile: FCP, Speed Index, CLS, LCP
 * Versão 1.0 - Performance máxima para mobile
 */

class MobileLiteSpeedOptimizer {
    constructor() {
        this.isMobile = this.detectMobile();
        this.init();
    }

    init() {
        if (this.isMobile) {
            console.log('🚀 Mobile LiteSpeed Optimizer iniciado');
            this.applyMobileOptimizations();
            this.monitorPerformance();
        }
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
        
        // 1. FCP OPTIMIZATION (First Contentful Paint)
        this.optimizeFCP();
        
        // 2. SPEED INDEX OPTIMIZATION
        this.optimizeSpeedIndex();
        
        // 3. CLS OPTIMIZATION (Cumulative Layout Shift)
        this.optimizeCLS();
        
        // 4. LCP OPTIMIZATION (Largest Contentful Paint)
        this.optimizeLCP();
        
        console.log('✅ Otimizações Mobile LiteSpeed aplicadas');
    }

    /**
     * Otimizar First Contentful Paint (FCP)
     */
    optimizeFCP() {
        console.log('🎨 Otimizando FCP...');
        
        // Injetar CSS crítico inline para FCP
        const criticalCSS = `
            /* MOBILE CRITICAL CSS FOR FCP */
            * { box-sizing: border-box; }
            body { 
                margin: 0; 
                padding: 0; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                overflow-x: hidden;
            }
            
            /* CRITICAL ELEMENTS FOR FCP */
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
            
            .logo img { 
                width: 160px; 
                height: 40px; 
                object-fit: contain; 
                display: block; 
                max-width: 100%;
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
            }
            
            .hero-content { 
                position: relative; 
                z-index: 1; 
                width: 100%; 
                max-width: 1200px; 
                margin: 0 auto; 
                padding: 0 5%; 
                margin-top: 120px;
            }
            
            .hero-text { 
                color: #fff; 
                text-align: center; 
                margin-bottom: 2rem;
            }
            
            .hero-text h1 { 
                font-size: 2.5rem; 
                font-weight: 700; 
                margin-bottom: 1rem; 
                line-height: 1.2;
            }
            
            .hero-text p { 
                font-size: 1.1rem; 
                margin-bottom: 2rem; 
                opacity: 0.9;
            }
            
            /* MOBILE SPECIFIC */
            @media (max-width: 768px) {
                .logo img { 
                    width: 120px; 
                    height: 30px;
                }
                
                .hero-text h1 { 
                    font-size: 2rem; 
                    line-height: 1.2;
                }
                
                .hero-text p { 
                    font-size: 1rem; 
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
        style.setAttribute('data-optimizer', 'mobile-fcp-critical');
        document.head.appendChild(style);
        
        // Preload recursos críticos para FCP
        this.preloadCriticalResources();
    }

    /**
     * Otimizar Speed Index
     */
    optimizeSpeedIndex() {
        console.log('⚡ Otimizando Speed Index...');
        
        // Forçar renderização imediata de elementos críticos
        const criticalElements = [
            '.header-content',
            '.logo img',
            '.hero-text h1',
            '.hero-text p'
        ];
        
        criticalElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.willChange = 'transform';
                element.style.transform = 'translateZ(0)';
                element.style.contain = 'layout style paint';
            });
        });
        
        // Otimizar imagens críticas
        const criticalImages = document.querySelectorAll('img[src*="Renov-Logo"], img[src*="bg-como-funciona"]');
        criticalImages.forEach(img => {
            img.loading = 'eager';
            img.decoding = 'sync';
            img.fetchPriority = 'high';
        });
        
        // Forçar layout síncrono
        document.body.style.display = 'block';
        document.body.style.visibility = 'visible';
        
        // Otimizar fontes para Speed Index
        this.optimizeFonts();
    }

    /**
     * Otimizar Cumulative Layout Shift (CLS)
     */
    optimizeCLS() {
        console.log('📐 Otimizando CLS...');
        
        // Definir dimensões fixas para elementos críticos
        const clsElements = [
            { selector: '.logo img', width: '160px', height: '40px' },
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
        
        // Prevenir layout shifts em containers
        const containers = document.querySelectorAll('.parceiro-experiencia-card, .hero, .header-content');
        containers.forEach(container => {
            container.style.contain = 'layout style paint';
            container.style.willChange = 'transform';
        });
    }

    /**
     * Otimizar Largest Contentful Paint (LCP)
     */
    optimizeLCP() {
        console.log('🎯 Otimizando LCP...');
        
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
                
                // Forçar renderização
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
            if (this.isMobile) {
                video.style.display = 'none';
                video.pause();
                video.removeAttribute('src');
            }
        });
        
        // Otimizar fontes para LCP
        this.optimizeFontsForLCP();
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
     * Otimizar fontes
     */
    optimizeFonts() {
        // Forçar carregamento de fontes críticas
        const fontFaces = document.querySelectorAll('@font-face');
        fontFaces.forEach(face => {
            face.style.fontDisplay = 'swap';
        });
        
        // Usar fontes do sistema como fallback
        document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    }

    /**
     * Otimizar fontes para LCP
     */
    optimizeFontsForLCP() {
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
        
        // Fallback para métricas básicas
        setTimeout(() => {
            console.log('📊 Mobile LiteSpeed Optimizer - Métricas monitoradas');
        }, 2000);
    }
}

// Inicializar Mobile LiteSpeed Optimizer
new MobileLiteSpeedOptimizer(); 