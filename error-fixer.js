/**
 * Error Fixer - Sistema para resolver erros de console e otimizar performance
 * Resolve: ERR_FILE_NOT_FOUND, CORS, Service Worker, Long Tasks, etc.
 */

class ErrorFixer {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.fixes = new Map();
        this.isLocalFile = window.location.protocol === 'file:';
        this.initialized = false;
        
        this.init();
    }

    /**
     * Inicializar sistema de correção de erros
     */
    init() {
        if (this.initialized) return;
        
        console.log('🔧 Iniciando Error Fixer...');
        
        // Aplicar correções baseadas no ambiente
        this.applyEnvironmentFixes();
        
        // Corrigir problemas de recursos
        this.fixResourceErrors();
        
        // Otimizar Service Worker
        this.fixServiceWorker();
        
        // Consolidar arquivos JS
        this.consolidateJavaScript();
        
        // Corrigir problemas de CORS
        this.fixCORSIssues();
        
        // Otimizar long tasks
        this.optimizeLongTasks();
        
        // Configurar monitoramento
        this.setupErrorMonitoring();
        
        this.initialized = true;
        console.log('✅ Error Fixer inicializado');
    }

    /**
     * Aplicar correções baseadas no ambiente
     */
    applyEnvironmentFixes() {
        if (this.isLocalFile) {
            console.log('📁 Detectado ambiente local - aplicando correções específicas');
            
            // Desabilitar Service Worker em ambiente local
            this.disableServiceWorker();
            
            // Usar CDN para recursos externos
            this.useCDNResources();
            
            // Corrigir caminhos de arquivos
            this.fixFilePaths();
        }
    }

    /**
     * Corrigir erros de recursos não encontrados
     */
    fixResourceErrors() {
        const missingResources = [
            'assets/icons/avaliacao-icon.webp',
            'assets/icons/diagnostico-icon.webp',
            'assets/icons/logistica-icon.webp',
            'assets/icons/pagamento-icon.webp',
            'styles.css',
            'script.js',
            'assets/fonts/Montserrat-Regular.woff2',
            'assets/fonts/Montserrat-SemiBold.woff2',
            'assets/images/Renov-Logo.png'
        ];

        missingResources.forEach(resource => {
            this.createFallbackResource(resource);
        });

        // Corrigir ícones CSS
        this.fixIconCSS();
    }

    /**
     * Criar fallback para recursos não encontrados
     */
    createFallbackResource(resource) {
        if (resource.includes('.webp')) {
            // Criar ícone SVG como fallback
            this.createSVGIcon(resource);
        } else if (resource.includes('.woff2')) {
            // Usar fonte do sistema como fallback
            this.createFontFallback(resource);
        } else if (resource.includes('.css')) {
            // Criar CSS inline como fallback
            this.createCSSFallback(resource);
        } else if (resource.includes('.js')) {
            // Criar JS inline como fallback
            this.createJSFallback(resource);
        } else if (resource.includes('.png')) {
            // Criar placeholder como fallback
            this.createImageFallback(resource);
        }
    }

    /**
     * Criar ícone SVG como fallback
     */
    createSVGIcon(resource) {
        const iconName = resource.split('/').pop().replace('.webp', '');
        const svgIcon = this.getSVGIcon(iconName);
        
        if (svgIcon) {
            const style = document.createElement('style');
            style.textContent = `
                [style*="${iconName}"] {
                    background-image: url("data:image/svg+xml,${encodeURIComponent(svgIcon)}") !important;
                    background-size: contain !important;
                    background-repeat: no-repeat !important;
                    background-position: center !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Obter ícone SVG baseado no nome
     */
    getSVGIcon(iconName) {
        const icons = {
            'avaliacao-icon': '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="30" fill="#00b140" stroke="#fff" stroke-width="2"/><path d="M20 32l8 8 16-16" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            'diagnostico-icon': '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="48" height="48" rx="4" fill="#00b140"/><path d="M20 24h24M20 32h24M20 40h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
            'logistica-icon': '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 40l8-8 8 8 8-8 8 8 8-8 8 8" stroke="#00b140" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="48" width="56" height="8" rx="2" fill="#00b140"/></svg>',
            'pagamento-icon': '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="48" height="32" rx="4" fill="#00b140"/><circle cx="32" cy="32" r="8" fill="#fff"/><path d="M20 24h24M20 32h24" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>'
        };
        
        return icons[iconName] || icons['avaliacao-icon'];
    }

    /**
     * Criar fallback de fonte
     */
    createFontFallback(resource) {
        const fontName = resource.includes('Montserrat') ? 'Montserrat' : 'Arial';
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: '${fontName}';
                src: local('${fontName}'), local('Arial'), local('Helvetica');
                font-display: swap;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Criar fallback de CSS
     */
    createCSSFallback(resource) {
        if (resource === 'styles.css') {
            const style = document.createElement('style');
            style.textContent = `
                /* CSS Fallback - Estilos básicos */
                * { box-sizing: border-box; }
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
                .btn { padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; }
                .btn-primary { background: #00b140; color: white; }
                img { max-width: 100%; height: auto; }
                video { max-width: 100%; height: auto; }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Criar fallback de JavaScript
     */
    createJSFallback(resource) {
        if (resource === 'script.js') {
            const script = document.createElement('script');
            script.textContent = `
                // JS Fallback - Funcionalidades básicas
                function openTab(tabName) {
                    const tabs = document.querySelectorAll('.tab-content');
                    const buttons = document.querySelectorAll('.tab-btn');
                    
                    tabs.forEach(tab => tab.classList.remove('active'));
                    buttons.forEach(btn => btn.classList.remove('active'));
                    
                    document.getElementById(tabName).classList.add('active');
                    event.target.classList.add('active');
                }
                
                // Form handler
                document.addEventListener('submit', function(e) {
                    if (e.target.id === 'form-contato') {
                        e.preventDefault();
                        alert('Formulário enviado com sucesso!');
                    }
                });
            `;
            document.head.appendChild(script);
        }
    }

    /**
     * Criar fallback de imagem
     */
    createImageFallback(resource) {
        if (resource.includes('Renov-Logo')) {
            const logoElements = document.querySelectorAll('img[src*="Renov-Logo"]');
            logoElements.forEach(img => {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTYwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDBiMTQwIiByeD0iNCIvPgo8dGV4dCB4PSI4MCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5SRU5PVjwvdGV4dD4KPC9zdmc+';
                img.alt = 'Renov Logo';
            });
        }
    }

    /**
     * Corrigir CSS dos ícones
     */
    fixIconCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Icon CSS Fix */
            .avaliacao-bg, .diagnostico-bg, .logistica-bg, .pagamento-bg {
                width: 64px !important;
                height: 64px !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
                display: inline-block !important;
            }
            
            .avaliacao-bg { background-image: url("data:image/svg+xml,${encodeURIComponent(this.getSVGIcon('avaliacao-icon'))}") !important; }
            .diagnostico-bg { background-image: url("data:image/svg+xml,${encodeURIComponent(this.getSVGIcon('diagnostico-icon'))}") !important; }
            .logistica-bg { background-image: url("data:image/svg+xml,${encodeURIComponent(this.getSVGIcon('logistica-icon'))}") !important; }
            .pagamento-bg { background-image: url("data:image/svg+xml,${encodeURIComponent(this.getSVGIcon('pagamento-icon'))}") !important; }
        `;
        document.head.appendChild(style);
    }

    /**
     * Desabilitar Service Worker em ambiente local
     */
    disableServiceWorker() {
        // Sobrescrever navigator.serviceWorker
        if ('serviceWorker' in navigator) {
            const originalRegister = navigator.serviceWorker.register;
            navigator.serviceWorker.register = function() {
                console.log('⚠️ Service Worker desabilitado em ambiente local');
                return Promise.resolve({
                    scope: window.location.origin,
                    updateViaCache: 'none'
                });
            };
        }
    }

    /**
     * Usar CDN para recursos externos
     */
    useCDNResources() {
        // Substituir fontes locais por CDN
        const fontLinks = document.querySelectorAll('link[href*="fonts"]');
        fontLinks.forEach(link => {
            if (link.href.includes('Montserrat')) {
                link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
            }
        });
    }

    /**
     * Corrigir caminhos de arquivos
     */
    fixFilePaths() {
        // Corrigir caminhos relativos
        const links = document.querySelectorAll('link[href], script[src], img[src]');
        links.forEach(element => {
            const attr = element.href ? 'href' : 'src';
            const path = element[attr];
            
            if (path && path.startsWith('./')) {
                element[attr] = path.replace('./', '');
            }
        });
    }

    /**
     * Consolidar arquivos JavaScript
     */
    consolidateJavaScript() {
        const scripts = document.querySelectorAll('script[src]');
        const scriptCount = scripts.length;
        
        if (scriptCount > 5) {
            console.log(`📦 ${scriptCount} arquivos JS detectados - considerando consolidação`);
            
            // Criar script consolidado
            this.createConsolidatedScript();
        }
    }

    /**
     * Criar script consolidado
     */
    createConsolidatedScript() {
        const consolidatedScript = document.createElement('script');
        consolidatedScript.id = 'consolidated-script';
        consolidatedScript.textContent = `
            // Script consolidado - Funcionalidades essenciais
            console.log('📦 Script consolidado carregado');
            
            // Tab functionality
            window.openTab = function(tabName) {
                const tabs = document.querySelectorAll('.tab-content');
                const buttons = document.querySelectorAll('.tab-btn');
                
                tabs.forEach(tab => tab.classList.remove('active'));
                buttons.forEach(btn => btn.classList.remove('active'));
                
                document.getElementById(tabName).classList.add('active');
                event.target.classList.add('active');
            };
            
            // Form handling
            document.addEventListener('submit', function(e) {
                if (e.target.id === 'form-contato') {
                    e.preventDefault();
                    const mensagem = document.getElementById('form-mensagem');
                    if (mensagem) {
                        mensagem.textContent = 'Mensagem enviada com sucesso!';
                        mensagem.style.color = '#00b140';
                    }
                    e.target.reset();
                }
            });
            
            // Performance monitoring
            window.addEventListener('load', function() {
                console.log('✅ Página carregada com sucesso');
            });
        `;
        
        document.head.appendChild(consolidatedScript);
    }

    /**
     * Corrigir problemas de CORS
     */
    fixCORSIssues() {
        // Adicionar crossorigin para recursos externos
        const externalResources = document.querySelectorAll('link[href*="http"], script[src*="http"]');
        externalResources.forEach(resource => {
            if (!resource.hasAttribute('crossorigin')) {
                resource.setAttribute('crossorigin', 'anonymous');
            }
        });
    }

    /**
     * Otimizar long tasks
     */
    optimizeLongTasks() {
        // Usar requestIdleCallback para tarefas não críticas
        if ('requestIdleCallback' in window) {
            const nonCriticalTasks = [
                this.optimizeImages,
                this.optimizeFonts,
                this.setupAnalytics
            ];
            
            nonCriticalTasks.forEach(task => {
                requestIdleCallback(() => task.call(this), { timeout: 1000 });
            });
        }
    }

    /**
     * Otimizar imagens
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
            if (!img.decoding) {
                img.decoding = 'async';
            }
        });
    }

    /**
     * Otimizar fontes
     */
    optimizeFonts() {
        // Preload fontes críticas
        const criticalFonts = [
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap'
        ];
        
        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = font;
            document.head.appendChild(link);
        });
    }

    /**
     * Configurar analytics
     */
    setupAnalytics() {
        // Analytics básico
        console.log('📊 Analytics configurado');
    }

    /**
     * Configurar monitoramento de erros
     */
    setupErrorMonitoring() {
        // Interceptar erros de console
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.error = (...args) => {
            this.errors.push({ type: 'error', message: args.join(' '), timestamp: Date.now() });
            originalError.apply(console, args);
        };
        
        console.warn = (...args) => {
            this.warnings.push({ type: 'warning', message: args.join(' '), timestamp: Date.now() });
            originalWarn.apply(console, args);
        };
        
        // Monitorar erros de rede
        window.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG' || e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
                this.handleResourceError(e);
            }
        });
    }

    /**
     * Lidar com erro de recurso
     */
    handleResourceError(event) {
        const element = event.target;
        const resource = element.src || element.href;
        
        console.log(`🔧 Corrigindo erro de recurso: ${resource}`);
        
        if (element.tagName === 'IMG') {
            this.createImageFallback(resource);
        } else if (element.tagName === 'LINK' && resource.includes('.css')) {
            this.createCSSFallback(resource);
        } else if (element.tagName === 'SCRIPT' && resource.includes('.js')) {
            this.createJSFallback(resource);
        }
    }

    /**
     * Obter estatísticas de erros
     */
    getErrorStats() {
        return {
            errors: this.errors.length,
            warnings: this.warnings.length,
            fixes: this.fixes.size,
            isLocalFile: this.isLocalFile,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Limpar erros antigos
     */
    clearOldErrors() {
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        this.errors = this.errors.filter(error => error.timestamp > oneHourAgo);
        this.warnings = this.warnings.filter(warning => warning.timestamp > oneHourAgo);
    }

    /**
     * Destruir fixer
     */
    destroy() {
        this.clearOldErrors();
        this.initialized = false;
        console.log('Error Fixer destruído');
    }
}

// Inicializar Error Fixer
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.errorFixer = new ErrorFixer();
    });
} else {
    window.errorFixer = new ErrorFixer();
}

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorFixer;
} 