
// Active nav highlight based on page
(() => {
  const path = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'home',
    'projects.html': 'projects',
    'experience.html': 'experience',
    'about.html': 'about'
  };
  const key = map[path] || (path.startsWith('project-') ? 'projects' : '');
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('data-nav') === key) a.classList.add('active');
  });
})();

// Reveal on scroll (IntersectionObserver)
(() => {
  const els = Array.from(document.querySelectorAll('.reveal'));
  let i = 0;
  const addDelay = (el) => {
    const mod = i % 4;
    if (mod === 1) el.classList.add('delay1');
    if (mod === 2) el.classList.add('delay2');
    if (mod === 3) el.classList.add('delay3');
    i++;
  };
  els.forEach(addDelay);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});

// Lightbox for screenshots
(() => {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const img = box.querySelector('.lightbox-img');
  const cap = box.querySelector('.lightbox-caption');
  const closeBtn = box.querySelector('.lightbox-close');

  const close = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    img.removeAttribute('src');
    cap.textContent = '';
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', close);
  box.addEventListener('click', (e) => {
    if (e.target === box) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  document.querySelectorAll('img.clickable').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('src');
      const caption = el.getAttribute('data-caption') || '';
      if (!src) return;
      img.setAttribute('src', src);
      cap.textContent = caption;
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
})();
