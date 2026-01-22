// Trade with Shafy - Interactive Features

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animate Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all benefit cards and testimonials
    document.querySelectorAll('.group, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Stats Counter Animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(start));
            }
        }, 16);
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num + '+';
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElements = entry.target.querySelectorAll('.text-4xl');
                if (statElements.length >= 3) {
                    setTimeout(() => animateCounter(statElements[0], 160000), 200);
                    setTimeout(() => animateCounter(statElements[1], 150000), 400);
                    setTimeout(() => animateCounter(statElements[2], 5000000), 600);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('#hero .grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Create Particle Effect
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    // Add particles on mouse move (throttled)
    let lastParticleTime = 0;
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastParticleTime > 200) {
            createParticle(e.clientX, e.clientY);
            lastParticleTime = now;
        }
    });

    // Duplicate testimonial content for seamless loop
    function duplicateMarqueeContent() {
        const marqueeColumns = document.querySelectorAll('.marquee-content, .marquee-content-reverse');
        marqueeColumns.forEach(column => {
            const content = column.innerHTML;
            // Duplicate content 2 times for smoother animation
            column.innerHTML += content;
            column.innerHTML += content;
        });
    }

    // Run after DOM is fully loaded
    setTimeout(duplicateMarqueeContent, 100);

    // Add loading indicator for iframe
    const iframe = document.querySelector('iframe');
    if (iframe) {
        const iframeContainer = iframe.parentElement;
        const loader = document.createElement('div');
        loader.className = 'loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
        iframeContainer.appendChild(loader);

        iframe.addEventListener('load', function() {
            loader.remove();
        });
    }

    // Dynamic gradient animation on scroll
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelectorAll('.absolute');
            parallax.forEach((el, index) => {
                const speed = 0.5 + (index * 0.2);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Add hover sound effect simulation (visual feedback)
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Prevent context menu on images (optional - for professional look)
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Log page load time (for performance monitoring)
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });

    // Add click tracking for CTA buttons (for analytics)
    document.querySelectorAll('a[href*="t.me"]').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Telegram CTA clicked:', this.href);
            // Here you can add Google Analytics or other tracking
        });
    });

    // Initialize everything
    console.log('Trade with Shafy - Portfolio loaded successfully! 🚀');
});

// Service Worker Registration (for PWA - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable PWA features
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('ServiceWorker registered:', registration);
        // }).catch(function(err) {
        //     console.log('ServiceWorker registration failed:', err);
        // });
    });
}