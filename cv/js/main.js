/**
 * Digital CV / Professional Profile — Nguyễn Quốc Khánh
 * Interactive Controller (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements Cache
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  
  // Modals
  const imageLightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDetails = document.getElementById('lightboxDetails');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');

  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoModalDetails = document.getElementById('videoModalDetails');
  const btnCloseVideo = document.getElementById('btnCloseVideo');

  // Filter Buttons
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-bar button[data-filter]');
  const galleryCards = document.querySelectorAll('.gallery-grid .gallery-card');

  const videoFilterBtns = document.querySelectorAll('.gallery-filter-bar button[data-vfilter]');
  const videoCards = document.querySelectorAll('.video-grid .video-card');

  // --------------------------------------------------------------------------
  // 2. STICKY HEADER & SCROLLSPY
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (scrollPos > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Scrollspy for active nav link
    const headerOffset = 120;
    sections.forEach(section => {
      const top = section.offsetTop - headerOffset;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------------
  if (mobileToggle && primaryNav) {
    mobileToggle.addEventListener('click', () => {
      primaryNav.classList.toggle('is-open');
      const isOpen = primaryNav.classList.contains('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. GALLERY FILTERING (IMAGE PORTFOLIO)
  // --------------------------------------------------------------------------
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. VIDEO ARCHIVE FILTERING
  // --------------------------------------------------------------------------
  videoFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      videoFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-vfilter');

      videoCards.forEach(card => {
        const cat = card.getAttribute('data-vcat');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. IMAGE LIGHTBOX MODAL FUNCTIONS
  // --------------------------------------------------------------------------
  window.openLightbox = (src, title, details) => {
    if (!imageLightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = title || 'Ảnh chi tiết';
    lightboxTitle.textContent = title || '';
    lightboxDetails.textContent = details || '';

    imageLightbox.classList.add('active');
    imageLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!imageLightbox) return;
    imageLightbox.classList.remove('active');
    imageLightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', closeLightbox);
  }

  if (imageLightbox) {
    imageLightbox.addEventListener('click', (e) => {
      if (e.target === imageLightbox) {
        closeLightbox();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. VIDEO MODAL FUNCTIONS
  // --------------------------------------------------------------------------
  window.openVideoModal = (title, details, embedUrl) => {
    if (!videoModal) return;
    videoModalTitle.textContent = title || 'Xem Video Tư Liệu';
    videoModalDetails.textContent = details || '';
    videoIframe.src = embedUrl;

    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    // Clear iframe src to stop playback completely
    videoIframe.src = '';
    document.body.style.overflow = '';
  };

  if (btnCloseVideo) {
    btnCloseVideo.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // Global ESC Key Listener for both modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeVideoModal();
    }
  });

  // --------------------------------------------------------------------------
  // 8. SCROLL REVEAL OBSERVER
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersect2D || entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
