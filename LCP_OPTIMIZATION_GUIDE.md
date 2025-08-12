# Guia de Otimização LCP (Largest Contentful Paint) - Renov

## Problema Identificado
O vídeo hero não estava sendo detectado adequadamente como elemento LCP, causando lentidão na percepção de carregamento da página.

## Elementos Identificados como Candidatos ao LCP

### 1. Vídeo Hero
- **Problema**: Não estava sendo detectado imediatamente como elemento LCP
- **Localização**: Hero section principal
- **Elemento**: `<video id="hero-video">`

### 2. Logo da Empresa
- **Problema**: Pode ser candidato ao LCP em algumas situações
- **Localização**: Header da página
- **Elemento**: `<img src="assets/images/Renov-Logo.webp">`

### 3. Background Mobile
- **Problema**: Pode ser candidato ao LCP em dispositivos móveis
- **Localização**: Hero section (versão mobile)
- **Elemento**: `<div class="mobile-bg">`

## Soluções Implementadas

### 1. Otimização do Vídeo Hero

#### HTML - Atributos de Prioridade
```html
<video id="hero-video" 
       autoplay muted loop playsinline 
       class="video-bg" 
       preload="metadata" 
       poster="assets/images/bg-como-funciona.webp" 
       data-critical="true" 
       data-lcp-candidate="true" 
       fetchpriority="high" 
       style="display: block; visibility: visible; opacity: 1;">
  <source src="bg-video-compressed.webm" type="video/webm" fetchpriority="high">
  <source src="bg-video-compressed.webm" type="video/webm" fetchpriority="high">
  Seu navegador não suporta o elemento de vídeo.
</video>
```

#### CSS - Otimização para LCP
```css
#hero-video {
    /* Garantir que o vídeo seja detectável imediatamente */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    /* Prioridade máxima para carregamento */
    z-index: 1;
    /* Garantir que o vídeo seja renderizado imediatamente */
    contain: layout style paint;
    /* Otimizar para LCP */
    will-change: auto;
    /* Garantir que o vídeo seja o elemento LCP */
    position: relative;
    /* Prevenir layout shift */
    box-sizing: border-box;
}
```

### 2. Otimização do Logo

#### HTML - Atributos de Prioridade
```html
<img src="assets/images/Renov-Logo.webp" 
     alt="Renov - Sua Troca Inteligente" 
     loading="eager" 
     fetchpriority="high" 
     decoding="sync" 
     width="160" 
     height="40" 
     data-critical="true" 
     data-lcp-candidate="true">
```

#### CSS - Otimização para LCP
```css
.logo img {
    /* Garantir que o logo seja detectável imediatamente */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    /* Prioridade máxima para carregamento */
    z-index: 1;
    /* Garantir que o logo seja renderizado imediatamente */
    contain: layout style paint;
    /* Otimizar para LCP */
    will-change: auto;
    /* Garantir que o logo seja o elemento LCP */
    position: relative;
    /* Prevenir layout shift */
    box-sizing: border-box;
    /* Garantir carregamento prioritário */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
}
```

### 3. Otimização do Background Mobile

#### HTML - Atributos de Prioridade
```html
<div class="mobile-bg" 
     style="position: absolute; top: 0; left: 0; width: 100vw; height: 100%; min-width: 100vw; min-height: 100%; background-image: url('assets/images/bg-como-funciona.webp'); background-size: 150% auto; background-position: center; background-repeat: no-repeat; z-index: 0; display: block;" 
     data-critical="true" 
     data-lcp-candidate="true">
</div>
```

#### CSS - Otimização para LCP
```css
.mobile-bg {
    /* Garantir que seja detectável para LCP */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    /* Prioridade máxima */
    z-index: 1;
    /* Garantir carregamento imediato */
    background-attachment: scroll;
    /* Otimizar para performance */
    will-change: auto;
    /* Prevenir layout shift */
    box-sizing: border-box;
}
```

## Benefícios Alcançados

### Performance
- **Detecção imediata** do elemento LCP
- **Carregamento mais rápido** percebido pelo usuário
- **Melhor pontuação** no LCP

### SEO e Core Web Vitals
- **Melhoria no LCP** (Largest Contentful Paint)
- **Melhor pontuação** em ferramentas de performance
- **Conformidade** com as diretrizes do Google

### Experiência do Usuário
- **Carregamento mais responsivo** da página
- **Percepção de velocidade** melhorada
- **Menor tempo de espera** visual

## Atributos de Otimização Implementados

### 1. fetchpriority="high"
- **Aplicado em**: Vídeo hero, sources do vídeo, logo
- **Função**: Prioriza o carregamento do elemento

### 2. data-critical="true"
- **Aplicado em**: Vídeo hero, logo, background mobile
- **Função**: Identifica elementos críticos para o carregamento

### 3. data-lcp-candidate="true"
- **Aplicado em**: Vídeo hero, logo, background mobile
- **Função**: Identifica candidatos ao LCP

### 4. loading="eager"
- **Aplicado em**: Logo, imagens críticas
- **Função**: Carrega imediatamente sem lazy loading

### 5. decoding="sync"
- **Aplicado em**: Logo
- **Função**: Decodifica a imagem de forma síncrona

## Monitoramento

### Métricas a Acompanhar
- Score de LCP no Lighthouse
- Core Web Vitals (LCP específico)
- Tempo de carregamento do elemento LCP

### Ferramentas Recomendadas
- Google PageSpeed Insights
- Lighthouse
- Chrome DevTools Performance Tab
- WebPageTest

## Boas Práticas Implementadas

### 1. Priorização de Recursos
- Usar `fetchpriority="high"` para elementos críticos
- Implementar `loading="eager"` para elementos LCP
- Aplicar `decoding="sync"` quando apropriado

### 2. Detecção Imediata
- Usar `data-lcp-candidate="true"` para candidatos ao LCP
- Implementar `data-critical="true"` para elementos críticos
- Garantir visibilidade imediata com CSS

### 3. Otimização de CSS
- Usar `display: block !important` para garantir visibilidade
- Implementar `visibility: visible !important`
- Aplicar `opacity: 1 !important` para garantir renderização

### 4. Performance de Renderização
- Usar `contain: layout style paint` para otimizar renderização
- Implementar `will-change: auto` para otimizar mudanças
- Aplicar `box-sizing: border-box` para prevenir layout shift

## Manutenção

### Verificações Periódicas
- Monitorar score de LCP após mudanças
- Testar em diferentes dispositivos
- Verificar carregamento em conexões lentas

### Novos Elementos
- Sempre aplicar as otimizações em novos elementos LCP
- Testar impacto no LCP antes do deploy
- Documentar mudanças que afetam o carregamento

---

**Última atualização**: Agosto 2024
**Versão**: 1.6.0
**Elementos LCP otimizados**: Vídeo hero, Logo, Background mobile
**Técnicas aplicadas**: fetchpriority, data-attributes, CSS otimizado 