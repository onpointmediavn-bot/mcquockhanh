// DJ PADDY - INTERACTIONS

document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to sections and cards
    const animatedElements = document.querySelectorAll('.trust-content, .highlight-item, .about-image, .about-content, .timeline-step, .service-card, .portfolio-item, .why-content, .contact-wrapper');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header transparency on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 15, 15, 0.95)';
            header.style.padding = '20px 0';
        } else {
            header.style.background = 'linear-gradient(to bottom, rgba(15,15,15,0.8), transparent)';
            header.style.padding = '30px 0';
        }
    });

    // Form submission handling (prevent default for demo)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.textContent = 'Thank You';
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#E6C9A8';
                btn.style.borderColor = '#E6C9A8';
                form.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '#E6C9A8';
                    btn.style.color = '#0F0F0F';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // Parallax effect on hero image
    window.addEventListener('scroll', () => {
        const heroImage = document.querySelector('.hero-video');
        if (heroImage) {
            const scroll = window.scrollY;
            heroImage.style.transform = `scale(${1 + scroll * 0.0005}) translateY(${scroll * 0.2}px)`;
        }
    });
});
