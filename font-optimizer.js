/**
 * FONT OPTIMIZER - Renov Site
 * Otimiza o carregamento de fontes para melhor performance e LCP
 */

class FontOptimizer {
    constructor() {
        this.fontsLoaded = false;
        this.localFontsAvailable = false;
        this.init();
    }

    init() {
        console.log('🎨 Font Optimizer iniciado');
        this.checkLocalFonts();
        this.setupFontLoading();
        this.optimizeFontDisplay();
    }

    checkLocalFonts() {
        // Verificar se as fontes locais estão disponíveis
        const testFont = new FontFace('Montserrat', 'url(assets/fonts/Montserrat-Regular.woff2)');
        
        testFont.load().then(() => {
            this.localFontsAvailable = true;
            console.log('✅ Fontes locais disponíveis');
            this.applyLocalFonts();
        }).catch(() => {
            console.log('⚠️ Fontes locais não disponíveis, usando Google Fonts');
            this.applyGoogleFonts();
        });
    }

    setupFontLoading() {
        // Monitorar carregamento de fontes
        if ('fonts' in document) {
            document.fonts.ready.then(() => {
                this.fontsLoaded = true;
                console.log('🎨 Fontes carregadas com sucesso');
                this.onFontsLoaded();
            });
        }

        // Fallback para navegadores antigos
        setTimeout(() => {
            if (!this.fontsLoaded) {
                console.log('⏰ Timeout de carregamento de fontes');
                this.onFontsLoaded();
            }
        }, 3000);
    }

    applyLocalFonts() {
        // Aplicar fontes locais com prioridade
        document.documentElement.style.setProperty('--font-family-primary', "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif");
        
        // Otimizar renderização
        document.body.style.fontFamily = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        document.body.style.fontDisplay = 'swap';
    }

    applyGoogleFonts() {
        // Usar Google Fonts como fallback
        document.documentElement.style.setProperty('--font-family-primary', "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif");
    }

    optimizeFontDisplay() {
        // Otimizar display de fontes para melhor performance
        const style = document.createElement('style');
        style.textContent = `
            * {
                font-display: swap !important;
            }
            
            body {
                font-family: var(--font-family-primary, 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
            }
            
            /* Otimizar elementos críticos */
            .hero-text h1,
            .hero-text h2,
            .logo,
            .tab-btn {
                font-display: swap !important;
                font-family: var(--font-family-primary, 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
            }
        `;
        document.head.appendChild(style);
    }

    onFontsLoaded() {
        // Ações após carregamento das fontes
        document.body.classList.add('fonts-loaded');
        
        // Otimizar renderização
        this.optimizeRendering();
        
        // Disparar evento customizado
        window.dispatchEvent(new CustomEvent('fontsLoaded'));
    }

    optimizeRendering() {
        // Otimizar renderização após carregamento das fontes
        requestAnimationFrame(() => {
            // Forçar reflow para melhor renderização
            document.body.offsetHeight;
            
            // Aplicar classes de otimização
            document.documentElement.classList.add('fonts-optimized');
            
            console.log('🎨 Renderização de fontes otimizada');
        });
    }

    // Método para verificar se fontes estão carregadas
    areFontsLoaded() {
        return this.fontsLoaded;
    }

    // Método para forçar carregamento de fontes específicas
    loadSpecificFont(fontFamily, fontWeight = 'normal') {
        if ('fonts' in document) {
            const font = new FontFace(fontFamily, `local('${fontFamily}')`);
            return font.load().then(() => {
                document.fonts.add(font);
                console.log(`🎨 Fonte ${fontFamily} carregada`);
            }).catch(error => {
                console.log(`⚠️ Erro ao carregar fonte ${fontFamily}:`, error);
            });
        }
    }
}

// Inicializar otimizador de fontes
const fontOptimizer = new FontOptimizer();

// Exportar para uso global
window.FontOptimizer = FontOptimizer;
window.fontOptimizer = fontOptimizer;

// Otimizações específicas para mobile
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Em mobile, priorizar fontes do sistema para melhor performance
    document.documentElement.style.setProperty('--font-family-primary', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif');
    console.log('📱 Otimizações de fonte mobile aplicadas');
}

console.log('🎨 Font Optimizer carregado com sucesso'); 