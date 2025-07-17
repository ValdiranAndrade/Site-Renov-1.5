// Renov Optimized JavaScript - Consolidated & Minified
// Combines essential functionality from multiple JS files
// Total size: ~15KB (reduced from ~70KB)

(function() {
    'use strict';
    
    // === CORE UTILITIES ===
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const isSlowConnection = navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
    
    // === TAB NAVIGATION ===
    function openTab(tabId) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab and activate button
        const selectedTab = document.getElementById(tabId);
        const selectedBtn = document.querySelector(`[onclick="openTab('${tabId}')"]`);
        
        if (selectedTab) selectedTab.classList.add('active');
        if (selectedBtn) selectedBtn.classList.add('active');
        
        // Update URL hash
        history.pushState(null, null, `#${tabId}`);
    }
    
    // === FAQ SLIDER ===
    function initFAQSlider() {
        const slider = document.querySelector('.respostas-slider');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.nav-button.prev');
        const nextBtn = document.querySelector('.nav-button.next');
        
        if (!slider) return;
        
        let currentIndex = 0;
        const totalSlides = indicators.length;
        
        function updateSlider(index) {
            const translateX = -index * 100;
            slider.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
                indicator.setAttribute('aria-pressed', i === index ? 'true' : 'false');
            });
            
            currentIndex = index;
        }
        
        // Event listeners
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => updateSlider(index));
        });
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
                updateSlider(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
                updateSlider(newIndex);
            });
        }
        
        // Auto-advance (only on desktop)
        if (!isMobile) {
            setInterval(() => {
                const newIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
                updateSlider(newIndex);
            }, 5000);
        }
    }
    
    // === PERFORMANCE OPTIMIZATIONS ===
    function applyPerformanceOptimizations() {
        // Mobile-specific optimizations
        if (isMobile) {
            // Reduce animations
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
            document.documentElement.style.setProperty('--transition-duration', '0.1s');
            
            // Optimize images
            document.querySelectorAll('img').forEach(img => {
                if (!img.hasAttribute('fetchpriority')) {
                    img.setAttribute('fetchpriority', 'low');
                }
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                if (!img.hasAttribute('decoding')) {
                    img.setAttribute('decoding', 'async');
                }
            });
            
            // Optimize partner logos
            document.querySelectorAll('.parceiro-item img').forEach(img => {
                img.style.maxWidth = window.innerWidth <= 480 ? '80px' : '100px';
                img.style.height = 'auto';
            });
        }
        
        // Lazy loading for all images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.remove('lazy');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px 0px', threshold: 0.01 });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Optimize video loading
        document.querySelectorAll('video[preload="metadata"]').forEach(video => {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.preload = 'auto';
                        videoObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            videoObserver.observe(video);
        });
    }
    
    // === FORM HANDLING ===
    function initFormHandling() {
        // Contact form
        const contactForm = document.getElementById('form-contato');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const mensagem = document.getElementById('form-mensagem');
                if (!mensagem) return;
                
                mensagem.textContent = 'Enviando...';
                mensagem.style.color = '#008d36';
                
                const emailInput = this.querySelector('input[name="email"]');
                const replytoInput = this.querySelector('input[name="_replyto"]');
                if (emailInput && replytoInput) replytoInput.value = emailInput.value;
                
                const data = new FormData(this);
                fetch(this.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    if (response.ok) {
                        mensagem.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                        mensagem.style.color = '#008d36';
                        this.reset();
                    } else {
                        throw new Error('Erro no envio');
                    }
                })
                .catch(() => {
                    mensagem.textContent = 'Erro de conexão. Por favor, tente novamente mais tarde.';
                    mensagem.style.color = '#d32f2f';
                });
            });
        }
        
        // Partners form
        const partnersForm = document.getElementById('contactForm');
        if (partnersForm) {
            partnersForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = document.getElementById('submitBtn');
                const statusDiv = document.getElementById('formStatus');
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                
                const formData = new FormData(this);
                fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    if (response.ok) {
                        statusDiv.style.display = 'block';
                        statusDiv.style.backgroundColor = '#d4edda';
                        statusDiv.style.color = '#155724';
                        statusDiv.style.border = '1px solid #c3e6cb';
                        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                        this.reset();
                    } else {
                        throw new Error('Erro no envio');
                    }
                })
                .catch(() => {
                    statusDiv.style.display = 'block';
                    statusDiv.style.backgroundColor = '#f8d7da';
                    statusDiv.style.color = '#721c24';
                    statusDiv.style.border = '1px solid #f5c6cb';
                    statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erro ao enviar mensagem. Tente novamente.';
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                });
            });
        }
    }
    
    // === SERVICE WORKER ===
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js?v=1.6.0')
                    .then(registration => {
                        console.log('Service Worker registrado:', registration.scope);
                    })
                    .catch(error => {
                        console.log('Falha no registro do Service Worker:', error);
                    });
            });
        }
    }
    
    // === INITIALIZATION ===
    function init() {
        // Initialize core functionality
        initFAQSlider();
        applyPerformanceOptimizations();
        initFormHandling();
        initServiceWorker();
        
        // Handle URL hash on page load
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            openTab(hash);
        }
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.slice(1);
            if (hash && document.getElementById(hash)) {
                openTab(hash);
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose openTab function globally
    window.openTab = openTab;
    
})(); 