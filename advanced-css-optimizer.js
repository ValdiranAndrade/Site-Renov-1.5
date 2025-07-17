const fs = require('fs');
const path = require('path');

// Função para otimizações avançadas de CSS
function advancedCSSOptimization(cssContent) {
    let optimized = cssContent;
    
    console.log('🔧 Aplicando otimizações avançadas...');
    
    // 1. Consolidar seletores com propriedades idênticas (como no exemplo)
    const selectorConsolidations = [
        // Exemplo: h1 { background-color: #000000; } h2 { background-color: #000000; }
        // → h1, h2 { background-color: #000000; }
        {
            pattern: /([a-zA-Z0-9._#-]+)\s*{\s*([^}]+)}\s*\1\s*{\s*\2\s*}/g,
            replacement: '$1, $1 { $2 }'
        },
        
        // Consolidar seletores com propriedades similares
        {
            pattern: /h1\s*{\s*font-family[^}]+}\s*h2\s*{\s*font-family[^}]+}\s*h3\s*{\s*font-family[^}]+}\s*h4\s*{\s*font-family[^}]+}\s*h5\s*{\s*font-family[^}]+}\s*h6\s*{\s*font-family[^}]+}/g,
            replacement: 'h1, h2, h3, h4, h5, h6 { font-family: \'Montserrat\', sans-serif; font-weight: 700; }'
        },
        
        // Consolidar botões
        {
            pattern: /\.tab-btn\s*{\s*([^}]+)}\s*\.btn-parceiro\s*{\s*\1\s*}/g,
            replacement: '.tab-btn, .btn-parceiro { $1 }'
        }
    ];
    
    selectorConsolidations.forEach(consolidation => {
        optimized = optimized.replace(consolidation.pattern, consolidation.replacement);
    });
    
    // 2. Consolidar propriedades de fonte
    optimized = optimized.replace(/font-size:\s*([^;]+);\s*line-height:\s*([^;]+);\s*font-weight:\s*([^;]+);/g, 'font: $1/$2; font-weight: $3;');
    
    // 3. Consolidar propriedades de margem e padding
    optimized = optimized.replace(/margin-top:\s*([^;]+);\s*margin-bottom:\s*([^;]+);\s*margin-left:\s*([^;]+);\s*margin-right:\s*([^;]+);/g, 'margin: $1 $3 $2 $4;');
    
    // 4. Consolidar propriedades de borda
    optimized = optimized.replace(/border-width:\s*([^;]+);\s*border-style:\s*([^;]+);\s*border-color:\s*([^;]+);/g, 'border: $1 $2 $3;');
    
    // 5. Remover propriedades redundantes
    optimized = optimized.replace(/background-color:\s*([^;]+);\s*background:\s*[^;]+;/g, 'background: $1;');
    
    // 6. Consolidar media queries duplicadas
    const mediaQueryRegex = /@media\s*\([^)]+\)\s*{[^}]+}/g;
    const mediaQueries = optimized.match(mediaQueryRegex) || [];
    
    // Agrupar por breakpoint
    const groupedQueries = {};
    mediaQueries.forEach(query => {
        const breakpoint = query.match(/@media\s*\(([^)]+)\)/)[1];
        if (!groupedQueries[breakpoint]) {
            groupedQueries[breakpoint] = [];
        }
        groupedQueries[breakpoint].push(query);
    });
    
    // Consolidar media queries do mesmo breakpoint
    Object.keys(groupedQueries).forEach(breakpoint => {
        if (groupedQueries[breakpoint].length > 1) {
            const combinedContent = groupedQueries[breakpoint]
                .map(query => query.replace(/@media\s*\([^)]+\)\s*{\s*([^}]+)\s*}/, '$1'))
                .join('\n');
            
            const consolidatedQuery = `@media (${breakpoint}) {\n    ${combinedContent}\n}`;
            
            // Substituir todas as media queries duplicadas pela versão consolidada
            groupedQueries[breakpoint].forEach(query => {
                optimized = optimized.replace(query, '');
            });
            
            optimized += `\n${consolidatedQuery}`;
        }
    });
    
    // 7. Remover espaços em branco desnecessários
    optimized = optimized.replace(/\s+/g, ' ');
    optimized = optimized.replace(/\s*{\s*/g, ' { ');
    optimized = optimized.replace(/\s*}\s*/g, ' } ');
    optimized = optimized.replace(/\s*;\s*/g, '; ');
    
    // 8. Remover comentários desnecessários
    optimized = optimized.replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, '');
    
    // 9. Consolidar cores hexadecimais
    optimized = optimized.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, '#$1$2$3');
    
    // 10. Remover propriedades com valores padrão
    optimized = optimized.replace(/font-weight:\s*normal;/g, '');
    optimized = optimized.replace(/font-style:\s*normal;/g, '');
    optimized = optimized.replace(/text-decoration:\s*none;/g, '');
    
    return optimized;
}

// Função para análise detalhada
function detailedAnalysis(cssContent) {
    const analysis = {
        totalSelectors: (cssContent.match(/[.#]?[a-zA-Z0-9_-]+\s*{/g) || []).length,
        duplicateSelectors: 0,
        mediaQueries: (cssContent.match(/@media/g) || []).length,
        duplicateMediaQueries: 0,
        fileSize: Buffer.byteLength(cssContent, 'utf8'),
        potentialSavings: 0
    };
    
    // Encontrar seletores duplicados
    const selectors = cssContent.match(/[.#]?[a-zA-Z0-9_-]+\s*{[^}]+}/g) || [];
    const selectorMap = {};
    
    selectors.forEach(selector => {
        const selectorName = selector.match(/^[.#]?[a-zA-Z0-9_-]+/)[0];
        const properties = selector.match(/{([^}]+)}/)[1];
        
        if (selectorMap[selectorName]) {
            if (selectorMap[selectorName].includes(properties)) {
                analysis.duplicateSelectors++;
            }
        } else {
            selectorMap[selectorName] = [];
        }
        selectorMap[selectorName].push(properties);
    });
    
    return analysis;
}

// Função principal
function optimizeCSSAdvanced() {
    const cssPath = path.join(__dirname, 'styles.css');
    
    if (!fs.existsSync(cssPath)) {
        console.log('❌ Arquivo styles.css não encontrado');
        return;
    }
    
    console.log('🔍 Iniciando análise avançada do CSS...');
    
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    const originalSize = Buffer.byteLength(cssContent, 'utf8');
    
    console.log(`📊 Tamanho original: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Análise detalhada
    const analysis = detailedAnalysis(cssContent);
    console.log('📈 Análise detalhada:');
    console.log(`   - Total de seletores: ${analysis.totalSelectors}`);
    console.log(`   - Seletores duplicados: ${analysis.duplicateSelectors}`);
    console.log(`   - Media queries: ${analysis.mediaQueries}`);
    
    // Otimização avançada
    const optimizedCSS = advancedCSSOptimization(cssContent);
    const optimizedSize = Buffer.byteLength(optimizedCSS, 'utf8');
    
    console.log(`📊 Tamanho otimizado: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`💾 Economia total: ${((originalSize - optimizedSize) / originalSize * 100).toFixed(2)}%`);
    console.log(`💾 Bytes economizados: ${(originalSize - optimizedSize).toLocaleString()}`);
    
    // Salvar versão otimizada
    const optimizedPath = path.join(__dirname, 'styles-advanced-optimized.css');
    fs.writeFileSync(optimizedPath, optimizedCSS);
    
    console.log(`✅ CSS otimizado salvo em: ${optimizedPath}`);
    
    // Gerar relatório avançado
    const advancedReport = {
        originalSize: originalSize,
        optimizedSize: optimizedSize,
        savings: originalSize - optimizedSize,
        savingsPercentage: ((originalSize - optimizedSize) / originalSize * 100).toFixed(2),
        analysis: analysis,
        optimizations: [
            'Consolidação de seletores com propriedades idênticas',
            'Consolidação de propriedades de fonte',
            'Consolidação de margens e paddings',
            'Consolidação de bordas',
            'Remoção de propriedades redundantes',
            'Consolidação de media queries',
            'Remoção de espaços em branco',
            'Consolidação de cores hexadecimais',
            'Remoção de propriedades com valores padrão'
        ],
        recommendations: [
            'Considere usar CSS custom properties (variáveis) para cores e valores repetidos',
            'Implemente critical CSS para carregamento mais rápido',
            'Use CSS minification em produção',
            'Considere dividir CSS em módulos para melhor manutenção'
        ]
    };
    
    fs.writeFileSync('advanced-css-optimization-report.json', JSON.stringify(advancedReport, null, 2));
    console.log('📋 Relatório avançado salvo em: advanced-css-optimization-report.json');
    
    return advancedReport;
}

// Executar otimização avançada
if (require.main === module) {
    optimizeCSSAdvanced();
}

module.exports = { advancedCSSOptimization, detailedAnalysis, optimizeCSSAdvanced }; 