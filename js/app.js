document.addEventListener('DOMContentLoaded', () => {
  // Initial load
  navigate('home');
});

function navigate(viewName) {
  const mainContent = document.getElementById('main-content');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Update active nav state
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('data-target') === viewName) {
      link.classList.add('active');
    }
  });

  // Clean up scroll arrow listener from previous home view
  if (window._scrollArrowCleanup) {
    window._scrollArrowCleanup();
    window._scrollArrowCleanup = null;
  }

  // Fade out
  mainContent.classList.add('fade-out');
  
  setTimeout(() => {
    // Inject new content
    mainContent.innerHTML = window.contentViews[viewName];

    if (viewName === 'home') {
      initTypingEffect();
      initScrollArrow();
    }

    // Fade in
    mainContent.classList.remove('fade-out');

    // Re-initialize scroll animations for new content
    initScrollReveal();
    initCardTilt();

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, 400); // Wait for fade out transition (0.4s)
}

function initScrollReveal() {
  // Add staggered reveal to cards inside grids
  document.querySelectorAll('.grid-2').forEach(grid => {
    grid.querySelectorAll('.card').forEach((card, i) => {
      card.classList.add('reveal-card');
      card.style.setProperty('--delay', `${i * 0.13}s`);
    });
  });

  const reveals = document.querySelectorAll('.reveal, .reveal-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }
}

function initCardTilt() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', onCardTilt);
    card.addEventListener('mouseleave', onCardReset);

    const bgLayer = card.querySelector('.card-bg-layer');
    if (bgLayer && card.dataset.bg) {
      bgLayer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${card.dataset.bg}')`;
      card.addEventListener('mouseenter', () => { bgLayer.style.opacity = '1'; });
      card.addEventListener('mouseleave', () => { bgLayer.style.opacity = '0'; });
    }
  });
}

function onCardTilt(e) {
  const card = e.currentTarget;
  // Don't tilt until card has revealed
  if (card.classList.contains('reveal-card') && !card.classList.contains('active')) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  const rotateX = -((y - cy) / cy) * 7;
  const rotateY = ((x - cx) / cx) * 7;

  card.style.transition = 'transform 0.1s ease, background 0.3s ease';
  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function onCardReset(e) {
  const card = e.currentTarget;
  card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease';
  card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

// Make navigate function globally available for onclick handlers in HTML
window.navigate = navigate;

function initScrollArrow() {
  const wrapper = document.querySelector('.scroll-arrow-wrapper');
  if (!wrapper) return;

  function onScroll() {
    if (window.scrollY > 80) {
      wrapper.classList.add('hidden');
    } else {
      wrapper.classList.remove('hidden');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window._scrollArrowCleanup = () => window.removeEventListener('scroll', onScroll);
}

// Typing effect logic
let typingTimeout1, typingTimeout2; // Globals to clear timeouts if user navigates away

function initTypingEffect() {
  const words = [
      { text: "YouTuber."        },
      { text: "Biostatistician." },
      { text: "Researcher."      }
  ];

  const element = document.getElementById("typing-word");
  if (!element) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingDelay  = 150;
  const erasingDelay = 90;
  const endPause     = 2500;
  const startPause   = 500;

  function typeLoop() {
      // Check if element still exists in DOM, stop loop if navigated away
      if (!document.getElementById("typing-word")) return;

      const current = words[wordIndex];

      if (!isDeleting) {
          if (charIndex <= current.text.length) {
              element.textContent = current.text.substring(0, charIndex);
              charIndex++;
              typingTimeout1 = setTimeout(typeLoop, typingDelay);
          } else {
              isDeleting = true;
              typingTimeout1 = setTimeout(typeLoop, endPause);
          }
      } else {
          if (charIndex > 0) {
              element.textContent = current.text.substring(0, charIndex - 1);
              charIndex--;
              typingTimeout1 = setTimeout(typeLoop, erasingDelay);
          } else {
              element.textContent = "";
              isDeleting = false;
              wordIndex = (wordIndex + 1) % words.length;
              typingTimeout1 = setTimeout(typeLoop, startPause);
          }
      }
  }

  // Clear any existing timeouts to prevent overlapping loops when navigating back and forth
  clearTimeout(typingTimeout1);
  clearTimeout(typingTimeout2);
  typeLoop();
}
