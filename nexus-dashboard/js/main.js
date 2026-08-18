/* =====================================================================
   main.js
   App orchestration: loading screen boot sequence, sticky navbar +
   active-section indicator, mobile hamburger menu, theme protocol
   switcher (localStorage-backed), back-to-top button, and the floating
   music player.
   ===================================================================== */

(function () {
  'use strict';

  /* =====================================================================
     LOADING SCREEN
     ===================================================================== */
  const loadingScreen = document.getElementById('loading-screen');
  const bootLinesEl = document.getElementById('loading-bootlines');
  const barFill = document.getElementById('loading-bar-fill');
  const percentEl = document.getElementById('loading-percent');

  const BOOT_LINES = [
    'Initializing kernel modules...',
    'Establishing secure uplink...',
    'Loading neon shader packs...',
    'Calibrating glass panels...',
    'Booting NEXUS_OS...'
  ];

  function runBootLines() {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.innerHTML = `<span>[ OK ]</span> ${line}`;
        bootLinesEl.appendChild(div);
      }, i * 260);
    });
  }

  function runProgressBar() {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 14 + 6;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setTimeout(hideLoadingScreen, 350);
      }
      barFill.style.width = pct + '%';
      percentEl.textContent = Math.floor(pct) + '%';
    }, 180);
  }

  function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
    setTimeout(() => { loadingScreen.style.display = 'none'; }, 750);
  }

  runBootLines();
  runProgressBar();
  // Safety net: never let the loading screen block the app for more than 4s.
  setTimeout(hideLoadingScreen, 4000);

  /* =====================================================================
     NAVBAR — scroll blur + active section indicator + hamburger
     ===================================================================== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const navIndicator = document.getElementById('nav-indicator');
  const hamburger = document.getElementById('hamburger');
  const linkEls = Array.from(document.querySelectorAll('.nav-link'));

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  function moveIndicatorTo(link) {
    if (!link || window.innerWidth <= 860) return;
    navIndicator.style.left = link.offsetLeft + 'px';
    navIndicator.style.width = link.offsetWidth + 'px';
  }

  function setActiveLink(id) {
    linkEls.forEach((l) => l.classList.toggle('active', l.dataset.section === id));
    const active = linkEls.find((l) => l.dataset.section === id);
    if (active) moveIndicatorTo(active);
  }

  const sections = linkEls
    .map((l) => document.getElementById(l.dataset.section))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach((s) => sectionObserver.observe(s));

  window.addEventListener('load', () => moveIndicatorTo(document.querySelector('.nav-link.active')));
  window.addEventListener('resize', () => moveIndicatorTo(document.querySelector('.nav-link.active')));

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  linkEls.forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));

  /* =====================================================================
     THEME PROTOCOL SWITCH (Cyan / Magenta) — persisted via localStorage
     ===================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedProtocol = localStorage.getItem('nexus-protocol') || 'cyan';
  root.setAttribute('data-protocol', savedProtocol);

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-protocol') === 'cyan' ? 'magenta' : 'cyan';
    root.setAttribute('data-protocol', next);
    localStorage.setItem('nexus-protocol', next);
    if (window.NEXUS_toast) window.NEXUS_toast(`Color protocol switched to ${next.toUpperCase()}.`, 'default', 1800);
  });

  /* =====================================================================
     BACK TO TOP
     ===================================================================== */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* =====================================================================
     MUSIC PLAYER (simulated playback — no external audio files/libraries)
     ===================================================================== */
  const musicPlayer = document.getElementById('music-player');
  const musicToggleTab = document.getElementById('music-toggle-tab');
  const musicPlayBtn = document.getElementById('music-play');
  const musicPrevBtn = document.getElementById('music-prev');
  const musicNextBtn = document.getElementById('music-next');
  const musicTitle = document.getElementById('music-title');
  const musicArtist = document.getElementById('music-artist');
  const musicProgressTrack = document.getElementById('music-progress-track');
  const musicProgressFill = document.getElementById('music-progress-fill');
  const musicTimeCurrent = document.getElementById('music-time-current');
  const musicTimeTotal = document.getElementById('music-time-total');
  const musicVolume = document.getElementById('music-volume');
  const musicPlaylistEl = document.getElementById('music-playlist');

  const PLAYLIST = [
    { title: 'Neon Rain', artist: 'Synthwave Drift', duration: 204 },
    { title: 'Chrome Heart', artist: 'Vektor Bloom', duration: 187 },
    { title: 'Midnight Uplink', artist: 'Glass Circuit', duration: 231 },
    { title: 'Afterglow Protocol', artist: 'Nova Static', duration: 176 }
  ];

  let trackIndex = 0;
  let elapsed = 0;
  let playing = false;
  let playInterval = null;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function renderPlaylist() {
    musicPlaylistEl.innerHTML = '';
    PLAYLIST.forEach((track, i) => {
      const li = document.createElement('li');
      li.textContent = `${track.title} — ${track.artist}`;
      li.classList.toggle('active', i === trackIndex);
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => loadTrack(i, true));
      musicPlaylistEl.appendChild(li);
    });
  }

  function loadTrack(index, autoplay) {
    trackIndex = (index + PLAYLIST.length) % PLAYLIST.length;
    const track = PLAYLIST[trackIndex];
    elapsed = 0;
    musicTitle.textContent = track.title;
    musicArtist.textContent = track.artist;
    musicTimeTotal.textContent = formatTime(track.duration);
    musicTimeCurrent.textContent = '0:00';
    musicProgressFill.style.width = '0%';
    renderPlaylist();
    if (autoplay) startPlayback(); else stopPlayback();
  }

  function startPlayback() {
    playing = true;
    musicPlayer.classList.add('playing');
    musicPlayBtn.textContent = '⏸';
    clearInterval(playInterval);
    playInterval = setInterval(() => {
      const track = PLAYLIST[trackIndex];
      elapsed += 1;
      if (elapsed >= track.duration) { loadTrack(trackIndex + 1, true); return; }
      musicTimeCurrent.textContent = formatTime(elapsed);
      musicProgressFill.style.width = (elapsed / track.duration) * 100 + '%';
    }, 1000);
  }
  function stopPlayback() {
    playing = false;
    musicPlayer.classList.remove('playing');
    musicPlayBtn.textContent = '▶';
    clearInterval(playInterval);
  }

  if (musicPlayer) {
    loadTrack(0, false);
    musicToggleTab.addEventListener('click', () => musicPlayer.classList.toggle('open'));
    musicPlayBtn.addEventListener('click', () => (playing ? stopPlayback() : startPlayback()));
    musicPrevBtn.addEventListener('click', () => loadTrack(trackIndex - 1, playing));
    musicNextBtn.addEventListener('click', () => loadTrack(trackIndex + 1, playing));
    musicProgressTrack.addEventListener('click', (e) => {
      const rect = musicProgressTrack.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const track = PLAYLIST[trackIndex];
      elapsed = Math.max(0, Math.min(track.duration, ratio * track.duration));
      musicTimeCurrent.textContent = formatTime(elapsed);
      musicProgressFill.style.width = ratio * 100 + '%';
    });
    musicVolume.addEventListener('input', () => {
      // Cosmetic only — no real audio element in this offline demo.
      musicPlayer.style.setProperty('--vol', musicVolume.value);
    });
  }

  /* =====================================================================
     FOOTER YEAR
     ===================================================================== */
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();
})();