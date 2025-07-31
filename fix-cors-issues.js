// Fix CORS and Image Loading Issues
// Resolve problemas de CORS e carregamento de imagens

(function() {
    'use strict';
    
    // Detectar se está rodando em file:// protocol
    const isFileProtocol = window.location.protocol === 'file:';
    
    if (isFileProtocol) {
        console.log('🔧 Detectado protocolo file:// - aplicando correções...');
        
        // 1. Corrigir problemas de CORS para imagens
        fixImageCORS();
        
        // 2. Desabilitar otimizações mobile que causam problemas
        disableProblematicOptimizations();
        
        // 3. Garantir que imagens carreguem corretamente
        ensureImageLoading();
    }
    
    function fixImageCORS() {
        // Adicionar crossorigin para imagens que podem ter problemas de CORS
        const images = document.querySelectorAll('img[src*="assets/images/"]');
        images.forEach(img => {
            // Remover crossorigin se existir para evitar problemas
            img.removeAttribute('crossorigin');
            
            // Garantir que imagens carreguem mesmo com problemas de CORS
            img.onerror = function() {
                console.log('⚠️ Erro ao carregar imagem:', img.src);
                // Tentar recarregar sem parâmetros de versão
                const originalSrc = img.src.split('?')[0];
                if (img.src !== originalSrc) {
                    img.src = originalSrc;
                }
            };
        });
        
        // Corrigir problemas específicos de fontes
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            link.setAttribute('crossorigin', 'anonymous');
        });
        
        // Corrigir preload de fontes
        const fontPreloads = document.querySelectorAll('link[href*="Montserrat"]');
        fontPreloads.forEach(link => {
            link.setAttribute('crossorigin', 'anonymous');
        });
    }
    
    function disableProblematicOptimizations() {
        // Desabilitar otimizações que causam problemas em file://
        const mobileOptimizer = document.querySelector('script[src*="mobile-performance-optimizer"]');
        if (mobileOptimizer) {
            mobileOptimizer.remove();
            console.log('🚫 Desabilitado mobile-performance-optimizer para evitar problemas');
        }
        
        // Remover service worker se estiver causando problemas
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => {
                    registration.unregister();
                    console.log('🚫 Service Worker desregistrado para evitar problemas');
                });
            });
        }
    }
    
    function ensureImageLoading() {
        // Garantir que imagens de partners carreguem corretamente
        const partnerImages = document.querySelectorAll('img[src*="assets/images/partners/"]');
        partnerImages.forEach(img => {
            // Verificar se a imagem existe
            const testImg = new Image();
            testImg.onload = function() {
                console.log('✅ Imagem carregada com sucesso:', img.src);
            };
            testImg.onerror = function() {
                console.log('❌ Imagem não encontrada:', img.src);
                // Tentar carregar sem parâmetros de versão
                const originalSrc = img.src.split('?')[0];
                if (img.src !== originalSrc) {
                    img.src = originalSrc;
                }
            };
            testImg.src = img.src;
        });
    }
    
    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (isFileProtocol) {
                console.log('🔧 Aplicando correções para protocolo file://');
            }
        });
    } else {
        if (isFileProtocol) {
            console.log('🔧 Aplicando correções para protocolo file://');
        }
    }
    
})(); 