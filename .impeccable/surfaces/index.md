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

**FIRST VIEWPORT:** Marque et navigation au-dessus d’un grand titre à gauche, « Des idées qui prennent vie. », accompagné d’une introduction et des accès projets/contact. À droite, la photo d’origine `images/man4.jpg`, Loïc de dos et vêtu de noir, montrée entière dans le cadre existant, avec son nom et son rôle. À 560px ou moins, le portrait précède visuellement le texte et les actions.

**FORM:** Affiche de studio et galerie de projets. Chemin choisi : code-first. Seed key : indisponible ; le moteur Impeccable n’a pas pu s’initialiser après les tentatives effectuées. Aucun tirage ni classement de concepts n’est inventé.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction and responsive behavior

Le portrait d’accueil utilise la photo de dos d’origine de 690 × 1391px, contenue sans recadrage dans un cadre CSS 4:5, avec une entrée verticale légère désactivée en mode réduit. Le portrait de face reste dans la section à propos. Sur écran d’au moins 900px de large et 560px de haut, avec les animations actives et leurs bibliothèques disponibles, les trois portfolios et les cinq sites métiers utilisent le même mécanisme `horizontalChapter` : panneau sticky natif, déplacement horizontal piloté par le scroll vertical et retour en arrière symétrique. Le focus sur le lien d’un projet amène celui-ci à l’écran.

À 560px ou moins, les portfolios s’empilent ; au-dessus de cette largeur, ils conservent leur débordement horizontal natif lorsque l’animation n’est pas active. Les sites métiers restent une grille verticale de cinq articles hors du mode horizontal : sur mobile, en mode réduit, sans JavaScript ou lorsque les dimensions requises ne sont pas réunies. Les expertises utilisent des disclosures natifs et le laboratoire propose trois scénarios sans exécuter d’automatisation réelle.

Les sites métiers sont Black & Gold, Le Comptoir Catalan, Éclair Elec 66, Street Fusion et Dupont Peinture. En mode horizontal, un site occupe la largeur disponible dans un panneau de 100svh, avec son image entière, son titre, sa catégorie et un lien pour l’explorer. La barre de progression et le compteur de 1 / 5 à 5 / 5 sont des indicateurs passifs `aria-hidden`, visibles uniquement dans ce mode. La galerie n’a ni flèches de commande, ni navigation ArrowLeft/ArrowRight dédiée, ni `tabindex` sur sa région. Les liens gardent un focus encre sur papier. Le passage au mouvement réduit nettoie la hauteur et la translation du chapitre ; les calculs sont refaits après chargement des fontes et au redimensionnement. Aucun scroll global n’est intercepté.

Le lien de sortie de la galerie mène à `#applications`, avant les expertises. Cette section présente deux articles ouverts, non cliquables, avec visuels de marque 720 × 450px : TirTrack (« Projet privé ») puis God of Sparta (« En développement »). Les deux colonnes, décalées de 80px, deviennent une colonne sans décalage à 800px ou moins. Aucun mouvement dédié n’est ajouté. Le lien commun « Parlons de votre application » ouvre `contact.html?projet=application` et présélectionne le type « Application web ou mobile » grâce au script du formulaire. La page parcours renvoie également vers `index.html#applications`.

## Content and constraints

Conserver les coordonnées, les liens utiles, le formulaire Web3Forms et les ancres historiques. Distinguer les concepts de réalisations clientes. Présenter LORN DIGITAL STUDIO comme une société en cours de création et ViteMonSite comme un aperçu avant lancement. L’interface est en français.

Les applications mobiles reprennent les contenus et visuels du projet local LORN à la demande du propriétaire. Les visuels montrent les marques, pas des écrans des applications ; leur provenance figure dans `images/projects/sources.json` et `images/README.md`. Conserver les statuts privés ou en développement, sans lien vers les dépôts privés ni invitation à télécharger une application en boutique. Les retours approuvés sur le portrait et les sites métiers prolongent la direction existante, avec la même palette et les mêmes tokens.

## Open decisions

Le public est une hypothèse de travail, conformément à PRODUCT.md. Le système et les comportements sont documentés depuis le code ; ce brief ne constitue pas une validation navigateur supplémentaire. L’aperçu Vercel séparé est autorisé ; aucune modification de l’ancien portfolio GitHub Pages n’est incluse dans ce périmètre.

## Verification scope — correction du 6 novembre 2026

La vérification native de la galerie des sites métiers a couvert l’aller et le retour au scroll, le dernier site (5 / 5), le troisième site entièrement visible au focus clavier, le format mobile 390px et le basculement du mouvement réduit, sans erreur signalée. Captures : `.impeccable/review/scroll-trades-desktop.jpg` et `.impeccable/review/scroll-trades-mobile.jpg`. La revue finale a demandé la correction de la documentation obsolète et n’a relevé aucun problème matériel de code dans ce périmètre.

La source `images/man4.jpg` a été inspectée et correspond à la photo demandée. Le rendu de l’accueil après son remplacement n’a pas pu être vérifié : l’hôte du navigateur CUA était indisponible, puis l’accès à l’application native a expiré. Les captures de la galerie ne constituent pas une validation de ce nouveau rendu. `images/social-cover.jpg` reste la capture du 27 octobre 2026 avec le portrait de face ; elle n’a pas été actualisée pour cette correction.
