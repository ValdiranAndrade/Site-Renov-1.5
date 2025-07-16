// Performance Optimizer for Renov Site
// This script optimizes image loading and resource management

(function() {
    'use strict';
    
    // Intersection Observer for lazy loading
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
        
        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalResources = [
            'assets/fonts/Montserrat-Regular.woff2',
            'assets/fonts/Montserrat-SemiBold.woff2',
            'assets/images/Renov-Logo.png'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.includes('.woff2') ? 'font' : 'image';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    // Optimize video loading
    function optimizeVideoLoading() {
        const videos = document.querySelectorAll('video[preload="metadata"]');
        videos.forEach(video => {
            // Only load video when it's about to be visible
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        video.preload = 'auto';
                        videoObserver.unobserve(video);
                    }
                });
            }, { threshold: 0.1 });
            
            videoObserver.observe(video);
        });
    }
    
    // Optimize CSS loading
    function optimizeCSSLoading() {
        // Load non-critical CSS asynchronously
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-non-critical]');
        nonCriticalCSS.forEach(link => {
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
        });
    }
    
    // Initialize optimizations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            preloadCriticalResources();
            optimizeVideoLoading();
            optimizeCSSLoading();
        });
    } else {
        preloadCriticalResources();
        optimizeVideoLoading();
        optimizeCSSLoading();
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            }, 0);
        });
    }
    
})(); 

// Performance Optimizer for Mobile - Reduce Critical Request Chains
(function() {
    'use strict';
    
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (isMobile) {
        // Optimize partner logos loading - Reduce request chains
        const optimizePartnerLogos = () => {
            const partnerImages = document.querySelectorAll('.parceiro-item img');
            partnerImages.forEach(img => {
                // Set low priority for all partner logos
                img.setAttribute('fetchpriority', 'low');
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
                
                // Reduce image quality for mobile if needed
                if (window.innerWidth <= 480) {
                    img.style.maxWidth = '80px';
                    img.style.height = 'auto';
                }
            });
        };
        
        // Optimize FAQ images loading
        const optimizeFAQImages = () => {
            const faqImages = document.querySelectorAll('.resposta-card img.avatar');
            faqImages.forEach(img => {
                img.setAttribute('fetchpriority', 'low');
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
            });
        };
        
        // Optimize non-critical images
        const optimizeNonCriticalImages = () => {
            const nonCriticalImages = document.querySelectorAll('img[loading="lazy"]');
            nonCriticalImages.forEach(img => {
                if (!img.hasAttribute('fetchpriority')) {
                    img.setAttribute('fetchpriority', 'low');
                }
            });
        };
        
        // Execute optimizations when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                optimizePartnerLogos();
                optimizeFAQImages();
                optimizeNonCriticalImages();
            });
        } else {
            optimizePartnerLogos();
            optimizeFAQImages();
            optimizeNonCriticalImages();
        }
        
        // Reduce animation complexity for mobile
        document.documentElement.style.setProperty('--animation-duration', '0.15s');
        document.documentElement.style.setProperty('--transition-duration', '0.15s');
        
        // Optimize scroll performance
        let ticking = false;
        const optimizeScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll optimizations here if needed
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Add passive scroll listeners
        document.addEventListener('scroll', optimizeScroll, { passive: true });
        document.addEventListener('touchmove', optimizeScroll, { passive: true });
    }
    
    // Global performance optimizations
    const globalOptimizations = () => {
        // Preload critical resources only
        const criticalResources = [
            'assets/images/Renov-Logo.webp',
            'assets/fonts/Montserrat-Regular.woff2',
            'styles.css',
            'script.js'
        ];
        
        // Defer non-critical resources
        const deferResources = () => {
            const nonCritical = document.querySelectorAll('link[fetchpriority="low"], img[fetchpriority="low"]');
            nonCritical.forEach(resource => {
                if (resource.tagName === 'LINK') {
                    resource.setAttribute('media', 'print');
                    resource.setAttribute('onload', "this.media='all'");
                }
            });
        };
        
        // Execute after page load
        window.addEventListener('load', deferResources);
    };
    
    // Initialize optimizations
    globalOptimizations();
    
})(); 