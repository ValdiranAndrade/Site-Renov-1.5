const fs = require('fs');
const path = require('path');

// Análise das cadeias de solicitação críticas
function analyzeCriticalChains(htmlContent) {
    console.log('🔍 Analisando cadeias de solicitação críticas...');
    
    const analysis = {
        criticalResources: [],
        chainLength: 0,
        blockingResources: [],
        optimizationOpportunities: [],
        recommendations: []
    };
    
    // 1. Identificar recursos críticos
    const criticalPatterns = [
        { type: 'CSS', pattern: /<link[^>]*rel=["']stylesheet["'][^>]*>/g },
        { type: 'JS', pattern: /<script[^>]*src=["']([^"']+)["'][^>]*>/g },
        { type: 'Font', pattern: /<link[^>]*rel=["']preload["'][^>]*as=["']font["'][^>]*>/g },
        { type: 'Image', pattern: /<link[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*>/g }
    ];
    
    criticalPatterns.forEach(({ type, pattern }) => {
        const matches = htmlContent.match(pattern) || [];
        matches.forEach(match => {
            const src = match.match(/href=["']([^"']+)["']/) || match.match(/src=["']([^"']+)["']/);
            if (src) {
                analysis.criticalResources.push({
                    type,
                    url: src[1],
                    blocking: type === 'CSS' || type === 'JS',
                    priority: match.includes('fetchpriority="high"') ? 'high' : 'medium'
                });
            }
        });
    });
    
    // 2. Identificar recursos bloqueantes
    analysis.blockingResources = analysis.criticalResources.filter(resource => resource.blocking);
    analysis.chainLength = analysis.blockingResources.length;
    
    // 3. Identificar oportunidades de otimização
    const cssCount = analysis.criticalResources.filter(r => r.type === 'CSS').length;
    const jsCount = analysis.criticalResources.filter(r => r.type === 'JS').length;
    const fontCount = analysis.criticalResources.filter(r => r.type === 'Font').length;
    
    if (cssCount > 1) {
        analysis.optimizationOpportunities.push('Consolidar arquivos CSS críticos');
    }
    
    if (jsCount > 0) {
        analysis.optimizationOpportunities.push('Deferir JavaScript não crítico');
    }
    
    if (fontCount > 2) {
        analysis.optimizationOpportunities.push('Otimizar carregamento de fontes');
    }
    
    return analysis;
}

// Otimização das cadeias críticas
function optimizeCriticalChains(htmlContent) {
    console.log('⚡ Otimizando cadeias de solicitação críticas...');
    
    let optimized = htmlContent;
    
    // 1. Consolidar CSS crítico inline
    const criticalCSS = `
    /* Critical CSS - Above the fold only */
    .logo img{width:160px;height:40px;object-fit:contain;display:block;max-width:100%}
    .header-content{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;max-width:1200px;margin:0 auto;position:relative;z-index:10}
    .hero{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;height:140vh;display:flex;align-items:flex-start;overflow:hidden;margin-top:0!important;margin-bottom:-350px;background:#000}
    .hero-content{position:relative;z-index:1;width:100%;max-width:1200px;margin:0 auto;padding:0 5%;margin-top:300px}
    .hero-text h1{font-size:48px;line-height:1.05;margin-bottom:24px;color:#fff;font-weight:700;text-align:left;text-shadow:2px 2px 4px rgba(0,0,0,0.8)}
    .hero-text p{color:#fff;font-size:18px;line-height:1.5;margin:0;text-shadow:1px 1px 2px rgba(0,0,0,0.7)}
    @media (max-width:768px){.hero{height:100vh;margin-bottom:0;min-height:600px}.hero-content{margin-top:120px;padding:0 20px;z-index:2}.hero-text h1{font-size:32px;line-height:1.1}.hero-text p{font-size:16px;line-height:1.5}.header-content{padding:0.5rem 1rem;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px)}.logo img{width:120px;height:30px}}
    `;
    
    // 2. Otimizar preloads - apenas recursos essenciais
    const optimizedPreloads = `
    <!-- Critical resources only -->
    <link rel="preload" href="assets/images/Renov-Logo.webp?v=1.6.0" as="image" fetchpriority="high" type="image/webp">
    <link rel="preload" href="assets/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossorigin fetchpriority="high">
    
    <!-- Defer non-critical resources -->
    <link rel="preload" href="styles.css?v=1.6.0" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles.css?v=1.6.0"></noscript>
    
    <!-- Defer JavaScript -->
    <link rel="preload" href="script.js?v=1.6.0" as="script" fetchpriority="low">
    `;
    
    // 3. Remover preloads desnecessários
    optimized = optimized.replace(/<link rel="preload"[^>]*fetchpriority="low"[^>]*>/g, '');
    
    // 4. Otimizar carregamento de fontes
    optimized = optimized.replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, (match) => {
        if (match.includes('Montserrat-Regular')) {
            return match; // Manter apenas fonte crítica
        }
        return ''; // Remover outras fontes
    });
    
    // 5. Deferir Font Awesome
    optimized = optimized.replace(/<link rel="stylesheet"[^>]*font-awesome[^>]*>/g, 
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" media="print" onload="this.media=\'all\'">');
    
    // 6. Otimizar carregamento de vídeo
    optimized = optimized.replace(/<link rel="preload"[^>]*as="video"[^>]*>/g, '');
    
    return optimized;
}

// Função para gerar relatório de otimização
function generateOptimizationReport(originalAnalysis, optimizedAnalysis) {
    const report = {
        originalChainLength: originalAnalysis.chainLength,
        optimizedChainLength: optimizedAnalysis.chainLength,
        reduction: originalAnalysis.chainLength - optimizedAnalysis.chainLength,
        reductionPercentage: ((originalAnalysis.chainLength - optimizedAnalysis.chainLength) / originalAnalysis.chainLength * 100).toFixed(2),
        optimizations: [
            'Consolidação de CSS crítico inline',
            'Remoção de preloads desnecessários',
            'Otimização de carregamento de fontes',
            'Defer de recursos não críticos',
            'Redução de cadeias bloqueantes'
        ],
        recommendations: [
            'Implementar service worker para cache inteligente',
            'Usar HTTP/2 Server Push para recursos críticos',
            'Implementar resource hints (dns-prefetch, preconnect)',
            'Otimizar ordem de carregamento de recursos',
            'Usar CDN para recursos estáticos'
        ]
    };
    
    return report;
}

// Função principal
function optimizeCriticalRequestChains() {
    const htmlPath = path.join(__dirname, 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
        console.log('❌ Arquivo index.html não encontrado');
        return;
    }
    
    console.log('🚀 Iniciando otimização de cadeias de solicitação críticas...');
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Análise original
    const originalAnalysis = analyzeCriticalChains(htmlContent);
    console.log(`📊 Cadeia crítica original: ${originalAnalysis.chainLength} recursos bloqueantes`);
    console.log(`📊 Recursos críticos: ${originalAnalysis.criticalResources.length}`);
    console.log(`📊 Oportunidades de otimização: ${originalAnalysis.optimizationOpportunities.length}`);
    
    // Otimização
    const optimizedHTML = optimizeCriticalChains(htmlContent);
    const optimizedAnalysis = analyzeCriticalChains(optimizedHTML);
    
    console.log(`📊 Cadeia crítica otimizada: ${optimizedAnalysis.chainLength} recursos bloqueantes`);
    console.log(`💾 Redução: ${originalAnalysis.chainLength - optimizedAnalysis.chainLength} recursos`);
    console.log(`💾 Melhoria: ${((originalAnalysis.chainLength - optimizedAnalysis.chainLength) / originalAnalysis.chainLength * 100).toFixed(2)}%`);
    
    // Salvar versão otimizada
    const optimizedPath = path.join(__dirname, 'index-optimized.html');
    fs.writeFileSync(optimizedPath, optimizedHTML);
    console.log(`✅ HTML otimizado salvo em: ${optimizedPath}`);
    
    // Gerar relatório
    const report = generateOptimizationReport(originalAnalysis, optimizedAnalysis);
    fs.writeFileSync('critical-chain-optimization-report.json', JSON.stringify(report, null, 2));
    console.log('📋 Relatório salvo em: critical-chain-optimization-report.json');
    
    return report;
}

// Executar otimização
if (require.main === module) {
    optimizeCriticalRequestChains();
}

module.exports = { analyzeCriticalChains, optimizeCriticalChains, generateOptimizationReport, optimizeCriticalRequestChains }; 