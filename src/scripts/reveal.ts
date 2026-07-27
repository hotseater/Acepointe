/**
 * Scroll-reveal + count-up. Progressive enhancement only:
 * - marks <html> as .has-js synchronously (so pre-reveal state applies)
 * - IntersectionObserver adds .is-visible to [data-reveal] as they enter
 * - count-up animates [data-countup] numbers when revealed
 * Respects prefers-reduced-motion (no motion; values shown final).
 */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el: HTMLElement) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const target = parseFloat(el.dataset.countup || '0');
  const decimals = (el.dataset.countup || '').includes('.') ? 1 : 0;
  if (prefersReduced) {
    el.textContent = target.toFixed(decimals);
    return;
  }
  const duration = 1100;
  let start: number | null = null;
  const step = (ts: number) => {
    if (start === null) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    // ease-out-expo
    const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toFixed(decimals);
  };
  requestAnimationFrame(step);
}

function init() {
  const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const countEls = document.querySelectorAll<HTMLElement>('[data-countup]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    countEls.forEach((el) => animateCount(el));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');
        el.querySelectorAll<HTMLElement>('[data-countup]').forEach(animateCount);
        if (el.hasAttribute('data-countup')) animateCount(el);
        obs.unobserve(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  revealEls.forEach((el) => io.observe(el));
  // Count-up elements that aren't themselves reveal targets.
  countEls.forEach((el) => {
    if (!el.closest('[data-reveal]')) io.observe(el);
  });

  // Failsafe: never let JS-gated content stay hidden if IO silently never fires
  // (headless renderers, OG screenshotters). Reveals anything still hidden.
  window.setTimeout(() => {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    countEls.forEach((el) => {
      if (!el.dataset.counted) animateCount(el);
    });
  }, 3500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
