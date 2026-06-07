// ==========================================
// ==========================================
  // 3. AMBIENT AUDIO ENVIRONMENT (CINEMATIC)
// ==========================================
  const musicToggle = document.getElementById('musicToggle');
  const ambientHum = document.getElementById('ambientHum');
  const visualizerBars = document.getElementById('visualizer-bars').children;
  let isPlaying = false;

  function toggleAmbient() {
    if (isPlaying) {
      ambientHum.pause();
      // Stop visualizer animation
      Array.from(visualizerBars).forEach(bar => {
        bar.style.animationPlayState = 'paused';
      });
      isPlaying = false;
    } else {
      // Play low volume ambient theater hum
      ambientHum.volume = 0.15;
      ambientHum.play().catch(e => console.log('Audio playback prevented by user interaction policy.'));
      
      Array.from(visualizerBars).forEach(bar => {
        bar.style.animationPlayState = 'running';
      });
      isPlaying = true;
    }
  }

  musicToggle.addEventListener('click', toggleAmbient);
  // Auto pause visualizer animations on start
  Array.from(visualizerBars).forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });
