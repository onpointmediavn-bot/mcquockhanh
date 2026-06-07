// ==========================================
// ==========================================
  // 4. SHOWREEL VIDEO MODAL
// ==========================================
  const playBtn = document.getElementById('playShowreelBtn');
  const modal = document.getElementById('videoModal');
  const closeModalBtn = document.getElementById('closeModal');
  const iframe = document.getElementById('videoIframe');
  
  // Premium YouTube event lighting demo video
  const showreelUrl = "https://www.youtube.com/embed/coYw-Nirh_U?autoplay=1&mute=0";

  if (playBtn && modal) {
    playBtn.addEventListener('click', () => {
      iframe.src = showreelUrl;
      modal.classList.remove('hidden');
      lenis.stop(); // Disable page scrolling
    });

    closeModalBtn.addEventListener('click', () => {
      iframe.src = "";
      modal.classList.add('hidden');
      lenis.start(); // Enable page scrolling
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        iframe.src = "";
        modal.classList.add('hidden');
        lenis.start();
      }
    });
  }
