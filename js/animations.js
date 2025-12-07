/**
 * BIRRIA EL CHUY - Animations & Interactions
 * Sistema profesional de animaciones y efectos interactivos
 */

// ===================================
// SCROLL ANIMATIONS
// ===================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.initSmoothScroll();
        this.initNavbarScroll();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observar elementos con clase 'fade-on-scroll'
        document.querySelectorAll('.fade-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    initNavbarScroll() {
        let lastScroll = 0;
        const navbar = document.querySelector('nav');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// ===================================
// FORM VALIDATION
// ===================================

class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(field) {
        let isValid = true;
        const value = field.value.trim();

        // Required field check
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'Este campo es requerido');
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Por favor ingresa un email válido');
                isValid = false;
            }
        }

        // Phone validation  
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(value.replace(/\D/g, ''))) {
                this.showError(field, 'Por favor ingresa un teléfono válido (10 dígitos)');
                isValid = false;
            }
        }

        if (isValid) {
            this.clearError(field);
        }

        return isValid;
    }

    showError(field, message) {
        this.clearError(field);

        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#C92A2A';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';

        field.parentNode.appendChild(errorDiv);
    }

    clearError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let isFormValid = true;
        const inputs = this.form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.showSuccessMessage();
            // Aquí se enviaría el formulario en una aplicación real
        }
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #2F9E44 0%, #37B24D 100%);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(47, 158, 68, 0.3);
                z-index: 10000;
                animation: slideDown 0.5s ease-out;
            ">
                <strong>¡Enviado correctamente!</strong><br>
                Nos pondremos en contacto contigo pronto.
            </div>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
            this.form.reset();
        }, 3000);
    }
}

// ===================================
// PARALLAX EFFECT
// ===================================

class ParallaxEffect {
    constructor() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        if (this.parallaxElements.length > 0) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            this.parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ===================================
// IMAGE LAZY LOADING
// ===================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        }
    }
}

// ===================================
// COUNTER ANIMATION
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Initialize counters when visible
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.counter);
                animateCounter(element, target);
                counterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ===================================
// MODAL/LIGHTBOX
// ===================================

class Lightbox {
    constructor() {
        this.images = document.querySelectorAll('[data-lightbox]');
        if (this.images.length > 0) {
            this.createLightboxHTML();
            this.init();
        }
    }

    createLightboxHTML() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay" style="
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.95);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            ">
                <img src="" alt="" style="
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                ">
                <button class="lightbox-close" style="
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                    background: white;
                    border: none;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    init() {
        const overlay = document.querySelector('.lightbox-overlay');
        const lightboxImg = overlay.querySelector('img');
        const closeBtn = overlay.querySelector('.lightbox-close');

        this.images.forEach(element => {
            // Si el elemento es una img directamente
            if (element.tagName === 'IMG') {
                element.style.cursor = 'pointer';
                element.addEventListener('click', () => {
                    lightboxImg.src = element.src;
                    lightboxImg.alt = element.alt;
                    overlay.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            } else {
                // Si es un contenedor (como galeria-item), buscar la img dentro
                const img = element.querySelector('img');
                if (img) {
                    element.style.cursor = 'pointer';
                    element.addEventListener('click', () => {
                        lightboxImg.src = img.src;
                        lightboxImg.alt = img.alt || '';
                        overlay.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    });
                }
            }
        });

        const closeLightbox = () => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        };

        overlay.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        // Prevenir que cerrar al hacer click en la imagen
        lightboxImg.addEventListener('click', (e) => e.stopPropagation());

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
}

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new ScrollAnimations();
    new ParallaxEffect();
    new LazyLoader();
    new Lightbox();
    initCounters();

    // Initialize forms
    if (document.querySelector('#formulario-pedidos')) {
        new FormValidator('#formulario-pedidos');
    }

    if (document.querySelector('#contacto-form')) {
        new FormValidator('#contacto-form');
    }

    console.log('✨ Birria el Chuy - Animations loaded');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    .error {
        border-color: #C92A2A !important;
    }
`;
document.head.appendChild(style);
