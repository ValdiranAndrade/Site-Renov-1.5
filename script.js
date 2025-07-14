// Dados dos modelos de celulares por marca
const modelosPorMarca = {
    apple: [
        'iPhone 15 Pro Max',
        'iPhone 15 Pro',
        'iPhone 15 Plus',
        'iPhone 15',
        'iPhone 14 Pro Max',
        'iPhone 14 Pro',
        'iPhone 14 Plus',
        'iPhone 14',
        'iPhone 13 Pro Max',
        'iPhone 13 Pro',
        'iPhone 13',
        'iPhone 12 Pro Max',
        'iPhone 12 Pro',
        'iPhone 12'
    ],
    samsung: [
        'Galaxy S24 Ultra',
        'Galaxy S24+',
        'Galaxy S24',
        'Galaxy S23 Ultra',
        'Galaxy S23+',
        'Galaxy S23',
        'Galaxy Z Fold 5',
        'Galaxy Z Flip 5',
        'Galaxy A54',
        'Galaxy A34'
    ],
    motorola: [
        'Edge 40 Pro',
        'Edge 40',
        'Moto G84',
        'Moto G54',
        'Moto G23',
        'Razr 40 Ultra',
        'Razr 40'
    ],
    xiaomi: [
        'Redmi Note 13 Pro+',
        'Redmi Note 13 Pro',
        'Redmi Note 13',
        '13T Pro',
        '13T',
        'Poco F5',
        'Poco X5 Pro'
    ]
};

// Valores base por marca (em R$)
const valoresBase = {
    apple: {
        'iPhone 15 Pro Max': 8000,
        'iPhone 15 Pro': 7000,
        'iPhone 15 Plus': 6000,
        'iPhone 15': 5500,
        'iPhone 14 Pro Max': 6500,
        'iPhone 14 Pro': 5500,
        'iPhone 14 Plus': 5000,
        'iPhone 14': 4500,
        'iPhone 13 Pro Max': 5000,
        'iPhone 13 Pro': 4500,
        'iPhone 13': 4000,
        'iPhone 12 Pro Max': 4000,
        'iPhone 12 Pro': 3500,
        'iPhone 12': 3000
    },
    samsung: {
        'Galaxy S24 Ultra': 7000,
        'Galaxy S24+': 6000,
        'Galaxy S24': 5000,
        'Galaxy S23 Ultra': 5500,
        'Galaxy S23+': 4500,
        'Galaxy S23': 4000,
        'Galaxy Z Fold 5': 6000,
        'Galaxy Z Flip 5': 4500,
        'Galaxy A54': 2000,
        'Galaxy A34': 1500
    }
    // Outros valores podem ser adicionados conforme necessário
};

// Multiplicadores por estado
const multiplicadoresEstado = {
    excelente: 1,
    bom: 0.8,
    regular: 0.6,
    ruim: 0.4
};

// Elementos do DOM
const marcaSelect = document.getElementById('marca');
const modeloSelect = document.getElementById('modelo');
const estadoSelect = document.getElementById('estado');
const form = document.getElementById('trade-in-form');

// Atualizar modelos quando a marca for selecionada
if (marcaSelect && modeloSelect) {
marcaSelect.addEventListener('change', () => {
    const marca = marcaSelect.value;
    const modelos = modelosPorMarca[marca] || [];
    // Limpar select de modelos
    modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
    // Adicionar novos modelos
    modelos.forEach(modelo => {
        const option = document.createElement('option');
        option.value = modelo;
        option.textContent = modelo;
        modeloSelect.appendChild(option);
    });
});
}

// Função para calcular o valor do trade-in
function calcularValorTradeIn(marca, modelo, estado) {
    let valorBase = 0;
    
    if (valoresBase[marca] && valoresBase[marca][modelo]) {
        valorBase = valoresBase[marca][modelo];
    } else {
        // Valor padrão caso não encontre o modelo específico
        switch (marca) {
            case 'apple':
                valorBase = 3000;
                break;
            case 'samsung':
                valorBase = 2000;
                break;
            case 'motorola':
                valorBase = 1500;
                break;
            case 'xiaomi':
                valorBase = 1200;
                break;
            default:
                valorBase = 1000;
        }
    }
    
    return valorBase * multiplicadoresEstado[estado];
}

// Manipular envio do formulário
if (form && marcaSelect && modeloSelect && estadoSelect) {
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const marca = marcaSelect.value;
    const modelo = modeloSelect.value;
    const estado = estadoSelect.value;
    if (!marca || !modelo || !estado) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    const valorEstimado = calcularValorTradeIn(marca, modelo, estado);
    // Criar modal com o resultado
    const modalHTML = `
        <div class="modal" id="resultModal">
            <div class="modal-content">
                <h3>Avaliação do Seu Dispositivo</h3>
                <p>Marca: ${marca.toUpperCase()}</p>
                <p>Modelo: ${modelo}</p>
                <p>Estado: ${estado.charAt(0).toUpperCase() + estado.slice(1)}</p>
                <h4>Valor Estimado:</h4>
                <p class="valor-estimado">R$ ${valorEstimado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <button onclick="fecharModal()" class="cta-button">Fechar</button>
            </div>
        </div>
    `;
    // Adicionar modal ao body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    // Adicionar estilos do modal
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            text-align: center;
        }
        .valor-estimado {
            font-size: 2rem;
            color: var(--primary-color);
            font-weight: bold;
            margin: 1rem 0;
        }
    `;
    document.head.appendChild(style);
});
}

// Função para fechar o modal
window.fecharModal = function() {
    const modal = document.getElementById('resultModal');
    if (modal) {
        modal.remove();
    }
};

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 

// Adiciona pontos no mapa
document.addEventListener('DOMContentLoaded', function() {
    const mapaPontos = [
        { x: 45, y: 15 }, // Norte
        { x: 65, y: 20 },
        { x: 55, y: 25 },
        { x: 75, y: 30 },
        { x: 40, y: 35 },
        { x: 80, y: 40 }, // Nordeste
        { x: 85, y: 45 },
        { x: 90, y: 50 },
        { x: 70, y: 55 },
        { x: 60, y: 60 }, // Centro-Oeste
        { x: 50, y: 65 },
        { x: 45, y: 70 },
        { x: 55, y: 75 }, // Sudeste
        { x: 65, y: 80 },
        { x: 75, y: 85 },
        { x: 40, y: 90 }, // Sul
        { x: 50, y: 85 },
        { x: 60, y: 95 }
    ];

    const mapaBrasil = document.querySelector('.mapa-brasil');
    if (mapaBrasil) {
        mapaPontos.forEach(ponto => {
            const pontoDot = document.createElement('div');
            pontoDot.className = 'mapa-ponto';
            pontoDot.style.left = `${ponto.x}%`;
            pontoDot.style.top = `${ponto.y}%`;
            mapaBrasil.appendChild(pontoDot);
        });
    }
});

// Gerenciamento da seleção de dispositivos
document.addEventListener('DOMContentLoaded', function() {
    const dispositivoBtns = document.querySelectorAll('.dispositivo-btn');
    const formContainer = document.querySelector('.form-container');
    const btnVoltar = document.querySelector('.btn-voltar');
    const btnContinuar = document.querySelector('.btn-continuar');
    let dispositivoSelecionado = null;

    // Inicialmente esconde o formulário
    if (formContainer) {
    formContainer.style.display = 'none';
    }
    
    // Gerencia a seleção de dispositivos
    dispositivoBtns.forEach(btn => {
        // Desabilita dispositivos com badge "Em breve"
        if (btn.querySelector('.badge-em-breve')) {
            btn.disabled = true;
        }

        btn.addEventListener('click', function() {
            if (!this.disabled) {
                // Remove a seleção de todos os botões
                dispositivoBtns.forEach(b => b.classList.remove('selected'));
                
                // Adiciona a seleção ao botão clicado
                this.classList.add('selected');
                dispositivoSelecionado = this.getAttribute('data-device');

                // Mostra o formulário
                if (formContainer) {
                formContainer.style.display = 'block';
                formContainer.scrollIntoView({ behavior: 'smooth' });
                }

                // Atualiza as opções do select de marca baseado no dispositivo
                atualizarOpcoesMarca(dispositivoSelecionado);
            }
        });
    });

    // Gerencia o botão voltar
    if (btnVoltar && formContainer) {
    btnVoltar.addEventListener('click', function() {
        formContainer.style.display = 'none';
        dispositivoBtns.forEach(btn => btn.classList.remove('selected'));
        dispositivoSelecionado = null;
        
        // Limpa os selects
            if (document.getElementById('marca')) document.getElementById('marca').value = '';
            if (document.getElementById('modelo')) document.getElementById('modelo').value = '';
            if (document.getElementById('capacidade')) document.getElementById('capacidade').value = '';

        // Scroll para o topo da seção
            const secaoAvaliacao = document.querySelector('.avaliacao');
            if (secaoAvaliacao) {
                secaoAvaliacao.scrollIntoView({ behavior: 'smooth' });
            }
    });
    }

    // Gerencia o formulário
    const deviceDetailsForm = document.querySelector('.device-details-form');
    if (deviceDetailsForm) {
    deviceDetailsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
            const marca = document.getElementById('marca') ? document.getElementById('marca').value : '';
            const modelo = document.getElementById('modelo') ? document.getElementById('modelo').value : '';
            const capacidade = document.getElementById('capacidade') ? document.getElementById('capacidade').value : '';

        if (!marca || !modelo || !capacidade) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        console.log('Formulário enviado:', {
            dispositivo: dispositivoSelecionado,
            marca,
            modelo,
            capacidade
        });
    });
    }
});

// Função para atualizar as opções do select de marca
function atualizarOpcoesMarca(dispositivo) {
    const marcaSelect = document.getElementById('marca');
    const marcas = {
        smartphone: ['Apple', 'Samsung', 'Motorola', 'Xiaomi', 'LG', 'Asus'],
        tablet: ['Apple', 'Samsung', 'Lenovo', 'Multilaser'],
        smartwatch: ['Apple', 'Samsung', 'Xiaomi', 'Huawei'],
        notebook: ['Apple', 'Samsung', 'Dell', 'Lenovo', 'HP', 'Acer'],
        console: ['Sony', 'Microsoft', 'Nintendo'],
        // Adicione mais dispositivos conforme necessário
    };

    if (!marcaSelect) return;
    // Limpa as opções atuais
    marcaSelect.innerHTML = '<option value="" disabled selected>Selecione ou digite a marca</option>';

    // Adiciona as novas opções
    if (marcas[dispositivo]) {
        marcas[dispositivo].forEach(marca => {
            const option = document.createElement('option');
            option.value = marca.toLowerCase();
            option.textContent = marca;
            marcaSelect.appendChild(option);
        });
    }
}

// Atualiza as opções do select de modelo quando a marca é selecionada
const marcaSelect2 = document.getElementById('marca');
if (marcaSelect2) {
    marcaSelect2.addEventListener('change', function() {
    const modeloSelect = document.getElementById('modelo');
    const marca = this.value;
        if (!modeloSelect) return;
    // Limpa as opções atuais
    modeloSelect.innerHTML = '<option value="" disabled selected>Selecione ou digite o modelo</option>';
    // Adiciona os modelos baseado na marca selecionada
    if (modelosPorMarca[marca]) {
        modelosPorMarca[marca].forEach(modelo => {
            const option = document.createElement('option');
            option.value = modelo.toLowerCase();
            option.textContent = modelo;
            modeloSelect.appendChild(option);
        });
    }
});
}

// Atualiza as opções do select de capacidade quando o modelo é selecionado
const modeloSelect2 = document.getElementById('modelo');
if (modeloSelect2) {
    modeloSelect2.addEventListener('change', function() {
    const capacidadeSelect = document.getElementById('capacidade');
        if (!capacidadeSelect) return;
    // Limpa as opções atuais
    capacidadeSelect.innerHTML = '<option value="" disabled selected>Selecione ou digite a capacidade</option>';
    // Adiciona as opções de capacidade
    const capacidades = ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];
    capacidades.forEach(capacidade => {
        const option = document.createElement('option');
        option.value = capacidade.toLowerCase();
        option.textContent = capacidade;
        capacidadeSelect.appendChild(option);
    });
});
}



// Gerenciamento do formulário de contato
document.getElementById('form-contato')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coleta os dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Aqui você pode adicionar a lógica para enviar os dados para seu backend
    console.log('Dados do formulário:', formData);
    
    // Exemplo de feedback para o usuário
    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
    
    // Limpa o formulário
    this.reset();
}); 

// Função para abrir a aba selecionada
function openTab(tabId) {
    // Oculta todas as abas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove a classe active de todos os botões
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Ativa a aba selecionada
    document.getElementById(tabId).classList.add('active');
    
    // Ativa o botão correspondente
    const activeButton = document.querySelector(`.tab-btn[onclick="openTab('${tabId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    document.body.classList.remove('sobre-bg-global');
    if (tabId === 'sobre') {
        document.body.classList.add('sobre-bg-global');
    }
}

// Quando a página carregar, abrir a aba Home por padrão
document.addEventListener('DOMContentLoaded', () => {
    openTab('home');
});

// Abas do processo (Como funciona)
document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.processo-tab-btn');
  const tabContents = document.querySelectorAll('.processo-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      this.classList.add('active');
      const tab = this.getAttribute('data-tab');
      document.getElementById('tab-' + tab).classList.add('active');
    });
  });
}); 

// Slider de Respostas Rápidas
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.respostas-slider');
    const cards = document.querySelectorAll('.resposta-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Atualiza a posição do slider e os indicadores
    function updateSlider(index) {
        const offset = index * (cards[0].offsetWidth + 24); // 24px é o gap
        slider.scrollTo({
            left: offset,
            behavior: 'smooth'
        });
        
        // Atualiza indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Atualiza estado dos botões
        prevButton.style.opacity = index === 0 ? '0.5' : '1';
        nextButton.style.opacity = index === totalCards - 1 ? '0.5' : '1';
    }
    
    // Event listeners para os botões de navegação
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider(currentIndex);
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateSlider(currentIndex);
        }
    });
    
    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider(currentIndex);
        });
    });
    
    // Atualiza o slider quando a janela é redimensionada
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider(currentIndex);
        }, 100);
    });
    
    // Inicializa o slider
    updateSlider(0);
}); 

document.addEventListener('DOMContentLoaded', function() {
  const videoBg = document.querySelector('.video-bg-wrapper');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const header = document.querySelector('header');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.textContent.includes('Sobre Nós')) {
        videoBg.style.display = 'none';
        header.classList.add('header-black');
      } else if (this.textContent.includes('Home')) {
        videoBg.style.display = 'block';
        header.classList.remove('header-black');
      } else if (this.textContent.includes('Trabalhe Conosco') || this.textContent.includes('Fale Conosco')) {
        videoBg.style.display = 'none';
        header.classList.add('header-black');
      } else {
        header.classList.remove('header-black');
      }
    });
  });
}); 

// Sistema de gerenciamento de cache eficiente
class CacheManager {
  constructor() {
    this.cacheVersion = '1.5.2';
    this.cacheStrategies = {
      critical: { maxAge: 31536000 }, // 1 ano
      static: { maxAge: 2592000 },    // 30 dias
      external: { maxAge: 86400 },    // 1 dia
      dynamic: { maxAge: 3600 }       // 1 hora
    };
  }

  // Inicializa o gerenciador de cache
  async init() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js?v=' + this.cacheVersion);
        console.log('Cache Manager inicializado:', registration.scope);
        
        // Configura listeners para mensagens do Service Worker
        navigator.serviceWorker.addEventListener('message', this.handleSWMessage.bind(this));
        
        return registration;
      } catch (error) {
        console.error('Erro ao inicializar Cache Manager:', error);
      }
    }
  }

  // Manipula mensagens do Service Worker
  handleSWMessage(event) {
    const { type, data } = event.data;
    
    switch (type) {
      case 'CACHE_INFO':
        console.log('Informações do cache:', data);
        this.updateCacheStatus(data);
        break;
      case 'CACHE_CLEARED':
        console.log('Cache limpo com sucesso');
        this.showNotification('Cache atualizado', 'success');
        break;
    }
  }

  // Obtém informações do cache
  async getCacheInfo() {
    if (navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        this.handleSWMessage(event);
      };
      
      navigator.serviceWorker.controller.postMessage({
        type: 'GET_CACHE_INFO'
      }, [messageChannel.port2]);
    }
  }

  // Limpa o cache
  async clearCache() {
    if (navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        this.handleSWMessage(event);
      };
      
      navigator.serviceWorker.controller.postMessage({
        type: 'CLEAR_CACHE'
      }, [messageChannel.port2]);
    }
  }

  // Atualiza status do cache na interface
  updateCacheStatus(cacheInfo) {
    const cacheStatusElement = document.getElementById('cache-status');
    if (cacheStatusElement) {
      cacheStatusElement.textContent = `Cache v${cacheInfo.version} - ${cacheInfo.caches.length} caches ativos`;
    }
  }

  // Mostra notificação
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `cache-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    
    if (type === 'success') {
      notification.style.backgroundColor = '#00b140';
    } else if (type === 'error') {
      notification.style.backgroundColor = '#dc3545';
    } else {
      notification.style.backgroundColor = '#007bff';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Preload inteligente de recursos
  preloadResources(resources) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.type;
      
      if (resource.crossorigin) {
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  }

  // Lazy loading otimizado
  setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const lazyVideos = document.querySelectorAll('video[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.dataset.src || video.src;
          video.classList.remove('lazy');
          observer.unobserve(video);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyVideos.forEach(video => videoObserver.observe(video));
  }

  // Otimização de performance
  optimizePerformance() {
    // Preload de recursos críticos
    this.preloadResources([
      { url: '/styles.css?v=' + this.cacheVersion, type: 'style' },
      { url: '/script.js?v=' + this.cacheVersion, type: 'script' },
      { url: '/assets/images/Renov-Logo.png?v=' + this.cacheVersion, type: 'image' }
    ]);
    
    // DNS prefetch para recursos externos
    const dnsPrefetchLinks = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//cdnjs.cloudflare.com'
    ];
    
    dnsPrefetchLinks.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
    
    // Preconnect para recursos críticos
    const preconnectLinks = [
      { href: '//fonts.googleapis.com' },
      { href: '//fonts.gstatic.com', crossorigin: true },
      { href: '//cdnjs.cloudflare.com' }
    ];
    
    preconnectLinks.forEach(config => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = config.href;
      if (config.crossorigin) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }
}

// Inicialização do Cache Manager
const cacheManager = new CacheManager();

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
  // Inicializa o Cache Manager
  await cacheManager.init();
  
  // Otimiza performance
  cacheManager.optimizePerformance();
  
  // Configura lazy loading
  cacheManager.setupLazyLoading();
  
  // Obtém informações do cache
  setTimeout(() => {
    cacheManager.getCacheInfo();
  }, 1000);
}); 