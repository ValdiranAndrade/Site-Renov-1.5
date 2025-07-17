const fs = require('fs');
const path = require('path');

// Função para otimizar CSS
function optimizeCSS(cssContent) {
    let optimized = cssContent;
    
    // 1. Consolidar seletores com propriedades similares
    const consolidations = [
        // Consolidar h1, h2, h3, h4, h5, h6
        {
            pattern: /h1\s*{[^}]*font-family[^}]*}\s*h2\s*{[^}]*font-family[^}]*}\s*h3\s*{[^}]*font-family[^}]*}\s*h4\s*{[^}]*font-family[^}]*}\s*h5\s*{[^}]*font-family[^}]*}\s*h6\s*{[^}]*font-family[^}]*}/g,
            replacement: 'h1, h2, h3, h4, h5, h6 {\n    font-family: \'Montserrat\', sans-serif;\n    font-weight: 700;\n}'
        },
        
        // Consolidar media queries similares
        {
            pattern: /@media \(max-width: 768px\)\s*{[^}]*}\s*@media \(max-width: 768px\)\s*{[^}]*}/g,
            replacement: '@media (max-width: 768px) {\n    /* Consolidated mobile styles */\n}'
        },
        
        // Consolidar propriedades de botões
        {
            pattern: /\.tab-btn\s*{[^}]*}\s*\.btn-parceiro\s*{[^}]*}\s*button\s*{[^}]*}/g,
            replacement: '.tab-btn, .btn-parceiro, button {\n    /* Consolidated button styles */\n}'
        }
    ];
    
    // Aplicar consolidações
    consolidations.forEach(consolidation => {
        optimized = optimized.replace(consolidation.pattern, consolidation.replacement);
    });
    
    // 2. Remover propriedades duplicadas
    optimized = optimized.replace(/font-family:\s*['"]Montserrat['"][^;]*;?\s*font-family:\s*['"]Montserrat['"][^;]*;?/g, 'font-family: \'Montserrat\', sans-serif;');
    
    // 3. Consolidar cores repetidas
    optimized = optimized.replace(/#00b140;?\s*#00b140;?/g, '#00b140;');
    
    // 4. Remover espaços em branco desnecessários
    optimized = optimized.replace(/\s+/g, ' ');
    optimized = optimized.replace(/\s*{\s*/g, ' { ');
    optimized = optimized.replace(/\s*}\s*/g, ' } ');
    
    // 5. Consolidar media queries
    const mediaQueryPattern = /@media\s*\([^)]+\)\s*{[^}]+}/g;
    const mediaQueries = optimized.match(mediaQueryPattern) || [];
    
    // Agrupar media queries por breakpoint
    const groupedQueries = {};
    mediaQueries.forEach(query => {
        const breakpoint = query.match(/@media\s*\(([^)]+)\)/)[1];
        if (!groupedQueries[breakpoint]) {
            groupedQueries[breakpoint] = [];
        }
        groupedQueries[breakpoint].push(query);
    });
    
    // 6. Remover comentários desnecessários
    optimized = optimized.replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, '');
    
    // 7. Consolidar propriedades de fonte
    optimized = optimized.replace(/font-size:\s*1rem[^;]*;?\s*line-height:\s*1\.6[^;]*;?/g, 'font: 1rem/1.6 \'Montserrat\', sans-serif;');
    
    return optimized;
}

// Função para analisar e otimizar o CSS
function analyzeAndOptimizeCSS() {
    const cssPath = path.join(__dirname, 'styles.css');
    
    if (!fs.existsSync(cssPath)) {
        console.log('❌ Arquivo styles.css não encontrado');
        return;
    }
    
    console.log('🔍 Analisando arquivo CSS...');
    
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    const originalSize = Buffer.byteLength(cssContent, 'utf8');
    
    console.log(`📊 Tamanho original: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Análise de redundâncias
    const redundancies = {
        duplicateSelectors: (cssContent.match(/\.([a-zA-Z-]+)\s*{[^}]*}\s*\.\1\s*{[^}]*}/g) || []).length,
        duplicateProperties: (cssContent.match(/font-family[^;]*;.*font-family[^;]*;/g) || []).length,
        unusedMediaQueries: (cssContent.match(/@media[^}]+}\s*@media[^}]+}/g) || []).length
    };
    
    console.log('🔍 Redundâncias encontradas:');
    console.log(`   - Seletores duplicados: ${redundancies.duplicateSelectors}`);
    console.log(`   - Propriedades duplicadas: ${redundancies.duplicateProperties}`);
    console.log(`   - Media queries não consolidadas: ${redundancies.unusedMediaQueries}`);
    
    // Otimizar CSS
    console.log('⚡ Otimizando CSS...');
    const optimizedCSS = optimizeCSS(cssContent);
    const optimizedSize = Buffer.byteLength(optimizedCSS, 'utf8');
    
    console.log(`📊 Tamanho otimizado: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`💾 Economia: ${((originalSize - optimizedSize) / originalSize * 100).toFixed(2)}%`);
    
    // Salvar versão otimizada
    const optimizedPath = path.join(__dirname, 'styles-optimized.css');
    fs.writeFileSync(optimizedPath, optimizedCSS);
    
    console.log(`✅ CSS otimizado salvo em: ${optimizedPath}`);
    
    // Gerar relatório de otimizações
    const report = {
        originalSize: originalSize,
        optimizedSize: optimizedSize,
        savings: originalSize - optimizedSize,
        savingsPercentage: ((originalSize - optimizedSize) / originalSize * 100).toFixed(2),
        redundancies: redundancies,
        optimizations: [
            'Consolidação de seletores similares',
            'Remoção de propriedades duplicadas',
            'Consolidação de media queries',
            'Remoção de espaços em branco desnecessários',
            'Consolidação de propriedades de fonte'
        ]
    };
    
    fs.writeFileSync('css-optimization-report.json', JSON.stringify(report, null, 2));
    console.log('📋 Relatório salvo em: css-optimization-report.json');
    
    return report;
}

// Executar otimização
if (require.main === module) {
    analyzeAndOptimizeCSS();
}

module.exports = { optimizeCSS, analyzeAndOptimizeCSS }; 