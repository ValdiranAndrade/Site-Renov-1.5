// Mobile Performance Optimizer for Renov Site
// Otimizações específicas para melhorar o desempenho mobile

(function() {
    'use strict';
    
    // Detectar se é dispositivo mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (isMobile) {
        console.log('🚀 Aplicando otimizações mobile...');
        
        // 1. Otimizar carregamento de imagens
        optimizeImages();
        
        // 2. Reduzir animações para melhor performance
        reduceAnimations();
        
        // 3. Otimizar fontes
        optimizeFonts();
        
        // 4. Implementar lazy loading inteligente
        implementSmartLazyLoading();
        
        // 5. Otimizar CSS crítico
        optimizeCriticalCSS();
    }
    
    function optimizeImages() {
        // Aplicar versões mobile das imagens quando disponíveis
        const images = document.querySelectorAll('img[src*="assets/images/"]');
        images.forEach(img => {
            const src = img.src;
            // Só aplicar versões mobile para imagens que não são de partners
            if (src.includes('assets/images/') && !src.includes('/mobile/') && !src.includes('/partners/')) {
                // Tentar carregar versão mobile se existir
                const mobileSrc = src.replace('assets/images/', 'assets/images/mobile/');
                
                // Verificar se a versão mobile existe
                const testImg = new Image();
                testImg.onload = function() {
                    img.src = mobileSrc;
                    console.log(`📱 Carregando versão mobile: ${mobileSrc}`);
                };
                testImg.onerror = function() {
                    // Se não existir versão mobile, manter a original mas otimizar
                    img.setAttribute('loading', 'lazy');
                    img.setAttribute('decoding', 'async');
                    img.setAttribute('fetchpriority', 'low');
                };
                testImg.src = mobileSrc;
            } else {
                // Para imagens de partners, apenas otimizar sem tentar carregar versão mobile
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
                img.setAttribute('fetchpriority', 'low');
            }
        });
    }
    
    function reduceAnimations() {
        // Reduzir animações em mobile para melhor performance
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                
                .parceiros-slider .slider-track {
                    animation-duration: 15s !important;
                }
                
                .diferencial-card:hover {
                    transform: none !important;
                }
                
                .parceiro-item:hover img {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    function optimizeFonts() {
        // Otimizar carregamento de fontes em mobile
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            link.setAttribute('media', 'print');
            link.setAttribute('onload', "this.media='all'");
        });
        
        // Adicionar font-display: swap para melhor performance
        const fontStyle = document.createElement('style');
        fontStyle.textContent = `
            @font-face {
                font-family: 'Montserrat';
                font-display: swap;
            }
        `;
        document.head.appendChild(fontStyle);
    }
    
    function implementSmartLazyLoading() {
        // Implementar lazy loading inteligente para mobile
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.remove('lazy');
                        }
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            // Observar imagens com data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    function optimizeCriticalCSS() {
        // Injetar CSS crítico otimizado para mobile
        const criticalCSS = `
            @media (max-width: 768px) {
                /* Otimizações críticas para mobile */
                .hero {
                    min-height: 100vh !important;
                    height: 100vh !important;
                }
                
                .video-bg {
                    object-fit: cover !important;
                    width: 100vw !important;
                    height: 100% !important;
                }
                
                .parceiro-item img {
                    max-width: 80px !important;
                    height: auto !important;
                }
                
                .diferenciais-grid {
                    grid-template-columns: 1fr !important;
                    gap: 1rem !important;
                }
                
                /* Reduzir padding e margins */
                .parceiros {
                    padding: 40px 0 !important;
                }
                
                .diferenciais {
                    padding: 40px 0 !important;
                }
                
                /* Otimizar texto */
                .hero-text h1 {
                    font-size: 28px !important;
                    line-height: 1.2 !important;
                }
                
                .hero-text p {
                    font-size: 14px !important;
                    line-height: 1.4 !important;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
    }
    
    // 6. Otimizar carregamento de recursos não críticos
    function deferNonCriticalResources() {
        // Adicionar preload para recursos críticos
        const criticalResources = [
            { href: 'assets/images/Renov-Logo.webp', as: 'image', type: 'image/webp' },
            { href: 'assets/fonts/Montserrat-Regular.woff2', as: 'font', type: 'font/woff2' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.type) link.type = resource.type;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    // 7. Otimizar Service Worker para mobile
    function optimizeServiceWorker() {
        if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
            navigator.serviceWorker.register('/sw.js?v=1.6.6', {
                scope: '/'
            }).then(registration => {
                console.log('📱 Service Worker registrado com otimizações mobile');
            }).catch(error => {
                console.log('❌ Erro no registro do Service Worker:', error);
            });
        } else {
            console.log('📱 Service Worker desabilitado para protocolo file://');
        }
    }
    
    // Executar otimizações quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            deferNonCriticalResources();
            optimizeServiceWorker();
        });
    } else {
        deferNonCriticalResources();
        optimizeServiceWorker();
    }
    
    // 8. Otimizar performance de scroll
    let ticking = false;
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Otimizações de scroll aqui se necessário
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    
    console.log('✅ Otimizações mobile aplicadas com sucesso!');
    
})(); 