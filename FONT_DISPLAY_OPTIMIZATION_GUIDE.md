# Guia de Otimização Font-Display - Renov

## Problema Identificado
O carregamento de fontes estava causando trocas de layout (CLS) e atrasos na exibição do texto, impactando negativamente a experiência do usuário e os Core Web Vitals.

## Estratégias de Font-Display Implementadas

### 1. Font-Display: Optional (Textos Críticos)
**Aplicado em**: Títulos principais e elementos críticos
```css
.hero-text h1,
.hero-text h2,
.diferencial-title,
.avaliacao-titulo,
.diagnostico-titulo,
.pagamento-titulo,
.novo-titulo {
    font-display: optional;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    min-height: 1.2em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    box-sizing: border-box;
}
```

**Benefícios**:
- **Sem troca de layout**: A fonte só é aplicada se já estiver carregada
- **Fallback imediato**: Usa fontes do sistema até a fonte customizada carregar
- **Performance máxima**: Elimina completamente o CLS relacionado a fontes

### 2. Font-Display: Fallback (Textos Secundários)
**Aplicado em**: Parágrafos e textos descritivos
```css
.hero-text p,
.diferencial-text,
.avaliacao-descricao,
.diagnostico-descricao,
.pagamento-descricao,
.novo-descricao {
    font-display: fallback;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    min-height: 1.5em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    box-sizing: border-box;
}
```

**Benefícios**:
- **Tempo de espera curto**: 100ms para trocar para a fonte customizada
- **Fallback garantido**: Sempre exibe texto com fonte do sistema
- **Balanceamento**: Entre performance e consistência visual

### 3. Font-Display: Swap (Elementos Interativos)
**Aplicado em**: Botões e links de navegação
```css
.tab-btn,
.social-links a,
.cta-button {
    font-display: swap;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
```

**Benefícios**:
- **Troca imediata**: Aplica a fonte customizada assim que carregar
- **Interatividade**: Mantém elementos funcionais durante carregamento
- **Experiência consistente**: Garante que botões tenham a aparência correta

## Declarações @font-face Otimizadas

### HTML (Critical CSS)
```html
@font-face{
    font-family:'Montserrat';
    src:url('assets/fonts/Montserrat-Regular.woff2') format('woff2');
    font-weight:400;
    font-style:normal;
    font-display:optional
}
@font-face{
    font-family:'Montserrat';
    src:url('assets/fonts/Montserrat-Medium.woff2') format('woff2');
    font-weight:500;
    font-style:normal;
    font-display:optional
}
```

### CSS Principal
```css
@font-face {
    font-family: 'Montserrat';
    src: url('assets/fonts/Montserrat-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: optional;
    font-display: fallback;
}
```

## Preload de Fontes Críticas

### HTML Head
```html
<!-- FONT PRELOADS - Otimizados para reduzir CLS -->
<link rel="preload" href="assets/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossorigin fetchpriority="high">
<link rel="preload" href="assets/fonts/Montserrat-Medium.woff2" as="font" type="font/woff2" crossorigin fetchpriority="high">
```

### JavaScript Dinâmico
```javascript
// Dynamic resource hints based on connection speed
function addResourceHints() {
    const connectionSpeed = getConnectionSpeed();
    const head = document.head;
    
    if (connectionSpeed === 'fast') {
        const preloads = [
            { href: 'assets/fonts/Montserrat-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
            { href: 'assets/fonts/Montserrat-Medium.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
        ];
        
        preloads.forEach(function(resource) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            link.type = resource.type;
            link.crossOrigin = resource.crossorigin;
            head.appendChild(link);
        });
    }
}
```

## Estratégias de Fallback

### Font Stack Otimizado
```css
font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

**Ordem de prioridade**:
1. **Montserrat**: Fonte customizada
2. **-apple-system**: Fonte do sistema Apple
3. **BlinkMacSystemFont**: Fonte do sistema Chrome/Safari
4. **Segoe UI**: Fonte do sistema Windows
5. **Roboto**: Fonte do sistema Android
6. **Oxygen/Ubuntu/Cantarell**: Fontes do sistema Linux

## Benefícios Alcançados

### Performance
- **Eliminação do CLS** relacionado a fontes
- **Carregamento mais rápido** do texto
- **Redução de trocas de layout** durante carregamento

### SEO e Core Web Vitals
- **Melhoria no CLS** (Cumulative Layout Shift)
- **Melhor pontuação** em ferramentas de performance
- **Otimização** para Core Web Vitals

### Experiência do Usuário
- **Texto sempre visível** desde o primeiro carregamento
- **Consistência visual** em diferentes dispositivos
- **Carregamento suave** sem mudanças visuais bruscas

## Monitoramento

### Métricas a Acompanhar
- CLS relacionado a fontes
- Tempo de carregamento de fontes
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)

### Ferramentas Recomendadas
- Chrome DevTools Fonts Panel
- Lighthouse Performance
- WebPageTest Font Loading
- Google PageSpeed Insights

## Boas Práticas Implementadas

### 1. Estratégia Híbrida
- **Optional** para textos críticos (sem CLS)
- **Fallback** para textos secundários (balanceamento)
- **Swap** para elementos interativos (consistência)

### 2. Preload Inteligente
- **Preload** apenas fontes críticas
- **Fetchpriority high** para máxima prioridade
- **Crossorigin** para CORS adequado

### 3. Fallback Robusto
- **Font stack** completo do sistema
- **Métricas similares** entre fontes
- **Compatibilidade** cross-browser

### 4. Reserva de Espaço
- **Min-height** para evitar layout shift
- **Word-wrap** para quebra adequada
- **Box-sizing** para dimensões previsíveis

## Manutenção

### Verificações Periódicas
- Monitorar CLS após mudanças de fonte
- Testar em diferentes conexões
- Verificar carregamento em dispositivos móveis

### Novas Fontes
- Sempre aplicar estratégia de font-display
- Implementar preload adequado
- Testar impacto no CLS

---

**Última atualização**: Agosto 2024
**Versão**: 1.6.0
**Estratégia**: Font-display híbrida (optional/fallback/swap)
**Benefício**: Eliminação do CLS relacionado a fontes 