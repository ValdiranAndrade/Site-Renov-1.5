// Mobile Detector para Renov
// Detecta dispositivos móveis e redireciona para versão mobile

(function() {
    'use strict';

    // ===== CONFIGURAÇÕES =====
    const MOBILE_CONFIG = {
        mobileBreakpoint: 768,
        mobilePath: '/mobile/',
        desktopPath: '/',
        cookieName: 'renov_preferred_version',
        cookieExpiry: 30 // dias
    };

    // ===== DETECÇÃO DE DISPOSITIVO =====
    const isMobileDevice = () => {
        // Detecção por User Agent
        const mobileUserAgents = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i,
            /IEMobile/i,
            /Opera Mini/i
        ];

        const userAgent = navigator.userAgent;
        const isMobileUA = mobileUserAgents.some(agent => agent.test(userAgent));

        // Detecção por tamanho de tela
        const isMobileScreen = window.innerWidth <= MOBILE_CONFIG.mobileBreakpoint;

        // Detecção por touch
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        return isMobileUA || (isMobileScreen && isTouchDevice);
    };

    // ===== GESTÃO DE COOKIES =====
    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const getCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    // ===== REDIRECIONAMENTO =====
    const redirectToMobile = () => {
        const currentPath = window.location.pathname;
        const isAlreadyOnMobile = currentPath.includes('/mobile/');
        
        if (!isAlreadyOnMobile) {
            const mobileUrl = window.location.origin + MOBILE_CONFIG.mobilePath + 
                             currentPath.replace(/^\//, '');
            
            // Salvar preferência
            setCookie(MOBILE_CONFIG.cookieName, 'mobile', MOBILE_CONFIG.cookieExpiry);
            
            // Redirecionar
            window.location.href = mobileUrl;
        }
    };

    const redirectToDesktop = () => {
        const currentPath = window.location.pathname;
        const isOnMobile = currentPath.includes('/mobile/');
        
        if (isOnMobile) {
            const desktopUrl = window.location.origin + 
                              currentPath.replace('/mobile/', '/');
            
            // Salvar preferência
            setCookie(MOBILE_CONFIG.cookieName, 'desktop', MOBILE_CONFIG.cookieExpiry);
            
            // Redirecionar
            window.location.href = desktopUrl;
        }
    };

    // ===== VERIFICAÇÃO DE PREFERÊNCIA =====
    const checkUserPreference = () => {
        const preference = getCookie(MOBILE_CONFIG.cookieName);
        const isMobile = isMobileDevice();
        
        if (preference === 'mobile' && !isMobile) {
            // Usuário preferiu mobile mas agora está em desktop
            return 'mobile';
        } else if (preference === 'desktop' && isMobile) {
            // Usuário preferiu desktop mas agora está em mobile
            return 'desktop';
        } else if (isMobile) {
            // Dispositivo móvel detectado
            return 'mobile';
        } else {
            // Dispositivo desktop
            return 'desktop';
        }
    };

    // ===== BANNER DE TROCA DE VERSÃO =====
    const createVersionBanner = () => {
        const isOnMobile = window.location.pathname.includes('/mobile/');
        const isMobile = isMobileDevice();
        
        if ((isOnMobile && !isMobile) || (!isOnMobile && isMobile)) {
            const banner = document.createElement('div');
            banner.id = 'version-banner';
            banner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #00b140;
                color: white;
                padding: 1rem;
                text-align: center;
                z-index: 10000;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.9rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            `;
            
            const message = isOnMobile ? 
                'Versão desktop disponível' : 
                'Versão mobile disponível';
            
            const buttonText = isOnMobile ? 
                'Ver versão desktop' : 
                'Ver versão mobile';
            
            banner.innerHTML = `
                <span>${message}</span>
                <button onclick="window.mobileDetector.switchVersion()" 
                        style="
                            background: white;
                            color: #00b140;
                            border: none;
                            padding: 0.5rem 1rem;
                            margin-left: 1rem;
                            border-radius: 4px;
                            font-weight: 600;
                            cursor: pointer;
                        ">
                    ${buttonText}
                </button>
                <button onclick="window.mobileDetector.hideBanner()" 
                        style="
                            background: none;
                            color: white;
                            border: none;
                            margin-left: 0.5rem;
                            font-size: 1.2rem;
                            cursor: pointer;
                        ">
                    ×
                </button>
            `;
            
            document.body.appendChild(banner);
            
            // Ajustar conteúdo para não ficar sob o banner
            const mainContent = document.querySelector('main, .page-wrapper, body');
            if (mainContent) {
                mainContent.style.paddingTop = '4rem';
            }
        }
    };

    // ===== FUNÇÕES PÚBLICAS =====
    const switchVersion = () => {
        const isOnMobile = window.location.pathname.includes('/mobile/');
        
        if (isOnMobile) {
            redirectToDesktop();
        } else {
            redirectToMobile();
        }
    };

    const hideBanner = () => {
        const banner = document.getElementById('version-banner');
        if (banner) {
            banner.remove();
            
            // Remover padding extra
            const mainContent = document.querySelector('main, .page-wrapper, body');
            if (mainContent) {
                mainContent.style.paddingTop = '';
            }
        }
    };

    // ===== INICIALIZAÇÃO =====
    const init = () => {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        const preference = checkUserPreference();
        const currentPath = window.location.pathname;
        const isOnMobile = currentPath.includes('/mobile/');

        // Decidir redirecionamento
        if (preference === 'mobile' && !isOnMobile) {
            redirectToMobile();
        } else if (preference === 'desktop' && isOnMobile) {
            redirectToDesktop();
        } else {
            // Criar banner se necessário
            setTimeout(createVersionBanner, 1000);
        }
    };

    // ===== EXPOSIÇÃO DE FUNÇÕES =====
    window.mobileDetector = {
        isMobileDevice,
        switchVersion,
        hideBanner,
        redirectToMobile,
        redirectToDesktop,
        checkUserPreference
    };

    // ===== DETECÇÃO DE MUDANÇA DE ORIENTAÇÃO =====
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            const newPreference = checkUserPreference();
            const currentPath = window.location.pathname;
            const isOnMobile = currentPath.includes('/mobile/');
            
            if (newPreference === 'mobile' && !isOnMobile) {
                redirectToMobile();
            } else if (newPreference === 'desktop' && isOnMobile) {
                redirectToDesktop();
            }
        }, 500);
    });

    // ===== DETECÇÃO DE MUDANÇA DE TAMANHO =====
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newPreference = checkUserPreference();
            const currentPath = window.location.pathname;
            const isOnMobile = currentPath.includes('/mobile/');
            
            if (newPreference === 'mobile' && !isOnMobile) {
                redirectToMobile();
            } else if (newPreference === 'desktop' && isOnMobile) {
                redirectToDesktop();
            }
        }, 250);
    });

    // Inicializar
    init();

})(); 