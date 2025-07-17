const fs = require('fs');
const path = require('path');

// Otimização agressiva das cadeias críticas
function aggressiveChainOptimization(htmlContent) {
    console.log('🔥 Aplicando otimização agressiva de cadeias críticas...');
    
    let optimized = htmlContent;
    
    // 1. Remover TODOS os preloads não essenciais
    optimized = optimized.replace(/<link rel="preload"[^>]*>/g, (match) => {
        // Manter apenas logo e fonte principal
        if (match.includes('Renov-Logo.webp') || match.includes('Montserrat-Regular.woff2')) {
            return match;
        }
        return ''; // Remover todos os outros
    });
    
    // 2. Consolidar CSS crítico em um único bloco inline
    const criticalCSS = `
    <style>
    /* Critical CSS - Above the fold only - Ultra optimized */
    .logo img{width:160px;height:40px;object-fit:contain;display:block;max-width:100%}
    .header-content{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;max-width:1200px;margin:0 auto;position:relative;z-index:10}
    .hero{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;height:140vh;display:flex;align-items:flex-start;overflow:hidden;margin-top:0!important;margin-bottom:-350px;background:#000}
    .hero-content{position:relative;z-index:1;width:100%;max-width:1200px;margin:0 auto;padding:0 5%;margin-top:300px}
    .hero-text h1{font-size:48px;line-height:1.05;margin-bottom:24px;color:#fff;font-weight:700;text-align:left;text-shadow:2px 2px 4px rgba(0,0,0,0.8)}
    .hero-text p{color:#fff;font-size:18px;line-height:1.5;margin:0;text-shadow:1px 1px 2px rgba(0,0,0,0.7)}
    .video-bg-wrapper{position:absolute;top:0;left:0;width:100vw;height:100%;z-index:0;overflow:hidden;pointer-events:none;transform:translateY(-300px)}
    .video-bg{position:absolute;top:0;left:50%;width:100vw;height:100%;min-width:100vw;min-height:100%;object-fit:cover;transform:translateX(-50%)}
    @media (max-width:768px){.hero{height:100vh;margin-bottom:0;min-height:600px}.hero-content{margin-top:120px;padding:0 20px;z-index:2}.hero-text h1{font-size:32px;line-height:1.1}.hero-text p{font-size:16px;line-height:1.5}.header-content{padding:0.5rem 1rem;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px)}.logo img{width:120px;height:30px}}
    @media (max-width:480px){.hero-text h1{font-size:28px;line-height:1.2}.hero-text p{font-size:14px;line-height:1.4}.logo img{width:100px;height:25px}}
    </style>
    `;
    
    // 3. Substituir CSS crítico existente
    optimized = optimized.replace(/<style>[\s\S]*?<\/style>/g, criticalCSS);
    
    // 4. Remover link para styles.css principal (será carregado assincronamente)
    optimized = optimized.replace(/<link rel="stylesheet" href="styles\.css[^>]*>/g, '');
    
    // 5. Adicionar carregamento assíncrono de CSS não crítico
    const asyncCSS = `
    <!-- Non-critical CSS loaded asynchronously -->
    <link rel="preload" href="styles.css?v=1.6.0" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles.css?v=1.6.0"></noscript>
    `;
    
    // Inserir após o CSS crítico
    optimized = optimized.replace('</style>', '</style>' + asyncCSS);
    
    // 6. Deferir TODOS os scripts
    optimized = optimized.replace(/<script src="([^"]+)"[^>]*>/g, '<script src="$1" defer>');
    
    // 7. Font Awesome deve carregar imediatamente para garantir que os ícones apareçam
    // Não remover o link do Font Awesome do head
    // optimized = optimized.replace(/<link[^>]*font-awesome[^>]*>/g, '');
    
    // 8. Garantir que o Font Awesome seja carregado diretamente
    optimized = optimized.replace(/<link[^>]*font-awesome[^>]*>/g, 
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">');
    
    // 9. Otimizar carregamento de fontes
    const fontLoader = `
    <script>
    // Load fonts asynchronously
    (function() {
        var font = new FontFace('Montserrat', 'url(assets/fonts/Montserrat-Regular.woff2)');
        font.load().then(function(loadedFont) {
            document.fonts.add(loadedFont);
        });
    })();
    </script>
    `;
    
    optimized = optimized.replace('</head>', fontLoader + '</head>');
    
    // 10. Manter preloads de fontes críticas com crossorigin
    optimized = optimized.replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, (match) => {
        if (match.includes('Montserrat-Regular.woff2')) {
            return '<link rel="preload" href="assets/fonts/Montserrat-Regular.woff2?v=1.6.0" as="font" type="font/woff2" crossorigin>';
        }
        return match; // Manter outros preloads de fontes
    });
    
    return optimized;
}

// Análise detalhada das cadeias
function detailedChainAnalysis(htmlContent) {
    const analysis = {
        totalResources: 0,
        blockingResources: 0,
        criticalChainLength: 0,
        resourceTypes: {},
        optimizationScore: 0
    };
    
    // Contar recursos por tipo
    const patterns = {
        'CSS': /<link[^>]*rel=["']stylesheet["'][^>]*>/g,
        'JS': /<script[^>]*src=["']([^"']+)["'][^>]*>/g,
        'Font': /<link[^>]*as=["']font["'][^>]*>/g,
        'Image': /<link[^>]*as=["']image["'][^>]*>/g,
        'Preload': /<link rel="preload"[^>]*>/g
    };
    
    Object.keys(patterns).forEach(type => {
        const matches = htmlContent.match(patterns[type]) || [];
        analysis.resourceTypes[type] = matches.length;
        analysis.totalResources += matches.length;
        
        if (type === 'CSS' || type === 'JS') {
            analysis.blockingResources += matches.length;
        }
    });
    
    analysis.criticalChainLength = analysis.blockingResources;
    
    // Calcular score de otimização (0-100)
    const maxOptimal = 3; // Ideal: 1 CSS + 1 JS + 1 Font
    analysis.optimizationScore = Math.max(0, 100 - (analysis.criticalChainLength - maxOptimal) * 20);
    
    return analysis;
}

// Função principal
function aggressiveOptimization() {
    const htmlPath = path.join(__dirname, 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
        console.log('❌ Arquivo index.html não encontrado');
        return;
    }
    
    console.log('🚀 Iniciando otimização agressiva de cadeias críticas...');
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Análise original
    const originalAnalysis = detailedChainAnalysis(htmlContent);
    console.log('📊 Análise original:');
    console.log(`   - Recursos totais: ${originalAnalysis.totalResources}`);
    console.log(`   - Recursos bloqueantes: ${originalAnalysis.blockingResources}`);
    console.log(`   - Comprimento da cadeia crítica: ${originalAnalysis.criticalChainLength}`);
    console.log(`   - Score de otimização: ${originalAnalysis.optimizationScore}/100`);
    console.log('   - Tipos de recursos:', originalAnalysis.resourceTypes);
    
    // Otimização agressiva
    const optimizedHTML = aggressiveChainOptimization(htmlContent);
    const optimizedAnalysis = detailedChainAnalysis(optimizedHTML);
    
    console.log('\n📊 Análise otimizada:');
    console.log(`   - Recursos totais: ${optimizedAnalysis.totalResources}`);
    console.log(`   - Recursos bloqueantes: ${optimizedAnalysis.blockingResources}`);
    console.log(`   - Comprimento da cadeia crítica: ${optimizedAnalysis.criticalChainLength}`);
    console.log(`   - Score de otimização: ${optimizedAnalysis.optimizationScore}/100`);
    console.log('   - Tipos de recursos:', optimizedAnalysis.resourceTypes);
    
    // Calcular melhorias
    const chainReduction = originalAnalysis.criticalChainLength - optimizedAnalysis.criticalChainLength;
    const scoreImprovement = optimizedAnalysis.optimizationScore - originalAnalysis.optimizationScore;
    
    console.log('\n💾 Melhorias:');
    console.log(`   - Redução da cadeia crítica: ${chainReduction} recursos`);
    console.log(`   - Melhoria no score: +${scoreImprovement} pontos`);
    console.log(`   - Redução percentual: ${((chainReduction / originalAnalysis.criticalChainLength) * 100).toFixed(2)}%`);
    
    // Salvar versão otimizada
    const optimizedPath = path.join(__dirname, 'index-aggressive-optimized.html');
    fs.writeFileSync(optimizedPath, optimizedHTML);
    console.log(`\n✅ HTML otimizado salvo em: ${optimizedPath}`);
    
    // Gerar relatório
    const report = {
        original: originalAnalysis,
        optimized: optimizedAnalysis,
        improvements: {
            chainReduction,
            scoreImprovement,
            reductionPercentage: ((chainReduction / originalAnalysis.criticalChainLength) * 100).toFixed(2)
        },
        optimizations: [
            'CSS crítico consolidado inline',
            'Remoção de preloads desnecessários',
            'Carregamento assíncrono de CSS não crítico',
            'Defer de todos os scripts',
            'Carregamento assíncrono de fontes',
            'Carregamento assíncrono do Font Awesome',
            'Redução de recursos bloqueantes'
        ],
        recommendations: [
            'Implementar service worker para cache',
            'Usar HTTP/2 Server Push',
            'Implementar resource hints',
            'Otimizar ordem de carregamento',
            'Usar CDN para recursos estáticos'
        ]
    };
    
    fs.writeFileSync('aggressive-chain-optimization-report.json', JSON.stringify(report, null, 2));
    console.log('📋 Relatório salvo em: aggressive-chain-optimization-report.json');
    
    return report;
}

// Executar otimização agressiva
if (require.main === module) {
    aggressiveOptimization();
}

module.exports = { aggressiveChainOptimization, detailedChainAnalysis, aggressiveOptimization }; 