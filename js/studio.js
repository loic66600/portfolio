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
  let sculpture;

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
    sculpture?.setMotion(!isReduced);
    if (!window.gsap || !window.ScrollTrigger || isReduced) return;
    gsap.registerPlugin(ScrollTrigger);
    motionContext = gsap.matchMedia();
    motionContext.add('all', () => {
      if (entrance && $('.hero-copy')) {
        gsap.from('.hero h1>span', { y: 35, opacity: .65, duration: 1.1, stagger: .13, ease: 'expo.out', clearProps: 'transform,opacity' });
        gsap.from('.hero-art', { rotation: -12, scale: .9, duration: 1.8, ease: 'expo.out', clearProps: 'transform' });
      }
      if ($('.portrait-wrap')) gsap.fromTo('.portrait-wrap>img', { y: 14 }, { y: -14, ease: 'none', scrollTrigger: { trigger: '.portrait-wrap', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      if ($('#sculpture')) gsap.to('#sculpture', { rotation: 12, y: 35, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
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

  // A parametric torus-knot rendered as a depth-sorted copper wire sculpture.
  // No external model, video, WebGL context or render service is required.
  function createSculpture(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    let width = 0, height = 0, raf = 0, last = 0, phase = .25;
    let visible = false, moving = !reduced(), mouseX = 0, mouseY = 0;
    const rings = [];
    const ringCount = 150, sections = 50;
    const center = u => {
      const radius = 1.5 + .47 * Math.cos(3 * u);
      return [radius * Math.cos(2 * u), radius * Math.sin(2 * u), .64 * Math.sin(3 * u)];
    };
    for (let i = 0; i < ringCount; i++) {
      const u = i / ringCount * Math.PI * 2;
      const c = center(u), next = center(u + .001);
      const tangent = next.map((v, j) => v - c[j]);
      const length = Math.hypot(...tangent);
      const t = tangent.map(v => v / length);
      const n = [Math.cos(2 * u), Math.sin(2 * u), 0];
      const b = [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
      const bLength = Math.hypot(...b);
      for (let j = 0; j < 3; j++) b[j] /= bLength;
      const points = [];
      for (let j = 0; j <= sections; j++) {
        const v = j / sections * Math.PI * 2;
        points.push(c.map((value, k) => value + .36 * (Math.cos(v) * n[k] + Math.sin(v) * b[k])));
      }
      rings.push(points);
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      const ax = .85 + Math.sin(phase * .5) * .14 + mouseY * .12;
      const ay = phase * .3 + mouseX * .15;
      const az = -.5;
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay), cz = Math.cos(az), sz = Math.sin(az);
      const rotate = ([x, y, z]) => {
        const y1 = y * cx - z * sx, z1 = y * sx + z * cx;
        const x2 = x * cy + z1 * sy, z2 = -x * sy + z1 * cy;
        return [x2 * cz - y1 * sz, x2 * sz + y1 * cz, z2];
      };
      const scale = Math.min(width, height) * .204;
      const projected = rings.map(points => {
        const vertices = points.map(rotate);
        return { vertices, z: vertices.reduce((sum, v) => sum + v[2], 0) / vertices.length };
      }).sort((a, b) => a.z - b.z);
      for (const ring of projected) {
        const light = Math.max(0, Math.min(1, (ring.z + 2.2) / 4.4));
        ctx.beginPath();
        ring.vertices.forEach(([x,y,z], index) => {
          const perspective = 7 / (7 - z);
          const px = width * .5 + x * scale * perspective;
          const py = height * .47 + y * scale * perspective;
          if (index === 0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        });
        ctx.closePath();
        ctx.fillStyle = `rgba(23,25,22,${.4 + light * .5})`;
        ctx.fill();
        ctx.strokeStyle = `rgb(${Math.round(145 + light * 110)},${Math.round(47 + light * 142)},${Math.round(20 + light * 99)})`;
        ctx.lineWidth = .65 + light * .75;
        ctx.stroke();
      }
    }
    function tick(time) {
      raf = 0;
      if (!visible || document.hidden || !moving) return;
      if (time - last > 32) {
        phase += Math.min(time - last, 50) * .00038;
        last = time;
        draw();
      }
      raf = requestAnimationFrame(tick);
    }
    function sync() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (visible && !document.hidden && moving) { last = performance.now(); raf = requestAnimationFrame(tick); }
      else draw();
    }
    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      draw();
    }
    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0 }).observe(canvas);
    canvas.parentElement.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !moving) return;
      const bounds = canvas.getBoundingClientRect();
      mouseX = (event.clientX - bounds.left) / width - .5;
      mouseY = (event.clientY - bounds.top) / height - .5;
    });
    canvas.parentElement.addEventListener('pointerleave', () => { mouseX = mouseY = 0; });
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pagehide', () => { if (raf) cancelAnimationFrame(raf); });
    window.addEventListener('pageshow', sync);
    resize();
    return { setMotion(value) { moving = value; sync(); } };
  }
  if ($('#sculpture')) sculpture = createSculpture($('#sculpture'));
  buildMotion(true);

  // Keep the existing Web3Forms integration; feedback never claims success before a real response.
  $$('.js-contact-form').forEach(form => {
    const type = new URLSearchParams(location.search).get('projet');
    if (type === 'automatisation' && $('[name=subject]', form)) $('[name=subject]', form).value = 'Automatisation & no-code';
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
