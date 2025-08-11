/**
 * MOBILE LITESPEED CACHE OPTIMIZER
 * Otimizações específicas para métricas mobile: FCP, Speed Index, CLS, LCP
 * Versão 2.0 - Simplificada e sem conflitos
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
        
        // 2. SPEED INDEX OPTIMIZATION
        this.optimizeSpeedIndex();
        
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
     * Otimizar Speed Index
     */
    optimizeSpeedIndex() {
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
    }

    /**
     * Otimizar Cumulative Layout Shift (CLS)
     */
    optimizeCLS() {
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
        
        console.log('📊 Mobile LiteSpeed Optimizer - Métricas monitoradas');
    }
}

// Inicializar Mobile LiteSpeed Optimizer
new MobileLiteSpeedOptimizer(); 