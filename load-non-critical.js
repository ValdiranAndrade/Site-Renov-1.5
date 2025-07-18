/**
 * Load Non-Critical Resources
 * Carrega recursos não essenciais após o LCP ser medido
 */

(function() {
    'use strict';
    
    let lcpMeasured = false;
    let resourcesLoaded = false;
    
    // Monitorar LCP
    if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.entryType === 'largest-contentful-paint') {
                    lcpMeasured = true;
                    console.log(`📊 LCP medido: ${entry.startTime.toFixed(2)}ms`);
                    
                    // Carregar recursos não críticos após LCP
                    if (!resourcesLoaded) {
                        loadNonCriticalResources();
                    }
                }
            });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Fallback: carregar após 5 segundos se LCP não for medido
    setTimeout(() => {
        if (!lcpMeasured && !resourcesLoaded) {
            console.log('⏰ Timeout: carregando recursos não críticos');
            loadNonCriticalResources();
        }
    }, 5000);
    
    function loadNonCriticalResources() {
        if (resourcesLoaded) return;
        resourcesLoaded = true;
        
        console.log('🚀 Carregando recursos não críticos...');
        
        // Carregar scripts não críticos
        const nonCriticalScripts = [
            'performance-optimizer.js',
            'mobile-performance-optimizer.js',
            'layout-optimizer.js'
        ];
        
        nonCriticalScripts.forEach(script => {
            const scriptEl = document.createElement('script');
            scriptEl.src = script;
            scriptEl.defer = true;
            document.body.appendChild(scriptEl);
        });
        
        // Carregar CSS não crítico
        const cssFiles = [
            'font-optimized.css?v=1.6.0',
            'styles.css?v=1.6.0'
        ];
        cssFiles.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        });
        
        // Carregar Font Awesome se ainda não carregado
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
            document.head.appendChild(link);
        }
        
        // Carregar fonte Montserrat via FontFace API
        if ('FontFace' in window) {
            const font = new FontFace('Montserrat', 'url(assets/fonts/Montserrat-Regular.woff2)');
            font.load().then(function(loadedFont) {
                document.fonts.add(loadedFont);
            });
        }
        
        console.log('✅ Recursos não críticos carregados');
    }
})(); 