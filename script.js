h// ===================================
// Ultra Modernist Resume Site - JavaScript
// ===================================

// ===================================
// Smooth Scroll
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip empty or just # links
            if (!href || href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Scroll-Triggered Animations
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-scroll attribute
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => observer.observe(el));
    
    // Also observe project cards and link cards
    const cards = document.querySelectorAll('.project-card, .link-card');
    cards.forEach(el => observer.observe(el));
}

// ===================================
// Parallax Effect
// ===================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial update
    updateParallax();
}

// ===================================
// Hero Subtitle Fade Out on Scroll
// ===================================

function initHeroSubtitleFade() {
    const subtitle = document.querySelector('.hero-subtitle');
    
    if (!subtitle) return;
    
    let ticking = false;
    
    function updateSubtitleFade() {
        const scrolled = window.pageYOffset;
        const fadeDistance = 300; // Distance in pixels to complete fade
        
        // Calculate opacity: 1 at top, 0 after fadeDistance pixels
        const opacity = Math.max(0, 1 - (scrolled / fadeDistance));
        subtitle.style.opacity = opacity;
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateSubtitleFade);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial update
    updateSubtitleFade();
}

// ===================================
// Navigation Background on Scroll
// ===================================

function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// Project Card Tilt Effect
// ===================================

function initProjectCardTilt() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ===================================
// Text Reveal Animation
// ===================================

function initTextReveal() {
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        // Split text into words
        const words = text.split(' ');
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            span.textContent = word;
            
            title.appendChild(span);
            
            // Add space after each word except the last
            if (index < words.length - 1) {
                title.appendChild(document.createTextNode(' '));
            }
        });
    });
    
    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    titles.forEach(title => observer.observe(title));
}

// ===================================
// Magnetic Button Effect
// ===================================

function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.nav-link, .social-link');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ===================================
// Dynamic Stats Counter
// ===================================

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        
        // Skip if not a number
        if (isNaN(parseInt(target))) return;
        
        const targetNum = parseInt(target);
        const duration = 2000;
        const steps = 60;
        const increment = targetNum / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                element.textContent = target; // Use original text (includes +)
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
            }
        }, duration / steps);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ===================================
// Random Noise Background Effect
// ===================================

function initNoiseEffect() {
    // Create a subtle noise overlay
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.03';
    canvas.style.zIndex = '9999';
    canvas.style.mixBlendMode = 'multiply';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    function drawNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 255;
            data[i] = noise;     // Red
            data[i + 1] = noise; // Green
            data[i + 2] = noise; // Blue
            data[i + 3] = 255;   // Alpha
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    // Redraw occasionally for animated effect
    setInterval(drawNoise, 100);
    drawNoise();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawNoise();
    });
}

// ===================================
// Link Card Hover Stagger Effect
// ===================================

function initLinkCardEffects() {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ===================================
// Performance Optimization
// ===================================

function initPerformanceOptimizations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01s');
        document.documentElement.style.setProperty('--transition-base', '0.01s');
        document.documentElement.style.setProperty('--transition-slow', '0.01s');
        
        // Disable parallax
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(el => {
            el.style.transform = 'none';
        });
    }
}

// ===================================
// Easter Egg: Konami Code
// ===================================

function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s ease-in-out infinite';
                
                // Add rainbow animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
                
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 10000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// ===================================
// Initialize Everything
// ===================================

function init() {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    console.log('🚀 Initializing ultra modernist resume site...');
    
    // Initialize all features
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
    initHeroSubtitleFade();
    initNavScroll();
    initProjectCardTilt();
    initTextReveal();
    initMagneticEffect();
    initStatsCounter();
    initNoiseEffect();
    initLinkCardEffects();
    initPerformanceOptimizations();
    initEasterEgg();
    
    console.log('✨ All systems initialized!');
}

// Start the app
init();

// ===================================
// Exports for module usage (optional)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        initScrollAnimations,
        initParallax
    };
}
