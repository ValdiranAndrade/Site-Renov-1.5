// Mobile Redirect Script para GitHub Pages
// Script de redirecionamento mobile que funciona no GitHub Pages

(function() {
    'use strict';
    
    // Configurações
    const MOBILE_CONFIG = {
        mobilePath: '/mobile/',
        desktopPath: '/',
        cookieName: 'renov_version_preference',
        cookieExpiry: 7, // dias
        mobileUserAgents: [
            'android', 'blackberry', 'iphone', 'ipad', 'ipod', 
            'iemobile', 'opera mini', 'mobile', 'tablet'
        ],
        mobileWidth: 768
    };
    
    // Função para detectar dispositivo móvel
    function isMobileDevice() {
        // Verificar User Agent
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobileUA = MOBILE_CONFIG.mobileUserAgents.some(agent => 
            userAgent.includes(agent)
        );
        
        // Verificar largura da tela
        const isMobileScreen = window.innerWidth <= MOBILE_CONFIG.mobileWidth;
        
        // Verificar se tem touch
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        return isMobileUA || (isMobileScreen && hasTouch);
    }
    
    // Função para gerenciar cookies
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    }
    
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Função para redirecionar
    function redirectToMobile() {
        if (!window.location.pathname.includes('/mobile/')) {
            const mobileUrl = window.location.origin + MOBILE_CONFIG.mobilePath + 
                            window.location.pathname.replace(/^\//, '');
            window.location.href = mobileUrl;
        }
    }
    
    function redirectToDesktop() {
        if (window.location.pathname.includes('/mobile/')) {
            const desktopUrl = window.location.origin + 
                             window.location.pathname.replace('/mobile/', '/');
            window.location.href = desktopUrl;
        }
    }
    
    // Função para criar banner de troca de versão
    function createVersionBanner() {
        const banner = document.createElement('div');
        banner.id = 'version-banner';
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #00b140;
            color: white;
            padding: 12px 16px;
            text-align: center;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        
        const isMobile = window.location.pathname.includes('/mobile/');
        const message = isMobile ? 
            'Versão mobile ativa. ' : 
            'Versão desktop ativa. ';
        
        banner.innerHTML = `
            ${message}
            <button onclick="switchVersion()" style="
                background: white;
                color: #00b140;
                border: none;
                padding: 4px 12px;
                border-radius: 16px;
                font-size: 12px;
                font-weight: bold;
                margin-left: 8px;
                cursor: pointer;
            ">Trocar versão</button>
            <button onclick="closeBanner()" style="
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                margin-left: 8px;
                cursor: pointer;
            ">&times;</button>
        `;
        
        document.body.appendChild(banner);
        
        // Ajustar body para o banner
        document.body.style.paddingTop = '60px';
    }
    
    // Funções globais para o banner
    window.switchVersion = function() {
        const isMobile = window.location.pathname.includes('/mobile/');
        if (isMobile) {
            redirectToDesktop();
        } else {
            redirectToMobile();
        }
    };
    
    window.closeBanner = function() {
        const banner = document.getElementById('version-banner');
        if (banner) {
            banner.remove();
            document.body.style.paddingTop = '';
        }
    };
    
    // Função principal de inicialização
    function init() {
        // Verificar se já foi redirecionado
        const hasRedirected = sessionStorage.getItem('renov_redirected');
        if (hasRedirected) return;
        
        // Verificar preferência do usuário
        const userPreference = getCookie(MOBILE_CONFIG.cookieName);
        
        if (userPreference === 'desktop') {
            // Usuário escolheu desktop
            if (window.location.pathname.includes('/mobile/')) {
                redirectToDesktop();
            }
        } else if (userPreference === 'mobile') {
            // Usuário escolheu mobile
            if (!window.location.pathname.includes('/mobile/') && isMobileDevice()) {
                redirectToMobile();
            }
        } else {
            // Primeira visita - detectar automaticamente
            if (isMobileDevice() && !window.location.pathname.includes('/mobile/')) {
                redirectToMobile();
            } else if (!isMobileDevice() && window.location.pathname.includes('/mobile/')) {
                redirectToDesktop();
            }
        }
        
        // Marcar como redirecionado
        sessionStorage.setItem('renov_redirected', 'true');
        
        // Criar banner se necessário
        setTimeout(() => {
            createVersionBanner();
        }, 1000);
    }
    
    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Reavaliar em mudanças de orientação
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            sessionStorage.removeItem('renov_redirected');
            init();
        }, 500);
    });
    
    // Reavaliar em mudanças de tamanho da tela
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            sessionStorage.removeItem('renov_redirected');
            init();
        }, 300);
    });
    
})(); 