/**
 * MELHORIAS DE ACESSIBILIDADE DINÂMICA
 * Baseado nas recomendações do PageSpeed Insights
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MELHORAR NAVEGAÇÃO POR TECLADO
    function enhanceKeyboardNavigation() {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', function(e) {
            // Navegação por Tab
            if (e.key === 'Tab') {
                const focusable = [...document.querySelectorAll(focusableElements)];
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
            
            // Navegação por Enter e Espaço
            if (e.key === 'Enter' || e.key === ' ') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.classList.contains('tab-btn')) {
                    e.preventDefault();
                    activeElement.click();
                }
            }
        });
    }
    
    // 2. MELHORAR ANÚNCIOS DE MUDANÇAS PARA LEITORES DE TELA
    function enhanceScreenReaderAnnouncements() {
        // Criar região de anúncios
        const announcementRegion = document.createElement('div');
        announcementRegion.setAttribute('aria-live', 'polite');
        announcementRegion.setAttribute('aria-atomic', 'true');
        announcementRegion.className = 'sr-only';
        announcementRegion.id = 'announcements';
        document.body.appendChild(announcementRegion);
        
        // Função para anunciar mudanças
        window.announceToScreenReader = function(message) {
            announcementRegion.textContent = message;
            setTimeout(() => {
                announcementRegion.textContent = '';
            }, 1000);
        };
    }
    
    // 3. MELHORAR ACESSIBILIDADE DE FORMULÁRIOS
    function enhanceFormAccessibility() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Adicionar validação em tempo real
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
            
            // Melhorar feedback de envio
            form.addEventListener('submit', function(e) {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.setAttribute('aria-busy', 'true');
                    submitButton.textContent = 'Enviando...';
                }
            });
        });
    }
    
    // 4. VALIDAÇÃO DE CAMPOS
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || field.getAttribute('id');
        
        // Remover erros anteriores
        clearFieldError(field);
        
        // Validações específicas
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, `${fieldName} é obrigatório`);
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'E-mail inválido');
            return false;
        }
        
        if (field.type === 'tel' && value && !isValidPhone(value)) {
            showFieldError(field, 'Telefone inválido');
            return false;
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', `${field.id}-error`);
        
        const errorElement = document.createElement('div');
        errorElement.id = `${field.id}-error`;
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorElement);
        
        // Anunciar erro para leitores de tela
        if (window.announceToScreenReader) {
            window.announceToScreenReader(`Erro: ${message}`);
        }
    }
    
    function clearFieldError(field) {
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // 5. FUNÇÕES AUXILIARES DE VALIDAÇÃO
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    // 6. MELHORAR ACESSIBILIDADE DE IMAGENS
    function enhanceImageAccessibility() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Verificar se tem alt
            if (!img.hasAttribute('alt')) {
                img.setAttribute('alt', '');
                console.warn('Imagem sem alt:', img.src);
            }
            
            // Adicionar loading lazy para imagens não críticas
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    // 7. MELHORAR ACESSIBILIDADE DE VÍDEOS
    function enhanceVideoAccessibility() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Adicionar controles se não existirem
            if (!video.hasAttribute('controls')) {
                video.setAttribute('controls', '');
            }
            
            // Adicionar descrição
            if (!video.hasAttribute('aria-describedby')) {
                const description = video.getAttribute('aria-label') || 'Vídeo de fundo';
                video.setAttribute('aria-label', description);
            }
        });
    }
    
    // 8. MELHORAR ACESSIBILIDADE DE ANIMAÇÕES
    function enhanceAnimationAccessibility() {
        // Verificar preferência de movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Desabilitar animações
            document.body.classList.add('reduced-motion');
            
            // Pausar vídeos automáticos
            const videos = document.querySelectorAll('video[autoplay]');
            videos.forEach(video => {
                video.pause();
                video.removeAttribute('autoplay');
            });
        }
    }
    
    // 9. MELHORAR ACESSIBILIDADE DE CORES E CONTRASTE
    function enhanceColorAccessibility() {
        // Verificar preferência de contraste alto
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
        
        if (prefersHighContrast) {
            document.body.classList.add('high-contrast');
        }
        
        // Verificar preferência de esquema de cores
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDarkScheme) {
            document.body.classList.add('dark-scheme');
        }
    }
    
    // 10. MELHORAR ACESSIBILIDADE DE NAVEGAÇÃO POR ABAS
    function enhanceTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('aria-controls');
                const targetPanel = document.getElementById(targetId);
                
                if (targetPanel) {
                    // Atualizar estados dos botões
                    tabButtons.forEach(btn => {
                        btn.setAttribute('aria-selected', 'false');
                        btn.classList.remove('active');
                    });
                    
                    this.setAttribute('aria-selected', 'true');
                    this.classList.add('active');
                    
                    // Atualizar painéis
                    tabPanels.forEach(panel => {
                        panel.classList.remove('active');
                        panel.setAttribute('aria-hidden', 'true');
                    });
                    
                    targetPanel.classList.add('active');
                    targetPanel.setAttribute('aria-hidden', 'false');
                    
                    // Anunciar mudança para leitores de tela
                    if (window.announceToScreenReader) {
                        const tabName = this.textContent.trim();
                        window.announceToScreenReader(`Aba ${tabName} selecionada`);
                    }
                    
                    // Focar no conteúdo da aba
                    setTimeout(() => {
                        const firstFocusable = targetPanel.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                        if (firstFocusable) {
                            firstFocusable.focus();
                        }
                    }, 100);
                }
            });
        });
    }
    
    // 11. MELHORAR ACESSIBILIDADE DE SLIDERS
    function enhanceSliderAccessibility() {
        const sliders = document.querySelectorAll('.respostas-slider');
        
        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.resposta-card');
            const indicators = document.querySelectorAll('.indicator');
            const prevButton = slider.parentNode.querySelector('.nav-button.prev');
            const nextButton = slider.parentNode.querySelector('.nav-button.next');
            
            let currentSlide = 0;
            
            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.style.display = i === index ? 'block' : 'none';
                    slide.setAttribute('aria-hidden', i !== index);
                });
                
                indicators.forEach((indicator, i) => {
                    indicator.setAttribute('aria-pressed', i === index);
                    indicator.classList.toggle('active', i === index);
                });
                
                currentSlide = index;
                
                // Anunciar mudança
                if (window.announceToScreenReader) {
                    const slideTitle = slides[index].querySelector('h3')?.textContent || `Slide ${index + 1}`;
                    window.announceToScreenReader(`${slideTitle}, slide ${index + 1} de ${slides.length}`);
                }
            }
            
            // Configurar indicadores
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => showSlide(index));
                indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            });
            
            // Configurar botões de navegação
            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
                    showSlide(newIndex);
                });
                prevButton.setAttribute('aria-label', 'Slide anterior');
            }
            
            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
                    showSlide(newIndex);
                });
                nextButton.setAttribute('aria-label', 'Próximo slide');
            }
            
            // Mostrar primeiro slide
            showSlide(0);
        });
    }
    
    // 12. MELHORAR ACESSIBILIDADE DE LINKS EXTERNOS
    function enhanceExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        
        externalLinks.forEach(link => {
            if (!link.hasAttribute('aria-label')) {
                const currentLabel = link.getAttribute('aria-label') || link.textContent.trim();
                link.setAttribute('aria-label', `${currentLabel} (abre em nova janela)`);
            }
            
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
    
    // 13. MELHORAR ACESSIBILIDADE DE CARREGAMENTO
    function enhanceLoadingAccessibility() {
        // Adicionar indicadores de carregamento
        const loadingElements = document.querySelectorAll('.loading, [aria-busy="true"]');
        
        loadingElements.forEach(element => {
            if (!element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', 'Carregando...');
            }
        });
    }
    
    // 14. MELHORAR ACESSIBILIDADE DE ERROS
    function enhanceErrorAccessibility() {
        // Capturar erros JavaScript
        window.addEventListener('error', function(e) {
            if (window.announceToScreenReader) {
                window.announceToScreenReader('Ocorreu um erro na página');
            }
        });
        
        // Capturar erros de rede
        window.addEventListener('offline', function() {
            if (window.announceToScreenReader) {
                window.announceToScreenReader('Conexão com a internet perdida');
            }
        });
    }
    
    // 15. INICIALIZAR TODAS AS MELHORIAS
    function initAccessibilityEnhancements() {
        enhanceKeyboardNavigation();
        enhanceScreenReaderAnnouncements();
        enhanceFormAccessibility();
        enhanceImageAccessibility();
        enhanceVideoAccessibility();
        enhanceAnimationAccessibility();
        enhanceColorAccessibility();
        enhanceTabNavigation();
        enhanceSliderAccessibility();
        enhanceExternalLinks();
        enhanceLoadingAccessibility();
        enhanceErrorAccessibility();
        
        console.log('✅ Melhorias de acessibilidade aplicadas com sucesso!');
    }
    
    // Executar melhorias
    initAccessibilityEnhancements();
    
    // Observar mudanças dinâmicas
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                enhanceImageAccessibility();
                enhanceExternalLinks();
                enhanceSliderAccessibility();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// 16. MELHORIAS ESPECÍFICAS PARA MOBILE
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        // Aumentar área de toque em mobile
        const touchTargets = document.querySelectorAll('button, a, input, select, textarea');
        
        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            const minSize = 44; // Tamanho mínimo recomendado para toque
            
            if (rect.width < minSize || rect.height < minSize) {
                target.style.minWidth = minSize + 'px';
                target.style.minHeight = minSize + 'px';
            }
        });
        
        // Melhorar feedback tátil
        touchTargets.forEach(target => {
            target.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            target.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
} 