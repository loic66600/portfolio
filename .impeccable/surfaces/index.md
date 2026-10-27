# Accueil du portfolio — index.html

## Scope and mode

Cible : `index.html`. Mode : **Experience**. Pages liées : `contact.html` et `ensavoirplus.html`, qui reprennent le système visuel. Construction directe dans le code sur la branche locale `feat/portfolio-lorn-redesign`, sans maquette intermédiaire. L’utilisateur a autorisé l’aperçu Vercel séparé https://loic-rossignol-portfolio-preview.vercel.app/ ; l’ancien portfolio GitHub Pages est conservé.

## Audience, job and action

Le visiteur évalue le regard créatif et les compétences web, mobile, e-commerce et automatisation de Loïc. Il explore des projets réels ou explicitement présentés comme concepts/templates, comprend les services, puis ouvre le contact. Les captures de projets, le portrait et le parcours portent la preuve. La section `#applications` présente aussi TirTrack et God of Sparta à travers leurs identités visuelles, leurs usages et leurs statuts. Le laboratoire illustre un mécanisme et se présente comme une démonstration.

## Direction contract

Contrat descriptif consolidé depuis la refonte implémentée et la direction provisoire. Il ne prétend pas remplacer une approbation de maquette.

**THESIS:** Une affiche de studio numérique incarnée : présenter Loïc et son travail dès l’accueil, puis laisser explorer les réalisations avec leurs aperçus complets.

**OWN-WORLD:** Encre végétale, papier ivoire, orange et vert atelier ; grands titres géométriques, textes compacts, filets et flèches. Les composants restent plats.

**STORY:** Portrait, identité et intention ; trois portfolios à explorer ; TirTrack et God of Sparta dans une section applications mobiles ; expertises ; démonstration d’automatisation ; cinq sites métiers à faire défiler ; parcours et studio en création ; contact.

**FIRST VIEWPORT:** Marque et navigation au-dessus d’un grand titre à gauche, « Des idées qui prennent vie. », accompagné d’une introduction et des accès projets/contact. À droite, la photo complète de Loïc avec son nom et son rôle. À 560px ou moins, le portrait précède visuellement le texte et les actions.

**FORM:** Affiche de studio et galerie de projets. Chemin choisi : code-first. Seed key : indisponible ; le moteur Impeccable n’a pas pu s’initialiser après les tentatives effectuées. Aucun tirage ni classement de concepts n’est inventé.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction and responsive behavior

Le portrait d’accueil est montré en entier, au rapport 4:5, avec une entrée verticale légère désactivée en mode réduit. Sur écran d’au moins 900px de large et 560px de haut, les trois portfolios défilent horizontalement dans un chapitre sticky natif, piloté par le scroll vertical et réversible. Le focus sur un projet amène celui-ci à l’écran.

À 560px ou moins, les projets s’empilent. Dans les autres cas sans animation, la rangée conserve son débordement horizontal natif. Les expertises utilisent des disclosures natifs et le laboratoire propose trois scénarios sans exécuter d’automatisation réelle.

Les sites métiers disposent d’une galerie distincte : Black & Gold, Le Comptoir Catalan, Éclair Elec 66, Street Fusion et Dupont Peinture. Un site occupe la largeur disponible, avec son image entière, son titre, sa catégorie et un lien pour l’explorer. Le défilement horizontal reste natif à toutes les tailles, avec gestes tactiles, barre de défilement, flèches de 48px et compteur de 1 / 5 à 5 / 5. ArrowLeft et ArrowRight agissent lorsque la région possède elle-même le focus. Il n’y a pas de lecture automatique ; le mouvement réduit rend les commandes instantanées. Le focus est encre sur le fond papier. Sans JavaScript, le débordement horizontal reste disponible et les commandes sont masquées.

Le lien de sortie de la galerie mène à `#applications`, avant les expertises. Cette section présente deux articles ouverts, non cliquables, avec visuels de marque 720 × 450px : TirTrack (« Projet privé ») puis God of Sparta (« En développement »). Les deux colonnes, décalées de 80px, deviennent une colonne sans décalage à 800px ou moins. Aucun mouvement dédié n’est ajouté. Le lien commun « Parlons de votre application » ouvre `contact.html?projet=application` et présélectionne le type « Application web ou mobile » grâce au script du formulaire. La page parcours renvoie également vers `index.html#applications`.

## Content and constraints

Conserver les coordonnées, les liens utiles, le formulaire Web3Forms et les ancres historiques. Distinguer les concepts de réalisations clientes. Présenter LORN DIGITAL STUDIO comme une société en cours de création et ViteMonSite comme un aperçu avant lancement. L’interface est en français.

Les applications mobiles reprennent les contenus et visuels du projet local LORN à la demande du propriétaire. Les visuels montrent les marques, pas des écrans des applications ; leur provenance figure dans `images/projects/sources.json` et `images/README.md`. Conserver les statuts privés ou en développement, sans lien vers les dépôts privés ni invitation à télécharger une application en boutique. Les retours approuvés sur le portrait et les sites métiers prolongent la direction existante, avec la même palette et les mêmes tokens.

## Open decisions

Le public est une hypothèse de travail, conformément à PRODUCT.md. Le système et les comportements sont documentés depuis le code ; ce brief ne constitue pas une validation navigateur supplémentaire. L’aperçu Vercel séparé est autorisé ; aucune modification de l’ancien portfolio GitHub Pages n’est incluse dans ce périmètre.
