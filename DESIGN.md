---
name: "LORN — Creative engineering"
description: "Une affiche de studio numérique pour le portfolio de Loïc Rossignol."
colors:
  orange: "#ff6b35"
  lime: "#d9f279"
  ink: "#171916"
  panel: "#22251f"
  paper: "#f2f1e9"
  muted: "#b4b8ad"
  paper-muted: "#5b6055"
  line: "#3d4238"
  paper-line: "#d1d4c7"
typography:
  display:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(58px, 6.55vw, 96px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(38px, 4.6vw, 70px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(25px, 2.5vw, 36px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  body:
    fontFamily: "'Manrope', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Manrope', sans-serif"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0.08em"
  button:
    fontFamily: "'Manrope', sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.75
rounded:
  button: "2px"
  image: "3px"
  control: "4px"
  lab: "12px"
  tag: "30px"
  circle: "50%"
spacing:
  gutter: "clamp(22px, 5vw, 88px)"
  section: "110px"
  section-tablet: "85px"
  section-mobile: "65px"
  gallery-gap: "38px"
  gallery-gap-tablet: "28px"
  tag-gap: "8px"
components:
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "15px 22px"
  button-light-hover:
    backgroundColor: "{colors.orange}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "15px 22px"
  button-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "15px 22px"
  input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.paper}"
    rounded: "2px 2px 0 0"
    padding: "14px 15px"
  tag:
    textColor: "{colors.muted}"
    rounded: "{rounded.tag}"
    padding: "5px 12px"
  scenario:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "8px 11px"
  scenario-selected:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
  circle-link:
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
  automation-lab:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lab}"
    padding: "25px"
---

# Design System: LORN — Creative engineering

## Overview

**Creative North Star: "L’affiche de studio numérique"**

L’affiche de studio numérique associe de grandes compositions typographiques à des objets qui montrent le travail en mouvement. Les fonds encre, papier et les aplats orange ou végétal rythment la lecture ; les réalisations gardent leur propre identité dans leurs aperçus.

La géométrie des titres, les filets fins et les liens fléchés donnent une présence graphique aux pages. Les textes de présentation restent compacts. Le mouvement accompagne l’exploration sans remplacer le défilement ni le pointeur natifs.

Ce document décrit le code de la refonte, construit directement à la demande de l’utilisateur. Il ne représente pas une maquette approuvée séparément. Sources : `css/studio.css`, `js/studio.js` et les pages HTML. La stratégie de l’accueil est consignée dans `.impeccable/surfaces/index.md`.

**Key Characteristics:**

- Grands aplats alternés et titres géométriques serrés.
- Aperçus de projets complets, portrait réel et sculpture paramétrique.
- Filets fins, très peu de surfaces encadrées, flèches comme repères d’action.
- Interactions natives et préférence de mouvement réduit persistante.

## Colors

Une palette d’encre végétale et de papier ivoire, ponctuée d’orange vif et de vert clair. Les valeurs du frontmatter sont normatives ; la plupart correspondent aux propriétés CSS de même nom.

### Primary

- **Orange création** (`orange`) : accent typographique, sculpture, bandeau de mots, appel au contact et bouton d’envoi.

### Secondary

- **Vert atelier** (`lime`) : aplat de l’atelier d’automatisation, scénario sélectionné, indicateurs et retour de succès.

### Neutral

- **Encre végétale** (`ink`) : fond principal, texte sur papier et accents, fond du laboratoire.
- **Panneau encre** (`panel`) : fond des champs du formulaire.
- **Papier ivoire** (`paper`) : texte sur fond sombre, fond des galeries et bouton clair.
- **Gris sauge clair** (`muted`) : textes secondaires sur fond sombre.
- **Gris olive** (`paper-muted`) : légendes et descriptions sur papier ; valeur partagée par plusieurs règles CSS.
- **Filet sombre** (`line`) et **filet papier** (`paper-line`) : séparation des sections, lignes de services et archives.

Les rampes OKLCH du sidecar sont des échantillons synthétisés pour la prévisualisation, pas de nouvelles couleurs utilisées par le site. Les petites variations propres à une illustration ou à un état restent dans le composant concerné.

**The Surface Contrast Rule.** Les aplats papier, orange et végétal portent un texte encre ; les surfaces encre et panneau portent un texte papier ou sauge.

## Typography

**Display Font:** Space Grotesk, fallback sans-serif ; fontes locales aux graisses 500 et 700.
**Body Font:** Manrope, fallback sans-serif ; fontes locales aux graisses 400 et 700.

**Character:** Une sans géométrique compacte pour les titres et une sans plus souple pour la lecture. Les quatre fichiers TTF utilisent `font-display: swap`.

### Hierarchy

- **Display** : grand titre de l’accueil ; graisse forte, trois lignes explicites et dernier mot orange. La valeur de référence se trouve dans `typography.display`.
- **Headline** : titres de section, à la graisse moyenne ; les variantes atelier, portrait, contact et pages secondaires adaptent cette échelle à leur composition.
- **Title** : titres des projets. Les services emploient une variante fluide de 22 à 35px.
- **Body** : base du document ; les textes courants des sections descendent à 12–14px selon leur contexte. Les paragraphes ont une largeur maximale par défaut de 68ch, souvent resserrée localement.
- **Label** : métadonnées des projets et repères éditoriaux. Les libellés réels vont de 7 à 11px ; les plus petits sont des éléments d’accompagnement, pas l’échelle de lecture du corps.
- **Button** : texte compact, gras et accompagné d’une flèche.

À 800px et moins, le titre d’accueil passe à `clamp(50px, 7.2vw, 66px)`. À 560px et moins : `clamp(48px, 11.3vw, 64px)`, interligne 1.04 ; les titres de section usuels passent à 39px. Le formulaire utilise 16px sur petit écran.

**The Local Type Rule.** Réutiliser les deux familles hébergées dans `fonts/` et leurs graisses présentes ; conserver le resserrement des titres sans l’étendre aux paragraphes.

## Layout

Les sections occupent la largeur disponible avec une gouttière fluide commune. Seul le conteneur d’accueil possède une largeur maximale de 1760px ; le site n’a pas de conteneur global de 1600px. L’espacement vertical courant suit les trois valeurs `spacing.section*`, avec des exceptions de composition pour la galerie, le bandeau de contact et les projets du studio.

L’accueil utilise deux colonnes (1.1fr / 1fr). Les applications mobiles occupent deux colonnes égales, séparées par un espace fluide de 28 à 80px ; le second article est décalé de 80px vers le bas. Les expertises sont des lignes ; l’atelier et le portrait alternent texte et élément visuel. Les projets complémentaires forment trois colonnes. Le formulaire et le parcours sont des pages à deux colonnes, avec un en-tête et un pied de page communs.

### Responsive

- **Au-dessus de 1600px** : accueil et sculpture plus hauts, en-tête de 110px.
- **À 1100px et moins** : rythme vertical réduit, navigation et grilles plus compactes.
- **À 800px et moins** : navigation repliée, applications et atelier sur une colonne, formulaire avant les coordonnées ; l’accueil conserve deux colonnes. Les articles d’applications perdent leur décalage et sont séparés de 52px ; leur appel au contact s’empile également.
- **À 560px et moins** : accueil, galerie principale, projets complémentaires, portrait, projets du studio, formulaire et parcours passent en pile verticale.
- **Écrans larges et peu hauts** : à partir de 900px de largeur et jusqu’à 800px de hauteur, l’accueil et la galerie se compactent selon la hauteur disponible.

### Galerie horizontale

La base CSS est une rangée de projets à débordement horizontal natif, avec aimantation. Chaque projet mesure `clamp(520px, 59vw, 830px)`, puis 70vw à 800px et moins. Sur petit écran, la liste devient verticale.

Avec JavaScript, GSAP et ScrollTrigger disponibles, une largeur d’au moins 900px, une hauteur d’au moins 560px et les animations actives, le chapitre devient horizontal au scroll vertical. Le panneau utilise `position: sticky; top: 0` natif. La hauteur du chapitre ajoute la distance horizontale à la hauteur du panneau ; un écouteur passif applique la translation bornée de la rangée. Il ne s’agit pas d’un épinglage ScrollTrigger ni d’un remplacement du scroll global. Le retour en arrière est symétrique et un focus clavier repositionne le document sur le projet ciblé.

En mode réduit ou sans les bibliothèques d’animation, la galerie revient au débordement horizontal natif au-dessus de 560px et reste verticale à 560px ou moins. Le lien « Découvrir les applications » permet de quitter ce chapitre et mène à la section suivante, `#applications`.

## Elevation & Depth

Les composants n’utilisent pas d’ombres CSS. Les aplats, les filets et les changements de couleur produisent la séparation. La profondeur de la sculpture est dessinée dans le canvas par projection, tri des anneaux et variation de lumière ; elle ne devient pas un effet d’élévation des cartes. Les aperçus de projets restent plats et gagnent seulement un léger agrandissement au survol.

**The Flat Surface Rule.** Utiliser la couleur et les séparateurs existants pour structurer les surfaces ; les mouvements de survol ne créent pas de nouvelle ombre.

## Shapes

Les boutons et images sont presque rectangulaires, avec les très faibles rayons définis dans le frontmatter. Les tags sont des capsules à contour fin. Le laboratoire et son moteur sont les surfaces les plus arrondies ; les sorties du schéma ont un rayon intermédiaire de 6px. Des flèches diagonales ou verticales en SVG accompagnent les liens. Les liens circulaires, orbites et croix créent la continuité géométrique avec la sculpture.

## Components

### Buttons

Compacts, explicites, accompagnés d’une flèche. Les trois variantes réelles sont papier sur encre, encre sur surface claire et orange pour l’envoi. Leur hauteur minimale courante est 52px. Le bouton d’accueil passe à 48px sur petit écran. Le survol déplace le bouton de 3px vers le haut ; la variante claire devient orange. Les boutons désactivés utilisent une opacité de 0.65 et le curseur d’attente.

Les liens textuels ont une cible haute de 44px, un soulignement au survol et une flèche se déplaçant légèrement. Les liens circulaires interactifs mesurent au moins 44px ; la grande flèche du contact conserve sa propre échelle.

### Chips

Les tags d’outils sont des éléments d’information, en capsules à contour fin, sans état sélectionné. Les boutons de scénarios sont rectangulaires et utilisent `aria-pressed` : fond végétal et texte encre pour le scénario actif, texte sauge et bordure pour les autres. Leur hauteur minimale est de 44px.

### Cards / Containers

Les projets principaux sont des articles ouverts, sans cadre de carte : aperçu, catégorie et numéro, titre, description, puis disciplines. Les captures utilisent `object-fit: contain` sur un fond encre ; le rapport du cadre devient 2:1 sur petit écran. Le laboratoire constitue une véritable surface encadrée, sombre sur fond végétal, avec en-tête, scénarios, schéma et légende de démonstration.

Les applications mobiles sont deux articles ouverts sur fond encre. Chacun présente un visuel de marque de 720 × 450px au rapport 8:5, contenu sans recadrage et aux coins de 3px, puis la catégorie, le statut, le titre, les usages, trois fonctionnalités et la stack. Ces visuels représentent l’identité de TirTrack et God of Sparta, pas leurs interfaces. Les statuts « Projet privé » et « En développement » prennent la forme de capsules à filet sombre et texte végétal. Les titres vont de 28 à 42px ; la description utilise 14px avec un interligne de 1.8.

Les articles d’applications restent non cliquables. Un lien commun mène à `contact.html?projet=application`, où le script présélectionne « Application web ou mobile ». Aucun lien de téléchargement n’est présenté pour ces projets privés ou en développement. Cette section statique reprend les couleurs, les filets et les liens existants, sans animation dédiée.

### Inputs / Fields

Champs étiquetés, fond panneau, soulignement olive et deux coins supérieurs légèrement arrondis. La hauteur minimale est 48px ; la zone de message mesure au moins 155px et reste redimensionnable verticalement. Le focus dessine un contour orange de 2px, décalé de 4px.

La validation s’appuie sur les attributs HTML. L’envoi affiche un libellé d’attente et désactive le bouton. Le message de succès végétal apparaît après la réponse positive ; l’erreur utilise un orange clair et conserve la saisie. Les retours sont annoncés dans une région de statut.

### Navigation

En-tête horizontal, marque à gauche et liens courts à droite, séparé du contenu par un filet. Les liens soulignent leur libellé en orange au survol. À 800px et moins, un bouton ouvre un panneau plein écran sous l’en-tête. L’état est porté par `aria-expanded` ; Escape ferme le panneau et rend le focus au bouton. Le bouton et les liens participent au parcours Tab. La navigation mobile dépend du JavaScript.

Les liens, boutons et résumés exposent un focus orange de 3px, décalé de 7px. Chaque page possède un lien d’évitement.

### Lignes d’expertises

Éléments natifs `details/summary` séparés par des filets. Un signe plus devient un trait à l’ouverture et le titre passe à l’orange. Le contenu développé réunit une description et des tags. Le comportement fonctionne sans script.

### Mouvement et sculpture

L’entrée du titre dure 1.1s avec un décalage de 0.13s entre lignes ; la sculpture entre en 1.8s. Les deux utilisent `expo.out`. La sculpture paramétrique est un canvas 2D décoratif ; son rendu se limite à environ 30 images/s, avec un ratio de pixels plafonné à 1.75. Sa boucle s’arrête hors viewport ou lorsque l’onglet est masqué. Le pointeur de souris modifie doucement son orientation ; le scroll ajoute une petite rotation et translation. Le portrait se déplace légèrement au scroll.

Le bandeau typographique se répète sur 35s et les particules du schéma sur 2.8s. Le changement de scénario met à jour le texte immédiatement, avec une transition des nœuds de 0.5s lorsque les animations sont actives.

La préférence système `prefers-reduced-motion` et le bouton de pied de page désactivent les animations, les effets GSAP et le mouvement du canvas, réduisent les transitions et désactivent le scroll fluide. Le choix manuel est conservé dans `localStorage`. Une préférence système active ne peut pas être annulée par le bouton. La sculpture reste visible sous forme fixe et les scénarios restent utilisables. Les animations CSS ne disposent pas d’un gestionnaire explicite de visibilité d’onglet ; l’arrêt explicite concerne le canvas.

## Do's and Don'ts

### Do:

- **Do** réutiliser les couleurs et les deux familles locales définies dans le frontmatter.
- **Do** laisser les projets mener la galerie et conserver les captures complètes avec object-fit: contain.
- **Do** garder les libellés, les liens de sortie de galerie, les focus visibles et les états du formulaire.
- **Do** conserver le scroll natif, les détails HTML et le parcours clavier lors des évolutions.
- **Do** adapter le mouvement à la préférence système et à la commande de réduction des animations.

### Don't:

- **Don't** transformer chaque bloc de contenu en carte : les filets et les aplats organisent déjà la page.
- **Don't** remplacer les aperçus de projets par des chiffres, clients ou résultats inventés.
- **Don't** masquer un contenu essentiel en attente d’une animation d’entrée.
- **Don't** réintroduire un curseur personnalisé obligatoire ou intercepter globalement la molette.
