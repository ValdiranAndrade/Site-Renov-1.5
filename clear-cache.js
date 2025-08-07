// Script para limpar cache antigo e forçar registro do novo Service Worker
console.log('🧹 Iniciando limpeza de cache...');

// Função para limpar todos os caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    console.log('📋 Caches encontrados:', cacheNames);
    
    const deletePromises = cacheNames.map(cacheName => {
      console.log('🗑️ Removendo cache:', cacheName);
      return caches.delete(cacheName);
    });
    
    await Promise.all(deletePromises);
    console.log('✅ Todos os caches foram removidos');
    
    // Forçar registro do novo Service Worker
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      // Remover registros antigos
      for (const registration of registrations) {
        console.log('🔄 Removendo Service Worker antigo:', registration.scope);
        await registration.unregister();
      }
      
      // Registrar novo Service Worker
      console.log('🆕 Registrando novo Service Worker...');
      const newRegistration = await navigator.serviceWorker.register('sw.min.js?v=1.6.6');
      console.log('✅ Novo Service Worker registrado:', newRegistration.scope);
      
      // Forçar ativação
      if (newRegistration.waiting) {
        newRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
        console.log('⏭️ Pulando espera do Service Worker');
      }
    }
    
    console.log('🎉 Limpeza concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
  }
}

// Executar limpeza quando o script for carregado
clearAllCaches();

// Também executar quando a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', clearAllCaches);
} else {
  clearAllCaches();
} 