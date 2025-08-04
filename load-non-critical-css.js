// Script para carregar CSS não crítico de forma otimizada
(function() {
    'use strict';
    
    // Função para carregar CSS não crítico
    function loadNonCriticalCSS() {
        // Verificar se já foi carregado
        if (document.querySelector('link[href="non-critical-styles.css"]')) {
            return;
        }
        
        // Criar link para CSS não crítico
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'non-critical-styles.css';
        link.media = 'all';
        
        // Adicionar ao head
        document.head.appendChild(link);
        
        console.log('CSS não crítico carregado');
    }
    
    // Carregar quando a página estiver pronta
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNonCriticalCSS);
    } else {
        loadNonCriticalCSS();
    }
    
    // Carregar também quando a página estiver totalmente carregada
    window.addEventListener('load', function() {
        // Aguardar um pouco para não bloquear o FCP
        setTimeout(loadNonCriticalCSS, 100);
    });
    
    // Carregar quando o usuário interagir (scroll, click, etc.)
    let userInteracted = false;
    
    function onUserInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            loadNonCriticalCSS();
            
            // Remover listeners após primeira interação
            document.removeEventListener('scroll', onUserInteraction);
            document.removeEventListener('click', onUserInteraction);
            document.removeEventListener('touchstart', onUserInteraction);
        }
    }
    
    // Adicionar listeners para interação do usuário
    document.addEventListener('scroll', onUserInteraction, { passive: true });
    document.addEventListener('click', onUserInteraction, { passive: true });
    document.addEventListener('touchstart', onUserInteraction, { passive: true });
    
})(); 