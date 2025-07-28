// Mobile Optimizer para Renov - Versão Avançada
// Otimizações específicas para dispositivos móveis com melhor responsividade

(function() {
    'use strict';

    // ===== CONFIGURAÇÕES GLOBAIS =====
    const MOBILE_CONFIG = {
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            small: 480,
            tiny: 360
        },
        touchTarget: 44,
        scrollThreshold: 100,
        animationDuration: 300
    };

    // ===== DETECÇÃO DE DISPOSITIVO AVANÇADA =====
    const isMobile = () => {
        return window.innerWidth <= MOBILE_CONFIG.breakpoints.mobile || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const isTablet = () => {
        return window.innerWidth > MOBILE_CONFIG.breakpoints.mobile && 
               window.innerWidth <= MOBILE_CONFIG.breakpoints.tablet;
    };

    const isSmallScreen = () => {
        return window.innerWidth <= MOBILE_CONFIG.breakpoints.small;
    };

    const isTinyScreen = () => {
        return window.innerWidth <= MOBILE_CONFIG.breakpoints.tiny;
    };

    // ===== OTIMIZAÇÕES AVANÇADAS PARA MOBILE =====
    const advancedMobileOptimizations = () => {
        if (!isMobile()) return;

        // 1. Otimizar navegação mobile avançada
        optimizeAdvancedMobileNavigation();
        
        // 2. Otimizar vídeos para mobile com performance
        optimizeAdvancedMobileVideos();
        
        // 3. Otimizar formulários mobile com UX melhorada
        optimizeAdvancedMobileForms();
        
        // 4. Otimizar carregamento de imagens com lazy loading avançado
        optimizeAdvancedMobileImages();
        
        // 5. Melhorar performance de scroll com virtualização
        optimizeAdvancedMobileScroll();
        
        // 6. Otimizar touch events com feedback háptico
        optimizeAdvancedTouchEvents();
        
        // 7. Melhorar acessibilidade mobile
        improveMobileAccessibility();
        
        // 8. Otimizar para diferentes orientações
        optimizeOrientationChanges();
        
        // 9. Melhorar performance de animações
        optimizeMobileAnimations();
        
        // 10. Implementar gestos touch
        implementTouchGestures();
    };

    // ===== NAVEGAÇÃO MOBILE AVANÇADA =====
    const optimizeAdvancedMobileNavigation = () => {
        const header = document.querySelector('.header-content');
        const nav = document.querySelector('.main-nav');
        
        if (!header || !nav) return;

        // Criar menu hamburger avançado
        if (isMobile()) {
            const hamburger = createAdvancedHamburger();
            header.appendChild(hamburger);

            // Adicionar estilos dinâmicos para melhor performance
            addDynamicMobileStyles();

            // Implementar funcionalidade do menu
            implementAdvancedMenuFunctionality(hamburger, nav);

            // Melhorar navegação por teclado
            improveKeyboardNavigation(nav);
        }
    };

    const createAdvancedHamburger = () => {
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-toggle';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('tabindex', '0');
        
        return hamburger;
    };

    const addDynamicMobileStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-toggle {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                background: none !important;
                border: none !important;
                color: #00b140 !important;
                font-size: 1.5rem !important;
                cursor: pointer !important;
                padding: 0.75rem !important;
                margin-left: auto !important;
                border-radius: 8px !important;
                transition: all 0.2s ease !important;
                min-width: 44px !important;
                min-height: 44px !important;
                position: relative !important;
                z-index: 1001 !important;
                -webkit-tap-highlight-color: transparent !important;
            }

            .mobile-menu-toggle:hover,
            .mobile-menu-toggle:focus {
                background-color: rgba(0, 177, 64, 0.1) !important;
                transform: scale(1.05) !important;
            }

            .mobile-menu-toggle:active {
                transform: scale(0.95) !important;
            }

            .mobile-menu-toggle[aria-expanded="true"] i {
                transform: rotate(180deg) !important;
            }

            @media (max-width: 768px) {
                .main-nav .tab-buttons {
                    display: none !important;
                    position: fixed !important;
                    top: 70px !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background: rgba(255, 255, 255, 0.98) !important;
                    backdrop-filter: blur(15px) !important;
                    -webkit-backdrop-filter: blur(15px) !important;
                    flex-direction: column !important;
                    padding: 2rem 1rem !important;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
                    z-index: 999 !important;
                    overflow-y: auto !important;
                    animation: slideInDown 0.3s ease-out !important;
                }

                .main-nav .tab-buttons.active {
                    display: flex !important;
                }

                .main-nav .tab-buttons .tab-btn {
                    width: 100% !important;
                    text-align: left !important;
                    padding: 1rem 1.5rem !important;
                    border-radius: 8px !important;
                    margin-bottom: 0.5rem !important;
                    font-size: 1.1rem !important;
                    font-weight: 500 !important;
                    min-height: 44px !important;
                    display: flex !important;
                    align-items: center !important;
                    transition: all 0.2s ease !important;
                    border: 1px solid transparent !important;
                    -webkit-tap-highlight-color: transparent !important;
                }

                .main-nav .tab-buttons .tab-btn:hover,
                .main-nav .tab-buttons .tab-btn:focus {
                    background: rgba(0, 177, 64, 0.1) !important;
                    border-color: #00b140 !important;
                    transform: translateX(5px) !important;
                }

                .main-nav .tab-buttons .tab-btn.active {
                    background: #00b140 !important;
                    color: white !important;
                    border-color: #00b140 !important;
                }

                .social-links {
                    display: none !important;
                }
            }

            @keyframes slideInDown {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    };

    const implementAdvancedMenuFunctionality = (hamburger, nav) => {
        const tabButtons = nav.querySelector('.tab-buttons');
        let isMenuOpen = false;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            tabButtons.classList.toggle('active', isMenuOpen);
            hamburger.setAttribute('aria-expanded', isMenuOpen.toString());
            
            const icon = hamburger.querySelector('i');
            icon.className = isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
            hamburger.setAttribute('aria-label', isMenuOpen ? 'Fechar menu' : 'Abrir menu');

            // Prevenir scroll do body quando menu está aberto
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        };

        // Event listeners
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !nav.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu();
            }
        });

        // Fechar menu ao pressionar Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });

        // Fechar menu ao clicar em um link
        tabButtons.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (isMenuOpen) {
                    setTimeout(toggleMenu, 100); // Pequeno delay para feedback visual
                }
            });
        });
    };

    const improveKeyboardNavigation = (nav) => {
        const focusableElements = nav.querySelectorAll('button, a, [tabindex]');
        
        // Implementar navegação por teclado
        nav.addEventListener('keydown', (e) => {
            const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % focusableElements.length;
                    focusableElements[nextIndex].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
                    focusableElements[prevIndex].focus();
                    break;
            }
        });
    };

    // ===== VÍDEOS MOBILE AVANÇADOS =====
    const optimizeAdvancedMobileVideos = () => {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Otimizar para mobile
            if (isMobile()) {
                video.setAttribute('playsinline', '');
                video.setAttribute('muted', '');
                video.setAttribute('loop', '');
                video.setAttribute('preload', 'metadata');
                
                // Reduzir qualidade em mobile para melhor performance
                video.style.objectFit = 'cover';
                
                // Pausar vídeos quando não estão visíveis
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (video.paused) {
                                video.play().catch(() => {
                                    // Fallback se autoplay falhar
                                    console.log('Autoplay blocked');
                                });
                            }
                        } else {
                            if (!video.paused) video.pause();
                        }
                    });
                }, { 
                    threshold: 0.1,
                    rootMargin: '50px'
                });
                
                observer.observe(video);
            }
        });
    };

    // ===== FORMULÁRIOS MOBILE AVANÇADOS =====
    const optimizeAdvancedMobileForms = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Melhorar UX em mobile
                if (input.type === 'tel') {
                    input.setAttribute('inputmode', 'tel');
                    input.setAttribute('pattern', '[0-9]*');
                } else if (input.type === 'email') {
                    input.setAttribute('inputmode', 'email');
                    input.setAttribute('autocomplete', 'email');
                } else if (input.type === 'text') {
                    input.setAttribute('autocomplete', 'on');
                }
                
                // Adicionar padding adequado para touch
                input.style.padding = '16px';
                input.style.fontSize = '16px'; // Evita zoom no iOS
                input.style.minHeight = '44px';
                
                // Melhorar feedback visual
                input.addEventListener('focus', function() {
                    this.style.borderColor = '#00b140';
                    this.style.boxShadow = '0 0 0 3px rgba(0, 177, 64, 0.1)';
                });
                
                input.addEventListener('blur', function() {
                    this.style.borderColor = '#e1e5e9';
                    this.style.boxShadow = 'none';
                });
            });
        });
    };

    // ===== IMAGENS MOBILE AVANÇADAS =====
    const optimizeAdvancedMobileImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Lazy loading otimizado para mobile
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }
            
            // Adicionar fallback para imagens quebradas
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            });
            
            // Otimizar para diferentes densidades de tela
            if (window.devicePixelRatio > 1) {
                img.style.imageRendering = 'crisp-edges';
            }
        });
    };

    // ===== SCROLL MOBILE AVANÇADO =====
    const optimizeAdvancedMobileScroll = () => {
        let ticking = false;
        const header = document.querySelector('header');
        
        const updateScroll = () => {
            if (header) {
                const scrollTop = window.pageYOffset;
                if (scrollTop > MOBILE_CONFIG.scrollThreshold) {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.backdropFilter = 'blur(10px)';
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                } else {
                    header.style.background = 'white';
                    header.style.backdropFilter = 'none';
                    header.style.boxShadow = 'none';
                }
            }
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
    };

    // ===== TOUCH EVENTS AVANÇADOS =====
    const optimizeAdvancedTouchEvents = () => {
        const buttons = document.querySelectorAll('button, .tab-btn, .btn-parceiro');
        
        buttons.forEach(button => {
            // Feedback háptico (se disponível)
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                }
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Melhorar feedback visual
            button.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Prevenir zoom em inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
        });
    };

    // ===== ACESSIBILIDADE MOBILE =====
    const improveMobileAccessibility = () => {
        // Melhorar contraste
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .hero-text h1,
                .hero-text p {
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important;
                }
                
                .tab-btn:focus,
                .btn-parceiro:focus,
                .submit-btn:focus,
                .mobile-menu-toggle:focus {
                    outline: 2px solid #00b140 !important;
                    outline-offset: 2px !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            z-index: 10000;
            color: white;
            background: #00b140;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
        `;
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    };

    // ===== ORIENTAÇÃO MOBILE =====
    const optimizeOrientationChanges = () => {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Recalcular layouts após mudança de orientação
                window.dispatchEvent(new Event('resize'));
            }, 100);
        });
    };

    // ===== ANIMAÇÕES MOBILE =====
    const optimizeMobileAnimations = () => {
        // Reduzir animações para dispositivos com preferência por movimento reduzido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ===== GESTOS TOUCH =====
    const implementTouchGestures = () => {
        let startY = 0;
        let startX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endX = e.changedTouches[0].clientX;
            const deltaY = startY - endY;
            const deltaX = startX - endX;
            
            // Detectar swipe para cima (abrir menu)
            if (deltaY > 50 && Math.abs(deltaX) < 50) {
                const hamburger = document.querySelector('.mobile-menu-toggle');
                if (hamburger) {
                    hamburger.click();
                }
            }
        });
    };

    // ===== INICIALIZAÇÃO =====
    const init = () => {
        // Inicializar otimizações quando DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', advancedMobileOptimizations);
        } else {
            advancedMobileOptimizations();
        }

        // Re-otimizar em mudanças de tamanho de tela
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(advancedMobileOptimizations, 250);
        });

        // Otimizações de performance
        optimizeMobilePerformance();
    };

    // ===== PERFORMANCE MOBILE =====
    const optimizeMobilePerformance = () => {
        // Otimizar fontes para mobile
        const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (fontLink) {
            fontLink.setAttribute('media', 'print');
            fontLink.onload = function() {
                this.media = 'all';
            };
        }
        
        // Preload de recursos críticos
        if (isMobile()) {
            const criticalResources = [
                '/assets/images/Renov-Logo.webp',
                '/assets/fonts/Montserrat-Regular.woff2'
            ];
            
            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.endsWith('.woff2') ? 'font' : 'image';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        }
    };

    // ===== EXPOSIÇÃO DE FUNÇÕES =====
    window.mobileOptimizer = {
        isMobile,
        isTablet,
        isSmallScreen,
        isTinyScreen,
        optimizeAdvancedMobileNavigation,
        optimizeAdvancedMobileVideos,
        optimizeAdvancedMobileForms,
        optimizeAdvancedMobileImages,
        optimizeAdvancedMobileScroll,
        optimizeAdvancedTouchEvents,
        improveMobileAccessibility,
        optimizeOrientationChanges,
        optimizeMobileAnimations,
        implementTouchGestures
    };

    // Inicializar
    init();

})(); 