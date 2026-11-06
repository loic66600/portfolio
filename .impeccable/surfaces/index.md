# Accueil du portfolio — index.html

## Scope and mode

Cible : `index.html`. Mode : **Experience**. Pages liées : `contact.html` et `ensavoirplus.html`, qui reprennent le système visuel. Construction directe dans le code sur la branche locale `feat/portfolio-lorn-redesign`, sans maquette intermédiaire. L’utilisateur a autorisé l’aperçu Vercel séparé https://loic-rossignol-portfolio-preview.vercel.app/ ; l’ancien portfolio GitHub Pages est conservé.

## Audience, job and action

Le visiteur évalue le regard créatif et les compétences web, mobile, e-commerce et automatisation de Loïc. Il explore des projets réels ou explicitement présentés comme concepts/templates, comprend les services, puis ouvre le contact. Les captures de projets, le portrait et le parcours portent la preuve. La section `#applications` présente aussi TirTrack et God of Sparta à travers leurs identités visuelles, leurs usages et leurs statuts. Le laboratoire illustre un mécanisme et se présente comme une démonstration.

## Direction contract

Contrat descriptif consolidé depuis la refonte implémentée et la direction provisoire. Il ne prétend pas remplacer une approbation de maquette.

**THESIS:** Une affiche de studio numérique incarnée et panoramique : donner une présence forte à Loïc par son portrait agrandi contre le bord droit, prolonger le titre vers le centre, puis laisser explorer les réalisations avec leurs aperçus complets.

**OWN-WORLD:** Encre végétale, papier ivoire, orange et vert atelier ; grands titres géométriques, textes compacts, filets et flèches. Les composants restent plats.

**STORY:** Portrait, identité et intention ; trois portfolios à explorer ; TirTrack et God of Sparta dans une section applications mobiles ; expertises ; démonstration d’automatisation ; cinq sites métiers à faire défiler ; parcours et studio en création ; contact.

**FIRST VIEWPORT:** En-tête superposé à une ouverture de la hauteur de l’écran. Le grand titre « Des idées qui prennent vie. » occupe deux lignes sur ordinateur et traverse le centre depuis la gauche. La photo d’origine `images/man4.jpg`, Loïc de dos et vêtu de noir, est agrandie et recadrée sur la tête et les épaules, contre le bord droit, avec un fondu à gauche et en bas. Introduction, accès projets/contact et liens « Web créatif », « Applications », « Automatisation » occupent la zone gauche. Sur mobile, le portrait remplit le haut, sa légende disparaît et le titre reprend trois lignes sous le visage, sur le fondu.

**FORM:** Affiche de studio et galerie de projets. Chemin choisi : code-first. Seed key : indisponible ; le moteur Impeccable n’a pas pu s’initialiser après les tentatives effectuées. Aucun tirage ni classement de concepts n’est inventé.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction and responsive behavior

Le portrait panoramique utilise la photo de dos d’origine de 690 × 1391px, avec `object-fit: cover`, alignement `right 8%`, largeur `min(58vw, 780px)` et fondus CSS. À 800px et moins, il mesure jusqu’à 580px de large et 650px de haut, le texte commence à 420px ; à 560px et moins, la hauteur passe à 570px et le texte commence à 370px. Le portrait de face reste dans la section à propos. Les trois liens d’univers mènent aux ancres réelles `#projets`, `#applications` et `#automatisations`.

L’entrée du titre entier utilise une translation verticale et de l’opacité pendant 1.1s ; l’entrée de la photo utilise seulement l’opacité pendant 1.4s. Elles fonctionnent aussi sur mobile hors mouvement réduit. Au-dessus de 800px, le scroll déplace le dernier segment du titre de 5.5vw et -24px, agrandit la photo à 1.07 en la déplaçant de 55px vers le bas et fait progresser le filet orange au-dessus des liens d’univers. La scène au scroll est désactivée sur mobile et en mouvement réduit. Les éléments d’entrée et de scroll ont été séparés pour éviter une concurrence sur leurs transformations.

Sur écran d’au moins 900px de large et 560px de haut, avec les animations actives et leurs bibliothèques disponibles, les trois portfolios et les cinq sites métiers utilisent le même mécanisme `horizontalChapter` : panneau sticky natif, déplacement horizontal piloté par le scroll vertical et retour en arrière symétrique. Le focus sur le lien d’un projet amène celui-ci à l’écran.

À 560px ou moins, les portfolios s’empilent ; au-dessus de cette largeur, ils conservent leur débordement horizontal natif lorsque l’animation n’est pas active. Les sites métiers restent une grille verticale de cinq articles hors du mode horizontal : sur mobile, en mode réduit, sans JavaScript ou lorsque les dimensions requises ne sont pas réunies. Les expertises utilisent des disclosures natifs et le laboratoire propose trois scénarios sans exécuter d’automatisation réelle.

Les sites métiers sont Black & Gold, Le Comptoir Catalan, Éclair Elec 66, Street Fusion et Dupont Peinture. En mode horizontal, un site occupe la largeur disponible dans un panneau de 100svh, avec son image entière, son titre, sa catégorie et un lien pour l’explorer. La barre de progression et le compteur de 1 / 5 à 5 / 5 sont des indicateurs passifs `aria-hidden`, visibles uniquement dans ce mode. La galerie n’a ni flèches de commande, ni navigation ArrowLeft/ArrowRight dédiée, ni `tabindex` sur sa région. Les liens gardent un focus encre sur papier. Le passage au mouvement réduit nettoie la hauteur et la translation du chapitre ; les calculs sont refaits après chargement des fontes et au redimensionnement. Aucun scroll global n’est intercepté.

Le lien de sortie de la galerie mène à `#applications`, avant les expertises. Cette section présente deux articles ouverts, non cliquables, avec visuels de marque 720 × 450px : TirTrack (« Projet privé ») puis God of Sparta (« En développement »). Les deux colonnes, décalées de 80px, deviennent une colonne sans décalage à 800px ou moins. Aucun mouvement dédié n’est ajouté. Le lien commun « Parlons de votre application » ouvre `contact.html?projet=application` et présélectionne le type « Application web ou mobile » grâce au script du formulaire. La page parcours renvoie également vers `index.html#applications`.

## Content and constraints

Conserver les coordonnées, les liens utiles, le formulaire Web3Forms et les ancres historiques. Distinguer les concepts de réalisations clientes. Présenter LORN DIGITAL STUDIO comme une société en cours de création et ViteMonSite comme un aperçu avant lancement. L’interface est en français.

Les applications mobiles reprennent les contenus et visuels du projet local LORN à la demande du propriétaire. Les visuels montrent les marques, pas des écrans des applications ; leur provenance figure dans `images/projects/sources.json` et `images/README.md`. Conserver les statuts privés ou en développement, sans lien vers les dépôts privés ni invitation à télécharger une application en boutique. Les retours approuvés sur le portrait et les sites métiers prolongent la direction existante, avec la même palette et les mêmes fontes. Le recadrage panoramique concerne uniquement la photo d’accueil ; les images de projets restent entières. L’échelle du titre jusqu’à 112px est une exception locale documentée ; les tokens générés et le sidecar ne sont pas modifiés dans ce périmètre.

## Open decisions

Le public est une hypothèse de travail, conformément à PRODUCT.md. Le système et les comportements sont documentés depuis le code ; ce brief ne constitue pas une validation navigateur supplémentaire. L’aperçu Vercel séparé est autorisé ; aucune modification de l’ancien portfolio GitHub Pages n’est incluse dans ce périmètre.

## Verification scope — correction du 6 novembre 2026

La vérification native de la galerie des sites métiers a couvert l’aller et le retour au scroll, le dernier site (5 / 5), le troisième site entièrement visible au focus clavier, le format mobile 390px et le basculement du mouvement réduit, sans erreur signalée. Captures : `.impeccable/review/scroll-trades-desktop.jpg` et `.impeccable/review/scroll-trades-mobile.jpg`. La revue finale a demandé la correction de la documentation obsolète et n’a relevé aucun problème matériel de code dans ce périmètre.

La source `images/man4.jpg` a été inspectée et correspond à la photo demandée. La réserve précédente sur l’absence de vérification visuelle de l’accueil est levée pour la composition panoramique : trois captures obtenues via l’API Firecrawl ont été vérifiées, `.impeccable/review/panorama-desktop.png` (1440 × 900), `panorama-compact.png` (1280 × 720) et `panorama-mobile.png` (390 × 844). La revue du panorama a rendu une disposition **ship** sur ce périmètre visuel.

Le navigateur CUA restant indisponible, la nouvelle scène de scroll de l’accueil n’a pas été vérifiée en interaction directe. La correction qui sépare les transformations d’entrée et de scroll a été examinée dans le code ; les captures statiques ne valident pas ce comportement. Les tests antérieurs des galeries restent distincts de cette nouvelle animation. `images/social-cover.jpg` demeure la capture du 27 octobre 2026 avec le portrait de face et n’a pas été actualisée pour le panorama.
