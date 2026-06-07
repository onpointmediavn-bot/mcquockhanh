// ==========================================
// ==========================================
  // CINEMATIC GALLERY LIGHTBOX MODAL
// ==========================================
  const galleryModal = document.getElementById('galleryModal');
  const closeGalleryModalBtn = document.getElementById('closeGalleryModal');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');
  const lightboxMainImg = document.getElementById('lightbox-main-img');
  const lightboxMainVideo = document.getElementById('lightbox-main-video');
  const lightboxAlbumCategory = document.getElementById('lightbox-album-category');
  const lightboxAlbumTitle = document.getElementById('lightbox-album-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxFilmstrip = document.getElementById('lightbox-filmstrip');
  const lightboxSlideshowBtn = document.getElementById('lightbox-slideshow-btn');
  const lightboxPlayIcon = document.getElementById('lightbox-play-icon');
  const lightboxSlideshowText = document.getElementById('lightbox-slideshow-text');

  let activeAlbumIndex = -1;
  let activeImageIndex = -1;
  let slideshowInterval = null;
  let isSlideshowPlaying = false;

  let activeImagesList = [];

  window.openLightbox = function(albumIndex, startImageIndex = 0, customImagesList = null) {
    if (typeof IMAGES_DATA === 'undefined' || !galleryModal) return;
    
    activeAlbumIndex = albumIndex;
    activeImageIndex = startImageIndex;
    
    const album = IMAGES_DATA[activeAlbumIndex];
    if (!album) return;

    // Use custom list if provided (e.g. only images rendered on the web page)
    activeImagesList = customImagesList || album.images;
    if (!activeImagesList || activeImagesList.length === 0) return;
    
    // Show modal & stop page scroll
    galleryModal.classList.remove('hidden');
    lenis.stop();

    // Populate album metadata
    const categoryMap = {
      'corporate': 'GALA DOANH NGHIỆP',
      'cultural': 'LỄ HỘI VĂN HÓA',
      'sports': 'ĐẤU TRƯỜNG THỂ THAO',
      'weddings': 'TIỆC CƯỚI CAO CẤP',
      'others': 'HẬU TRƯỜNG & KHÁC'
    };
    lightboxAlbumCategory.textContent = categoryMap[album.category] || album.category;
    lightboxAlbumTitle.textContent = album.displayName;

    // Generate filmstrip thumbnails
    lightboxFilmstrip.innerHTML = '';
    activeImagesList.forEach((imgSrc, idx) => {
      const isVideo = imgSrc.endsWith('.mp4') || imgSrc.endsWith('.mov') || imgSrc.endsWith('.webm');
      let thumb;
      if (isVideo) {
        thumb = document.createElement('video');
        thumb.src = imgSrc;
        thumb.preload = 'metadata';
        thumb.muted = true;
        thumb.playsInline = true;
      } else {
        thumb = document.createElement('img');
        thumb.src = imgSrc;
      }
      thumb.alt = `Thumbnail ${idx + 1}`;
      thumb.className = 'lightbox-thumb';
      thumb.addEventListener('click', () => {
        stopSlideshow();
        showSlide(idx);
      });
      lightboxFilmstrip.appendChild(thumb);
    });

    showSlide(activeImageIndex);
  };

  function closeLightbox() {
    if (!galleryModal) return;
    stopSlideshow();
    if (lightboxMainVideo) {
      lightboxMainVideo.pause();
      lightboxMainVideo.src = "";
    }
    galleryModal.classList.add('hidden');
    lenis.start();
  }

  function showSlide(index) {
    const album = IMAGES_DATA[activeAlbumIndex];
    if (!album || index < 0 || index >= activeImagesList.length) return;

    activeImageIndex = index;
    const newSrc = activeImagesList[activeImageIndex];
    const isVideo = newSrc.endsWith('.mp4') || newSrc.endsWith('.mov') || newSrc.endsWith('.webm');

    if (isVideo) {
      // Hide Image, Show Video
      lightboxMainImg.classList.add('hidden');
      lightboxMainVideo.classList.remove('hidden');
      
      lightboxMainVideo.src = newSrc;
      lightboxMainVideo.play().catch(e => console.log("Video autoplay blocked or interrupted."));
      
      // Auto advance slideshow when video ends
      lightboxMainVideo.onended = () => {
        if (isSlideshowPlaying) {
          nextSlide();
        }
      };

      if (isSlideshowPlaying) {
        // Pause timer while video plays, onended will resume
        clearInterval(slideshowInterval);
        slideshowInterval = null;
      }
    } else {
      // Hide Video, Show Image
      lightboxMainVideo.pause();
      lightboxMainVideo.src = "";
      lightboxMainVideo.classList.add('hidden');
      lightboxMainImg.classList.remove('hidden');

      // Cinematic fade-out & fade-in transition
      gsap.killTweensOf(lightboxMainImg);
      gsap.fromTo(lightboxMainImg, 
        { opacity: 0.3, filter: 'blur(4px)', scale: 0.98 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          scale: 1, 
          duration: 0.4, 
          ease: 'power2.out',
          onStart: () => {
            lightboxMainImg.src = newSrc;
          }
        }
      );

      if (isSlideshowPlaying) {
        resetSlideshowInterval();
      }
    }

    // Update Counter
    lightboxCounter.textContent = `HÌNH ${activeImageIndex + 1} / ${activeImagesList.length}`;

    // Highlight filmstrip thumbnail
    const thumbnails = lightboxFilmstrip.children;
    Array.from(thumbnails).forEach((thumb, idx) => {
      if (idx === activeImageIndex) {
        thumb.classList.add('active');
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    const album = IMAGES_DATA[activeAlbumIndex];
    if (!album) return;
    let nextIdx = activeImageIndex + 1;
    if (nextIdx >= activeImagesList.length) nextIdx = 0;
    showSlide(nextIdx);
  }

  function prevSlide() {
    const album = IMAGES_DATA[activeAlbumIndex];
    if (!album) return;
    let prevIdx = activeImageIndex - 1;
    if (prevIdx < 0) prevIdx = activeImagesList.length - 1;
    showSlide(prevIdx);
  }

  function toggleSlideshow() {
    if (isSlideshowPlaying) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  }

  function resetSlideshowInterval() {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function startSlideshow() {
    if (isSlideshowPlaying) return;
    isSlideshowPlaying = true;
    lightboxSlideshowText.textContent = "TẠM DỪNG TRÌNH CHIẾU";
    lightboxPlayIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
    
    const album = IMAGES_DATA[activeAlbumIndex];
    if (album) {
      const currentSrc = activeImagesList[activeImageIndex];
      const isVideo = currentSrc.endsWith('.mp4') || currentSrc.endsWith('.mov') || currentSrc.endsWith('.webm');
      if (!isVideo) {
        resetSlideshowInterval();
      }
    }
  }

  function stopSlideshow() {
    if (!isSlideshowPlaying) return;
    isSlideshowPlaying = false;
    lightboxSlideshowText.textContent = "BẮT ĐẦU TRÌNH CHIẾU";
    lightboxPlayIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
    
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }

  if (closeGalleryModalBtn) closeGalleryModalBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => { stopSlideshow(); prevSlide(); });
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => { stopSlideshow(); nextSlide(); });
  if (lightboxSlideshowBtn) lightboxSlideshowBtn.addEventListener('click', toggleSlideshow);

  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (galleryModal && !galleryModal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        stopSlideshow();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        stopSlideshow();
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleSlideshow();
      }
    }
  });

  window.getSectionImages = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return [];
    const images = [];
    
    // Find all img tags
    section.querySelectorAll('img[src]').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !images.includes(src)) images.push(src);
    });
    
    // Find all background-images
    section.querySelectorAll('[style*="background-image"]').forEach(el => {
      if (el.classList.contains('poster-bg')) return;
      const style = el.getAttribute('style');
      const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (match && match[1]) {
        const src = match[1];
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    });
    
    return images;
  };
