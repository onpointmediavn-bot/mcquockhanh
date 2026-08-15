document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. LENIS SMOOTH SCROLL INITIALIZATION
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ==========================================
  // 2. CUSTOM CURSOR TRACKING
  // ==========================================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');

  document.addEventListener('mousemove', (e) => {
    // Offset cursor coordinates
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  // Attach hover state triggers
  function refreshCursorHovers() {
    const hoverables = document.querySelectorAll('a, button, .draggable-sticker, .grab-magnet-card, .mastercard-node, #terminal-clickbox, input, textarea, [role="button"]');
    hoverables.forEach(item => {
      item.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      item.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }
  refreshCursorHovers();

  // ==========================================
  // 3. GENERIC DRAGGABLE STICKER ENGINE
  // ==========================================
  const draggables = document.querySelectorAll('.draggable-sticker');
  draggables.forEach(sticker => {
    let isDragging = false;
    let startX, startY;

    sticker.addEventListener('mousedown', dragStart);
    sticker.addEventListener('touchstart', dragStart, { passive: true });

    function dragStart(e) {
      // Ignore text inputs
      if (e.target.tagName.toLowerCase() === 'input' || 
          e.target.tagName.toLowerCase() === 'textarea' || 
          e.target.tagName.toLowerCase() === 'button') {
        return;
      }
      isDragging = true;
      sticker.style.zIndex = 999;

      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

      startX = clientX - sticker.offsetLeft;
      startY = clientY - sticker.offsetTop;

      document.addEventListener('mousemove', dragMove);
      document.addEventListener('touchmove', dragMove, { passive: false });
      document.addEventListener('mouseup', dragEnd);
      document.addEventListener('touchend', dragEnd);
    }

    function dragMove(e) {
      if (!isDragging) return;
      if (e.type === 'touchmove') e.preventDefault(); // Stop window scroll

      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

      sticker.style.left = (clientX - startX) + 'px';
      sticker.style.top = (clientY - startY) + 'px';
    }

    function dragEnd() {
      isDragging = false;
      sticker.style.zIndex = '';
      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('touchmove', dragMove);
      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('touchend', dragEnd);
    }
  });

  // ==========================================
  // 4. BILINGUAL MODE LOGIC
  // ==========================================
  let currentLang = 'EN';
  const langBtn = document.getElementById('lang-btn');

  const translations = {
    EN: {
      bioBilingual: "ENGLISH & VIETNAMESE (100% FLOATING FLUENCY)",
      bioDesc: "MC Quốc Khánh isn't just an MC. He's a digital experience conductor. By fusing raw street culture aesthetic with high-level corporate event flow, he converts standard stages into interactive high-fidelity moments. Drag the status cards below to customize his execution matrix.",
      langBtn: "LANG: EN",
      energyText: "Energy output normal. Speed controls normal. Ready for event activation."
    },
    VIE: {
      bioBilingual: "TIẾNG ANH & TIẾNG VIỆT (TRÔI CHẢY 100% TRÊN MỌI SÂN KHẤU)",
      bioDesc: "MC Quốc Khánh không chỉ dẫn chương trình. Anh là người điều phối trải nghiệm kỹ thuật số. Kết hợp thẩm mỹ đường phố thô ráp với quy trình sự kiện doanh nghiệp đỉnh cao, anh biến các sân khấu truyền thống thành khoảnh khắc tương tác cao độ. Kéo các thẻ bên dưới để tùy chỉnh cấu hình.",
      langBtn: "NGÔN NGỮ: VI",
      energyText: "Mức năng lượng ổn định. Tốc độ quay bình thường. Sẵn sàng khởi chạy sự kiện."
    }
  };

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'EN' ? 'VIE' : 'EN';
    langBtn.textContent = translations[currentLang].langBtn;
    document.getElementById('bio-bilingual').textContent = translations[currentLang].bioBilingual;
    document.getElementById('bio-description').textContent = translations[currentLang].bioDesc;
    document.getElementById('energy-logger-text').textContent = translations[currentLang].energyText;
  });

  // ==========================================
  // 5. ENERGY LEVEL CONTROLLER
  // ==========================================
  const energySlider = document.getElementById('energy-slider');
  const energyValue = document.getElementById('energy-value');
  const bodyElement = document.body;

  energySlider.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    energyValue.textContent = value.toFixed(1) + 'X';

    // Update CSS Custom properties
    document.documentElement.style.setProperty('--energy-multiplier', value);

    // Apply vibrate shakiness to layout depending on energy rating
    bodyElement.classList.remove('vibrate-level-1', 'vibrate-level-2', 'vibrate-level-3');
    if (value === 2) {
      bodyElement.classList.add('vibrate-level-1');
      document.getElementById('energy-logger-text').textContent = "WARNING: HIGH VOLTAGE. Digital elements vibrating.";
    } else if (value === 3) {
      bodyElement.classList.add('vibrate-level-3');
      document.getElementById('energy-logger-text').textContent = "CRITICAL: MAXIMUM HYPER-ENERGY DETECTED. Stage elements melting!";
    } else {
      document.getElementById('energy-logger-text').textContent = translations[currentLang].energyText;
    }
  });

  // ==========================================
  // 6. SHOWREEL INTERACTIVE PLAYER
  // ==========================================
  const showreelPlayBtn = document.getElementById('showreel-play-btn');
  const showreelGlitchBtn = document.getElementById('showreel-glitch-btn');
  const showreelProgress = document.getElementById('showreel-progress');
  const showreelTime = document.getElementById('showreel-time');
  const showreelGlitchOverlay = document.getElementById('showreel-glitch-overlay');
  const mockTime = document.getElementById('mock-time');

  let isPlaying = false;
  let progressInterval;
  let playPercent = 0;

  // Track mock time code
  setInterval(() => {
    const now = new Date();
    mockTime.textContent = now.toTimeString().split(' ')[0];
  }, 1000);

  showreelPlayBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      showreelPlayBtn.textContent = 'PAUSE';
      showreelPlayBtn.style.backgroundColor = '#FF007F';
      showreelPlayBtn.style.color = '#fff';
      
      progressInterval = setInterval(() => {
        if (playPercent >= 100) {
          clearInterval(progressInterval);
          isPlaying = false;
          showreelPlayBtn.textContent = 'PLAY';
          showreelPlayBtn.style.backgroundColor = '#ADFF2F';
          showreelPlayBtn.style.color = '#000';
          playPercent = 0;
          showreelProgress.style.width = '0%';
          showreelTime.textContent = '0:00 / 1:45';
        } else {
          playPercent += 1;
          showreelProgress.style.width = playPercent + '%';
          // compute minutes/seconds
          const curSec = Math.floor((playPercent / 100) * 105);
          const min = Math.floor(curSec / 60);
          const sec = curSec % 60;
          showreelTime.textContent = `${min}:${sec < 10 ? '0' : ''}${sec} / 1:45`;
        }
      }, 300);
    } else {
      showreelPlayBtn.textContent = 'PLAY';
      showreelPlayBtn.style.backgroundColor = '#ADFF2F';
      showreelPlayBtn.style.color = '#000';
      clearInterval(progressInterval);
    }
  });

  showreelGlitchBtn.addEventListener('click', () => {
    showreelGlitchOverlay.classList.toggle('hidden');
    if (!showreelGlitchOverlay.classList.contains('hidden')) {
      showreelGlitchBtn.style.backgroundColor = '#00F5D4';
      showreelGlitchBtn.style.color = '#000';
    } else {
      showreelGlitchBtn.style.backgroundColor = '#FF007F';
      showreelGlitchBtn.style.color = '#fff';
    }
  });

  // ==========================================
  // SECTION 06: TIKTOK WINDOW CONTROLS
  // ==========================================
  const tiktokClose = document.getElementById('tiktok-close');
  const tiktokMinimize = document.getElementById('tiktok-minimize');
  const tiktokBrowserContent = document.getElementById('tiktok-browser-content');
  const tiktokAlertBtn = document.getElementById('tiktok-alert-btn');

  tiktokClose.addEventListener('click', () => {
    document.querySelector('#section-06-tiktok .neo-shadow-purple').style.display = 'none';
  });

  tiktokMinimize.addEventListener('click', () => {
    tiktokBrowserContent.classList.toggle('hidden');
  });

  tiktokAlertBtn.addEventListener('click', () => {
    alert("TIKTOK MODE: Adaptive screen overlay filter activated.");
  });

  // ==========================================
  // SECTION 07: SAMSUNG MARQUEE HOVER SPEED
  // ==========================================
  const marquees = ['samsung-m1', 'samsung-m2', 'samsung-m3'];
  marquees.forEach(mqId => {
    const el = document.getElementById(mqId);
    if (el) {
      const content = el.querySelector('.marquee-content');
      el.addEventListener('mouseenter', () => {
        content.style.animationDuration = '5s'; // speed up
      });
      el.addEventListener('mouseleave', () => {
        content.style.animationDuration = '15s'; // recover
      });
    }
  });

  // ==========================================
  // SECTION 08: FORBES BRUTALIST MAGNIFIER
  // ==========================================
  const forbesContainer = document.getElementById('forbes-container');
  const forbesPhotoCard = document.getElementById('forbes-photo-card');
  const forbesMagnifier = document.getElementById('forbes-magnifier');
  const forbesMagnifierImg = document.getElementById('forbes-magnifier-img');

  forbesPhotoCard.addEventListener('mouseenter', () => {
    forbesMagnifier.style.opacity = '1';
  });

  forbesPhotoCard.addEventListener('mouseleave', () => {
    forbesMagnifier.style.opacity = '0';
  });

  forbesPhotoCard.addEventListener('mousemove', (e) => {
    const bounds = forbesPhotoCard.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    // Set position of the magnifier circle
    forbesMagnifier.style.left = (x - 96) + 'px';
    forbesMagnifier.style.top = (y - 96) + 'px';

    // Move internal image in opposite direction to align coordinates
    // Photo inside magnifier is zoomed, calculate multiplier
    const imgX = -x * 2 + 96;
    const imgY = -y * 2 + 96;
    forbesMagnifierImg.style.left = imgX + 'px';
    forbesMagnifierImg.style.top = imgY + 'px';
  });

  // ==========================================
  // SECTION 09: GRAB MAGNETIC PUSH
  // ==========================================
  const grabPlayground = document.getElementById('grab-card-playground');
  const grabCards = document.querySelectorAll('.grab-magnet-card');

  grabPlayground.addEventListener('mousemove', (e) => {
    const bounds = grabPlayground.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    grabCards.forEach(card => {
      // Calculate card center
      const cardX = card.offsetLeft + card.offsetWidth / 2;
      const cardY = card.offsetTop + card.offsetHeight / 2;

      const diffX = mouseX - cardX;
      const diffY = mouseY - cardY;
      const distance = Math.sqrt(diffX * diffX + diffY * diffY);

      // If mouse is within 160px range, push card away
      if (distance < 160) {
        const force = (160 - distance) / 160;
        const pushX = -(diffX / distance) * force * 45;
        const pushY = -(diffY / distance) * force * 45;
        
        card.style.transform = `translate(${pushX}px, ${pushY}px) scale(1.05)`;
      } else {
        card.style.transform = 'translate(0px, 0px) scale(1)';
      }
    });
  });

  grabPlayground.addEventListener('mouseleave', () => {
    grabCards.forEach(card => {
      card.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });

  // ==========================================
  // SECTION 10: HEINEKEN SOUND PULSE CANVAS
  // ==========================================
  const hCanvas = document.getElementById('heineken-canvas');
  const hCtx = hCanvas.getContext('2d');
  const pulseBtn = document.getElementById('heineken-pulse-btn');

  // Resize canvas to frame bounding box
  function resizeHeineken() {
    hCanvas.width = hCanvas.parentElement.clientWidth;
    hCanvas.height = hCanvas.parentElement.clientHeight;
  }
  resizeHeineken();
  window.addEventListener('resize', resizeHeineken);

  let pulseRings = [];

  class PulseRing {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 10;
      this.opacity = 1;
      this.color = Math.random() > 0.5 ? '#00F5D4' : '#FF007F';
    }
    update() {
      this.radius += 3;
      this.opacity -= 0.02;
    }
    draw() {
      hCtx.beginPath();
      hCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      hCtx.strokeStyle = this.color;
      hCtx.lineWidth = 4;
      hCtx.globalAlpha = Math.max(0, this.opacity);
      hCtx.stroke();
    }
  }

  function animatePulse() {
    hCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    hCtx.fillRect(0, 0, hCanvas.width, hCanvas.height);

    pulseRings.forEach((ring, index) => {
      ring.update();
      ring.draw();
      if (ring.opacity <= 0) {
        pulseRings.splice(index, 1);
      }
    });

    requestAnimationFrame(animatePulse);
  }
  animatePulse();

  function triggerPulse(x, y) {
    pulseRings.push(new PulseRing(x, y));
  }

  pulseBtn.addEventListener('click', () => {
    triggerPulse(hCanvas.width / 2, hCanvas.height / 2);
  });

  hCanvas.addEventListener('mousedown', (e) => {
    const rect = hCanvas.getBoundingClientRect();
    triggerPulse(e.clientX - rect.left, e.clientY - rect.top);
  });

  // ==========================================
  // SECTION 11: HONDA SPLIT SCROLL DIRECTION
  // ==========================================
  const hondaSection = document.getElementById('section-11-honda');
  const hondaLeftScroller = document.getElementById('honda-left-scroller');
  const hondaRightScroller = document.getElementById('honda-right-scroller');

  // Trigger opposing slide offsets relative to page scroll position
  window.addEventListener('scroll', () => {
    const rect = hondaSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Check if section is visible in scroll viewport
    if (rect.top < viewportHeight && rect.bottom > 0) {
      const scrollPercent = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      
      // Left side scrolls down, Right side scrolls up
      const offsetLeft = (scrollPercent * 120) - 60;
      const offsetRight = -(scrollPercent * 120) + 60;

      hondaLeftScroller.style.transform = `translateY(${offsetLeft}px)`;
      hondaRightScroller.style.transform = `translateY(${offsetRight}px)`;
    }
  });

  // ==========================================
  // SECTION 12: MASTERCARD CONSTELATION
  // ==========================================
  const nodes = document.querySelectorAll('.mastercard-node');
  const line1 = document.getElementById('mastercard-line-1');
  const line2 = document.getElementById('mastercard-line-2');
  const nodeInfo = document.getElementById('mastercard-node-info');

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      // Connect line nodes visually
      const rect1 = nodes[0].getBoundingClientRect();
      const rect2 = nodes[1].getBoundingClientRect();
      const rect3 = nodes[2].getBoundingClientRect();
      const containerRect = document.getElementById('mastercard-canvas-box').getBoundingClientRect();

      line1.setAttribute('x1', rect1.left - containerRect.left + 16);
      line1.setAttribute('y1', rect1.top - containerRect.top + 16);
      line1.setAttribute('x2', rect2.left - containerRect.left + 16);
      line1.setAttribute('y2', rect2.top - containerRect.top + 16);

      line2.setAttribute('x1', rect2.left - containerRect.left + 16);
      line2.setAttribute('y1', rect2.top - containerRect.top + 16);
      line2.setAttribute('x2', rect3.left - containerRect.left + 16);
      line2.setAttribute('y2', rect3.top - containerRect.top + 16);

      const targetLabel = node.getAttribute('data-node');
      const targetVal = node.getAttribute('data-val');
      nodeInfo.innerHTML = `<strong>NODE:</strong> ${targetLabel}<br><strong>VALUE:</strong> ${targetVal}`;
    });
  });

  // ==========================================
  // SECTION 13: VESPA VINTAGE POLAROID DECK
  // ==========================================
  const polaroids = document.querySelectorAll('.vespa-polaroid');
  const tossBtn = document.getElementById('vespa-toss-btn');
  let topZIndex = 10;

  function tossTopPolaroid() {
    // find polaroid with highest z-index currently
    let highestCard = null;
    let highestZ = -999;
    
    polaroids.forEach(p => {
      const z = parseInt(p.style.zIndex);
      if (z > highestZ) {
        highestZ = z;
        highestCard = p;
      }
    });

    if (highestCard) {
      // Animate card drift sideways, then slide to bottom index
      gsap.to(highestCard, {
        x: 350,
        rotation: 30,
        duration: 0.4,
        onComplete: () => {
          topZIndex--;
          highestCard.style.zIndex = topZIndex - 5;
          gsap.to(highestCard, {
            x: 0,
            rotation: Math.random() * 20 - 10,
            duration: 0.4
          });
        }
      });
    }
  }

  tossBtn.addEventListener('click', tossTopPolaroid);
  polaroids.forEach(p => p.addEventListener('click', tossTopPolaroid));

  // ==========================================
  // SECTION 14: L'ORÉAL GRID RESIZER
  // ==========================================
  const gridSlider = document.getElementById('loreal-grid-slider');
  const lorealGridItems = document.querySelectorAll('#loreal-grid-items > div');

  gridSlider.addEventListener('input', (e) => {
    const h = e.target.value + 'px';
    lorealGridItems.forEach(item => {
      item.style.height = h;
    });
  });

  // ==========================================
  // SECTION 15: TECHCOMBANK SPEED GAUGE DETECTOR
  // ==========================================
  const tcMouseArea = document.getElementById('techcombank-mouse-area');
  const tcNeedle = document.getElementById('techcombank-needle');
  const tcSpeedText = document.getElementById('techcombank-speed-text');

  let mouseVelocity = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let lastTime = Date.now();

  tcMouseArea.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 10) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Compute raw velocity
      const velocity = (distance / dt) * 100;
      mouseVelocity = Math.min(220, velocity); // clamp to max scale index

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      lastTime = now;
    }
  });

  // Smoothly decay velocity needle back to zero
  setInterval(() => {
    if (mouseVelocity > 0) {
      mouseVelocity -= 5;
      if (mouseVelocity < 0) mouseVelocity = 0;

      // Map velocity value to speedometer rotation angles (-90deg to 90deg)
      const angle = -90 + (mouseVelocity / 220) * 180;
      tcNeedle.style.transform = `rotate(${angle}deg)`;

      // Map velocity value to display text speed
      const speedKm = (mouseVelocity / 5).toFixed(1);
      tcSpeedText.textContent = `${speedKm} km/h`;
    }
  }, 30);

  // ==========================================
  // SECTION 17: VNG CAMPUS SLIDER CONTROLLER
  // ==========================================
  const vngSlideImg = document.getElementById('vng-slide-img');
  const vngSlideLabel = document.getElementById('vng-slide-label');
  const vngBtnA = document.getElementById('vng-btn-a');
  const vngBtnB = document.getElementById('vng-btn-b');

  const vngSlides = [
    { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=500', label: 'CAMPUS_OFFICE_01' },
    { url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=500', label: 'DEV_GAMES_CENTER_02' },
    { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500', label: 'LAUNCH_KEYNOTE_03' }
  ];
  let vngIndex = 0;

  function switchVngSlide(dir) {
    if (dir === 'next') {
      vngIndex = (vngIndex + 1) % vngSlides.length;
    } else {
      vngIndex = (vngIndex - 1 + vngSlides.length) % vngSlides.length;
    }
    vngSlideImg.style.backgroundImage = `url('${vngSlides[vngIndex].url}')`;
    vngSlideLabel.textContent = vngSlides[vngIndex].label;
  }

  vngBtnA.addEventListener('click', () => switchVngSlide('prev'));
  vngBtnB.addEventListener('click', () => switchVngSlide('next'));

  // ==========================================
  // SECTION 18: BMW DISPLACEMENT LIQUID METAL
  // ==========================================
  const bmwTurbulence = document.querySelector('#liquid-filter feTurbulence');
  let baseFreq = 0.04;
  let distVal = 0;

  // Rippling frequency on requestAnimationFrame
  function rippleBmw() {
    distVal += 0.05;
    // Animate turbine noise offsets to simulate fluid reflection movement
    const xFreq = baseFreq + Math.sin(distVal) * 0.01;
    const yFreq = baseFreq + Math.cos(distVal) * 0.01;
    bmwTurbulence.setAttribute('baseFrequency', `${xFreq} ${yFreq}`);
    requestAnimationFrame(rippleBmw);
  }
  rippleBmw();

  // ==========================================
  // SECTION 19: YOUTUBE SPOTLIGHT CANVAS
  // ==========================================
  const ySpotlight = document.getElementById('youtube-spotlight');
  const yCanvas = document.getElementById('youtube-canvas');
  const yCtx = yCanvas.getContext('2d');

  const spotlightImg = new Image();
  spotlightImg.src = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800';

  function resizeYoutubeCanvas() {
    yCanvas.width = ySpotlight.clientWidth;
    yCanvas.height = ySpotlight.clientHeight;
    drawSpotlightBackground();
  }
  
  spotlightImg.onload = () => {
    resizeYoutubeCanvas();
  };
  window.addEventListener('resize', resizeYoutubeCanvas);

  let spotX = -1000;
  let spotY = -1000;
  let targetSpotRadius = 120;

  function drawSpotlightBackground() {
    // Clear canvas
    yCtx.fillStyle = '#000';
    yCtx.fillRect(0, 0, yCanvas.width, yCanvas.height);

    // Save context state
    yCtx.save();
    
    // Draw unmasked clipping circle path
    yCtx.beginPath();
    yCtx.arc(spotX, spotY, targetSpotRadius, 0, Math.PI * 2);
    yCtx.clip();

    // Draw the high saturated image inside clip area
    // Aspect ratio fit image
    yCtx.drawImage(spotlightImg, 0, 0, yCanvas.width, yCanvas.height);

    // Restore to draw text overlays
    yCtx.restore();
  }

  ySpotlight.addEventListener('mousemove', (e) => {
    const rect = ySpotlight.getBoundingClientRect();
    spotX = e.clientX - rect.left;
    spotY = e.clientY - rect.top;
    drawSpotlightBackground();
  });

  ySpotlight.addEventListener('mouseleave', () => {
    spotX = -1000;
    spotY = -1000;
    drawSpotlightBackground();
  });

  // ==========================================
  // SECTION 20: STARTUP TERMINAL INTERACTIVE TYPING
  // ==========================================
  const terminalClickbox = document.getElementById('terminal-clickbox');
  const linesContainer = document.getElementById('terminal-lines-container');
  const cursorIndicator = document.getElementById('terminal-cursor-indicator');

  const logLines = [
    "[SERVER STATUS] RUNNING PROTOCOL: MC_KHANH_STAGE_DEBATE",
    "[LOADOUT] QUERYING DEBATES ON BLOCKCHAIN AND GEN_AI MODELS...",
    "[METRIC] HOSTED 4 INNOVATION SUMMITS FOR VIETNAM TECH SECTOR",
    "[STAGES] 50+ TECH STARTUP PRESENTATION PANELS ACTIVATED",
    "[LOGS] SPEECH SYNTHESIS ENGINE LOADED BILINGUAL_ENG_VIE",
    "[STAT] CONCLUDED 34 INVESTMENT INVESTMENT DISCLOSURES",
    "[DATA] CROWD DENSITY RATING: 200% CAPACITY CONSOLIDATED",
    "[SIGNAL] HCMC CREATIVE STARTUP WEEK LOG COMPLETE // ENGINE ON standby."
  ];
  let currentLogIdx = 0;

  terminalClickbox.addEventListener('keydown', (e) => {
    // Verify any key typed
    e.preventDefault();
    if (currentLogIdx < logLines.length) {
      const newLine = document.createElement('p');
      newLine.className = 'text-acid';
      newLine.textContent = `> ${logLines[currentLogIdx]}`;
      linesContainer.appendChild(newLine);
      currentLogIdx++;
      
      // Auto scroll to bottom
      linesContainer.scrollTop = linesContainer.scrollHeight;
    } else {
      const resetLine = document.createElement('p');
      resetLine.className = 'text-yellow';
      resetLine.textContent = `> [REBOOT] Log buffer exceeded. Restarting terminal logs.`;
      linesContainer.appendChild(resetLine);
      currentLogIdx = 0;
      linesContainer.scrollTop = linesContainer.scrollHeight;
    }
  });

  // Blinking terminal cursor
  setInterval(() => {
    cursorIndicator.style.opacity = cursorIndicator.style.opacity === '0' ? '1' : '0';
  }, 500);

  // Initialize UI events layout refreshed
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 500);

});
