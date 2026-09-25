// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const sideMenu = document.querySelector('.side-menu');
const sideMenuBackdrop = document.getElementById('side-menu-backdrop');
const sideMenuClose = document.querySelector('.side-menu__close');
const body = document.body;

function setMenuOpenState(isOpen) {
    if (!sideMenu) {
        return;
    }

    sideMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

    if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    if (sideMenuBackdrop) {
        sideMenuBackdrop.hidden = !isOpen;
        sideMenuBackdrop.classList.toggle('is-visible', isOpen);
    }
}

function openMenu() {
    if (!sideMenu) {
        return;
    }

    sideMenu.classList.remove('side-menu--text-in');
    sideMenu.style.display = 'flex';
    sideMenu.classList.remove('close');
    requestAnimationFrame(() => {
        sideMenu.classList.add('open');
        requestAnimationFrame(() => {
            sideMenu.classList.add('side-menu--text-in');
        });
    });
    setMenuOpenState(true);
    body.style.overflow = 'hidden';
}

function closeMenu() {
    if (!sideMenu) {
        return;
    }

    sideMenu.classList.add('close');
    sideMenu.classList.remove('open', 'side-menu--text-in');
    setMenuOpenState(false);
    body.style.overflow = '';

    window.setTimeout(() => {
        if (sideMenu.classList.contains('close')) {
            sideMenu.style.display = 'none';
        }
    }, 320);
}

function toggleMenu() {
    if (!sideMenu) {
        return;
    }

    if (sideMenu.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (mobileNavToggle) {
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    mobileNavToggle.addEventListener('click', toggleMenu);
}

if (sideMenuClose) {
    sideMenuClose.addEventListener('click', closeMenu);
}

if (sideMenuBackdrop) {
    sideMenuBackdrop.addEventListener('click', closeMenu);
}

document.querySelectorAll('.side-menu-list a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', function (e) {
    if (
        sideMenu &&
        sideMenu.classList.contains('open') &&
        !sideMenu.contains(e.target) &&
        mobileNavToggle &&
        !mobileNavToggle.contains(e.target)
    ) {
        closeMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sideMenu.classList.contains('open')) {
        closeMenu();
    }
});

// Close menu on window resize if screen becomes larger
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && sideMenu.classList.contains('open')) {
        closeMenu();
    }
});

// Testimonials Slider
const testimonioCards = document.querySelectorAll('.testimonio-card');
const testimonioDots = document.querySelectorAll('.dot');
const testimonioPrev = document.querySelector('.testimonio-prev');
const testimonioNext = document.querySelector('.testimonio-next');
let currentTestimonio = 0;

function showTestimonio(index) {
    // Hide all cards
    testimonioCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonioDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current card
    if (testimonioCards[index]) {
        testimonioCards[index].classList.add('active');
    }
    
    // Activate current dot
    if (testimonioDots[index]) {
        testimonioDots[index].classList.add('active');
    }
}

function nextTestimonio() {
    currentTestimonio = (currentTestimonio + 1) % testimonioCards.length;
    showTestimonio(currentTestimonio);
}

function prevTestimonio() {
    currentTestimonio = (currentTestimonio - 1 + testimonioCards.length) % testimonioCards.length;
    showTestimonio(currentTestimonio);
}

// Event listeners for testimonial navigation
if (testimonioNext) {
    testimonioNext.addEventListener('click', nextTestimonio);
}

if (testimonioPrev) {
    testimonioPrev.addEventListener('click', prevTestimonio);
}

// Dot navigation
testimonioDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonio = index;
        showTestimonio(currentTestimonio);
    });
});

// Auto-advance testimonials
setInterval(nextTestimonio, 5000);

// Initialize testimonials
if (testimonioCards.length > 0) {
    showTestimonio(0);
}

function playHeroSlideText(slideEl) {
    if (!slideEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    slideEl.classList.remove('hero-text-play');
    void slideEl.offsetWidth;
    slideEl.classList.add('hero-text-play');
}

// Hero Carousel Swiper
const heroSwiperEl = document.querySelector('.hero-swiper');
if (heroSwiperEl) {
    new Swiper('.hero-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 900,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.hero-swiper-pagination',
            clickable: true,
        },
        on: {
            init(swiper) {
                playHeroSlideText(swiper.slides[swiper.activeIndex]);
            },
            slideChangeTransitionStart(swiper) {
                playHeroSlideText(swiper.slides[swiper.activeIndex]);
            },
        },
    });
}

// Navbar scroll effect
const navbarV2 = document.querySelector('.navbar-v2');
const scrollSection = document.querySelector('.hero-section') || document.querySelector('.header-banner');
if (navbarV2 && scrollSection) {
    const onScroll = () => {
        const threshold = scrollSection.classList.contains('hero-section')
            ? scrollSection.offsetHeight - 80
            : 80;
        navbarV2.classList.toggle('scrolled', window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Swiper Configuration (solo inicio — evita error en páginas sin Swiper)
const slideContentEl = document.querySelector('.slide-content');
if (typeof Swiper !== 'undefined' && slideContentEl) {
    new Swiper('.slide-content', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        centeredSlides: false,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 800,
        grabCursor: true,
        touchRatio: 1,
        touchAngle: 45,
        threshold: 5,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        touchStartPreventDefault: false,
        touchMoveStopPropagation: false,
        simulateTouch: true,
        allowTouchMove: true,
        resistance: true,
        resistanceRatio: 0.85,
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const targetValue = counter.getAttribute('data-target');
        const target = parseInt(targetValue.replace(/[+%]/g, ''));
        const hasPlus = targetValue.includes('+');
        const hasPercent = targetValue.includes('%');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                const displayValue = Math.ceil(current);
                let displayText = displayValue.toString();
                if (hasPlus) displayText = '+' + displayText;
                if (hasPercent) displayText = displayText + '%';
                counter.textContent = displayText;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = targetValue;
            }
        };
        
        updateCounter();
    });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TEXT_REVEAL_SECTIONS = [
    '.quienes-somos',
    '.nuestra-vision-objetivos',
    '.doctores-section',
    '.testimonios-section',
    '.Nuestra_Experiencia',
    '.Servicios',
    '.quick-tips-section',
    '.main-advice-section',
    '.categories-section',
    '.stories-section',
    '.additional-info-section',
    '.contact-section',
    '.map-section',
    '.social-section',
].join(', ');

function markTextRevealElements() {
    document.querySelectorAll(TEXT_REVEAL_SECTIONS).forEach((section) => {
        section.querySelectorAll('h1, h2, h3, h4, p, .banner-features li, .feature-text h4, .feature-text p').forEach((el) => {
            if (el.closest('footer, .side-menu, .navbar-v2, .swiper-pagination, .swiper-button-next, .swiper-button-prev')) {
                return;
            }
            el.classList.add('text-reveal');
        });
    });
}

function initBannerTextAnimations() {
    document.querySelectorAll('.banner').forEach((banner) => {
        if (prefersReducedMotion) {
            banner.classList.add('banner-text-play');
            return;
        }

        requestAnimationFrame(() => {
            banner.classList.add('banner-text-play');
        });
    });
}

function initScrollTextReveals() {
    markTextRevealElements();

    if (prefersReducedMotion) {
        document.querySelectorAll('.text-reveal').forEach((el) => {
            el.classList.add('is-visible');
        });
        return;
    }

    const sectionObserverOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            if (entry.target.classList.contains('experiencia-stats')) {
                animateCounters();
            }

            const texts = entry.target.querySelectorAll('.text-reveal:not(.is-visible)');
            texts.forEach((el, index) => {
                el.style.setProperty('--reveal-delay', `${Math.min(index * 0.07, 0.42)}s`);
                el.classList.add('is-visible');
            });

            sectionObserver.unobserve(entry.target);
        });
    }, sectionObserverOptions);

    document.querySelectorAll(`${TEXT_REVEAL_SECTIONS}, .experiencia-stats`).forEach((section) => {
        sectionObserver.observe(section);
    });
}

initBannerTextAnimations();
initScrollTextReveals();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Add loading states
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// Performance optimization: Lazy load images
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mobile touch improvements
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Improve touch scrolling
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
}

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Console log for debugging
console.log('Veterinaria San Martin de Porres - Website loaded successfully!');
console.log('Header scroll script loaded');

// Removed duplicate function

// Test scroll detection first
console.log('Testing scroll detection...');
console.log('Window height:', window.innerHeight);
console.log('Document height:', document.documentElement.scrollHeight);
console.log('Can scroll:', document.documentElement.scrollHeight > window.innerHeight);