// ==========================================
// CINEMATIC LAZY LOADING FOR BACKGROUND IMAGES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const lazyElements = [];
  
  // Find all elements with inline background-images
  // Exclude the hero background so the landing screen is instantly visual
  const bgElements = document.querySelectorAll('[style*="background-image"]');
  
  bgElements.forEach(el => {
    // Skip hero poster backgrounds
    if (el.closest('#hero-poster')) return;
    
    // Skip poster-bg elements on the chinhluan page if they are hidden anyway
    if (document.body.classList.contains('chinhluan-page') && el.classList.contains('poster-bg')) {
      el.style.backgroundImage = 'none';
      return;
    }
    
    const style = el.getAttribute('style');
    const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
    
    if (match && match[1]) {
      const imgUrl = match[1];
      el.dataset.lazyBg = `url('${imgUrl}')`;
      el.style.backgroundImage = 'none';
      lazyElements.push(el);
    }
  });
  
  // Intersection Observer to restore background images when close to viewport
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.lazyBg) {
            el.style.backgroundImage = el.dataset.lazyBg;
          }
          observer.unobserve(el);
        }
      });
    }, {
      rootMargin: '400px 0px 400px 0px' // Load images 400px before they scroll into view
    });
    
    lazyElements.forEach(el => imageObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    lazyElements.forEach(el => {
      if (el.dataset.lazyBg) el.style.backgroundImage = el.dataset.lazyBg;
    });
  }
});
