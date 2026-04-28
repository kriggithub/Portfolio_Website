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

  // Fade out
  mainContent.classList.add('fade-out');
  
  setTimeout(() => {
    // Inject new content
    mainContent.innerHTML = window.contentViews[viewName];
    
    if (viewName === 'home') {
      initTypingEffect();
    }
    
    // Fade in
    mainContent.classList.remove('fade-out');
    
    // Re-initialize scroll animations for new content
    initScrollReveal();
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }, 400); // Wait for fade out transition (0.4s)
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  // If IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
      observer.observe(reveal);
    });
  } else {
    // Fallback if not supported
    reveals.forEach(reveal => reveal.classList.add('active'));
  }
}

// Make navigate function globally available for onclick handlers in HTML
window.navigate = navigate;

// Typing effect logic
let typingTimeout1, typingTimeout2; // Globals to clear timeouts if user navigates away

function initTypingEffect() {
  const words = [
      { text: "YouTuber.",        color: "#ff3b30" }, // Apple-like red
      { text: "Biostatistician.", color: "#007aff" }, // Apple-like blue
      { text: "Researcher.",      color: "#34c759" }  // Apple-like green
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
      element.style.color = current.color;
      document.documentElement.style.setProperty("--cursor-color", current.color);

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
