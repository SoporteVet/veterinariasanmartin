// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const sideMenu = document.querySelector('.side-menu');
const body = document.body;

// Function to open menu
function openMenu() {
    sideMenu.classList.add('open');
    sideMenu.classList.remove('close');
    body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close menu
function closeMenu() {
    sideMenu.classList.add('close');
    sideMenu.classList.remove('open');
    body.style.overflow = 'auto'; // Restore scrolling
    setTimeout(() => {
        if (sideMenu.classList.contains('close')) {
            sideMenu.style.display = 'none';
        }
    }, 300);
}

// Toggle menu on button click
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
        if (sideMenu.classList.contains('open')) {
            closeMenu();
        } else {
            sideMenu.style.display = 'flex';
            setTimeout(openMenu, 10);
        }
    });
    
    // Add touch event for better mobile experience
    mobileNavToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (sideMenu.classList.contains('open')) {
            closeMenu();
        } else {
            sideMenu.style.display = 'flex';
            setTimeout(openMenu, 10);
        }
    });
}

// Close menu when clicking on menu links
const menuLinks = document.querySelectorAll('.side-menu-list a');
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (sideMenu.classList.contains('open') && 
        !sideMenu.contains(e.target) && 
        !mobileNavToggle.contains(e.target)) {
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

// Swiper Configuration
var swiper = new Swiper(".slide-content", {
    slidesPerView: 1, // Default to 1 for mobile-first
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
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('experiencia-stats')) {
                animateCounters();
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.quienes-somos, .doctores-section, .testimonios-section, .Nuestra_Experiencia, .experiencia-stats');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

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