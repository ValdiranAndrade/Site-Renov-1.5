/**
 * Layout Optimizer - Evita Layout Thrashing e Layouts Síncronos Forçados
 * Baseado nas recomendações do web.dev: https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
 */

class LayoutOptimizer {
    constructor() {
        this.pendingReads = [];
        this.pendingWrites = [];
        this.isScheduled = false;
        this.measurements = new Map();
        this.lastLayoutTime = 0;
        this.layoutThrottle = 16; // ~60fps
        
        this.init();
    }

    init() {
        // Detectar se é dispositivo mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        
        // Configurar otimizações específicas para mobile
        if (this.isMobile) {
            this.setupMobileOptimizations();
        }
        
        // Configurar otimizações gerais
        this.setupGeneralOptimizations();
        
        // Configurar listeners de performance
        this.setupPerformanceListeners();
    }

    /**
     * Otimizações específicas para mobile
     */
    setupMobileOptimizations() {
        // Batch DOM operations para mobile
        const mobileOptimizations = () => {
            // Usar requestAnimationFrame para evitar layout thrashing
            requestAnimationFrame(() => {
                // Configurar propriedades CSS em batch
                const root = document.documentElement;
                const mobileStyles = {
                    '--animation-duration': '0.15s',
                    '--scroll-behavior': 'auto',
                    '--touch-action': 'manipulation'
                };
                
                Object.entries(mobileStyles).forEach(([property, value]) => {
                    root.style.setProperty(property, value);
                });
                
                // Otimizar elementos críticos em batch
                const criticalElements = document.querySelectorAll('.hero-text, .video-bg, .logo img');
                const criticalStyles = 'display:block;visibility:visible;opacity:1;will-change:auto';
                
                criticalElements.forEach(el => {
                    el.style.cssText = criticalStyles;
                });
                
                // Otimizar inputs para mobile
                const inputs = document.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.style.fontSize = '16px';
                    input.style.transform = 'translateZ(0)'; // Force hardware acceleration
                });
            });
        };
        
        // Executar otimizações quando DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', mobileOptimizations, { once: true });
        } else {
            mobileOptimizations();
        }
        
        // Event listeners passivos para melhor performance
        ['touchstart', 'touchmove', 'scroll'].forEach(event => {
            document.addEventListener(event, () => {}, { passive: true });
        });
    }

    /**
     * Otimizações gerais para evitar layout thrashing
     */
    setupGeneralOptimizations() {
        // Interceptar métodos que causam layout thrashing
        this.interceptLayoutMethods();
        
        // Otimizar animações e transições
        this.optimizeAnimations();
        
        // Configurar lazy loading otimizado
        this.setupOptimizedLazyLoading();
    }

    /**
     * Interceptar métodos que causam layout thrashing
     */
    interceptLayoutMethods() {
        // Cache de medições para evitar recálculos desnecessários
        const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
        const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
        const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
        
        // Interceptar getBoundingClientRect
        Element.prototype.getBoundingClientRect = function() {
            const key = `${this.tagName}-${this.className}-${this.id}`;
            const now = performance.now();
            
            // Usar cache se a medição for recente
            if (this.measurementCache && (now - this.measurementCache.timestamp) < 16) {
                return this.measurementCache.rect;
            }
            
            const rect = originalGetBoundingClientRect.call(this);
            
            // Cache da medição
            this.measurementCache = {
                rect: rect,
                timestamp: now
            };
            
            return rect;
        };
        
        // Interceptar offsetWidth/offsetHeight
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            get: function() {
                const key = `${this.tagName}-${this.className}-${this.id}-width`;
                const now = performance.now();
                
                if (this.offsetCache && (now - this.offsetCache.timestamp) < 16) {
                    return this.offsetCache.width;
                }
                
                const width = originalOffsetWidth.get.call(this);
                
                this.offsetCache = {
                    width: width,
                    timestamp: now
                };
                
                return width;
            }
        });
        
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            get: function() {
                const key = `${this.tagName}-${this.className}-${this.id}-height`;
                const now = performance.now();
                
                if (this.offsetCache && (now - this.offsetCache.timestamp) < 16) {
                    return this.offsetCache.height;
                }
                
                const height = originalOffsetHeight.get.call(this);
                
                this.offsetCache = {
                    height: height,
                    timestamp: now
                };
                
                return height;
            }
        });
    }

    /**
     * Otimizar animações para evitar layout thrashing
     */
    optimizeAnimations() {
        // Usar transform e opacity para animações (não causam layout)
        const animationElements = document.querySelectorAll('.animate, .transition, [data-animate]');
        
        animationElements.forEach(el => {
            // Forçar hardware acceleration
            el.style.willChange = 'transform, opacity';
            el.style.transform = 'translateZ(0)';
            
            // Usar CSS custom properties para animações
            el.style.setProperty('--animation-duration', '0.3s');
            el.style.setProperty('--animation-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
        });
        
        // Otimizar scroll events
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Processar scroll aqui
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Lazy loading otimizado que evita layout thrashing
     */
    setupOptimizedLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Usar requestAnimationFrame para evitar layout thrashing
                    requestAnimationFrame(() => {
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observar imagens lazy
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Batch DOM operations para evitar layout thrashing
     */
    batchDOMOperations(operations) {
        return new Promise((resolve) => {
            // Separar reads e writes
            const reads = operations.filter(op => op.type === 'read');
            const writes = operations.filter(op => op.type === 'write');
            
            // Executar reads primeiro
            const readResults = reads.map(op => op.execute());
            
            // Executar writes em batch
            requestAnimationFrame(() => {
                writes.forEach(op => op.execute());
                resolve(readResults);
            });
        });
    }

    /**
     * Medir performance de layout
     */
    measureLayoutPerformance(callback) {
        const startTime = performance.now();
        
        // Usar PerformanceObserver para detectar layout thrashing
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.entryType === 'layout-shift') {
                    console.warn('Layout shift detected:', entry);
                }
            });
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Executar callback
        callback();
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        console.log(`Layout operation took: ${duration.toFixed(2)}ms`);
        
        return duration;
    }

    /**
     * Otimizar formulários para evitar layout thrashing
     */
    optimizeForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Usar debounce para validação
            let validationTimeout;
            
            form.addEventListener('input', (e) => {
                clearTimeout(validationTimeout);
                validationTimeout = setTimeout(() => {
                    this.validateField(e.target);
                }, 300);
            });
            
            // Otimizar focus/blur events
            form.addEventListener('focusin', (e) => {
                requestAnimationFrame(() => {
                    e.target.classList.add('focused');
                });
            });
            
            form.addEventListener('focusout', (e) => {
                requestAnimationFrame(() => {
                    e.target.classList.remove('focused');
                });
            });
        });
    }

    /**
     * Validar campo sem causar layout thrashing
     */
    validateField(field) {
        // Usar requestAnimationFrame para evitar layout thrashing
        requestAnimationFrame(() => {
            const isValid = field.checkValidity();
            
            if (isValid) {
                field.classList.remove('invalid');
                field.classList.add('valid');
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
            }
        });
    }

    /**
     * Configurar listeners de performance
     */
    setupPerformanceListeners() {
        // Monitorar layout shifts
        if ('PerformanceObserver' in window) {
            const layoutShiftObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.value > 0.1) { // Layout shift significativo
                        console.warn('Significant layout shift detected:', entry);
                        this.handleLayoutShift(entry);
                    }
                });
            });
            
            layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
        }
        
        // Monitorar long tasks
        if ('PerformanceObserver' in window) {
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.duration > 50) { // Task maior que 50ms
                        console.warn('Long task detected:', entry);
                    }
                });
            });
            
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        }
    }

    /**
     * Lidar com layout shifts
     */
    handleLayoutShift(entry) {
        // Identificar elementos que causaram o shift
        const sources = entry.sources || [];
        
        sources.forEach(source => {
            if (source.node) {
                // Adicionar classe para debugging
                source.node.classList.add('layout-shift-source');
                
                // Remover classe após um tempo
                setTimeout(() => {
                    source.node.classList.remove('layout-shift-source');
                }, 2000);
            }
        });
    }

    /**
     * Otimizar tabs para evitar layout thrashing
     */
    optimizeTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = button.getAttribute('onclick')?.match(/openTab\('([^']+)'\)/)?.[1];
                
                if (targetId) {
                    this.switchTab(targetId);
                }
            });
        });
    }

    /**
     * Trocar tab de forma otimizada
     */
    switchTab(tabId) {
        // Usar requestAnimationFrame para evitar layout thrashing
        requestAnimationFrame(() => {
            // Esconder todas as tabs
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Remover classe active de todos os botões
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Mostrar tab selecionada
            const targetTab = document.getElementById(tabId);
            const targetButton = document.querySelector(`[onclick*="openTab('${tabId}')"]`);
            
            if (targetTab) {
                targetTab.classList.add('active');
                targetTab.style.display = 'block';
            }
            
            if (targetButton) {
                targetButton.classList.add('active');
            }
        });
    }

    /**
     * Otimizar slider/carousel
     */
    optimizeSlider() {
        const slider = document.querySelector('.slider');
        if (!slider) return;
        
        let isAnimating = false;
        
        const updateSlider = (index) => {
            if (isAnimating) return;
            isAnimating = true;
            
            requestAnimationFrame(() => {
                const slides = slider.querySelectorAll('.slide');
                const offset = -index * 100;
                
                slides.forEach(slide => {
                    slide.style.transform = `translateX(${offset}%)`;
                });
                
                // Reset flag após animação
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            });
        };
        
        // Expor função globalmente
        window.updateSlider = updateSlider;
    }
}

// Inicializar otimizador quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.layoutOptimizer = new LayoutOptimizer();
    });
} else {
    window.layoutOptimizer = new LayoutOptimizer();
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LayoutOptimizer;
} 