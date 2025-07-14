#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Função para gerar timestamp de versão
function generateVersion() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  
  return `1.5.${year}${month}${day}${hour}${minute}`;
}

// Função para atualizar versão no HTML
function updateHTMLVersion(version) {
  const htmlPath = path.join(__dirname, 'index.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Atualizar versões nos links
  htmlContent = htmlContent.replace(/styles\.css\?v=[^"'\s]+/g, `styles.css?v=${version}`);
  htmlContent = htmlContent.replace(/script\.js\?v=[^"'\s]+/g, `script.js?v=${version}`);
  htmlContent = htmlContent.replace(/sw\.js\?v=[^"'\s]+/g, `sw.js?v=${version}`);
  htmlContent = htmlContent.replace(/manifest\.json\?v=[^"'\s]+/g, `manifest.json?v=${version}`);
  htmlContent = htmlContent.replace(/Renov-Logo\.png\?v=[^"'\s]+/g, `Renov-Logo.png?v=${version}`);
  htmlContent = htmlContent.replace(/bg-video\.mp4\.mp4\?v=[^"'\s]+/g, `bg-video.mp4.mp4?v=${version}`);
  
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ HTML atualizado com versão ${version}`);
}

// Função para atualizar versão no Service Worker
function updateSWVersion(version) {
  const swPath = path.join(__dirname, 'sw.js');
  let swContent = fs.readFileSync(swPath, 'utf8');
  
  // Atualizar versão do cache
  swContent = swContent.replace(/const CACHE_VERSION = '[^']+';/, `const CACHE_VERSION = '${version}';`);
  
  fs.writeFileSync(swPath, swContent);
  console.log(`✅ Service Worker atualizado com versão ${version}`);
}

// Função para atualizar versão no Manifest
function updateManifestVersion(version) {
  const manifestPath = path.join(__dirname, 'manifest.json');
  let manifestContent = fs.readFileSync(manifestPath, 'utf8');
  
  // Atualizar versão no nome do cache
  manifestContent = manifestContent.replace(/"cache_strategy": "[^"]+"/, `"cache_strategy": "cache-first", "version": "${version}"`);
  
  fs.writeFileSync(manifestPath, manifestContent);
  console.log(`✅ Manifest atualizado com versão ${version}`);
}

// Função principal
function main() {
  const version = generateVersion();
  
  console.log(`🔄 Atualizando versão para: ${version}`);
  
  try {
    updateHTMLVersion(version);
    updateSWVersion(version);
    updateManifestVersion(version);
    
    console.log(`\n🎉 Versão ${version} aplicada com sucesso!`);
    console.log('💡 Execute: git add . && git commit -m "📦 Versão ' + version + '" && git push origin main');
    
  } catch (error) {
    console.error('❌ Erro ao atualizar versão:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { generateVersion, updateHTMLVersion, updateSWVersion, updateManifestVersion }; 