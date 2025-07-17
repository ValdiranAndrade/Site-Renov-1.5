const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configurações de otimização para mobile
const mobileConfigs = {
  // Imagens principais - otimização agressiva
  main: {
    width: 800,
    quality: 80,
    format: 'webp'
  },
  // Imagens de parceiros - otimização moderada
  partners: {
    width: 400,
    quality: 85,
    format: 'webp'
  },
  // Imagens de fundo - otimização leve
  background: {
    width: 1200,
    quality: 75,
    format: 'webp'
  }
};

// Lista de imagens para otimizar
const imagesToOptimize = [
  // Imagens principais
  { src: 'assets/images/Renov-Logo.webp', dest: 'assets/images/mobile/Renov-Logo.webp', config: 'main' },
  { src: 'assets/images/bg-como-funciona.webp', dest: 'assets/images/mobile/bg-como-funciona.webp', config: 'background' },
  { src: 'assets/images/impacto-positivo.webp', dest: 'assets/images/mobile/impacto-positivo.webp', config: 'background' },
  { src: 'assets/images/simples.webp', dest: 'assets/images/mobile/simples.webp', config: 'background' },
  { src: 'assets/images/vagas.webp', dest: 'assets/images/mobile/vagas.webp', config: 'background' },
  { src: 'assets/images/trabalhe-conosco.webp', dest: 'assets/images/mobile/trabalhe-conosco.webp', config: 'background' },
  { src: 'assets/images/fale-conosco.webp', dest: 'assets/images/mobile/fale-conosco.webp', config: 'background' },
  
  // Imagens de fundo dos benefícios
  { src: 'assets/images/vale-alimentação.webp', dest: 'assets/images/mobile/vale-alimentação.webp', config: 'background' },
  { src: 'assets/images/vale-mobilidade.webp', dest: 'assets/images/mobile/vale-mobilidade.webp', config: 'background' },
  { src: 'assets/images/totalpass.webp', dest: 'assets/images/mobile/totalpass.webp', config: 'background' },
  { src: 'assets/images/dayoff.webp', dest: 'assets/images/mobile/dayoff.webp', config: 'background' },
  { src: 'assets/images/plano-de-saude.webp', dest: 'assets/images/mobile/plano-de-saude.webp', config: 'background' },
  { src: 'assets/images/plano-odontologico.webp', dest: 'assets/images/mobile/plano-odontologico.webp', config: 'background' },
  { src: 'assets/images/auxílio-creche.webp', dest: 'assets/images/mobile/auxílio-creche.webp', config: 'background' },
  { src: 'assets/images/seguro-de-vida.webp', dest: 'assets/images/mobile/seguro-de-vida.webp', config: 'background' },
  
  // Imagens de fundo dos cards
  { src: 'assets/images/quero-ser-parceiro.webp', dest: 'assets/images/mobile/quero-ser-parceiro.webp', config: 'background' },
  { src: 'assets/images/quero-ser-revenda.webp', dest: 'assets/images/mobile/quero-ser-revenda.webp', config: 'background' },
  
  // Imagens dos especialistas
  { src: 'assets/images/especialista1.webp', dest: 'assets/images/mobile/especialista1.webp', config: 'main' },
  { src: 'assets/images/especialista2.webp', dest: 'assets/images/mobile/especialista2.webp', config: 'main' },
  { src: 'assets/images/matheus-mundstock.webp', dest: 'assets/images/mobile/matheus-mundstock.webp', config: 'main' },
  { src: 'assets/images/ismael-kolling.webp', dest: 'assets/images/mobile/ismael-kolling.webp', config: 'main' },
  
  // Imagens dos mocks
  { src: 'assets/images/avaliacao-mock.webp', dest: 'assets/images/mobile/avaliacao-mock.webp', config: 'main' },
  { src: 'assets/images/diagnostico-mock.webp', dest: 'assets/images/mobile/diagnostico-mock.webp', config: 'main' },
  { src: 'assets/images/logistica-mock.webp', dest: 'assets/images/mobile/logistica-mock.webp', config: 'main' },
  { src: 'assets/images/pagamento-mock.webp', dest: 'assets/images/mobile/pagamento-mock.webp', config: 'main' },
  
  // Imagens sobre nós
  { src: 'assets/images/sobre-nos/sobre-nos.webp', dest: 'assets/images/sobre-nos/mobile/sobre-nos.webp', config: 'background' },
  { src: 'assets/images/missao.webp', dest: 'assets/images/mobile/missao.webp', config: 'background' },
  { src: 'assets/images/visao.webp', dest: 'assets/images/mobile/visao.webp', config: 'background' },
  { src: 'assets/images/valores.webp', dest: 'assets/images/mobile/valores.webp', config: 'background' },
  
  // Imagens dos parceiros
  { src: 'assets/images/partners/fujioka.webp', dest: 'assets/images/partners/mobile/fujioka.webp', config: 'partners' },
  { src: 'assets/images/partners/sol.webp', dest: 'assets/images/partners/mobile/sol.webp', config: 'partners' },
  { src: 'assets/images/partners/mateus.webp', dest: 'assets/images/partners/mobile/mateus.webp', config: 'partners' },
  { src: 'assets/images/partners/gazin.webp', dest: 'assets/images/partners/mobile/gazin.webp', config: 'partners' },
  { src: 'assets/images/partners/foto-nascimento.webp', dest: 'assets/images/partners/mobile/foto-nascimento.webp', config: 'partners' },
  { src: 'assets/images/partners/ponto-frio.webp', dest: 'assets/images/partners/mobile/ponto-frio.webp', config: 'partners' },
  { src: 'assets/images/partners/tim.webp', dest: 'assets/images/partners/mobile/tim.webp', config: 'partners' },
  { src: 'assets/images/partners/casas-bahia.webp', dest: 'assets/images/partners/mobile/casas-bahia.webp', config: 'partners' },
  { src: 'assets/images/partners/voke.webp', dest: 'assets/images/partners/mobile/voke.webp', config: 'partners' },
  { src: 'assets/images/partners/apple.webp', dest: 'assets/images/partners/mobile/apple.webp', config: 'partners' },
  { src: 'assets/images/partners/facell.webp', dest: 'assets/images/partners/mobile/facell.webp', config: 'partners' }
];

async function optimizeImage(imageConfig) {
  try {
    const config = mobileConfigs[imageConfig.config];
    
    // Verificar se o arquivo de origem existe
    if (!fs.existsSync(imageConfig.src)) {
      console.log(`❌ Arquivo não encontrado: ${imageConfig.src}`);
      return false;
    }
    
    // Criar diretório de destino se não existir
    const destDir = path.dirname(imageConfig.src.replace('assets/images/', 'assets/images/mobile/'));
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Otimizar imagem
    await sharp(imageConfig.src)
      .resize(config.width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: config.quality,
        effort: 6
      })
      .toFile(imageConfig.dest);
    
    // Obter estatísticas do arquivo original e otimizado
    const originalStats = fs.statSync(imageConfig.src);
    const optimizedStats = fs.statSync(imageConfig.dest);
    const reduction = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
    
    console.log(`✅ ${imageConfig.src} -> ${imageConfig.dest}`);
    console.log(`   Redução: ${reduction}% (${(originalStats.size / 1024).toFixed(1)}KB -> ${(optimizedStats.size / 1024).toFixed(1)}KB)`);
    
    return true;
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${imageConfig.src}:`, error.message);
    return false;
  }
}

async function optimizeAllImages() {
  console.log('🚀 Iniciando otimização de imagens para mobile...\n');
  
  let successCount = 0;
  let totalCount = imagesToOptimize.length;
  
  for (const imageConfig of imagesToOptimize) {
    const success = await optimizeImage(imageConfig);
    if (success) successCount++;
  }
  
  console.log(`\n📊 Resumo da otimização:`);
  console.log(`   ✅ Sucessos: ${successCount}/${totalCount}`);
  console.log(`   ❌ Falhas: ${totalCount - successCount}`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 Todas as imagens foram otimizadas com sucesso!');
  } else {
    console.log('\n⚠️  Algumas imagens não puderam ser otimizadas. Verifique os erros acima.');
  }
}

// Executar otimização
optimizeAllImages().catch(console.error); 