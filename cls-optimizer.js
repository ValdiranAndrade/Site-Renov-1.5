/**
 * CLS OPTIMIZER - Cumulative Layout Shift Prevention
 * Reduz o CLS de 0.492 para < 0.1
 */

(function() {
    'use strict';
    
    console.log('🚀 CLS Optimizer iniciado');
    
    // 1. RESERVE SPACE FOR ALL IMAGES
    function reserveImageSpace() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.width || !img.height) {
                // Set default dimensions based on class
                if (img.classList.contains('avatar')) {
                    img.style.width = '60px';
                    img.style.height = '60px';
                    img.style.aspectRatio = '1/1';
                } else if (img.classList.contains('impacto-icon')) {
                    img.style.width = '80px';
                    img.style.height = '80px';
                    img.style.aspectRatio = '1/1';
                } else if (img.closest('.parceiro-item')) {
                    img.style.width = '120px';
                    img.style.height = '60px';
                    img.style.aspectRatio = '2/1';
                } else {
                    // Default aspect ratio
                    img.style.aspectRatio = '16/9';
                }
            }
            
            // Force display block
            img.style.display = 'block';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
    }
    
    // 2. PREVENT TEXT LAYOUT SHIFT
    function preventTextShift() {
        const textElements = document.querySelectorAll('h1, h2, h3, p');
        textElements.forEach(element => {
            if (element.classList.contains('hero-text')) {
                element.style.minHeight = '200px';
                element.style.display = 'flex';
                element.style.flexDirection = 'column';
                element.style.justifyContent = 'center';
            }
            
            if (element.tagName === 'H1' && element.closest('.hero-text')) {
                element.style.minHeight = '120px';
                element.style.margin = '0';
                element.style.padding = '0';
            }
            
            if (element.tagName === 'P' && element.closest('.hero-text')) {
                element.style.minHeight = '60px';
                element.style.margin = '0';
                element.style.padding = '0';
            }
        });
    }
    
    // 3. STABILIZE VIDEO BACKGROUND
    function stabilizeVideo() {
        const videoWrapper = document.querySelector('.video-bg-wrapper');
        const video = document.querySelector('.video-bg');
        const mobileBg = document.querySelector('.mobile-bg');
        
        if (videoWrapper) {
            videoWrapper.style.aspectRatio = '16/9';
            videoWrapper.style.minHeight = '100vh';
            videoWrapper.style.width = '100vw';
            videoWrapper.style.position = 'absolute';
            videoWrapper.style.top = '0';
            videoWrapper.style.left = '0';
            videoWrapper.style.overflow = 'hidden';
        }
        
        if (video) {
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.position = 'absolute';
            video.style.top = '0';
            video.style.left = '0';
        }
        
        if (mobileBg) {
            mobileBg.style.aspectRatio = '16/9';
            mobileBg.style.minHeight = '100vh';
            mobileBg.style.width = '100vw';
            mobileBg.style.backgroundSize = 'cover';
            mobileBg.style.backgroundPosition = 'center';
        }
    }
    
    // 4. STABILIZE HERO CONTENT
    function stabilizeHero() {
        const heroContent = document.querySelector('.hero-content');
        const heroText = document.querySelector('.hero-text');
        
        if (heroContent) {
            heroContent.style.minHeight = '400px';
            heroContent.style.display = 'flex';
            heroContent.style.alignItems = 'center';
            heroContent.style.justifyContent = 'center';
        }
        
        if (heroText) {
            heroText.style.minHeight = '200px';
            heroText.style.display = 'flex';
            heroText.style.flexDirection = 'column';
            heroText.style.justifyContent = 'center';
        }
    }
    
    // 5. STABILIZE HEADER
    function stabilizeHeader() {
        const headerContent = document.querySelector('.header-content');
        const logo = document.querySelector('.logo img');
        
        if (headerContent) {
            headerContent.style.minHeight = '70px';
            headerContent.style.height = '70px';
        }
        
        if (logo) {
            logo.style.width = '160px';
            logo.style.height = '40px';
            logo.style.aspectRatio = '4/1';
        }
    }
    
    // 6. RESPONSIVE ADJUSTMENTS
    function responsiveAdjustments() {
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        const heroContent = document.querySelector('.hero-content');
        const heroText = document.querySelector('.hero-text');
        const logo = document.querySelector('.logo img');
        
        if (isMobile) {
            if (logo) {
                logo.style.width = '120px';
                logo.style.height = '30px';
            }
            
            if (heroContent) {
                heroContent.style.minHeight = '300px';
            }
            
            if (heroText) {
                const h1 = heroText.querySelector('h1');
                const p = heroText.querySelector('p');
                
                if (h1) {
                    h1.style.minHeight = '80px';
                    h1.style.fontSize = '32px';
                    h1.style.lineHeight = '1.2';
                }
                
                if (p) {
                    p.style.minHeight = '40px';
                    p.style.fontSize = '16px';
                    p.style.lineHeight = '1.4';
                }
            }
        }
        
        if (isSmallMobile) {
            if (heroContent) {
                heroContent.style.minHeight = '250px';
            }
            
            if (heroText) {
                const h1 = heroText.querySelector('h1');
                const p = heroText.querySelector('p');
                
                if (h1) {
                    h1.style.minHeight = '60px';
                    h1.style.fontSize = '28px';
                }
                
                if (p) {
                    p.style.minHeight = '30px';
                    p.style.fontSize = '14px';
                }
            }
        }
    }
    
    // 7. PREVENT OVERFLOW
    function preventOverflow() {
        document.body.style.overflowX = 'hidden';
        document.body.style.width = '100vw';
        document.body.style.maxWidth = '100vw';
        
        const pageWrapper = document.querySelector('.page-wrapper');
        if (pageWrapper) {
            pageWrapper.style.minHeight = '100vh';
            pageWrapper.style.width = '100vw';
            pageWrapper.style.maxWidth = '100vw';
            pageWrapper.style.overflowX = 'hidden';
        }
    }
    
    // 8. MONITOR CLS
    function monitorCLS() {
        if ('PerformanceObserver' in window) {
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'layout-shift') {
                        console.log(`📐 CLS Event: ${entry.value.toFixed(3)}`);
                        
                        // If CLS is high, apply additional fixes
                        if (entry.value > 0.1) {
                            console.log('⚠️ CLS alto detectado, aplicando correções adicionais');
                            reserveImageSpace();
                            preventTextShift();
                        }
                    }
                });
            });
            
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }
    
    // 9. INITIALIZE
    function init() {
        // Apply fixes immediately
        reserveImageSpace();
        preventTextShift();
        stabilizeVideo();
        stabilizeHero();
        stabilizeHeader();
        preventOverflow();
        responsiveAdjustments();
        
        // Monitor for changes
        monitorCLS();
        
        // Re-apply on resize
        window.addEventListener('resize', responsiveAdjustments);
        
        // Re-apply after images load
        window.addEventListener('load', () => {
            setTimeout(() => {
                reserveImageSpace();
                preventTextShift();
            }, 100);
        });
        
        console.log('✅ CLS Optimizer aplicado');
    }
    
    // Run immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})(); 