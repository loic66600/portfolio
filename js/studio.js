(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let userReduced = false;
  try { userReduced = localStorage.getItem('lorn-reduced-motion') === 'true'; } catch { /* Storage may be unavailable. */ }
  const reduced = () => media.matches || userReduced;
  let motionContext;
  let horizontal;

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

  const scenarios = {
    leads: ['Formulaire', 'Une nouvelle demande', 'CRM à jour', 'Le bon contact, au bon endroit', 'Notification', 'Votre équipe est informée', 'Une demande reçue sur votre site est enregistrée dans votre CRM, puis transmise à votre équipe.'],
    content: ['Votre contenu', 'Une idée à partager', 'Formats adaptés', 'Chaque canal a son format', 'Publication', 'Après votre validation', 'Votre contenu est préparé pour vos différents canaux, puis planifié après votre validation.'],
    product: ['Votre produit', 'Un nouvel utilisateur', 'Bienvenue', 'Un parcours personnalisé', 'Base à jour', 'Les outils sont synchronisés', 'Une inscription déclenche un parcours de bienvenue et synchronise les informations entre vos outils.']
  };
  const scenarioFields = ['flow-source', 'flow-source-sub', 'flow-output-one', 'flow-output-one-sub', 'flow-output-two', 'flow-output-two-sub', 'scenario-description'];
  $$('[data-scenario]').forEach(button => button.addEventListener('click', () => {
    $$('[data-scenario]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    scenarios[button.dataset.scenario].forEach((text, index) => { document.getElementById(scenarioFields[index]).textContent = text; });
    $('.workflow').setAttribute('aria-label', `Exemple : ${scenarios[button.dataset.scenario][6]}`);
    if (!reduced() && window.gsap) gsap.fromTo('.flow-node', { y: 7 }, { y: 0, duration: .5, stagger: .08, ease: 'power3.out', clearProps: 'transform' });
  }));

  // Native horizontal scrolling stays usable with touch, keyboard or without JS.
  const tradeWindow = $('.trade-window');
  if (tradeWindow) {
    const cards = $$('.trade-project', tradeWindow);
    const controls = $('.trade-controls');
    const previous = $('.trade-prev');
    const next = $('.trade-next');
    const position = $('.trade-position');
    let active = 0;
    let frame = 0;
    const offset = index => cards[index].offsetLeft - cards[0].offsetLeft;
    function syncGallery() {
      frame = 0;
      active = cards.reduce((nearest, card, index) => Math.abs(offset(index) - tradeWindow.scrollLeft) < Math.abs(offset(nearest) - tradeWindow.scrollLeft) ? index : nearest, 0);
      previous.disabled = active === 0;
      next.disabled = active === cards.length - 1;
      const label = (active + 1) + ' / ' + cards.length;
      if (position.textContent !== label) position.textContent = label;
    }
    function moveGallery(direction) {
      const target = Math.max(0, Math.min(cards.length - 1, active + direction));
      tradeWindow.scrollTo({ left: offset(target), behavior: reduced() ? 'instant' : 'smooth' });
    }
    controls.hidden = false;
    previous.addEventListener('click', () => moveGallery(-1));
    next.addEventListener('click', () => moveGallery(1));
    tradeWindow.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(syncGallery); }, { passive: true });
    tradeWindow.addEventListener('keydown', event => {
      if (event.target !== tradeWindow || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      moveGallery(event.key === 'ArrowRight' ? 1 : -1);
    });
    let galleryWidth = tradeWindow.clientWidth;
    new ResizeObserver(() => {
      if (tradeWindow.clientWidth === galleryWidth) return;
      galleryWidth = tradeWindow.clientWidth;
      tradeWindow.scrollTo({ left: offset(active), behavior: 'instant' });
      syncGallery();
    }).observe(tradeWindow);
    syncGallery();
  }

  function buildMotion(entrance = false) {
    motionContext?.revert();
    horizontal = null;
    const isReduced = reduced();
    document.documentElement.classList.toggle('motion-reduced', isReduced);
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
        gsap.from('.hero h1>span', { y: 35, opacity: .65, duration: 1.1, stagger: .13, ease: 'expo.out', clearProps: 'transform,opacity' });
        gsap.from('.hero-portrait', { y: 18, duration: 1.1, ease: 'expo.out', clearProps: 'transform' });
      }
      if ($('.portrait-wrap')) gsap.fromTo('.portrait-wrap>img', { y: 14 }, { y: -14, ease: 'none', scrollTrigger: { trigger: '.portrait-wrap', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });
    motionContext.add('(min-width: 900px) and (min-height: 560px)', () => {
      const track = $('.work-track');
      const viewport = $('.work-window');
      const pin = $('.work-pin');
      const section = $('.work-section');
      if (!track || !viewport || !pin || !section) return;
      let distance = 0;
      let active = true;
      section.classList.add('is-horizontal');
      viewport.scrollLeft = 0;
      const update = () => {
        const offset = Math.max(0, Math.min(distance, -section.getBoundingClientRect().top));
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        $('.work-progress>span').style.transform = `scaleX(${.1 + (distance ? offset / distance : 0) * .9})`;
      };
      const layout = () => {
        if (!active) return;
        distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
        section.style.height = `${pin.offsetHeight + distance}px`;
        update();
      };
      horizontal = {
        focusCard(card) {
          const offset = Math.max(0, Math.min(distance, card.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft)));
          window.scrollTo({ top: scrollY + section.getBoundingClientRect().top + offset, behavior: 'instant' });
          update();
        }
      };
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', layout);
      document.addEventListener('visibilitychange', update);
      layout();
      document.fonts.ready.then(layout);
      return () => {
        active = false;
        horizontal = null;
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', layout);
        document.removeEventListener('visibilitychange', update);
        section.classList.remove('is-horizontal');
        section.style.removeProperty('height');
        track.style.removeProperty('transform');
        $('.work-progress>span').style.removeProperty('transform');
      };
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  $('.work-track')?.addEventListener('focusin', event => {
    if (!horizontal) return;
    const card = event.target.closest('.project');
    if (!card) return;
    horizontal.focusCard(card);
  });
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
