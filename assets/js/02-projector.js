// ==========================================
// ==========================================
  // 2. PROJECTOR LIGHT TRACKER
// ==========================================
  const projectorGlow = document.querySelector('.projector-glow');
  window.addEventListener('mousemove', (e) => {
    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;
    
    // Smooth pointer tracking using GSAP
    gsap.to(projectorGlow, {
      duration: 0.8,
      '--mouse-x': `${xPercent}%`,
      '--mouse-y': `${yPercent}%`,
      ease: 'power2.out'
    });
  });
