// Remove Version Parameters Script
// Remove automaticamente parâmetros de versão que causam problemas de CORS
// Script para resolver problemas de CORS em protocolo file://

(function() {
    'use strict';
    
    // Detectar se está rodando em file:// protocol
    const isFileProtocol = window.location.protocol === 'file:';
    
    if (isFileProtocol) {
        console.log('🔧 Removendo parâmetros de versão para resolver problemas de CORS...');
        
        // 1. Remover parâmetros de versão de todas as imagens
        removeVersionFromImages();
        
        // 2. Remover parâmetros de versão de fontes
        removeVersionFromFonts();
        
        // 3. Remover parâmetros de versão de scripts e CSS
        removeVersionFromResources();
        
        // 4. Corrigir preloads problemáticos
        fixPreloads();
    }
    
    function removeVersionFromImages() {
        const images = document.querySelectorAll('img[src*="?v="]');
        images.forEach(img => {
            const originalSrc = img.src.split('?')[0];
            img.src = originalSrc;
            console.log('🖼️ Removido parâmetro de versão da imagem:', originalSrc);
        });
        
        // Corrigir também elementos source
        const sources = document.querySelectorAll('source[srcset*="?v="]');
        sources.forEach(source => {
            const originalSrcset = source.srcset.split('?')[0];
            source.srcset = originalSrcset;
            console.log('🖼️ Removido parâmetro de versão do source:', originalSrcset);
        });
    }
    
    function removeVersionFromFonts() {
        const fontLinks = document.querySelectorAll('link[href*="?v="]');
        fontLinks.forEach(link => {
            if (link.href.includes('fonts/')) {
                const originalHref = link.href.split('?')[0];
                link.href = originalHref;
                console.log('🔤 Removido parâmetro de versão da fonte:', originalHref);
            }
        });
    }
    
    function removeVersionFromResources() {
        const resources = document.querySelectorAll('link[href*="?v="], script[src*="?v="]');
        resources.forEach(resource => {
            const originalHref = resource.href ? resource.href.split('?')[0] : resource.src.split('?')[0];
            if (resource.href) {
                resource.href = originalHref;
            } else if (resource.src) {
                resource.src = originalHref;
            }
            console.log('📦 Removido parâmetro de versão do recurso:', originalHref);
        });
    }
    
    function fixPreloads() {
        // Remover preloads problemáticos em file://
        const preloads = document.querySelectorAll('link[rel="preload"]');
        preloads.forEach(preload => {
            if (preload.href.includes('assets/')) {
                // Remover crossorigin se existir
                preload.removeAttribute('crossorigin');
                
                // Remover parâmetros de versão
                if (preload.href.includes('?v=')) {
                    const originalHref = preload.href.split('?')[0];
                    preload.href = originalHref;
                    console.log('⚡ Corrigido preload:', originalHref);
                }
            }
        });
    }
    
    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (isFileProtocol) {
                console.log('✅ Parâmetros de versão removidos com sucesso!');
            }
        });
    } else {
        if (isFileProtocol) {
            console.log('✅ Parâmetros de versão removidos com sucesso!');
        }
    }
    
})(); 