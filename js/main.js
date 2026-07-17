/* ============================================================
   MOTIV DANCE — main.js
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   NAV
   ============================================================ */
const nav = document.getElementById('nav');

ScrollTrigger.create({
  start: 'top -60',
  onEnter:     () => nav.classList.add('scrolled'),
  onLeaveBack: () => nav.classList.remove('scrolled'),
});

/* Active nav link */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

/* ============================================================
   MOBILE MENU
   ============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link, .mobile-cta').forEach(l => {
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   HERO ANIMATIONS
   ============================================================ */
if (!prefersReducedMotion) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 }, 0.3)
    .fromTo('.hero-line-inner',
      { yPercent: 110 },
      { yPercent: 0, duration: 0.9, stagger: 0.14 }, 0.5)
    .fromTo('.hero-sub',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.75 }, 1.0)
    .fromTo('.hero-actions',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }, 1.2)
    .fromTo('.hero-scroll',
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }, 1.7);

  /* Hero background subtle drift */
  gsap.to('.hero-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
} else {
  gsap.set(['.hero-badge', '.hero-line-inner', '.hero-sub', '.hero-actions', '.hero-scroll'],
    { opacity: 1, y: 0, yPercent: 0 });
}

/* ============================================================
   SCROLL REVEALS
   ============================================================ */
document.querySelectorAll('.reveal').forEach((el, i) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      if (prefersReducedMotion) { gsap.set(el, { opacity: 1 }); return; }
      gsap.fromTo(el,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }
      );
    },
  });
});

/* ============================================================
   STAT COUNTERS
   ============================================================ */
document.querySelectorAll('.stat-number').forEach(el => {
  const target = parseInt(el.dataset.target, 10);
  const numEl  = el.querySelector('.num');

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      if (prefersReducedMotion) { numEl.textContent = target; return; }
      gsap.fromTo({ val: 0 },
        { val: 0 },
        {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() { numEl.textContent = Math.round(this.targets()[0].val); },
        }
      );
    },
  });
});

/* ============================================================
   LEVEL CARDS — staggered reveal
   ============================================================ */
ScrollTrigger.create({
  trigger: '.levels-grid',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.level-card',
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
  },
});

/* ============================================================
   PRICING CARDS — staggered reveal
   ============================================================ */
ScrollTrigger.create({
  trigger: '.pricing-grid',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.price-card',
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out' }
    );
  },
});

/* ============================================================
   FACILITY CARDS — staggered reveal
   ============================================================ */
ScrollTrigger.create({
  trigger: '.facility-grid',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.facility-card',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
    );
  },
});

/* ============================================================
   ARTIST PILLS — staggered reveal
   ============================================================ */
ScrollTrigger.create({
  trigger: '.artists-grid',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.artist-pill',
      { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 0.55, stagger: 0.07, ease: 'back.out(1.4)' }
    );
  },
});

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
if (!prefersReducedMotion) {
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      gsap.to(btn, { x: x * 0.18, y: y * 0.18, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');
const submitBtn    = document.getElementById('contact-submit');

function shakeEl(el) {
  if (!el || prefersReducedMotion) { el?.focus(); return; }
  gsap.fromTo(el, { x: 0 }, {
    x: 9, duration: 0.07, repeat: 5, yoyo: true, ease: 'power2.inOut',
    onComplete: () => { gsap.set(el, { x: 0 }); el.focus(); },
  });
  el.style.borderColor = 'var(--red)';
  el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name)  { shakeEl(document.getElementById('name'));  return; }
    if (!email) { shakeEl(document.getElementById('email')); return; }

    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';

    await new Promise(r => setTimeout(r, 900));

    contactForm.style.display = 'none';
    formSuccess.style.display = 'flex';

    if (!prefersReducedMotion) {
      gsap.fromTo(formSuccess,
        { opacity: 0, y: 12, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  });
}

/* ============================================================
   SCHEDULE DAY HOVER GLOW
   ============================================================ */
document.querySelectorAll('.schedule-day').forEach(day => {
  day.addEventListener('mouseenter', () => {
    gsap.to(day, { backgroundColor: 'rgba(200,90,54,0.04)', duration: 0.25 });
  });
  day.addEventListener('mouseleave', () => {
    gsap.to(day, { backgroundColor: 'transparent', duration: 0.3 });
  });
});

/* ============================================================
   NBC STRIP — pause on hover
   ============================================================ */
const strip = document.querySelector('.nbc-strip-inner');
if (strip) {
  strip.addEventListener('mouseenter', () => strip.style.animationPlayState = 'paused');
  strip.addEventListener('mouseleave', () => strip.style.animationPlayState = 'running');
}
