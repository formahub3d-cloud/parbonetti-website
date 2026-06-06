/*!
 * animations.js — Dott. Giovanni Parbonetti Website
 * Puro vanilla JS — zero dipendenze esterne
 */
(function () {
  'use strict';

  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── HELPER ───────────────────────────────────────────────────────── */
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }
  function easeInQuad(t) { return t * t; }
  function prog(p, s, e) { return clamp01((p - s) / (e - s)); }

  /* ─── SCROLL PROGRESS BAR ──────────────────────────────────────────── */
  const progressBar = document.querySelector('.scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
  }

  /* ─── NAVBAR ───────────────────────────────────────────────────────── */
  let lastScrollY = 0;
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);
    if (!noMotion) {
      navbar.style.transform = (y > lastScrollY && y > 100) ? 'translateY(-100%)' : 'translateY(0)';
    }
    lastScrollY = y;
  }

  /* ─── LOGO MORPH SCROLL SCENE ──────────────────────────────────────── */
  function updateMorph() {
    const scene = document.querySelector('.morph-scene');
    if (!scene) return;

    const rect  = scene.getBoundingClientRect();
    const total = scene.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const p = clamp01(-rect.top / total);

    const logo   = scene.querySelector('.morph-logo-big');
    const circle = scene.querySelector('.morph-circle');
    const line1  = scene.querySelector('.morph-line1');
    const line2  = scene.querySelector('.morph-line2');
    const photo  = scene.querySelector('.morph-photo-frame');
    const stats  = scene.querySelectorAll('.morph-mini-stats .ms');

    /* Fase 1 – logo si espande e cerchio riempie lo schermo (rapida) */
    if (logo) {
      const lp = prog(p, 0, 0.28);
      logo.style.transform = `scale(${lerp(1, 7, easeInQuad(lp))})`;
      logo.style.opacity   = String(lerp(1, 0, lp));
    }
    if (circle) {
      const cp = prog(p, 0, 0.30);
      circle.style.transform = `scale(${lerp(0, 30, easeInQuad(cp))})`;
      circle.style.opacity   = String(lerp(0, 1, cp));
    }

    /* Fase 2 – testo appare subito dopo il riempimento */
    if (line1) {
      const lp = prog(p, 0.24, 0.40);
      line1.style.opacity   = String(lp);
      line1.style.transform = `translateY(${lerp(40, 0, lp)}px)`;
    }
    if (line2) {
      const lp = prog(p, 0.30, 0.46);
      line2.style.opacity   = String(lp);
      line2.style.transform = `translateY(${lerp(20, 0, lp)}px)`;
    }

    /* Fase 3 – foto e statistiche, in rapida successione (riempiono lo schermo) */
    if (photo) {
      const lp = prog(p, 0.38, 0.56);
      photo.style.opacity   = String(lp);
      photo.style.transform = `scale(${lerp(0.92, 1, lp)})`;
    }
    stats.forEach(function (st, i) {
      const lp = prog(p, 0.50 + i * 0.05, 0.66 + i * 0.04);
      st.style.opacity   = String(lp);
      st.style.transform = `translateY(${lerp(14, 0, lp)}px)`;
    });
    /* Dalla fase ~0.74 in poi la composizione resta piena fino a fine scena. */
  }

  /* ─── SCROLL HANDLER (throttle con requestAnimationFrame) ──────────── */
  var ticking = false;
  function onScroll() {
    if (ticking) { return; }
    ticking = true;
    requestAnimationFrame(function () {
      updateProgress();
      updateNavbar();
      if (!noMotion) updateMorph();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ─── INTERSECTION OBSERVER – SCROLL REVEALS ───────────────────────── */
  if (!noMotion) {
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    function staggerGroup(parentSel, childSel) {
      document.querySelectorAll(parentSel).forEach(function (parent) {
        parent.querySelectorAll(childSel).forEach(function (item, i) {
          item.classList.add('fade-in');
          item.style.transitionDelay = (i * 0.08) + 's';
          revealObs.observe(item);
        });
      });
    }

    staggerGroup('.stats-grid',        '.stat-card');
    staggerGroup('.patologie-grid',    '.patologia-card');
    staggerGroup('.tech-grid',         '.tech-item');
    staggerGroup('.testimonials-grid', '.testimonial-card');
    staggerGroup('.articoli-grid',     '.articolo-card');
    staggerGroup('.strutture-grid',    '.struttura-card');
    staggerGroup('.video-grid',        '.video-card, .video-external');
    staggerGroup('.about-highlights',  '.highlight-item');

    /* Section headers */
    document.querySelectorAll('.section-header').forEach(function (el) {
      el.classList.add('fade-in');
      revealObs.observe(el);
    });

    /* About columns */
    var aboutImg = document.querySelector('.about-image');
    var aboutCnt = document.querySelector('.about-content');
    if (aboutImg) { aboutImg.classList.add('fade-in', 'fade-left');  revealObs.observe(aboutImg); }
    if (aboutCnt) { aboutCnt.classList.add('fade-in', 'fade-right'); revealObs.observe(aboutCnt); }

    /* CTA */
    document.querySelectorAll('.cta-band .container').forEach(function (el) {
      el.classList.add('fade-in');
      revealObs.observe(el);
    });

    /* Contatti */
    document.querySelectorAll('.contact-form, .contact-info').forEach(function (el) {
      el.classList.add('fade-in');
      revealObs.observe(el);
    });

    /* Page hero inner pages */
    document.querySelectorAll('.breadcrumb, .page-hero h1, .page-hero p').forEach(function (el, i) {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i * 0.10) + 's';
      revealObs.observe(el);
    });
  }

  /* ─── CONTATORI ────────────────────────────────────────────────────── */
  var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      counterObs.unobserve(entry.target);
      var el     = entry.target;
      var target = +el.dataset.target;
      var suffix = (el.dataset.suffix != null) ? el.dataset.suffix : '+';
      var start  = performance.now();
      var dur    = 1800;
      function tick(now) {
        var t    = Math.min((now - start) / dur, 1);
        var ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * ease) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
    counterObs.observe(el);
  });

  /* ─── MAGNETIC BUTTONS ──────────────────────────────────────────────── */
  if (!noMotion) {
    document.querySelectorAll('.btn-green, .btn-primary').forEach(function (btn) {
      var cx = 0, cy = 0, raf;
      btn.addEventListener('mousemove', function (e) {
        var r  = btn.getBoundingClientRect();
        var tx = (e.clientX - r.left  - r.width  / 2) * 0.22;
        var ty = (e.clientY - r.top   - r.height / 2) * 0.22;
        cx = tx; cy = ty;
        btn.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        function ease() {
          cx *= 0.78; cy *= 0.78;
          btn.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
          if (Math.abs(cx) > 0.2 || Math.abs(cy) > 0.2) raf = requestAnimationFrame(ease);
          else btn.style.transform = '';
        }
        cancelAnimationFrame(raf);
        ease();
      });
    });
  }

  /* ─── INIT ──────────────────────────────────────────────────────────── */
  updateProgress();
  updateNavbar();
  if (!noMotion) updateMorph();

})();
