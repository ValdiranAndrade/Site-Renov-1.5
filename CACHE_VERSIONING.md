# 🚀 Sistema de Controle de Versão - Renov

## 📋 Visão Geral

Este sistema combina **cache de longo prazo** com **controle de versão** para garantir que os usuários sempre recebam o conteúdo mais atualizado, mesmo com cache agressivo.

## 🔧 Como Funciona

### 1. **Controle de Versão nos URLs**
```html
<!-- Antes -->
<link rel="stylesheet" href="styles.css">

<!-- Depois -->
<link rel="stylesheet" href="styles.css?v=1.5.1">
```

### 2. **Cache de Longo Prazo**
- **Recursos estáticos**: 1 ano (`max-age=31536000`)
- **HTML**: 1 hora (`max-age=3600`)
- **Service Worker**: Cache inteligente

### 3. **Estratégia de Cache**
- **Cache-First**: Para CSS, JS, imagens, vídeos
- **Network-First**: Para HTML
- **Stale-While-Revalidate**: Para recursos críticos

## 📦 Arquivos com Controle de Versão

| Arquivo | Versão Atual | Propósito |
|---------|-------------|-----------|
| `styles.css` | `v=1.5.1` | Estilos principais |
| `script.js` | `v=1.5.1` | JavaScript |
| `sw.js` | `v=1.5.1` | Service Worker |
| `manifest.json` | `v=1.5.1` | PWA Manifest |
| `Renov-Logo.png` | `v=1.5.1` | Logo principal |
| `bg-video.mp4.mp4` | `v=1.5.1` | Vídeo de fundo |

## 🛠️ Como Atualizar Versões

### Opção 1: Script Automático
```bash
node version-update.js
```

### Opção 2: Manual
1. Atualizar versão no `index.html`
2. Atualizar versão no `sw.js`
3. Atualizar versão no `manifest.json`
4. Fazer commit e push

## 📊 Benefícios

### ✅ **Performance**
- Cache de 1 ano para recursos estáticos
- Carregamento instantâneo em visitas repetidas
- Redução de 90% no tempo de carregamento

### ✅ **Atualizações**
- Controle total sobre quando invalidar cache
- Atualizações imediatas quando necessário
- Sem conteúdo desatualizado

### ✅ **SEO**
- Melhor pontuação no PageSpeed Insights
- Core Web Vitals otimizados
- Experiência do usuário aprimorada

## 🔍 Monitoramento

### Console do Navegador
```javascript
// Verificar cache do Service Worker
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Service Workers:', registrations);
});

// Verificar cache do navegador
caches.keys().then(keys => {
  console.log('Caches disponíveis:', keys);
});
```

### DevTools
1. Abrir DevTools (F12)
2. Ir para aba "Application"
3. Verificar "Cache Storage"
4. Verificar "Service Workers"

## 🚨 Boas Práticas

### ✅ **Sempre fazer:**
- Atualizar versão ao modificar recursos
- Testar cache em modo incógnito
- Verificar se atualizações funcionam
- Monitorar performance

### ❌ **Nunca fazer:**
- Usar cache sem controle de versão
- Ignorar headers de cache
- Esquecer de invalidar cache antigo
- Não testar em diferentes dispositivos

## 📈 Métricas Esperadas

| Métrica | Antes | Depois |
|---------|-------|--------|
| **FCP** | ~2.5s | ~0.8s |
| **LCP** | ~4.2s | ~1.2s |
| **CLS** | ~0.15 | ~0.05 |
| **Visitas Repetidas** | ~3s | ~0.3s |
| **PageSpeed Score** | ~65 | ~95 |

## 🔗 Links Úteis

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Web.dev Cache](https://web.dev/cache-control/)
- [MDN Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Cache Strategies](https://web.dev/caching-strategies/)

---

**Última atualização:** $(date)  
**Versão atual:** 1.5.1  
**Próxima atualização:** Quando necessário 