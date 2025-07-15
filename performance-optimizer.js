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