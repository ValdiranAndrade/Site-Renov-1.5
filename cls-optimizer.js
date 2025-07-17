/**
 * CLS Optimizer - Sistema Completo para Otimizar Cumulative Layout Shift
 * Baseado nas melhores práticas do web.dev: https://web.dev/cls/
 * 
 * Objetivo: Reduzir CLS de 0.324 para < 0.1
 */

class CLSOptimizer {
    constructor() {
        this.clsScore = 0;
        this.layoutShifts = [];
        this.optimizations = new Map();
        this.isOptimized = false;
        this.observer = null;
        this.initialized = false;
        
        this.init();
    }

    /**
     * Inicializar otimizador
     */
    init() {
        if (this.initialized) return;
        
        console.log('🚀 Iniciando CLS Optimizer...');
        
        // Aplicar otimizações imediatas
        this.applyImmediateOptimizations();
        
        // Configurar monitoramento
        this.setupCLSMonitoring();
        
        // Aplicar otimizações preventivas
        this.applyPreventiveOptimizations();
        
        // Configurar otimizações adaptativas
        this.setupAdaptiveOptimizations();
        
        this.initialized = true;
        console.log('✅ CLS Optimizer inicializado');
    }

    /**
     * Aplicar otimizações imediatas
     */
    applyImmediateOptimizations() {
        // 1. Definir dimensões fixas para elementos críticos
        this.setFixedDimensions();
        
        // 2. Otimizar imagens para evitar layout shifts
        this.optimizeImages();
        
        // 3. Otimizar fontes para evitar layout shifts
        this.optimizeFonts();
        
        // 4. Otimizar vídeos e mídia
        this.optimizeMedia();
        
        // 5. Otimizar formulários
        this.optimizeForms();
        
        // 6. Otimizar elementos dinâmicos
        this.optimizeDynamicElements();
    }

    /**
     * Definir dimensões fixas para elementos críticos
     */
    setFixedDimensions() {
        const criticalElements = {
            '.logo img': { width: '160px', height: '40px' },
            '.hero': { height: '140vh', width: '100vw' },
            '.video-bg': { width: '100vw', height: '100%' },
            '.social-links': { height: 'auto', minHeight: '40px' },
            '.header-content': { height: '80px', minHeight: '80px' },
            '.tab-btn': { height: '40px', minHeight: '40px' },
            '.btn': { height: '48px', minHeight: '48px' },
            'input, textarea, select': { height: '48px', minHeight: '48px' }
        };

        Object.entries(criticalElements).forEach(([selector, dimensions]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                Object.entries(dimensions).forEach(([property, value]) => {
                    element.style[property] = value;
                });
            });
        });

        // Adicionar CSS crítico inline
        const criticalCSS = `
            <style id="cls-critical-css">
            /* CLS Critical CSS - Fixed Dimensions */
            .logo img { width: 160px !important; height: 40px !important; object-fit: contain !important; }
            .hero { height: 140vh !important; width: 100vw !important; }
            .video-bg { width: 100vw !important; height: 100% !important; }
            .social-links { height: auto !important; min-height: 40px !important; }
            .header-content { height: 80px !important; min-height: 80px !important; }
            .tab-btn { height: 40px !important; min-height: 40px !important; }
            .btn { height: 48px !important; min-height: 48px !important; }
            input, textarea, select { height: 48px !important; min-height: 48px !important; }
            
            /* Prevent layout shifts */
            img { max-width: 100% !important; height: auto !important; display: block !important; }
            video { max-width: 100% !important; height: auto !important; }
            iframe { max-width: 100% !important; height: auto !important; }
            
            /* Font optimization */
            * { font-display: swap !important; }
            
            /* Container optimization */
            .container, .wrapper, .section { width: 100% !important; box-sizing: border-box !important; }
            </style>
        `;

        if (!document.getElementById('cls-critical-css')) {
            document.head.insertAdjacentHTML('afterbegin', criticalCSS);
        }
    }

    /**
     * Otimizar imagens para evitar layout shifts
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Definir aspect ratio se não estiver definido
            if (!img.style.aspectRatio && img.naturalWidth && img.naturalHeight) {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                img.style.aspectRatio = aspectRatio.toString();
            }
            
            // Garantir que imagens tenham dimensões
            if (!img.width && !img.height) {
                img.style.width = '100%';
                img.style.height = 'auto';
            }
            
            // Adicionar loading lazy para imagens não críticas
            if (!img.hasAttribute('data-critical') && !img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
            
            // Prevenir layout shifts com placeholder
            if (!img.src && !img.style.backgroundColor) {
                img.style.backgroundColor = '#f0f0f0';
                img.style.minHeight = '200px';
            }
        });
    }

    /**
     * Otimizar fontes para evitar layout shifts
     */
    optimizeFonts() {
        // Configurar font-display: swap para todas as fontes
        const fontFaces = document.querySelectorAll('@font-face');
        fontFaces.forEach(fontFace => {
            if (!fontFace.style.fontDisplay) {
                fontFace.style.fontDisplay = 'swap';
            }
        });

        // Adicionar fallback fonts com métricas similares
        const fontFallbacks = {
            'Montserrat': 'Arial, sans-serif',
            'Arial': 'Helvetica, sans-serif',
            'Times': 'Georgia, serif'
        };

        Object.entries(fontFallbacks).forEach(([font, fallback]) => {
            const elements = document.querySelectorAll(`[style*="${font}"]`);
            elements.forEach(element => {
                const currentFont = element.style.fontFamily;
                if (currentFont && currentFont.includes(font)) {
                    element.style.fontFamily = `${currentFont}, ${fallback}`;
                }
            });
        });
    }

    /**
     * Otimizar vídeos e mídia
     */
    optimizeMedia() {
        const videos = document.querySelectorAll('video');
        const iframes = document.querySelectorAll('iframe');
        
        videos.forEach(video => {
            // Definir dimensões fixas
            if (!video.width && !video.height) {
                video.style.width = '100%';
                video.style.height = 'auto';
            }
            
            // Preload metadata para evitar layout shifts
            if (!video.hasAttribute('preload')) {
                video.preload = 'metadata';
            }
        });
        
        iframes.forEach(iframe => {
            // Definir aspect ratio para iframes
            if (!iframe.style.aspectRatio) {
                iframe.style.aspectRatio = '16/9';
            }
        });
    }

    /**
     * Otimizar formulários
     */
    optimizeForms() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Definir altura fixa
            input.style.height = '48px';
            input.style.minHeight = '48px';
            
            // Prevenir zoom em mobile
            if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
                input.style.fontSize = '16px';
            }
            
            // Adicionar padding consistente
            input.style.padding = '12px 16px';
            input.style.boxSizing = 'border-box';
        });
    }

    /**
     * Otimizar elementos dinâmicos
     */
    optimizeDynamicElements() {
        // Observar mudanças no DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.optimizeNewElement(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Otimizar novo elemento adicionado
     */
    optimizeNewElement(element) {
        // Se for imagem
        if (element.tagName === 'IMG') {
            this.optimizeImages();
        }
        
        // Se for vídeo
        if (element.tagName === 'VIDEO') {
            this.optimizeMedia();
        }
        
        // Se for formulário
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
            this.optimizeForms();
        }
    }

    /**
     * Configurar monitoramento de CLS
     */
    setupCLSMonitoring() {
        if (!('PerformanceObserver' in window)) {
            console.warn('PerformanceObserver não suportado');
            return;
        }

        this.observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                    this.handleLayoutShift(entry);
                }
            });
        });

        this.observer.observe({ entryTypes: ['layout-shift'] });
        
        // Calcular CLS final
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.calculateFinalCLS();
            }, 1000);
        });
    }

    /**
     * Lidar com layout shift detectado
     */
    handleLayoutShift(entry) {
        this.layoutShifts.push(entry);
        
        // Se o layout shift for significativo (> 0.1)
        if (entry.value > 0.1) {
            console.warn('Layout shift significativo detectado:', entry);
            this.optimizeLayoutShift(entry);
        }
        
        // Calcular CLS atual
        this.calculateCurrentCLS();
    }

    /**
     * Otimizar layout shift específico
     */
    optimizeLayoutShift(entry) {
        entry.sources.forEach((source) => {
            if (source.node) {
                // Marcar elemento problemático
                source.node.classList.add('cls-problematic');
                
                // Aplicar otimizações específicas
                this.applyElementOptimizations(source.node);
                
                // Remover marcação após um tempo
                setTimeout(() => {
                    source.node.classList.remove('cls-problematic');
                }, 2000);
            }
        });
    }

    /**
     * Aplicar otimizações específicas para elemento
     */
    applyElementOptimizations(element) {
        // Se for imagem
        if (element.tagName === 'IMG') {
            element.style.width = element.offsetWidth + 'px';
            element.style.height = element.offsetHeight + 'px';
            element.style.objectFit = 'cover';
        }
        
        // Se for container
        if (element.classList.contains('container') || element.classList.contains('wrapper')) {
            element.style.width = '100%';
            element.style.boxSizing = 'border-box';
        }
        
        // Se for texto
        if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'P') {
            element.style.lineHeight = '1.2';
            element.style.margin = '0';
            element.style.padding = '0';
        }
    }

    /**
     * Calcular CLS atual
     */
    calculateCurrentCLS() {
        let cls = 0;
        let lastEntryTime = 0;
        
        this.layoutShifts.forEach((entry) => {
            if (entry.hadRecentInput) return;
            
            if (entry.startTime - lastEntryTime > 1000) {
                cls = 0;
            }
            
            cls += entry.value;
            lastEntryTime = entry.startTime;
        });
        
        this.clsScore = cls;
        console.log(`CLS atual: ${cls.toFixed(3)}`);
        
        // Se CLS estiver alto, aplicar otimizações adicionais
        if (cls > 0.1) {
            this.applyAdditionalOptimizations();
        }
    }

    /**
     * Calcular CLS final
     */
    calculateFinalCLS() {
        this.calculateCurrentCLS();
        console.log(`CLS final: ${this.clsScore.toFixed(3)}`);
        
        // Salvar métricas
        this.saveMetrics();
    }

    /**
     * Aplicar otimizações adicionais
     */
    applyAdditionalOptimizations() {
        // Forçar hardware acceleration
        const criticalElements = document.querySelectorAll('.hero, .video-bg, .logo, .header-content');
        criticalElements.forEach(element => {
            element.style.transform = 'translateZ(0)';
            element.style.backfaceVisibility = 'hidden';
        });
        
        // Otimizar animações
        const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }

    /**
     * Aplicar otimizações preventivas
     */
    applyPreventiveOptimizations() {
        // Prevenir layout shifts em carregamento de fontes
        document.fonts.ready.then(() => {
            this.optimizeLayoutAfterFontLoad();
        });
        
        // Prevenir layout shifts em carregamento de imagens
        window.addEventListener('load', () => {
            this.optimizeLayoutAfterImageLoad();
        });
    }

    /**
     * Otimizar layout após carregamento de fontes
     */
    optimizeLayoutAfterFontLoad() {
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
        textElements.forEach(element => {
            // Garantir que elementos de texto tenham altura mínima
            if (element.offsetHeight === 0) {
                element.style.minHeight = '1.2em';
                element.style.lineHeight = '1.2';
            }
        });
    }

    /**
     * Otimizar layout após carregamento de imagens
     */
    optimizeLayoutAfterImageLoad() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                // Garantir que imagem mantenha suas dimensões
                if (img.naturalWidth && img.naturalHeight) {
                    const aspectRatio = img.naturalWidth / img.naturalHeight;
                    img.style.aspectRatio = aspectRatio.toString();
                }
            });
        });
    }

    /**
     * Configurar otimizações adaptativas
     */
    setupAdaptiveOptimizations() {
        // Otimizações baseadas no tipo de dispositivo
        if (window.innerWidth <= 768) {
            this.applyMobileOptimizations();
        }
        
        // Otimizações baseadas na velocidade da conexão
        if ('connection' in navigator) {
            if (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g') {
                this.applySlowConnectionOptimizations();
            }
        }
    }

    /**
     * Aplicar otimizações para mobile
     */
    applyMobileOptimizations() {
        // Reduzir animações em mobile
        const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
        animatedElements.forEach(element => {
            element.style.animationDuration = '0.15s';
            element.style.transitionDuration = '0.15s';
        });
        
        // Otimizar viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }

    /**
     * Aplicar otimizações para conexão lenta
     */
    applySlowConnectionOptimizations() {
        // Desabilitar animações não essenciais
        const nonEssentialAnimations = document.querySelectorAll('.fade-in, .slide-in, .bounce');
        nonEssentialAnimations.forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
        });
        
        // Reduzir qualidade de imagens
        const images = document.querySelectorAll('img[src*="high-quality"]');
        images.forEach(img => {
            img.src = img.src.replace('high-quality', 'low-quality');
        });
    }

    /**
     * Salvar métricas
     */
    saveMetrics() {
        const metrics = {
            cls: this.clsScore,
            layoutShifts: this.layoutShifts.length,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
        
        // Salvar no localStorage para análise
        localStorage.setItem('cls-metrics', JSON.stringify(metrics));
        
        // Enviar para analytics se disponível
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cls_measurement', {
                value: this.clsScore,
                custom_parameter: metrics
            });
        }
    }

    /**
     * Obter estatísticas de otimização
     */
    getOptimizationStats() {
        return {
            clsScore: this.clsScore,
            layoutShifts: this.layoutShifts.length,
            isOptimized: this.isOptimized,
            optimizations: Array.from(this.optimizations.keys())
        };
    }

    /**
     * Destruir otimizador
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Remover CSS crítico
        const criticalCSS = document.getElementById('cls-critical-css');
        if (criticalCSS) {
            criticalCSS.remove();
        }
        
        this.initialized = false;
        console.log('CLS Optimizer destruído');
    }
}

// Inicializar otimizador quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.clsOptimizer = new CLSOptimizer();
    });
} else {
    window.clsOptimizer = new CLSOptimizer();
}

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CLSOptimizer;
} 