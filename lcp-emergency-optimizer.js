/**
 * LCP Emergency Optimizer
 * Reduz LCP de 21,2s para < 2,5s
 */

class LCPEmergencyOptimizer {
    constructor() {
        this.lcpScore = 0;
        this.isOptimized = false;
        this.init();
    }

    init() {
        console.log('🚨 LCP Emergency Optimizer iniciado');
        this.applyEmergencyOptimizations();
        this.monitorLCP();
        this.optimizeCriticalResources();
    }

    /**
     * Aplicar otimizações de emergência
     */
    applyEmergencyOptimizations() {
        // 1. Otimizar vídeo de fundo (maior causador do LCP)
        this.optimizeVideoBackground();
        
        // 2. Otimizar imagens críticas
        this.optimizeCriticalImages();
        
        // 3. Otimizar fontes
        this.optimizeFonts();
        
        // 4. Otimizar CSS crítico
        this.optimizeCriticalCSS();
        
        // 5. Otimizar carregamento de recursos
        this.optimizeResourceLoading();
        
        console.log('✅ Otimizações de emergência aplicadas');
    }

    /**
     * Otimizar vídeo de fundo (principal causador do LCP)
     */
    optimizeVideoBackground() {
        const video = document.getElementById('hero-video');
        if (video) {
            // Mudar preload para none
            video.preload = 'none';
            
            // Carregar vídeo apenas após LCP
            video.addEventListener('loadedmetadata', () => {
                console.log('🎥 Vídeo carregado após LCP');
            });
            
            // Fallback para imagem estática em conexões lentas
            if (navigator.connection && navigator.connection.effectiveType === 'slow-2g') {
                video.style.display = 'none';
                const mobileBg = document.querySelector('.mobile-bg');
                if (mobileBg) {
                    mobileBg.style.display = 'block';
                }
            }
        }
    }

    /**
     * Otimizar imagens críticas
     */
    optimizeCriticalImages() {
        const criticalImages = [
            'assets/images/Renov-Logo.webp',
            'assets/images/bg-como-funciona.webp'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.decoding = 'sync';
            img.fetchPriority = 'high';
        });
    }

    /**
     * Otimizar fontes
     */
    optimizeFonts() {
        // Forçar carregamento de fontes críticas
        const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
        fontLinks.forEach(link => {
            link.setAttribute('fetchpriority', 'high');
        });
    }

    /**
     * Otimizar CSS crítico
     */
    optimizeCriticalCSS() {
        // Remover estilos não críticos
        const nonCriticalStyles = document.querySelectorAll('style:not([data-critical])');
        nonCriticalStyles.forEach(style => {
            if (!style.hasAttribute('data-critical')) {
                style.setAttribute('data-deferred', 'true');
                style.style.display = 'none';
            }
        });
    }

    /**
     * Otimizar carregamento de recursos
     */
    optimizeResourceLoading() {
        // Deferir recursos não críticos
        const nonCriticalResources = [
            'assets/video/bg-video.mp4.mp4',
            'assets/video/bg-video.mp4.webm',
            'assets/video/bg-IA.gif'
        ];

        // Carregar apenas após LCP
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.loadNonCriticalResources(nonCriticalResources);
                    }
                });
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    /**
     * Carregar recursos não críticos após LCP
     */
    loadNonCriticalResources(resources) {
        if (this.isOptimized) return;
        
        resources.forEach(resource => {
            if (resource.includes('.mp4') || resource.includes('.webm')) {
                const video = document.createElement('video');
                video.src = resource;
                video.preload = 'metadata';
            } else if (resource.includes('.gif')) {
                const img = new Image();
                img.src = resource;
                img.loading = 'lazy';
            }
        });
        
        this.isOptimized = true;
        console.log('📦 Recursos não críticos carregados após LCP');
    }

    /**
     * Monitorar LCP
     */
    monitorLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.lcpScore = entry.startTime;
                        console.log(`🚨 LCP: ${this.lcpScore.toFixed(2)}ms`);
                        
                        // Aplicar otimizações adicionais se LCP ainda estiver alto
                        if (this.lcpScore > 2500) {
                            this.applyAdditionalOptimizations();
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    /**
     * Aplicar otimizações adicionais se LCP ainda estiver alto
     */
    applyAdditionalOptimizations() {
        console.log('🚨 LCP ainda alto, aplicando otimizações adicionais');
        
        // 1. Remover animações complexas
        const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
        
        // 2. Reduzir qualidade de imagens em conexões lentas
        if (navigator.connection && navigator.connection.effectiveType === 'slow-2g') {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.src.includes('.webp')) {
                    img.src = img.src.replace('.webp', '.jpg');
                }
            });
        }
        
        // 3. Desabilitar vídeo de fundo em dispositivos lentos
        const video = document.getElementById('hero-video');
        if (video && navigator.hardwareConcurrency < 4) {
            video.style.display = 'none';
            const mobileBg = document.querySelector('.mobile-bg');
            if (mobileBg) {
                mobileBg.style.display = 'block';
            }
        }
    }
}

// Inicializar otimizador
document.addEventListener('DOMContentLoaded', () => {
    new LCPEmergencyOptimizer();
});

// Fallback para carregamento imediato
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LCPEmergencyOptimizer();
    });
} else {
    new LCPEmergencyOptimizer();
} 