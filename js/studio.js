(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let userReduced = false;
  try { userReduced = localStorage.getItem('lorn-reduced-motion') === 'true'; } catch { /* Storage may be unavailable. */ }
  const reduced = () => media.matches || userReduced;
  let motionContext;

  // The native scroll and cursor remain available throughout the experience.
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  function closeMenu(returnFocus = false) {
    nav?.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (menu) $('span', menu).textContent = 'Menu';
    if (returnFocus) menu?.focus();
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    $('span', menu).textContent = open ? 'Fermer' : 'Menu';
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (!nav?.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeMenu(true);
    if (event.key === 'Tab') {
      const items = [...$$('a', nav), menu];
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); menu.focus(); }
      else if (!event.shiftKey && document.activeElement === menu) { event.preventDefault(); items[0].focus(); }
    }
  });
  matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  // Both galleries follow page scroll without intercepting wheel or touch input.
  // The default CSS remains readable when motion is reduced or JS is absent.
  function horizontalChapter(sectionSelector, prefix, cardSelector) {
    const section = $(sectionSelector);
    if (!section) return () => {};
    const track = $('.' + prefix + '-track', section);
    const viewport = $('.' + prefix + '-window', section);
    const pin = $('.' + prefix + '-pin', section);
    const progress = $('.' + prefix + '-progress>span', section);
    const position = $('.' + prefix + '-position', section);
    const cards = $$(cardSelector, track);
    let distance = 0;
    let active = true;
    section.classList.add('is-horizontal');
    viewport.scrollLeft = 0;
    const cardOffset = card => card.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft);
    const update = () => {
      const offset = Math.max(0, Math.min(distance, -section.getBoundingClientRect().top));
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      if (progress) progress.style.transform = `scaleX(${.1 + (distance ? offset / distance : 0) * .9})`;
      if (position) {
        const index = cards.reduce((nearest, card, current) => Math.abs(cardOffset(card) - offset) < Math.abs(cardOffset(cards[nearest]) - offset) ? current : nearest, 0);
        const label = `${index + 1} / ${cards.length}`;
        if (position.textContent !== label) position.textContent = label;
      }
    };
    const layout = () => {
      if (!active) return;
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = `${pin.offsetHeight + distance}px`;
      update();
    };
    const focusCard = event => {
      const card = event.target.closest(cardSelector);
      if (!card) return;
      // Focusing an offscreen link can scroll the browser's clipped viewport.
      viewport.scrollLeft = 0;
      const offset = Math.max(0, Math.min(distance, cardOffset(card)));
      window.scrollTo({ top: scrollY + section.getBoundingClientRect().top + offset, behavior: 'instant' });
      update();
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', layout);
    document.addEventListener('visibilitychange', update);
    track.addEventListener('focusin', focusCard);
    layout();
    document.fonts.ready.then(layout);
    return () => {
      active = false;
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', layout);
      document.removeEventListener('visibilitychange', update);
      track.removeEventListener('focusin', focusCard);
      section.classList.remove('is-horizontal');
      section.style.removeProperty('height');
      track.style.removeProperty('transform');
      progress?.style.removeProperty('transform');
      viewport.scrollLeft = 0;
    };
  }

  function buildMotion(entrance = false) {
    motionContext?.revert();
    const isReduced = reduced();
    document.documentElement.classList.toggle('motion-reduced', isReduced);
    document.dispatchEvent(new CustomEvent('lorn:motionchange', { detail: { reduced: isReduced } }));
    $$('.motion-toggle').forEach(button => {
      button.setAttribute('aria-pressed', String(isReduced));
      button.textContent = media.matches ? 'Animations réduites (système)' : isReduced ? 'Activer les animations' : 'Réduire les animations';
      button.disabled = media.matches;
    });
    if (!window.gsap || !window.ScrollTrigger || isReduced) return;
    gsap.registerPlugin(ScrollTrigger);
    motionContext = gsap.matchMedia();
    motionContext.add('all', () => {
      if (entrance && $('.hero-copy')) {
        gsap.from('.hero h1', { y: 35, opacity: .65, duration: 1.1, ease: 'expo.out', clearProps: 'transform,opacity' });
        gsap.from('.hero-portrait img', { opacity: .65, duration: 1.4, ease: 'expo.out', clearProps: 'opacity' });
      }
      if ($('.portrait-wrap')) gsap.fromTo('.portrait-wrap>img', { y: 14 }, { y: -14, ease: 'none', scrollTrigger: { trigger: '.portrait-wrap', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });
    motionContext.add('(min-width: 801px)', () => {
      if (!$('.hero--panorama')) return;
      const scene = gsap.timeline({ scrollTrigger: { trigger: '.hero--panorama', start: 'top top', end: 'bottom top', scrub: 1 } });
      scene.to('.hero--panorama h1>span:last-child', { x: () => innerWidth * .055, y: -24, ease: 'none' }, 0)
        .to('.hero--panorama .hero-portrait img', { y: 55, ease: 'none' }, 0)
        .to('.hero-disciplines', { '--hero-progress': 1, ease: 'none' }, 0);
    });
    motionContext.add('(min-width: 900px) and (min-height: 560px)', () => {
      const clearWork = horizontalChapter('.work-section', 'work', '.project');
      const clearTrades = horizontalChapter('.trade-scroll', 'trade', '.trade-project');
      return () => { clearWork(); clearTrades(); };
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  $$('.motion-toggle').forEach(button => button.addEventListener('click', () => {
    userReduced = !userReduced;
    try { localStorage.setItem('lorn-reduced-motion', String(userReduced)); } catch { /* Keep the current preference for this page. */ }
    buildMotion();
  }));
  media.addEventListener('change', () => buildMotion());

  buildMotion(true);

  // Keep the existing Web3Forms integration; feedback never claims success before a real response.
  $$('.js-contact-form').forEach(form => {
    const type = new URLSearchParams(location.search).get('projet');
    if (type === 'automatisation' && $('[name=subject]', form)) $('[name=subject]', form).value = 'Automatisation & no-code';
    if (type === 'application' && $('[name=subject]', form)) $('[name=subject]', form).value = 'Application web ou mobile';
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const button = $('[type=submit]', form);
      const status = $('.contact-form-status', form);
      const label = $('.contact-submit-label', form);
      const loading = $('.contact-submit-loading', form);
      if (button.disabled) return;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      status.className = 'contact-form-status';
      status.textContent = '';
      label.hidden = true; loading.hidden = false;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error('Submission rejected');
        form.reset();
        status.classList.add('is-success');
        status.textContent = 'Votre message a bien été envoyé. Merci, je reviens vers vous rapidement.';
      } catch {
        status.classList.add('is-error');
        status.textContent = 'L’envoi n’a pas abouti. Réessayez ou écrivez à loic.rossignol66@gmail.com. Votre message est conservé dans le formulaire.';
      } finally {
        clearTimeout(timeout);
        button.disabled = false;
        button.removeAttribute('aria-busy');
        label.hidden = false; loading.hidden = true;
      }
    });
  });
})();
