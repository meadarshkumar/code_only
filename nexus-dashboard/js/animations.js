/* =====================================================================
   animations.js
   Typing intro, scroll-triggered reveals (IntersectionObserver), animated
   counters, magnetic buttons, ripple clicks, 3D tilt on cards, and
   progress bar / circular ring fills.
   ===================================================================== */

(function () {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------- TYPING ANIMATION ------------------------- */
  const roles = [
    'Full-Stack Engineer',
    'Systems Architect',
    'Open-Source Contributor',
    'Creative Technologist',
    'UI Motion Enthusiast'
  ];
  const typingTarget = document.getElementById('typing-target');

  function typeLoop() {
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const word = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typingTarget.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          return setTimeout(tick, 1600);
        }
      } else {
        charIndex--;
        typingTarget.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }
  if (typingTarget) typeLoop();

  /* ------------------------- SCROLL REVEAL ------------------------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ------------------------- ANIMATED COUNTERS ------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  const counterEls = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counterEls.forEach((el) => counterObserver.observe(el));

  // Hero mini counters (separate, smaller targets, trigger on load)
  window.addEventListener('load', () => {
    animateCounter(Object.assign(document.getElementById('hero-count-projects'), { dataset: { target: '48' } }));
    animateCounter(Object.assign(document.getElementById('hero-count-years'), { dataset: { target: '6' } }));
    animateCounter(Object.assign(document.getElementById('hero-count-commits'), { dataset: { target: '5820' } }));
  });

  /* ------------------------- SKILL BARS ------------------------- */
  const skillBars = document.querySelectorAll('.skillbar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.dataset.fill;
        entry.target.style.width = fill + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach((el) => barObserver.observe(el));

  const langFills = document.querySelectorAll('.lang-fill');
  const langObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('filled');
        langObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  langFills.forEach((el) => langObserver.observe(el));

  // Contribution heatmap: generate 12 weeks x 7 days of pseudo-random intensity
  const heatmap = document.getElementById('heatmap');
  if (heatmap) {
    const cells = 12 * 7;
    for (let i = 0; i < cells; i++) {
      const span = document.createElement('span');
      const intensity = Math.random();
      let bg = 'rgba(255,255,255,0.06)';
      if (intensity > 0.85) bg = 'var(--accent)';
      else if (intensity > 0.65) bg = 'rgba(0,240,255,0.55)';
      else if (intensity > 0.4) bg = 'rgba(0,240,255,0.28)';
      span.style.background = bg;
      span.style.transition = 'transform .2s';
      span.addEventListener('mouseenter', () => span.style.transform = 'scale(1.25)');
      span.addEventListener('mouseleave', () => span.style.transform = 'scale(1)');
      heatmap.appendChild(span);
    }
  }

  /* ------------------------- MAGNETIC BUTTONS ------------------------- */
  if (!reduceMotion) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ------------------------- RIPPLE EFFECT ------------------------- */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ------------------------- 3D TILT (skill + project cards) ------------------------- */
  function applyTilt(selector, strength) {
    if (reduceMotion) return;
    document.querySelectorAll(selector).forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateZ(0)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }
  // Re-applied after dynamic cards are injected (see widgets/main init hooks)
  window.NEXUS_applyTilt = applyTilt;
  applyTilt('.skill-card', 10);

  /* ------------------------- Project card 3D pointer for conic border ------------------------- */
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest('.project-card');
    if (card) {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
      card.style.setProperty('--ang', angle + 'deg');
      if (!reduceMotion) {
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
      }
    }
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest && e.target.closest('.project-card');
    if (card) card.style.transform = '';
  });

  /* ------------------------- Hero name glitch on hover ------------------------- */
  const glitchEl = document.querySelector('[data-glitch]');
  if (glitchEl && !reduceMotion) {
    glitchEl.addEventListener('mouseenter', () => {
      let count = 0;
      const original = glitchEl.dataset.glitch;
      const chars = '#$%&01<>/\\';
      const interval = setInterval(() => {
        glitchEl.textContent = original
          .split('')
          .map((ch, i) => (Math.random() < 0.15 ? chars[Math.floor(Math.random() * chars.length)] : ch))
          .join('');
        count++;
        if (count > 6) { clearInterval(interval); glitchEl.textContent = original; }
      }, 45);
    });
  }
})();