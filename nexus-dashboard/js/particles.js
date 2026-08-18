/* =====================================================================
   particles.js
   Ambient background effects: twinkling stars, floating glow particles,
   custom cursor (dot + ring + trail), and a radial mouse-glow that
   follows the pointer. All canvas work is rAF-driven and resize-safe.
   ===================================================================== */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;

  /* ------------------------- STARFIELD ------------------------- */
  const starCanvas = document.getElementById('bg-stars');
  const starCtx = starCanvas.getContext('2d');
  let stars = [];

  function resizeStars() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    const count = Math.floor((window.innerWidth * window.innerHeight) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005
    }));
  }

  function drawStars(t) {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (const s of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starCtx.fillStyle = `rgba(255,255,255,${0.15 + twinkle * 0.65})`;
      starCtx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(drawStars);
  }

  /* ------------------------- FLOATING PARTICLES ------------------------- */
  const particleCanvas = document.getElementById('bg-particles');
  const particleCtx = particleCanvas.getContext('2d');
  let particles = [];
  const accentColors = ['0,240,255', '255,46,166', '123,97,255'];

  function resizeParticles() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    const count = Math.min(46, Math.floor(window.innerWidth / 32));
    particles = Array.from({ length: count }, () => spawnParticle());
  }

  function spawnParticle() {
    return {
      x: Math.random() * particleCanvas.width,
      y: Math.random() * particleCanvas.height,
      r: Math.random() * 2 + 1,
      vy: -(Math.random() * 0.3 + 0.08),
      vx: (Math.random() - 0.5) * 0.15,
      color: accentColors[Math.floor(Math.random() * accentColors.length)],
      alpha: Math.random() * 0.5 + 0.2
    };
  }

  function drawParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { Object.assign(p, spawnParticle()); p.y = particleCanvas.height + 10; }
      if (p.x < -10) p.x = particleCanvas.width + 10;
      if (p.x > particleCanvas.width + 10) p.x = -10;

      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      particleCtx.fillStyle = `rgba(${p.color},${p.alpha})`;
      particleCtx.shadowBlur = 8;
      particleCtx.shadowColor = `rgba(${p.color},0.8)`;
      particleCtx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', debounce(() => {
    resizeStars();
    resizeParticles();
  }, 200));

  resizeStars();
  resizeParticles();
  requestAnimationFrame(drawStars);
  requestAnimationFrame(drawParticles);
  if (reduceMotion) { drawStars(0); drawParticles(); } // draw once, no loop

  function debounce(fn, wait) {
    let id;
    return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), wait); };
  }

  /* ------------------------- MOUSE GLOW ------------------------- */
  const glow = document.getElementById('mouse-glow');
  if (!isTouch) {
    window.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
  } else {
    glow.style.display = 'none';
  }

  /* ------------------------- CUSTOM CURSOR ------------------------- */
  if (!isTouch) {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    }, { passive: true });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state on interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('[data-cursor-hover], a, button, input, textarea')) {
        ring.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('[data-cursor-hover], a, button, input, textarea')) {
        ring.classList.remove('hover');
      }
    });

    document.addEventListener('mousedown', () => ring.style.transform += ' scale(0.85)');

    /* Cursor trail — short-lived fading dots on a dedicated canvas */
    const trailCanvas = document.getElementById('cursor-trail');
    const trailCtx = trailCanvas.getContext('2d');
    let trail = [];
    function resizeTrail() {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    }
    resizeTrail();
    window.addEventListener('resize', debounce(resizeTrail, 200));

    window.addEventListener('mousemove', (e) => {
      trail.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.length > 18) trail.shift();
    }, { passive: true });

    function drawTrail() {
      trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      trail.forEach((p, i) => {
        p.life -= 0.06;
        if (p.life > 0) {
          trailCtx.beginPath();
          trailCtx.arc(p.x, p.y, 2.4 * p.life, 0, Math.PI * 2);
          trailCtx.fillStyle = `rgba(0,240,255,${p.life * 0.35})`;
          trailCtx.fill();
        }
      });
      trail = trail.filter(p => p.life > 0);
      requestAnimationFrame(drawTrail);
    }
    if (!reduceMotion) drawTrail();
  }
})();