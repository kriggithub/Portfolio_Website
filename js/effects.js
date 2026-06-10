/* Ambient & interactive visual effects (CSP-safe, respects prefers-reduced-motion) */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* Scroll progress bar */
  const progress = document.getElementById('scroll-progress');

  function updateProgress() {
    if (!progress) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progress.style.transform = `scaleX(${max > 0 ? doc.scrollTop / max : 0})`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  /* Sliding nav indicator pill */
  function updateNavIndicator() {
    const pill = document.querySelector('.nav-indicator');
    const active = document.querySelector('.nav-link.active');
    if (!pill || !active) return;
    const parentRect = pill.parentElement.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    pill.style.width = `${rect.width + 22}px`;
    pill.style.transform = `translateX(${rect.left - parentRect.left - 11}px) translateY(-50%)`;
    pill.style.opacity = '1';
  }
  window.updateNavIndicator = updateNavIndicator;
  window.addEventListener('resize', updateNavIndicator);
  if (document.fonts && document.fonts.ready) {
    // Font swap changes link widths; re-measure once Inter loads
    document.fonts.ready.then(updateNavIndicator);
  }

  /* Magnetic hover for buttons and icon links */
  function initMagnetic() {
    if (reduceMotion.matches || !canHover.matches) return;
    document.querySelectorAll('.links a, .btn, .social-links a').forEach(el => {
      if (el.dataset.magnetic) return;
      el.dataset.magnetic = 'true';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - r.left - r.width / 2;
        const dy = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }
  window.initMagnetic = initMagnetic;

  /* Trailing cursor glow ring (desktop pointers only) */
  function initCursorGlow() {
    if (reduceMotion.matches || !canHover.matches) return;
    const ring = document.createElement('div');
    ring.id = 'cursor-glow';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);

    let tx = -100, ty = -100, x = -100, y = -100;
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      ring.style.opacity = '1';
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => {
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseover', (e) => {
      const interactive = e.target.closest && e.target.closest('a, button');
      ring.classList.toggle('is-active', !!interactive);
    });

    (function loop() {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      ring.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }

  /* Mouse parallax for hero elements (reads --depth per element) */
  function initHeroParallax() {
    if (reduceMotion.matches || !canHover.matches) return;
    let queued = false;
    window.addEventListener('mousemove', (e) => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth - 0.5) * -22;
        const py = (e.clientY / window.innerHeight - 0.5) * -14;
        document.documentElement.style.setProperty('--phx', `${px.toFixed(1)}px`);
        document.documentElement.style.setProperty('--phy', `${py.toFixed(1)}px`);
        queued = false;
      });
    }, { passive: true });
  }

  /* Decrypt-style text scramble for page headings */
  function scrambleHeading(el) {
    if (!el) return;
    const original = el.textContent;
    if (reduceMotion.matches || !original) return;
    const CHARS = '!<>-_\\/[]{}=+*^?#';
    const duration = 900;
    const start = performance.now();

    function step(now) {
      if (!el.isConnected) return;
      const progress = Math.min(1, (now - start) / duration);
      const resolved = Math.floor(original.length * progress);
      let out = original.slice(0, resolved);
      for (let i = resolved; i < original.length; i++) {
        out += original[i] === ' ' ? ' ' : CHARS[(Math.random() * CHARS.length) | 0];
      }
      el.textContent = out;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = original;
      }
    }
    requestAnimationFrame(step);
  }
  window.scrambleHeading = scrambleHeading;

  /* Ambient starfield canvas with parallax and shooting stars */
  function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || reduceMotion.matches) return;

    const ctx = canvas.getContext('2d');
    const COLORS = ['255, 255, 255', '41, 151, 255', '191, 90, 242'];
    let w = 0;
    let h = 0;
    let particles = [];
    let stars = [];
    let sparks = [];
    let nextStarAt = performance.now() + 3000;
    let rafId = null;
    const mouse = { x: 0.5, y: 0.5, ex: 0.5, ey: 0.5 };

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.3,
        depth: 0.25 + Math.random() * 0.75,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.5 + Math.random() * 1.5,
        color: Math.random() < 0.8 ? COLORS[0] : COLORS[Math.random() < 0.5 ? 1 : 2]
      };
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(150, Math.round((w * h) / 13000));
      particles = Array.from({ length: count }, makeParticle);
    }

    function spawnStar(now) {
      stars.push({
        x: Math.random() * w * 0.8,
        y: Math.random() * h * 0.35,
        vx: 7 + Math.random() * 5,
        vy: 2.5 + Math.random() * 2,
        life: 1
      });
      nextStarAt = now + 5000 + Math.random() * 7000;
    }

    function spawnSparks(cx, cy) {
      const count = 12 + Math.floor(Math.random() * 6);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        sparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          r: 0.8 + Math.random() * 1.4,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
      }
      if (sparks.length > 220) sparks = sparks.slice(-220);
    }

    function frame(now) {
      ctx.clearRect(0, 0, w, h);

      mouse.ex += (mouse.x - mouse.ex) * 0.04;
      mouse.ey += (mouse.y - mouse.ey) * 0.04;
      const t = now / 1000;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;

        const offsetX = (mouse.ex - 0.5) * 36 * p.depth;
        const offsetY = (mouse.ey - 0.5) * 36 * p.depth;
        const alpha = p.depth * (0.45 + 0.55 * Math.abs(Math.sin(t * p.twinkle + p.phase)));

        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      if (now > nextStarAt) spawnStar(now);

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.016;
        if (s.life <= 0 || s.x > w + 100 || s.y > h + 100) {
          stars.splice(i, 1);
          continue;
        }
        const tailX = s.x - s.vx * 9;
        const tailY = s.y - s.vy * 9;
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${(0.85 * s.life).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.985;
        sp.vy = sp.vy * 0.985 + 0.05;
        sp.life -= sp.decay;
        if (sp.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r * sp.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sp.color}, ${sp.life.toFixed(3)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    window.addEventListener('resize', resize);
    document.addEventListener('pointerdown', (e) => {
      spawnSparks(e.clientX, e.clientY);
    });
    if (canHover.matches) {
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX / w;
        mouse.y = e.clientY / h;
      }, { passive: true });
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!rafId) {
        rafId = requestAnimationFrame(frame);
      }
    });

    resize();
    rafId = requestAnimationFrame(frame);
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    updateNavIndicator();
    initMagnetic();
    initCursorGlow();
    initHeroParallax();
    initCanvas();
  });
})();
