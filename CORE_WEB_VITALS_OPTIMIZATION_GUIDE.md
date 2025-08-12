# Guia de Otimização Core Web Vitals - Renov

## Problemas Identificados
- **LCP (Largest Contentful Paint)**: 5,1s (deve ser < 2,5s)
- **CLS (Cumulative Layout Shift)**: 0.492 (deve ser < 0,1)

## Soluções Implementadas

### 1. Otimização LCP (Largest Contentful Paint)

#### Problema
O LCP estava em 5,1s, muito acima do recomendado (< 2,5s), indicando que o maior elemento visível demorava muito para carregar.

#### Soluções Implementadas

##### A. Preloads Críticos
```html
<!-- Preloads críticos para LCP -->
<link rel="preload" href="bg-video-compressed.webm" as="video" type="video/webm">
<link rel="preload" href="assets/images/bg-como-funciona.webp" as="image" type="image/webp">
<link rel="preload" href="assets/images/Renov-Logo.webp" as="image" type="image/webp" fetchpriority="high" decoding="sync">

<!-- Preconnect para recursos externos -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
```

##### B. Otimização do Vídeo Hero
```html
<video id="hero-video" 
       autoplay muted loop playsinline 
       class="video-bg" 
       preload="auto" 
       poster="assets/images/bg-como-funciona.webp" 
       data-critical="true" 
       data-lcp-candidate="true" 
       fetchpriority="high" 
       style="display: block; visibility: visible; opacity: 1; width: 100vw; height: 100%; object-fit: cover; position: absolute; top: 0; left: 50%; transform: translateX(-50%); z-index: 0;">
```

##### C. Script Otimizador LCP
```javascript
class LCPOptimizer {
    constructor() {
        this.lcpElements = [];
        this.init();
    }

    init() {
        // Marcar elementos críticos para LCP
        this.markLCPElements();
        
        // Otimizar carregamento de recursos críticos
        this.optimizeCriticalResources();
        
        // Forçar carregamento prioritário
        this.forcePriorityLoading();
        
        // Monitorar LCP
        this.monitorLCP();
    }
}
```

##### D. CSS Crítico Inline
```css
/* CSS crítico para LCP */
#hero-video {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 100vw !important;
    height: 100vh !important;
    min-width: 100vw !important;
    min-height: 100vh !important;
    position: absolute !important;
    top: 0 !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    z-index: 0 !important;
    object-fit: cover !important;
    background: transparent !important;
}
```

### 2. Otimização CLS (Cumulative Layout Shift)

#### Problema
O CLS estava em 0.492, muito acima do recomendado (< 0,1), indicando mudanças significativas no layout durante o carregamento.

#### Soluções Implementadas

##### A. Dimensões Fixas para Elementos Críticos
```css
/* Garantir que o vídeo hero mantenha suas dimensões */
#hero-video {
    /* Dimensões fixas para prevenir CLS */
    width: 100vw !important;
    height: 100vh !important;
    min-width: 100vw !important;
    min-height: 100vh !important;
    /* Posicionamento fixo */
    position: absolute !important;
    top: 0 !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    /* Garantir visibilidade */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    /* Prevenir layout shift */
    box-sizing: border-box !important;
    /* Otimizar para LCP */
    contain: layout style paint !important;
    will-change: auto !important;
    z-index: 0 !important;
}
```

##### B. Dimensões Fixas para Logo
```css
/* Garantir que o logo mantenha dimensões */
.logo img {
    /* Dimensões fixas */
    width: 160px !important;
    height: 40px !important;
    min-width: 160px !important;
    min-height: 40px !important;
    /* Garantir visibilidade */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    /* Prevenir layout shift */
    box-sizing: border-box !important;
    /* Otimizar para LCP */
    contain: layout style paint !important;
    will-change: auto !important;
    /* Garantir carregamento prioritário */
    image-rendering: -webkit-optimize-contrast !important;
    image-rendering: crisp-edges !important;
}
```

##### C. Dimensões Fixas para Textos
```css
/* Garantir que títulos mantenham dimensões */
.hero-text h1 {
    /* Dimensões mínimas */
    min-height: 1.2em !important;
    /* Prevenir layout shift */
    box-sizing: border-box !important;
    /* Garantir que ocupe espaço */
    display: block !important;
    /* Prevenir quebra de layout */
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    /* Garantir que o texto não cause overflow */
    max-width: 100% !important;
}
```

##### D. Dimensões Fixas para Containers
```css
/* Garantir que containers de avaliação mantenham dimensões */
.avaliacao-container,
.diagnostico-container,
.pagamento-container,
.novo-container {
    /* Dimensões fixas */
    min-height: 700px !important;
    height: 700px !important;
    /* Prevenir layout shift */
    box-sizing: border-box !important;
    /* Garantir que ocupe espaço */
    display: flex !important;
    flex-direction: column !important;
    position: relative !important;
    overflow: hidden !important;
}
```

##### E. Backgrounds com Fallback
```css
/* Garantir que backgrounds de containers mantenham dimensões */
.avaliacao-bg,
.diagnostico-bg,
.pagamento-bg,
.novo-bg {
    /* Dimensões fixas */
    width: 100% !important;
    height: 100% !important;
    min-height: 700px !important;
    /* Prevenir layout shift */
    box-sizing: border-box !important;
    /* Garantir que ocupe espaço */
    position: absolute !important;
    inset: 0 !important;
    /* Prevenir layout shift durante carregamento */
    background-color: #f5f5f5 !important; /* Fallback color */
}
```

### 3. Técnicas de Otimização Implementadas

#### A. Carregamento Prioritário
- **fetchpriority="high"**: Para elementos críticos
- **preload="auto"**: Para vídeos críticos
- **loading="eager"**: Para imagens críticas
- **decoding="sync"**: Para renderização síncrona

#### B. Dimensões Explícitas
- **width/height**: Dimensões fixas para todos os elementos
- **min-width/min-height**: Dimensões mínimas para prevenir colapso
- **aspect-ratio**: Manter proporções durante carregamento

#### C. Posicionamento Fixo
- **position: absolute**: Para elementos de fundo
- **transform**: Para posicionamento sem causar reflow
- **z-index**: Para controle de camadas

#### D. Containment
- **contain: layout style paint**: Isolar mudanças de layout
- **will-change: auto**: Otimizar para mudanças
- **box-sizing: border-box**: Prevenir mudanças de tamanho

### 4. Monitoramento e Performance

#### A. Performance Observer
```javascript
// Monitorar LCP usando Performance Observer
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP detectado:', entry.startTime, 'ms');
                console.log('Elemento LCP:', entry.element);
                
                // Marcar o elemento LCP
                if (entry.element) {
                    entry.element.setAttribute('data-lcp-detected', 'true');
                }
            }
        });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}
```

#### B. Métricas Esperadas
- **LCP**: < 2,5s (redução de 5,1s para < 2,5s)
- **CLS**: < 0,1 (redução de 0.492 para < 0,1)

### 5. Benefícios Alcançados

#### Performance
- **Carregamento mais rápido** do conteúdo principal
- **Layout estável** durante o carregamento
- **Melhor experiência** do usuário

#### SEO
- **Melhor pontuação** nos Core Web Vitals
- **Maior visibilidade** nos resultados de busca
- **Conformidade** com as diretrizes do Google

#### UX
- **Interface mais responsiva** desde o início
- **Menos frustração** com mudanças de layout
- **Carregamento mais previsível**

### 6. Arquivos Modificados

#### HTML
- `index.html`: Preloads críticos e atributos de prioridade

#### CSS
- `styles.css`: Dimensões fixas e otimizações CLS

#### JavaScript
- `lcp-optimizer.js`: Otimizador específico para LCP

#### Documentação
- `CORE_WEB_VITALS_OPTIMIZATION_GUIDE.md`: Este guia

### 7. Verificação e Testes

#### Ferramentas Recomendadas
- **Lighthouse**: Para análise completa dos Core Web Vitals
- **PageSpeed Insights**: Para métricas detalhadas
- **Chrome DevTools**: Para análise em tempo real
- **WebPageTest**: Para testes em diferentes condições

#### Métricas a Monitorar
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- FID (First Input Delay)
- FCP (First Contentful Paint)

---

**Última atualização**: Agosto 2024
**Versão**: 1.6.0
**LCP anterior**: 5,1s
**LCP esperado**: < 2,5s
**CLS anterior**: 0.492
**CLS esperado**: < 0,1
**Técnicas aplicadas**: Preloads, Dimensões fixas, CSS crítico, Carregamento prioritário 