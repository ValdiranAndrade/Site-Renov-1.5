/**
 * Mobile LCP Emergency Optimizer
 * Reduz LCP de 22,3s para < 2,5s em dispositivos móveis
 */

class MobileLCPOptimizer {
    constructor() {
        this.lcpScore = 0;
        this.isMobile = this.detectMobile();
        this.connectionType = this.detectConnection();
        this.deviceCapabilities = this.detectDeviceCapabilities();
        this.init();
    }

    /**
     * Detectar se é dispositivo móvel
     */
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
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
     * Detectar capacidades do dispositivo
     */
    detectDeviceCapabilities() {
        return {
            cores: navigator.hardwareConcurrency || 4,
            memory: navigator.deviceMemory || 8,
            isLowEnd: (navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4)
        };
    }

    /**
     * Inicializar otimizador mobile
     */
    init() {
        if (!this.isMobile) return;
        
        console.log('📱 Mobile LCP Optimizer iniciado');
        console.log('📊 Device Info:', this.deviceCapabilities);
        console.log('🌐 Connection:', this.connectionType);
        
        this.applyMobileOptimizations();
        this.monitorMobileLCP();
        this.optimizeMobileResources();
    }

    /**
     * Aplicar otimizações específicas para mobile
     */
    applyMobileOptimizations() {
        // 1. Otimizar vídeo de fundo para mobile
        this.optimizeMobileVideo();
        
        // 2. Otimizar imagens para mobile
        this.optimizeMobileImages();
        
        // 3. Otimizar CSS para mobile
        this.optimizeMobileCSS();
        
        // 4. Otimizar fontes para mobile
        this.optimizeMobileFonts();
        
        // 5. Otimizar carregamento para mobile
        this.optimizeMobileLoading();
        
        console.log('✅ Otimizações mobile aplicadas');
    }

    /**
     * Otimizar vídeo de fundo para mobile
     */
    optimizeMobileVideo() {
        const video = document.getElementById('hero-video');
        const mobileBg = document.querySelector('.mobile-bg');
        
        if (video && mobileBg) {
            // Em mobile, sempre usar imagem estática
            video.style.display = 'none';
            mobileBg.style.display = 'block';
            
            // Desabilitar completamente o vídeo em mobile
            video.removeAttribute('autoplay');
            video.removeAttribute('muted');
            video.removeAttribute('loop');
            video.removeAttribute('playsinline');
            
            console.log('📱 Vídeo desabilitado em mobile, usando imagem estática');
        }
    }

    /**
     * Otimizar imagens para mobile
     */
    optimizeMobileImages() {
        // Forçar carregamento de imagens críticas mobile
        const mobileImages = [
            'assets/images/mobile/bg-como-funciona.webp',
            'assets/images/Renov-Logo.webp'
        ];

        mobileImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.decoding = 'sync';
            img.fetchPriority = 'high';
        });

        // Substituir imagens grandes por versões mobile
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            if (img.src.includes('assets/images/') && !img.src.includes('mobile/')) {
                // Tentar usar versão mobile se disponível
                const mobileSrc = img.src.replace('assets/images/', 'assets/images/mobile/');
                if (mobileSrc !== img.src) {
                    img.src = mobileSrc;
                }
            }
        });
    }

    /**
     * Otimizar CSS para mobile
     */
    optimizeMobileCSS() {
        // Remover estilos não críticos em mobile
        const nonCriticalStyles = document.querySelectorAll('style:not([data-critical])');
        nonCriticalStyles.forEach(style => {
            if (!style.hasAttribute('data-critical')) {
                style.setAttribute('data-mobile-deferred', 'true');
                style.style.display = 'none';
            }
        });

        // Aplicar CSS crítico mobile inline
        const mobileCriticalCSS = `
        /* Mobile Critical CSS - Ultra minimal */
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;line-height:1.6;color:#333;overflow-x:hidden}
        .logo img{width:120px;height:30px;object-fit:contain;display:block;max-width:100%;contain:layout style paint}
        .header-content{display:flex;align-items:center;justify-content:space-between;padding:0.5rem 1rem;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);contain:layout}
        .hero{height:100vh;margin-bottom:0;min-height:600px;align-items:stretch!important;contain:layout style paint}
        .hero-content{margin-top:120px;padding:0 20px;z-index:2;contain:layout}
        .hero-text{max-width:100%;padding:0;margin:0;contain:layout}
        .hero-text h1{font-size:32px;line-height:1.2;contain:layout style paint}
        .hero-text p{font-size:16px;line-height:1.4;contain:layout style paint}
        .mobile-bg{position:absolute;top:0;left:0;width:100vw;height:100%;min-width:100vw;min-height:100%;background-image:url('assets/images/mobile/bg-como-funciona.webp');background-size:cover;background-position:center;background-repeat:no-repeat;z-index:0;display:block!important;contain:layout style paint}
        .video-bg{display:none!important}
        `;

        const style = document.createElement('style');
        style.textContent = mobileCriticalCSS;
        style.setAttribute('data-critical', 'true');
        style.setAttribute('data-mobile-optimized', 'true');
        document.head.insertBefore(style, document.head.firstChild);
    }

    /**
     * Otimizar fontes para mobile
     */
    optimizeMobileFonts() {
        // Usar fontes do sistema em mobile para carregamento mais rápido
        document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';
        
        // Remover preloads de fontes web em mobile
        const fontPreloads = document.querySelectorAll('link[rel="preload"][as="font"]');
        fontPreloads.forEach(link => {
            link.remove();
        });
    }

    /**
     * Otimizar carregamento para mobile
     */
    optimizeMobileLoading() {
        // Deferir recursos não críticos em mobile
        const nonCriticalResources = [
            'assets/video/bg-video.mp4.webm',
            'assets/video/bg-IA.gif',
            'script.min.js',
            'styles.css'
        ];

        // Carregar apenas após LCP em mobile
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.loadMobileNonCriticalResources(nonCriticalResources);
                    }
                });
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }

        // Fallback: carregar após 2 segundos em mobile
        setTimeout(() => {
            this.loadMobileNonCriticalResources(nonCriticalResources);
        }, 2000);
    }

    /**
     * Carregar recursos não críticos em mobile
     */
    loadMobileNonCriticalResources(resources) {
        resources.forEach(resource => {
            if (resource.includes('.css')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = resource;
                document.head.appendChild(link);
            } else if (resource.includes('.js')) {
                const script = document.createElement('script');
                script.src = resource;
                script.async = true;
                document.body.appendChild(script);
            }
        });
        
        console.log('📱 Recursos não críticos carregados em mobile');
    }

    /**
     * Monitorar LCP em mobile
     */
    monitorMobileLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.lcpScore = entry.startTime;
                        console.log(`📱 Mobile LCP: ${this.lcpScore.toFixed(2)}ms`);
                        
                        // Aplicar otimizações adicionais se LCP ainda estiver alto
                        if (this.lcpScore > 2500) {
                            this.applyMobileEmergencyOptimizations();
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    /**
     * Aplicar otimizações de emergência para mobile
     */
    applyMobileEmergencyOptimizations() {
        console.log('🚨 Mobile LCP ainda alto, aplicando otimizações de emergência');
        
        // 1. Remover todas as animações em mobile
        const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
        
        // 2. Reduzir qualidade de imagens em conexões lentas
        if (this.connectionType.effectiveType === 'slow-2g' || this.connectionType.effectiveType === '2g') {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.src.includes('.webp')) {
                    img.src = img.src.replace('.webp', '.jpg');
                }
            });
        }
        
        // 3. Desabilitar elementos não essenciais em dispositivos lentos
        if (this.deviceCapabilities.isLowEnd) {
            const nonEssentialElements = document.querySelectorAll('.social-links, .tab-buttons');
            nonEssentialElements.forEach(el => {
                el.style.display = 'none';
            });
        }
        
        // 4. Simplificar layout em mobile
        const heroText = document.querySelector('.hero-text h1');
        if (heroText) {
            heroText.style.fontSize = '24px';
            heroText.style.lineHeight = '1.1';
        }
        
        const heroParagraph = document.querySelector('.hero-text p');
        if (heroParagraph) {
            heroParagraph.style.fontSize = '14px';
            heroParagraph.style.lineHeight = '1.3';
        }
    }

    /**
     * Otimizar recursos mobile
     */
    optimizeMobileResources() {
        // Preload apenas recursos essenciais para mobile
        const mobileCriticalResources = [
            'assets/images/mobile/bg-como-funciona.webp',
            'assets/images/Renov-Logo.webp'
        ];

        mobileCriticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'image';
            link.setAttribute('fetchpriority', 'high');
            document.head.appendChild(link);
        });
    }
}

// Inicializar otimizador mobile
document.addEventListener('DOMContentLoaded', () => {
    new MobileLCPOptimizer();
});

// Fallback para carregamento imediato
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MobileLCPOptimizer();
    });
} else {
    new MobileLCPOptimizer();
} 