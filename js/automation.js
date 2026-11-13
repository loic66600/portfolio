(() => {
  'use strict';
  const lab = document.querySelector('[data-automation-lab]');
  if (!lab) return;
  const $ = selector => lab.querySelector(selector);
  const buttons = [...lab.querySelectorAll('[data-scenario]')];
  const compact = matchMedia('(max-width: 650px)');
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = systemMotion.matches || document.documentElement.classList.contains('motion-reduced');
  let paused = false;
  let visible = false;
  let timeline;
  let active = 'leads';
  const icons = {
    form: '<rect x="5" y="3" width="22" height="26" rx="3"/><path d="M10 10h12M10 16h12M10 22h6"/>',
    filter: '<path d="M4 6h24L19 17v9l-6 3V17z"/>',
    engine: '<circle cx="6" cy="16" r="3"/><circle cx="26" cy="6" r="3"/><circle cx="26" cy="26" r="3"/><path d="M9 16h7l7-10M16 16l7 10"/>',
    database: '<ellipse cx="16" cy="7" rx="11" ry="4"/><path d="M5 7v18c0 5 22 5 22 0V7M5 16c0 5 22 5 22 0"/>',
    bell: '<path d="M6 22h20l-3-6v-5a7 7 0 0 0-14 0v5zM12 27h8"/>',
    edit: '<path d="m7 23 2-7L22 3l7 7-13 13zM18 7l7 7M4 29h24"/>',
    check: '<circle cx="16" cy="16" r="12"/><path d="m10 16 4 4 8-9"/>',
    post: '<rect x="4" y="4" width="24" height="24" rx="3"/><path d="M9 10h14M9 16h14M9 22h8"/>',
    image: '<rect x="3" y="5" width="26" height="22" rx="3"/><circle cx="11" cy="12" r="2"/><path d="m4 24 8-7 5 4 5-8 7 11"/>',
    mail: '<rect x="3" y="6" width="26" height="20" rx="3"/><path d="m4 8 12 10L28 8"/>',
    user: '<circle cx="16" cy="10" r="6"/><path d="M5 29v-3a11 11 0 0 1 22 0v3"/>',
    app: '<rect x="7" y="2" width="18" height="28" rx="4"/><path d="M12 6h8M14 26h4"/>'
  };
  // Coordinates belong to the diagram, independently of screen pixels.
  const node = (title, sub, icon, x, y, mx, my, core = false) => ({title, sub, icon, x, y, mx, my, core});
  const scenarios = {
    leads: {
      title: 'Une demande. Les bonnes actions.',
      description: 'Une demande reçue sur votre site est qualifiée, enregistrée dans votre CRM et transmise à votre équipe.',
      stages: ['Recevoir', 'Qualifier', 'Transmettre'],
      nodes: [node('Formulaire', 'Nouvelle demande', 'form', 85, 195, 200, 50), node('Qualification', 'Trier les besoins', 'filter', 310, 195, 200, 200), node('n8n / Make', 'Orchestrer les actions', 'engine', 550, 195, 200, 355, true), node('CRM à jour', 'Le contact est enregistré', 'database', 850, 90, 95, 555), node('Équipe informée', 'La demande est transmise', 'bell', 850, 300, 305, 555)],
      edges: [[0,1,.4],[1,2,1.7],[2,3,3.1],[2,4,3.5]],
      beats: [[0,0],[1,1.6],[2,3.1]], duration: 6.4
    },
    content: {
      title: 'Une idée. Plusieurs façons de rayonner.',
      description: 'Votre idée est déclinée en plusieurs formats. Votre validation précède la planification sur chaque canal.',
      stages: ['Décliner', 'Valider', 'Planifier'],
      nodes: [node('Votre idée', 'Un contenu de départ', 'edit', 80, 195, 200, 50), node('n8n / Make', 'Adapter les formats', 'engine', 310, 195, 200, 205, true), node('Votre validation', 'Vous gardez la main', 'check', 570, 195, 200, 365), node('Publication', 'Réseau professionnel', 'post', 865, 55, 65, 565), node('Visuel', 'Réseau social', 'image', 865, 195, 200, 565), node('Newsletter', 'Votre audience', 'mail', 865, 335, 335, 565)],
      edges: [[0,1,.4],[1,2,1.8],[2,3,3.6],[2,4,3.9],[2,5,4.2]],
      beats: [[0,0],[1,1.8],[2,3.6]], duration: 7.2
    },
    product: {
      title: 'Une inscription. Un parcours qui démarre.',
      description: 'Une inscription déclenche un accueil personnalisé et synchronise les données pour préparer l’espace utilisateur.',
      stages: ['Inscrire', 'Synchroniser', 'Accueillir'],
      nodes: [node('Inscription', 'Nouvel utilisateur', 'user', 80, 195, 200, 50), node('n8n / Make', 'Lancer le parcours', 'engine', 320, 195, 200, 205, true), node('Bienvenue', 'Un message personnalisé', 'mail', 590, 80, 95, 405), node('Base à jour', 'Données synchronisées', 'database', 590, 310, 305, 405), node('Espace prêt', 'Le parcours peut commencer', 'app', 870, 195, 200, 605)],
      edges: [[0,1,.4],[1,2,1.9],[1,3,1.9],[2,4,3.6],[3,4,3.6]],
      beats: [[0,0],[1,1.9],[2,3.6]], duration: 6.8
    }
  };
  const scene = document.createElement('div');
  scene.className = 'motion-scene';
  scene.id = 'automation-scene';
  $('.workflow').replaceWith(scene);
  const heading = document.createElement('h3');
  heading.className = 'motion-heading';
  scene.before(heading);
  const transport = document.createElement('div');
  transport.className = 'motion-transport';
  transport.innerHTML = '<ol class="motion-stages" aria-label="Étapes du scénario"></ol><button type="button" class="scene-pause" aria-pressed="false">Mettre en pause</button>';
  scene.after(transport);
  const pause = $('.scene-pause');
  const stages = $('.motion-stages');
  lab.classList.add('is-enhanced');

  function syncPlayback() {
    const canAnimate = !reduced && !!window.gsap;
    const playing = canAnimate && visible && !document.hidden && !paused;
    lab.classList.toggle('scene-playing', playing);
    pause.hidden = !canAnimate;
    pause.textContent = paused ? 'Reprendre l’animation' : 'Mettre en pause';
    pause.setAttribute('aria-pressed', String(paused));
    if (timeline) playing ? timeline.play() : timeline.pause();
  }

  function render(key) {
    timeline?.kill();
    timeline = null;
    active = key;
    const data = scenarios[key];
    lab.dataset.scene = key;
    heading.textContent = data.title;
    $('#scenario-description').textContent = data.description;
    buttons.forEach(button => {
      button.disabled = false;
      button.setAttribute('aria-pressed', String(button.dataset.scenario === key));
      button.setAttribute('aria-controls', scene.id);
    });
    const mobile = compact.matches;
    const width = mobile ? 400 : 1000;
    const height = mobile ? 720 : 430;
    const coords = data.nodes.map(n => mobile ? [n.mx,n.my] : [n.x,n.y]);
    const path = (from, to) => {
      const [x1,y1] = coords[from], [x2,y2] = coords[to];
      return mobile ? `M${x1},${y1} C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2}` : `M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}`;
    };
    scene.innerHTML = `<svg class="motion-connections" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">${data.edges.map(([from,to]) => `<path class="connection-base" d="${path(from,to)}"/><path class="connection-trace" pathLength="100" d="${path(from,to)}"/><circle class="connection-packet" r="4" cx="${coords[from][0]}" cy="${coords[from][1]}"/>`).join('')}</svg><ol class="motion-nodes" aria-label="Parcours de l’automatisation">${data.nodes.map((n,i) => `<li class="motion-node${n.core?' motion-core':''}" style="--nx:${coords[i][0]/width*100}%;--ny:${coords[i][1]/height*100}%" data-lit="true"><div class="motion-symbol">${n.core?'<svg class="engine-orbit" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56"/><path d="M60 4a56 56 0 0 1 56 56M60 116A56 56 0 0 1 4 60"/></svg>':''}<svg class="node-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${icons[n.icon]}</svg></div><div class="motion-label"><strong>${n.title}</strong><span>${n.sub}</span></div></li>`).join('')}</ol>`;
    stages.innerHTML = data.stages.map((label,i) => `<li><span>${String(i+1).padStart(2,'0')}</span>${label}</li>`).join('');
    if (!reduced && window.gsap) {
      const nodes = [...scene.querySelectorAll('.motion-node')];
      const traces = [...scene.querySelectorAll('.connection-trace')];
      const packets = [...scene.querySelectorAll('.connection-packet')];
      timeline = gsap.timeline({paused:true,repeat:-1,repeatDelay:1.6});
      timeline.set(nodes, {attr:{'data-lit':'false'}}, 0)
        .set(nodes[0], {attr:{'data-lit':'true'}}, 0)
        .set(traces, {strokeDashoffset:100}, 0)
        .set(packets, {opacity:0}, 0);
      data.edges.forEach(([from,to,start],i) => {
        const track = traces[i], packet = packets[i];
        const length = track.getTotalLength();
        const cursor = {progress:0};
        timeline.to(track, {strokeDashoffset:0,duration:1.1,ease:'power2.inOut'}, start)
          .set(packet, {opacity:1}, start)
          .to(cursor, {progress:1,duration:1.1,ease:'power2.inOut',onUpdate:()=>{
            const point=track.getPointAtLength(cursor.progress*length);
            packet.setAttribute('cx',point.x); packet.setAttribute('cy',point.y);
          }}, start)
          .set(packet, {opacity:0}, start+1.1)
          .set(nodes[to], {attr:{'data-lit':'true'}}, start+1.1)
          .fromTo(nodes[to].querySelector('.motion-symbol'), {scale:.92}, {scale:1,duration:.45,ease:'power3.out'}, start+1.1);
      });
      data.beats.forEach(([step,time]) => timeline.call(() => {
        [...stages.children].forEach((item,i)=>item.classList.toggle('is-current',i===step));
      }, [], time));
      timeline.to({}, {duration:.1}, data.duration);
      timeline.progress(0);
    } else {
      [...stages.children].forEach(item=>item.classList.add('is-current'));
    }
    syncPlayback();
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    render(button.dataset.scenario);
    const url = new URL(location.href);
    url.searchParams.set('scenario', active);
    try { history.replaceState(null,'',url); } catch { /* The diagram also works from local files. */ }
  }));
  pause.addEventListener('click', () => { paused = !paused; syncPlayback(); });
  document.addEventListener('visibilitychange', syncPlayback);
  document.addEventListener('lorn:motionchange', event => { reduced=event.detail.reduced; render(active); });
  compact.addEventListener('change',()=>render(active));
  new IntersectionObserver(entries => { visible=entries[0].isIntersecting; syncPlayback(); }, {threshold:.1}).observe(scene);
  const requested = new URLSearchParams(location.search).get('scenario');
  render(Object.hasOwn(scenarios,requested) ? requested : 'leads');
  // Horizontal chapters change the document height after fonts load.
  // Restore a direct link to this section after their layout has settled.
  document.fonts.ready.then(() => {
    if (location.hash === '#automatisations') requestAnimationFrame(() => requestAnimationFrame(() => lab.closest('section').scrollIntoView({behavior:'instant'})));
  });
})();
