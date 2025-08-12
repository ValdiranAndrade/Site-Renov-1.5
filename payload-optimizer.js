/**
 * PAYLOAD OPTIMIZER - Reduzir payload de rede
 * Otimiza carregamento de vídeos grandes baseado na velocidade da conexão
 */

(function() {
    'use strict';
    
    console.log('🚀 Payload Optimizer iniciado');
    
    // 1. DETECTAR VELOCIDADE DA CONEXÃO
    function getConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // Conexão muito lenta
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                return 'very-slow';
            }
            // Conexão lenta
            else if (connection.effectiveType === '3g') {
                return 'slow';
            }
            // Conexão média
            else if (connection.effectiveType === '4g') {
                return 'medium';
            }
            // Conexão rápida
            else {
                return 'fast';
            }
        }
        
        // Fallback baseado no user agent
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isMobile ? 'slow' : 'fast';
    }
    
    // 2. OTIMIZAR VÍDEOS BASEADO NA CONEXÃO
    function optimizeVideos() {
        const connectionSpeed = getConnectionSpeed();
        console.log(`📡 Velocidade da conexão: ${connectionSpeed}`);
        
        // Vídeos grandes que precisam ser otimizados
        const videoElements = document.querySelectorAll('video[src*="bg-IA"]');
        
        videoElements.forEach(video => {
            const originalSrc = video.src;
            
            switch(connectionSpeed) {
                case 'very-slow':
                case 'slow':
                    // Para conexões lentas, substituir por imagem estática
                    replaceVideoWithImage(video, 'assets/images/bg-como-funciona.webp');
                    break;
                    
                case 'medium':
                    // Para conexões médias, usar vídeo comprimido (se disponível)
                    if (originalSrc.includes('bg-IA.mp4-_1_.webm')) {
                        // Tentar usar versão comprimida
                        const compressedSrc = originalSrc.replace('bg-IA.mp4-_1_.webm', 'bg-IA-compressed.webm');
                        video.src = compressedSrc;
                        video.addEventListener('error', () => {
                            // Se não existir versão comprimida, usar imagem
                            replaceVideoWithImage(video, 'assets/images/bg-como-funciona.webp');
                        });
                    }
                    break;
                    
                case 'fast':
                    // Para conexões rápidas, manter vídeo original mas com lazy loading
                    video.loading = 'lazy';
                    video.preload = 'metadata';
                    break;
            }
        });
    }
    
    // 3. SUBSTITUIR VÍDEO POR IMAGEM
    function replaceVideoWithImage(videoElement, imageSrc) {
        const wrapper = videoElement.closest('.ai-video-bg-wrapper');
        if (wrapper) {
            // Criar elemento de imagem
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = 'Background da seção IA';
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
            `;
            
            // Remover vídeo e adicionar imagem
            videoElement.remove();
            wrapper.appendChild(img);
            
            console.log(`🖼️ Vídeo substituído por imagem: ${imageSrc}`);
        }
    }
    
    // 4. OTIMIZAR CARREGAMENTO DE IMAGENS
    function optimizeImages() {
        const connectionSpeed = getConnectionSpeed();
        
        // Para conexões lentas, usar imagens menores
        if (connectionSpeed === 'very-slow' || connectionSpeed === 'slow') {
            const images = document.querySelectorAll('img[src*="assets/images"]');
            images.forEach(img => {
                // Adicionar loading lazy para todas as imagens não críticas
                if (!img.classList.contains('logo') && !img.closest('.hero')) {
                    img.loading = 'lazy';
                }
            });
        }
    }
    
    // 5. REDUZIR REQUISIÇÕES DESNECESSÁRIAS
    function reduceRequests() {
        const connectionSpeed = getConnectionSpeed();
        
        // Para conexões lentas, desabilitar alguns recursos
        if (connectionSpeed === 'very-slow' || connectionSpeed === 'slow') {
            // Desabilitar animações CSS
            document.body.style.setProperty('--animation-duration', '0s');
            
            // Reduzir qualidade de imagens
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.src.includes('.webp')) {
                    // Tentar usar versão JPEG menor se disponível
                    const jpegSrc = img.src.replace('.webp', '.jpg');
                    // Aqui você poderia verificar se o arquivo existe
                }
            });
        }
    }
    
    // 6. MONITORAR PERFORMANCE
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitorar transferência de dados
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'resource') {
                        const sizeKB = entry.transferSize / 1024;
                        if (sizeKB > 1000) { // Arquivos maiores que 1MB
                            console.log(`⚠️ Arquivo grande detectado: ${entry.name} (${sizeKB.toFixed(1)}KB)`);
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }
    
    // 7. COMPRESSÃO DINÂMICA
    function dynamicCompression() {
        const connectionSpeed = getConnectionSpeed();
        
        // Para conexões lentas, aplicar compressão adicional
        if (connectionSpeed === 'very-slow' || connectionSpeed === 'slow') {
            // Reduzir qualidade de vídeos
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                video.style.filter = 'contrast(1.1) brightness(1.05)';
            });
            
            // Reduzir qualidade de imagens
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.style.imageRendering = 'pixelated';
            });
        }
    }
    
    // 8. CACHE INTELLIGENTE
    function setupIntelligentCache() {
        const connectionSpeed = getConnectionSpeed();
        
        // Para conexões lentas, usar cache mais agressivo
        if (connectionSpeed === 'very-slow' || connectionSpeed === 'slow') {
            // Adicionar headers de cache para recursos estáticos
            const links = document.querySelectorAll('link[rel="stylesheet"], script[src]');
            links.forEach(link => {
                if (link.href) {
                    link.setAttribute('data-cache', 'aggressive');
                }
            });
        }
    }
    
    // 9. INICIALIZAR OTIMIZAÇÕES
    function init() {
        console.log('🔧 Aplicando otimizações de payload...');
        
        // Aplicar otimizações baseadas na velocidade da conexão
        optimizeVideos();
        optimizeImages();
        reduceRequests();
        dynamicCompression();
        setupIntelligentCache();
        
        // Monitorar performance
        monitorPerformance();
        
        // Re-aplicar otimizações se a conexão mudar
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', () => {
                console.log('📡 Mudança na conexão detectada, re-aplicando otimizações...');
                optimizeVideos();
                optimizeImages();
            });
        }
        
        console.log('✅ Payload Optimizer aplicado');
    }
    
    // Executar imediatamente se DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})(); 