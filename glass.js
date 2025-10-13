// glass.js — lightweight interactive glass pane effect
document.addEventListener('DOMContentLoaded', function () {
  // performance guards
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth && window.innerWidth < 600) return; // skip on small screens

  const selectors = ['.card', '.module', '.university-detail', '.compare-section', '.compare-two'];
  let candidates = Array.from(new Set(selectors.flatMap(s => Array.from(document.querySelectorAll(s)))));
  if (!candidates.length) return;

  // We'll only animate elements that are visible (via IntersectionObserver)
  const elements = [];
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        if (!elements.includes(en.target)) elements.push(en.target);
      } else {
        const idx = elements.indexOf(en.target);
        if (idx !== -1) elements.splice(idx, 1);
      }
    });
  }, { threshold: 0.2 });

  candidates.forEach(el => {
    el.classList.add('glass');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--ty', '0px');
    el.style.setProperty('--sheen-x', '50%');
    el.style.setProperty('--sheen-y', '0%');
    io.observe(el);
  });

  // throttle helper
  function throttle(fn, wait) {
    let last = 0;
    let timeout = null;
    return function (...args) {
      const now = Date.now();
      const remaining = wait - (now - last);
      if (remaining <= 0) {
        if (timeout) { clearTimeout(timeout); timeout = null; }
        last = now;
        fn.apply(this, args);
      } else if (!timeout) {
        timeout = setTimeout(() => {
          last = Date.now();
          timeout = null;
          fn.apply(this, args);
        }, remaining);
      }
    };
  }

  const onMove = throttle(function (e) {
    if (!elements.length) return;
    elements.forEach(function (el) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const ry = Math.max(Math.min(dx / r.width * 10, 10), -10);
      const rx = Math.max(Math.min(-dy / r.height * 10, 10), -10);
      el.style.setProperty('--rx', rx + 'deg');
      el.style.setProperty('--ry', ry + 'deg');
      const sx = Math.max(Math.min((dx / r.width) * 50 + 50, 100), 0);
      const sy = Math.max(Math.min((dy / r.height) * 50 + 50, 100), 0);
      el.style.setProperty('--sheen-x', sx + '%');
      el.style.setProperty('--sheen-y', sy + '%');
    });
  }, 40);

  document.addEventListener('mousemove', onMove);

  document.addEventListener('mouseleave', throttle(function () {
    elements.forEach(function (el) {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }, 100));

  // subtle scroll parallax only for visible elements
  window.addEventListener('scroll', throttle(function () {
    const scrollY = window.scrollY || window.pageYOffset;
    elements.forEach(function (el, i) {
      const depth = (i % 6) * 0.04;
      const ty = Math.round(scrollY * depth);
      el.style.setProperty('--ty', ty + 'px');
    });
  }, 80), { passive: true });
});
