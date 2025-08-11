/**
 * Video LCP Fix
 * Resolve o problema de LCP 21,8s causado pelo carregamento forçado do vídeo
 */

class VideoLCPFix {
    constructor() {
        this.lcpMeasured = false;
        this.videoLoaded = false;
        this.init();
    }

    init() {
        console.log('🎥 Video LCP Fix iniciado');
        this.setupVideoOptimization();
        this.monitorLCP();
        this.setupLazyVideoLoading();
    }

    /**
     * Configurar otimização do vídeo
     */
    setupVideoOptimization() {
        const video = document.getElementById('hero-video');
        if (video) {
            // Garantir que o vídeo não carregue automaticamente
            video.preload = 'none';
            video.removeAttribute('autoplay');
            video.removeAttribute('muted');
            video.removeAttribute('loop');
            video.removeAttribute('playsinline');
            
            // Esconder o vídeo até LCP ser medido
            video.style.display = 'none';
            video.style.opacity = '0';
            video.style.visibility = 'hidden';
            
            console.log('🎥 Vídeo configurado para carregamento sob demanda');
        }
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
                        this.lcpMeasured = true;
                        console.log(`📊 LCP medido: ${entry.startTime.toFixed(2)}ms`);
                        
                        // Carregar vídeo após LCP ser medido
                        if (!this.videoLoaded) {
                            this.loadVideoAfterLCP();
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }

        // Fallback: carregar vídeo após 5 segundos se LCP não for medido
        setTimeout(() => {
            if (!this.lcpMeasured && !this.videoLoaded) {
                console.log('⏰ Timeout: carregando vídeo após 5s');
                this.loadVideoAfterLCP();
            }
        }, 5000);
    }

    /**
     * Carregar vídeo após LCP ser medido
     */
    loadVideoAfterLCP() {
        const video = document.getElementById('hero-video');
        if (video && !this.videoLoaded) {
            this.videoLoaded = true;
            
            // Restaurar atributos do vídeo
            video.preload = 'metadata';
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            
            // Mostrar o vídeo gradualmente
            video.style.display = 'block';
            video.style.opacity = '0';
            video.style.visibility = 'visible';
            
            // Fade in do vídeo
            setTimeout(() => {
                video.style.transition = 'opacity 0.5s ease-in-out';
                video.style.opacity = '1';
            }, 100);
            
            // Carregar o vídeo
            video.load();
            
            console.log('🎥 Vídeo carregado após LCP');
        }
    }

    /**
     * Configurar carregamento lazy do vídeo
     */
    setupLazyVideoLoading() {
        // Carregar vídeo apenas quando estiver visível na viewport
        if ('IntersectionObserver' in window) {
            const video = document.getElementById('hero-video');
            if (video) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && this.lcpMeasured && !this.videoLoaded) {
                            this.loadVideoAfterLCP();
                            observer.unobserve(video);
                        }
                    });
                }, {
                    threshold: 0.1
                });
                
                observer.observe(video);
            }
        }
    }
}

// Inicializar fix quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new VideoLCPFix();
});

// Fallback para carregamento imediato
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new VideoLCPFix();
    });
} else {
    new VideoLCPFix();
} 