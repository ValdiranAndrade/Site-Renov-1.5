# Guia de Otimização CLS (Cumulative Layout Shift) - Renov

## Problema Identificado
O site apresentava um score de CLS de 0,492, que está acima do recomendado (< 0,1), causando mudanças visuais indesejadas durante o carregamento da página.

## Elementos Identificados como Causadores de CLS

### 1. Ícones Diferenciais
- **Problema**: Ícones sem dimensões explícitas causavam layout shift
- **Localização**: Seção "Por que escolher a Renov"
- **Elementos afetados**: Todos os ícones (IA, Velocidade, API, Atendimento, Resultados, Seguro)

### 2. Título Principal
- **Problema**: Carregamento de fontes causava mudanças no layout
- **Localização**: Hero section "Potencialize suas vendas com Trade-in Inteligente"

### 3. Containers de Avaliação
- **Problema**: Backgrounds carregando causavam layout shift
- **Localização**: Seções Avaliação, Diagnóstico, Logística, Pagamento

## Soluções Implementadas

### 1. Otimização de Ícones Diferenciais

#### HTML - Dimensões Explícitas
```html
<img src="assets/icons/ia-icon.webp?v=1.6.0" 
     alt="Ícone de Inteligência Artificial" 
     loading="lazy" 
     decoding="async" 
     width="80" 
     height="65" 
     style="aspect-ratio: 80/65;">
```

#### CSS - Prevenção de CLS
```css
.diferencial-icon {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
    /* Prevenir CLS - reservar espaço para o ícone */
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Garantir que o container mantenha suas dimensões */
    box-sizing: border-box;
}

.diferencial-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Prevenir CLS - manter aspect ratio */
    aspect-ratio: 80/65;
    /* Garantir que a imagem não cause layout shift */
    max-width: 80px;
    max-height: 65px;
    /* Fallback para navegadores que não suportam aspect-ratio */
    min-height: 65px;
}
```

### 2. Otimização de Textos Críticos

#### CSS - Prevenção de CLS em Títulos
```css
.hero-text h1 {
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
}
```

### 3. Otimização de Containers de Background

#### CSS - Prevenção de CLS em Containers
```css
.avaliacao-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: url('assets/images/avaliacao-mock.webp') center bottom/cover no-repeat !important;
    z-index: 1;
    /* Prevenir CLS - reservar espaço para background */
    min-height: 700px;
    /* Garantir que o container mantenha suas dimensões */
    box-sizing: border-box;
    /* Prevenir layout shift durante carregamento */
    background-color: #f5f5f5; /* Fallback color */
}
```

## Benefícios Alcançados

### Performance
- **Redução significativa do CLS** (esperado: < 0,1)
- **Carregamento mais estável** da página
- **Melhor experiência visual** durante o carregamento

### SEO e Core Web Vitals
- **Melhoria no CLS** (Cumulative Layout Shift)
- **Melhor pontuação** em ferramentas de performance
- **Conformidade** com as diretrizes do Google

### Experiência do Usuário
- **Carregamento mais suave** sem mudanças visuais bruscas
- **Interface mais estável** durante a navegação
- **Menor frustração** do usuário

## Monitoramento

### Métricas a Acompanhar
- Score de CLS no Lighthouse
- Core Web Vitals (CLS específico)
- Tempo de carregamento estável

### Ferramentas Recomendadas
- Google PageSpeed Insights
- Lighthouse
- Chrome DevTools Performance Tab
- WebPageTest

## Boas Práticas Implementadas

### 1. Dimensões Explícitas
- Sempre definir `width` e `height` em imagens
- Usar `aspect-ratio` para manter proporções
- Implementar fallbacks para navegadores antigos

### 2. Reserva de Espaço
- Usar `min-height` para reservar espaço
- Implementar `box-sizing: border-box`
- Definir cores de fallback para backgrounds

### 3. Carregamento de Fontes
- Usar `font-display: swap`
- Implementar fontes de fallback
- Reservar espaço mínimo para textos

### 4. Containers Estáveis
- Definir dimensões mínimas
- Usar `position: absolute` adequadamente
- Implementar fallbacks visuais

## Manutenção

### Verificações Periódicas
- Monitorar score de CLS após mudanças
- Testar em diferentes dispositivos
- Verificar carregamento em conexões lentas

### Novos Elementos
- Sempre aplicar as otimizações em novos elementos
- Testar impacto no CLS antes do deploy
- Documentar mudanças que afetam o layout

---

**Última atualização**: Agosto 2024
**Versão**: 1.6.0
**Score CLS anterior**: 0,492
**Score CLS esperado**: < 0,1 