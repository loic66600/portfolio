# Loïc Rossignol — Portfolio

Refonte du portfolio personnel : web, applications mobiles, product building et automatisations. LORN DIGITAL STUDIO est indiqué comme société en cours de création.

## Prévisualisation

Site statique sans dépendance à installer et sans compilation. Avec Node.js 20 ou supérieur :

```sh
npm run dev
```

Ouvrir http://127.0.0.1:4173. Le port se configure avec la variable PORT. Le serveur est limité à la machine locale et refuse les dossiers cachés.

## Vérifications

```sh
npm run check
```

Contrôle les fichiers, ancres, identifiants, images, liens externes, JSON-LD et syntaxe JavaScript. Teste aussi le formulaire hors réseau : validation, préremplissage, attente, réussite et erreurs. Aucun message réel n’est envoyé pendant ces tests.

## Structure

- index.html : accueil, projets, expertises, labo d’automatisation, à propos et contact.
- contact.html : formulaire Web3Forms conservant la configuration existante.
- ensavoirplus.html : parcours et compétences.
- css/studio.css : nouvelle identité et responsive.
- js/studio.js : navigation, sculpture Canvas, GSAP / ScrollTrigger, scénarios et formulaire.
- js/vendor/ : GSAP 3.13 et ScrollTrigger, hébergés localement.
- fonts/ : Space Grotesk et Manrope, avec leurs licences OFL.
- images/projects/ : captures des réalisations et leur provenance.
- PRODUCT.md et DESIGN.md : contexte et système visuel.

## Mouvement & accessibilité

Le scroll horizontal épinglé est actif sur les écrans d’au moins 900 px de large et 560 px de haut. Les petits écrans ont une galerie verticale ou un défilement horizontal natif. Tous les contenus restent accessibles sans JavaScript. Les animations respectent prefers-reduced-motion et le bouton de réduction des animations du pied de page. La sculpture est suspendue hors écran et lorsque l’onglet est masqué.

## Réalisations et liens

- [Talyana Rossignol](https://talyana-rossignol-portfolio.vercel.app/#accueil)
- [VORTEX / Mavrik](https://loic66600.github.io/vortex-mavrik-portfolio/) — concept de démonstration.
- [Noah Laurent](https://loic66600.github.io/portfolio-noah/) — concept de démonstration.
- [LORN DIGITAL STUDIO](https://lorn-digital-studio.fr/) — site en préparation.
- [ViteMonSite — aperçu](https://preview.vitemonsite-artisan.fr/) — aperçu avant lancement, lien utilisé sur le portfolio.
- [ViteMonSite — site officiel](https://vitemonsite-artisan.fr/) — coming soon.

## Publication

Branche de revue : feat/portfolio-lorn-redesign. La branche principale et la production ne sont pas modifiées.

Pour GitHub Pages, publier les fichiers statiques de la racine (le fichier .nojekyll est fourni). Conserver css/studio.css, js/studio.js, js/vendor, fonts et toutes les images référencées. Aucun build nécessaire. Si le domaine change, adapter les URL absolues des métadonnées sociales et du JSON-LD.

Les anciennes feuilles de style et scripts du modèle initial sont conservés mais ne sont plus chargés par les trois pages refondues.

## Services externes

Le formulaire envoie à Web3Forms uniquement lors d’une soumission volontaire. Les liens e-mail et WhatsApp restent disponibles en alternative. La clé publique du formulaire existant est conservée. La réception réelle doit être validée par un envoi volontaire du propriétaire.

Animations : [GSAP / ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — licence référencée dans les fichiers distribués. Polices : Google Fonts, licences SIL Open Font License jointes.
