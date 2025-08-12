// Otimizador específico para LCP (Largest Contentful Paint)
class LCPOptimizer {
    constructor() {
        this.lcpElements = [];
        this.init();
    }

    init() {
        // Marcar elementos críticos para LCP
        this.markLCPElements();
        
        // Otimizar carregamento de recursos críticos
        this.optimizeCriticalResources();
        
        // Forçar carregamento prioritário
        this.forcePriorityLoading();
        
        // Monitorar LCP
        this.monitorLCP();
    }

    markLCPElements() {
        // Elementos candidatos ao LCP
        const lcpCandidates = [
            '#hero-video',
            '.mobile-bg',
            '.logo img',
            '.hero-text h1',
            '.hero-text p'
        ];

        lcpCandidates.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute('data-lcp-candidate', 'true');
                element.setAttribute('data-critical', 'true');
                this.lcpElements.push(element);
            }
        });
    }

    optimizeCriticalResources() {
        // Forçar carregamento do vídeo hero
        const heroVideo = document.getElementById('hero-video');
        if (heroVideo) {
            // Definir prioridade máxima
            heroVideo.setAttribute('fetchpriority', 'high');
            heroVideo.setAttribute('preload', 'auto');
            
            // Forçar carregamento
            heroVideo.load();
            
            // Garantir que seja visível imediatamente
            heroVideo.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 100vw !important;
                height: 100vh !important;
                min-width: 100vw !important;
                min-height: 100vh !important;
                object-fit: cover !important;
                position: absolute !important;
                top: 0 !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                z-index: 0 !important;
                background: transparent !important;
            `;
        }

        // Forçar carregamento do logo
        const logo = document.querySelector('.logo img');
        if (logo) {
            logo.setAttribute('fetchpriority', 'high');
            logo.setAttribute('loading', 'eager');
            logo.setAttribute('decoding', 'sync');
            
            // Garantir que seja visível imediatamente
            logo.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 160px !important;
                height: 40px !important;
                min-width: 160px !important;
                min-height: 40px !important;
                box-sizing: border-box !important;
                contain: layout style paint !important;
                will-change: auto !important;
                image-rendering: -webkit-optimize-contrast !important;
                image-rendering: crisp-edges !important;
            `;
        }

        // Forçar carregamento do background mobile
        const mobileBg = document.querySelector('.mobile-bg');
        if (mobileBg) {
            mobileBg.setAttribute('data-critical', 'true');
            mobileBg.setAttribute('data-lcp-candidate', 'true');
            
            // Garantir que seja visível imediatamente
            mobileBg.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 100vw !important;
                height: 100vh !important;
                min-width: 100vw !important;
                min-height: 100vh !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                box-sizing: border-box !important;
                contain: layout style paint !important;
                will-change: auto !important;
                z-index: 0 !important;
            `;
        }
    }

    forcePriorityLoading() {
        // Forçar carregamento de fontes críticas
        this.loadCriticalFonts();
        
        // Forçar carregamento de imagens críticas
        this.loadCriticalImages();
        
        // Otimizar CSS crítico
        this.optimizeCriticalCSS();
    }

    loadCriticalFonts() {
        // Preload de fontes críticas
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
        ];

        fontLinks.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = fontUrl;
            link.as = 'style';
            link.setAttribute('fetchpriority', 'high');
            document.head.appendChild(link);
        });
    }

    loadCriticalImages() {
        // Preload de imagens críticas
        const criticalImages = [
            'assets/images/bg-como-funciona.webp',
            'assets/images/Renov-Logo.webp'
        ];

        criticalImages.forEach(imageUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = imageUrl;
            link.as = 'image';
            link.setAttribute('fetchpriority', 'high');
            document.head.appendChild(link);
        });
    }

    optimizeCriticalCSS() {
        // Injetar CSS crítico inline
        const criticalCSS = `
            /* CSS crítico para LCP */
            #hero-video {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 100vw !important;
                height: 100vh !important;
                min-width: 100vw !important;
                min-height: 100vh !important;
                position: absolute !important;
                top: 0 !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                z-index: 0 !important;
                object-fit: cover !important;
                background: transparent !important;
            }
            
            .video-bg-wrapper {
                width: 100vw !important;
                height: 100vh !important;
                min-width: 100vw !important;
                min-height: 100vh !important;
                position: relative !important;
                overflow: hidden !important;
                display: block !important;
            }
            
            .mobile-bg {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 100vw !important;
                height: 100vh !important;
                min-width: 100vw !important;
                min-height: 100vh !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                z-index: 0 !important;
            }
            
            .logo img {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 160px !important;
                height: 40px !important;
                min-width: 160px !important;
                min-height: 40px !important;
            }
            
            .hero-content {
                min-height: 100vh !important;
                position: relative !important;
                z-index: 1 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: flex-start !important;
            }
            
            .hero-text {
                min-height: 200px !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
            }
            
            .hero-text h1 {
                min-height: 1.2em !important;
                display: block !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
                max-width: 100% !important;
            }
            
            .hero-text p {
                min-height: 1.5em !important;
                display: block !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
                max-width: 100% !important;
            }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        style.setAttribute('data-critical', 'true');
        document.head.appendChild(style);
    }

    monitorLCP() {
        // Monitorar LCP usando Performance Observer
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP detectado:', entry.startTime, 'ms');
                        console.log('Elemento LCP:', entry.element);
                        
                        // Marcar o elemento LCP
                        if (entry.element) {
                            entry.element.setAttribute('data-lcp-detected', 'true');
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }
}

// Inicializar otimizador LCP
document.addEventListener('DOMContentLoaded', () => {
    new LCPOptimizer();
});

// Inicializar imediatamente se DOM já estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LCPOptimizer();
    });
} else {
    new LCPOptimizer();
} 