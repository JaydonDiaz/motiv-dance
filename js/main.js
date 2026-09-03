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
      { opacity: 1, y: 0, duration: 0.6 }, 1.2);

  /* Hero background subtle drift */
  gsap.to('.hero-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
} else {
  gsap.set(['.hero-badge', '.hero-line-inner', '.hero-sub', '.hero-actions'],
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
   CLASS REGISTRATION FORM (classes.html)
   ============================================================ */
const registerForm    = document.getElementById('register-form');
const registerSuccess = document.getElementById('register-success');
const registerSubmit  = document.getElementById('register-submit');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    if (!name)  { shakeEl(document.getElementById('reg-name'));  return; }
    if (!email) { shakeEl(document.getElementById('reg-email')); return; }

    registerSubmit.disabled = true;
    registerSubmit.querySelector('.btn-text').textContent = 'Reserving…';

    await new Promise(r => setTimeout(r, 900));

    registerForm.style.display = 'none';
    registerSuccess.style.display = 'flex';

    if (!prefersReducedMotion) {
      gsap.fromTo(registerSuccess,
        { opacity: 0, y: 12, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  });
}

/* ============================================================
   WEEKLY SCHEDULE GRID — staggered reveal (classes.html)
   ============================================================ */
ScrollTrigger.create({
  trigger: '.schedule-grid',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.schedule-col',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
    );
  },
});

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

/* ============================================================
   INSTRUCTOR OVERLAY — click a card in the marquee to see their
   experience and a short bio, with a link through to the full
   instructor roster page.
   ============================================================ */
const INSTRUCTORS = [
  {
    name: 'Vinh Nguyen',
    cred: 'Kinjaz',
    img: 'https://images.squarespace-cdn.com/content/v1/5572081fe4b055140a090d13/1538967996439-1P4KEF4XL8MVYVWFHGDV/vinh+nguyen.jpg',
    experience: '10+ Years Teaching',
    bio: 'A member of the internationally recognized dance company Kinjaz, Vinh brings sharp, high-precision choreography and years of competitive stage experience to every class. Expect fast combos, clean lines, and a relentless focus on musicality.',
  },
  {
    name: 'Mike Song',
    cred: 'Kinjaz',
    img: 'https://images.squarespace-cdn.com/content/v1/5572081fe4b055140a090d13/1539817019469-XLBL1ZNETWL2ZJKYDT2U/Mike-Song-1-750x658.jpg',
    experience: '12+ Years Teaching',
    bio: 'One of the most sought-after choreographers to come out of the Kinjaz movement, Mike blends technical hip-hop foundations with big, performance-ready choreography. His classes push dancers to perform every combo like it’s for an audience.',
  },
  {
    name: 'Megan Batoon',
    cred: 'Choreographer',
    img: 'https://images.squarespace-cdn.com/content/v1/5572081fe4b055140a090d13/1539814395330-1GPRFFDIYRM47FQGYVCN/21150303_10209973033898158_5993305855445508246_n.jpg',
    experience: '8+ Years Teaching',
    bio: 'A YouTube choreographer and content creator with a large online following, Megan is known for musicality-driven routines and an infectious teaching energy. Her classes are equal parts technique drill and full-out performance.',
  },
  {
    name: 'Matt Steffanina',
    cred: 'YouTube Sensation',
    img: 'https://images.squarespace-cdn.com/content/v1/5572081fe4b055140a090d13/1539814599815-7Z15RTSQ2Q8BMRX63BN9/Matt+Steffanina.jpg',
    experience: '15+ Years Teaching',
    bio: 'One of the most-followed hip-hop choreographers online, Matt has built a career teaching dancers of every level through viral tutorials and packed studio classes. Expect clean choreography, clear breakdowns, and routines built to be shared.',
  },
  {
    name: 'Janelle Ginestra',
    cred: 'World of Dance',
    img: 'https://images.squarespace-cdn.com/content/v1/5572081fe4b055140a090d13/1539814738288-B00PHCHA22XGVYJO963R/Janelle-Ginestra-1.jpg',
    experience: '15+ Years Teaching',
    bio: 'A World of Dance mentor and founder of her own dance company, Janelle is known for emotionally driven choreography and a teaching style that pushes dancers to perform with intention, not just execute steps.',
  },
  {
    name: 'Sienna Lalau',
    cred: 'World of Dance',
    img: 'https://images.squarespace-cdn.com/content/v1/5572081fe4b055140a090d13/1538969273890-ZN2QF3GQ6M1PB15RK6LM/Screenshot_20180822-143100.jpg',
    experience: '9+ Years Teaching',
    bio: 'A World of Dance alum with a reputation for sharp, detail-obsessed choreography, Sienna’s classes emphasize control, texture, and hitting every count with full commitment.',
  },
  {
    name: 'Josh Price',
    cred: 'Choreographer',
    img: 'https://images.squarespace-cdn.com/content/v1/5572081fe4b055140a090d13/1539817387724-7PKAUJJ4YD39TBAID6GC/Josh+Price.jpg',
    experience: '7+ Years Teaching',
    bio: 'A versatile choreographer known for blending hip-hop fundamentals with contemporary movement quality, Josh’s classes focus on building strong technical foundations dancers can carry into any style.',
  },
  {
    name: 'Anthony Lee',
    cred: 'Kinjaz',
    img: 'https://images.squarespace-cdn.com/content/v1/5572081fe4b055140a090d13/1538970284281-PKL16NFN9OHMJCF6QUHJ/tRf1n8G2_400x400.jpg',
    experience: '10+ Years Teaching',
    bio: 'A Kinjaz member with a background in both competition and commercial work, Anthony teaches high-energy choreography with an emphasis on musicality and stage presence.',
  },
];

(function () {
  const overlay = document.getElementById('instructor-overlay');
  if (!overlay) return;

  const ioImg      = document.getElementById('io-img');
  const ioCred     = document.getElementById('io-cred');
  const ioName     = document.getElementById('io-name');
  const ioExp      = document.getElementById('io-exp');
  const ioDesc     = document.getElementById('io-desc');
  const ioClose    = document.getElementById('instructor-overlay-close');
  const ioBackdrop = document.getElementById('instructor-overlay-backdrop');

  function openInstructor(data) {
    ioImg.src = data.img;
    ioImg.alt = data.name;
    ioCred.textContent = data.cred;
    ioName.textContent = data.name;
    ioExp.textContent = data.experience;
    ioDesc.textContent = data.bio;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeInstructor() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.instructor-card').forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.instructor-name')?.textContent.trim();
      const data = INSTRUCTORS.find((i) => i.name === name);
      if (data) openInstructor(data);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  ioClose.addEventListener('click', closeInstructor);
  ioBackdrop.addEventListener('click', closeInstructor);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeInstructor();
  });
})();

/* ============================================================
   INSTRUCTORS PAGE — staggered reveal (instructors.html)
   ============================================================ */
ScrollTrigger.create({
  trigger: '.instructors-grid',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.instructor-tile',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
    );
  },
});

/* ============================================================
   THEME TOGGLE
   ============================================================ */
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'motiv-theme';

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }

  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = currentTheme() === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      applyTheme(next);
      document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
    });
  });
})();
