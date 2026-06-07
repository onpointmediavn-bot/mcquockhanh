// ==========================================
// ==========================================
  // 5. GSAP SCROLL-TRIGGER PARALLAX & ENTRIES
// ==========================================
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll('section');

  sections.forEach((section) => {
    const bg = section.querySelector('.poster-bg');
    const content = section.querySelector('.poster-content');
    const title = section.querySelector('h1, h2, h3');
    
    // Parallax background effect (works perfectly across all browsers)
    if (bg) {
      gsap.fromTo(bg, 
        { yPercent: -15, scale: 1.15 }, 
        { 
          yPercent: 15, 
          scale: 1.02,
          ease: 'none', 
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // Content fade and slight scroll reveal
    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Dramatic cinematic title text-spacing reveal
    if (title && !title.closest('#hero-poster')) {
      gsap.fromTo(title,
        { letterSpacing: '0.05em', filter: 'blur(4px)', opacity: 0.6 },
        {
          letterSpacing: '0.15em',
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  });

  // Hero Section Specific Cinematic Opening Timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  
  heroTl.fromTo('#hero-poster .poster-bg', 
    { scale: 1.3, opacity: 0 }, 
    { scale: 1.15, opacity: 0.35, duration: 2.5 }
  );

  heroTl.fromTo('#hero-poster .text-cinematic-title',
    { opacity: 0, y: 100, filter: 'blur(10px)', letterSpacing: '-0.05em' },
    { opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0em', duration: 1.8 },
    '-=2.0'
  );

  heroTl.fromTo('#hero-poster .text-cinematic-subtitle',
    { opacity: 0, scale: 0.8, letterSpacing: '0.1em' },
    { opacity: 1, scale: 1, letterSpacing: '0.4em', duration: 1.2 },
    '-=1.0'
  );

  heroTl.fromTo('#hero-poster p, #hero-poster italic, #hero-poster .animate-bounce',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1.0, stagger: 0.2 },
    '-=0.8'
  );
