/* DeepGuard — Shared JS */

// ── Mobile nav ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ── Fade-up on scroll ────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => io.observe(el));
}

// ── Animated counters ────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = target * eased;
    el.textContent = prefix + val.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterEls = document.querySelectorAll('[data-counter]');
if (counterEls.length) {
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counterEls.forEach(el => cio.observe(el));
}

// ── Accordion ────────────────────────────────────────
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const body = item.querySelector('.accordion-body');
    const inner = item.querySelector('.accordion-body-inner');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.accordion-body').style.maxHeight = '0';
    });
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = inner.scrollHeight + 'px';
    }
  });
});

// ── Pricing toggle ───────────────────────────────────
const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
  const monthlyPrices = document.querySelectorAll('[data-monthly]');
  const quarterlyBadge = document.getElementById('quarterlyBadge');
  pricingToggle.addEventListener('change', () => {
    monthlyPrices.forEach(el => {
      const m = el.dataset.monthly;
      const q = el.dataset.quarterly;
      el.textContent = pricingToggle.checked ? q : m;
    });
    if (quarterlyBadge) quarterlyBadge.style.display = pricingToggle.checked ? 'inline-flex' : 'none';
  });
}

// ── Active nav link ──────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Contact form ─────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'block';
      contactForm.style.display = 'none';
    }, 1200);
  });
}
