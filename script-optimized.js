// Script otimizado para reduzir reflow forçado
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (isMobile) {
    let optimizeMobile = () => {
        const root = document.documentElement;
        root.style.setProperty("--animation-duration", "0.15s");
        root.style.setProperty("--scroll-behavior", "auto");
        
        // Batch DOM operations to reduce reflow
        const elementsToOptimize = document.querySelectorAll(".hero-text, .video-bg, .logo img");
        const inputsToOptimize = document.querySelectorAll("input, textarea, select");
        
        // Use requestAnimationFrame to batch style changes
        requestAnimationFrame(() => {
            elementsToOptimize.forEach(el => {
                el.style.cssText = "display:block;visibility:visible;opacity:1";
            });
            
            inputsToOptimize.forEach(el => {
                el.style.fontSize = "16px";
            });
        });
    };

    ["touchstart", "touchmove"].forEach(event => {
        document.addEventListener(event, () => {}, { passive: true });
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", optimizeMobile, { once: true });
    } else {
        optimizeMobile();
    }
}

// Cache DOM queries to avoid repeated lookups
const DOM_CACHE = {
    marcaSelect: null,
    modeloSelect: null,
    estadoSelect: null,
    form: null,
    respostasSlider: null,
    respostaCards: null,
    indicators: null,
    prevButton: null,
    nextButton: null,
    videoBgWrapper: null,
    tabButtons: null,
    header: null
};

// Initialize DOM cache
function initDOMCache() {
    DOM_CACHE.marcaSelect = document.getElementById("marca");
    DOM_CACHE.modeloSelect = document.getElementById("modelo");
    DOM_CACHE.estadoSelect = document.getElementById("estado");
    DOM_CACHE.form = document.getElementById("trade-in-form");
    DOM_CACHE.respostasSlider = document.querySelector(".respostas-slider");
    DOM_CACHE.respostaCards = document.querySelectorAll(".resposta-card");
    DOM_CACHE.indicators = document.querySelectorAll(".indicator");
    DOM_CACHE.prevButton = document.querySelector(".nav-button.prev");
    DOM_CACHE.nextButton = document.querySelector(".nav-button.next");
    DOM_CACHE.videoBgWrapper = document.querySelector(".video-bg-wrapper");
    DOM_CACHE.tabButtons = document.querySelectorAll(".tab-btn");
    DOM_CACHE.header = document.querySelector("header");
}

// Optimized slider function to reduce reflow
function createOptimizedSlider() {
    if (!DOM_CACHE.respostasSlider || !DOM_CACHE.respostaCards.length) return;

    let currentSlide = 0;
    const totalSlides = DOM_CACHE.respostaCards.length;
    
    // Cache offsetWidth to avoid repeated reflow
    let cardWidth = 0;
    let cardWidthCalculated = false;
    
    function calculateCardWidth() {
        if (!cardWidthCalculated && DOM_CACHE.respostaCards[0]) {
            // Use getBoundingClientRect instead of offsetWidth to reduce reflow
            const rect = DOM_CACHE.respostaCards[0].getBoundingClientRect();
            cardWidth = rect.width;
            cardWidthCalculated = true;
        }
    }
    
    function updateSlider(slideIndex) {
        if (!cardWidthCalculated) {
            calculateCardWidth();
        }
        
        const scrollPosition = slideIndex * (cardWidth + 24);
        
        // Batch all DOM operations in a single requestAnimationFrame
        requestAnimationFrame(() => {
            // Batch scroll operation
            DOM_CACHE.respostasSlider.scrollTo({
                left: scrollPosition,
                behavior: "smooth"
            });
            
            // Batch class operations
            DOM_CACHE.indicators.forEach((indicator, index) => {
                indicator.classList.toggle("active", index === slideIndex);
            });
            
            // Batch style operations
            DOM_CACHE.prevButton.style.opacity = slideIndex === 0 ? "0.5" : "1";
            DOM_CACHE.nextButton.style.opacity = slideIndex === totalSlides - 1 ? "0.5" : "1";
        });
    }
    
    // Event listeners
    if (DOM_CACHE.prevButton) {
        DOM_CACHE.prevButton.addEventListener("click", () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider(currentSlide);
            }
        });
    }
    
    if (DOM_CACHE.nextButton) {
        DOM_CACHE.nextButton.addEventListener("click", () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlider(currentSlide);
            }
        });
    }
    
    DOM_CACHE.indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            currentSlide = index;
            updateSlider(currentSlide);
        });
    });
    
    // Optimized resize handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cardWidthCalculated = false; // Recalculate on resize
            updateSlider(currentSlide);
        }, 150);
    });
    
    // Initialize
    updateSlider(0);
}

// Optimized tab switching to reduce reflow
function createOptimizedTabSwitcher() {
    if (!DOM_CACHE.tabButtons.length) return;
    
    function switchTab(tabId) {
        // Batch all DOM operations
        requestAnimationFrame(() => {
            // Remove active class from all tabs
            document.querySelectorAll(".tab-content").forEach(content => {
                content.classList.remove("active");
            });
            
            DOM_CACHE.tabButtons.forEach(btn => {
                btn.classList.remove("active");
            });
            
            // Add active class to target tab
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add("active");
            }
            
            const targetButton = document.querySelector(`.tab-btn[onclick="openTab('${tabId}')"]`);
            if (targetButton) {
                targetButton.classList.add("active");
            }
            
            // Handle background changes
            document.body.classList.remove("sobre-bg-global");
            if (tabId === "sobre") {
                document.body.classList.add("sobre-bg-global");
            }
            
            // Handle video wrapper visibility
            if (DOM_CACHE.videoBgWrapper) {
                if (tabId === "home") {
                    DOM_CACHE.videoBgWrapper.style.display = "block";
                    DOM_CACHE.header.classList.remove("header-black");
                } else {
                    DOM_CACHE.videoBgWrapper.style.display = "none";
                    DOM_CACHE.header.classList.add("header-black");
                }
            }
        });
    }
    
    // Global function for tab switching
    window.openTab = switchTab;
    
    // Event listeners
    DOM_CACHE.tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            const tabId = this.getAttribute("data-tab") || this.textContent.toLowerCase().replace(/\s+/g, "");
            switchTab(tabId);
        });
    });
}

// Optimized video loading to reduce reflow
function createOptimizedVideoLoader() {
    const video = document.getElementById("hero-video");
    if (!video) return;
    
    function optimizeVideoStyles() {
        // Batch all style changes
        requestAnimationFrame(() => {
            video.style.cssText = `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                width: 100vw !important;
                height: 100% !important;
                min-width: 100vw !important;
                min-height: 100% !important;
                object-fit: cover !important;
                position: absolute !important;
                top: 0 !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                z-index: 0 !important;
                background: transparent !important;
            `;
        });
    }
    
    // Load video and optimize
    video.load();
    
    // Use requestAnimationFrame for style changes
    setTimeout(() => {
        optimizeVideoStyles();
        
        // Handle video play
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Vídeo não pôde ser reproduzido automaticamente:", error);
                optimizeVideoStyles();
            });
        }
    }, 100);
    
    // Handle video loaded event
    video.addEventListener("loadeddata", () => {
        optimizeVideoStyles();
    });
}

// Debounce function to reduce frequent operations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Initialize DOM cache first
    initDOMCache();
    
    // Initialize optimized components
    createOptimizedSlider();
    createOptimizedTabSwitcher();
    createOptimizedVideoLoader();
    
    // Set initial tab
    if (typeof window.openTab === "function") {
        window.openTab("home");
    }
});

// Optimized mobile menu
function createOptimizedMobileMenu() {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const menuOverlay = document.querySelector(".mobile-menu-overlay");
    
    if (!menuToggle || !menuOverlay) return;
    
    function openMobileMenu() {
        requestAnimationFrame(() => {
            menuToggle.classList.add("active");
            menuOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }
    
    function closeMobileMenu() {
        requestAnimationFrame(() => {
            menuToggle.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.style.overflow = "";
        });
    }
    
    menuToggle.addEventListener("click", openMobileMenu);
    
    // Close menu on overlay click or escape key
    document.addEventListener("click", (e) => {
        if (menuOverlay.classList.contains("active") && 
            !menuOverlay.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMobileMenu();
        }
    });
    
    // Global functions
    window.openMobileMenu = openMobileMenu;
    window.closeMobileMenu = closeMobileMenu;
}

// Initialize mobile menu
document.addEventListener("DOMContentLoaded", createOptimizedMobileMenu); 