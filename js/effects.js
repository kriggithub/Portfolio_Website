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

      rafId = requestAnimationFrame(frame);
    }

    window.addEventListener('resize', resize);
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
    initCanvas();
  });
})();
