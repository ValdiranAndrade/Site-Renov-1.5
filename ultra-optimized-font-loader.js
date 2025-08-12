// ULTRA-OPTIMIZED FONT LOADER - Critical path latency reduction
// Target: Reduce 267ms to <150ms

(function() {
  'use strict';
  
  // Ultra-fast font loading optimization
  function ultraOptimizeFontLoading() {
    // Immediate fallback application
    document.documentElement.classList.add('font-loading');
    
    // Ultra-aggressive font loading detection
    if (document.fonts && document.fonts.ready) {
      // Use Promise.race with ultra-short timeout
      Promise.race([
        document.fonts.ready,
        new Promise(resolve => setTimeout(resolve, 25))
      ]).then(() => {
        document.documentElement.classList.remove('font-loading');
        document.documentElement.classList.add('font-loaded');
      }).catch(() => {
        // Ultra-fast fallback on error
        document.documentElement.classList.remove('font-loading');
        document.documentElement.classList.add('font-loaded');
      });
    } else {
      // Ultra-fast fallback for older browsers
      setTimeout(() => {
        document.documentElement.classList.remove('font-loading');
        document.documentElement.classList.add('font-loaded');
      }, 25);
    }
    
    // Ultra-high priority font preloading
    const criticalFonts = [
      'assets/fonts/Montserrat-Regular.woff2',
      'assets/fonts/Montserrat-Medium.woff2'
    ];
    
    criticalFonts.forEach(fontUrl => {
      // Create ultra-optimized preload link
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontUrl;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.setAttribute('fetchpriority', 'high');
      link.setAttribute('importance', 'high');
      
      // Insert at the very beginning of head
      const head = document.head;
      if (head.firstChild) {
        head.insertBefore(link, head.firstChild);
      } else {
        head.appendChild(link);
      }
    });
  }
  
  // Ultra-optimized resource hints
  function ultraOptimizeResourceHints() {
    const head = document.head;
    
    // DNS prefetch for external resources
    const dnsPrefetch = [
      'https://cdnjs.cloudflare.com'
    ];
    
    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      head.appendChild(link);
    });
    
    // Preconnect for critical external resources
    const preconnect = [
      'https://cdnjs.cloudflare.com'
    ];
    
    preconnect.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    });
  }
  
  // Ultra-optimized critical path optimization
  function ultraOptimizeCriticalPath() {
    // Optimize critical elements immediately
    const criticalElements = document.querySelectorAll('.hero-text h1, .hero-text p, .logo, .tab-btn, .cta-button');
    
    criticalElements.forEach(element => {
      // Apply ultra-optimized font settings
      element.style.fontDisplay = 'swap';
      element.style.fontSynthesis = 'none';
      element.style.fontFeatureSettings = "'kern' 1, 'liga' 1";
    });
    
    // Ultra-optimize font rendering
    document.body.style.webkitFontSmoothing = 'antialiased';
    document.body.style.mozOsxFontSmoothing = 'grayscale';
    document.body.style.textRendering = 'optimizeLegibility';
  }
  
  // Ultra-fast execution
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      ultraOptimizeFontLoading();
      ultraOptimizeResourceHints();
      ultraOptimizeCriticalPath();
    }, { once: true });
  } else {
    // Execute immediately if DOM is already ready
    ultraOptimizeFontLoading();
    ultraOptimizeResourceHints();
    ultraOptimizeCriticalPath();
  }
  
  // Ultra-optimized font loading detection
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      // Fonts loaded successfully
      document.documentElement.classList.remove('font-loading');
      document.documentElement.classList.add('font-loaded');
    }).catch(() => {
      // Fallback on error
      document.documentElement.classList.remove('font-loading');
      document.documentElement.classList.add('font-loaded');
    });
  }
  
  // Ultra-optimized performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', function() {
      // Monitor font loading performance
      const fontMetrics = performance.getEntriesByType('resource')
        .filter(entry => entry.name.includes('Montserrat'));
      
      if (fontMetrics.length > 0) {
        const totalFontTime = fontMetrics.reduce((sum, metric) => sum + metric.duration, 0);
        console.log('Ultra-optimized font loading time:', totalFontTime + 'ms');
      }
    });
  }
})(); 