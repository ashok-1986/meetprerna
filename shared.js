/* ═══════════════════════════════════════════════════════════
   MEETPRERNA.COM — SHARED JAVASCRIPT
   Lenis · GSAP · ScrollTrigger · Cursor · Loader · Nav
   ═══════════════════════════════════════════════════════════ */

// ── LENIS SMOOTH SCROLL ──────────────────────────────────────
function initLenis() {
  const lenis = new Lenis({
    duration: 1.3,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.85,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

// ── CUSTOM CURSOR ────────────────────────────────────────────
function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' });
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    gsap.set(ring, { x: rx, y: ry });
  });

  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
    });
  });

  document.addEventListener('mousedown', () => {
    dot.classList.add('is-clicking');
    ring.classList.add('is-clicking');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('is-clicking');
    ring.classList.remove('is-clicking');
  });
}

// ── PAGE LOADER ──────────────────────────────────────────────
function initLoader(onComplete) {
  const loader = document.querySelector('.loader');
  if (!loader) { onComplete && onComplete(); return; }

  const wordEl = loader.querySelector('.loader-word span');
  const fill   = loader.querySelector('.loader-fill');

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        yPercent: -100, duration: 0.9,
        ease: 'expo.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          onComplete && onComplete();
        }
      });
    }
  });

  tl.to(wordEl, { y: '0%', duration: 0.7, ease: 'expo.out', delay: 0.1 })
    .to(fill,   { width: '100%', duration: 1.1, ease: 'expo.inOut' }, 0.2)
    .to(wordEl, { opacity: 0, duration: 0.3 }, '-=0.1');
}

// ── NAV SCROLL BEHAVIOUR ─────────────────────────────────────
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 100,
    onEnter:      () => nav.classList.add('scrolled'),
    onLeaveBack:  () => nav.classList.remove('scrolled'),
  });

  // Active link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace('.html',''))) {
      a.classList.add('active');
    }
    if (path === '/' && a.getAttribute('href') === 'index.html') {
      a.classList.add('active');
    }
  });

  // Hamburger
  const burger = document.querySelector('.nav-hamburger');
  const drawer = document.querySelector('.nav-drawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const spans = burger.querySelectorAll('span');
      if (drawer.classList.contains('open')) {
        gsap.to(spans[0], { rotate: 45, y: 6, duration: .3 });
        gsap.to(spans[1], { opacity: 0, duration: .2 });
        gsap.to(spans[2], { rotate: -45, y: -6, duration: .3 });
      } else {
        gsap.to(spans, { rotate: 0, y: 0, opacity: 1, duration: .3 });
      }
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => drawer.classList.remove('open'));
    });
  }
}

// ── SCROLL REVEALS ───────────────────────────────────────────
function initReveals() {
  const defaults = { ease: 'expo.out', duration: 1.1 };

  document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, ...defaults,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  document.querySelectorAll('.reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, ...defaults,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  document.querySelectorAll('.reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, ...defaults,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  document.querySelectorAll('.reveal-scale').forEach(el => {
    gsap.to(el, {
      opacity: 1, scale: 1, ...defaults,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // Stagger children with class .stagger-parent
  document.querySelectorAll('.stagger-parent').forEach(parent => {
    const kids = parent.querySelectorAll('.stagger-child');
    gsap.to(kids, {
      opacity: 1, y: 0, duration: 1, ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: parent, start: 'top 85%', once: true }
    });
  });
}

// ── PARALLAX IMAGES ──────────────────────────────────────────
function initParallax() {
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
}

// ── HORIZONTAL MARQUEE PAUSE ON HOVER (already in CSS) ───────

// ── INIT ALL ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  initCursor();
  initLoader(() => {
    const lenis = initLenis();
    initNav();
    initReveals();
    initParallax();
    // Page-specific init hook
    if (typeof pageInit === 'function') pageInit(lenis);
  });
});
