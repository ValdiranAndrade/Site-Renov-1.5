// LCP Optimizer - Otimizações específicas para Largest Contentful Paint
// Foco em reduzir o LCP de 6.8s para menos de 4s

(function() {
    'use strict';
    
    console.log('🚀 Iniciando otimizações de LCP...');
    
    // 1. Otimizar carregamento do hero (elemento LCP mais provável)
    function optimizeHeroLCP() {
        const hero = document.querySelector('.hero');
        const heroText = document.querySelector('.hero-text');
        const logo = document.querySelector('.logo img');
        
        if (hero) {
            // Forçar renderização imediata do hero
            hero.style.display = 'block';
            hero.style.visibility = 'visible';
            hero.style.opacity = '1';
        }
        
        if (heroText) {
            // Otimizar texto do hero
            heroText.style.display = 'block';
            heroText.style.visibility = 'visible';
            heroText.style.opacity = '1';
            
            // Forçar layout do texto
            heroText.offsetHeight;
        }
        
        if (logo) {
            // Otimizar logo
            logo.style.display = 'block';
            logo.style.visibility = 'visible';
            logo.style.opacity = '1';
            
            // Forçar carregamento prioritário
            logo.setAttribute('fetchpriority', 'high');
            logo.setAttribute('loading', 'eager');
            logo.setAttribute('decoding', 'sync');
        }
    }
    
    // 2. Otimizar fontes críticas
    function optimizeCriticalFonts() {
        // Preload de fontes críticas
        const criticalFonts = [
            'assets/fonts/Montserrat-Regular.woff2',
            'assets/fonts/Montserrat-Medium.woff2'
        ];
        
        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
        
        // Forçar renderização de fontes
        document.documentElement.style.fontDisplay = 'swap';
    }
    
    // 3. Otimizar imagens críticas
    function optimizeCriticalImages() {
        const criticalImages = document.querySelectorAll('img[fetchpriority="high"], .logo img, .hero img');
        
        criticalImages.forEach(img => {
            // Forçar carregamento imediato
            img.setAttribute('fetchpriority', 'high');
            img.setAttribute('loading', 'eager');
            img.setAttribute('decoding', 'sync');
            
            // Remover lazy loading de imagens críticas
            img.removeAttribute('loading');
            
            // Forçar layout
            img.style.display = 'block';
            img.style.visibility = 'visible';
            img.style.opacity = '1';
        });
    }
    
    // 4. Otimizar CSS crítico inline
    function injectCriticalCSS() {
        const criticalCSS = `
            /* CSS Crítico para LCP */
            .hero {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                min-height: 100vh !important;
            }
            
            .hero-text {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            .logo img {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 160px !important;
                height: 40px !important;
            }
            
            .header-content {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            /* Forçar renderização imediata */
            * {
                font-display: swap !important;
            }
            
            /* Otimizar para mobile */
            @media (max-width: 768px) {
                .hero {
                    min-height: 100vh !important;
                    height: 100vh !important;
                }
                
                .logo img {
                    width: 120px !important;
                    height: 30px !important;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }
    
    // 5. Otimizar carregamento de recursos
    function optimizeResourceLoading() {
        // Remover recursos não críticos do carregamento inicial
        const nonCriticalScripts = document.querySelectorAll('script[src*="performance"], script[src*="mobile"]');
        nonCriticalScripts.forEach(script => {
            script.setAttribute('defer', 'true');
        });
        
        // Otimizar carregamento de CSS não crítico
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([href*="critical"])');
        nonCriticalCSS.forEach(link => {
            link.setAttribute('media', 'print');
            link.setAttribute('onload', "this.media='all'");
        });
    }
    
    // 6. Otimizar vídeo do hero
    function optimizeHeroVideo() {
        const video = document.querySelector('.video-bg');
        if (video) {
            // Reduzir qualidade do vídeo para carregamento mais rápido
            video.setAttribute('preload', 'metadata');
            video.setAttribute('muted', 'true');
            video.setAttribute('playsinline', 'true');
            
            // Carregar vídeo apenas quando necessário
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute('preload', 'auto');
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(video);
        }
    }
    
    // 7. Executar otimizações
    function runLPCOptimizations() {
        console.log('🎯 Aplicando otimizações de LCP...');
        
        // CSS crítico primeiro
        injectCriticalCSS();
        
        // Otimizações imediatas
        optimizeHeroLCP();
        optimizeCriticalFonts();
        optimizeCriticalImages();
        optimizeResourceLoading();
        optimizeHeroVideo();
        
        console.log('✅ Otimizações de LCP aplicadas!');
    }
    
    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runLPCOptimizations);
    } else {
        runLPCOptimizations();
    }
    
    // Executar também no load para garantir
    window.addEventListener('load', function() {
        console.log('🚀 LCP otimizado - carregamento completo!');
    });
    
})(); 