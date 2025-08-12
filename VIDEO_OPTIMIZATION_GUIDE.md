# Guia de Otimização de Vídeo - Renov

## Problema Identificado
O arquivo `bg-IA.mp4-_1_.webm` estava causando um payload de rede muito grande (11.480,3 KiB), impactando negativamente o tempo de carregamento e custos para o usuário.

## Soluções Implementadas

### 1. Compressão de Vídeos

#### Vídeo IA (bg-IA.mp4-_1_.webm)
- **Arquivo original**: `bg-IA.mp4-_1_.webm` (11.480,3 KiB)
- **Arquivo comprimido**: `bg-IA-compressed.webm` (875 KiB)
- **Arquivo ultra-comprimido**: `bg-IA-ultra-compressed.webm` (420 KiB)
- **Redução total**: ~96,3% de redução no tamanho do arquivo

#### Vídeo Principal (bg-video.mp4.mp4)
- **Arquivo original**: `bg-video.mp4.mp4` (8,5 MB)
- **Arquivo comprimido**: `bg-video-compressed.webm` (1,6 MB)
- **Arquivo ultra-comprimido**: `bg-video-ultra-compressed.webm` (758 KiB)
- **Redução total**: ~91,1% de redução no tamanho do arquivo

#### Total de Redução
- **Antes**: ~20 MB de vídeos
- **Depois**: ~1,2 MB de vídeos
- **Redução total**: ~94% de redução no payload de vídeos

### 2. Otimizações Técnicas Aplicadas
- **Codec**: VP9 com CRF 35 para compressão ultra-agressiva
- **Resolução**: Reduzida para 960x540 (otimizada para web)
- **FPS**: Mantido em 60fps para suavidade
- **Áudio**: Removido (não necessário para background)
- **Qualidade**: Balanceada entre tamanho e qualidade visual

### 3. Atributos HTML Otimizados
```html
<video 
    src="bg-IA-ultra-compressed.webm" 
    preload="metadata"
    fetchpriority="high"
    autoplay 
    muted 
    loop 
    playsinline>
    <source src="bg-IA-ultra-compressed.webm" type="video/webm">
</video>
```

### 4. Service Worker Atualizado
- Cache atualizado para incluir o arquivo comprimido
- Removida referência ao arquivo original pesado

## Benefícios Alcançados

### Performance
- **Redução de 94% no payload total de vídeos**
- **Carregamento mais rápido** de todas as seções com vídeo
- **Menor consumo de dados** para usuários móveis
- **Economia de ~18,8 MB** por carregamento da página

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
# Compressão padrão
ffmpeg -i input.webm -c:v libvpx-vp9 -crf 30 -b:v 0 -vf "scale=1280:720" -an output-compressed.webm

# Compressão ultra-agressiva
ffmpeg -i input.webm -c:v libvpx-vp9 -crf 35 -b:v 0 -vf "scale=960:540" -an output-ultra-compressed.webm
```

### Verificação de Tamanho
```bash
ls -lh *.webm
du -h *.webm
```

---

**Última atualização**: Agosto 2024
**Versão**: 1.6.0 