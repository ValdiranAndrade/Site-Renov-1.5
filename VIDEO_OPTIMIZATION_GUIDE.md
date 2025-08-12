# Guia de Otimização de Vídeo - Renov

## Problema Identificado
O arquivo `bg-IA.mp4-_1_.webm` estava causando um payload de rede muito grande (11.480,3 KiB), impactando negativamente o tempo de carregamento e custos para o usuário.

## Soluções Implementadas

### 1. Compressão de Vídeos

#### Vídeo IA (bg-IA.mp4-_1_.webm)
- **Arquivo original**: `bg-IA.mp4-_1_.webm` (11.480,3 KiB)
- **Arquivo otimizado**: `bg-IA-compressed.webm` (875 KiB)
- **Redução**: ~92% de redução no tamanho do arquivo

#### Vídeo Principal (bg-video.mp4.mp4)
- **Arquivo original**: `bg-video.mp4.mp4` (8,5 MB)
- **Arquivo otimizado**: `bg-video-compressed.webm` (1,6 MB)
- **Redução**: ~81% de redução no tamanho do arquivo

#### Total de Redução
- **Antes**: ~19,5 MB de vídeos
- **Depois**: ~2,5 MB de vídeos
- **Redução total**: ~87% de redução no payload de vídeos

### 2. Otimizações Técnicas Aplicadas
- **Codec**: VP9 com CRF 30 para melhor compressão
- **Resolução**: Reduzida para 1280x720 (mantendo qualidade visual)
- **FPS**: Mantido em 60fps para suavidade
- **Áudio**: Removido (não necessário para background)

### 3. Atributos HTML Otimizados
```html
<video 
    src="bg-IA-compressed.webm" 
    preload="metadata"
    fetchpriority="high"
    autoplay 
    muted 
    loop 
    playsinline>
    <source src="bg-IA-compressed.webm" type="video/webm">
</video>
```

### 4. Service Worker Atualizado
- Cache atualizado para incluir o arquivo comprimido
- Removida referência ao arquivo original pesado

## Benefícios Alcançados

### Performance
- **Redução de 87% no payload total de vídeos**
- **Carregamento mais rápido** de todas as seções com vídeo
- **Menor consumo de dados** para usuários móveis
- **Economia de ~17 MB** por carregamento da página

### SEO e Core Web Vitals
- **Melhoria no LCP** (Largest Contentful Paint)
- **Redução no CLS** (Cumulative Layout Shift)
- **Melhor pontuação** em ferramentas de performance

### Experiência do Usuário
- **Carregamento mais responsivo**
- **Menor tempo de espera**
- **Economia de dados** para conexões limitadas

## Monitoramento

### Métricas a Acompanhar
- Tempo de carregamento da seção IA
- Tamanho total do payload de rede
- Pontuação do Lighthouse Performance
- Core Web Vitals (LCP, FID, CLS)

### Ferramentas Recomendadas
- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- Chrome DevTools Network Tab

## Manutenção

### Verificações Periódicas
- Monitorar tamanho dos arquivos de vídeo
- Verificar se novos vídeos seguem as otimizações
- Testar em diferentes dispositivos e conexões

### Boas Práticas
- Sempre comprimir vídeos antes de usar
- Usar formatos modernos (WebM, MP4)
- Implementar lazy loading quando apropriado
- Considerar fallbacks para navegadores antigos

## Comandos Úteis

### Compressão de Vídeo (FFmpeg)
```bash
ffmpeg -i input.webm -c:v libvpx-vp9 -crf 30 -b:v 0 -vf "scale=1280:720" -c:a none output-compressed.webm
```

### Verificação de Tamanho
```bash
ls -lh *.webm
du -h *.webm
```

---

**Última atualização**: Agosto 2024
**Versão**: 1.6.0 