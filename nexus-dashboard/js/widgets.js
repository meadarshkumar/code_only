/* =====================================================================
   widgets.js
   Data-driven content (skills, projects), the global toast + modal
   systems, live clock/world-clocks, fake weather widget, productivity
   tools (Pomodoro / Stopwatch / Countdown / Notes), and contact form
   validation.
   ===================================================================== */

(function () {
  'use strict';

  /* =====================================================================
     TOAST NOTIFICATIONS (global helper: window.NEXUS_toast)
     ===================================================================== */
  const toastContainer = document.getElementById('toast-container');
  window.NEXUS_toast = function (message, type = 'default', duration = 3200) {
    const toast = document.createElement('div');
    toast.className = `toast${type !== 'default' ? ' toast-' + type : ''}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);
  };

  /* =====================================================================
     MODAL (global helper: window.NEXUS_modal)
     ===================================================================== */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  window.NEXUS_modal = function (html) {
    modalContent.innerHTML = html;
    modalOverlay.hidden = false;
    requestAnimationFrame(() => modalOverlay.classList.add('show'));
  };
  function closeModal() {
    modalOverlay.classList.remove('show');
    setTimeout(() => { modalOverlay.hidden = true; }, 250);
  }
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modalOverlay.hidden) closeModal(); });

  /* =====================================================================
     SKILLS — data + circular-progress card generation + filtering
     ===================================================================== */
  const SKILLS = [
    { name: 'JavaScript', icon: '⚡', pct: 95, cat: 'frontend' },
    { name: 'React', icon: '⚛️', pct: 90, cat: 'frontend' },
    { name: 'CSS &amp; Motion', icon: '🎨', pct: 88, cat: 'design' },
    { name: 'TypeScript', icon: '🔷', pct: 86, cat: 'frontend' },
    { name: 'Node.js', icon: '🟢', pct: 89, cat: 'backend' },
    { name: 'PostgreSQL', icon: '🐘', pct: 82, cat: 'backend' },
    { name: 'Python', icon: '🐍', pct: 80, cat: 'backend' },
    { name: 'Docker', icon: '🐳', pct: 78, cat: 'tools' },
    { name: 'Git', icon: '🌿', pct: 94, cat: 'tools' },
    { name: 'Figma', icon: '🖌️', pct: 85, cat: 'design' },
    { name: 'AWS', icon: '☁️', pct: 74, cat: 'tools' },
    { name: 'GraphQL', icon: '◈', pct: 79, cat: 'backend' }
  ];

  const skillsGrid = document.getElementById('skills-grid');
  const RING_R = 36;
  const RING_C = 2 * Math.PI * RING_R;

  if (skillsGrid) {
    SKILLS.forEach((skill) => {
      const card = document.createElement('div');
      card.className = 'skill-card reveal-up';
      card.dataset.category = skill.cat;
      card.innerHTML = `
        <div class="skill-card-icon">${skill.icon}</div>
        <div class="skill-card-name">${skill.name}</div>
        <div class="skill-ring">
          <svg viewBox="0 0 84 84">
            <circle class="ring-bg" cx="42" cy="42" r="${RING_R}"></circle>
            <circle class="ring-fg" cx="42" cy="42" r="${RING_R}"
              stroke-dasharray="${RING_C}" stroke-dashoffset="${RING_C}" data-offset="${RING_C * (1 - skill.pct / 100)}"></circle>
          </svg>
          <span class="skill-ring-label">${skill.pct}%</span>
        </div>`;
      skillsGrid.appendChild(card);
    });

    // Reveal + ring-fill on scroll into view
    const ringObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          const fg = entry.target.querySelector('.ring-fg');
          if (fg) fg.style.strokeDashoffset = fg.dataset.offset;
          ringObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillsGrid.querySelectorAll('.skill-card').forEach((c) => ringObserver.observe(c));

    // tilt effect for the newly created cards
    if (window.NEXUS_applyTilt) window.NEXUS_applyTilt('.skill-card', 10);

    // Filtering
    document.querySelectorAll('.filter-btn[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-filter]').forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
        const filter = btn.dataset.filter;
        skillsGrid.querySelectorAll('.skill-card').forEach((card) => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('hidden-item', !show);
        });
      });
    });
  }

  /* =====================================================================
     PROJECTS — data + card generation
     ===================================================================== */
  const PROJECTS = [
    { title: 'Aurora Grid', desc: 'Realtime data-visualization platform streaming millions of events per hour into readable, glowing dashboards.', tags: ['React', 'WebSocket', 'D3'] },
    { title: 'Pulsewave CMS', desc: 'A headless content engine built for speed, with edge caching and a block-based authoring UI.', tags: ['Node.js', 'PostgreSQL', 'Redis'] },
    { title: 'Nexus Auth', desc: 'A zero-trust identity service handling passkeys, session rotation, and anomaly detection.', tags: ['Go', 'OAuth2', 'Docker'] },
    { title: 'Driftline', desc: 'Logistics tracking network mapping fleets in real time across a 40-city delivery grid.', tags: ['TypeScript', 'MapLibre', 'gRPC'] },
    { title: 'Cipher Vault', desc: 'End-to-end encrypted notes app with client-side key derivation and offline-first sync.', tags: ['React', 'WebCrypto', 'IndexedDB'] },
    { title: 'Glasswing UI', desc: 'An open-source component design system used across a dozen internal products.', tags: ['TypeScript', 'Storybook', 'CSS'] }
  ];

  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    PROJECTS.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'project-card reveal-up';
      card.style.setProperty('--d', (i * 0.06) + 's');
      card.innerHTML = `
        <div class="project-preview">
          <div class="win-bar"><span></span><span></span><span></span></div>
          <div class="preview-lines"><i></i><i></i><i></i><i></i></div>
          <div class="preview-pulse">▶</div>
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
          <div class="project-actions">
            <a href="#" class="btn btn-ghost" data-cursor-hover data-action="github" data-title="${p.title}">GitHub</a>
            <a href="#" class="btn btn-primary" data-cursor-hover data-action="demo" data-title="${p.title}">Live Demo</a>
          </div>
        </div>`;
      projectsGrid.appendChild(card);
    });

    const projObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); projObserver.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    projectsGrid.querySelectorAll('.project-card').forEach((c) => projObserver.observe(c));

    projectsGrid.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]');
      if (!action) return;
      e.preventDefault();
      const title = action.dataset.title;
      const kind = action.dataset.action === 'github' ? 'repository' : 'live demo';
      window.NEXUS_toast(`"${title}" ${kind} is a showcase link in this demo.`, 'default');
    });
  }

  /* =====================================================================
     CLOCK — analog + digital + world clocks
     ===================================================================== */
  const handHour = document.getElementById('hand-hour');
  const handMin = document.getElementById('hand-min');
  const handSec = document.getElementById('hand-sec');
  const digitalClock = document.getElementById('digital-clock');
  const digitalDate = document.getElementById('digital-date');
  const worldClocksList = document.getElementById('world-clocks');

  const WORLD_CITIES = [
    { city: 'New York', tz: 'America/New_York' },
    { city: 'London', tz: 'Europe/London' },
    { city: 'Tokyo', tz: 'Asia/Tokyo' },
    { city: 'Kolkata', tz: 'Asia/Kolkata' }
  ];
  if (worldClocksList) {
    WORLD_CITIES.forEach((c) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${c.city}</span><strong data-tz="${c.tz}">--:--</strong>`;
      worldClocksList.appendChild(li);
    });
  }

  function tickClock() {
    const now = new Date();
    const h = now.getHours() % 12, m = now.getMinutes(), s = now.getSeconds();
    if (handHour) handHour.style.transform = `rotate(${h * 30 + m * 0.5}deg)`;
    if (handMin) handMin.style.transform = `rotate(${m * 6 + s * 0.1}deg)`;
    if (handSec) handSec.style.transform = `rotate(${s * 6}deg)`;
    if (digitalClock) digitalClock.textContent = now.toLocaleTimeString('en-GB');
    if (digitalDate) digitalDate.textContent = now.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    if (worldClocksList) {
      worldClocksList.querySelectorAll('[data-tz]').forEach((el) => {
        try {
          el.textContent = now.toLocaleTimeString('en-GB', { timeZone: el.dataset.tz, hour: '2-digit', minute: '2-digit' });
        } catch (err) { el.textContent = '--:--'; }
      });
    }
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* =====================================================================
     WEATHER — fake futuristic data
     ===================================================================== */
  const weatherIcon = document.getElementById('weather-icon');
  const weatherTemp = document.getElementById('weather-temp');
  const weatherDesc = document.getElementById('weather-desc');
  const weatherHumidity = document.getElementById('weather-humidity');
  const weatherWind = document.getElementById('weather-wind');
  const weatherRefresh = document.getElementById('weather-refresh');

  const CONDITIONS = [
    { icon: '☀️', desc: 'Clear synthetic skies' },
    { icon: '⛅', desc: 'Partial cloud coverage' },
    { icon: '🌧️', desc: 'Light ionized rain' },
    { icon: '⛈️', desc: 'Electro-storm advisory' },
    { icon: '🌫️', desc: 'Low-lying data fog' }
  ];

  function randomizeWeather() {
    const c = CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)];
    weatherIcon.textContent = c.icon;
    weatherDesc.textContent = c.desc;
    weatherTemp.textContent = String(Math.floor(Math.random() * 14 + 20));
    weatherHumidity.textContent = Math.floor(Math.random() * 40 + 40) + '%';
    weatherWind.textContent = Math.floor(Math.random() * 20 + 5) + ' km/h';
  }
  if (weatherIcon) {
    randomizeWeather();
    weatherRefresh.addEventListener('click', () => {
      randomizeWeather();
      window.NEXUS_toast('Atmosphere rescanned.', 'success', 1800);
    });
  }

  /* =====================================================================
     PRODUCTIVITY — Pomodoro
     ===================================================================== */
  const pomoTime = document.getElementById('pomo-time');
  const pomoMode = document.getElementById('pomo-mode');
  const pomoStart = document.getElementById('pomo-start');
  const pomoReset = document.getElementById('pomo-reset');
  const FOCUS_SECONDS = 25 * 60, BREAK_SECONDS = 5 * 60;
  let pomoRemaining = FOCUS_SECONDS, pomoRunning = false, pomoInterval = null, pomoIsBreak = false;

  function formatMMSS(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  function renderPomo() { if (pomoTime) pomoTime.textContent = formatMMSS(pomoRemaining); }

  if (pomoStart) {
    pomoStart.addEventListener('click', () => {
      pomoRunning = !pomoRunning;
      pomoStart.textContent = pomoRunning ? 'Pause' : 'Start';
      if (pomoRunning) {
        pomoInterval = setInterval(() => {
          pomoRemaining--;
          if (pomoRemaining < 0) {
            pomoIsBreak = !pomoIsBreak;
            pomoRemaining = pomoIsBreak ? BREAK_SECONDS : FOCUS_SECONDS;
            pomoMode.textContent = pomoIsBreak ? 'BREAK' : 'FOCUS';
            window.NEXUS_toast(pomoIsBreak ? 'Focus block complete — take a break.' : 'Break over — back to focus.', 'success');
          }
          renderPomo();
        }, 1000);
      } else {
        clearInterval(pomoInterval);
      }
    });
    pomoReset.addEventListener('click', () => {
      clearInterval(pomoInterval);
      pomoRunning = false; pomoIsBreak = false;
      pomoRemaining = FOCUS_SECONDS;
      pomoMode.textContent = 'FOCUS';
      pomoStart.textContent = 'Start';
      renderPomo();
    });
    renderPomo();
  }

  /* =====================================================================
     PRODUCTIVITY — Stopwatch
     ===================================================================== */
  const swTime = document.getElementById('sw-time');
  const swStart = document.getElementById('sw-start');
  const swLap = document.getElementById('sw-lap');
  const swReset = document.getElementById('sw-reset');
  const swLaps = document.getElementById('sw-laps');
  let swElapsed = 0, swRunning = false, swInterval = null, swLapCount = 0;

  function formatStopwatch(ms) {
    const m = Math.floor(ms / 60000).toString().padStart(2, '0');
    const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const t = Math.floor((ms % 1000) / 100);
    return `${m}:${s}.${t}`;
  }
  if (swStart) {
    swStart.addEventListener('click', () => {
      swRunning = !swRunning;
      swStart.textContent = swRunning ? 'Pause' : 'Start';
      if (swRunning) {
        const startedAt = Date.now() - swElapsed;
        swInterval = setInterval(() => {
          swElapsed = Date.now() - startedAt;
          swTime.textContent = formatStopwatch(swElapsed);
        }, 60);
      } else {
        clearInterval(swInterval);
      }
    });
    swLap.addEventListener('click', () => {
      if (!swRunning) return;
      swLapCount++;
      const li = document.createElement('li');
      li.textContent = `Lap ${swLapCount} — ${formatStopwatch(swElapsed)}`;
      swLaps.prepend(li);
    });
    swReset.addEventListener('click', () => {
      clearInterval(swInterval);
      swRunning = false; swElapsed = 0; swLapCount = 0;
      swTime.textContent = '00:00.0';
      swStart.textContent = 'Start';
      swLaps.innerHTML = '';
    });
  }

  /* =====================================================================
     PRODUCTIVITY — Countdown Timer
     ===================================================================== */
  const cdTime = document.getElementById('cd-time');
  const cdInput = document.getElementById('cd-input');
  const cdStart = document.getElementById('cd-start');
  const cdReset = document.getElementById('cd-reset');
  let cdRemaining = 5 * 60, cdRunning = false, cdInterval = null;

  if (cdStart) {
    cdTime.textContent = formatMMSS(cdRemaining);
    cdStart.addEventListener('click', () => {
      if (!cdRunning) {
        if (cdRemaining <= 0) cdRemaining = Math.max(1, parseInt(cdInput.value, 10) || 5) * 60;
        cdRunning = true;
        cdStart.textContent = 'Pause';
        cdInterval = setInterval(() => {
          cdRemaining--;
          cdTime.textContent = formatMMSS(Math.max(cdRemaining, 0));
          if (cdRemaining <= 0) {
            clearInterval(cdInterval);
            cdRunning = false;
            cdStart.textContent = 'Start';
            window.NEXUS_toast('Countdown complete.', 'success');
          }
        }, 1000);
      } else {
        cdRunning = false;
        cdStart.textContent = 'Start';
        clearInterval(cdInterval);
      }
    });
    cdReset.addEventListener('click', () => {
      clearInterval(cdInterval);
      cdRunning = false;
      cdRemaining = Math.max(1, parseInt(cdInput.value, 10) || 5) * 60;
      cdTime.textContent = formatMMSS(cdRemaining);
      cdStart.textContent = 'Start';
    });
    cdInput.addEventListener('change', () => {
      if (!cdRunning) {
        cdRemaining = Math.max(1, Math.min(180, parseInt(cdInput.value, 10) || 5)) * 60;
        cdTime.textContent = formatMMSS(cdRemaining);
      }
    });
  }

  /* =====================================================================
     PRODUCTIVITY — Notes (localStorage autosave)
     ===================================================================== */
  const notesArea = document.getElementById('notes-area');
  const notesStatus = document.getElementById('notes-status');
  if (notesArea) {
    const saved = localStorage.getItem('nexus-notes');
    if (saved) notesArea.value = saved;
    let saveTimeout;
    notesArea.addEventListener('input', () => {
      notesStatus.textContent = 'Saving...';
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem('nexus-notes', notesArea.value);
        notesStatus.textContent = 'Saved';
      }, 500);
    });
  }

  /* =====================================================================
     CONTACT FORM — validation + simulated submit
     ===================================================================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const fields = {
      name: { input: document.getElementById('cf-name'), error: document.getElementById('cf-name-error') },
      email: { input: document.getElementById('cf-email'), error: document.getElementById('cf-email-error') },
      message: { input: document.getElementById('cf-message'), error: document.getElementById('cf-message-error') }
    };
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(key) {
      const { input, error } = fields[key];
      let msg = '';
      if (key === 'name' && input.value.trim().length < 2) msg = 'Please enter your name (2+ characters).';
      if (key === 'email' && !EMAIL_RE.test(input.value.trim())) msg = 'Please enter a valid email address.';
      if (key === 'message' && input.value.trim().length < 10) msg = 'Message should be at least 10 characters.';
      error.textContent = msg;
      input.closest('.field').classList.toggle('invalid', Boolean(msg));
      return !msg;
    }

    Object.keys(fields).forEach((key) => {
      fields[key].input.addEventListener('blur', () => validateField(key));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = Object.keys(fields).map(validateField);
      if (results.every(Boolean)) {
        window.NEXUS_toast('Transmission sent — Kira will reply within 24 hours.', 'success');
        contactForm.reset();
      } else {
        window.NEXUS_toast('Please fix the highlighted fields.', 'error');
      }
    });
  }
})();