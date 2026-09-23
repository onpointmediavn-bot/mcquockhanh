// Voice Talent Quốc Khánh - Minimalist Audio & Video Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Video Projects from Google Drive
  const videoProjects = [
    {
      id: 'v-honda',
      title: 'TVC Honda',
      driveId: '1uLyC_S-ujnwA_JNywtdPmibNpB1CFuGh'
    },
    {
      id: 'v-lexus',
      title: 'Teaser Lexus',
      driveId: '1EPqgfaSoHwmdwBP2rRoRAxZJCYORS3mI'
    },
    {
      id: 'v-delasea',
      title: 'TVC Delasea',
      driveId: '1NMBs9gY7XJ2csUOjS2UPrT4IxMeqtyj7'
    },
    {
      id: 'v-sundovit',
      title: 'Trailer Sundovit',
      driveId: '1rftauGFFUiZAWZR0OYpGZzT4EL8Q2b_U'
    },
    {
      id: 'v-vcb',
      title: 'Voice Vietcombank',
      driveId: '1RVJWsyjJn63KGD9JvE67_h5-dsQGLbYe'
    }
  ];

  // 2. Audio Tracks
  const audioTracks = [
    { id: 'a-honda', title: 'TVC Honda', category: 'tvc', duration: '0:35', durationSec: 35 },
    { id: 'a-lexus', title: 'Teaser Lexus', category: 'trailer', duration: '0:45', durationSec: 45 },
    { id: 'a-delasea', title: 'TVC Delasea', category: 'tvc', duration: '0:40', durationSec: 40 },
    { id: 'a-sundovit', title: 'Trailer Sundovit', category: 'trailer', duration: '0:50', durationSec: 50 },
    { id: 'a-vcb', title: 'Thuyết minh Vietcombank', category: 'documentary', duration: '1:10', durationSec: 70 },
    { id: 'a-elearning', title: 'E-learning Doanh nghiệp', category: 'elearning', duration: '0:55', durationSec: 55 },
    { id: 'a-podcast', title: 'Podcast Tâm tình', category: 'podcast', duration: '1:02', durationSec: 62 },
    { id: 'a-ivr', title: 'Tổng đài IVR', category: 'ivr', duration: '0:28', durationSec: 28 }
  ];

  // 3. Render Minimalist Video Cards
  const videoGrid = document.getElementById('video-grid-min');
  if (videoGrid) {
    videoGrid.innerHTML = '';
    videoProjects.forEach(item => {
      const card = document.createElement('div');
      card.className = 'video-card-min';
      card.innerHTML = `
        <div class="video-thumb-box" onclick="openVideoModal('${item.driveId}', '${item.title}')">
          <iframe src="https://drive.google.com/file/d/${item.driveId}/preview" loading="lazy" tabindex="-1"></iframe>
          <div class="video-play-overlay">
            <div class="play-circle-icon"><i class="fas fa-play"></i></div>
          </div>
        </div>
        <div class="video-info-row">
          <span class="video-title-text">${item.title}</span>
          <button class="video-view-btn" onclick="openVideoModal('${item.driveId}', '${item.title}')">
            Xem HD <i class="fas fa-arrow-up-right-from-square"></i>
          </button>
        </div>
      `;
      videoGrid.appendChild(card);
    });
  }

  // 4. Video Modal
  const videoModal = document.getElementById('video-modal');
  const videoModalIframe = document.getElementById('video-modal-iframe');
  const videoModalTitle = document.getElementById('video-modal-title');
  const videoModalClose = document.getElementById('video-modal-close');

  window.openVideoModal = function(driveId, title) {
    if (!videoModal || !videoModalIframe) return;
    videoModalTitle.textContent = title;
    videoModalIframe.src = `https://drive.google.com/file/d/${driveId}/preview`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeVideoModal = function() {
    if (!videoModal || !videoModalIframe) return;
    videoModal.classList.remove('active');
    videoModalIframe.src = '';
    document.body.style.overflow = '';
  };

  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });

  // 5. Audio Synthesizer & Playback
  let audioCtx = null;
  let currentPlayingTrack = null;
  let isPlaying = false;
  let currentPlaybackTime = 0;
  let playbackTimer = null;
  let synthOscillator = null;
  let synthGain = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }

  function playSynthAudio(track) {
    initAudioContext();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    stopSynthAudio();

    try {
      synthOscillator = audioCtx.createOscillator();
      synthGain = audioCtx.createGain();
      const baseFreq = track.category === 'tvc' ? 220 : 190;
      synthOscillator.type = 'sine';
      synthOscillator.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
      synthGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      synthGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
      synthGain.gain.exponentialRampToValueAtTime(0.02, audioCtx.currentTime + 0.9);
      synthOscillator.connect(synthGain);
      synthGain.connect(audioCtx.destination);
      synthOscillator.start();
    } catch (e) {}
  }

  function stopSynthAudio() {
    if (synthOscillator) {
      try {
        synthOscillator.stop();
        synthOscillator.disconnect();
      } catch (e) {}
      synthOscillator = null;
    }
  }

  // 6. Render Minimalist Track List
  const tracksList = document.getElementById('tracks-list-min');

  function renderTracks(category = 'all') {
    if (!tracksList) return;
    tracksList.innerHTML = '';

    const filtered = category === 'all'
      ? audioTracks
      : audioTracks.filter(t => t.category === category);

    filtered.forEach(track => {
      const isThisPlaying = currentPlayingTrack && currentPlayingTrack.id === track.id && isPlaying;
      const row = document.createElement('div');
      row.className = `track-row-min ${isThisPlaying ? 'is-playing' : ''}`;
      row.setAttribute('data-id', track.id);

      let waveHtml = '';
      const heights = [20, 50, 80, 40, 90, 60, 35, 75, 50, 85, 30, 70, 45, 95, 40, 60];
      heights.forEach(h => {
        waveHtml += `<div class="min-wave-bar" style="height: ${h}%;"></div>`;
      });

      row.innerHTML = `
        <button class="track-play-btn-min" data-id="${track.id}" aria-label="Play">
          <i class="fas ${isThisPlaying ? 'fa-pause' : 'fa-play'}"></i>
        </button>
        <span class="track-title-min">${track.title}</span>
        <div class="track-wave-interactive-min" data-id="${track.id}">
          ${waveHtml}
        </div>
        <span class="track-time-min">${isThisPlaying ? formatTime(currentPlaybackTime) : track.duration}</span>
      `;
      tracksList.appendChild(row);
    });

    document.querySelectorAll('.track-play-btn-min').forEach(btn => {
      btn.addEventListener('click', () => togglePlayTrack(btn.getAttribute('data-id')));
    });
    document.querySelectorAll('.track-wave-interactive-min').forEach(wave => {
      wave.addEventListener('click', () => togglePlayTrack(wave.getAttribute('data-id')));
    });
  }

  function togglePlayTrack(id) {
    const track = audioTracks.find(t => t.id === id);
    if (!track) return;
    if (currentPlayingTrack && currentPlayingTrack.id === id && isPlaying) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  }

  function playTrack(track) {
    currentPlayingTrack = track;
    isPlaying = true;
    currentPlaybackTime = 0;
    clearInterval(playbackTimer);
    playSynthAudio(track);

    playbackTimer = setInterval(() => {
      currentPlaybackTime += 1;
      if (currentPlaybackTime >= track.durationSec) {
        currentPlaybackTime = 0;
        pauseTrack();
      }
      updateUI();
    }, 1000);

    updateUI();
    showStickyBar(track);
  }

  function pauseTrack() {
    isPlaying = false;
    clearInterval(playbackTimer);
    stopSynthAudio();
    updateUI();
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateUI() {
    document.querySelectorAll('.track-row-min').forEach(row => {
      const id = row.getAttribute('data-id');
      const isCardPlaying = currentPlayingTrack && currentPlayingTrack.id === id && isPlaying;
      if (isCardPlaying) {
        row.classList.add('is-playing');
        const icon = row.querySelector('.track-play-btn-min i');
        if (icon) icon.className = 'fas fa-pause';
        const time = row.querySelector('.track-time-min');
        if (time) time.textContent = formatTime(currentPlaybackTime);
      } else {
        row.classList.remove('is-playing');
        const icon = row.querySelector('.track-play-btn-min i');
        if (icon) icon.className = 'fas fa-play';
        const track = audioTracks.find(t => t.id === id);
        const time = row.querySelector('.track-time-min');
        if (time && track) time.textContent = track.duration;
      }
    });

    // Quick Hero Player
    const heroPlayer = document.getElementById('hero-quick-player');
    const heroIcon = document.getElementById('hero-quick-icon');
    if (heroPlayer && heroIcon) {
      if (currentPlayingTrack && currentPlayingTrack.id === 'quick-demo' && isPlaying) {
        heroPlayer.classList.add('playing');
        heroIcon.className = 'fas fa-pause';
      } else {
        heroPlayer.classList.remove('playing');
        heroIcon.className = 'fas fa-play';
      }
    }

    updateStickyBar();
  }

  // Hero Quick Player
  const heroQuickBtn = document.getElementById('hero-quick-play-btn');
  if (heroQuickBtn) {
    heroQuickBtn.addEventListener('click', () => {
      const demoTrack = { id: 'quick-demo', title: 'Showreel Tổng Hợp', duration: '1:00', durationSec: 60, category: 'tvc' };
      if (currentPlayingTrack && currentPlayingTrack.id === 'quick-demo' && isPlaying) {
        pauseTrack();
      } else {
        playTrack(demoTrack);
      }
    });
  }

  // Sticky Bar
  const stickyBar = document.getElementById('sticky-audio-bar');
  const stickyPlayBtn = document.getElementById('sticky-play-btn');
  const stickyTitle = document.getElementById('sticky-title');
  const stickyClose = document.getElementById('sticky-close-btn');

  function showStickyBar(track) {
    if (!stickyBar) return;
    stickyBar.classList.add('show');
    if (stickyTitle) stickyTitle.textContent = track.title;
    if (stickyPlayBtn) stickyPlayBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
  }

  function updateStickyBar() {
    if (!stickyBar || !currentPlayingTrack) return;
    if (stickyPlayBtn) stickyPlayBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
  }

  if (stickyPlayBtn) {
    stickyPlayBtn.addEventListener('click', () => {
      if (currentPlayingTrack) {
        if (isPlaying) pauseTrack();
        else playTrack(currentPlayingTrack);
      }
    });
  }

  if (stickyClose) {
    stickyClose.addEventListener('click', () => {
      pauseTrack();
      stickyBar.classList.remove('show');
    });
  }

  // Tabs
  document.querySelectorAll('.tab-btn-min').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn-min').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTracks(btn.getAttribute('data-cat'));
    });
  });

  renderTracks('all');

  // Contact Form
  const form = document.getElementById('quick-demo-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Cảm ơn bạn! Yêu cầu nhận demo đã được gửi thành công. MC Quốc Khánh sẽ phản hồi sớm nhất.');
      form.reset();
    });
  }
});
