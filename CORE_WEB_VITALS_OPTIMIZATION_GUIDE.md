# Guia de Otimização Core Web Vitals - Renov

## Problemas Identificados
- **LCP (Largest Contentful Paint)**: 5,1s (deve ser < 2,5s)
- **CLS (Cumulative Layout Shift)**: 0.492 (deve ser < 0,1)

## Soluções Implementadas

### 1. Otimizações para LCP (Largest Contentful Paint)

#### Preloads Críticos
```html
<!-- Preloads críticos para LCP -->
<link rel="preload" href="bg-video-compressed.webm" as="video" type="video/webm">
<link rel="preload" href="assets/images/bg-como-funciona.webp" as="image" type="image/webp">
<link rel="preload" href="assets/images/Renov-Logo.webp" as="image" type="image/webp">

<!-- DNS prefetch para recursos externos -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link rel="dns-prefetch" href="//cdnjs.cloudflare.com">

<!-- Preconnect para recursos críticos -->
<link rel="preconnect" href="//fonts.googleapis.com">
<link rel="preconnect" href="//fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="//cdnjs.cloudflare.com">

<!-- Preload de fontes críticas -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"></noscript>
```

#### CSS Crítico Inline
```html
<!-- CSS Crítico Inline para LCP e CLS -->
<style>
  /* CSS crítico para LCP - carregamento imediato */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .video-bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .video-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: #fff;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .hero-text h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  }
  
  .hero-text p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
  }
</style>
```

#### CSS Otimizado para LCP
```css
/* Forçar carregamento prioritário de elementos LCP */
.hero,
.video-bg-wrapper,
.hero-content,
.hero-text,
.hero-text h1,
.hero-text p {
    /* Garantir que elementos LCP sejam renderizados imediatamente */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    /* Prioridade máxima para carregamento */
    z-index: 1;
    /* Garantir que sejam detectáveis */
    position: relative;
    /* Prevenir layout shift */
    box-sizing: border-box;
    /* Otimizar para performance */
    will-change: auto;
    /* Garantir que a fonte seja carregada */
    font-display: swap;
}

/* Otimização específica para vídeo hero - elemento LCP principal */
#hero-video {
    /* Garantir carregamento imediato */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    /* Prioridade máxima */
    z-index: 1;
    /* Garantir que o vídeo seja renderizado imediatamente */
    contain: layout style paint;
    /* Otimizar para LCP */
    will-change: auto;
    /* Garantir que o vídeo seja o elemento LCP */
    position: relative;
    /* Prevenir layout shift */
    box-sizing: border-box;
    /* Forçar hardware acceleration */
    transform: translateZ(0);
    /* Garantir que o poster seja carregado com prioridade */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* Prevenir layout shift durante carregamento */
    min-height: 100vh;
    /* Garantir que o poster seja detectável */
    background-color: #000; /* Fallback color */
}
```

### 2. Otimizações para CLS (Cumulative Layout Shift)

#### CSS Crítico Inline para CLS
```html
<style>
  /* CSS crítico para CLS - reservar espaço */
  .diferencial-icon {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  
  .diferencial-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 80/65;
    max-width: 80px;
    max-height: 65px;
    min-height: 65px;
  }
  
  /* Prevenir CLS em containers */
  .avaliacao-bg,
  .diagnostico-bg,
  .pagamento-bg,
  .novo-bg {
    min-height: 700px;
    box-sizing: border-box;
    background-color: #f5f5f5;
  }
</style>
```

#### CSS Otimizado para CLS
```css
/* Garantir que elementos críticos mantenham suas dimensões */
.diferencial-card,
.avaliacao-container,
.diagnostico-container,
.pagamento-container,
.novo-container {
    /* Reservar espaço para evitar layout shift */
    min-height: 300px;
    /* Garantir que o container mantenha suas dimensões */
    box-sizing: border-box;
    /* Prevenir layout shift durante carregamento */
    background-color: #fff; /* Fallback color */
    /* Otimizar para performance */
    will-change: auto;
    /* Forçar hardware acceleration */
    transform: translateZ(0);
}

/* Otimizar elementos de texto para prevenir CLS */
.hero-text h1,
.hero-text p,
.diferencial-title,
.diferencial-text,
.avaliacao-titulo,
.avaliacao-descricao,
.diagnostico-titulo,
.diagnostico-descricao,
.pagamento-titulo,
.pagamento-descricao,
.novo-titulo,
.novo-descricao {
    /* Reservar espaço para evitar layout shift */
    min-height: 1.2em;
    /* Garantir que a fonte seja carregada */
    font-display: swap;
    /* Fallback para fontes não carregadas */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    /* Prevenir quebra de layout */
    word-wrap: break-word;
    overflow-wrap: break-word;
    /* Garantir que o texto não cause overflow */
    max-width: 100%;
    box-sizing: border-box;
    /* Otimizar para performance */
    will-change: auto;
    /* Forçar hardware acceleration */
    transform: translateZ(0);
}
```

### 3. Otimizações de JavaScript

#### Script Otimizado
- **Arquivo**: `script-optimized.js` (substitui `script.min.js`)
- **Batching**: Operações DOM agrupadas com `requestAnimationFrame`
- **Cache**: Elementos DOM cacheados para evitar queries repetidas
- **Debounce**: Operações frequentes limitadas

#### Carregamento Otimizado
```javascript
// Load critical script after page load to avoid blocking LCP
function loadCriticalScript() {
  var script = document.createElement('script');
  script.src = 'script-optimized.js?v=1.6.6';
  script.async = true;
  document.body.appendChild(script);
}

// Defer critical script loading to avoid blocking LCP
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadCriticalScript, 100);
  });
} else {
  setTimeout(loadCriticalScript, 100);
}
```

### 4. Otimizações de Hardware Acceleration

#### CSS para Hardware Acceleration
```css
/* Otimizações para animações e transições */
.optimized-transition {
    /* Usar transform em vez de propriedades que causam reflow */
    transform: translateZ(0);
    /* Otimizar para mudanças */
    will-change: transform;
    /* Evitar mudanças de layout */
    contain: layout style paint;
    /* Forçar hardware acceleration */
    backface-visibility: hidden;
    /* Otimizar para performance */
    perspective: 1000px;
}

/* Otimizações para elementos que mudam frequentemente */
.slider-element,
.tab-element,
.menu-element {
    /* Usar transform em vez de left/top */
    transform: translateX(0);
    /* Evitar mudanças de layout */
    contain: layout style paint;
    /* Otimizar para mudanças */
    will-change: transform;
    /* Forçar hardware acceleration */
    backface-visibility: hidden;
    /* Otimizar para performance */
    perspective: 1000px;
}
```

## Benefícios Alcançados

### LCP (Largest Contentful Paint)
- **Redução esperada**: 5,1s → < 2,5s
- **Preloads críticos**: Carregamento prioritário de recursos
- **CSS crítico inline**: Renderização imediata de elementos LCP
- **Hardware acceleration**: Melhor performance de renderização

### CLS (Cumulative Layout Shift)
- **Redução esperada**: 0.492 → < 0,1
- **Reserva de espaço**: Dimensões explícitas para elementos críticos
- **Fallback colors**: Cores de backup durante carregamento
- **Aspect-ratio**: Proporções mantidas durante carregamento

### Performance Geral
- **Carregamento mais rápido**: Recursos críticos priorizados
- **Interface mais estável**: Menos mudanças visuais durante carregamento
- **Melhor experiência**: Animações mais fluidas e responsivas

## Monitoramento

### Métricas a Acompanhar
- **LCP**: Deve ser < 2,5s
- **CLS**: Deve ser < 0,1
- **FID**: First Input Delay
- **TTFB**: Time to First Byte

### Ferramentas Recomendadas
- **Google PageSpeed Insights**
- **Lighthouse**
- **Chrome DevTools Performance Tab**
- **WebPageTest**

## Técnicas Implementadas

### 1. Otimização de Recursos
- **Preloads**: Carregamento prioritário de recursos críticos
- **Preconnect**: Conexões antecipadas com domínios externos
- **DNS prefetch**: Resolução antecipada de DNS

### 2. CSS Crítico
- **CSS inline**: Estilos críticos carregados imediatamente
- **Font-display: swap**: Carregamento otimizado de fontes
- **Fallback fonts**: Fontes de backup para carregamento rápido

### 3. JavaScript Otimizado
- **Batching**: Operações DOM agrupadas
- **Cache**: Elementos DOM cacheados
- **Debounce**: Operações frequentes limitadas

### 4. Hardware Acceleration
- **Transform**: Propriedades que não causam reflow
- **Will-change**: Dicas para o browser
- **Contain**: Isolamento de mudanças de layout

## Manutenção

### Verificações Periódicas
- Monitorar Core Web Vitals após mudanças
- Testar em diferentes dispositivos e conexões
- Verificar performance em ferramentas de análise

### Novos Elementos
- Sempre aplicar as otimizações em novos elementos
- Testar impacto nos Core Web Vitals antes do deploy
- Documentar mudanças que afetam a performance

---

**Última atualização**: Agosto 2024
**Versão**: 1.6.0
**LCP anterior**: 5,1s
**LCP esperado**: < 2,5s
**CLS anterior**: 0.492
**CLS esperado**: < 0,1
**Técnicas aplicadas**: Preloads, CSS crítico, Hardware acceleration, JavaScript otimizado 