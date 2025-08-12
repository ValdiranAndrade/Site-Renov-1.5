# Guia de Otimização de Fontes - Renov

## Problema Identificado
O site estava usando fontes próprias (Montserrat) que causavam:
- **Carregamento lento** das fontes
- **Layout shift** durante o carregamento
- **Maior payload** de rede
- **Manutenção complexa** dos arquivos de fonte

## Solução Implementada

### Migração para Google Fonts - Inter

#### 1. **Fonte Escolhida: Inter**
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Características**: Moderna, otimizada para performance, excelente legibilidade

#### 2. **Implementação HTML**
```html
<!-- Google Fonts - Inter -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

#### 3. **Atualização CSS**
```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 700;
}
```

## Benefícios Alcançados

### Performance
- **Carregamento mais rápido** das fontes
- **Redução do payload** de rede
- **Melhor cache** via CDN do Google
- **Otimização automática** de formatos

### SEO e Core Web Vitals
- **Melhoria no CLS** (Cumulative Layout Shift)
- **Melhor pontuação** em ferramentas de performance
- **Conformidade** com as diretrizes do Google

### Manutenção
- **Sem necessidade** de gerenciar arquivos de fonte
- **Atualizações automáticas** via Google Fonts
- **Compatibilidade garantida** com navegadores
- **Fallbacks robustos** implementados

## Arquivos Atualizados

### HTML
- ✅ `index.html` - Adicionado Google Fonts, removido font-face
- ✅ `contato-parceiros.html` - Atualizado para Inter
- ✅ `vagas.html` - Atualizado para Inter

### CSS
- ✅ `styles.css` - Todas as referências atualizadas
- ✅ Removidas declarações @font-face
- ✅ Implementados fallbacks robustos

### Service Worker
- ✅ `sw.min.js` - Removidas referências às fontes próprias

## Fallbacks Implementados

### Stack de Fontes
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Ordem de Prioridade
1. **Inter** (Google Fonts)
2. **-apple-system** (San Francisco no macOS/iOS)
3. **BlinkMacSystemFont** (San Francisco no Chrome)
4. **Segoe UI** (Windows)
5. **Roboto** (Android)
6. **sans-serif** (Fallback genérico)

## Otimizações de Performance

### 1. Preconnect
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 2. Display Swap
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3. Fontes Removidas
- ❌ `assets/fonts/Montserrat-Regular.woff2` (96KB)
- ❌ `assets/fonts/Montserrat-Medium.woff2` (96KB)
- ❌ Declarações @font-face no CSS

## Monitoramento

### Métricas a Acompanhar
- Tempo de carregamento das fontes
- CLS (Cumulative Layout Shift)
- Pontuação do Lighthouse Performance
- Core Web Vitals

### Ferramentas Recomendadas
- Google PageSpeed Insights
- Lighthouse
- Chrome DevTools Network Tab
- WebPageTest

## Boas Práticas Implementadas

### 1. Carregamento Otimizado
- Preconnect para domínios externos
- Display swap para evitar layout shift
- Fallbacks robustos

### 2. Performance
- Uso de CDN do Google
- Cache otimizado
- Compressão automática

### 3. Acessibilidade
- Fallbacks para navegadores antigos
- Suporte a diferentes sistemas operacionais
- Legibilidade mantida

## Manutenção

### Verificações Periódicas
- Monitorar carregamento das fontes
- Verificar fallbacks em diferentes dispositivos
- Testar em conexões lentas

### Novos Elementos
- Sempre usar a stack de fontes definida
- Manter consistência visual
- Testar em diferentes navegadores

---

**Última atualização**: Agosto 2024
**Versão**: 1.6.0
**Fonte anterior**: Montserrat (própria)
**Fonte atual**: Inter (Google Fonts)
**Redução de payload**: ~192KB (96KB + 96KB)
**Melhoria de performance**: Significativa 