/**
 * LCP & Speed Index Optimizer - Sistema Avançado de Otimização
 * Foca especificamente no Largest Contentful Paint e Speed Index
 */

class LCPSpeedOptimizer {
    constructor() {
        this.lcpElement = null;
        this.lcpScore = 0;
        this.speedIndex = 0;
        this.optimizations = new Map();
        this.isOptimized = false;
        this.deviceType = this.detectDevice();
        this.connectionSpeed = this.detectConnection();
        
        this.init();
    }

    init() {
        // Configurar otimizações específicas para LCP
        this.setupLCPOptimizations();
        
        // Configurar otimizações para Speed Index
        this.setupSpeedIndexOptimizations();
        
        // Aplicar otimizações imediatas
        this.applyImmediateOptimizations();
        
        // Configurar monitoramento
        this.setupMonitoring();
        
        // Otimizações progressivas
        this.applyProgressiveOptimizations();
    }

    /**
     * Detectar tipo de dispositivo
     */
    detectDevice() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return 'mobile';
        } else if (/iPad|Android.*Tablet/i.test(navigator.userAgent)) {
            return 'tablet';
        }
        return 'desktop';
    }

    /**
     * Detectar velocidade de conexão
     */
    detectConnection() {
        if ('connection' in navigator) {
            return navigator.connection.effectiveType || 'fast';
        }
        return 'fast';
    }

    /**
     * Configurar otimizações específicas para LCP
     */
    setupLCPOptimizations() {
        this.lcpOptimizations = {
            // Otimizações de imagem
            imageOptimizations: {
                preloadHeroImage: true,
                optimizeImageFormat: true,
                responsiveImages: true,
                imageCompression: true,
                lazyLoadNonCritical: true
            },
            
            // Otimizações de fonte
            fontOptimizations: {
                preloadCriticalFonts: true,
                fontDisplaySwap: true,
                fontSynthesis: false,
                fontPreload: true
            },
            
            // Otimizações de CSS
            cssOptimizations: {
                criticalCSSInline: true,
                deferNonCriticalCSS: true,
                optimizeSelectors: true,
                reduceLayoutShifts: true
            },
            
            // Otimizações de JavaScript
            jsOptimizations: {
                deferNonCriticalJS: true,
                optimizeScriptLoading: true,
                removeRenderBlocking: true
            }
        };
    }

    /**
     * Configurar otimizações para Speed Index
     */
    setupSpeedIndexOptimizations() {
        this.speedIndexOptimizations = {
            // Otimizações de renderização
            renderingOptimizations: {
                optimizePaintOrder: true,
                reduceRepaints: true,
                optimizeAnimations: true,
                hardwareAcceleration: true
            },
            
            // Otimizações de layout
            layoutOptimizations: {
                reduceLayoutThrashing: true,
                optimizeFlexbox: true,
                optimizeGrid: true,
                minimizeReflows: true
            },
            
            // Otimizações de conteúdo
            contentOptimizations: {
                prioritizeAboveFold: true,
                optimizeTextRendering: true,
                reduceContentShifts: true,
                optimizeSpacing: true
            }
        };
    }

    /**
     * Aplicar otimizações imediatas
     */
    applyImmediateOptimizations() {
        // Otimizar LCP imediatamente
        this.optimizeLCP();
        
        // Otimizar Speed Index
        this.optimizeSpeedIndex();
        
        // Marcar como otimizado
        this.isOptimized = true;
    }

    /**
     * Otimizar Largest Contentful Paint
     */
    optimizeLCP() {
        // 1. Identificar e otimizar elemento LCP
        this.identifyAndOptimizeLCPElement();
        
        // 2. Otimizar imagens críticas
        this.optimizeCriticalImages();
        
        // 3. Otimizar fontes críticas
        this.optimizeCriticalFonts();
        
        // 4. Otimizar CSS crítico
        this.optimizeCriticalCSS();
        
        // 5. Otimizar carregamento de recursos
        this.optimizeResourceLoading();
    }

    /**
     * Identificar e otimizar elemento LCP
     */
    identifyAndOptimizeLCPElement() {
        // Identificar provável elemento LCP
        const lcpCandidates = [
            '.hero-text h1',
            '.hero img',
            '.logo img',
            '.main-content img',
            'h1',
            'img[src*="hero"]',
            'img[src*="logo"]'
        ];

        for (const selector of lcpCandidates) {
            const element = document.querySelector(selector);
            if (element) {
                this.lcpElement = element;
                this.optimizeLCPElement(element);
                break;
            }
        }
    }

    /**
     * Otimizar elemento LCP específico
     */
    optimizeLCPElement(element) {
        if (element.tagName === 'IMG') {
            this.optimizeLCPImage(element);
        } else if (element.tagName === 'H1' || element.tagName === 'H2') {
            this.optimizeLCPText(element);
        }
    }

    /**
     * Otimizar imagem LCP
     */
    optimizeLCPImage(img) {
        // Configurar loading otimizado
        img.loading = 'eager';
        img.fetchpriority = 'high';
        img.decoding = 'sync';
        
        // Adicionar preload se não existir
        if (!document.querySelector(`link[href="${img.src}"]`)) {
            this.addImagePreload(img.src);
        }
        
        // Otimizar formato se necessário
        this.optimizeImageFormat(img);
        
        // Adicionar srcset responsivo
        this.addResponsiveSrcset(img);
        
        // Configurar tamanhos otimizados
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.maxWidth = '100%';
        
        // Marcar como otimizado
        img.setAttribute('data-lcp-optimized', 'true');
    }

    /**
     * Otimizar texto LCP
     */
    optimizeLCPText(textElement) {
        // Garantir que a fonte está carregada
        this.ensureFontLoaded(textElement);
        
        // Otimizar renderização
        textElement.style.fontSynthesis = 'none';
        textElement.style.textRendering = 'optimizeSpeed';
        
        // Reduzir layout shifts
        textElement.style.lineHeight = '1.2';
        textElement.style.margin = '0';
        textElement.style.padding = '0';
        
        // Marcar como otimizado
        textElement.setAttribute('data-lcp-optimized', 'true');
    }

    /**
     * Adicionar preload de imagem
     */
    addImagePreload(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        link.type = this.getImageType(src);
        link.setAttribute('fetchpriority', 'high');
        link.setAttribute('data-lcp-critical', 'true');
        document.head.insertBefore(link, document.head.firstChild);
    }

    /**
     * Obter tipo de imagem
     */
    getImageType(src) {
        if (src.includes('.webp')) return 'image/webp';
        if (src.includes('.png')) return 'image/png';
        if (src.includes('.jpg') || src.includes('.jpeg')) return 'image/jpeg';
        if (src.includes('.svg')) return 'image/svg+xml';
        return 'image/webp';
    }

    /**
     * Otimizar formato de imagem
     */
    optimizeImageFormat(img) {
        const src = img.src;
        
        // Converter para WebP se possível
        if (!src.includes('.webp') && !src.includes('.svg')) {
            const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
            
            // Verificar se WebP é suportado
            if (this.supportsWebP()) {
                img.src = webpSrc;
            }
        }
    }

    /**
     * Verificar suporte a WebP
     */
    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    /**
     * Adicionar srcset responsivo
     */
    addResponsiveSrcset(img) {
        const baseSrc = img.src;
        const baseName = baseSrc.replace(/\.(webp|png|jpg|jpeg)$/, '');
        const extension = baseSrc.match(/\.(webp|png|jpg|jpeg)$/)?.[1] || 'webp';
        
        // Gerar srcset baseado no dispositivo
        let srcset = '';
        let sizes = '';
        
        if (this.deviceType === 'mobile') {
            srcset = `${baseName}-mobile.${extension} 480w, ${baseSrc} 768w`;
            sizes = '(max-width: 480px) 480px, 768px';
        } else if (this.deviceType === 'tablet') {
            srcset = `${baseName}-tablet.${extension} 768w, ${baseSrc} 1024w`;
            sizes = '(max-width: 768px) 768px, 1024px';
        } else {
            srcset = `${baseName}-desktop.${extension} 1024w, ${baseSrc} 1200w`;
            sizes = '(max-width: 1024px) 1024px, 1200px';
        }
        
        img.srcset = srcset;
        img.sizes = sizes;
    }

    /**
     * Garantir que fonte está carregada
     */
    ensureFontLoaded(element) {
        const fontFamily = getComputedStyle(element).fontFamily;
        
        if (fontFamily.includes('Montserrat')) {
            // Preload da fonte crítica
            this.preloadCriticalFont('assets/fonts/Montserrat-Regular.woff2');
        }
    }

    /**
     * Preload de fonte crítica
     */
    preloadCriticalFont(fontUrl) {
        if (!document.querySelector(`link[href="${fontUrl}"]`)) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = fontUrl;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.setAttribute('data-lcp-critical', 'true');
            document.head.insertBefore(link, document.head.firstChild);
        }
    }

    /**
     * Otimizar imagens críticas
     */
    optimizeCriticalImages() {
        const criticalImages = document.querySelectorAll('img[src*="logo"], img[src*="hero"], img[src*="main"]');
        
        criticalImages.forEach(img => {
            if (!img.hasAttribute('data-lcp-optimized')) {
                this.optimizeLCPImage(img);
            }
        });
    }

    /**
     * Otimizar fontes críticas
     */
    optimizeCriticalFonts() {
        // Adicionar CSS para font-display otimizado
        const fontCSS = `
        @font-face {
            font-family: 'Montserrat';
            src: url('assets/fonts/Montserrat-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
            font-synthesis: none;
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        `;

        const style = document.createElement('style');
        style.textContent = fontCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    /**
     * Otimizar CSS crítico
     */
    optimizeCriticalCSS() {
        // CSS crítico específico para LCP
        const criticalCSS = `
        /* LCP Critical CSS */
        .hero-text h1 {
            font-size: 48px;
            line-height: 1.05;
            margin-bottom: 24px;
            color: #fff;
            font-weight: 700;
            text-align: left;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-display: swap;
        }
        
        .logo img {
            width: 160px;
            height: 40px;
            object-fit: contain;
            display: block;
            max-width: 100%;
            height: auto;
        }
        
        .hero {
            position: relative;
            width: 100vw;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            height: 140vh;
            display: flex;
            align-items: flex-start;
            overflow: hidden;
            margin-top: 0 !important;
            margin-bottom: -350px;
            background: #000;
        }
        
        .hero-content {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 5%;
            margin-top: 300px;
        }
        
        @media (max-width: 768px) {
            .hero {
                height: 100vh;
                margin-bottom: 0;
                min-height: 600px;
            }
            
            .hero-content {
                margin-top: 120px;
                padding: 0 20px;
                z-index: 2;
            }
            
            .hero-text h1 {
                font-size: 32px;
                line-height: 1.1;
            }
            
            .logo img {
                width: 120px;
                height: 30px;
            }
        }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        style.setAttribute('data-lcp-critical', 'true');
        document.head.insertBefore(style, document.head.firstChild);
    }

    /**
     * Otimizar carregamento de recursos
     */
    optimizeResourceLoading() {
        // Defer CSS não crítico
        this.deferNonCriticalCSS();
        
        // Defer JavaScript não crítico
        this.deferNonCriticalJS();
        
        // Otimizar carregamento de fontes externas
        this.optimizeExternalFonts();
    }

    /**
     * Defer CSS não crítico
     */
    deferNonCriticalCSS() {
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-lcp-critical])');
        
        nonCriticalCSS.forEach(link => {
            link.rel = 'preload';
            link.as = 'style';
            link.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
        });
    }

    /**
     * Defer JavaScript não crítico
     */
    deferNonCriticalJS() {
        const nonCriticalJS = document.querySelectorAll('script[src]:not([defer]):not([async]):not([data-lcp-critical])');
        
        nonCriticalJS.forEach(script => {
            script.defer = true;
        });
    }

    /**
     * Otimizar fontes externas
     */
    optimizeExternalFonts() {
        const externalFonts = document.querySelectorAll('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]');
        
        externalFonts.forEach(link => {
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
        });
    }

    /**
     * Otimizar Speed Index
     */
    optimizeSpeedIndex() {
        // 1. Otimizar ordem de pintura
        this.optimizePaintOrder();
        
        // 2. Reduzir reflows e repaints
        this.reduceReflowsAndRepaints();
        
        // 3. Otimizar animações
        this.optimizeAnimations();
        
        // 4. Configurar aceleração de hardware
        this.setupHardwareAcceleration();
        
        // 5. Otimizar layout
        this.optimizeLayout();
    }

    /**
     * Otimizar ordem de pintura
     */
    optimizePaintOrder() {
        // Configurar paint-order para elementos críticos
        const criticalElements = document.querySelectorAll('.hero, .hero-text, .logo, h1, h2');
        
        criticalElements.forEach(element => {
            element.style.paintOrder = 'fill stroke markers';
            element.style.willChange = 'auto';
        });
    }

    /**
     * Reduzir reflows e repaints
     */
    reduceReflowsAndRepaints() {
        // Batch DOM operations
        const observer = new MutationObserver((mutations) => {
            let hasLayoutChanges = false;
            
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                    hasLayoutChanges = true;
                }
            });
            
            if (hasLayoutChanges) {
                // Forçar reflow apenas uma vez
                requestAnimationFrame(() => {
                    document.body.offsetHeight; // Force reflow
                });
            }
        });
        
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['style', 'class']
        });
    }

    /**
     * Otimizar animações
     */
    optimizeAnimations() {
        // Configurar animações para usar transform e opacity
        const animatedElements = document.querySelectorAll('.animate, [class*="fade"], [class*="slide"]');
        
        animatedElements.forEach(element => {
            element.style.transform = 'translateZ(0)';
            element.style.backfaceVisibility = 'hidden';
            element.style.perspective = '1000px';
        });
    }

    /**
     * Configurar aceleração de hardware
     */
    setupHardwareAcceleration() {
        // Aplicar aceleração de hardware para elementos críticos
        const criticalElements = document.querySelectorAll('.hero, .hero-text, .logo, .header-content');
        
        criticalElements.forEach(element => {
            element.style.transform = 'translateZ(0)';
            element.style.backfaceVisibility = 'hidden';
            element.style.perspective = '1000px';
            element.style.willChange = 'transform';
        });
    }

    /**
     * Otimizar layout
     */
    optimizeLayout() {
        // Configurar layout otimizado
        const layoutElements = document.querySelectorAll('.container, .content, .section');
        
        layoutElements.forEach(element => {
            element.style.contain = 'layout style paint';
            element.style.contentVisibility = 'auto';
        });
    }

    /**
     * Aplicar otimizações progressivas
     */
    applyProgressiveOptimizations() {
        // Otimizações após carregamento inicial
        window.addEventListener('load', () => {
            this.applyPostLoadOptimizations();
        });
        
        // Otimizações após interação do usuário
        document.addEventListener('DOMContentLoaded', () => {
            this.applyPostDOMOptimizations();
        });
    }

    /**
     * Aplicar otimizações pós-carregamento
     */
    applyPostLoadOptimizations() {
        // Lazy load imagens não críticas
        this.lazyLoadNonCriticalImages();
        
        // Otimizar animações não críticas
        this.optimizeNonCriticalAnimations();
        
        // Configurar intersection observer para otimizações
        this.setupIntersectionObserver();
    }

    /**
     * Lazy load imagens não críticas
     */
    lazyLoadNonCriticalImages() {
        const nonCriticalImages = document.querySelectorAll('img:not([data-lcp-optimized])');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.loading = 'lazy';
                        img.decoding = 'async';
                        observer.unobserve(img);
                    }
                });
            });
            
            nonCriticalImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Otimizar animações não críticas
     */
    optimizeNonCriticalAnimations() {
        const nonCriticalAnimations = document.querySelectorAll('.animate:not([data-lcp-optimized])');
        
        nonCriticalAnimations.forEach(element => {
            element.style.animationDelay = '0.1s';
            element.style.animationFillMode = 'both';
        });
    }

    /**
     * Configurar intersection observer
     */
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Otimizar elemento quando visível
                        this.optimizeVisibleElement(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            // Observar elementos que podem ser otimizados
            const optimizableElements = document.querySelectorAll('.section, .card, .feature');
            optimizableElements.forEach(element => {
                observer.observe(element);
            });
        }
    }

    /**
     * Otimizar elemento visível
     */
    optimizeVisibleElement(element) {
        // Aplicar otimizações específicas para elementos visíveis
        element.style.contentVisibility = 'auto';
        element.style.contain = 'layout style paint';
    }

    /**
     * Aplicar otimizações pós-DOM
     */
    applyPostDOMOptimizations() {
        // Otimizar formulários
        this.optimizeForms();
        
        // Otimizar tabs
        this.optimizeTabs();
        
        // Otimizar modais
        this.optimizeModals();
    }

    /**
     * Otimizar formulários
     */
    optimizeForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Prevenir layout thrashing em formulários
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.transform = 'translateZ(0)';
                });
            });
        });
    }

    /**
     * Otimizar tabs
     */
    optimizeTabs() {
        const tabButtons = document.querySelectorAll('[data-tab]');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Usar requestAnimationFrame para otimizar mudanças
                requestAnimationFrame(() => {
                    this.switchTab(button);
                });
            });
        });
    }

    /**
     * Trocar tab otimizado
     */
    switchTab(button) {
        const targetId = button.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);
        
        if (targetContent) {
            // Esconder todos os conteúdos
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Mostrar conteúdo alvo
            targetContent.style.display = 'block';
            
            // Atualizar botões ativos
            document.querySelectorAll('[data-tab]').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        }
    }

    /**
     * Otimizar modais
     */
    optimizeModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Usar requestAnimationFrame para otimizar abertura
                requestAnimationFrame(() => {
                    this.openModal(trigger);
                });
            });
        });
    }

    /**
     * Abrir modal otimizado
     */
    openModal(trigger) {
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.style.display = 'flex';
            modal.style.transform = 'translateZ(0)';
            modal.style.backfaceVisibility = 'hidden';
        }
    }

    /**
     * Configurar monitoramento
     */
    setupMonitoring() {
        // Monitorar LCP
        this.monitorLCP();
        
        // Monitorar Speed Index
        this.monitorSpeedIndex();
        
        // Monitorar performance geral
        this.monitorPerformance();
    }

    /**
     * Monitorar LCP
     */
    monitorLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.lcpScore = entry.startTime;
                        console.log(`LCP: ${this.lcpScore}ms`);
                        
                        // Otimizar se LCP for lento
                        if (this.lcpScore > 2500) {
                            this.optimizeSlowLCP();
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    /**
     * Otimizar LCP lento
     */
    optimizeSlowLCP() {
        console.warn('LCP is slow, applying additional optimizations');
        
        // Aplicar otimizações agressivas
        this.applyAggressiveOptimizations();
    }

    /**
     * Aplicar otimizações agressivas
     */
    applyAggressiveOptimizations() {
        // Reduzir ainda mais recursos críticos
        this.reduceCriticalResources();
        
        // Otimizar imagens mais agressivamente
        this.aggressiveImageOptimization();
        
        // Defer mais recursos
        this.aggressiveDefer();
    }

    /**
     * Reduzir recursos críticos
     */
    reduceCriticalResources() {
        // Remover preloads não essenciais
        const nonEssentialPreloads = document.querySelectorAll('link[rel="preload"]:not([data-lcp-critical])');
        nonEssentialPreloads.forEach(preload => preload.remove());
    }

    /**
     * Otimização agressiva de imagens
     */
    aggressiveImageOptimization() {
        const images = document.querySelectorAll('img:not([data-lcp-optimized])');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
            img.style.contentVisibility = 'auto';
        });
    }

    /**
     * Defer agressivo
     */
    aggressiveDefer() {
        // Defer todos os scripts não críticos
        const scripts = document.querySelectorAll('script[src]:not([data-lcp-critical])');
        scripts.forEach(script => {
            script.defer = true;
            script.async = true;
        });
    }

    /**
     * Monitorar Speed Index
     */
    monitorSpeedIndex() {
        // Calcular Speed Index aproximado
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'paint') {
                        if (entry.name === 'first-paint') {
                            this.firstPaint = entry.startTime;
                        } else if (entry.name === 'first-contentful-paint') {
                            this.firstContentfulPaint = entry.startTime;
                            this.calculateSpeedIndex();
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['paint'] });
        }
    }

    /**
     * Calcular Speed Index
     */
    calculateSpeedIndex() {
        // Cálculo aproximado do Speed Index
        if (this.firstPaint && this.firstContentfulPaint) {
            this.speedIndex = (this.firstPaint + this.firstContentfulPaint) / 2;
            console.log(`Speed Index (approximate): ${this.speedIndex}ms`);
            
            // Otimizar se Speed Index for lento
            if (this.speedIndex > 3400) {
                this.optimizeSlowSpeedIndex();
            }
        }
    }

    /**
     * Otimizar Speed Index lento
     */
    optimizeSlowSpeedIndex() {
        console.warn('Speed Index is slow, applying additional optimizations');
        
        // Reduzir complexidade de layout
        this.reduceLayoutComplexity();
        
        // Otimizar renderização
        this.optimizeRendering();
    }

    /**
     * Reduzir complexidade de layout
     */
    reduceLayoutComplexity() {
        // Simplificar layouts complexos
        const complexElements = document.querySelectorAll('.grid, .flex, .container');
        
        complexElements.forEach(element => {
            element.style.contain = 'layout style paint';
            element.style.contentVisibility = 'auto';
        });
    }

    /**
     * Otimizar renderização
     */
    optimizeRendering() {
        // Configurar otimizações de renderização
        const renderElements = document.querySelectorAll('*');
        
        renderElements.forEach(element => {
            element.style.willChange = 'auto';
            element.style.transform = 'translateZ(0)';
        });
    }

    /**
     * Monitorar performance geral
     */
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        this.analyzePerformance(entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['navigation'] });
        }
    }

    /**
     * Analisar performance
     */
    analyzePerformance(navigationEntry) {
        const metrics = {
            domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
            loadComplete: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
            firstPaint: navigationEntry.firstPaint,
            firstContentfulPaint: navigationEntry.firstContentfulPaint
        };

        console.log('Performance Metrics:', metrics);
        
        // Otimizar baseado nas métricas
        this.optimizeBasedOnMetrics(metrics);
    }

    /**
     * Otimizar baseado nas métricas
     */
    optimizeBasedOnMetrics(metrics) {
        if (metrics.domContentLoaded > 1000) {
            console.warn('DOM Content Loaded is slow');
            this.optimizeDOMLoading();
        }
        
        if (metrics.loadComplete > 3000) {
            console.warn('Page load is slow');
            this.optimizePageLoading();
        }
    }

    /**
     * Otimizar carregamento do DOM
     */
    optimizeDOMLoading() {
        // Reduzir complexidade do DOM
        this.reduceDOMComplexity();
        
        // Otimizar seletores CSS
        this.optimizeCSSSelectors();
    }

    /**
     * Reduzir complexidade do DOM
     */
    reduceDOMComplexity() {
        // Simplificar estrutura do DOM
        const complexElements = document.querySelectorAll('div > div > div > div');
        
        complexElements.forEach(element => {
            if (element.children.length === 0 && !element.textContent.trim()) {
                element.remove();
            }
        });
    }

    /**
     * Otimizar seletores CSS
     */
    optimizeCSSSelectors() {
        // Identificar seletores complexos
        const complexSelectors = document.querySelectorAll('[class*="nested"], [class*="deep"]');
        
        complexSelectors.forEach(element => {
            element.style.contain = 'layout style paint';
        });
    }

    /**
     * Otimizar carregamento da página
     */
    optimizePageLoading() {
        // Defer recursos não críticos
        this.deferNonCriticalResources();
        
        // Otimizar carregamento de imagens
        this.optimizeImageLoading();
    }

    /**
     * Defer recursos não críticos
     */
    deferNonCriticalResources() {
        // Defer CSS não crítico
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-lcp-critical])');
        nonCriticalCSS.forEach(link => {
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
        });
    }

    /**
     * Otimizar carregamento de imagens
     */
    optimizeImageLoading() {
        const images = document.querySelectorAll('img:not([data-lcp-optimized])');
        
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
            img.style.contentVisibility = 'auto';
        });
    }

    /**
     * API pública para otimizações manuais
     */
    optimizeElement(selector, options = {}) {
        const element = document.querySelector(selector);
        
        if (element) {
            if (options.lcp) {
                this.optimizeLCPElement(element);
            }
            
            if (options.speedIndex) {
                this.optimizeSpeedIndexElement(element);
            }
        }
    }

    /**
     * Otimizar elemento para Speed Index
     */
    optimizeSpeedIndexElement(element) {
        element.style.transform = 'translateZ(0)';
        element.style.backfaceVisibility = 'hidden';
        element.style.perspective = '1000px';
        element.style.willChange = 'transform';
        element.style.contain = 'layout style paint';
    }

    /**
     * Obter estatísticas de otimização
     */
    getOptimizationStats() {
        return {
            lcpScore: this.lcpScore,
            speedIndex: this.speedIndex,
            deviceType: this.deviceType,
            connectionSpeed: this.connectionSpeed,
            isOptimized: this.isOptimized,
            optimizationsApplied: this.optimizations.size
        };
    }
}

// Inicializar otimizador quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.lcpSpeedOptimizer = new LCPSpeedOptimizer();
    });
} else {
    window.lcpSpeedOptimizer = new LCPSpeedOptimizer();
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LCPSpeedOptimizer;
} 