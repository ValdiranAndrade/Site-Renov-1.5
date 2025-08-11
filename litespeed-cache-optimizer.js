/**
 * LITESPEED CACHE OPTIMIZER
 * Otimizações essenciais para desktop e mobile
 * Versão 2.0 - Simplificada e sem conflitos
 */

(function() {
    'use strict';
    
    // Detectar se é mobile
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   window.innerWidth <= 768;
    
    console.log('🚀 LiteSpeed Cache Optimizer iniciado - ' + (isMobile ? 'Mobile' : 'Desktop'));
    
    // Recursos críticos para preload
    var criticalResources = [
        'assets/images/Renov-Logo.webp',
        'assets/fonts/Montserrat-Regular.woff2',
        'assets/fonts/Montserrat-Medium.woff2'
    ];
    
    // Adicionar recursos específicos para mobile
    if (isMobile) {
        criticalResources.push(
            'assets/images/mobile/bg-como-funciona.webp',
            'assets/video/bg-IA.gif'
        );
    } else {
        criticalResources.push(
            'assets/video/bg-video.mp4.webm',
            'assets/video/bg-IA.gif'
        );
    }
    
    // Preload recursos críticos
    criticalResources.forEach(function(resource) {
        if (resource.includes('.woff2')) {
            var link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.fetchPriority = 'high';
            document.head.appendChild(link);
        } else if (resource.includes('.webp') || resource.includes('.gif')) {
            var link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'image';
            link.fetchPriority = 'high';
            document.head.appendChild(link);
        } else if (resource.includes('.mp4') || resource.includes('.webm')) {
            var link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'video';
            link.type = 'video/webm';
            document.head.appendChild(link);
        }
    });
    
    // Otimizar renderização com GPU acceleration para elementos críticos
    var elementsToOptimize = [
        document.body,
        document.querySelector('.logo img'),
        document.querySelector('.hero-text h1'),
        document.querySelector('.hero-content'),
        document.querySelector('.video-bg')
    ];
    
    elementsToOptimize.forEach(function(el) {
        if (el) {
            el.style.willChange = 'transform';
            el.style.transform = 'translateZ(0)';
        }
    });
    
    // Otimizações específicas para mobile
    if (isMobile) {
        // Esconder vídeo no mobile
        var videoBg = document.querySelector('.video-bg');
        if (videoBg) {
            videoBg.style.display = 'none';
        }
        
        // Forçar carregamento de imagens críticas
        var criticalImages = document.querySelectorAll('img[src*="Renov-Logo"], img[src*="bg-como-funciona"]');
        criticalImages.forEach(function(img) {
            img.loading = 'eager';
            img.decoding = 'sync';
            img.fetchPriority = 'high';
        });
    }
    
    // Forçar repaint para melhorar Speed Index
    requestAnimationFrame(function() {
        document.body.offsetHeight; // Force reflow
        console.log('✅ LiteSpeed Cache optimizations applied');
    });
    
})(); 