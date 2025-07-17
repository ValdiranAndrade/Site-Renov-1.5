/**
 * Font Optimizer - Sistema Avançado de Otimização de Fontes
 * Implementa font-display: swap/optional para garantir texto visível e reduzir layout shifts
 */

class FontOptimizer {
    constructor() {
        this.fonts = new Map();
        this.loadedFonts = new Set();
        this.fallbackFonts = new Map();
        this.fontDisplayStrategy = 'swap'; // swap, optional, fallback, block
        this.preloadCriticalFonts = true;
        this.fontFaceObserver = null;
        
        this.init();
    }

    init() {
        // Configurar estratégias de font-display baseadas na criticidade
        this.setupFontDisplayStrategies();
        
        // Configurar fallbacks otimizados
        this.setupFallbackFonts();
        
        // Inicializar observador de fontes
        this.initFontFaceObserver();
        
        // Carregar fontes críticas
        this.loadCriticalFonts();
        
        // Configurar monitoramento de performance
        this.setupPerformanceMonitoring();
    }

    /**
     * Configurar estratégias de font-display baseadas na criticidade
     */
    setupFontDisplayStrategies() {
        // Estratégias por criticidade da fonte
        this.fontStrategies = {
            critical: {
                display: 'swap',
                preload: true,
                fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            },
            important: {
                display: 'swap',
                preload: false,
                fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            },
            decorative: {
                display: 'optional',
                preload: false,
                fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            },
            icon: {
                display: 'block',
                preload: true,
                fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }
        };
    }

    /**
     * Configurar fallbacks otimizados para reduzir layout shifts
     */
    setupFallbackFonts() {
        // Fallbacks otimizados por categoria
        this.fallbackFonts.set('sans-serif', {
            primary: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            metrics: {
                xHeight: 0.52,
                capHeight: 0.7,
                ascent: 0.9,
                descent: 0.2
            }
        });

        this.fallbackFonts.set('serif', {
            primary: 'Georgia, "Times New Roman", Times, serif',
            metrics: {
                xHeight: 0.48,
                capHeight: 0.68,
                ascent: 0.88,
                descent: 0.22
            }
        });

        this.fallbackFonts.set('monospace', {
            primary: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            metrics: {
                xHeight: 0.54,
                capHeight: 0.72,
                ascent: 0.92,
                descent: 0.18
            }
        });
    }

    /**
     * Inicializar observador de fontes para detectar carregamento
     */
    initFontFaceObserver() {
        if ('FontFaceObserver' in window) {
            this.fontFaceObserver = new FontFaceObserver('Montserrat');
        }
    }

    /**
     * Carregar fontes críticas com estratégia otimizada
     */
    loadCriticalFonts() {
        const criticalFonts = [
            {
                family: 'Montserrat',
                weight: 400,
                style: 'normal',
                src: 'assets/fonts/Montserrat-Regular.woff2',
                category: 'critical'
            },
            {
                family: 'Montserrat',
                weight: 500,
                style: 'normal',
                src: 'assets/fonts/Montserrat-Medium.woff2',
                category: 'important'
            }
        ];

        criticalFonts.forEach(font => {
            this.loadFont(font);
        });
    }

    /**
     * Carregar fonte com estratégia otimizada
     */
    loadFont(fontConfig) {
        const strategy = this.fontStrategies[fontConfig.category];
        
        // Criar @font-face com font-display otimizado
        const fontFace = new FontFace(
            fontConfig.family,
            `url(${fontConfig.src})`,
            {
                weight: fontConfig.weight,
                style: fontConfig.style,
                display: strategy.display
            }
        );

        // Adicionar fonte ao documento
        document.fonts.add(fontFace);

        // Monitorar carregamento
        fontFace.load().then(loadedFont => {
            this.loadedFonts.add(`${fontConfig.family}-${fontConfig.weight}-${fontConfig.style}`);
            this.onFontLoaded(fontConfig, loadedFont);
        }).catch(error => {
            console.warn(`Font loading failed: ${fontConfig.family}`, error);
            this.onFontLoadFailed(fontConfig);
        });

        // Preload se necessário
        if (strategy.preload) {
            this.preloadFont(fontConfig.src);
        }
    }

    /**
     * Preload de fonte crítica
     */
    preloadFont(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    /**
     * Callback quando fonte é carregada
     */
    onFontLoaded(fontConfig, loadedFont) {
        // Aplicar fonte carregada
        this.applyFont(fontConfig.family, fontConfig.weight, fontConfig.style);
        
        // Otimizar layout se necessário
        if (this.fontDisplayStrategy === 'swap') {
            this.optimizeLayoutAfterFontLoad(fontConfig);
        }
        
        // Disparar evento customizado
        this.dispatchFontEvent('fontloaded', fontConfig);
    }

    /**
     * Callback quando carregamento de fonte falha
     */
    onFontLoadFailed(fontConfig) {
        // Aplicar fallback
        const fallback = this.getFallbackFont(fontConfig.family);
        this.applyFallbackFont(fontConfig.family, fallback);
        
        // Disparar evento customizado
        this.dispatchFontEvent('fontfailed', fontConfig);
    }

    /**
     * Aplicar fonte carregada
     */
    applyFont(family, weight, style) {
        // Usar requestAnimationFrame para evitar layout thrashing
        requestAnimationFrame(() => {
            const elements = document.querySelectorAll(`[data-font-family="${family}"][data-font-weight="${weight}"]`);
            elements.forEach(element => {
                element.style.fontFamily = family;
                element.style.fontWeight = weight;
                element.style.fontStyle = style;
            });
        });
    }

    /**
     * Otimizar layout após carregamento de fonte
     */
    optimizeLayoutAfterFontLoad(fontConfig) {
        // Medir e ajustar layout se necessário
        const elements = document.querySelectorAll(`[data-font-family="${fontConfig.family}"]`);
        
        elements.forEach(element => {
            // Verificar se há mudança significativa no layout
            const beforeHeight = element.offsetHeight;
            const beforeWidth = element.offsetWidth;
            
            // Aplicar fonte
            element.style.fontFamily = fontConfig.family;
            
            // Medir após aplicação
            requestAnimationFrame(() => {
                const afterHeight = element.offsetHeight;
                const afterWidth = element.offsetWidth;
                
                // Se houve mudança significativa, otimizar
                if (Math.abs(afterHeight - beforeHeight) > 2 || Math.abs(afterWidth - beforeWidth) > 2) {
                    this.minimizeLayoutShift(element, beforeHeight, beforeWidth, afterHeight, afterWidth);
                }
            });
        });
    }

    /**
     * Minimizar layout shift após carregamento de fonte
     */
    minimizeLayoutShift(element, beforeHeight, beforeWidth, afterHeight, afterWidth) {
        // Calcular diferenças
        const heightDiff = afterHeight - beforeHeight;
        const widthDiff = afterWidth - beforeWidth;
        
        // Aplicar compensação temporária
        if (heightDiff !== 0) {
            element.style.minHeight = `${beforeHeight}px`;
            element.style.transition = 'min-height 0.3s ease-out';
            
            // Remover compensação após transição
            setTimeout(() => {
                element.style.minHeight = '';
                element.style.transition = '';
            }, 300);
        }
        
        if (widthDiff !== 0) {
            element.style.minWidth = `${beforeWidth}px`;
            element.style.transition = 'min-width 0.3s ease-out';
            
            setTimeout(() => {
                element.style.minWidth = '';
                element.style.transition = '';
            }, 300);
        }
    }

    /**
     * Obter fallback otimizado
     */
    getFallbackFont(family) {
        // Determinar categoria da fonte
        if (family.toLowerCase().includes('serif')) {
            return this.fallbackFonts.get('serif');
        } else if (family.toLowerCase().includes('mono')) {
            return this.fallbackFonts.get('monospace');
        } else {
            return this.fallbackFonts.get('sans-serif');
        }
    }

    /**
     * Aplicar fallback com métricas otimizadas
     */
    applyFallbackFont(family, fallback) {
        const elements = document.querySelectorAll(`[data-font-family="${family}"]`);
        
        elements.forEach(element => {
            element.style.fontFamily = fallback.primary;
            
            // Aplicar métricas otimizadas para reduzir layout shift
            if (fallback.metrics) {
                element.style.fontSizeAdjust = fallback.metrics.xHeight;
                element.style.lineHeight = '1.2'; // Ajustar line-height para fallback
            }
        });
    }

    /**
     * Configurar monitoramento de performance
     */
    setupPerformanceMonitoring() {
        // Monitorar layout shifts causados por fontes
        if ('PerformanceObserver' in window) {
            const layoutShiftObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.sources && entry.sources.some(source => source.node && source.node.tagName === 'FONT')) {
                        console.warn('Font-related layout shift detected:', entry);
                        this.handleFontLayoutShift(entry);
                    }
                });
            });
            
            layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
        }

        // Monitorar carregamento de fontes
        document.fonts.ready.then(() => {
            console.log('All fonts loaded');
            this.onAllFontsLoaded();
        });
    }

    /**
     * Lidar com layout shift causado por fontes
     */
    handleFontLayoutShift(entry) {
        entry.sources.forEach(source => {
            if (source.node && source.node.tagName === 'FONT') {
                // Marcar elemento para otimização
                source.node.classList.add('font-layout-shift');
                
                // Aplicar otimizações
                this.optimizeFontElement(source.node);
            }
        });
    }

    /**
     * Otimizar elemento com problema de layout
     */
    optimizeFontElement(element) {
        // Aplicar estratégias de otimização
        element.style.fontDisplay = 'swap';
        element.style.fontSizeAdjust = '0.52'; // Ajustar para fallback
        
        // Usar transform para evitar layout shift
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'font-family';
    }

    /**
     * Callback quando todas as fontes são carregadas
     */
    onAllFontsLoaded() {
        // Remover classes de loading
        document.body.classList.remove('fonts-loading');
        document.body.classList.add('fonts-loaded');
        
        // Otimizar performance
        this.optimizeAfterFontLoad();
    }

    /**
     * Otimizações após carregamento de todas as fontes
     */
    optimizeAfterFontLoad() {
        // Remover preloads desnecessários
        const preloadLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
        preloadLinks.forEach(link => {
            link.remove();
        });
        
        // Otimizar CSS
        this.optimizeFontCSS();
    }

    /**
     * Otimizar CSS relacionado a fontes
     */
    optimizeFontCSS() {
        // Adicionar CSS otimizado para fontes carregadas
        const style = document.createElement('style');
        style.textContent = `
            .fonts-loaded {
                font-display: swap;
            }
            
            .fonts-loaded * {
                font-display: swap;
            }
            
            /* Otimizações para fontes carregadas */
            .fonts-loaded .hero-text h1,
            .fonts-loaded .hero-text p {
                font-display: swap;
                font-synthesis: none;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Disparar evento customizado
     */
    dispatchFontEvent(type, fontConfig) {
        const event = new CustomEvent('fontoptimizer', {
            detail: {
                type: type,
                font: fontConfig,
                timestamp: performance.now()
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * API pública para carregar fontes
     */
    loadFontAsync(fontConfig) {
        return new Promise((resolve, reject) => {
            const font = this.loadFont(fontConfig);
            
            // Escutar eventos
            const handleFontEvent = (event) => {
                if (event.detail.font === fontConfig) {
                    document.removeEventListener('fontoptimizer', handleFontEvent);
                    
                    if (event.detail.type === 'fontloaded') {
                        resolve(event.detail.font);
                    } else {
                        reject(new Error('Font loading failed'));
                    }
                }
            };
            
            document.addEventListener('fontoptimizer', handleFontEvent);
        });
    }

    /**
     * Verificar se fonte está carregada
     */
    isFontLoaded(family, weight = 400, style = 'normal') {
        const key = `${family}-${weight}-${style}`;
        return this.loadedFonts.has(key);
    }

    /**
     * Obter estatísticas de carregamento
     */
    getFontStats() {
        return {
            totalFonts: this.fonts.size,
            loadedFonts: this.loadedFonts.size,
            loadingProgress: (this.loadedFonts.size / this.fonts.size) * 100
        };
    }
}

// Inicializar otimizador quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.fontOptimizer = new FontOptimizer();
    });
} else {
    window.fontOptimizer = new FontOptimizer();
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FontOptimizer;
} 