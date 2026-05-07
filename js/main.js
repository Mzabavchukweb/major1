/* ============================================================
   Major1 Redesign — main.js
   Custom video player · lazy-load · mobile menu placeholder
   Vanilla JS, zero deps.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1) Custom video player ---------- */
  function initVipPlayer(video) {
    const wrap = video.closest('.vip-film__media');
    if (!wrap) return;
    const playBtn  = wrap.querySelector('.vip-play-btn');
    const progress = wrap.querySelector('.vip-progress');
    const bar      = wrap.querySelector('.vip-progress__bar');

    function togglePlay() {
      if (video.paused) {
        // user-initiated play → unmute (user accepts audio)
        video.muted = false;
        video.play().catch(function () {
          // browser blocked audio play → fallback to muted
          video.muted = true;
          video.play().catch(function () {});
        });
      } else {
        video.pause();
      }
    }
    function syncPlayState() {
      wrap.classList.toggle('is-playing', !video.paused);
      if (playBtn) playBtn.setAttribute('aria-label', video.paused ? 'Odtwórz' : 'Pauza');
    }

    video.addEventListener('click', togglePlay);
    if (playBtn) playBtn.addEventListener('click', function (e) { e.stopPropagation(); togglePlay(); });
    video.addEventListener('play',  syncPlayState);
    video.addEventListener('pause', syncPlayState);
    video.addEventListener('ended', function () { video.currentTime = 0; syncPlayState(); });

    video.addEventListener('timeupdate', function () {
      if (!video.duration) return;
      var pct = (video.currentTime / video.duration) * 100;
      if (bar) bar.style.width = pct + '%';
    });
    if (progress) {
      progress.addEventListener('click', function (e) {
        if (!video.duration) return;
        var rect = progress.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        video.currentTime = video.duration * Math.max(0, Math.min(1, pct));
      });
    }
    syncPlayState();
  }

  /* ---------- 2) Lazy-load videos via IntersectionObserver ---------- */
  function initLazyVideos() {
    var videos = document.querySelectorAll('video[data-src]');
    if (!videos.length) return;

    function load(video) {
      if (video.src) return;
      video.src = video.dataset.src;
      video.load();
    }

    if (!('IntersectionObserver' in window)) {
      videos.forEach(load);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          load(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });

    videos.forEach(function (v) { io.observe(v); });
  }

  /* ---------- 3) Hamburger + side-nav ---------- */
  function initHamburger() {
    var toggles = document.querySelectorAll('[data-menu-toggle]');
    var hamburger = document.querySelector('.hamburger');
    var nav = document.querySelector('.side-nav');
    var backdrop = document.querySelector('[data-menu-close]');
    if (!toggles.length || !nav) return;

    function setOpen(open) {
      if (hamburger) {
        hamburger.classList.toggle('is-open', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      nav.classList.toggle('is-open', open);
      nav.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('is-menu-open', open);
    }

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setOpen(!nav.classList.contains('is-open'));
      });
    });
    if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- 4) Header scroll transform ---------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var threshold = 50;

    function onScroll() {
      if (window.scrollY > threshold) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on init in case page loaded scrolled
  }

  /* ---------- 5) Hero stats count-up animation ---------- */
  function initHeroCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseInt(el.dataset.countTo, 10);
      if (isNaN(target)) return;
      var suffix = el.textContent.includes('+') ? '+' : '';
      var duration = 1600;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease-out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }

      el.textContent = '0' + suffix;
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      // no animation fallback — leave default text
      return;
    }

    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { io.observe(el); });
  }

  /* ---------- 6) Phone widget — always visible (no JS toggle needed) ---------- */

  /* ---------- 7) Dynamic footer year ---------- */
  function initDynamicYear() {
    var els = document.querySelectorAll('.js-year');
    var year = new Date().getFullYear();
    els.forEach(function (el) { el.textContent = year; });
  }

  /* ---------- bootstrap ---------- */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    document.querySelectorAll('video[data-vip-player]').forEach(initVipPlayer);
    initLazyVideos();
    initHamburger();
    initHeaderScroll();
    initHeroCounters();
    initDynamicYear();
  });
})();
