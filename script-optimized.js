// JavaScript Otimizado - Apenas funcionalidades essenciais

// Detectar se é dispositivo mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Otimizações para mobile
if (isMobile) {
    const ultraOptimizations = () => {
        const root = document.documentElement;
        root.style.setProperty('--animation-duration', '0.15s');
        root.style.setProperty('--scroll-behavior', 'auto');
        
        const criticalElements = document.querySelectorAll('.hero-text, .video-bg, .logo img');
        criticalElements.forEach(el => {
            el.style.cssText = 'display:block;visibility:visible;opacity:1';
        });
        
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.style.fontSize = '16px';
        });
    };
    
    ['touchstart', 'touchmove'].forEach(event => {
        document.addEventListener(event, () => {}, {passive: true});
    });
    
    document.readyState === 'loading' 
        ? document.addEventListener('DOMContentLoaded', ultraOptimizations, {once: true})
        : ultraOptimizations();
}

// Função para abrir abas
function openTab(tabId) {
    // Esconder todas as abas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover classe active de todos os botões
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar a aba selecionada
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Adicionar classe active ao botão clicado
    const activeButton = document.querySelector(`.tab-btn[onclick="openTab('${tabId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Scroll para o topo
    window.scrollTo(0, 0);
}

// Sistema de slider para respostas rápidas
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.respostas-slider');
    const cards = document.querySelectorAll('.resposta-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    if (!slider || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // 32px para margin
    
    function updateSlider(index) {
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        currentIndex = index;
        const translateX = -currentIndex * cardWidth;
        slider.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Event listeners para botões de navegação
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            updateSlider(currentIndex - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            updateSlider(currentIndex + 1);
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlider(index);
        });
    });
    
    // Auto-play (opcional)
    setInterval(() => {
        updateSlider(currentIndex + 1);
    }, 5000);
});

// Formulário de contato
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form && form.id === 'form-contato') {
        e.preventDefault();
        const mensagem = document.getElementById('form-mensagem');
        if (!mensagem) return;
        
        mensagem.textContent = 'Enviando...';
        mensagem.style.color = '#008d36';
        
        const emailInput = form.querySelector('input[name="email"]');
        const replytoInput = form.querySelector('input[name="_replyto"]');
        if(emailInput && replytoInput) replytoInput.value = emailInput.value;
        
        const data = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(response) {
            if (response.ok) {
                mensagem.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                mensagem.style.color = '#008d36';
                form.reset();
            } else {
                mensagem.textContent = 'Ocorreu um erro ao enviar. Por favor, tente novamente ou envie um e-mail para contato@renovsmart.com.br.';
                mensagem.style.color = '#d32f2f';
            }
        })
        .catch(function() {
            mensagem.textContent = 'Erro de conexão. Por favor, tente novamente mais tarde.';
            mensagem.style.color = '#d32f2f';
        });
    }
}, true);

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js?v=1.6.0')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(error => {
                console.log('Falha no registro do Service Worker:', error);
            });
    });
}

// Otimizações de performance
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload de recursos críticos
    const criticalResources = [
        'assets/images/Renov-Logo.webp',
        'assets/fonts/Montserrat-Regular.woff2'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.woff2') ? 'font' : 'image';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
});

// Reduzir animações para usuários que preferem menos movimento
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
} 