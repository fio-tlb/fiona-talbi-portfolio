# Annexe — constats vérifiés (audit UI/UX, octobre 2026)

Ce fichier conserve le détail technique de chaque constat retenu après la contre-vérification : preuve, problème, recommandation (déjà corrigée par le relecteur quand il le fallait). La synthèse lisible est dans [`../audit-ui-ux.md`](../audit-ui-ux.md).

Légende : 🔴 critique · 🟠 important · 🟡 amélioration · ⚪ bonus — effort S (moins d'une heure), M (une demi-journée), L (plus). « Corrigé » = recommandation réécrite par le relecteur ; « Ajout » = constat manqué par l'auditeur et ajouté par le relecteur.

> Les numéros de ligne renvoient à l'état du dépôt au commit `79c4ea9` (avant implémentation).

## Parcours lecteur & contenus

_Le site a de bonnes bases : des chiffres réels, un contenu typé dans un module de données, une navigation par ancres fiable, des cibles tactiles et des contrastes conformes. Mais il est organisé comme un gabarit et rédigé comme une plaquette. Un recruteur pressé retient un slogan (« De l'idée à l'impact. ») et quelques chiffres. Il ne voit pas clairement où Fiona a travaillé, à quel niveau, ni ce qu'elle cherche. Sur les portables en 1280×720 et 1366×768, aucun KPI n'est visible au premier écran : une photo d'illustration occupe 21 à 26 % de la fenêtre. Le manager qui survole la page ne trouve aucun repère dans les titres (les 7 H2 sont des formules). Il ne voit pas non plus ce que Fiona a fait : c'est caché derrière 4 « Voir les missions », qui contiennent plus de mots que la partie visible. Le lecteur intéressé ne trouve ni dates, ni visuels, ni CV, ni auteur des recommandations. LinkedIn, seul lien externe, n'arrive qu'à 95–97 % de la page. Sur mobile, la page fait 10 écrans (13 à 375×667), dont un tiers pour compétences, formation et certifications, présentées en 13 cartes de même poids. Ce que je propose : un hero centré sur le nom, une phrase factuelle et 4 KPI cliquables reliés aux 4 projets ; des projets entièrement visibles, écrits à la première personne ; 6 sections au lieu de 8 ; 4 liens de navigation ; LinkedIn et CV accessibles dès le haut ; une vidéo présentée dans une carte non modale qui se réduit en pastille. J'ai testé ces choix dans le navigateur : le hero passe de 971 à environ 580 px à 1440, avec tous les KPI visibles dès 1280×720, et la page mobile est estimée à environ 6 100 px avec tout le contenu des missions._

### UX-01 · Hero : le slogan prend la place du nom et de la proposition de valeur

🔴 critique · tous · effort S · Corrigé

- **Preuve** : hero.tsx:13-20 ; portfolio.ts:440-449. Tailles mesurées : nom 26 px (simple <p>), H1 « De l'idée à l'impact. » 86 px, rôle 20 px à 1440 ; 24/52/18 px à 390. « Fiona Talbi » apparaît 2 fois dans le premier écran (en-tête et .hero-name), « Un parcours international » aussi (hero.tsx:38 et portfolio.ts:159). D'après l'arbre des titres, le H1 ne contient ni le nom ni le métier. sectionContent.hero.eyebrow (portfolio.ts:441) n'est jamais affiché.
- **Problème** : Trois niveaux de titre se font concurrence, et le plus gros est une formule qui irait à n'importe quel profil. La phrase de valeur (« J'allie stratégie, création et coordination terrain pour faire rayonner les marques ») ne cite ni entreprise ni résultat. Logitech n'apparaît qu'en 12 px gris sous un KPI. En 10 secondes, on ne sait ni où elle a travaillé, ni à quel niveau.
- **Recommandation** : 1) H1 « Fiona Talbi » en clamp(48px, 6vw, 80px), précédé d'un sur-titre en 14 px semi-gras gris : « Marketing 360 & communication · Paris ». Cela remplace .hero-name, .hero-role, ainsi que le slogan et son accent violet. 2) Lead en 18–20 px (16 px sous 720 px), couleur texte, max-width 34em, 3 lignes au plus sur mobile : « Plus de trois ans de marketing entre la marque et le terrain : category management et trade marketing chez Logitech, réseaux sociaux chez CosmétiCar, relations influenceurs chez Massilia E-consulting. » (README:3, 11-17). 3) Ligne formation en 14 px gris : « Master Marketing Digital & Innovation, IÉSEG (2024–2026) · MSc Luxury Marketing, GCU Londres ». « Diplômée de… » est possible, car README:3 le dit ; l'année reste à confirmer. 4) Ligne langues en 13 px, « Français · Anglais (TOEIC 910/990) · Espagnol B2 », à la place de « Un parcours international ». 5) Ordre sur desktop (≥ 981 px), colonne de gauche : sur-titre, H1, lead, [statut si renseigné, UX-06], formation, CTA, langues ; KPI dans la colonne de droite. Ordre sur mobile et tablette portrait : sur-titre, H1, lead, [statut], CTA, KPI, puis formation et langues sous les KPI. Mesuré : 2e rangée de chiffres à y=607–641 à 390×664, au lieu de 697–731. 6) Données : sectionContent.hero.{eyebrow, lead, credentials, languagesLine} ; supprimer title, accent, visualCaption et profile.internationalLabel.

### UX-02 · Premier écran desktop : photo d'illustration, et KPI sous la ligne de flottaison sur les portables courants

🔴 critique · desktop, tablette · effort M · Corrigé

- **Preuve** : Mesures Playwright : .impact-strip commence à y=736 à toutes les largeurs desktop et ses chiffres sont entre y=757 et 797. Ils sont donc invisibles à 1280×720 et coupés à 1366×768 (audit/ux-recruteur/fold-1366x768.png). .hero-photo fait 491×546 px, soit 21 % de la fenêtre à 1440×900 et 26 % à 1366×768. C'est une image d'illustration (src/assets/creative-desk.jpg, alt « Un carnet, un ordinateur et une tasse… », hero.tsx:51-65) avec la légende « Stratégie. Créativité. Impact. ». padding-top de 154 px (styles.css:238). Le brief demande « N'oublie pas d'afficher les KPIs impactant sur la page d'accueil » (README:21).
- **Problème** : Sur les résolutions de portable les plus courantes, le premier écran montre un slogan et un bureau qui ne représente pas Fiona. Pour voir les preuves chiffrées, il faut défiler.
- **Recommandation** : 1) Retirer la photo d'illustration et sa légende du premier écran. Si la direction artistique garde un visuel décoratif, jamais au-dessus des KPI, et avec alt="". 2) Desktop ≥ 981 px : grille 1.05fr / 0.95fr, align-items:center, texte à gauche, KPI en grille 2×2 à droite. 3) padding-top de 154 à 120 px (styles.css:238). 4) Critère d'acceptation exprimé en tailles de fenêtre réelles : les 4 chiffres entièrement visibles à 1280×720, 1366×657, 1536×730 et 1440×790. Le prototype y parvient (y=211–379, hero de 579 px à 1440). 5) Mobile : ordre de UX-01/UX-V1, les KPI avant la formation et les langues. 6) Une vraie photo fournie par Fiona sert de vignette à la vidéo (UX-13), ou se place après les KPI, jamais avant sur mobile.

### UX-03 · Projets : ce que Fiona a fait est caché derrière « Voir les missions »

🟠 important · tous · effort M · Corrigé

- **Preuve** : project-card.tsx:44-57 (<details> fermé par défaut). Par carte : 30 à 33 mots visibles contre 48 à 53 mots cachés. Ouvrir les 4 cartes ajoute 1 080 px à 390 (la page passe de 8 558 à 9 638 px) et 354 px à 1440. À 1440, ouvrir une seule carte laisse un trou de 183 px dans la colonne voisine (609 contre 426 px, à cause de align-items:start ; projects-one-open-1440.png). Les puces répètent les chiffres déjà visibles : « Coordonner une équipe de 7 merchandisers » (portfolio.ts:201) reprend la métrique « 7 » (198), « Signer 3 influenceuses françaises et 2 espagnoles » (243) reprend « 5 » (239). La clé projects.missionLabel (472) n'est jamais affichée.
- **Problème** : La partie visible montre des résultats sans dire ce que Fiona a fait. Son rôle et son périmètre sont derrière 4 clics, qui révèlent surtout des redites à l'infinitif. Le clic n'est pas satisfaisant : ouverture brutale, contenu décevant, mise en page qui se décale.
- **Recommandation** : 1) Supprimer <details> ainsi que detailsLabel et missionLabel. 2) Sous le titre, un paragraphe visible à la 1re personne (nouveau champ project.summary, 30 à 50 mots repris de README:11-17), qui contient le contexte court ET les missions, comme l'exige le brief (README:9). Puis les 2 chiffres. Retirer mission et details, sauf une puce qui apporte une information absente des chiffres (par exemple, pour Massilia, les fournisseurs chinois). 3) Couverture réduite à une ligne de 44 à 48 px : entreprise à gauche, catégorie à droite (et la période quand UX-07 la fournira), padding 14px 20px. Garder la couleur de fond du projet comme repère, sans anneaux ni numéro 01–04. 4) id={project.id} sur <article>. Le scroll-padding-top existant (styles.css:68 et 1325) suffit pour que la carte atterrisse sous l'en-tête. 5) Garder 2 colonnes à partir de 981 px : sans accordéon, le trou de 183 px disparaît. Cible mesurée : 2 161 px à 390 (contre 2 321 fermé et 3 401 ouvert), 1 103 px à 1440.

### UX-04 · Titres et accroches en slogans : la page ne se survole pas et « fait IA »

🟠 important · tous · effort S · Corrigé

- **Preuve** : Les 7 H2 sont des formules : « Des projets concrets. Des résultats mesurables. », « La curiosité comme moteur. L'impact comme cap. », « De la stratégie au terrain. Une approche à 360°. », « Apprendre ici. Voir plus loin. », « Toujours en mouvement. Toujours en apprentissage. », « La confiance se construit. », « Les belles idées commencent par un échange. » (portfolio.ts:458-511). Les 4 titres de projets aussi (170, 191, 212, 233), tout comme « Stratégie. Créativité. Impact. » (449), « Des marques. Du terrain. De l'impact. » (453), « Sans frontières. » (497) et « Imaginé avec curiosité, à Paris. » (521). Le mot « impact » apparaît 5 fois dans <main>. Les textes de mission sont à la forme nominale : « Déploiement de… », « Management d'une équipe… », « Gestion de… », « Identification… » (174, 195, 216, 237). « De la tech au luxe » (461) laisse croire à une expérience dans le luxe, alors que le luxe correspond au MSc.
- **Problème** : Un manager qui survole la page lit les titres : aucun ne dit ce que contient la section. Les vrais libellés ne sont que dans les sur-titres de 12 px. Les parallélismes « X. Y. », les énumérations en trois temps et les formes nominales sont typiques d'un texte généré. Ils effacent la voix de Fiona, alors que ses phrases du README sont concrètes et personnelles.
- **Recommandation** : 1) H2 fonctionnels, identiques aux libellés de navigation (Projets, Parcours, Compétences & outils, Recommandations, Contact), suivis au besoin d'une phrase concrète d'une ligne. Supprimer les sur-titres devenus redondants (UX-19). 2) Titres de projets construits sur action + objet (+ chiffre) : voir la table de l'extra, corrigée. 3) Textes à la 1re personne repris de README:11-17. 4) Bannir les slogans à parallélisme « X. Y. », les triades rhétoriques abstraites et les mots « impact », « rayonner » et « à 360° » (sauf dans le libellé métier « Marketing 360 »). Une liste factuelle d'employeurs ou d'outils reste permise. 5) Remplacer « De la tech au luxe » (461) par « de la tech (Logitech) à un réseau de franchises (CosmétiCar), avec un MSc en marketing du luxe à Londres ». Pas de « puis » ni d'ordre chronologique tant que les dates ne sont pas fournies.

### UX-06 · Statut et objectif absents : poste recherché, contrat, disponibilité

🟠 important · tous · effort S · Corrigé

- **Preuve** : PortfolioProfile (portfolio.ts:2-13 et 105-116) n'a aucun champ pour le statut, le poste recherché, le type de contrat, la disponibilité ou la mobilité. profile.experience (« Plus de 3 ans d'expérience », 114) n'est affiché nulle part. Le hero ne montre que « Paris, France » et « Un parcours international » (hero.tsx:31-40). Impossible de savoir si le Master 2024–2026 est en cours ou terminé.
- **Problème** : C'est la première question d'un recruteur : pour quel poste, et quand ? Sans réponse, le site ressemble à une vitrine plutôt qu'à une candidature, et il faut écrire pour savoir si le profil correspond.
- **Recommandation** : 1) Afficher dès maintenant le fait sourcé dans la ligne formation du hero : « Diplômée d'un Master Marketing Digital & Innovation (IÉSEG) et d'un MSc Luxury Marketing (GCU Londres) » (README:3). L'année d'obtention est à confirmer par Fiona. 2) Ajouter profile.seeking: string | null et profile.availability: string | null (intitulé visé, type de contrat, date, mobilité), à fournir par Fiona. 3) Ne les afficher que s'ils sont renseignés : une ligne en 14 px semi-gras sous le lead (« Je recherche : … · disponible à partir de … ») et un rappel d'une ligne dans Contact. 4) Si la valeur est null, rien ne s'affiche : ni badge « disponible », ni placeholder.

### UX-07 · Parcours : expériences sans dates et séparées des projets

🟠 important · tous · effort M · Corrigé

- **Preuve** : Experience (portfolio.ts:39-45 et 250-274) n'a pas de champ de date. La timeline (sections.tsx:62-72) affiche « Logitech · France » puis le poste, sans période ni type de contrat. Massilia n'a pas de lieu (location: null, 269). Les 3 mêmes entreprises sont présentées deux fois : dans 4 cartes Projets, puis dans 3 entrées de timeline environ 1 300 px plus bas à 390 (timeline à y=3 979, soit 46 % de la page).
- **Problème** : On ne peut évaluer ni l'ancienneté, ni l'ordre, ni la durée des postes, et donc pas croire « 3+ ans ». Le lecteur doit faire lui-même le lien entre projets et postes.
- **Recommandation** : Recommandation de l'auditeur conservée : experience.period, experience.contract et experience.projectIds à fournir par Fiona ; timeline sur trois lignes (« période · contrat » en 13 px, puis « Poste — Entreprise » en 17 px, puis la description avec un lien « Voir le projet ↓ ») ; période reprise dans la couverture compacte des cartes ; rien d'affiché si la valeur est null. Ajouts : a) faire confirmer par Fiona les intitulés de poste et les lieux (UX-V3) avant de les mettre en avant ; b) une fois les dates connues, classer la timeline en ordre antéchronologique. D'ici là, ne présenter l'ordre actuel ni comme chronologique ni avec « puis ».

### UX-08 · Formation : section isolée, 4 cartes de même poids, diplômes aux deux tiers de la page

🟠 important · tous · effort S · Corrigé

- **Preuve** : Section dédiée (sections.tsx:118-140), avec le H2 « Apprendre ici. Voir plus loin. » et 4 cartes de même poids, dont un semestre d'échange sans année (portfolio.ts:300). Hauteur : 854 px à 390. La première carte est à y=5 740 (67 % de la page) sur mobile et à 63 % sur desktop. education[].description n'est jamais affiché. Le brief demandait pourtant « une section expériences et formation en timeline » (README:21).
- **Problème** : Pour une diplômée 2024–2026, les écoles (IÉSEG, GCU Londres, ESSCA) sont un critère de tri immédiat. Elles arrivent ici après les compétences, aux deux tiers de la page.
- **Recommandation** : 1) Fusionner dans Parcours, sous un H3 « Formation » qui garde id='formation'. 2) Liste typographique, une ligne par diplôme, sans icône ni carte : « 2024 – 2026 · Master Marketing Digital & Innovation — IÉSEG, Paris » ; « 2023 – 2024 · MSc Luxury Marketing — GCU, Londres » ; « 2019 – 2022 · Bachelor International Management, spécialisation marketing — ESSCA ». 3) Le Dorset College garde sa propre ligne : « Semestre d'échange — Dorset College, Dublin ». Pas d'année, et pas de rattachement à l'ESSCA tant que Fiona ne l'a pas confirmé. 4) Les deux masters remontent aussi dans le hero (UX-01). Cible : environ 300 px à 390. Le padding-top 0 de .education-section (styles.css:844 et 1476) disparaît avec la fusion.

### UX-10 · Recommandations : aucun auteur, et une promesse non tenue

🟠 important · tous · effort S · Corrigé

- **Preuve** : portfolio.ts:415-426 : titres « Lettre de recommandation 01/02 », sans auteur, poste ni entreprise. La description promet « Les regards de celles et ceux avec qui j'ai eu le plaisir de travailler » (502), mais aucun extrait n'est montré. La seule action est un mailto sans corps de message (sections.tsx:195-200), qui ne fait rien si aucun client mail n'est configuré. La première carte est à y=7 555 (88 % de la page) sur mobile.
- **Problème** : Une recommandation anonyme n'est pas une preuve sociale. Pour savoir qui recommande Fiona, le recruteur doit lui écrire, ce qu'il ne fera pas au stade du tri.
- **Recommandation** : 1) Champs optionnels author, authorRole, organization et excerpt (string | null, comme documentPath). Ne les renseigner qu'avec des données réelles ET l'accord écrit du recommandant pour publier son nom et l'extrait. 2) Titre « Lettre de [auteur], [poste] — [entreprise] » quand ces champs sont renseignés ; sinon, le titre actuel. 3) Cartes compactes (padding 20 px, icône 40 px). 4) Description : « Deux lettres de recommandation, à lire en PDF. » si tous les documentPath sont renseignés, sinon « Deux lettres de recommandation, envoyées par e-mail sur demande. ». 5) mailto avec le subject actuel et un body court pré-rempli. Ne pas répéter l'adresse sous chaque carte. 6) Garder le nom accessible « Demander la lettre : <titre> » (recommendations.test.tsx). 7) Remonter la section juste après Projets dès que des extraits réels existent.

### UX-12 · Points de sortie : Contact ×3, deux mailto identiques, LinkedIn tout en bas, pas de CV

🟠 important · tous · effort S · Vérifié

- **Preuve** : Trois liens « Contact » mènent à #contact (site-header.tsx:82-92 et 101-108, hero.tsx:26-29). Le panneau contact contient deux mailto identiques : l'adresse (contact-section.tsx:42) et « Écrivez-moi » (68). LinkedIn est le seul lien externe de la page, uniquement dans Contact : y=8 296 (97 %) à 390 et 5 238 (95 %) à 1440. Pas de CV. Le bouton de copie n'a qu'une icône (44×44) et son retour s'affiche en 12 px (contact-section.tsx:45-66). Le pied de page n'a ni e-mail ni LinkedIn.
- **Problème** : Les actions sont doublées là où elles sont déjà visibles, et absentes là où on en a besoin. Un recruteur utilise surtout deux sorties : LinkedIn pour vérifier, le CV pour transmettre en interne. La première est tout en bas, la seconde n'existe pas.
- **Recommandation** : 1) Hero : CTA secondaire « LinkedIn ↗ », ou « CV (PDF) » si profile.cvPath est fourni (via BASE_URL). Retirer « Contact » du hero, l'en-tête suffit. 2) Contact : l'adresse en grand, un bouton « Copier » avec libellé visible qui devient « Copiée ✓ » pendant 2,5 s, LinkedIn ↗, et « Télécharger le CV » si fourni. Supprimer « Écrivez-moi », redondant. 3) Pied de page : e-mail, LinkedIn ↗, Haut de page ↑. 4) À décider par Fiona : une adresse prénom.nom sans année paraît plus professionnelle que fiona.2001@live.fr.

### UX-13 · Vidéo de présentation : invitation non bloquante, puis pastille « plus tard »

🟠 important · tous · effort M · Corrigé

- **Preuve** : Demande explicite de l'utilisatrice ; le dépôt n'a aucun composant vidéo. Contraintes mesurées : à 390×844, le bandeau KPI se termine à y=800 (841 avec le hero proposé), donc tout élément fixé en bas d'écran recouvre les KPI au premier affichage. Par ailleurs, chaque push sur main est publié automatiquement sur GitHub Pages (AI_README.md:8).
- **Problème** : Une modale ou une lecture automatique à l'arrivée serait invasive. Et une vidéo provisoire publiée sous « Fiona se présente » mettrait un faux contenu en ligne.
- **Recommandation** : Garder la spécification de l'auditeur : carte non modale <aside aria-label='Présentation vidéo'> en bas à droite. Desktop et tablette : 320 px de large, à 24 px des bords, après 1,2 s. Mobile : à 12 px des bords, bottom max(12px, env(safe-area-inset-bottom)), 76 px de haut au maximum, affichée après le premier défilement. Jamais de focus automatique. Boutons « Regarder » et « Plus tard » de 44 px minimum. « Plus tard », ou un défilement de plus d'un écran sans choix, réduit la carte en pastille de 48 px « ▶ Vidéo », avec un bouton ×. États en sessionStorage dans un try/catch. <dialog> natif avec <video controls playsinline preload='metadata' poster> et <track kind='captions' srclang='fr'>. Lecture au clic. À la fermeture (Échap ou ×), pause et retour du focus au déclencheur. Transcription repliable. En fin de vidéo : « Voir les projets ↓ » et « Me contacter ». Pastille masquée quand #contact est visible ou le menu ouvert. z-index 90, sous l'en-tête (100). Lien permanent vers le MP4 dans Parcours. MP4 H.264 720p de 8 Mo maximum via import.meta.env.BASE_URL. Widget masqué en @media print. Corrections : 1) Implémenter tout de suite avec une vidéo provisoire, comme demandé : fichier neutre dans public/, et introVideo.isPlaceholder = true. 2) Avant tout push sur main, qui publie automatiquement, demander à Fiona si cette version provisoire peut être en ligne. Si elle refuse, isPlaceholder masque le widget dans le build de production (import.meta.env.PROD) et le laisse visible en développement. 3) durationLabel est fourni avec la vraie vidéo, ou lu dans video.duration après loadedmetadata : pas de « 1 min » codé en dur. 4) Fusionner avec la spécification de l'angle video-intro.

### UX-14 · Mobile : 10 écrans, dont un tiers de contenu secondaire en cartes

🟠 important · mobile · effort M · Vérifié

- **Preuve** : Mesures : 8 558 px à 390×844 (10,1 écrans), 8 728 px à 375×667 (13,1 écrans), 9 638 px avec les missions ouvertes. Répartition à 390 : hero 1 175, projets 2 321, parcours 951, compétences 1 064, formation 854, certifications et langues 981, recommandations 521, contact 556. Compétences, formation et certifications totalisent 2 899 px (34 %), soit 13 cartes de même poids. Au total, la page compte 22 blocs en carte.
- **Problème** : Le contenu le moins décisif prend plus de place que les projets. Le défilement est long et uniforme, et le lecteur mobile décroche avant d'arriver au Parcours.
- **Recommandation** : 1) Suivre le budget de la structure cible (extra) : environ 6 100 px à 390, missions visibles comprises, soit −29 % par rapport à aujourd'hui et −37 % par rapport aux missions ouvertes. 2) Règle : les cartes sont réservées aux projets et aux recommandations. Formation, compétences, certifications et langues passent en listes typographiques séparées par des filets de 1 px.

### UX-15 · Certifications : faux logos, organisme de remplissage, TOEIC en double

🟠 important · tous · effort S · Corrigé

- **Preuve** : portfolio.ts:352-401 et sections.tsx:143-163 : 6 cartes avec des monogrammes en guise de logos (LW, AI, S, G, G). « AI Product Building » est attribué à l'organisme « Intelligence artificielle » (364), qui n'en est pas un ; le brief ne précise pas l'organisme (README:21). L'intitulé « Google Ads Analytics » (387) est à confirmer par Fiona : sur Google Skillshop, les certifications s'appellent notamment « Google Ads Search », « Google Ads Measurement » et « Google Analytics ». Le TOEIC 910/990 apparaît deux fois dans la même section (395 et 405), sans année. Hauteur : 981 px à 390 avec les langues.
- **Problème** : Des logos simulés et un organisme de remplissage fragilisent un bloc censé renforcer la crédibilité. Un recruteur qui vérifie ne retrouvera pas les intitulés.
- **Recommandation** : 1) Garder un bloc Certifications visuellement distinct, comme le demande README:21, mais compact : badges d'une ligne d'environ 56 px de haut, 2 colonnes à partir de 720 px, nom en 15 px semi-gras, « organisme · année » en 13 px. 2) Logos : uniquement des logos officiels fournis ou validés par Fiona, en SVG local. Sinon, le nom de l'organisme en texte. Supprimer les monogrammes et les champs mark et style. 3) organization: string | null, à null pour AI Product Building tant que l'organisme n'est pas fourni : n'afficher alors que l'année. 4) credentialUrl: string | null, pour un lien « Vérifier ↗ » s'il est fourni. 5) Tri par année décroissante. Les deux certifications Google peuvent partager un badge « Google Ads — Search, Analytics · 2025 » ; l'intitulé exact de « Google Ads analytics » est à confirmer (README:21). 6) TOEIC affiché une seule fois, dans Langues (« Anglais — TOEIC 910/990 »), année à fournir. À valider par Fiona, puisque le brief le classe parmi les certifications. Cible : environ 320 px à 390.

### UX-16 · Aucun visuel réel : ni portrait, ni image des projets

🟠 important · tous · effort M · Vérifié

- **Preuve** : La seule image du site est une photo d'illustration de bureau (src/assets/creative-desk.jpg, 142 Ko). Les couvertures de projets sont des aplats colorés avec des anneaux décoratifs (project-card.tsx:13-28). Aucune photo de rayon, de PLV, de post Instagram ou de campagne, et aucun portrait.
- **Problème** : Un portfolio marketing sans aucune trace visuelle du travail repose entièrement sur des déclarations. C'est aussi ce qui le rend générique.
- **Recommandation** : À fournir par Fiona, après accord des employeurs pour la confidentialité : un visuel par projet (rayon avant/après, PLV en magasin, capture de compte ou de post, visuel de campagne) et un portrait. Côté données : project.media: readonly { src: string; alt: string }[], vide par défaut, et profile.portrait: { src; alt } | null. Le visuel s'affiche en tête de carte (aspect-ratio 16/9, loading='lazy', width et height fixés) à la place de l'aplat. Le portrait sert de vignette à la vidéo (UX-13) et, sur desktop, peut apparaître en petit (96 px maximum) près du nom ; sur mobile, il vient après les KPI. Tant que c'est vide, la couverture compacte reste, sans cadre vide.

### UX-V1 · Mobile réel : avec la barre du navigateur, seuls 2 KPI sur 4 sont dans le premier écran, et le hero proposé aggrave le problème

🟠 important · mobile · effort S · Ajout

- **Preuve** : Le 390×844 de l'audit est une taille d'écran. Dans Safari iOS, barres affichées, la fenêtre fait environ 390×664 (environ 375×553 sur un iPhone SE). Ce sont des valeurs typiques, à confirmer sur appareil. Aujourd'hui (m1.mjs), les chiffres de la 2e rangée de KPI sont à y=659–694 à 390 px : coupés à 664. À 375×667, même sans aucune barre, ils sont à 655–690, donc coupés. Avec le hero de l'auditeur (proto-hero-copy.mjs relancé, proto-hero-390x664.png), la 2e rangée descend à y=697–731 : invisible. En plaçant la formation et les langues sous les KPI (proto-hero-reordered.mjs), elle remonte à y=607–641 : visible à 390×664. Le point fort « KPI visibles dès le premier écran sur mobile » de l'audit est donc faux sur un vrai téléphone.
- **Problème** : La règle du projet veut que les résultats chiffrés passent en premier sur mobile, et le brief demande les KPI sur la page d'accueil. Sur un vrai téléphone, le recruteur ne voit que +30 % et 140, et le hero proposé repousse encore les chiffres.
- **Recommandation** : 1) Ordre du hero sur mobile : sur-titre, H1, lead (16 px, 3 lignes au plus), [statut si renseigné], CTA, KPI en 2×2, puis la ligne formation et la ligne langues. 2) Tuiles KPI compactes sous 720 px : padding 14px, valeur en 28–30 px, libellé en 13 px sur 2 lignes au plus, entreprise en 12 px. 3) Critères d'acceptation Playwright : à 390×664, le bas des 4 chiffres est à 650 px au plus ; à 375×553, la 1re rangée de KPI et ses libellés sont entièrement visibles. 4) Ne rien afficher en position fixe au premier écran sur mobile : la carte vidéo n'apparaît qu'après le premier défilement (UX-13).

### UX-V3 · Intitulés de poste et lieux sans source : à faire confirmer avant de les mettre en avant

🟠 important · tous · effort S · Ajout

- **Preuve** : portfolio.ts:255 « Marketing Manager Assistant », 263 « Chargée de communication », 270 « Chargée de relations influenceurs », 254 et 262 « France ». README.md ne donne aucun intitulé de poste ni aucun lieu pour ces employeurs. Ces valeurs viennent du commit 50f7ec6 du bot gpt-engineer-app (Lovable) (git log -S). Elles sont affichées en H3 dans la timeline (sections.tsx:69), et UX-07 propose de les mettre davantage en avant (« Poste — Entreprise » en 17 px).
- **Problème** : Un recruteur compare avec LinkedIn. Un intitulé approximatif, par exemple un poste d'assistante présenté sans « stage » ni « alternance », ou un titre anglais au lieu du titre réel, coûte de la crédibilité, et les règles du projet interdisent d'inventer des faits.
- **Recommandation** : 1) Placer en tête de la liste « À fournir par Fiona » : l'intitulé exact de chaque poste, tel qu'il figure sur LinkedIn ou sur le contrat, en français ou en anglais selon l'original, et le lieu. 2) Ne pas réutiliser ces intitulés dans le hero, les KPI ou la meta description avant sa confirmation. 3) Une fois les intitulés confirmés, les afficher avec experience.period et experience.contract (UX-07). 4) Pas de suppression préventive : les valeurs restent affichées comme aujourd'hui en attendant la confirmation.

### UX-05 · KPI du hero : répétés sans lien avec les projets, et « 3+ ans » n'est pas un résultat

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : portfolio.ts:136-161 : 3 des 4 KPI du hero (+30 %, 140, 500+) sont répétés à l'identique dans les cartes (177, 197, 218), sans lien entre les deux. Le 4e, « 3+ ans — Un parcours international » (156-160), n'est pas un résultat alors que le bloc s'intitule « Mes résultats en chiffres » (448). Rien ne permet non plus de le vérifier, puisqu'aucune expérience n'est datée. Massilia est le seul projet sans KPI dans le hero.
- **Problème** : La répétition ressemble à du remplissage. Un recruteur intrigué par « +30 % » doit chercher lui-même la carte correspondante.
- **Recommandation** : 1) Ajouter ImpactStat.projectId, typé Project['id'], et un test vitest qui vérifie que chaque projectId correspond à un projet existant. 2) Rendre le bloc sous forme de <ul> de 4 <li><a href='#id-projet'>, au lieu d'un div avec aria-label. Nom accessible : valeur + libellé + entreprise. Flèche ↓ de 12 px à côté de l'entreprise, jamais ↗. 3) Remplacer « 3+ ans » par « 5 influenceuses signées en 1 mois — Massilia · Relations influenceurs » (README:17), et placer « plus de trois ans » dans le lead (UX-01). 4) Préciser le périmètre quand README le donne : « +30 % de ventes sur le rayon informatique » (README:11). Harmoniser « activés » et « équipés » (146/197) ainsi que seo.socialDescription (124). 5) Retour visuel : .project-card:target { outline: 2px solid var(--primary); outline-offset: 4px }, sans animation de fond.

### UX-09 · Compétences génériques, outils séparés des preuves

🟡 amélioration · tous · effort M · Corrigé

- **Preuve** : portfolio.ts:307-350 et sections.tsx:80-116 : 3 cartes de 4 intitulés génériques (« Gestion de projet », « Analyse des performances », « Communication de marque ») sans lien avec les projets, plus 9 pastilles d'outils à part. Hauteur : 1 064 px à 390, soit 12 % de la page.
- **Problème** : Cette liste déclarative ressemble à toutes les autres. Elle ne relie ni compétence, ni outil, ni preuve : elle ne convainc pas et rallonge la page.
- **Recommandation** : 3 groupes en colonnes de texte (une seule colonne sous 720 px), sans carte ni icône. Chaque groupe : un intitulé, 3 ou 4 compétences, puis une ligne « Outils : … ». Marketing & trade : category management, trade marketing, PLV, déploiement de campagnes. Communication & contenus : Facebook, Instagram, TikTok, relations influenceurs, création graphique et vidéo. Coordination : management d'une équipe terrain, formation de franchisés, relations fournisseurs. Les outils de README:7 sont classés par nature, sans les rattacher à un employeur : création (Canva, Photoshop, Premiere Pro, CapCut, iMovie), e-mailing (Mailchimp), organisation (Trello, Notion, Google Workspace). Liens « Voir le projet ↓ » uniquement pour les compétences attestées : category management → #logitech-category-management ; trade marketing et PLV → #logitech-trade-marketing ; réseaux sociaux et formation des franchisés → #cosmeticar-social-media ; relations influenceurs et fournisseurs → #massilia-influencer-relations. Cible : environ 550 px à 390.

### UX-11 · Navigation : 7 entrées, menu à deux niveaux, Contact en double

🟡 amélioration · mobile, tablette, desktop · effort M · Corrigé

- **Preuve** : portfolio.ts:127-134 : 6 liens plus Contact. Le menu mobile et tablette a deux niveaux, avec le libellé « Pour aller plus loin » (site-header.tsx:96-114). Menu ouvert, « Contact » apparaît deux fois en même temps : pastille d'en-tête et entrée de menu (shots/mobile-390-menu.png). Le burger s'applique jusqu'à 980 px (styles.css:1188-1222), donc aussi sur une tablette de 768 px.
- **Problème** : 7 entrées, c'est beaucoup pour une page courte. Le découpage principal/secondaire est arbitraire (Formation est secondaire alors qu'un recruteur la cherche en priorité), et la tablette impose un clic de plus.
- **Recommandation** : À faire après les fusions UX-07, 08, 09 et 15. 1) 4 liens (Projets, Parcours, Compétences, Recommandations) plus la pastille Contact. 2) Navigation en ligne dès 768 px : passer à 767px le @media (max-width: 980px) qui masque .desktop-nav et affiche .mobile-menu, ET passer à 768px le matchMedia de site-header.tsx:27. 3) Sous 768 px : burger à un seul niveau, 4 entrées de 48 px, sans Contact en double ni « Pour aller plus loin ». « LinkedIn ↗ » en pied de menu, facultatif. 4) Supprimer tier et navigation.secondaryLabel. 5) sectionIds = accueil + les 4 liens + contact. #formation, #certifications et #langues restent des id de sous-titres dans leur section parente, qui porte alors l'état actif.

### UX-17 · Bandeau de marques : sans libellé sur mobile, et redondant

🟡 amélioration · mobile, desktop · effort S · Corrigé

- **Preuve** : hero.tsx:67-74. Le libellé « Des marques. Du terrain. De l'impact. » est masqué sous 720 px (styles.css:1410-1413) : les trois noms restent seuls, en gris 21 px, sans contexte, à y=1 079. À 1440×900, le bandeau commence à y=868, hors du premier écran. La graphie « logitech. » (portfolio.ts:429) diffère de « Logitech » partout ailleurs.
- **Problème** : Sur mobile, on ne sait pas s'il s'agit de clients, d'employeurs ou de partenaires. C'est aussi le 3e rappel des mêmes entreprises (KPI, bandeau, cartes).
- **Recommandation** : Supprimer le bandeau de marques (hero.tsx:67-74) : les entreprises sont nommées dans le lead (UX-01) et sous chaque KPI. Retirer brands et sectionContent.career de portfolio.ts, ainsi que les styles .brand-strip et .brand-list. Supprimer aussi le point ajouté par project-card.tsx:17 pour écrire « Logitech » partout.

### UX-18 · Pied de page décoratif, sans aucune sortie

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : portfolio.tsx:49-60 : « © Fiona Talbi · Marketing 360 & Communication », « Imaginé avec curiosité, à Paris. » et « Retour en haut ». Sur mobile, cela fait 3 lignes, sans e-mail ni LinkedIn (shots/mobile-390-part4.png).
- **Problème** : Le lecteur qui arrive en bas de page n'a pas de raccourci pour agir. La signature est un remplissage de plus.
- **Recommandation** : À partir de 720 px, une ligne : « Fiona Talbi · Paris » — e-mail (mailto) — LinkedIn ↗ — Haut de page ↑. Sous 720 px, deux lignes : « Fiona Talbi · Paris », puis les trois liens. Chaque lien fait au moins 44 px de haut. Supprimer footer.signature. Le lien « Haut de page » reste dans le pied de page, non flottant.

### UX-19 · Numérotation des sections inutile, et atterrissage irrégulier sur Formation

🟡 amélioration · tous · effort S · Vérifié

- **Preuve** : Pastilles 01 à 07 (portfolio.ts:456-508) ; Langues et le hero ne sont pas numérotés. Après un clic de navigation vers Formation, le sur-titre arrive à y=92 sur mobile et 120 sur desktop, contre 134 et 184 pour toutes les autres sections, à cause de .education-section { padding-top: 0 } (styles.css:844 et 1476).
- **Problème** : La numérotation est un tic de gabarit : elle n'apporte aucune information et devra être refaite à chaque réorganisation. L'atterrissage irrégulier se remarque en navigation.
- **Recommandation** : Supprimer les numéros (champ number). Garder un sur-titre seulement si le H2 n'est pas déjà explicite. Uniformiser le padding des sections, ou faire de Formation une sous-partie de Parcours (UX-08).

### UX-20 · Typographie française et jargon

🟡 amélioration · tous · effort S · Vérifié

- **Preuve** : portfolio.ts ne contient aucune espace fine insécable (0 occurrence de U+202F) : les espaces avant %, : et ? sont des espaces simples (lignes 124, 139, 177, 193, 509, 513). Sur le prototype de carte à 390, « 30 » et « % » se retrouvent sur deux lignes (proto-card-390.png). Jargon non expliqué : « catman » (176), « day one » (146, 197), « top stores ». Casse incohérente : « Category Management » (169) contre « Category management » (141), « Social Media » (210) contre « Social media » (153).
- **Problème** : Ce sont de petits accrocs, mais ils comptent pour un profil communication. Le jargon ralentit les lecteurs qui ne viennent pas du retail.
- **Recommandation** : 1) Utiliser U+202F avant % : ; ! ? et U+00A0 entre un nombre et son unité dans les données ; un test vitest peut le vérifier. 2) Expliquer au premier usage : « category management (catman) », « dès le jour du lancement (day one) ». 3) Casse de phrase partout.

### UX-21 · Aperçu de partage sans image ni URL

🟡 amélioration · tous · effort S · Vérifié

- **Preuve** : Le <head> généré (routes/index.tsx:6-13, routes/__root.tsx:79-89) contient og:title, og:description, og:type et twitter:card=summary_large_image, mais ni og:image, ni og:url, ni <link rel='canonical'>. L'og:title « Fiona Talbi — Marketing, créativité & impact » reprend le slogan.
- **Problème** : Quand un recruteur transmet le lien (LinkedIn, Teams, Slack, WhatsApp), l'aperçu n'a pas d'image et la carte « grande image » reste vide.
- **Recommandation** : 1) Créer une image statique 1200×630 dans public/og.png : nom, rôle, 3 KPI, fond uni de la charte, sans fausse photo. 2) og:image et og:url en URL absolues (https://fio-tlb.github.io/fiona-talbi-portfolio/…), canonical identique, og:locale fr_FR. 3) og:title : « Fiona Talbi — Marketing 360 & communication, Paris ».

### UX-V2 · Impression et « Enregistrer en PDF » : entreprises des projets, LinkedIn et missions disparaissent

🟡 amélioration · tous · effort S · Ajout

- **Preuve** : Le bloc @media print (styles.css:1601-1609) masque .project-cover et .contact-actions. Test emulateMedia('print') (print.mjs, print.pdf) : .project-brand est invisible sur les 4 cartes. La carte CosmétiCar ne nomme alors plus l'entreprise : « Faire grandir une marque de niche. / Développer la présence digitale d'un réseau de franchises… ». Aucun lien LinkedIn dans le rendu imprimé (linkedinVisible: false), et les <details> fermés ne sont pas imprimés, donc les missions non plus.
- **Problème** : Tant qu'il n'y a pas de CV, imprimer la page ou l'enregistrer en PDF est la façon dont un recruteur transmet un profil en interne. Or le document obtenu perd les noms d'entreprise, le seul lien de vérification et les missions.
- **Recommandation** : Dans @media print : 1) Afficher l'entreprise et la catégorie en texte, sur une ligne : .project-cover { display:block; background:none; min-height:0; padding:0 0 6px } ; .cover-rings, .project-number { display:none }. 2) Afficher les liens de contact et leurs URL : .contact-actions { display:flex } ; .contact-actions a[href^='http']::after { content:' (' attr(href) ')' } ; ne masquer que .copy-button. 3) Masquer le futur widget vidéo et la pastille. 4) Le problème des missions disparaît avec la suppression de <details> (UX-03). Vérifier avec page.pdf() dans Playwright que les quatre noms d'entreprise et l'URL LinkedIn figurent dans le PDF.

### UX-22 · Version anglaise pour les recrutements internationaux

⚪ bonus · tous · effort L · Vérifié

- **Preuve** : Le site est uniquement en français (lang='fr', __root.tsx:110), alors que les cibles sont des marques tech et luxe internationales (Logitech, MSc à Londres) et que l'anglais est mis en avant (TOEIC 910/990).
- **Problème** : Un manager non francophone ne peut pas lire le site, et l'anglais revendiqué n'est pas démontré.
- **Recommandation** : En phase 2, une fois la traduction validée par Fiona : un fichier portfolio.en.ts de même structure, une route /en/ pré-rendue pour Pages, un lien texte « EN » dans l'en-tête et des balises hreflang. Pas de sélecteur de langue tant que la version n'existe pas.

### UX-23 · Se démarquer par du contenu réel, pas par des effets

⚪ bonus · tous · effort M · Vérifié

- **Preuve** : Les centres d'intérêt « Voyage, Lecture, Dessin » sont en pastilles génériques (portfolio.ts:409-413, sections.tsx:45-54). Rien de personnel ou de non générique sur la page : photo d'illustration, anneaux décoratifs, monogrammes.
- **Problème** : C'est ce qui donne l'impression « IA » : rien sur la page n'appartient vraiment à Fiona.
- **Recommandation** : S'appuyer sur ce que personne d'autre n'a : la vidéo (UX-13), les phrases à la première personne du README, un visuel avant/après du rayon Logitech et, si Fiona dessine vraiment, 2 ou 3 croquis scannés comme seuls ornements, à la place de .cover-rings (à fournir). Les centres d'intérêt passent sur une ligne de texte dans Parcours, avec un détail réel par intérêt si Fiona le souhaite.

**Garde-fous de cet angle (à ne pas faire)**

- Pas de modale, de voile sombre ni de lecture automatique (même muette) pour la vidéo. Pas de vidéo en fond du hero.
- Ne pas publier la vidéo provisoire sur main : Pages publie chaque push. Garder introVideo = null tant que la vraie vidéo n'est pas fournie.
- Un seul élément flottant : la pastille vidéo. Pas de bouton « retour en haut » flottant, pas de chat, pas de bandeau superflu.
- Pas de compteurs animés sur les KPI, d'effet machine à écrire ni de mots qui défilent dans le titre.
- Pas de carrousel (projets, recommandations, certifications) ni de défilement horizontal : tout reste visible en colonne.
- Ne pas cacher le contenu des projets dans des accordéons, onglets ou modales. Pas de carte entièrement cliquable sans page de détail.
- Pas de barres de niveau, de pourcentages ou d'étoiles pour les compétences, les outils et les langues.
- Ne rien inventer : pas de faux logo ni de monogramme, pas de photo d'illustration présentée comme personnelle, pas de portrait généré par IA, pas de citation de recommandation inventée, pas de badge « disponible » non confirmé, pas de dates supposées.
- Aucun placeholder visible (« photo à venir », « CV bientôt ») : un champ à null n'affiche rien.
- Plus de formules « X. Y. », d'énumérations en trois temps ni de mots creux (impact, rayonner, passion, à 360°). Pas d'emoji dans les textes.
- Pas de formulaire de contact : Pages n'a pas de serveur, et un service tiers ajoute une dépendance et une collecte de données. mailto, copie et LinkedIn suffisent.
- Pas de curseur personnalisé, de parallaxe, de scroll snapping ni de détournement du défilement.
- Pas de flèches diagonales sur les ancres internes : réservées à LinkedIn, aux PDF et aux liens de vérification.
- Ne pas supprimer le lien de menu Recommandations, la pastille Contact sur mobile et tablette, ni la barre de progression.
- Pas de sélecteur de langue tant que la version anglaise n'existe pas. Pas de bascule de thème ajoutée seulement pour faire moderne.

<details><summary>Livrable détaillé de l'auditeur et corrections du relecteur</summary>

## 1. Trois lectures simulées (état actuel)

| Lecteur | Mobile 390×844 | Desktop 1440×900 (et 1366×768) | Où il décroche, ce qui manque |
|---|---|---|---|
| Recruteur pressé, 10 s | Voit le nom (2 fois), le slogan en 52 px, « Marketing 360 & Communication », une phrase générique, 2 CTA et les 4 KPI (fin à y=800). Retient : « marketing, +30 % de ventes, 140 magasins ». | Voit le slogan en 86 px, la photo de bureau (21 % de l'écran) et les KPI en bas (y=736). À 1366×768 et 1280×720, aucun chiffre visible : il retient seulement un slogan. | Les employeurs ne sont qu'en 12 px gris. Ni école, ni statut, ni poste visé, ni LinkedIn, ni CV. |
| Manager qui survole, 60 s | Lit les H2 : 7 formules sans information. Dans les cartes, des chiffres sans le rôle. Parcours sans dates à y=3 979. Décroche dans la suite compétences, formation et certifications (2 899 px). | Même parcours, plus vite. S'arrête aux recommandations anonymes. | Rôle exact par projet, périodes, preuve visuelle, lien entre projet et poste. |
| Lecteur intéressé, 3 min | Ouvre 4 accordéons (+1 080 px) et lit des puces à l'infinitif qui répètent les chiffres. Doit écrire pour obtenir une lettre. LinkedIn est à y=8 296. | Un accordéon ouvert laisse un trou de 183 px dans la grille. | CV, visuels, auteurs des recommandations, voix et personnalité (la vidéo répondra à ce manque). |

## 2. Structure de page cible

| Ordre | Section (ancre) | Rôle en une ligne | Fusion ou allègement | Hauteur à 390 px (actuel → cible) |
|---|---|---|---|---|
| 0 | Accueil `#accueil` | Dire qui, quoi, où, et prouver en 4 chiffres | Suppression de la photo d'illustration, de sa légende, du bandeau de marques et du CTA « Contact » | 1 175 → ~880 (prototypé) |
| 1 | Projets `#projets` | Montrer ce que Fiona a fait et ce que ça a donné | Accordéons supprimés, couverture de 121 à ~48 px, texte à la 1re personne visible | 2 321 (3 401 ouvert) → ~2 160 (prototypé) |
| 2 | Parcours `#parcours` (+ `#formation`) | Situer dans le temps : postes datés et diplômes | Fusion Parcours + Formation (comme demandé en README:21), centres d'intérêt sur une ligne, lien vidéo permanent | 951 + 854 → ~1 100 (estimé) |
| 3 | Compétences `#competences` (+ `#certifications`, `#langues`) | Montrer outils et savoir-faire, reliés aux preuves | Fusion compétences, outils, certifications et langues ; listes à la place de 9 cartes | 1 064 + 981 → ~1 000 (estimé) |
| 4 | Recommandations `#recommandations` | Preuve sociale nominative | Cartes compactes ; la section passe après Projets dès qu'il y a des extraits réels | 521 → ~380 |
| 5 | Contact `#contact` | Convertir : e-mail, copie, LinkedIn, CV | Bouton « Écrivez-moi » (doublon) supprimé | 556 → ~480 |
| — | Pied de page | Rappeler les sorties | Signature décorative supprimée | ~120 |
| | **Total** | | | **8 558 → ~6 100 px (−29 %), missions visibles comprises** |

Les cartes sont réservées aux projets et aux recommandations. Le reste passe en listes typographiques séparées par des filets de 1 px.

## 3. Hero révisé

Disposition : sur desktop (≥ 981 px), deux colonnes 1.05fr / 0.95fr, texte à gauche, KPI 2×2 à droite, padding-top 120 px. Sur mobile, tout est empilé et les KPI viennent juste après les CTA.

1. **Sur-titre** (14 px, 600, gris) : Marketing 360 & communication · Paris
2. **H1** (clamp(48px, 6vw, 80px)) : Fiona Talbi
3. **Lead** (18–20 px, couleur texte, ~34em max) : « Plus de trois ans de marketing entre la marque et le terrain : category management et trade marketing chez Logitech, réseaux sociaux chez CosmétiCar, relations influenceurs chez Massilia E-consulting. »
4. **Formation** (14 px, gris) : « Master Marketing Digital & Innovation, IÉSEG (2024–2026) · MSc Luxury Marketing, GCU Londres »
5. **Statut**, affiché seulement si `profile.seeking` est renseigné (à fournir par Fiona) : « Je recherche : … · disponible à partir de … »
6. **CTA** : « Voir les projets ↓ » (primaire) et « LinkedIn ↗ » (secondaire). Si `profile.cvPath` est fourni, le secondaire devient « CV (PDF) » et LinkedIn passe dans la ligne 7.
7. **Langues** (13 px) : « Français · Anglais (TOEIC 910/990) · Espagnol B2 »
8. **KPI-liens**, chacun `<a href="#id-projet">` avec une flèche ↓ :
   - **+30 %** de ventes grâce au réagencement — Logitech · Category management
   - **140** top stores équipés dès le jour du lancement — Logitech · Trade marketing
   - **500+** abonnés Instagram en moins d'un an — CosmétiCar · Social media
   - **5** influenceuses signées en 1 mois — Massilia · Relations influenceurs

Test dans le navigateur (DOM modifié, audit/ux-recruteur/proto-hero.mjs) : le hero passe de 971 à ~580 px à 1440 ; les KPI sont à y=182–473 à 1280×720, tous visibles ; à 390×844, les 4 KPI tiennent dans le premier écran (fin à y=841). Captures : proto-hero-1280.png et proto-hero-390.png. Ces maquettes ne valident que la hiérarchie, pas le style visuel.

## 4. Navigation

- **Desktop et tablette (≥ 768 px)** : `Fiona Talbi.` — Projets · Parcours · Compétences · Recommandations — [Contact ✉]. La barre de progression est conservée. Testé à 768 px : la barre occupe 718 px sur 718, sans débordement (proto-nav-768.png).
- **Mobile (< 768 px)** : `Fiona Talbi.` [Contact ✉] [☰]. Menu à un seul niveau : Projets, Parcours, Compétences, Recommandations (48 px chacun), avec « LinkedIn ↗ » en pied de menu si on le souhaite. Plus de « Contact » en double, plus de « Pour aller plus loin ».
- Côté données : `navigation` sans `tier`, et `sectionIds` = accueil + les 4 liens + contact. Les ancres `#formation`, `#certifications` et `#langues` restent comme `id` des sous-titres, pour ne casser aucun lien déjà partagé.
- Retour au clic : l'état actif existant, plus `:target` sur la carte projet atteinte depuis un KPI.

## 5. Vidéo de présentation : déroulé

1. **Arrivée** : rien ne bloque la page. Une carte non modale apparaît en bas à droite (après 1,2 s sur desktop ; après le premier défilement sur mobile, pour que les KPI passent d'abord) : « Fiona se présente · 1 min », avec [Regarder] et [Plus tard].
2. **Regarder** : ouvre un `<dialog>` avec la vidéo sous-titrée, les contrôles natifs et la transcription. En fin de vidéo : « Voir les projets ↓ » et « Me contacter ».
3. **Plus tard** (ou défilement de plus d'un écran sans choix) : la carte se réduit sur place en pastille de 48 px, « ▶ Vidéo · 1 min », avec un bouton ×.
4. **×** : la pastille est masquée pour la session. La vidéo reste accessible par le lien permanent de la section Parcours.
5. La pastille se cache quand le contact est visible ou quand le menu est ouvert. C'est le seul élément flottant du site.
6. `introVideo` reste à `null` sur `main` tant que la vraie vidéo n'est pas fournie.

## 6. Réécritures proposées

À valider par Fiona. Elles ne reprennent que des faits du README et des données.

| Emplacement (portfolio.ts) | Texte actuel | Proposition |
|---|---|---|
| hero 442-445 | De l'idée à l'impact. / J'allie stratégie, création et coordination terrain pour faire rayonner les marques. | H1 « Fiona Talbi » + le lead de la section 3 |
| 449, 453 | Stratégie. Créativité. Impact. / Des marques. Du terrain. De l'impact. | Supprimés |
| projets 468-471 | Des projets concrets. Des résultats mesurables. / Quatre expériences où la stratégie rencontre le terrain… | **Projets** — Quatre missions chez Logitech, CosmétiCar et Massilia E-consulting : ce que j'ai fait, et ce que ça a donné. |
| projet 1 (170) | Repenser le rayon. Booster les ventes. | **Réagencer le rayon informatique des top stores** — J'ai déployé plus de 100 solutions de category management dans nos top stores. Le nouvel agencement du rayon informatique a augmenté les ventes de 30 %. |
| projet 2 (191) | Le bon impact, dès le premier jour. | **La PLV en place dès le jour du lancement, dans 140 magasins** — Aux côtés du responsable des ventes terrain, j'ai managé une équipe de 7 merchandisers : la PLV était disponible dès le premier jour dans nos 140 top stores, pour les lancements produits comme pour les Logi Work Days. |
| projet 3 (212) | Faire grandir une marque de niche. | **Faire connaître un réseau de lavage auto sur Instagram** — J'ai géré Facebook, Instagram et TikTok, avec un focus sur Instagram : plus de 500 abonnés en moins d'un an, dans une niche, la franchise de lavage auto. Avec plus de 30 ouvertures d'agence dans l'année, j'ai assuré 30 formations communication pour les franchisés. |
| projet 4 (233) | Créer des liens, au-delà des frontières. | **Signer 5 influenceuses en un mois, en France et en Espagne** — En un mois, j'ai signé 3 influenceuses françaises et 2 espagnoles. Au début de la crise sanitaire, je gérais aussi les fournisseurs chinois : nos stocks étaient limités, et notre marge de manœuvre avec les influenceuses aussi. |
| parcours 458-461 | La curiosité comme moteur. L'impact comme cap. / De la tech au luxe… | **Parcours** — Basée à Paris, formée à Paris, Londres et Dublin. J'ai travaillé dans la tech (Logitech), dans un réseau de franchises (CosmétiCar) et en relations influenceurs (Massilia E-consulting), puis je me suis spécialisée en marketing du luxe à Londres. |
| compétences 478-479 | De la stratégie au terrain. Une approche à 360°. | **Compétences & outils** |
| formation 486-487 | Apprendre ici. Voir plus loin. | Sous-titre **Formation** |
| certifications 494-495 | Toujours en mouvement. Toujours en apprentissage. | Sous-titre **Certifications** — Depuis 2025 : Google Ads, IA, développement web. |
| langues 497 | Sans frontières. | **Langues** |
| recommandations 501-502 | La confiance se construit. / Les regards de celles et ceux… | **Recommandations** — Deux lettres de recommandation, à lire en PDF (ou : envoyées par e-mail sur demande). |
| contact 509-513 | Et si on échangeait ? / Les belles idées commencent par un échange. / Un projet, une opportunité… | **Contact** — H2 « Écrivez-moi » — Le plus simple : un e-mail. Je suis aussi sur LinkedIn. |
| pied de page 521 | Imaginé avec curiosité, à Paris. | Fiona Talbi · Paris — e-mail — LinkedIn ↗ — Haut de page ↑ |
| seo.socialTitle 122 | Fiona Talbi — Marketing, créativité & impact | Fiona Talbi — Marketing 360 & communication, Paris |

## 7. Données à ajouter

Tous les champs sont optionnels : rien ne s'affiche s'ils sont absents.

```ts
// src/data/portfolio.ts — valeurs à fournir par Fiona
interface PortfolioProfile { /* … */ seeking: string | null; availability: string | null; cvPath: string | null; portrait: { src: string; alt: string } | null }
interface ImpactStat extends Metric { company: string; projectId: string }
interface Project { /* … */ summary: string; role: string | null; period: string | null; media: readonly { src: string; alt: string }[] }
interface Experience { /* … */ period: string | null; contract: string | null; projectIds: readonly string[] }
interface Certification { /* … */ organization: string | null; credentialUrl: string | null }
interface Recommendation { /* … */ author?: string; authorRole?: string; organization?: string; excerpt?: string }
export const introVideo: { src: string; poster: string | null; captions: string | null; transcript: string | null; durationLabel: string | null } | null = null;
```

Les chemins vers `public/` passent toujours par `import.meta.env.BASE_URL`. Clés inutilisées à retirer : `hero.eyebrow` (441), `projects.missionLabel` (472), `profile.experience` (114), `education[].description` (jamais affiché), ainsi que `brands` et `career` si le bandeau disparaît.

**À fournir par Fiona, par ordre d'impact :**
1. Dates et type de contrat de chaque expérience
2. Poste recherché et disponibilité
3. CV en PDF
4. Vraie vidéo et ses sous-titres
5. Portrait
6. Un visuel par projet (avec l'accord de l'employeur)
7. Auteurs et PDF des recommandations
8. Organisme de « AI Product Building », intitulé exact de « Google Ads Analytics », année du TOEIC
9. Traduction anglaise validée

## 8. Ordre d'implémentation conseillé

1. Textes et données : UX-01, 04, 05, 20 (effort S)
2. Hero et KPI-liens : UX-01, 02, 05 (M)
3. Cartes projets entièrement visibles : UX-03 (M)
4. Fusion des sections et navigation : UX-07, 08, 09, 11, 15, 17, 19 (M)
5. Contact, pied de page, aperçu de partage : UX-12, 18, 21 (S)
6. Vidéo : UX-13 (M)
7. Contenus fournis au fur et à mesure : UX-06, 10, 16, 22, 23

Scripts et captures de l'audit : (fichier de travail de l'audit, hors dépôt) ux-recruteur/ (measure.mjs, measure2.mjs, proto-hero.mjs, proto-cards.mjs, navw.mjs, fold-1366x768.png, projects-one-open-1440.png, proto-hero-1280.png, proto-hero-390.png, proto-card-390.png, proto-nav-768.png).

**Corrections du relecteur sur ce livrable :**

Bilan : l'extra est solide et la plupart des mesures se vérifient (hero de 579 px à 1440, KPI à y=184–475 avec le prototype, projets à 2 161 / 1 103 px, navigation qui tient à 768 px et même à 753). Il contient cependant deux faits inventés, une contradiction avec la demande de l'utilisatrice et des erreurs de mesure sur le pli mobile.

1. Lectures simulées (§1)
- Mobile, « les 4 KPI (fin à y=800) » : vrai pour une fenêtre de 844 px, faux sur un vrai téléphone. Dans Safari iOS (environ 390×664), la 2e rangée (y=659–694) est coupée, et à 375×667 elle est hors écran (655–690). Il faut écrire : « voit +30 % et 140 ; 500+ et 3+ ans sont sous le pli ».
- Desktop, « à 1366×768 et 1280×720, aucun chiffre visible » contredit UX-02, qui dit « coupés » à 1366×768 (chiffres à 757–797). Il faut écrire : « coupés à 1366×768 (taille d'écran), invisibles à 1280×720 ; une fois la barre du navigateur déduite (1366×657, 1536×730, 1440×790), invisibles ou coupés sur presque tous les portables ».

2. Structure cible (§2)
- Les hauteurs se vérifient : 1 175 → 881 px pour le hero prototypé à 390 ; la somme des cibles fait bien environ 6 100 px. Mais la ligne Accueil doit intégrer l'ordre mobile corrigé (KPI avant la formation et les langues, UX-V1).
- La fusion « Compétences + certifications + langues » doit garder un bloc Certifications visuellement distinct (des badges), car le brief demande « une section Certifications mise en valeur visuellement… avec le logo de l'organisme » et « une section langues » (README:21). Le tableau doit le dire, au lieu de passer tout en listes.
- La règle « cartes réservées aux projets et aux recommandations » doit donc admettre des badges compacts pour les certifications.

3. Hero révisé (§3)
- Contradiction interne : le texte dit « KPI juste après les CTA », mais la liste place les langues (7) entre les CTA (6) et les KPI (8). L'ordre mobile corrigé est 1, 2, 3, 5, 6, 8, puis 4 et 7. Mesuré : 2e rangée de KPI à y=607–641 au lieu de 697–731 à 390×664.
- « à 390×844, les 4 KPI tiennent dans le premier écran (fin à y=841) » : la marge est de 3 px, et l'affirmation est fausse dans un vrai navigateur. À remplacer par le critère de UX-V1.
- KPI 1 : préférer « +30 % de ventes sur le rayon informatique » (README:11), plus précis que « grâce au réagencement ».
- Ligne formation : « Diplômée de… » est sourcé (README:3) et répond en partie à UX-06.
- Le prototype affiche « TOEIC 910 », le texte « TOEIC 910/990 » : garder 910/990.

4. Navigation (§4)
- « 718 px sur 718 » se vérifie, mais 718 est la largeur du conteneur, sans débordement. Le contenu tient aussi à 753 px, donc avec une barre de défilement classique. Il manque une précision d'implémentation : changer à la fois le @media (max-width: 980px) et le matchMedia('(min-width: 981px)') de site-header.tsx:27.

5. Vidéo (§5) et liste « à éviter »
- « introVideo reste à null sur main tant que la vraie vidéo n'est pas fournie », et la ligne d'« avoid » « Ne pas publier la vidéo provisoire sur main », contredisent la demande verbatim (« pour l'instant tu peux mettre n'importe quoi comme vidéo »). Correction : implémenter maintenant avec une vidéo provisoire (introVideo.isPlaceholder = true), puis DEMANDER à Fiona avant tout push sur main si cette version peut être en ligne. Si elle refuse, le widget est masqué dans le build de production via isPlaceholder.
- « Fiona se présente · 1 min » et « ▶ Vidéo · 1 min » : la durée ne peut pas être codée en dur. Elle vient de durationLabel ou de video.duration.
- Ligne d'« avoid » sur les énumérations en trois temps : la limiter aux triades rhétoriques abstraites. Les réécritures de l'auditeur contiennent elles-mêmes des listes factuelles de trois éléments, et c'est légitime.

6. Réécritures (§6) : vérification ligne à ligne contre README.md et portfolio.ts
- Projets 1 et 3, titre et texte de la section Projets, lead, KPI, langues, recommandations, contact, socialTitle : conformes (README:3, 7, 11, 15, 17, 19).
- Parcours, FAIT INVENTÉ : « puis je me suis spécialisée en marketing du luxe à Londres » affirme que les expériences précèdent le MSc (2023–2024). Or aucune expérience n'est datée, et seule Massilia est située « au début de la crise sanitaire ». À remplacer par : « Basée à Paris, formée à Paris, Londres et Dublin. J'ai travaillé dans la tech (Logitech), dans un réseau de franchises (CosmétiCar) et en relations influenceurs (Massilia E-consulting). Côté formation : marketing digital à l'IÉSEG et marketing du luxe à Londres. »
- Formation (UX-08), FAIT INVENTÉ : « dont un semestre d'échange au Dorset College, Dublin » rattache ce semestre à l'ESSCA, ce que README:7 ne dit pas. Il garde sa propre ligne, sans année.
- Projet 2 : « j'ai managé une équipe de 7 merchandisers : la PLV était disponible… ». Les deux-points créent un lien de cause que README:13 ne fait pas (deux phrases juxtaposées). Remplacer par un point.
- Projet 4 : conforme. « En France et en Espagne » s'appuie sur portfolio.ts:235, et les influenceuses sont « françaises » et « espagnoles » (README:17).
- Certifications : « Depuis 2025 : Google Ads, IA, développement web. » est conforme, mais l'organisme d'AI Product Building reste inconnu. Ne pas écrire de phrase qui laisse croire à un organisme.
- Timeline : le format « Poste — Entreprise » reprend des intitulés de poste non sourcés (UX-V3). À confirmer avant de les mettre en avant.

7. Données à ajouter (§7)
- « Tous les champs sont optionnels », alors que Project.summary est déclaré string (obligatoire) : le dire. C'est du contenu repris du README, pas une donnée à fournir.
- Recommendation utilise author?: string, alors que le projet emploie la convention « string | null » (documentPath, AI_README.md:5). Harmoniser.
- ImpactStat.projectId : le typer Project['id'] et ajouter un test qui vérifie que chaque projectId existe, pour éviter les ancres cassées.
- Ajouter introVideo.isPlaceholder. Clés inutilisées oubliées : Certification.style (jamais lu par sections.tsx) et mark si les monogrammes disparaissent ; navigation.secondaryLabel si tier disparaît.
- Liste « À fournir par Fiona » à compléter : intitulés de poste exacts et lieux (UX-V3), en tête ; école d'origine et année du semestre à Dublin ; année d'obtention des diplômes ; accord écrit des recommandants pour publier leur nom ou un extrait ; logos officiels des certifications (README:21) ; accord pour mettre en ligne une vidéo provisoire.

8. Ordre d'implémentation (§8)
- Ajouter une étape 0 : poser les questions de contenu à Fiona (§7 complété), car les étapes 1 à 4 réécrivent des textes qui en dépendent.
- Intégrer UX-V1 à l'étape 2 (hero), UX-V2 à l'étape 5 (impression, avec contact et pied de page) et UX-V3 à l'étape 0.
- La vidéo est une demande explicite de l'utilisatrice : elle peut passer en étape 3, avec la vidéo provisoire.

9. Hors extra : corrections du summary et des strengths
- « Sur mobile, ils sont visibles dès le premier écran (fin à y=800 pour 844 px) » : faux dans un navigateur réel (UX-V1).
- « Les KPI viennent du brief (README:7, 20-26) » : il faut citer README:11-17 et 21 ; les lignes 22 à 26 sont le texte standard de Lovable.
- « Le titre atterrit à 134 px » : c'est le sur-titre ; le H2 est à 176 px sur mobile et 225 px sur desktop.
- « Chaque entreprise a sa couleur » : la couleur est propre à chaque projet. Les deux cartes Logitech sont différentes (violet par défaut et bleu, styles.css:523).
- Les contrastes (5,48:1, 5,07:1, 7,93:1) n'ont pas été revérifiés ici : ils relèvent de l'angle accessibilité.

Fichiers de vérification : (fichier de travail de l'audit, hors dépôt) ux-recruteur-verif/ (m1.mjs, m2.mjs, navw2.mjs, nav-753.png, proto-hero-copy.mjs, proto-hero-reordered.mjs, proto-hero-390x664.png, proto-hero-reordered-390x664.png, proto-cards-copy.mjs, print.mjs, print.pdf, cards.mjs, footer-390.png).

</details>

## Direction artistique

_Le site est propre, accessible et bien structuré, mais sa direction artistique est celle d'un gabarit Lovable/shadcn : un violet #6544cd et des neutres lavande (hors brief), deux grotesques géométriques presque jumelles (DM Sans et Manrope) serrées jusqu'à -0.073em, un header en pilule de verre, 22 cartes arrondies, 19 icônes dans des carrés lavande, des badges « 01-07 », des halos et des orbites, une photo d'ambiance générique avec une légende-slogan, et des titres en deux temps « X. Y. » répétés à chaque section. Les fondamentaux manquent de système : 17 tailles de police, 9 graisses, 15 rayons différents, 47 couleurs codées en dur hors :root, et entre 64 et 185 px d'espace d'une section à l'autre. L'écart avec le brief est net : ni beige uni, ni bordeaux, ni bleu bébé, ni cerise, alors que la seule photo du site contient déjà du bordeaux (#691113) et du bleu clair. Je recommande une direction « Maison » : un fond beige uni, une encre chaude, le bordeaux en accent, le bleu bébé pour les surfaces et le cerise en simple ponctuation (barre de progression, lien actif). Côté typo, Fraunces (avec l'axe opsz) et Instrument Sans. Le nom de Fiona devient le H1, les KPI passent en chiffres serif sans carte, et les projets deviennent des « fiches » Enjeu/Action/Résultats qui parlent son langage de trade marketing. J'ai rendu cette direction et les deux autres avec les vraies polices (spécimens dans le dossier d'audit) : tous les couples texte/fond proposés passent AA. L'essentiel se fait dans les tokens, le CSS et quelques champs de données, sans toucher à la structure ni aux ancres. L'originalité doit venir de la typographie et des vrais matériaux que Fiona fournira (portrait, visuels de projets, dessins, vidéo), pas d'effets._

### DA-01 · Palette violette hors brief : tout le système est accordé sur la teinte 285-290

🔴 critique · tous · effort M · Vérifié

- **Preuve** : styles.css:50-58 : --primary oklch(0.505 0.2 288) = #6544cd ; --foreground, --muted-foreground (#646474), --secondary (#ebebfa) et --border (#dbdbe6) sont tous en teinte 285. Sur 59 littéraux oklch de styles.css, 33 ont une teinte entre 270 et 300. README.md demande « beige, bordeaux, bleu bébé, rouge cerise » ; roadmap.md:2 laisse non cochée « fond beige uni, bordeaux et bleu ciel clair ». Sur la photo src/assets/creative-desk.jpg, j'ai échantillonné un bordeaux #691113 (anthurium, carnet) et une tasse bleu clair ; capture desktop-1440-fold : la photo est dans la palette du brief, l'interface non.
- **Problème** : Le violet/indigo saturé est la couleur par défaut des gabarits IA (Lovable, shadcn, Tailwind UI) : c'est le premier signal « fait par IA ». Il ne respecte ni le brief ni la roadmap et jure avec la seule image du site. Même les neutres sont teintés violet, donc changer seulement --primary ne suffirait pas.
- **Recommandation** : Adopter la palette « Maison » (tokens complets dans extra) : --paper oklch(0.955 0.017 78) #f7efe4 pour le fond beige uni ; --ink oklch(0.25 0.035 22) #311b1a (14.15:1) ; --ink-soft oklch(0.48 0.032 32) #6f5752 (5.83:1) ; --bordeaux oklch(0.39 0.125 17) #7a1e2c (8.99:1) en accent ; --sky oklch(0.875 0.05 232) #b6dcf2, réservé aux surfaces ; --cherry oklch(0.555 0.205 24) #d02331 (4.64:1), uniquement pour la barre de progression et le soulignement du lien actif. Ramener tous les neutres vers des teintes chaudes (20-80). Garder les anciens noms en alias (--primary: var(--bordeaux), --background: var(--paper)…) pour ne rien casser, puis remplacer les littéraux (DA-16). ::selection : fond --sky, texte --ink (11.14:1). :focus-visible : 2px solid --bordeaux, offset 3px. Favicon aux nouvelles couleurs (DA-20).

### DA-02 · Le H1 est un slogan générique et le nom est relégué dans un paragraphe

🟠 important · tous · effort S · Corrigé

- **Preuve** : hero.tsx:14-18 et portfolio.ts:442-443 : <h1>De l'idée / à l'impact.</h1> (vérifié dans dist/client/index.html). Le nom est un <p class="hero-name"> de 26 px (styles.css:263-269), contre 86 px en graisse 760 pour le slogan (styles.css:270-276). Interlettrage -0.073em, soit -6.28 px (styles.css:273) : les lettres se touchent (« l'i », « ct », voir h1-zoom.png). Le mot « impact » revient 5 fois dans la page : H1, légende photo, bandeau marques, titre Parcours, titre du projet 2.
- **Problème** : « De l'idée à l'impact » est une formule interchangeable, présente sur des centaines de landing pages. Le recruteur lit d'abord un slogan, ni le nom ni le métier. Tracking extrême, graisse 760 et 2e ligne colorée, c'est la signature visuelle des landing SaaS générées.
- **Recommandation** : H1 = profile.name (« Fiona Talbi ») : var(--font-display), graisse 400, font-size var(--text-h1), soit 52-54 px sur mobile (248 px de large mesurés à 52 px, donc sans retour à la ligne à 320 px) et 112 px au maximum. line-height 1.02, letter-spacing -0.02em. Supprimer p.hero-name (hero.tsx:13). Juste dessous, profile.role en var(--font-display) 400 romain (pas d'italique), clamp(22px, 2.4vw, 30px), couleur --bordeaux. Puis la description existante en 17-18 px --ink, max-width 34em. Pas de kicker en capitales au-dessus du H1 : la localisation reste dans la ligne méta (DA-23). Supprimer sectionContent.hero.title, accent, visualCaption ainsi que hero.eyebrow, qui n'est utilisé nulle part. Header : « Fiona Talbi » en Instrument Sans 600, 16 px (Fraunces reste réservé aux grands corps, voir DA-03).

### DA-03 · Typographie sans contraste ni échelle : deux grotesques jumelles, 17 tailles, 9 graisses

🟠 important · tous · effort M · Corrigé

- **Preuve** : styles.css:4-5 et 10-11 : DM Sans Variable et Manrope Variable, deux grotesques géométriques. Mesures à 1440 px : 17 tailles distinctes (11, 12, 13, 14, 15, 16, 17, 19, 20, 22, 24, 26, 29, 34, 44, 53, 86 px), 9 graisses (400, 550, 600, 650, 700, 730, 740, 750, 760) et 11 interlettrages négatifs différents dans le CSS, de -0.02em à -0.073em. Le texte courant fait 14-15 px en gris #646474 : .about-copy p 15 px, .timeline-item p 14 px, .skill-card li 14 px, .project-context 15 px.
- **Problème** : Deux sans-serif presque identiques ne créent aucun contraste. La hiérarchie repose sur des micro-écarts de taille (12/13/14/15/16/17) et de graisse (730/740/750/760) invisibles à l'œil. On obtient une page uniforme « SaaS », une lecture fatigante en petit gris, et aucune personnalité.
- **Recommandation** : Remplacer styles.css:4-5 par @import "@fontsource-variable/fraunces/opsz.css" et @import "@fontsource-variable/instrument-sans/wght.css" (bun add @fontsource-variable/fraunces@5.3.0 @fontsource-variable/instrument-sans@5.3.0 ; bun remove @fontsource-variable/dm-sans @fontsource-variable/manrope). Mettre à jour styles.css:10-11 (@theme inline) avec --font-sans: var(--font-sans) et --font-display: var(--font-display), ou directement avec les nouveaux noms « Instrument Sans Variable » et « Fraunces Variable ». Réserver Fraunces (romain uniquement, aucun import d'italique) à 4 usages : H1, H2, chiffres KPI, e-mail du bloc contact. Les H3, noms de marques, diplômes, rôles et le nom du header passent en Instrument Sans 600, 19-22 px, letter-spacing 0. Échelle en 8 tokens (label 12, meta 14, body 17, lead 19→22, h3 20→24, h2 34→56, h1 52→112, kpi 44→56). Graisses : 400 pour Fraunces ; 400 et 600 pour Instrument Sans. Interlettrage : -0.02em pour Fraunces, 0 ailleurs. Texte courant en 17 px --ink, --ink-soft réservé aux métadonnées. font-variant-numeric: tabular-nums uniquement sur les chiffres en Instrument Sans (dates de formation, années), jamais sur Fraunces, où la propriété n'a aucun effet. Préchargement et police de repli : voir DA-V1.

### DA-04 · Titres en deux temps avec 2e ligne grise et slogans parallèles dans chaque section

🟠 important · tous · effort S · Corrigé

- **Preuve** : section-heading.tsx:19-24 et styles.css:493-495 (2e ligne en --muted-foreground). portfolio.ts:458-459, 468-469, 480-481, 486-487, 494-495, 510-511 : « Des projets concrets. / Des résultats mesurables. », « La curiosité comme moteur. / L'impact comme cap. », « Apprendre ici. / Voir plus loin. », « Toujours en mouvement. / Toujours en apprentissage. ». 15 des 34 titres finissent par un point. Mesuré : à 390 px, le titre Certifications prend 3 lignes (4 à 320 px) ; à 768 px, le titre Projets prend 3 lignes.
- **Problème** : Le parallélisme « X. Y. » répété à chaque section est le tic d'écriture le plus reconnaissable des textes générés. La 2e ligne grise ressemble à du texte désactivé. Les titres n'apprennent rien et coûtent 2 à 4 lignes sur mobile avant le contenu.
- **Recommandation** : Un seul titre factuel par section, sans champ accent. Rendre accent optionnel dans SectionHeadingContent (portfolio.ts:94 l'est déjà, donc le retirer simplement des données), puis supprimer section-heading.tsx:19-24 et .section-title > span (styles.css:493-495). Titres issus des données : Projets « Quatre missions, du rayon aux réseaux sociaux. » ; Parcours « Trois expériences : tech, franchise, influence. » ; Compétences « Stratégie, création, terrain. » ; Formation « IÉSEG, GCU Londres, ESSCA, Dublin. » ; Certifications « Six certifications, de Google Ads au TOEIC. » ; Langues : simplement « Langues » (au lieu de « Sans frontières. ») ; Recommandations « Deux lettres de recommandation. » ; Contact « Écrivez-moi. ». Règle : le mot « impact » au plus une fois sur la page. H2 en var(--font-display) 400, var(--text-h2), max-width 18ch, text-wrap: balance. Retirer le point final des titres nominaux (« Langues », kicker), mais le garder dans les titres-phrases.

### DA-05 · Badges numérotés « 01-07 » et numéros de projets : double index décoratif

🟠 important · tous · effort S · Vérifié

- **Preuve** : section-heading.tsx:13-16 (<span>{number}</span>) et styles.css:475-485 : carré de 27×27 px, rayon 9 px, fond lavande. contact-section.tsx:31-34 affiche « 07 ». project-card.tsx:19 affiche « 01 » à « 04 ». Résultat : la section « 01 Projets sélectionnés » contient un projet « 01 » (capture desktop-1440-part0).
- **Problème** : C'est un ornement de template qui ne donne aucune information, et deux numérotations superposées brouillent la lecture.
- **Recommandation** : Garder un kicker texte seul : .section-kicker { font: 600 var(--text-label)/1.4 var(--font-sans); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft) }. Ne plus afficher number (portfolio.ts:91 et 456, 466, 477, 484, 492, 499, 508). Supprimer .project-number (project-card.tsx:19, styles.css:557-561). Au passage, ce numéro était à 3.34:1 (couleur du projet à 70 % d'opacité sur la couverture) : sous le seuil AA pour du texte de 12 px.

### DA-06 · Accumulation d'ornements « kit UI » : icônes en carrés, pilules, 22 cartes encadrées

🟠 important · tous · effort M · Corrigé

- **Preuve** : Comptage DOM à 1440 px : 19 carrés arrondis à icône ou lettre (.logo-mark, .section-eyebrow>span ×7, .skill-icon ×3, .cert-mark ×6, .document-icon ×2), 12 pilules (.interest-pill ×3, .tool-pill ×9), 34 icônes Lucide et 22 blocs encadrés. La même toque GraduationCap est répétée 4 fois (sections.tsx:130). CSS concerné : styles.css:775-785, 901-911, 963-972, 699-708, 830-839.
- **Problème** : « Icône dans un carré lavande + titre + carte arrondie » est le composant shadcn par excellence. Répété 22 fois, il donne un catalogue sans hiérarchie, et les icônes ne disent rien (même toque pour les 4 diplômes).
- **Recommandation** : Viser au plus 8 icônes fonctionnelles (menu, mail, copier, lien externe ↗, LinkedIn, lecture vidéo, retour en haut). Compétences : 3 colonnes séparées par des filets 1px --line, titre en Instrument Sans 600 20 px, items en 17 px --ink sans puces. Outils : une ligne de texte « Google Workspace · Canva · Mailchimp · CapCut · Trello · Notion · Photoshop · Premiere Pro · iMovie » en 15 px (657 px mesurés sur une ligne à 1440 px ; elle passe sur plusieurs lignes ailleurs, sans problème). Intérêts : la phrase « Voyage, lecture, dessin. ». Formation : liste chronologique, de la plus récente à la plus ancienne. Date en Instrument Sans 14 px tabular-nums dans une colonne de 140 px, puis diplôme en 20 px 600 et école en 15 px --ink-soft, filet --line entre les lignes ; c'est la forme sobre de la timeline demandée. Certifications (exigence du brief) : 6 badges dans une grille 3 / 2 / 1 colonnes, chacun avec border 1px --line, rayon 4px, padding 16px 18px, fond --paper-light. On y lit l'organisme en label 12 px capitales --ink-soft, la certification en 17 px 600 --ink et l'année en 14 px tabular-nums. Pas de monogramme. Logo officiel de l'organisme seulement si Fiona fournit le fichier, ou le badge officiel partageable délivré avec la certification. Retirer les imports d'icônes devenus inutiles (sections.tsx:1-14). Budget d'éléments encadrés : les badges de certification, le menu mobile et le widget vidéo, rien d'autre.

### DA-07 · Faux logos, monogrammes et point final ajouté aux marques

🟠 important · tous · effort S · Vérifié

- **Preuve** : portfolio.ts:428-432 : displayName « logitech. ». project-card.tsx:17 ajoute un « . » uniquement à Logitech, d'où « Logitech. » à côté de « CosmétiCar ». hero.tsx:67-74 et styles.css:448-455 : mots-marques gris en 24 px/750, façon « ils nous font confiance » ; la phrase d'accompagnement est masquée sur mobile (styles.css:1410-1413). Monogrammes LW/AI/S/G/G dans les données (portfolio.ts:358-391, champ mark). site-header.tsx:71-76 : « ft. » et un point violet après le nom.
- **Problème** : On imite des logotypes : c'est un risque d'usage de marque, et ça sonne faux. Le point final derrière les noms est un tic de template, appliqué de façon incohérente, et le mur de logos gris est un trope SaaS. Les monogrammes ressemblent à des avatars par défaut.
- **Recommandation** : Écrire les marques en texte, dans la police du site, sans point ajouté : supprimer brands.displayName et la ligne 17 de project-card.tsx. Remplacer le bandeau marques par une ligne factuelle sous les KPI : « Expériences — Logitech · CosmétiCar · Massilia E-consulting » (15 px --ink, label --ink-soft). Ne plus afficher mark ni style pour les certifications. N'utiliser des logos officiels que si Fiona fournit des SVG dont l'usage est autorisé. Header : « Fiona Talbi » en Fraunces 500 19 px, sans pastille « ft. » ni point.

### DA-08 · Le visuel du hero est une image d'ambiance générique, avec légende-slogan et orbites

🟠 important · tous · effort S · Corrigé

- **Preuve** : hero.tsx:51-65 : creative-desk.jpg (1440×1024, 142 Ko), préchargée en fetchPriority="high" (<link rel="preload"> dans dist/client/index.html), affichée recadrée en 489×489. Légende « Stratégie. Créativité. Impact. » (portfolio.ts:449, styles.css:391-398) ; orbites .visual-orbit (hero.tsx:52) ; l'alt décrit des objets.
- **Problème** : Bureau, carnet, anthurium, café : rien ne parle de Fiona. Avec sa légende-slogan et ses orbites, c'est le cliché du « hero de portfolio IA ». Et c'est la ressource la plus prioritaire du chargement.
- **Recommandation** : Court terme : supprimer figcaption, la légende et div.visual-orbit. Remplacer <figure> par un simple <div> et mettre alt="". Cadrage : aspect-ratio 4/5 et object-position 50% 40% à partir de 721 px ; sous 720 px, garder un format paysage 3/2 (233 px de haut à 350 px de large), toujours après les KPI. Rayon 4px, sans bordure ni ombre. Retirer fetchPriority="high" du composant (sur mobile, le LCP doit être le H1 texte) ; si l'on tient au préchargement sur desktop, utiliser <link rel="preload" as="image" media="(min-width: 721px)">. Moyen terme : remplacer l'image par le vrai portrait de Fiona (à fournir) ou par l'affiche de sa vidéo (DA-24). Jamais de photo de stock d'une personne ni de portrait généré par IA.

### DA-09 · Halos violets et cercles décoratifs : quatre systèmes d'ornements gratuits

🟠 important · tous · effort S · Vérifié

- **Preuve** : styles.css:242-252 : .hero::before, halo radial violet de 850×720 px. styles.css:356-372 : .visual-orbit, double cercle. styles.css:574-594 avec project-card.tsx:24-28 : .cover-rings, trois anneaux sur chacune des 4 couvertures. styles.css:1009-1029 : halo violet et anneau dans le bloc contact.
- **Problème** : Le combo « glow & orbit » est la signature décorative des gabarits générés. Ces cercles n'ont aucun lien avec le propos et ajoutent du bruit.
- **Recommandation** : Supprimer ces quatre blocs CSS et le markup associé (div.visual-orbit, div.cover-rings). Ne rien mettre à la place : la richesse viendra de la typographie, des filets et du beige. Cela retire environ 70 lignes de CSS.

### DA-10 · Header en pilule de verre flottante, décalé de la grille, avec un CTA qui change de style selon l'écran

🟠 important · tous · effort M · Corrigé

- **Preuve** : styles.css:124-141 : top 20px, rayon 22px, blanc à 70 %, backdrop-filter blur(24px) saturate(1.5). Il occupe 94 px sur un écran de 900 px (top + hauteur 74). Sa largeur est de 1220 px alors que la grille fait 1180 : bords à x=110/1330 contre 130/1310 pour le contenu. Le CTA Contact est noir avec un rayon 13px sur desktop (styles.css:203-215), mais devient une pilule lavande à texte violet sous 980 px (styles.css:1196-1204). Captures desktop-1440-fold et mobile-390-fold.
- **Problème** : La pilule en verre est un poncif 2023-2025. Elle déborde de la grille et le bouton principal change d'apparence selon l'écran, ce qui casse la cohérence de marque.
- **Recommandation** : Barre position: sticky; top: 0 sur toute la largeur, fond --paper opaque, sans backdrop-filter ; hauteur 64 px (desktop) et 56 px (≤720 px) ; filet bas 1px --line ; contenu aligné sur .site-wrap. Comme la barre devient sticky, réduire .hero padding-top de 154px à var(--space-block) ; mettre html { scroll-padding-top: 88px } et 76px sous 720 px (hauteur de la barre + 24 px / 20 px). Barre de progression de 2px en --cherry, posée sur le filet bas, sur toute la largeur, en transform scaleX comme aujourd'hui. Contact : un seul style sur tous les écrans, fond --bordeaux, texte --paper-light (9.75:1), rayon 8px, min-height 44px, toujours visible sur mobile et tablette (supprimer styles.css:1196-1204). Lien actif : texte --ink, soulignement 2px --cherry, text-underline-offset 6px, à la place du fond lavande (styles.css:198-202). Menu mobile : panneau pleine largeur sous la barre, fond --paper-light, border-bottom 1px --ink et ombre --shadow-float, ou à défaut un voile oklch(0.25 0.035 22 / 12%) sur la page, pour qu'il se détache du contenu ; rayon 0 en haut, 4px en bas.

### DA-11 · Couvertures de projets : quatre pastels hors brief, une bande sans information, des hauteurs inégales

🟠 important · tous · effort M · Corrigé

- **Preuve** : styles.css:508-534 : lavande (teinte 289), bleu (242), saumon (38), menthe (155). styles.css:535-594 : la couverture fait environ 128 px et n'affiche que la marque, la catégorie et des anneaux. Mesuré à 1440 px : cartes de 446 et 426 px dans une même rangée (align-items: start, styles.css:506), donc des bas de cartes décalés de 20 px (desktop-1440-part1). « Logitech. » apparaît deux fois de suite. Le « + » est violet sur toutes les cartes (styles.css:651-654).
- **Problème** : Quatre couleurs pastel sans lien entre elles ni avec le brief, c'est le look « Notion/Lovable ». La couverture occupe de la place sans rien montrer du travail, et la grille aux bas inégaux fait négligée.
- **Recommandation** : Fiches sur une colonne : filet 1px --ink en haut, grille 200px / 1fr / 240px (gap 32px) au-dessus de 980 px. À gauche : la marque en Instrument Sans 600 20 px et la catégorie en label 12 px --ink-soft. Au centre : le titre en var(--font-display) var(--text-h3), puis un <dl> « Enjeu » (= context) / « Action » (= mission), avec des <dt> en 15 px 600 --ink en casse normale, sans colonne de labels en capitales. À droite : les 2 KPI avec exactement le même traitement que le hero (DA-12), sans boîte ni bande. Entre 721 et 980 px, utiliser 2 colonnes (marque + titre, puis KPI) ; sous 720 px, empiler dans l'ordre marque → titre → KPI côte à côte → Enjeu / Action. <details> « Voir les missions » sous un filet --line, avec un « + » --bordeaux et min-height 48px. Fond --paper pour tous, un seul système de couleur. Donner à chaque fiche un id stable dérivé de project.id (voir DA-V3). Couverture 3:2 uniquement si Fiona fournit un visuel autorisé. Option : regrouper les 2 missions Logitech sous une même entête de marque. Contrôler que la hauteur de la section reste à ±10 % de l'actuelle (1220 px à 1440 px).

### DA-12 · KPI : bloc « verre » blanc, chiffres en grotesque 740, une ancienneté mêlée aux résultats

🟠 important · tous · effort S · Corrigé

- **Preuve** : styles.css:399-434 : .impact-strip avec fond --glass, bordure blanche, --soft-shadow, rayon 24px, chiffres Manrope 34px/740. hero.tsx:42-50. Dans les projets, chaque chiffre prend la couleur de son pastel (styles.css:621-626). « 3+ ans » (portfolio.ts:157) est une ancienneté, pas un résultat, mais il a le même traitement que les autres.
- **Problème** : C'est la zone qui doit faire la différence pour un recruteur, et elle ressemble à une « stat card » de tableau de bord SaaS. Ombre et verre n'apportent rien.
- **Recommandation** : Ajouter le token --sky-soft: oklch(0.95 0.022 232) (#e1f2fb : ink 14.05:1, bordeaux 8.93:1, ink-soft 5.79:1). Bloc KPI : fond --sky-soft, border-top 2px --ink, rayon 0, sans ombre ni bordure blanche ; colonnes séparées par des filets 1px oklch(0.25 0.035 22 / 15%) ; padding 20px 24px 24px. Chiffre en var(--font-display) 400, var(--text-kpi), --bordeaux, letter-spacing -0.02em (pas de tabular-nums). Libellé en 15 px --ink. Source en 12 px --ink-soft, en casse normale ou en capitales +0.06em, au choix mais de façon cohérente. « 3+ ans » : chiffre en --ink pour le distinguer des résultats. Sur mobile : grille 2×2 avec filets, toujours avant la photo. Dans les fiches projet, même typographie (chiffre 40-44 px --bordeaux, libellé 15 px), sans fond ni boîte : un seul système KPI sur tout le site. Pas de compteur animé.

### DA-20 · Identité absente hors du site : pas d'og:image, pas de theme-color, favicon en Arial

🟠 important · tous · effort S · Vérifié

- **Preuve** : Dans dist/client/index.html, og:title et og:description sont présents, mais pas d'og:image alors que twitter:card vaut summary_large_image (__root.tsx:79-89, index.tsx:7-13). Pas de meta theme-color. public/favicon.svg est « ft. » en Arial 700 sur un carré oklch(0.255 0.029 285).
- **Problème** : Le lien sera surtout partagé sur LinkedIn et par e-mail, et la carte de partage n'a aucun visuel. La barre du navigateur mobile ne reprend pas le beige. Le favicon n'utilise ni la typo ni les couleurs de la marque.
- **Recommandation** : Créer public/og-image.jpg en 1200×630 (moins de 200 Ko) : fond --paper, « Fiona Talbi » en Fraunces, métier en --bordeaux, 3 KPI réels, puis le portrait quand il sera fourni. Ajouter dans index.tsx og:image avec une URL absolue (https://fio-tlb.github.io/fiona-talbi-portfolio/og-image.jpg), plus og:image:width, og:image:height, og:image:alt et og:locale fr_FR. Ajouter <meta name="theme-color" content="#f7efe4">. Favicon : initiales « FT » en Fraunces converties en tracés (sans dépendance de police), --bordeaux sur --paper, rayon 4px.

### DA-21 · Une « timeline » sans dates, et des contenus de remplacement présentés comme des faits

🟠 important · tous · effort S · Corrigé

- **Preuve** : portfolio.ts:250-274 : le type Experience n'a aucun champ de période, alors que styles.css:709-757 dessine une timeline à points. portfolio.ts:362-367 : la certification « AI Product Building » a pour organisme « Intelligence artificielle », qui n'est pas un organisme (le brief n'en donne aucun). portfolio.ts:415-426 : titres génériques « Lettre de recommandation 01 / 02 ».
- **Problème** : Le motif « timeline » promet une chronologie qu'il ne montre pas : c'est une décoration vide. Un pseudo-organisme est une approximation, contraire à la règle « ne rien inventer ».
- **Recommandation** : Experience : ajouter period: string | null (dates à fournir par Fiona), affiché seulement s'il est renseigné. D'ici là, présenter les expériences en liste : rôle en Instrument Sans 600 20 px, puis « Entreprise · lieu » en 15 px --ink-soft, filets --line entre les éléments, sans points ni ligne verticale. Dès que les dates existent, les ajouter en colonne de gauche (140 px, 14 px tabular-nums), comme pour la Formation (DA-06) : on obtient une timeline sobre et vraie. Certification : organization: string | null, mettre null pour AI Product Building et n'afficher que « AI Product Building · 2026 » jusqu'à ce que Fiona fournisse l'organisme. Recommandations : garder « Lettre de recommandation » sans auteur inventé, présentée comme un document (filet, mention « PDF » seulement si documentPath existe, demande par e-mail sinon, sans message d'attente), sans carré à icône.

### DA-24 · Vidéo de présentation : à intégrer à l'identité, pas en bulle de chat

🟠 important · tous · effort M · Corrigé

- **Preuve** : Le dépôt ne contient aucune vidéo (aucune occurrence de <video>, .mp4 ou .webm dans src/, public/ ne contient que favicon.svg et robots.txt). L'emplacement naturel est .hero-visual (hero.tsx:51-65), occupé aujourd'hui par l'image d'ambiance (DA-08). Le header occupe le coin haut droit et « Retour en haut » est en bas à droite du footer (portfolio.tsx:55-58).
- **Problème** : La demande est explicite : une vidéo proposée sans être imposée, et un widget en bas à droite si on choisit « plus tard ». Sans cadrage DA, on obtient une bulle ronde type Intercom ou Loom, l'archétype « widget générique ».
- **Recommandation** : Invitation à l'arrivée, non modale et dans le flux : sur l'image du hero (ou sur son affiche), un bandeau --paper-light de 1px --bordeaux en bas du visuel contient « Ma présentation en vidéo » (bouton Play, 44 px de haut) et un bouton texte « Plus tard ». Aucune lecture automatique, aucun voile, rien ne recouvre le contenu. Retirer du hero le bouton « Contact », redondant avec le header : les actions deviennent « Voir les projets » et « Ma présentation en vidéo ». « Regarder » ouvre un lecteur <dialog> natif (<video controls playsinline preload="none" poster>, avec <track kind="captions" srclang="fr"> quand un .vtt est fourni, rayon 4px, fermeture 44×44, focus rendu à l'élément déclencheur). « Plus tard » replie l'invitation dans le widget fixed bottom/right: max(16px, env(safe-area-inset-*)) : rectangle --paper-light, bordure 1px --bordeaux, rayon 8px, hauteur 48px, vignette 32×32 rayon 2px, libellé « Ma présentation » 14 px/600, fermeture séparée 44×44, ombre --shadow-float (seule ombre du site), fondu de 240ms (aucun en reduced-motion), masqué quand le footer est visible. Mémoriser le choix (« plus tard » ou « fermé ») en localStorage, avec try/catch. Sans JavaScript, le lien vers la vidéo reste un simple <a href> vers le fichier. Fichier dans public/, chemin via import.meta.env.BASE_URL. Vidéo provisoire neutre, sans personne, et aucune durée affichée tant que la vraie vidéo n'existe pas. Les détails de comportement sont à harmoniser avec l'angle « video-intro ».

### DA-13 · Rythme vertical irrégulier et fonds alternés de deux températures

🟡 amélioration · tous · effort S · Vérifié

- **Preuve** : Écart mesuré entre la fin d'une section et le kicker de la suivante, à 1440 px : 108 / 140 / 64 / 152 / 129 / 185 px ; à 390 px : 70 / 85 / 42 / 106 / 85 / 130 px. .education-section a padding-top: 0 (styles.css:844-846, 1476-1478). Les bandes de fond n'ont pas la même température : Parcours en oklch(0.955 0.009 285), gris lavande froid (styles.css:672-675), Certifications en oklch(0.967 0.007 80), chaud (styles.css:883-886). L'anneau de la timeline duplique en dur la couleur de fond (styles.css:727).
- **Problème** : La page n'a pas de pulsation régulière, ce qui empêche l'effet « premium ». Les deux bandes semblent venir de deux sites différents, et la couleur dupliquée dans le box-shadow se cassera au premier changement de fond.
- **Recommandation** : .section { padding-block: var(--space-section) } (clamp de 72 à 128 px), sans exception : retirer le padding-top: 0 de Formation. Alterner strictement : Parcours et Certifications + Langues sur --paper-deep oklch(0.928 0.024 74), le reste sur --paper, contact en bloc --bordeaux-deep. Définir --section-bg sur chaque section et écrire box-shadow: 0 0 0 5px var(--section-bg). Marge sous l'en-tête de section : var(--space-block) (32 à 48 px).

### DA-14 · En-têtes de section : la description est rejetée à droite, et le titre est écrasé sur tablette

🟡 amélioration · desktop, tablette · effort S · Vérifié

- **Preuve** : styles.css:459-465 et 496-501 (flex space-between, description max 350px). Mesuré à 1440 px : la description commence à x=960, soit 334 à 568 px après la fin du titre. À 768 px, la ligne reste en flex et le titre est contraint à 306 px : « Des projets concrets. Des résultats mesurables. » passe sur 3 lignes (tablet-768-fold).
- **Problème** : L'œil doit faire un grand saut pour lire l'intro. Sur tablette, le titre est cassé alors que 688 px sont disponibles.
- **Recommandation** : Empiler partout : kicker, puis h2 (max-width 18ch), puis intro (max-width var(--measure) = 36rem, 17 px --ink-soft, margin-top 14px), alignés à gauche. Supprimer le display:flex de .section-heading. Ne garder une description que là où elle apporte un fait (Projets, Formation) ; la supprimer ailleurs.

### DA-15 · Rayons et ombres sans système : 15 rayons différents, 5 ombres

🟡 amélioration · tous · effort S · Vérifié

- **Preuve** : styles.css contient 38 déclarations border-radius avec 15 valeurs : 6, 9, 11, 12, 13, 16, 19, 20, 22, 24, 26, 32 et 100px, 50 % et inherit. Exemples : cartes à 19 / 22 / 24 / 26px, contact à 32px, boutons en pilule à 100px mais copie de l'e-mail à 12px. Box-shadows distincts aux lignes 134, 324, 328, 378 et 407.
- **Problème** : Des valeurs voisines (19, 20, 22, 24, 26) se lisent comme des approximations. Les gros rayons et les ombres douces donnent l'aspect « bulle d'app », opposé au rendu premium éditorial demandé.
- **Recommandation** : Trois valeurs seulement : --radius: 0.25rem (4px) pour photos, étiquettes, panneaux et bloc contact ; --radius-control: 0.5rem (8px) pour boutons, bouton copier et widget vidéo ; 50 % uniquement pour les pastilles de 4 à 9px. Supprimer toutes les ombres, sauf --shadow-float pour le widget vidéo. Les boutons en pilule passent à 8px. Avec --radius à 4px, les dérivés @theme restent cohérents : sm = 0, md = 2px, lg = 4px, xl = 8px.

### DA-16 · Dette de tokens : 47 couleurs en dur hors :root et un reliquat shadcn

🟡 amélioration · tous · effort M · Vérifié

- **Preuve** : styles.css compte 59 littéraux oklch, dont 47 hors :root (lignes 64 et suivantes), parmi lesquels 27 en teinte violette (ex. 92, 134, 251, 324, 328, 360, 452, 482, 509-533, 716, 727, 842, 855, 1007-1115). Le bloc @theme inline (styles.css:9-44) mappe des tokens sidebar et popover inutilisés. src/components/ui contient 46 composants shadcn non utilisés par le portfolio mais scannés par @source "../src" (styles.css:2). Le CSS compilé pèse 98 Ko (dist/client/assets/styles-*.css).
- **Problème** : Changer de DA demande aujourd'hui de traquer des dizaines de couleurs dispersées, avec un risque de restes violets. C'est aussi la trace du gabarit d'origine.
- **Recommandation** : 1) Coller les tokens sémantiques de l'extra (avec alias de compatibilité). 2) Remplacer chaque littéral par un token : --line, --paper-deep, --ink, ou color-mix(in oklch, var(--ink) 12%, transparent) pour les rares transparences. 3) Viser 0 oklch() hors :root, vérifiable par grep. 4) Option : restreindre @source à ../src/routes et ../src/components/portfolio (garder routes pour les classes Tailwind de la page 404 dans __root.tsx), puis comparer le poids du CSS.

### DA-17 · Survols décoratifs (bouton qui se soulève avec lueur violette) et survol sur des éléments non cliquables

🟡 amélioration · desktop · effort S · Corrigé

- **Preuve** : styles.css:318-329 : .action:hover translateY(-2px), puis .action-primary:hover passe en violet avec une ombre violette à 18 %. styles.css:840-843 : .tool-pill:hover change fond et bordure sur des <span> non interactifs (sections.tsx:108-110). Les .interest-pill ont l'apparence de chips de filtre cliquables (sections.tsx:49-52).
- **Problème** : L'effet « soulèvement + lueur » est un réflexe de gabarit. Un survol sur un élément inerte promet une action qui n'existe pas, ce qui est frustrant au clic, surtout sur tablette.
- **Recommandation** : Regrouper tous les :hover dans @media (hover: hover) and (pointer: fine). Boutons : fond --bordeaux vers --bordeaux-deep en 160ms ; l'icône flèche (↓ ou ↗ selon le lien) glisse de 2px dans sa direction ; aucun translateY, aucune ombre. Liens texte : soulignement 1px currentColor, offset 4px, qui passe à 2px --cherry au survol. Retirer tout :hover sur les éléments non interactifs (.tool-pill, .interest-pill, devenus du texte, voir DA-06). Ajouter .action:active, .header-contact:active, .copy-button:active { transform: scale(0.98) } avec transition 120ms, neutralisé en prefers-reduced-motion (la règle globale styles.css:1587-1592 coupe déjà les transitions ; ajouter transform: none pour :active).

### DA-18 · Bloc contact « CTA SaaS » : bleu nuit, halo violet, titre en deux temps

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : styles.css:996-1116 : fond --foreground #212130, halo radial violet (1009-1018), anneau (1019-1029), accent du titre en oklch(0.78 0.09 288) #b4afee. contact-section.tsx:31-39 : badge « 07 » et h2 « Les belles idées commencent / par un échange. » (capture desktop-1440-part3).
- **Problème** : C'est la dernière impression laissée au recruteur, et elle ressemble à un bandeau d'inscription SaaS. Le bloc ne reprend pas le bordeaux du brief et ne crée aucune signature.
- **Recommandation** : Bloc en --bordeaux-deep (#56161e), texte --paper (12.05:1), rayon 4px, sans halo ni anneau. Kicker « Contact » en --sky (9.49:1). H2 « Écrivez-moi. » en var(--font-display) 400, var(--text-h2). E-mail en lien var(--font-display) clamp(20px, 1.2rem + 1.5vw, 36px) (170 px à 20 px, donc tient avec le bouton copier à 320 px), soulignement 1px --sky avec text-underline-offset 6px. Bouton principal : fond --paper-light, texte --bordeaux (9.75:1). Bouton LinkedIn : contour 1px --paper avec ↗ (lien externe). Bouton copier : 44×44, contour 1px oklch(0.955 0.017 78 / 30%), rayon 8px. Focus : outline 2px --sky.

### DA-19 · Micro-typographie française : espaces normales avant %, ?, : et dans les valeurs

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : portfolio.ts:139 et 177 : « +30 % » avec une espace U+0020 (vérifié octet par octet). Même chose pour 157 « 3+ ans », 240 « 1 mois », 395 et 405 « 910 / 990 », 509 « échangeait ? », 193 « Logi Work Days : ».
- **Problème** : Aucune coupure n'a été observée de 320 à 1024 px, mais rien ne l'empêche (« % » ou « ? » seul en début de ligne). Une typographie française soignée est justement un détail qui fait « humain et pro », pas IA.
- **Recommandation** : Dans portfolio.ts (y compris seo, lignes 120-124) : U+202F (espace fine insécable) avant %, ?, ! ; U+00A0 avant : et dans « 3+ ans », « 1 mois », « 910 / 990 », « 100+ solutions ». Ajouter un test vitest qui rejette /[ ][%?!:;]/ (espace ASCII avant ponctuation haute) dans toutes les chaînes exportées par portfolio.ts. Ne pas ajouter tabular-nums sur les chiffres en Fraunces. Le réserver aux dates et années en Instrument Sans.

### DA-22 · Tablette (721-980 px) : compétences comprimées en 3 cartes de 170 px

🟡 amélioration · tablette · effort S · Vérifié

- **Preuve** : Mesuré à 768 px : .skill-card li fait 170 px de large et .skill-card h3 124 px. « Marketing 360 & trade / marketing » et « Communication / & création » passent sur deux lignes (tablet-768-part2). La grille reste à repeat(3) jusqu'à 720 px (styles.css:758-762).
- **Problème** : Sur tablette, la section la plus dense devient une suite de retours à la ligne, et c'est pourtant un format courant chez les recruteurs en déplacement.
- **Recommandation** : Entre 721 et 980 px, passer les compétences en liste de définition : chaque groupe sur une ligne, titre Fraunces 22 px dans une colonne de 220px à gauche, items en 17 px à droite, séparés par « · » ou en 2 colonnes, avec un filet entre les groupes. Sous 720 px, empiler, toujours sans cartes.

### DA-V1 · Le H1 de 112 px en Fraunces va « sauter » au chargement de la police (swap sans préchargement ni repli calibré)

🟡 amélioration · tous · effort S · Ajout

- **Preuve** : Le opsz.css de @fontsource-variable/fraunces 5.3.0 déclare font-display: swap, et rien n'est préchargé : dist/client/index.html ne précharge que l'image creative-desk (aucun rel=preload as=font). Mesuré avec Playwright (fonttest.mjs) : « Fiona Talbi » en 400 112 px fait 452 px en Fraunces contre 485 px dans la serif de repli système, soit 7 % d'écart en largeur. Le fichier latin pèse 67 304 o, presque le double de DM Sans (36 932 o).
- **Problème** : Avec la direction recommandée, le plus grand élément de la page (le nom) s'affiche d'abord dans une autre serif puis change de largeur et de hauteur de ligne : la ligne de rôle, la description et les KPI bougent. C'est l'inverse du rendu « premium » visé, et c'est mesuré par le CLS.
- **Recommandation** : 1) Précharger le seul fichier critique. Dans __root.tsx, importer frauncesLatin from "@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url" et ajouter aux links : { rel: "preload", as: "font", type: "font/woff2", href: frauncesLatin, crossOrigin: "anonymous" }. L'URL suit automatiquement le base /fiona-talbi-portfolio/. 2) Déclarer une police de repli calibrée : @font-face { font-family: "Fraunces Fallback"; src: local("Georgia"), local("Times New Roman"); size-adjust / ascent-override / descent-override calculés avec fontaine ou capsize sur le fichier woff2 } puis --font-display: "Fraunces Variable", "Fraunces Fallback", Georgia, serif. 3) Ne pas précharger Instrument Sans : le texte courant tolère un swap. Vérifier le CLS du hero sous 0.02 avec Lighthouse en throttling mobile.

### DA-V2 · Slogans résiduels hors des titres : carte de partage, bandeau, pied de page et intro des recommandations

🟡 amélioration · tous · effort S · Ajout

- **Preuve** : portfolio.ts:122 : og:title « Fiona Talbi — Marketing, créativité & impact », vérifié dans dist/client/index.html ; c'est le titre affiché sur LinkedIn. portfolio.ts:453 : « Des marques. Du terrain. De l'impact. », affiché dans le bandeau marques (hero.tsx:68). portfolio.ts:521 : pied de page « Imaginé avec curiosité, à Paris. ». portfolio.ts:502 : « Les regards de celles et ceux avec qui j'ai eu le plaisir de travailler. » annonce des témoignages qui ne sont pas affichés (lettres non fournies, documentPath: null aux lignes 419 et 423).
- **Problème** : Même si DA-04 nettoie les H2, le ton « slogan en triade » reste aux deux endroits les plus vus hors de la page : l'aperçu LinkedIn et la dernière ligne. L'intro des recommandations promet des « regards » alors que la section ne propose qu'une demande par e-mail, ce qui frôle la survente de contenu absent.
- **Recommandation** : seo.socialTitle = « Fiona Talbi — Marketing 360 & Communication » (= seo.title, sans « impact »). Supprimer career.title (bandeau retiré en DA-07). Pied de page : « © Fiona Talbi · Paris » et le lien « Retour en haut », sans signature-slogan. Recommandations : description factuelle, « Deux lettres de recommandation, disponibles sur demande par e-mail. » tant que documentPath est null, puis « Deux lettres de recommandation, à consulter en PDF. » quand les fichiers existent : la phrase est calculée à partir des données, sans aucun message d'attente.

### DA-V3 · Les KPI du hero répètent ceux des projets sans y mener : rendre chaque chiffre cliquable vers sa fiche

🟡 amélioration · tous · effort S · Ajout

- **Preuve** : portfolio.ts:136-161 contre 175-240 : « +30 % », « 140 » et « 500+ » apparaissent deux fois en grand (hero et cartes projets) avec les mêmes libellés. hero.tsx:42-50 les rend en <div> inertes. Les projets n’ont aucun id (project-card.tsx:8-12). Avec DA-12, les deux occurrences auront le même traitement typographique, et la répétition se verra davantage.
- **Problème** : Le recruteur voit trois chiffres forts, veut savoir comment ils ont été obtenus, et doit chercher lui-même. Un chiffre qui mène à sa preuve transforme la répétition en parcours et rend « chaque clic satisfaisant », sans ajouter d'élément visuel.
- **Recommandation** : Ajouter projectId?: string à ImpactStat (logitech-category-management, logitech-trade-marketing, cosmeticar-social-media ; aucun pour « 3+ ans », qui pointe vers #parcours). Donner à chaque fiche id={project.id} (des ancres de la même page). Dans hero.tsx, envelopper chaque cellule KPI dans <a href={"#" + stat.projectId}> : toute la cellule est cliquable (≥ 44 px), avec aria-label « +30 % de ventes : voir le projet Category Management ». Survol (hover: hover) : libellé souligné 1px. Focus-visible standard. Pas de flèche diagonale (lien interne) : au plus un ↓ de 14 px au survol. Défilement assuré par scroll-behavior et scroll-padding existants (auto en reduced-motion).

### DA-23 · Rien de personnel : dessin, voyage et création réduits à trois pilules

⚪ bonus · tous · effort M · Corrigé

- **Preuve** : sections.tsx:45-55 et portfolio.ts:409-413 : trois pilules à icône (Voyage, Lecture, Dessin). portfolio.ts:324 mentionne « Création graphique & vidéo », mais rien de ce travail n'apparaît. hero.tsx:31-40 affiche le libellé vague « Un parcours international », alors que portfolio.ts:461 cite les faits : Paris, Londres, Dublin.
- **Problème** : C'est l'originalité qui manque le plus, et elle ne peut venir que de matériaux authentiques, pas d'effets.
- **Recommandation** : 1) Ligne méta du hero : « Paris · Londres · Dublin » en 14 px --ink-soft (faits tirés de portfolio.ts:461), à la place de « Un parcours international » et des icônes MapPin et Globe2. Remplacer aussi company: « Un parcours international » du KPI « 3+ ans » (portfolio.ts:159) par « Parcours ». 2) Si Fiona fournit 1 ou 2 croquis scannés : les vectoriser en SVG monotrait --bordeaux et n'en utiliser qu'un seul, de 160 px au plus, aria-hidden, dans Parcours ou dans le pied de page. 3) Ses réalisations graphiques ou vidéo en couverture de fiche, seulement si elles sont fournies et autorisées. Jamais de police manuscrite pour imiter un dessin.

**Garde-fous de cet angle (à ne pas faire)**

- Pas de dégradés, de mesh gradients, de glassmorphism, de blobs, d'orbites ou de halos : tout ce qui est supprimé en DA-09 ne doit pas revenir sous une autre forme.
- Pas de violet ni d'indigo, nulle part, ni de texte en dégradé.
- Pas de bento grid, pas de marquee ou défilement infini de logos, pas de mur de logos gris.
- Pas de compteurs animés sur les KPI (0 → 140) : ils retardent la lecture, font gadget et posent problème avec reduced-motion.
- Pas de curseur personnalisé, de parallax, de smooth-scroll JS (Lenis…), de texte révélé lettre par lettre, de magnetic buttons ni de tilt 3D sur les cartes.
- Pas plus de 2 familles de polices. Pas d'italique Fraunces partout (une ligne au maximum, sinon on obtient un faire-part). Pas de police manuscrite (Caveat & co) pour simuler le dessin : uniquement les vrais dessins de Fiona.
- Pas de rouge cerise en texte courant : il sert de ponctuation graphique (barre, soulignement actif). Jamais de petit texte bordeaux ou cerise sur le bleu bébé.
- Pas d'icône décorative à côté de chaque titre, pas d'emoji, pas de pilules pour du contenu non cliquable.
- Pas de titres-slogans en deux temps « X. Y. », et le mot « impact » une seule fois sur la page.
- Pas de numérotation décorative 01-07 ni de « point final » ajouté aux noms de marques.
- Pas de faux logos ni de logos officiels sans autorisation et sans fichiers fournis par Fiona.
- Pas de photo de stock d'une personne, pas de portrait généré par IA, pas de vidéo provisoire montrant quelqu'un qui pourrait passer pour Fiona.
- Ne rien inventer pour combler les trous (dates d'expérience, auteurs des lettres, organisme d'AI Product Building, durée de la vidéo) : laisser vide jusqu'à ce que Fiona fournisse le contenu.
- Pas de mode sombre pour l'instant : cela double le travail de contraste pour peu de valeur auprès de la cible.
- Ne pas supprimer la barre de progression ni le bouton Contact sur mobile et tablette, ne pas descendre sous 44 px de cible tactile, ne pas faire passer la photo avant les KPI sur mobile.
- Ne pas allonger la page : moins de cartes mais plus d'air, en visant une hauteur totale à ±10 % de l'actuelle (5511 px à 1440, 8558 px à 390).
- Pas de fond bleu bébé en grand aplat de section : il reste une respiration (bandes d'étiquettes, sélection, focus sur fond bordeaux).

<details><summary>Livrable détaillé de l'auditeur et corrections du relecteur</summary>

## Spécimens vérifiés

Les trois directions ont été rendues avec Playwright et les vrais fichiers woff2. Fichiers dans `(fichier de travail de l'audit, hors dépôt) direction-artistique/` :

- `spec-c-desk.png`, `spec-c-mob-p0.png` : direction C, « Maison »
- `spec-a-desk.png` : direction A, éditorial
- `spec-b-desk.png` : direction B, dossier de marque
- `opsz.png` : Fraunces avec wght.css seul comparé à l'axe opsz
- `palettes.py` : contrastes calculés selon la formule WCAG 2.x

Versions npm vérifiées le 12/10/2026 :
- @fontsource-variable/fraunces 5.3.0
- @fontsource-variable/newsreader 5.3.0
- @fontsource-variable/instrument-sans 5.3.0
- @fontsource-variable/geist-mono 5.3.0
- @fontsource/dm-mono 5.3.0
- @fontsource/instrument-serif 5.3.0
- Il n'existe pas de @fontsource-variable/young-serif.

---

## A. « Éditorial » : le portfolio comme un numéro de magazine marketing

**Concept.** Le site se lit comme un magazine : une couverture (le nom), un sommaire (la navigation), des articles-cas avec chapeau et chiffres en exergue.

| Token | oklch | hex | Contraste |
|---|---|---|---|
| --paper (fond) | 0.976 0.007 90 | #f9f7f2 | référence |
| --surface | 0.948 0.011 85 | #f1ede6 | référence |
| --ink (texte) | 0.205 0.012 55 | #1c1612 | 16.72:1 sur paper · 15.34:1 sur surface |
| --ink-soft | 0.46 0.014 60 | #5e5650 | 6.71:1 · 6.16:1 · 5.13:1 sur sky |
| --accent (rouge cerise) | 0.53 0.195 25 | #c3222a | 5.47:1 · 5.02:1 |
| --accent-2 (bleu bébé, surlignage) | 0.885 0.042 232 | #bedff0 | ink dessus 12.79:1 · cerise dessus 4.19:1 (interdit en petit texte) |
| --accent-deep (bordeaux, bloc contact) | 0.31 0.095 17 | #56161e | paper dessus 12.83:1 |
| --rule / --rule-soft | = ink / 0.87 0.012 80 | #1c1612 / #d8d3cc | filets |

- **Typo.** Newsreader Variable pour les titres, chapeaux et KPI (`opsz.css`, 132 Ko en latin ; ou `wght.css`, 58 Ko, sans optique). Instrument Sans Variable (`wght.css`, 30.1 Ko) pour l'UI et le texte.
- **Signatures.**
  1. Un folio en tête, sous filet double : « Fiona Talbi — Portfolio · Marketing 360 & communication · Paris ».
  2. Les projets en « articles » : surtitre cerise, titre serif, chapeau = `context`, KPI en exergue dans la marge.
  3. Un surlignage bleu bébé (`linear-gradient(transparent 55%, var(--accent-2) 55%)`) sur une seule expression par section, comme une annotation au feutre.
- **KPI.** Newsreader 300, 60 px, couleur encre, entre deux filets noirs ; source en capitales cerise de 11 px.
- **Projets.** Une colonne, sans carte. Titre 32 px, chapeau 19 px, KPI en marge droite (240 px).
- **On supprime.** Cartes, pastels, icônes, header en verre, violet, badges.
- **Risques.**
  - Le registre est plus « culture » que « trade marketing ».
  - À 1440×900, le hero éditorial pousse les KPI sous la ligne de flottaison (constaté sur spec-a-desk.png).
  - Jusqu'à 162 Ko de polices avec l'optique.
  - Le bordeaux est cantonné au contact : l'écart au brief reste partiel.

---

## B. « Dossier de marque » : Fiona présentée avec la grammaire de son métier

**Concept.** Le site est mis en page comme une charte de marque et des fiches campagne : nuancier, brief, PLV, KPI, le vocabulaire qu'elle utilisait chez Logitech.

| Token | oklch | hex | Contraste |
|---|---|---|---|
| --paper | 0.945 0.019 78 | #f4ecdf | référence |
| --surface (fiches) | 0.985 0.006 85 | #fcfaf6 | référence |
| --ink | 0.235 0.03 20 | #2b1818 | 14.37:1 · 16.16:1 |
| --ink-soft | 0.47 0.03 30 | #6b5551 | 5.89:1 · 6.62:1 |
| --accent (bordeaux) | 0.37 0.115 16 | #701d2a | 9.44:1 · 10.61:1 (surface dessus 10.61:1) |
| --accent-2 (bleu bébé) | 0.86 0.055 232 | #aed8ef | ink dessus 11.13:1 · bordeaux dessus 7.31:1 |
| --signal (cerise) | 0.545 0.2 24 | #cb2430 | 4.67:1 · 5.25:1 |
| --line | 0.83 0.022 65 | #d2c5b9 | filets |

- **Typo.** Instrument Sans Variable en `standard.css` (axes wdth 75-100 % et wght 400-700, 57.3 Ko) : titres en condensé 78 % et en capitales, texte en largeur 100 %. Geist Mono Variable (`wght.css`, 23.1 Ko) pour les étiquettes ; alternative : @fontsource/dm-mono 400, 14.8 Ko.
- **Signatures.**
  1. Les KPI en « étiquettes de rayon » : bandeau encre avec la source en mono, chiffre en condensé. C'est un clin d'œil au category management et à la PLV.
  2. Les projets en « fiches campagne » Brief / Action / Résultats.
  3. Des repères de coupe (deux équerres de 14 px) autour des visuels, en référence à l'impression PLV, et un nuancier de 3 pastilles dans le header.
- **KPI.** 4 étiquettes, bandeau `--ink` en mono capitales 11 px, chiffre condensé 52 px, libellé 14 px.
- **Projets.** « Fiche 01 — Category management », en grille Brief / Action / Résultats.
- **On supprime.** Comme en A, plus les monogrammes.
- **Risques.**
  - Le rendu peut paraître froid ou technique, et la mono évoque le développeur.
  - Les grandes capitales bordeaux tirent vers l'affiche.
  - Ça devient gadget si on multiplie les repères et les pastilles.

---

## C. « Maison » : luxe minimal chaleureux, fidèle au brief

**Concept.** Un beige uni, une encre chaude, un bordeaux profond, un bleu bébé qui respire et une pointe de cerise : l'élégance discrète d'une maison, au service des chiffres.

| Token | oklch | hex | Contraste |
|---|---|---|---|
| --paper (fond beige uni) | 0.955 0.017 78 | #f7efe4 | référence |
| --paper-deep (bandes) | 0.928 0.024 74 | #f1e5d6 | référence |
| --paper-light (étiquettes, menu) | 0.982 0.008 82 | #fcf9f3 | référence |
| --ink | 0.25 0.035 22 | #311b1a | 14.15:1 paper · 12.99:1 paper-deep · 15.35:1 paper-light · 11.14:1 sky |
| --ink-soft | 0.48 0.032 32 | #6f5752 | 5.83:1 · 5.35:1 · 6.32:1 · 4.59:1 sky |
| --bordeaux | 0.39 0.125 17 | #7a1e2c | 8.99:1 · 8.25:1 · 9.75:1 · 7.08:1 sky |
| --bordeaux-deep | 0.31 0.095 17 | #56161e | paper dessus 12.05:1 · sky dessus 9.49:1 · paper-light dessus 13.07:1 |
| --sky (bleu bébé) | 0.875 0.05 232 | #b6dcf2 | surfaces, sélection, focus sur bordeaux |
| --cherry (rouge cerise) | 0.555 0.205 24 | #d02331 | 4.64:1 paper · 4.27:1 paper-deep (non-texte ≥ 3:1) |
| --line | 0.86 0.02 68 | #dacfc3 | filets décoratifs |

- **Typo.** Fraunces Variable (`opsz.css`, 67.3 Ko) et Instrument Sans Variable (`wght.css`, 30.1 Ko), soit 97 Ko. Pas d'italique.
- **Signatures.**
  1. Le nom en très grand Fraunces, le métier en bordeaux juste dessous.
  2. L'itinéraire « Paris — Londres — Dublin », relié par des filets (fait tiré de portfolio.ts:461).
  3. Le bloc contact en bordeaux profond, texte beige.
  4. Si Fiona le fournit, un trait dessiné de sa main sous un mot du hero, en SVG bordeaux.
- **KPI.** Sans carte : filet encre au-dessus, chiffres Fraunces 400 bordeaux de 44 à 56 px, libellé 15 px, source en capitales 12 px.
- **Projets.** Une liste aérée sur le beige ; une couverture uniquement si un visuel réel est fourni.
- **Risques.**
  - Ça peut faire « faire-part » ou daté si on abuse de la serif et de l'italique.
  - Ça peut manquer d'énergie pour un recruteur retail ou tech.
  - Fraunces a du caractère (k, &, 1 à drapeau) : la réserver aux grands corps.

---

## Recommandation : « Maison » (C) avec les fiches du dossier de marque (B)

**Pourquoi.**
1. C'est fidèle au brief et à la roadmap (beige uni, bordeaux, bleu bébé, cerise), et cohérent avec la photo existante.
2. Ça parle aux deux cibles. Le luxe (MSc GCU) se lit dans la serif et le bordeaux. Le retail et la tech (Logitech, CosmétiCar) se lisent dans les fiches Enjeu / Action / Résultats et les étiquettes KPI, qui reprennent son vocabulaire (rayon, PLV, top stores).
3. Ça ne fait pas IA. Les gabarits génèrent du sans-serif, du violet ou indigo et des cartes ; une serif à optique variable sur beige, des filets et aucune carte décorative s'en démarquent nettement.
4. C'est faisable sans refonte : mêmes sections, mêmes ancres, mêmes composants. Les changements portent sur les tokens, le CSS et quelques champs de données.
5. C'est mesuré : tous les couples texte/fond sont à 4.5:1 ou plus, et les polices pèsent 97 Ko.

**Ce qu'on prend à B :** la structure des fiches projet (Enjeu / Action / Résultats, labels en Instrument Sans capitales et non en mono) et les étiquettes KPI, uniquement dans les fiches. Rien d'autre.

**Ordre de mise en œuvre.**
1. Polices et tokens (ci-dessous).
2. Remplacer les 47 littéraux de couleur.
3. Hero : H1 = nom, KPI sans carte, suppression de la légende et des orbites.
4. En-têtes de section et titres.
5. Fiches projet.
6. Simplifier Compétences, Formation, Certifications et Recommandations.
7. Contact bordeaux.
8. og-image, theme-color, favicon.
9. Habillage vidéo.

### Polices (remplacent styles.css:4-5)

```css
@import "@fontsource-variable/fraunces/opsz.css";
@import "@fontsource-variable/instrument-sans/wght.css";
/* bun add @fontsource-variable/fraunces@5.3.0 @fontsource-variable/instrument-sans@5.3.0
   bun remove @fontsource-variable/dm-sans @fontsource-variable/manrope */
```

### Tokens prêts à coller dans :root

```css
:root {
  /* Couleurs « Maison » : beige · bordeaux · bleu bébé · cerise */
  --paper: oklch(0.955 0.017 78);          /* #f7efe4 fond beige uni */
  --paper-deep: oklch(0.928 0.024 74);     /* #f1e5d6 bandes alternées */
  --paper-light: oklch(0.982 0.008 82);    /* #fcf9f3 étiquettes, menu, widget */
  --ink: oklch(0.25 0.035 22);             /* #311b1a 14.15:1 */
  --ink-soft: oklch(0.48 0.032 32);        /* #6f5752 5.83:1, métadonnées */
  --bordeaux: oklch(0.39 0.125 17);        /* #7a1e2c 8.99:1, accent */
  --bordeaux-deep: oklch(0.31 0.095 17);   /* #56161e hover, bloc contact */
  --sky: oklch(0.875 0.05 232);            /* #b6dcf2 surfaces uniquement */
  --cherry: oklch(0.555 0.205 24);         /* #d02331 progression, lien actif */
  --line: oklch(0.86 0.02 68);             /* #dacfc3 filets */
  --line-strong: var(--ink);

  /* Alias de compatibilité (@theme inline, 404, erreurs) */
  --background: var(--paper);
  --foreground: var(--ink);
  --card: var(--paper-light);
  --primary: var(--bordeaux);
  --primary-foreground: var(--paper-light);
  --secondary: var(--paper-deep);
  --muted-foreground: var(--ink-soft);
  --border: var(--line);
  --destructive: var(--cherry);
  --glass: var(--paper-light);
  --glass-border: var(--line);
  --soft-shadow: none;

  /* Typographie */
  --font-display: "Fraunces Variable", Georgia, "Times New Roman", serif;
  --font-sans: "Instrument Sans Variable", system-ui, -apple-system, "Segoe UI", sans-serif;
  --text-label: 0.75rem;                                     /* 12 */
  --text-meta: 0.875rem;                                     /* 14 */
  --text-body: 1.0625rem;                                    /* 17 */
  --text-lead: clamp(1.1875rem, 1.05rem + 0.5vw, 1.375rem);  /* 19 → 22 */
  --text-h3: clamp(1.5rem, 1.25rem + 1vw, 2rem);             /* 24 → 32 */
  --text-h2: clamp(2.125rem, 1.5rem + 2.6vw, 3.5rem);        /* 34 → 56 */
  --text-h1: clamp(3.25rem, 1.8rem + 6.5vw, 7rem);           /* 52 → 112 */
  --text-kpi: clamp(2.75rem, 2rem + 2.4vw, 3.5rem);          /* 44 → 56 */
  --leading-display: 1.02;
  --leading-heading: 1.15;
  --leading-body: 1.6;
  --tracking-display: -0.02em;
  --tracking-label: 0.08em;

  /* Espace et grille */
  --content: 73.75rem;                                       /* 1180 px */
  --gutter: clamp(1.25rem, 0.5rem + 3vw, 2.5rem);            /* 20 → 40 */
  --measure: 36rem;
  --space-section: clamp(4.5rem, 3rem + 6vw, 8rem);          /* 72 → 128 */
  --space-block: clamp(2rem, 1.5rem + 2vw, 3rem);            /* 32 → 48 */

  /* Formes, profondeur, mouvement */
  --radius: 0.25rem;                                         /* 4 px */
  --radius-control: 0.5rem;                                  /* 8 px */
  --shadow-float: 0 10px 30px oklch(0.25 0.035 22 / 14%);    /* widget vidéo seulement */
  --ease: cubic-bezier(0.2, 0.65, 0.3, 1);
  --dur-fast: 160ms;
  --dur: 240ms;
}
```

### Règles de base associées

```css
body { background: var(--paper); color: var(--ink); font: 400 var(--text-body)/var(--leading-body) var(--font-sans); }
h1, h2, h3 { font-family: var(--font-display); font-weight: 400; letter-spacing: var(--tracking-display); }
.section-kicker { font: 600 var(--text-label)/1.4 var(--font-sans); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--ink-soft); }
.site-wrap { width: min(var(--content), 100% - 2 * var(--gutter)); margin-inline: auto; }
::selection { background: var(--sky); color: var(--ink); }
:focus-visible { outline: 2px solid var(--bordeaux); outline-offset: 3px; border-radius: 2px; }
.contact-panel :focus-visible { outline-color: var(--sky); }
.scroll-progress { background: var(--cherry); }
```

### À supprimer de l'existant

- **Décor :** `.hero::before`, `.visual-orbit`, `.cover-rings`, `.contact-panel::before` et `::after`.
- **Ornements :** `.photo-caption`, `.section-eyebrow > span`, `.project-number`, `.skill-icon`, `.cert-mark`, `.document-icon`, `.logo-mark`, `.brand-dot`.
- **Pilules :** `.interest-pill` et `.tool-pill`, remplacées par du texte.
- **Effets :** le bloc `@supports (backdrop-filter)` et `.action:hover { transform }`.
- **Couleurs :** les thèmes `.project-catman/trade/social/influence`.
- **Données :** les champs `accent`, `number`, `visualCaption`, `displayName`, `mark` et `style`.

---

## Vidéo de présentation : habillage DA

- **Invitation.** Un bouton secondaire « Ma présentation en vidéo » dans le hero (icône Play), sans modale automatique.
- **Widget « plus tard ».** Un rectangle `--paper-light`, bordure 1px `--bordeaux`, rayon 8 px, hauteur 48 px. Il contient une vignette 32×32 tirée de la vraie vidéo, le libellé « Ma présentation » et une fermeture séparée de 44×44. Positionné en bas à droite, avec les safe-area insets. C'est le seul élément du site avec une ombre.
- **Vidéo provisoire.** Neutre, sans personne, avec une affiche aux couleurs du site : rien qu'on puisse prendre pour Fiona.

---

## Photo et visuels : à fournir par Fiona (rien à inventer)

1. **Portrait.** Vertical 4:5, au moins 1600×2000 px, lumière naturelle, fond beige, crème ou un lieu réel (bureau, rue de Paris). Une tenue unie (bordeaux, marine, crème) s'accorde à la palette. Cadrage buste, regard caméra ou trois-quarts. Pas de retouche IA. Il remplacera creative-desk.jpg (export WebP ou AVIF de 1200 px, 120 à 180 Ko) et servira pour l'og-image.
2. **Visuels de projets**, avec l'accord de l'employeur et sans information confidentielle, au moins 1 par fiche, en 3:2, 1600 px de large ou plus :
   - un rayon informatique avant/après (catman Logitech) ;
   - de la PLV en magasin (Logi Work Days) ;
   - des captures de posts Instagram publics de CosmétiCar ;
   - un exemple de contenu d'influenceuse (Massilia), si l'autorisation est obtenue.
   - Sans visuel autorisé, la fiche reste typographique.
3. **Dessins (optionnel).** 2 ou 3 croquis scannés à 300 dpi sur fond blanc, à vectoriser en SVG monotrait bordeaux. Optionnellement, une signature manuscrite pour le bloc contact.
4. **Vidéo.** Le fichier final en 16:9 ou 4:5, avec des sous-titres FR (.vtt) et une image d'affiche extraite de la vidéo.
5. **Faits manquants :**
   - les dates des 3 expériences ;
   - l'organisme de la certification « AI Product Building » ;
   - le nom et la fonction des signataires, avec les 2 lettres en PDF.
6. **Logos.** Seulement des SVG officiels dont l'usage est autorisé. Sinon, les noms restent en texte.

Tant que le portrait n'est pas fourni, on garde la photo actuelle, sans légende et marquée comme décorative, plutôt qu'un emplacement vide visible.

**Corrections du relecteur sur ce livrable :**

ERREURS À CORRIGER DANS L'EXTRA
1) Le spécimen mobile viole une contrainte du projet. Sur spec-c-mob-p0.png, la photo (y ≈ 380-612) passe AVANT les KPI (y ≈ 670), alors que DA-08 et AGENTS.md exigent l'inverse. Le header mobile du spécimen n'a pas non plus de bouton menu (seul « Contact » est présent). Il faut corriger le spécimen ou ne pas le montrer à Fiona en l'état.
2) Spécimen et texte se contredisent sur l'italique. spec-c-desk.png et spec-c-mob-p0.png rendent « Marketing 360 & communication » en Fraunces italique (k et & bouclés). Or DA-03 dit « Pas d'italique » (81.5 Ko de plus) et la liste « avoid » tolère « une ligne au maximum ». Il faut trancher : aucun italique, budget de 97 Ko tenu.
3) Fraunces n'a pas de chiffres tabulaires. Mesure Playwright : avec tabular-nums, « 111 » fait 70.9 px et « 000 » 106.3 px à 56 px, à l'identique sans la propriété. Il faut retirer « tabular-nums » des règles KPI en Fraunces (DA-12, DA-19, et la mention « chiffres tabulaires vérifiés » qui ne vaut que pour Instrument Sans : 30.6 = 30.6 px).
4) La section « Polices (remplacent styles.css:4-5) » oublie le bloc @theme inline. styles.css:10-11 déclare encore « DM Sans Variable » et « Manrope Variable » : à remplacer en même temps.
5) Le contenu est modifié dans les spécimens. En B, les libellés KPI sont tronqués (« de ventes », « abonnés Instagram », « marketing & com ») et perdent « grâce au réagencement » et « en moins d'un an », ce qui change le sens du chiffre. En C, l'« Enjeu » réécrit context. Règle : reprendre les chaînes de portfolio.ts telles quelles, et faire valider toute reformulation par Fiona.
6) Points de détail. En A, la légende visible « Légende factuelle à fournir avec la vraie photo. » ne doit jamais être publiée (texte de remplacement visible). En B, « Fiche 00 — Profil » et « Fiche 01 » réintroduisent la numérotation décorative supprimée en DA-05 : si l'on reprend les fiches de B, c'est sans numéro.
7) Une affirmation des « strengths » est fausse. « Les contrastes texte sont déjà conformes » est contredit par l'audit lui-même : le numéro de projet est à 3.34:1 (catman, social), 3.43:1 (trade) et 3.88:1 (influence), en 12 px.

CE QUI EST VÉRIFIÉ ET JUSTE
- Les contrastes des 3 palettes ont été recalculés indépendamment (OKLab vers sRGB, WCAG 2.x). Toutes les valeurs annoncées sont exactes au centième (C : 14.15 / 5.83 / 8.99 / 4.64 / 11.14 / 9.75 / 12.05 / 9.49 / 13.07 ; A : 16.72 / 6.71 / 5.47 / 12.79 / 4.19 ; B : 14.37 / 5.89 / 9.44 / 4.67 / 11.13 / 7.31). La cerise est bien à 4.27:1 sur paper-deep : elle reste non textuelle.
- Les polices existent, vérifiées sur npm le 12/10/2026 : @fontsource-variable/fraunces 5.3.0 (opsz.css, latin 67 304 o), instrument-sans 5.3.0 (wght.css 30 092 o ; standard.css 57 332 o), newsreader 5.3.0 (opsz.css 132 000 o ; wght.css 58 084 o), geist-mono 5.3.0, @fontsource/dm-mono 5.3.0, @fontsource/instrument-serif 5.3.0. @fontsource-variable/young-serif renvoie bien 404 (seul @fontsource/young-serif 5.3.0, statique, existe). Les familles déclarées sont bien « Fraunces Variable » et « Instrument Sans Variable ».

ORIGINALITÉ : L'EXTRA SURESTIME LE « ÇA NE FAIT PAS IA »
L'argument « les gabarits génèrent du sans-serif et du violet » date de 2023-2024. En 2025-2026, fond crème, grande serif (Fraunces, Instrument Serif, Newsreader), kickers en capitales espacées au-dessus de chaque titre, filets fins, rangée de KPI à séparateurs verticaux, colonne de labels « ENJEU / ACTION » en capitales et « Ville —— Ville —— Ville » forment le 2e style par défaut des pages générées par LLM, le style « éditorial chaleureux ». Les trois directions en relèvent :
- A cumule les marqueurs les plus reconnaissables : nom avec le 2e mot en italique (« Fiona / Talbi »), surlignage au feutre et folio sous double filet.
- B, avec ses labels mono, ses repères de coupe, ses pastilles de nuancier et ses capitales condensées, correspond au style « brutaliste » des générateurs ; la mono évoque le développeur, pas le marketing.
- C est la plus sobre, mais telle que rendue, elle reste un gabarit bien exécuté.
Corrections pour C, sans changer le brief :
(a) Fraunces réservée au H1, aux H2, aux chiffres KPI et à l'e-mail du contact. Tout le reste en Instrument Sans 600, ce qui évite l'effet « serif partout » et « faire-part ».
(b) Pas de kicker en capitales au-dessus du H1. Au-dessus des H2, un kicker en casse normale (14 px, 600, --bordeaux), ou rien si le H2 factuel suffit.
(c) Pas de colonne de labels en capitales dans les fiches : un <dl> avec <dt> en casse normale.
(d) « Paris · Londres · Dublin » en texte simple, sans filets.
(e) Un seul système KPI, sans les « étiquettes de rayon » encadrées : sur le spécimen, elles ressemblent à des cartes de prix.
L'originalité doit venir de trois choses que l'IA ne peut pas générer : la vidéo et le portrait de Fiona, un seul de ses dessins, et une micro-typographie française irréprochable. Si l'on veut une serif moins répandue, Source Serif 4 existe (@fontsource-variable/source-serif-4 5.3.1, wght.css latin 50 936 o ; opsz.css 122 360 o). Elle a moins de caractère : à proposer comme alternative, pas comme remplacement.

FIDÉLITÉ AU BRIEF : DEUX MANQUES
- Le bleu bébé est presque absent de C. Sur spec-c-desk.png, il n'apparaît que dans deux bandes de 6 px. Le brief veut « mélanger beige, bordeaux, bleu bébé et rouge cerise ». Il faut ajouter --sky-soft: oklch(0.95 0.022 232) #e1f2fb (ink 14.05:1, bordeaux 8.93:1, ink-soft 5.79:1) comme fond du bloc KPI du hero. Cela répond aussi à « KPIs dans des blocs visuels » (README.md:7), ce qu'une rangée sans fond ne fait pas.
- Le brief exige des certifications « sous forme de badges ou de cartes avec le logo de l'organisme » et une « timeline » expériences/formation. La simplification en listes de l'extra (« À supprimer : .cert-mark… », « Certifications : liste ») doit garder des badges typographiques pour les certifications (voir DA-06 corrigé) et une liste datée chronologique pour la formation.

EXCÈS ET SÉCURITÉ
- Supprimer « Optionnellement, une signature manuscrite pour le bloc contact ». Publier la vraie signature de quelqu'un sur le web facilite les faux documents, et c'est un cliché de portfolio.
- Dans la liste des visuels à fournir, la consigne de tenue (« bordeaux, marine, crème ») est un conseil, pas une exigence. La formuler comme une suggestion.

ORDRE DE MISE EN ŒUVRE À CORRIGER
Supprimer AVANT de remplacer les littéraux. Ordre proposé :
1. Polices, puis tokens, @theme inline compris.
2. Suppressions : DA-09, ornements DA-05/06/07 et pastels DA-11. Cela retire d'emblée une partie des 47 littéraux.
3. Remplacement des littéraux restants, avec le contrôle grep « 0 oklch hors :root ».
4. Header (sticky, scroll-padding, hero padding-top).
5. Hero.
6. Titres.
7. Fiches.
8. Compétences, Formation, Certifications, Recommandations.
9. Contact.
10. og-image, theme-color et favicon.
11. Vidéo, avec le parcours « Plus tard » vers le widget (DA-24 corrigé).

À AJOUTER AUX TOKENS DE L'EXTRA
--sky-soft (ci-dessus) ; --header-h: 64px (56px sous 720 px) utilisé par scroll-padding-top: calc(var(--header-h) + 24px) ; --font-display: "Fraunces Variable", "Fraunces Fallback", Georgia, serif avec le repli calibré et le préchargement (DA-V1).

</details>

## Mobile, tablette, desktop

_Testé avec Playwright (Chromium, isMobile/hasTouch pour téléphones et tablettes, reducedMotion) sur 15 formats demandés plus 1280x720, 1366x768, 1536x864, 1024x1366 et 981-1121 px. La base est saine : aucun débordement horizontal, toutes les cibles visibles a/button/summary font au moins 44 px, Contact et la barre de progression restent visibles, et les KPIs passent avant la photo sur mobile. Les vrais défauts tiennent aux interactions tactiles et aux hauteurs d'écran. Un tap « à l'extérieur » du menu ouvert déclenche aussi l'élément dessous. Les :hover ne sont pas réservés aux pointeurs fins et restent collés après un tap, et aucun :active ne donne de retour au toucher (tap-highlight transparent). En navigation par ancre, le titre arrive 68 px (mobile) à 90 px (tablette/desktop) sous le header, contre 26 px pour Formation. En bas de page, « Recommandations » allume « Contact » sur iPad portrait. Sur les portables courants (1366x768, 1280x720), la bande de KPIs est entièrement sous la ligne de flottaison. En paysage téléphone, le header occupe 24 % de la hauteur et le menu défile en interne. La plage tablette 721-980 masque toute la navigation derrière un burger alors que 3 liens primaires tiennent. Les grilles 2 colonnes (projets, compétences) s'y désalignent. Rien ne prépare encore le widget vidéo en bas à droite : pas de viewport-fit=cover ni d'env(safe-area-inset-*), et le lien « Retour en haut » occupe déjà cette zone en fin de page sur mobile et tablette._

### RT-01 · Le tap « à l'extérieur » du menu mobile déclenche aussi l'élément dessous (pas de voile)

🟠 important · mobile, tablette · effort S · Vérifié

- **Preuve** : site-header.tsx:37-41 : la fermeture se fait sur pointerdown du document, sans bloquer le click qui suit. Test : menu ouvert à 768x1024 (panneau 99→506 px), tap sur « Voir les missions » à y=908. Le menu se ferme ET le <details> du projet s'ouvre. Même résultat à 390x844 (tap à y=728, panneau 71→478). Aucun voile (elementFromPoint sous le panneau = contenu de la page). Avec le menu ouvert, la molette fait défiler la page de 400 px (body overflow: visible) et le menu reste ouvert.
- **Problème** : Toucher la page pour fermer le menu ouvre ou suit l'élément touché (lien, accordéon, mailto). Le geste paraît imprévisible. Sans voile, rien ne signale que le menu est un état temporaire.
- **Recommandation** : 1) Ajouter un voile frère du header, pas enfant : .site-header a un transform (styles.css:128) et un backdrop-filter (styles.css:139), ce qui piège tout enfant position:fixed. Dans SiteHeader, état `const [open, setOpen] = useState(false)`, `<details onToggle={e => setOpen(e.currentTarget.open)}>`, puis rendre `<div className="menu-scrim" data-open={open} onClick={closeMenu} aria-hidden />` dans un fragment avant <header>. 2) CSS : `.menu-scrim{position:fixed;inset:0;z-index:99;background:oklch(0.255 0.029 285 / 18%);opacity:0;pointer-events:none;transition:opacity 160ms}` `.menu-scrim[data-open="true"]{opacity:1;pointer-events:auto;touch-action:none}` et `@media (min-width:981px){.menu-scrim{display:none}}`. 3) Supprimer l'écouteur pointerdown du document : le voile reçoit le tap, sans clic traversant. 4) Verrou de défilement léger, sans JS : `@media (max-width:980px){html:has(.mobile-menu[open]){overflow:hidden}}` et `.mobile-nav{overscroll-behavior:contain}`.

### RT-02 · Le focus clavier sort du menu ouvert et se retrouve caché derrière

🟠 important · mobile, tablette · effort S · Corrigé

- **Preuve** : Test Tab depuis le summary ouvert à 390x844 : les 7 liens du menu, puis « Voir les projets », « Contact » et « Voir les missions » hors du menu, avec le menu toujours ouvert (openAfterTabOut = true). « Voir les projets » (y 390-438) est sous le panneau (71-478 px) : focus masqué (WCAG 2.4.11). Même séquence à tous les formats ≤ 980 px.
- **Problème** : Un utilisateur clavier ou de lecteur d'écran sur tablette avec clavier perd la vue de l'élément focalisé tant que le menu reste ouvert.
- **Recommandation** : Dans site-header.tsx, sur <details className="mobile-menu">, ajouter : onBlur={(event) => { const next = event.relatedTarget; if (next instanceof Node && !event.currentTarget.contains(next)) closeMenu(); }}. Le menu ne se ferme que si le focus part vers un autre élément focalisable hors du menu, pas lors d'un tap sur une zone neutre ni d'un changement d'application. Garder Échap (site-header.tsx:31-36), qui rend déjà le focus au summary. Pas de piège à focus. À tester : Tab depuis le dernier lien (Recommandations), qui doit fermer le menu, et Maj+Tab depuis le premier lien vers le summary, qui doit le laisser ouvert.

### RT-05 · KPIs sous la ligne de flottaison sur les portables courants

🟠 important · desktop, tablette · effort S · Vérifié

- **Preuve** : .impact-strip mesuré à 736-868 px à 1280-1920 px de large. À 1366x768 et 1280x720, il est entièrement hors écran (capture fold-1366x768.png). Il est coupé à 1280x800 (68 px), 1180x820 (700-852) et 1024x768 (634-786). Causes : .hero padding-top 154 px (styles.css:238), h1 jusqu'à 86 px (styles.css:272), photo carrée de 489 px (aspect-ratio:1, styles.css:382).
- **Problème** : Les chiffres (+30 %, 140, 500+, 3+ ans), principal argument face au recruteur, n'apparaissent pas à l'arrivée sur la majorité des portables.
- **Recommandation** : Ajouter `@media (min-width:981px) and (max-height:900px){.hero{padding-top:118px;padding-bottom:32px}.hero h1{font-size:clamp(56px,9vh,80px)}.hero-grid{row-gap:24px}.hero-photo-frame{aspect-ratio:auto;height:clamp(280px,calc(100svh - 400px),489px)}.impact-strip{padding-block:16px}}`. Testé par injection : bas des KPIs à 691 px pour 1366x768, 676 pour 1280x720, 723 pour 1280x800, 710 pour 1024x768 et 812 pour 1440x900. Tout est visible sans rien supprimer (capture proposal-1366x768.png).

### RT-07 · Survols collants au toucher et aucun retour visuel au tap

🟠 important · mobile, tablette · effort S · Corrigé

- **Preuve** : Les règles :hover ne sont pas protégées par @media (hover:hover) : styles.css:194, 318, 326, 335, 840, 1086, 1111, 1135. -webkit-tap-highlight-color: transparent sur a/button/summary (styles.css:82-86) et aucun :active dans le fichier. Test à 390x844 tactile (matchMedia('(hover: hover)') = false) : après un tap sur « Voir les projets » (navigation neutralisée), le fond reste violet oklch(0.505 0.2 288) avec :hover=true 400 ms plus tard. Un tap sur .tool-pill, un span non interactif de 38 px, change son fond en --secondary : fausse affordance.
- **Problème** : Sur mobile et tablette, le bouton touché reste coloré, des éléments non cliquables réagissent, et les vrais boutons ne donnent aucun retour immédiat. Un clic sur mailto ou sur la copie paraît donc mort pendant la latence, ce qui contredit « chaque clic satisfaisant ».
- **Recommandation** : 1) Regrouper les règles :hover des lignes styles.css:194, 318, 326, 335, 1086, 1111 et 1135 dans un seul `@media (hover:hover){…}`. La règle .action:hover du bloc reduced-motion (1597-1599) peut rester telle quelle. 2) Supprimer `.tool-pill:hover` (styles.css:840-843) : ce n'est pas un contrôle. 3) Retour au toucher, hors media query : `.action:active,.header-contact:active,.copy-button:active,.recommendation-link:active,.mobile-menu>summary:active{transform:scale(.97);transition-duration:60ms}` et `.mobile-nav .nav-link:active{background:var(--secondary)}` et `.project-details>summary:active{color:var(--primary)}`. 4) Garder -webkit-tap-highlight-color: transparent puisque :active le remplace. Ne pas ajouter de vibration ni d'effet d'onde.

### RT-03 · « Recommandations » allume « Contact » sur iPad portrait (règle de fin de document)

🟡 amélioration · tablette · effort S · Corrigé

- **Preuve** : use-portfolio-navigation.ts:163-166 force la dernière section quand distance - scroll ≤ 2. Clic sur Recommandations : à 820x1180, recoTop = 141, actif = #contact et aria-current="location" sur le Contact du header. Même chose à 1024x1366 (recoTop = 303). À 1440x900 et 1920x1080, l'état reste correct.
- **Problème** : Sur grand écran tablette, la section demandée ne peut pas atteindre le haut. La nav désigne alors une autre section que celle demandée, et ce retour visuel contredit le clic.
- **Recommandation** : Dans use-portfolio-navigation.ts, remplacer le bloc des lignes 41-44 par : `if (distance > 0 && distance - scrollPosition <= 2) { const requested = sections.find((section) => "#" + section.id === window.location.hash); const top = requested?.getBoundingClientRect().top ?? -1; currentSection = requested && top >= 0 && top < window.innerHeight / 2 ? requested.id : (sections.at(-1)?.id ?? currentSection); }`. Aucun nouvel écouteur : hashchange est déjà écouté (ligne 61) et le défilement reste passif et throttlé par rAF. Résultat attendu : à 820x1180, Recommandations reste actif après le clic, tandis que Contact devient actif après un clic sur Contact ou en arrivant en bas sans hash (ou avec un hash de section plus haute).

### RT-04 · Arrivée des ancres trop basse et irrégulière sous le header

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : scroll-padding-top 120 px (styles.css:68) et 92 px (styles.css:1325). Header réel : bas à 94 px (≥ 721) et 66 px (≤ 720). Écart mesuré entre le bas du header et l'eyebrow : 68-69 px sur mobile, 90-91 px à partir de 721 px, 26 px pour Formation (.education-section padding-top:0, styles.css:844) et 73 à 495 px pour Contact (fin de document). En paysage 844x390, l'eyebrow arrive à y=184 sur 390 px, soit 47 % de l'écran perdu.
- **Problème** : Chaque clic de navigation laisse un vide variable : le saut paraît approximatif et coûte beaucoup de place en paysage.
- **Recommandation** : Modifier les règles en place, sans rien ajouter en fin de fichier. 1) :root : `--header-offset:94px; --section-pad:64px;` et, dans le bloc @media (max-width:720px), `:root{--header-offset:66px;--section-pad:42px}` (même valeur 66 px dans la requête paysage de RT-06). 2) styles.css:68 : `scroll-padding-top: calc(var(--header-offset) + 20px)` ; supprimer styles.css:1324-1326. 3) styles.css:456-458 : `.section{padding-block:var(--section-pad)}` ; supprimer `padding-block:42px` du bloc ≤ 720 (lignes 1416-1418). Ajouter juste après `.section` : `.section[id]{scroll-margin-top:calc(-1 * var(--section-pad))}`. 4) Après les règles .education-section (844) et .contact-section (996) : `.education-section[id],.contact-section[id]{scroll-margin-top:0}` (spécificité 0,2,0, nécessaire contre .section[id]). Résultat : l'eyebrow de chaque section arrive 20 px sous le header, Formation comprise, à tous les formats. Le seuil du hook (use-portfolio-navigation.ts:33, bas du header + 28) reste valide : le haut des sections arrive à 50 px (≥ 721) ou 44 px (≤ 720), Formation à 114 ou 86 px, tous sous les seuils de 122 et 94 px. Contact reste limité par la fin du document. À vérifier sur Safari iOS (scroll-margin négatif) ; à défaut, le comportement retombe sur l'actuel.

### RT-06 · Paysage téléphone : header envahissant, CTA hors écran, menu qui défile en interne

🟡 amélioration · mobile · effort M · Corrigé

- **Preuve** : 844x390 utilise la mise en page tablette : header 20→94 px (24 % de la hauteur), hero padding-top 154 px, CTA à 472-520 px, KPIs à 592-756. 667x375 : CTA à 428-476. Menu à 844x390 : 99→389 px (1 px du bord), scrollHeight 405 pour clientHeight 288, donc défilement interne avec overscroll-behavior auto. À l'écran, on ne voit que le nom et le h1 (capture l844-fold.png).
- **Problème** : En paysage, le premier écran ne montre ni rôle complet, ni action, ni chiffre, et le menu demande de défiler pour atteindre les liens secondaires.
- **Recommandation** : Une seule requête courte : `@media (orientation:landscape) and (max-height:500px){:root{--header-offset:66px} .site-header{top:8px;width:calc(100% - 24px);border-radius:16px} .header-inner{min-height:56px;padding:6px 10px;gap:8px} .hero{padding-top:84px} .mobile-nav{max-height:calc(100dvh - 84px);overscroll-behavior:contain}}`, plus `html{scroll-padding-top:86px}` si RT-04 n'est pas encore en place. Mesuré : le header passe de 94 à 66 px à 844x390 (17 % de la hauteur au lieu de 24 %). Le menu garde un défilement interne, contenu (overscroll-behavior:contain), ce qui est acceptable pour un panneau déroulant. Ne pas faire : le hero sur 1 colonne, le h1 à 44 px, les KPIs sur 4 colonnes ou le menu sur 2 colonnes en paysage. Note : cette requête touche aussi les fenêtres desktop très basses, sans effet négatif.

### RT-08 · Tablette 721-980 : tout est caché derrière le burger et le menu s'étire sur 720 px

🟡 amélioration · tablette · effort M · Corrigé

- **Preuve** : À 768 px, l'en-tête offre 718 px utiles. Toute la nav demande 848 px (elle ne tient pas), mais les 3 liens primaires n'en demandent que 234 : marque 75 + 234 + Contact 97 + burger 44 + espaces ≈ 530 px. Le panneau du menu prend toute la largeur du header (720 px, lignes de 48 px, 99→506 px ; captures menu-open-768x1024.png, tablet-768-menu.png). À 981 px, la nav complète tient avec 96 px libres ; à 900 px elle demande 848 px pour 850 disponibles, trop juste.
- **Problème** : Sur tablette portrait, l'accès aux 3 sections principales demande 2 taps. Le menu ressemble à une liste de téléphone agrandie.
- **Recommandation** : Garder le basculement à 981 px et le menu actuel. Rendre seulement le panneau compact sur tablette : `@media (min-width:561px) and (max-width:980px){.mobile-nav{left:auto;right:0;width:min(340px,100%)}}`. Le panneau devient une liste déroulante alignée à droite sous le burger, avec des lignes de 48 px conservées, et reste compatible avec le voile de RT-01. Facultatif plus tard, en bonus : afficher les 3 liens primaires en ligne entre 721 et 980 px, à condition que le libellé du burger vienne de sectionContent.navigation et que le summary porte un indicateur quand une section secondaire est active.

### RT-09 · Cartes projets 2 colonnes : KPIs et « Voir les missions » désalignés, trou à l'ouverture

🟡 amélioration · tablette, desktop · effort M · Corrigé

- **Preuve** : Avec align-items:start (styles.css:506), hauteurs fermées de 446/426 px à 1024-1920 px (summary à 373 contre 353 px dans la carte) et de 502/527 px à 768 (métriques à 301 contre 327 px). À l'ouverture de la carte 1, elle passe de 446 à 609 px à 1440 et de 502 à 784 px à 768. La carte voisine reste à 426/527 px : trou de 183 à 257 px (capture d1440-details-open.png).
- **Problème** : Sur une même rangée, les chiffres ne sont pas sur la même ligne, donc la comparaison visuelle est cassée. L'ouverture crée un vide qui fait « cassé ».
- **Recommandation** : À partir de 721 px : remplacer `align-items:start` par `align-items:stretch` dans .projects-grid (styles.css:506), puis `.project-card{display:grid;grid-row:span 5;grid-template-rows:subgrid;row-gap:0}` et `.project-content{grid-row:2 / span 4;display:grid;grid-template-rows:subgrid;row-gap:0}`, placés dans `@media (min-width:721px)` et sous `@supports (grid-template-rows:subgrid)`. Les 5 pistes sont : couverture, h3, contexte, métriques, details. Sans subgrid, on garde le rendu actuel. Ne rien changer sous 721 px (une colonne).

### RT-10 · Puces des compétences centrées sur 2 lignes en tablette

🟡 amélioration · tablette · effort S · Vérifié

- **Preuve** : .skill-card li {display:flex; align-items:center} (styles.css:796-811). Avec 3 colonnes de 216 px à 768, 7 éléments sur 12 passent sur 2 lignes (4 sur 12 à 820). li de 45 px : la puce est centrée à 22 px alors que la première ligne est centrée à 11 px (capture t768-competences.png).
- **Problème** : Les puces flottent entre deux lignes, détail qui fait « pas fini » sur iPad.
- **Recommandation** : `.skill-card li{align-items:flex-start}` et `.skill-card li::before{margin-top:calc(.8em - 2px)}`. Avec 14 px et un interligne de 1,6, la puce tombe au centre de la première ligne. Les 3 colonnes restent lisibles une fois corrigées.

### RT-11 · Textes de 11-12 px nombreux sur mobile, tailles toutes en px

🟡 amélioration · mobile · effort S · Corrigé

- **Preuve** : À 390x844 : 47 éléments de texte visibles à 12 px ou moins, en gris --muted-foreground. Concernés : .impact-stat span, .hero-meta, .timeline-meta, .education-date, .language-level, .cert-card p, .project-category, .project-number, footer, et 11 px pour les numéros d'eyebrow. 94 déclarations de taille de police en px, aucune en rem : la taille de police par défaut choisie dans le navigateur est ignorée.
- **Problème** : Les métadonnées (entreprise des KPIs, dates, niveaux de langue) sont pénibles à lire en mobilité, et l'utilisateur ne peut pas les agrandir sans zoomer toute la page.
- **Recommandation** : Dans le bloc @media (max-width:720px) : `.impact-stat span,.hero-meta,.timeline-meta,.education-date,.language-level,.cert-card p,.project-category,.footer-inner{font-size:13px}`. Garder 11-12 px uniquement pour les éléments décoratifs ou redondants : numéros d'eyebrow et .project-number. Vérifier ensuite que les KPIs 2x2 tiennent toujours avant la photo à 390x844 (aujourd'hui de 498 à 800 px). Ne pas convertir toute la feuille en rem dans ce chantier.

### RT-13 · La zone bas-droite du futur widget vidéo est occupée en fin de page

🟡 amélioration · mobile, tablette · effort S · Corrigé

- **Preuve** : Zone simulée de 56x56 à 16 px des bords, au défilement maximal. Collision avec le lien « Retour en haut » du footer à 390x844 (lien 270-370 × 766-810, zone 318-374 × 772-828), 430x932, 667x375 et 768x1024. Pas de collision à 320 px (le lien passe à gauche) ni à 1440 px. Le bouton LinkedIn passe sous la zone pendant le défilement à 390 et 430 px.
- **Problème** : Le widget « revoir la vidéo », demandé en bas à droite, masquerait la dernière action de la page et gênerait le tap.
- **Recommandation** : Quand le widget est visible, et seulement à ce moment : le composant ajoute `data-video-widget` sur <html> (ou utiliser `:root:has(.video-widget:not([hidden]))`), puis `[data-video-widget] .site-footer{padding-bottom:calc(34px + 64px + env(safe-area-inset-bottom, 0px))}` (64 = pastille de 48 px + 16 px de marge). Ne pas déplacer « Retour en haut » et ne pas créer de bouton flottant « haut de page ». À tester : défilement maximal à 390x844, 430x932, 667x375 et 768x1024, sans recouvrement.

### RT-V1 · Aucun retour au survol sur les contrôles clés au pointeur (« Voir les missions », liens de recommandation, Contact du header, burger)

🟡 amélioration · desktop · effort S · Ajout

- **Preuve** : La feuille ne compte que 8 règles :hover (styles.css:194, 318, 326, 335, 840, 1086, 1111, 1135). Aucune ne couvre .project-details > summary (styles.css:638-647, principale action des cartes projets), .recommendation-link (985-995), .header-contact (203-215) ou .mobile-menu > summary (1225). .header-contact svg porte une transition de transform de 200 ms (216-218) qu'aucune règle ne déclenche : c'est un reliquat. Par ailleurs, .nav-link:hover (194-197) utilise le même fond var(--secondary) que .nav-link.is-active (198-202) : au survol d'un autre lien, deux pastilles identiques apparaissent.
- **Problème** : À la souris, l'action principale de chaque carte projet et l'action des recommandations ne réagissent pas, alors que les boutons .action se soulèvent de 2 px. Le retour est incohérent et le clic paraît moins « satisfaisant » sur desktop. Le survol de la nav peut aussi se confondre avec la section active.
- **Recommandation** : Dans le bloc `@media (hover:hover)` créé pour RT-07 : `.project-details>summary:hover{color:var(--primary)}` ; `.recommendation-link:hover{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}` ; `.header-contact:hover svg{transform:translateX(2px)}` (réutilise la transition existante) ; `.mobile-menu>summary:hover{background:var(--secondary)}` ; `.nav-link:not(.is-active):hover{background:color-mix(in oklch, var(--secondary) 55%, transparent)}`. Pas d'autre effet : ni soulèvement des cartes, ni ombre animée, ni curseur personnalisé.

### RT-14 · Grands téléphones et paysage 560-720 : colonne unique trop étirée

⚪ bonus · mobile, tablette · effort S · Corrigé

- **Preuve** : À 667x375, toutes les grilles sont en 1 colonne de 627 px : 6 cartes de certification de 82 px empilées, éducation et recommandations aussi. Le document fait 7848 px contre 5600 à 844x390. Les KPIs restent en 2x2 avec des cellules de 295x84 px.
- **Problème** : Beaucoup de défilement et de grandes cartes vides en paysage, sur foldables et petites tablettes (560-720 px).
- **Recommandation** : `@media (min-width:560px) and (max-width:720px){.cert-grid,.education-grid,.recommendation-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}`. Garder les KPIs en 2x2 jusqu'à 720 px, sans toucher à leurs bordures. Vérifier à 560, 667 et 720 px que les titres des cartes ne passent pas sur plus de 3 lignes.

### RT-15 · Photo du hero : recadrages divergents selon le format et image unique de 142 Ko

⚪ bonus · tous · effort M · Corrigé

- **Preuve** : .hero-photo-frame en aspect-ratio 1 au-dessus de 720 px (285 à 489 px de côté) et 1.7 en dessous (348x205 à 390 px) (styles.css:381-390, 1308-1310). Source de 1440x1024 (ratio 1.41) : 142 067 octets servis à tous les écrans, sans srcset (hero.tsx:55-61). C'est une image d'ambiance de bureau et non une photo de Fiona.
- **Problème** : Quand la vraie photo sera fournie (à fournir par Fiona), le recadrage 1.7 en paysage sur mobile coupera la tête d'un portrait. Les téléphones téléchargent une image 3 à 4 fois trop large.
- **Recommandation** : Quand la vraie photo sera fournie par Fiona, et pas avant : ajouter dans src/data/portfolio.ts un champ `focalPoint` (par exemple '50% 30%') appliqué en object-position inline sur l'img du hero. Ce point est indispensable avec le cadre limité en hauteur de RT-05 et le ratio 1.7 sur mobile. Garder le cadre carré, limité en hauteur par RT-05, sur desktop (pas de 4/5). Générer alors des variantes 720w et 1440w avec `sizes="(max-width:720px) calc(100vw - 40px), 489px"`. Ne pas optimiser l'image d'ambiance actuelle, qui est provisoire.

### RT-16 · Ouverture des accordéons et du menu instantanée (saut de contenu)

⚪ bonus · tous · effort S · Vérifié

- **Preuve** : Seule l'icône pivote (styles.css:651-657). Le contenu des projets apparaît d'un coup : +258 px à 390 px et +163 à 282 px en 2 colonnes. Le menu (styles.css:1245-1257) apparaît sans transition.
- **Problème** : Le clic produit un saut brusque, ce qui va à l'encontre de « fluide et naturel ».
- **Recommandation** : Amélioration progressive en CSS seul : `.project-details{interpolate-size:allow-keywords}` `.project-details::details-content{block-size:0;overflow:clip;transition:block-size 220ms var(--ease),content-visibility 220ms allow-discrete}` `.project-details[open]::details-content{block-size:auto}`. Pour le menu, ajouter `@starting-style{.mobile-menu[open] .mobile-nav{opacity:0;transform:translateY(-6px)}}` avec une transition de 160 ms. Les navigateurs non compatibles et le mode réduit gardent le comportement actuel.

### RT-17 · Boutons de contact mobiles étroits et centrés

⚪ bonus · mobile · effort S · Corrigé

- **Preuve** : À 320x640, « Écrivez-moi » et « LinkedIn » sont empilés, 141 px de large chacun, centrés (left 89). À 390 px, ils sont côte à côte (141 et 141 px). C'est l'action finale de la page.
- **Problème** : Sur petit écran, l'appel à l'action final est une petite pastille centrée, moins facile à atteindre au pouce qu'un bouton pleine largeur.
- **Recommandation** : `@media (max-width:720px){.contact-actions .action{flex:1 1 200px}}`. Les deux boutons sont alors empilés en pleine largeur (306 px à 390, 346 px à 430) sur tous les téléphones, et côte à côte et égaux à partir d'environ 493 px. Garder l'ordre « Écrivez-moi » puis « LinkedIn », avec 48 px de haut.

**Constats écartés par le relecteur**

- ~~RT-12 · Safe areas absentes : prérequis pour le header fixe et le futur widget~~ — La prémisse est inversée. Sans viewport-fit=cover (meta actuelle, __root.tsx:81), iOS Safari garde le viewport de mise en page dans la zone sûre : les côtés sont « letterboxés » en paysage et peints avec le fond de la page, et env(safe-area-inset-*) vaut 0. Les gouttières de 20 px ne peuvent donc pas passer sous l'encoche. C'est justement viewport-fit=cover qui créerait le besoin de gérer env() pour le header, les gouttières, le footer et le widget : effort M sans gain visible. theme-color est hors de cet angle et dépend du choix de palette (roadmap : fond beige). Ce qu'il faut garder est déjà couvert par le livrable extra : le widget utilise `right:max(16px, env(safe-area-inset-right, 0px)); bottom:max(16px, env(safe-area-inset-bottom, 0px))`. Ce réglage ne coûte rien aujourd'hui et reste correct si cover est activé un jour.

**Garde-fous de cet angle (à ne pas faire)**

- Pas de menu plein écran animé lien par lien ni de burger morphing : garder le dropdown <details> avec un voile léger (RT-01).
- Pas d'information accessible uniquement au survol (KPIs, tooltips, aperçus de projets) : la moitié des visiteurs est tactile.
- Pas de scroll-jacking, de scroll-snap obligatoire ni de bibliothèque de défilement lissé (Lenis, etc.) : ils cassent les ancres, le défilement passif et la sensation native.
- Pas de curseur personnalisé, de boutons « magnétiques », de parallaxe ou de tilt 3D sur les cartes : effets gadgets qui « font IA » et ne marchent pas au toucher.
- Pas de bouton flottant « retour en haut » : il entrerait en collision avec le widget vidéo en bas à droite.
- Ne pas réduire les cibles sous 44 px ni la police de la nav sous 13 px pour caser plus de liens entre 721 et 980 px.
- Ne pas masquer Contact, la barre de progression ni les KPIs pour gagner de la place, même en paysage : compacter plutôt que supprimer.
- Pas de hero en 100vh : la barre d'adresse iOS fait sauter la mise en page. Si une hauteur est nécessaire, utiliser svh.
- Pas de verrouillage du défilement par body{position:fixed} avec restauration JS : perte de position et sauts. html:has(.mobile-menu[open]){overflow:hidden} suffit.
- Pas de vidéo en lecture automatique avec le son ni de modale bloquante à l'arrivée. Pas de navigator.vibrate() ni de son au clic.
- Pas d'animation de hauteur pilotée en JS pour les accordéons : CSS progressif uniquement, désactivé en prefers-reduced-motion.

<details><summary>Livrable détaillé de l'auditeur et corrections du relecteur</summary>

## Récapitulatif par format (mesures Playwright)

| Format | Header (bas / % hauteur) | Visible au premier écran | Problèmes constatés |
|---|---|---|---|
| 320x640 (tactile) | 66 px / 10 % | h1, CTA (386-434), KPIs coupés (494-853) | 47 textes ≤ 12 px ; CTA de contact 141 px empilés et centrés ; ancres à +68 px |
| 360x740 | 66 / 9 % | CTA, KPIs coupés de 56 px (494-796) | idem 320 ; clic traversant hors du menu |
| 375x667 | 66 / 10 % | CTA, 1ʳᵉ rangée de KPIs seulement | idem |
| 390x844 | 66 / 8 % | CTA et KPIs complets (498-800), photo dès 824 | clic traversant (tap y=728 : menu fermé ET details ouvert) ; focus caché derrière le menu ; hover collant ; « Retour en haut » sous la zone du widget en fin de page |
| 414x896 / 430x932 | 66 / 7 % | CTA et KPIs complets | idem 390 (collision widget à 430) |
| 667x375 paysage | 66 / 18 % | nom et h1 seulement (CTA 428-476) | menu 273 px pour 405 de contenu (défilement interne) ; tout en 1 colonne (document de 7848 px) ; widget sur « Retour en haut » |
| 844x390 paysage | 94 / 24 % | nom et h1 (padding 154, CTA 472-520) | menu 99→389 avec défilement interne ; ancres : eyebrow à y=184 sur 390 |
| 768x1024 | 94 / 9 % | hero 2 colonnes et KPIs (592-756) | burger alors que 3 liens tiennent ; menu de 720 px de large ; cartes projets 502/527 désalignées ; puces de compétences (7/12) ; trou de 282 px à l'ouverture ; collision widget |
| 820x1180 | 94 / 8 % | idem | Recommandations → Contact actif ; puces (4/12) |
| 1024x768 (tactile) | 94 / 12 % | KPIs coupés de 18 px (634-786) | survols non protégés sur tablette avec nav desktop ; liens de nav à 3 px d'écart (tolérable, 44 px de haut) |
| 1024x1366 | 94 / 7 % | KPIs complets | Recommandations → Contact actif |
| 1180x820 | 94 / 11 % | KPIs coupés de 32 px | ancres à +90 px |
| 1280x720 / 1366x768 | 94 / 13 % / 12 % | KPIs entièrement hors écran (736-868) | RT-05 |
| 1280x800 | 94 / 12 % | KPIs coupés de 68 px | RT-05 |
| 1440x900 / 1536x864 | 94 / 10 % | KPIs visibles ou presque (868 pour 864) | trou de 183 px à l'ouverture d'un projet ; ancres à +90 px |
| 1920x1080 | 94 / 9 % | tout le hero | Contact arrive à +344 px (fin de document, normal) |

Aucun débordement horizontal et aucune cible < 44 px à aucun format.

## Points de rupture recommandés

- **Base < 560 px** (téléphones portrait) : 1 colonne, ordre intro, KPIs puis photo, KPIs en 2x2, header compact de 56 px. Seuil ≤ 380 px conservé pour h1 50 px et e-mail 18 px.
- **≥ 560 px** (nouveau) : certifications, formation et recommandations en 2 colonnes, KPIs en 4 colonnes. Couvre le paysage téléphone, les foldables et les petites tablettes (RT-14).
- **≥ 721 px** (inchangé) : hero 2 colonnes, projets 2 colonnes avec subgrid (RT-09). Header : 3 liens primaires en ligne, Contact et un burger « Plus » pour les 3 secondaires (RT-08).
- **≥ 981 px** (inchangé) : nav complète. Mesure : 96 px libres à 981 px ; la nav complète demande 848 px, elle ne descend donc pas plus bas sans risque.
- **≥ 1121 px** : réglages actuels.
- **Requêtes de hauteur** (manquantes aujourd'hui) :
  - `(orientation: landscape) and (max-height: 500px)` : header de 56 px à top 6, hero padding 84, h1 44 px, KPIs en 4 colonnes, menu sur 2 colonnes sans défilement interne (RT-06).
  - `(min-width: 981px) and (max-height: 900px)` : hero compact pour que les KPIs soient visibles sur 1366x768 et 1280x720 (RT-05).
- Exposer `--header-offset` et `--section-pad` en variables CSS à chaque palier, pour que scroll-padding et scroll-margin suivent (RT-04).

## Zone de pouce et widget vidéo (bas droite)

**Position**
- `position: fixed; right: max(16px, env(safe-area-inset-right)); bottom: max(16px, env(safe-area-inset-bottom));` avec la meta viewport-fit=cover (RT-12).
- Ne jamais utiliser `bottom: 0` ni de calculs en 100vh.
- Le bas droit est dans la zone naturelle du pouce droit ; on y place une seule action.

**Taille**
- Pastille de 48 px de haut (miniature ronde de 36 px et libellé court « Ma vidéo · 1 min », 160 px max).
- Sous 380 px de large ou en paysage court : icône seule de 52x52 px.
- Toute cible doit faire au moins 44 px.

**Superpositions (z-index)**
- z-index 90 : sous le header (100) et sous le voile du menu (99).
- Masqué quand le menu est ouvert : `html:has(.mobile-menu[open]) .video-widget { visibility: hidden; }`.

**Collisions mesurées**
- En fin de page, « Retour en haut » est exactement sous la zone à 390, 430, 667 et 768 px (ex. 390 : lien 270-370 × 766-810, zone 318-374 × 772-828). Il faut donc :
  - ajouter au footer `padding-bottom: calc(34px + 72px + env(safe-area-inset-bottom))` quand le widget est visible ;
  - aligner « Retour en haut » à gauche sur mobile.
- Le bouton LinkedIn et « Voir les missions » ne passent dessous que pendant le défilement, ce qui est acceptable.
- Pas de bouton « haut de page » flottant.

**iOS et barre d'adresse dynamique**
- La barre d'outils et l'onglet compact de Safari se replient et se déploient : le widget se déplace avec le viewport visuel.
- Pas d'animation liée au défilement. À vérifier sur un iPhone réel (portrait, paysage, indicateur d'accueil de 34 px).
- Sur Android, la barre de gestes est couverte par env(safe-area-inset-bottom) avec viewport-fit=cover.

**Invitation initiale (non invasive)**
- Pas de modale bloquante. Une carte compacte ancrée au même endroit que le widget (bas droite, 320 px de large sur desktop et tablette ; pleine largeur moins 2x16 px et 112 px de haut max sur mobile) avec « Regarder (1 min) » et « Plus tard » (≥ 44 px chacun).
- À 390x844, une telle carte (haut à environ 716 px) ne recouvre pas le CTA « Voir les projets » (390-438) mais masque temporairement la 2ᵉ rangée de KPIs (652-800). Il faut donc la faire apparaître après le premier défilement ou après 1,5 s, jamais pendant l'animation d'entrée.
- « Plus tard » réduit la carte en pastille au même endroit (continuité spatiale) et le choix est mémorisé (localStorage dans un try/catch).
- En paysage court, ne montrer que la pastille.

**Accessibilité**
- Placer le widget après le footer dans le DOM.
- `aria-label="Revoir la vidéo de présentation de Fiona"`.
- La vidéo s'ouvre dans un `<dialog>` avec retour du focus à la fermeture.
- Pas de lecture automatique avec le son.
- Apparition en fondu de 200 ms, sans animation en prefers-reduced-motion.
- Fonctionne en statique (vidéo dans public/ via import.meta.env.BASE_URL, ou lien externe). La vidéo provisoire doit être clairement marquée comme un exemple à remplacer.

## Méthode et preuves
Scripts et captures : `(fichier de travail de l'audit, hors dépôt) responsive-tactile/`
- Scripts : measure.mjs, test2.mjs, test3.mjs, test4.mjs.
- Mesures brutes : measures.json, test2.json.
- Captures : *-fold.png, menu-open-*.png, d1440-details-open.png, t768-competences.png, fold-1366x768.png, proposal-1366x768.png, proposal-menu-*.png.

**Corrections du relecteur sur ce livrable :**

Erreurs factuelles à corriger dans le livrable :
1) Références du hook fausses dans les points forts et dans RT-03/RT-04 : use-portfolio-navigation.ts fait 75 lignes. Le seuil est à :33, la règle de fin de document à :41-44, rAF et écouteurs passifs à :52-61 (et non 155, 163-166 ou 174-182).
2) Hauteurs de flottaison : le tableau prend la taille d'écran comme viewport. Dans un vrai navigateur, 1366x768 donne environ 1366x657, 1440x900 environ 1440x790, 1536x864 environ 1536x730 et 1920x1080 environ 1920x960. La ligne « 1440x900 / 1536x864 : KPIs visibles ou presque » est donc fausse en conditions réelles. À 1440x790 et 1536x730, la bande des KPIs (736-868) est coupée de 78 à 138 px. Mesures v2.mjs avec la règle de RT-05 : bas des KPIs à 713 et 678, donc visibles. À l'inverse, « entièrement hors écran » à 1366x768 est légèrement exagéré : les 32 px du haut de la bande sont visibles.
3) Ligne 390x844, « tap y=728 : menu fermé ET details ouvert » : à scroll 0, ce point tombe sur .impact-stat, qui n'est pas interactif. Reproduction correcte : summary placé à y 650-698, tap à y=674 (v2.mjs).
4) Ligne 768x1024, « trou de 282 px » : 282 px est l'agrandissement de la carte (502→784). Le trou face à la voisine fait 257 px (784-527), chiffre de RT-09. Il faut harmoniser.
5) Section points de rupture : retirer « KPIs en 4 colonnes » au palier 560 px (cellules d'environ 121 px, libellés sur 3 ou 4 lignes ; voir RT-14), « Header : 3 liens primaires + burger Plus » au palier 721 px (voir RT-08, nav à deux niveaux non retenue) et le contenu paysage « h1 44, KPIs 4 colonnes, menu sur 2 colonnes » (voir RT-06, seul le header compact est retenu). Préciser que « header compact de 56 px » désigne la hauteur minimale de .header-inner : le bas du header est à 66 px. La requête paysage doit aussi poser --header-offset:66px.

Widget vidéo, corrections :
6) Ne pas dépendre de viewport-fit=cover (RT-12 écarté). Écrire `right:max(16px, env(safe-area-inset-right, 0px)); bottom:max(16px, env(safe-area-inset-bottom, 0px))`, correct avec ou sans cover. Supprimer « le widget se déplace avec le viewport visuel » : position:fixed suit le viewport de mise en page, pas le viewport visuel au zoom. Aucun repositionnement en JS (visualViewport) ne doit être ajouté.
7) Tailles incohérentes : pastille de 48 px, mais icône seule de 52x52. Unifier à 48 px de haut, soit 48x48 en icône seule et largeur maximale de 200 px avec libellé. La règle du footer (RT-13) devient alors 34 + 64 px.
8) Ne pas inventer de durée : « Ma vidéo · 1 min » et « Regarder (1 min) » affirment une durée inconnue. Mettre tous les libellés dans src/data/portfolio.ts (par exemple video: { src, poster, captions, title, durationLabel?, placeholder: true }) et n'afficher la durée que si elle est renseignée. Le libellé visible de la vidéo provisoire doit dire qu'il s'agit d'un exemple, sans la présenter comme Fiona. Le fichier va dans public/ et le chemin est construit avec import.meta.env.BASE_URL.
9) Nom accessible : aria-label="Revoir la vidéo de présentation de Fiona" sur une pastille qui affiche « Ma vidéo » enfreint WCAG 2.5.3 (le nom doit contenir le texte visible). Utiliser le texte visible comme nom, ou un aria-label qui commence par ce texte.
10) Invitation sur mobile : une carte de 112 px de haut couvre à 390x844 la zone 716-828, soit les libellés de la 2ᵉ rangée de KPIs (652-800), que la contrainte veut justement avant la photo. La limiter à une seule rangée de 64 px maximum : miniature de 40 px, bouton « Regarder » et « Plus tard » de 44 px. L'afficher à la fin de l'animation d'entrée du hero (immédiatement en reduced-motion), et non « après le premier défilement », qui contredit « quand on arrive ». La réduire automatiquement en pastille quand le visiteur fait défiler au-delà du hero sans répondre.
11) Invitation sur desktop : à 1366x657, avec RT-05, les KPIs occupent 540-665 px. Une carte de 320x112 en bas à droite (x ≈ 1030-1350, y ≈ 529-641) recouvrirait la 4ᵉ colonne de KPIs (x ≈ 978-1273, calcul géométrique). Ancrer l'invitation initiale au visuel du hero (badge « Regarder » et lien « Plus tard » posés sur le cadre photo, dans la colonne de droite déjà dédiée à Fiona) sur ≥ 721 px, sans superposition. « Plus tard » la transforme en pastille en bas à droite. Le mobile garde la rangée compacte du point 10.
12) Manques côté lecture : `playsinline` (sinon l'iPhone force le plein écran), `preload="none"` et `poster` (rien n'est téléchargé à l'arrivée), sous-titres `<track kind="captions" srclang="fr">` (fichier à fournir par Fiona ; beaucoup regardent sans le son). Un ratio de vidéo inconnu (une vidéo de présentation filmée au téléphone est souvent en 9:16) impose un <dialog> qui gère les deux formats : `max-height:85svh; max-width:min(960px, 100% - 32px)`, vidéo en object-fit:contain. Ajouter un verrou `html:has(dialog[open]){overflow:hidden}`, la pause à la fermeture, Échap et tap sur le fond pour fermer, et le retour du focus au déclencheur. Masquer la pastille pendant que le dialog est ouvert.
13) Alternative sobre à signaler : sur mobile, le premier écran affiche deux boutons « Contact », dans le header et en action secondaire du hero (capture mobile-390-fold.png). L'action secondaire du hero pourrait devenir « Voir ma présentation », ce qui donne un point d'entrée permanent à la vidéo sans superposition. Le Contact du header, qui doit rester visible, conserve l'accès au contact.

Le reste du livrable est juste et proportionné : z-index 90 sous le header et le voile, masquage pendant l'ouverture du menu, widget placé après le footer dans le DOM, localStorage dans un try/catch, pas de lecture automatique avec le son, pas de bouton flottant « haut de page ».

</details>

## Interactions & mouvement

_Le mouvement actuel est sobre et techniquement sain : entrée du hero en CSS pur, révélations WAAPI qui laissent le contenu visible sans JavaScript, barre de progression en transform throttlée par frame, défilement natif et respect de prefers-reduced-motion. En revanche, l’interaction est presque muette : aucun état :active dans tout src/styles.css, le surlignage tactile est supprimé, et 5 éléments cliquables n’ont même pas d’état de survol. Sur mobile, un tap ne donne donc aucun retour immédiat, ce qui contredit directement « chaque clic doit être satisfaisant ». À l’inverse, les survols existants ne sont pas réservés aux souris : le soulèvement de 2 px et les fonds restent collés après un tap sur iOS/Android. Plusieurs sauts secs ont été mesurés : « Voir les missions » ajoute 163 px en une frame et décale la rangée suivante d’autant ; le menu mobile apparaît sans transition, sans voile, et un tap à l’extérieur traverse jusqu’au contenu ; le lien actif passe en gras et décale toute la nav de 6 px ; pendant un défilement programmé, l’indicateur traverse toutes les sections intermédiaires. Au rechargement en milieu de page ou via un lien profond, 8 blocs déjà visibles disparaissent puis refont un fondu (clignotement), et l’adresse e-mail saute de 28 px à l’hydratation. La recommandation : un système minimal (3 durées, 2 courbes, pression scale 0,97, survols conditionnés à hover:hover), qui corrige ces sauts sans rien ajouter de spectaculaire. Le futur widget vidéo doit s’y intégrer depuis le coin bas droit._

### MO-01 · Aucun état pressé (:active) et surlignage tactile supprimé : zéro retour immédiat au toucher

🟠 important · mobile, tablette, desktop · effort S · Corrigé

- **Preuve** : grep « :active » dans src/styles.css : 0 occurrence. styles.css:82-86 force -webkit-tap-highlight-color: transparent sur a, button et summary. Test Playwright (t1-inventory.mjs) : mouse.down maintenu 250 ms sur 15 éléments (logo, nav, Contact du header, 4 CTA, summary, copier, liens de recommandation, e-mail, Retour en haut…), aucune propriété calculée ne change entre survol et pression (diff {} pour les 15).
- **Problème** : Sur mobile et tablette, rien ne bouge au moment du tap : ni flash natif (supprimé), ni état pressé. Le seul retour arrive après coup (défilement, ouverture). Les taps paraissent « morts », surtout sur « Voir les missions », le burger, copier et les liens mailto, qui n’entraînent aucun défilement visible. C’est exactement le contraire de « chaque clic satisfaisant ».
- **Recommandation** : État pressé instantané, avec retour au repos en --motion-fast. Utiliser la propriété individuelle « scale » (et non transform) pour la composer avec les transforms existants. (1) Formes pleines : « .action:active, .header-contact:active { scale: var(--press-scale); transition-duration: 0s; } » avec --press-scale: 0.97. Ajouter « scale var(--motion-fast) var(--ease-out) » à leur liste de transition pour le relâchement. (2) Boutons icône de 44 px : « .copy-button:active, .mobile-menu > summary:active { scale: var(--press-scale-icon); background: oklch(1 0 0 / 16%) (copier) ou var(--secondary) (burger); transition-duration: 0s; } » avec --press-scale-icon: 0.92. (3) Rangées du menu mobile : « .mobile-nav .nav-link:active { background: var(--secondary); transition-duration: 0s; } ». Nav desktop : un cran plus sombre que le survol, « .desktop-nav .nav-link:active { background: color-mix(in oklch, var(--secondary), var(--foreground) 8%); transition-duration: 0s; } ». (4) « Voir les missions » : pas de fond. Utiliser « .project-details > summary:active { opacity: .7; transition-duration: 0s } » et « .project-details > summary:active > svg { scale: .9 } » ; scale se compose avec rotate(45deg). (5) Liens texte : « .recommendation-link:active, .contact-email:active, .footer-inner a:active, .header-brand:active { opacity: .7; transition-duration: 0s; } ». Garder -webkit-tap-highlight-color: transparent. N'ajouter AUCUN écouteur touchstart, React s'en charge. Avant l'hydratation, iOS peut ne pas afficher :active, ce qui est acceptable. Sous prefers-reduced-motion : « :root { --press-scale: 1; --press-scale-icon: 1 } », en gardant fond et opacité. Fichier : src/styles.css uniquement.

### MO-02 · Survols non conditionnés au pointeur fin : soulèvement et fonds « collants » après un tap

🟠 important · mobile, tablette · effort S · Vérifié

- **Preuve** : Aucune media query (hover: hover) ni (pointer: fine) dans src/styles.css (grep : 0). Survols nus : .nav-link:hover (194-197), .action:hover translateY(-2px) (318-320), .action-primary:hover (326-329), .action-secondary:hover (335-337), .tool-pill:hover (840-843), .copy-button:hover (1086-1088), .contact-actions .action-secondary:hover (1111-1113), .footer-inner a:hover (1135-1137). En émulation mobile 390 (isMobile/hasTouch), matchMedia('(hover: hover)') = false et '(pointer: coarse)' = true : la garde serait donc efficace. Sur Safari iOS et Chrome Android, :hover est appliqué au tap et persiste jusqu’au tap suivant (comportement de plateforme, que Playwright ne reproduit pas).
- **Problème** : Après un tap sur « Contact » ou « Voir les projets » (hero), puis un retour en haut, le bouton reste soulevé de 2 px, avec le fond violet ou blanc et l’ombre du survol. L’iPad en paysage (1024 px, nav desktop) cumule les deux défauts. L’état visuel ment sur l’état réel.
- **Recommandation** : Envelopper toutes les règles :hover dans `@media (hover: hover) and (pointer: fine) { … }` (un seul bloc en fin de fichier, ou un bloc par composant). Le tactile ne reçoit alors que :active (MO-01) et :focus-visible. Aucune règle :hover ne doit porter un transform utile à la compréhension.

### MO-05 · Menu mobile : apparition sèche, pas de voile, page qui défile dessous, tap extérieur qui traverse

🟠 important · mobile, tablette · effort M · Corrigé

- **Preuve** : t4 (390×844, tactile) : 30 ms après le tap sur le burger, .mobile-nav a animation-name none, transition « all 0s », opacity 1 ; les icônes Menu/X basculent par display (styles.css:1238-1244). Molette de 400 px pendant que le menu est ouvert : scrollY 0 → 400, le menu reste ouvert (le corps n’est pas bloqué, body overflow visible). Tablette 768 : menu ouvert, tap sur le « Voir les missions » visible sous le menu (y = 824, bas du menu à 506) : le menu se ferme ET la carte s’ouvre (detailsOpen: true), donc un seul tap produit deux effets. Le burger n’a ni fond ni état pressé (summaryBg transparent). Capture : menu-mobile-open.png.
- **Problème** : Le panneau surgit, puis disparaît sans transition, et le passage entre le burger et la croix est instantané. Sans voile, le menu ne paraît pas « au-dessus » de la page. Le défilement dessous et le tap traversant donnent une impression de fragilité.
- **Recommandation** : Tout dans « @media (max-width: 980px) ». (1) Entrée seulement : « .mobile-menu[open] .mobile-nav { animation: menu-in var(--motion-base) var(--ease-out) both; transform-origin: top right; } @keyframes menu-in { from { opacity: 0; transform: translateY(-6px) scale(.98); } } ». (2) Voile qui empêche le tap traversant : « html:has(.mobile-menu[open]) body::after { content: ''; position: fixed; inset: 0; z-index: 99; background: oklch(0.255 0.029 285 / 16%); animation: fade-in var(--motion-base) var(--ease-out) both; } @keyframes fade-in { from { opacity: 0 } } ». Teinte à recalibrer sur la palette ; aucun backdrop-filter. L'écouteur pointerdown existant (site-header.tsx:38-40) ferme déjà le menu, aucun JS à ajouter. (3) « html:has(.mobile-menu[open]) { overflow: hidden; } html { scrollbar-gutter: stable; } .mobile-nav { overscroll-behavior: contain; } ». (4) Facultatif, sortie : « @supports selector(::details-content) { .mobile-menu::details-content { opacity: 0; transition: opacity 120ms var(--ease-in), content-visibility 120ms allow-discrete; } .mobile-menu[open]::details-content { opacity: 1; } } ». Fermeture instantanée ailleurs, ce qui est acceptable. (5) Icônes Menu/X empilées (grid-area: 1 / 1), fondu croisé d'opacité seulement, 120 ms, sans scale ni rotation. (6) Pression du burger : voir MO-01. Reduced-motion : le reset global couvre .mobile-nav et body::after ; ajouter une règle séparée pour .mobile-menu::details-content dans le @supports.

### MO-06 · Lien actif en gras (650) : la nav desktop se décale de 6 px à chaque changement de section

🟠 important · desktop · effort S · Corrigé

- **Preuve** : styles.css:198-202 (.nav-link.is-active { font-weight: 650 }). t2-scroll-nav.mjs, 1440 : « Recommandations » mesure 134,5 px inactif et 140,7 px actif (+6,2 px). Comme la nav est poussée à droite (margin-left:auto, styles.css:174), tous les liens se décalent vers la gauche : « Projets » passe de x = 602,2 à x = 596,1 (-6,1 px). Le phénomène se répète à chaque section, avec un écart différent selon la longueur du libellé.
- **Problème** : Pendant la lecture, la barre de navigation tressaute horizontalement à chaque changement de section : c’est le mouvement non désiré le plus visible du site sur desktop, et il se combine au point MO-07.
- **Recommandation** : Supprimer « font-weight: 650 » de .nav-link.is-active (styles.css:201). L'état actif reste porté par color: var(--primary) et background: var(--secondary), déjà en transition (passer celle-ci à --motion-base / --ease-out). Ne pas proposer de technique de réservation de largeur. Dans le menu mobile (rangées verticales), aucun décalage horizontal n'est en jeu, mais garder la même règle par cohérence.

### MO-09 · Rechargement ou lien profond : les blocs déjà visibles clignotent (1 → 0 → 1)

🟠 important · tous · effort S · Vérifié

- **Preuve** : t6-reload.mjs : rechargement à scrollY = 2600 (1440×900). À 22 ms, les 10 blocs [data-reveal] visibles sont à opacity 1 (HTML pré-rendu) ; à 114 ms, 8 d’entre eux tombent à 0 (hydratation, l’IntersectionObserver lance l’animation WAAPI depuis opacity 0), puis reviennent en fondu jusqu’à environ 510 ms. t5 sur /#projets : le titre de section et la 1re carte passent de 1 à 0 vers 435-504 ms, puis refont un fondu jusqu’à 943 ms. Cause : use-reveal.ts:39-77 anime tout élément qui intersecte, y compris ceux déjà peints à l’écran.
- **Problème** : Le contenu affiché disparaît puis réapparaît : un flash très perceptible, en particulier quand un recruteur revient sur l’onglet ou partage un lien vers #projets. La sobriété des révélations perd sa crédibilité.
- **Recommandation** : Dans use-reveal.ts, avant d’observer : `const vh = window.innerHeight; for (const el of elements) { if (el.getBoundingClientRect().top < vh) pending.delete(el); }`. Ainsi, seuls les éléments situés sous la ligne de flottaison au montage sont animés. Garder le reste (une seule fois, 10 px, 400 ms à remplacer par --motion-slow).

### MO-19 · Vidéo de présentation : invitation et widget à concevoir dans le système de mouvement

🟠 important · tous · effort L · Corrigé

- **Preuve** : Fonction absente : aucun élément <video>, <dialog> ou widget dans src/ (grep). Demande verbatim : « ça doit pas être invasif… si on met “plus tard”, on devrait mettre un widget en bas à droite ». Contraintes : statique (vidéo dans public/, chemin via import.meta.env.BASE_URL), reduced-motion, cibles ≥ 44 px, ne pas masquer « Contact » ni la barre de progression.
- **Problème** : Sans règles de mouvement définies, ce composant risque d’être le plus « IA » de la page : pop-up centrée, pastille qui pulse en boucle, rebond. Il risque aussi de recouvrir des contenus en bas à droite (bouton copier, « Retour en haut » sur mobile).
- **Recommandation** : Composant src/components/portfolio/intro-video.tsx, textes dans src/data/portfolio.ts (introVideo: { title, inviteLabel, laterLabel, watchLabel, src: 'video/presentation.mp4', poster, captions?, durationLabel? }). Durée et sous-titres à fournir par Fiona ; tant que la vidéo est provisoire, n'afficher aucune durée. (1) Point d'entrée permanent : un bouton discret « Vidéo de présentation » avec une icône Play, dans .hero-meta ou les actions du hero, qui ouvre le même lecteur. Il fonctionne même si le stockage est bloqué ou si le widget a été masqué. (2) Invitation : un <aside aria-labelledby> non modal, sans prise de focus, rendu après le footer dans le DOM. Elle apparaît une seule fois, environ 2 s après le chargement, à la première visite. Mobile (< 720 px) : barre compacte, « width: calc(100vw - 32px) », hauteur ≤ 72 px. Desktop : carte ≤ 340 px avec poster de 64 px. Boutons « Regarder » et « Plus tard » ≥ 44 px. Entrée 360 ms en --ease-out, « transform-origin: 100% 100% », translateY(12px) scale(.96) → none. (3) « Plus tard » : sortie de la carte en 200 ms --ease-in, puis entrée de la pastille de 56 px en 240 ms (scale .6 → 1) au même coin ; mémoriser « intro:later » dans localStorage (try/catch). Aux visites suivantes, afficher directement la pastille, sans invitation. Le × de la pastille la masque pour la session (sessionStorage) ; la vidéo reste accessible par le point d'entrée (1). (4) Position : « position: fixed; right: max(16px, env(safe-area-inset-right)); bottom: max(16px, env(safe-area-inset-bottom)); z-index: 90 ». Masquée quand le menu mobile est ouvert (« html:has(.mobile-menu[open]) .intro-video { opacity: 0; pointer-events: none } ») et à l'impression. « .site-footer { padding-bottom: 88px } » quand la pastille est présente. (5) Lecteur : <dialog> + showModal(). Desktop ≥ 720 px : panneau en bas à droite, « width: min(560px, 100vw - 48px) » ; mobile : feuille du bas. Entrée via @starting-style (Chrome 117+, Safari 17.5+, Firefox 129+ ; ouverture instantanée ailleurs). Sortie animée uniquement dans « @supports (overlay: auto) { dialog { transition: opacity 220ms var(--ease-in), transform 220ms var(--ease-in), overlay 220ms allow-discrete, display 220ms allow-discrete } } » (Chromium) ; fermeture instantanée ailleurs. ::backdrop à 30 % en fondu de 200 ms. Vidéo : preload='none', poster, playsInline, contrôles natifs, src via import.meta.env.BASE_URL. Lecture au clic sur « Regarder » seulement, pause à la fermeture, focus rendu au déclencheur. Vidéo provisoire neutre, sans visage. (6) Reduced motion : fondus d'opacité seulement ; règle séparée pour ::backdrop (voir MO-17). Aucune animation en boucle.

### MO-03 · Survol des CTA : soulèvement de 2 px, bascule noir → violet et ombre colorée (effet « template »)

🟡 amélioration · desktop · effort S · Corrigé

- **Preuve** : styles.css:318-329, mesuré au survol de « Voir les projets » : transform matrix(1,0,0,1,0,-2), fond oklch(0.255 0.029 285) → oklch(0.505 0.2 288), ombre 0 4px 12px → 0 8px 22px oklch(0.505 0.2 288 / 18%). Sur « Écrivez-moi » (contact), le fond reste blanc (surchargé par 1102-1105) : seuls le soulèvement et une ombre violette invisible sur fond sombre changent. Flèche ArrowDown statique (hero.tsx:24) ; ArrowUpRight de LinkedIn statique (contact-section.tsx:80).
- **Problème** : « Bouton qui monte + ombre colorée » est le tic le plus reconnaissable des gabarits et des sites générés. Le changement de teinte du noir au violet est brutal pour un simple survol, et il est incohérent : il n’existe pas sur le CTA du panneau contact. On ajoute du mouvement sans ajouter d’information.
- **Recommandation** : Supprimer « .action:hover { transform: translateY(-2px) } » (318-320), ainsi que la règle reduced-motion 1597-1599. Survol, uniquement sous « @media (hover: hover) and (pointer: fine) », en --motion-base / --ease-out, sans changement d'ombre : primaire, « background: color-mix(in oklch, var(--foreground) 82%, var(--primary)) » ; secondaire, « background: var(--card); border-color: color-mix(in oklch, var(--border) 60%, var(--foreground)) ». CTA blanc du panneau contact : « .contact-actions .action-primary:hover { background: oklch(0.93 0.012 285) } » (à recalibrer sur la future palette). Secondaire du contact : inchangé (oklch(1 0 0 / 13%)). Décalage des icônes directionnelles avec la propriété « translate » (et non transform) : ArrowDown « translate: 0 var(--nudge) », ArrowUpRight « translate: var(--nudge) calc(-1 * var(--nudge)) » ; Mail et LinkedIn restent fixes. Pression : voir MO-01.

### MO-04 · « Voir les missions » s’ouvre d’un coup : +163 px en une frame et rangée suivante poussée d’autant

🟡 amélioration · tous · effort M · Corrigé

- **Preuve** : t4-details-menu-touch.mjs, desktop 1440 : carte 1 de 446 → 609 px dès la première frame après l’événement toggle (aucune interpolation, seule l’icône tourne sur 250 ms). Les cartes 3 et 4 passent de top 757 à 920 px (+163 px) instantanément, et la carte voisine reste à 426 px, d’où 183 px de décalage dans la même rangée (align-items: start, styles.css:502-507). Le Chromium 141 de test gère ::details-content et interpolate-size: allow-keywords. Capture : audit/motion-interactions/details-open-desktop.png.
- **Problème** : Le contenu apparaît et le bas de page saute de 163 px. Dans la grille à 2 colonnes, l’œil perd la carte voisine et la rangée suivante. Le libellé reste « Voir les missions » une fois ouvert (data portfolio.ts:473), seule l’icône ×, petite, indique l’état.
- **Recommandation** : Amélioration progressive en CSS seul : « @supports selector(::details-content) { .project-details { interpolate-size: allow-keywords; } .project-details::details-content { block-size: 0; overflow-y: clip; opacity: 0; transition: block-size var(--motion-slow) var(--ease-out), opacity var(--motion-base) var(--ease-out), content-visibility var(--motion-slow) allow-discrete; } .project-details[open]::details-content { block-size: auto; opacity: 1; } @media (prefers-reduced-motion: reduce) { .project-details::details-content { transition: none; } } } ». Résultat : Chromium 129+/131+ anime la hauteur (ouverture et fermeture) ; Safari 18.4+ et Firefox 143+ font un fondu d'opacité avec une hauteur instantanée ; les autres gardent le comportement actuel. Ne PAS ajouter d'animation sur .project-detail-content, et ne pas animer les cartes voisines. Libellé (facultatif) : ajouter « detailsCloseLabel: 'Masquer les missions' » dans sectionContent.projects (src/data/portfolio.ts, près de la ligne 473). Dans project-card.tsx, retirer l'aria-label du summary et rendre « <span className='label-closed'>{detailsLabel}</span><span className='label-open'>{detailsCloseLabel}</span><span className='sr-only'> : {project.title}</span> ». CSS : « .project-details:not([open]) .label-open, .project-details[open] .label-closed { display: none } ». Le nom accessible suit ainsi le texte visible. État de la carte : voir MO-14.

### MO-08 · L’indicateur disparaît en arrivant sur Contact (desktop)

🟡 amélioration · desktop, tablette · effort S · Vérifié

- **Preuve** : t2, en bas de page à 1440 px : aucun .desktop-nav .nav-link.is-active. .header-contact porte bien aria-current="location" (site-header.tsx:86), mais aucun style ne l’exploite : fond inchangé oklch(0.255 0.029 285). La règle `.header-contact svg { transition: transform 200ms }` (styles.css:216-218) est du code mort : aucun transform n’est jamais appliqué.
- **Problème** : L’indicateur de position s’éteint précisément sur la section de conversion. On perd la continuité du repère.
- **Recommandation** : `.header-contact[aria-current="location"]{ background: var(--primary); }` (bordeaux une fois la palette appliquée), en transition sur background à --motion-base. En ≤980 px (pilule claire) : `.header-contact[aria-current="location"]{ background: var(--primary); color: var(--primary-foreground) }`. Supprimer la transition morte de 216-218, ou lui donner un vrai rôle : Mail ne bouge pas, donc la supprimer.

### MO-10 · Lien profond : la page s’affiche en haut puis défile en animation jusqu’à l’ancre

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : t7-hash.mjs, chargement de /#projets à 1440 : scrollY reste à 0 jusqu’à environ 160 ms, puis s’anime jusqu’à 851 px entre 225 et 660 ms, avec ou sans JavaScript. C’est donc le CSS `html { scroll-behavior: smooth }` (styles.css:66-68) qui s’applique aussi au défilement initial vers le fragment.
- **Problème** : Une animation de défilement que personne n’a demandée, au chargement, combinée au clignotement de MO-09. Sur mobile, le hero entier (environ 1 300 px) défile sous les yeux.
- **Recommandation** : Activer le smooth scroll seulement à la première intention de l'utilisateur, jamais sur une minuterie. CSS : remplacer « html { scroll-behavior: smooth } » (styles.css:66-68) par « @media (prefers-reduced-motion: no-preference) { html.smooth-scroll { scroll-behavior: smooth; } } », en gardant scroll-padding-top dans la règle html. Dans Portfolio (portfolio.tsx), un useEffect : « const enable = () => document.documentElement.classList.add('smooth-scroll'); window.addEventListener('pointerdown', enable, { once: true, capture: true }); window.addEventListener('keydown', enable, { once: true, capture: true }); ». pointerdown et keydown précèdent le click sur un lien, donc le premier clic de navigation est déjà fluide. Le défilement vers le fragment au chargement et celui de TanStack restent instantanés. Ajouter aussi « scrollRestorationBehavior: 'instant' » dans createRouter (src/router.tsx) pour la restauration au retour arrière. Sans JS : ancres instantanées, ce qui est acceptable. Vérifier ensuite au chargement de /#projets que scrollY atteint 851 px en une seule frame.

### MO-12 · Éléments cliquables sans aucun état de survol (logo, Contact du header, summary, liens texte)

🟡 amélioration · desktop · effort S · Corrigé

- **Preuve** : t1-inventory.mjs, diff des styles calculés au survol = {} pour .header-brand, .header-contact, .project-details > summary, .recommendation-link et .contact-email. Leur transition calculée est « all 0s ». « Retour en haut » ne change que de couleur, sans transition (styles.css:1135-1137).
- **Problème** : À la souris, on ne sait pas que le logo, le gros bouton Contact noir ou l’adresse e-mail réagissent : le survol, premier signe d’affordance, manque justement sur des éléments de conversion. L’ensemble paraît inégal, puisque d’autres éléments réagissent.
- **Recommandation** : Sous « @media (hover: hover) and (pointer: fine) », tout en --motion-base / --ease-out : logo, « .header-brand:hover .logo-mark { background: var(--primary) } » ; Contact du header, « background: color-mix(in oklch, var(--foreground) 82%, var(--primary)) » (≤ 980 px : « background: color-mix(in oklch, var(--secondary), var(--primary) 12%) ») ; summary, « .project-details > summary:hover { color: var(--primary) } », sans cercle ajouté ; liens texte (.recommendation-link, .footer-inner a), « text-decoration-line: underline; text-decoration-color: transparent; text-underline-offset: 4px; transition: text-decoration-color var(--motion-base) » au repos, puis « text-decoration-color: currentColor » au survol ; e-mail, « border-bottom-color » de oklch(1 0 0 / 30%) à oklch(1 0 0 / 80%) ; « Retour en haut », couleur var(--primary) avec transition et ArrowUp « translate: 0 calc(-1 * var(--nudge)) ».

### MO-13 · Fausse affordance : les pilules d’outils, non cliquables, réagissent au survol

🟡 amélioration · desktop · effort S · Vérifié

- **Preuve** : styles.css:830-843 : .tool-pill (un <span>, sections.tsx:108) change de fond et de bordure au survol (mesuré : fond oklch(1 0 0/.78) → oklch(0.944 0.02 285)). Les .interest-pill, visuellement identiques (699-708), ne réagissent pas.
- **Problème** : Un survol invite au clic, et le clic ne fait rien : c’est une petite déception, à l’opposé de « chaque clic satisfaisant ». Le traitement des deux familles de pilules est en plus incohérent.
- **Recommandation** : Supprimer .tool-pill:hover et sa transition (836-843). Règle du système : seuls les éléments interactifs réagissent au survol. Ne pas ajouter de survol aux cartes (projets, compétences, certifications), qui ne sont pas cliquables.

### MO-14 · Après un clic souris sur « Voir les missions », la carte reste « sélectionnée »

🟡 amélioration · desktop · effort S · Vérifié

- **Preuve** : styles.css:519-522 (.project-card:focus-within → bordure oklch(0.78 0.06 285) + ombre). t3-focus.mjs : après un clic souris sur le summary de la carte 2, :focus-within = true, bordure et ombre appliquées, alors que le summary n’est pas en :focus-visible. L’état reste tant qu’on ne clique pas ailleurs, y compris après avoir refermé la carte.
- **Problème** : Un état de focus clavier s’affiche à la souris et persiste : une carte refermée garde un contour actif sans raison, ce qui brouille l’état ouvert/fermé.
- **Recommandation** : Remplacer :focus-within par deux états distincts : `.project-card:has(summary:focus-visible){ border-color: … }` pour le clavier, et `.project-card:has(details[open]){ border-color: color-mix(in oklch, var(--border) 50%, var(--project-ink)); }` pour l’ouverture, en transition sur --motion-base. Pas d’ombre portée animée.

### MO-15 · Copier l’e-mail : retour minimal, et l’état d’erreur ne se réinitialise jamais

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : t4 (mobile) : 60 ms après le tap, l’icône Copy est remplacée par Check sans transition, le bouton garde le même fond (oklch(1 0 0 / 8%)) et la même couleur, le texte « Adresse email copiée » (12 px) apparaît sans transition (transition 0s) 7 px sous la ligne, puis disparaît d’un coup après 2,5 s (vérifié vide à 2,76 s). contact-section.tsx:13-18 : le minuteur ne réinitialise que l’état « copied », un état « error » reste affiché indéfiniment. Capture : copy-feedback-mobile.png.
- **Problème** : L’action la plus « gratifiante » de la page (copier l’adresse pour écrire) donne un retour à peine perceptible : une icône de 15 px qui change et un petit texte. Sur mobile, le doigt cache justement l’icône.
- **Recommandation** : (1) Pression : voir MO-01 (scale .92). (2) Succès, pendant les 2,5 s de « copied » : « .copy-button[data-copied] { background: oklch(0.8 0.09 288 / 22%); border-color: oklch(1 0 0 / 35%) } » (à recalibrer sur la palette), transition en --motion-base. Icônes Copy et Check empilées en fondu croisé, la Check entrant en scale .6 → 1 et opacity 0 → 1 en --motion-base / --ease-out. (3) Statut : apparition seulement, « .contact-status:not(:empty) { animation: status-in var(--motion-base) var(--ease-out) } » avec translateY(4px) → 0. Disparition instantanée ; min-height de 22 px conservée. (4) Erreur : NE PAS l'effacer automatiquement ; dans le catch, sélectionner le texte de l'adresse (« window.getSelection()?.selectAllChildren(emailLinkRef.current) ») pour faciliter la copie manuelle. Pas de toast, pas de confettis.

### MO-17 · Bloc prefers-reduced-motion trop brutal par endroits, et lacunaire pour les futurs pseudo-éléments

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : styles.css:1583-1600 : `*, *::before, *::after { animation: none !important; transition: none !important }`. Cela coupe aussi les fondus de couleur et d’opacité, qui ne sont pas du mouvement. Ce sélecteur ne couvre ni ::details-content (MO-04), ni ::backdrop (dialog du futur lecteur vidéo), ni body::after (voile du menu, MO-05). .action:hover { transform:none } (1597-1599) deviendra inutile avec MO-03.
- **Problème** : Un utilisateur qui réduit les animations perd aussi les retours d’état doux (couleurs instantanées, sauts d’opacité). Les nouvelles animations proposées échapperaient en outre à la règle globale.
- **Recommandation** : Garder le reset global tel quel (styles.css:1583-1600). Ajouter, chacune dans sa propre règle : « @supports selector(::details-content) { @media (prefers-reduced-motion: reduce) { .project-details::details-content, .mobile-menu::details-content { transition: none !important; } } } » et « @media (prefers-reduced-motion: reduce) { ::backdrop { transition: none !important; animation: none !important; } } ». Ne jamais ajouter ::details-content à la liste « *, *::before, *::after ». Ajouter « :root { --press-scale: 1; --press-scale-icon: 1; --nudge: 0px } » dans le même bloc. Supprimer « .action:hover { transform: none } » quand MO-03 sera fait. Facultatif : pour le dialog vidéo uniquement, autoriser un fondu d'opacité de 150 ms (règle plus spécifique placée après le reset) ; ailleurs, l'instantané suffit.

### MO-V1 · CSS d’animation jamais utilisé chargé en blocage du rendu (tw-animate-css + 46 composants shadcn scannés)

🟡 amélioration · tous · effort S · Ajout

- **Preuve** : src/styles.css:2-3 : « @source "../src" » et « @import "tw-animate-css" » (v1.4.0). Tailwind (v4.3.3) scanne donc src/components/ui, soit 46 fichiers dont aucun n'est importé hors de ce dossier (grep « @/components/ui » : 0 résultat). Le CSS compilé dist/client/assets/styles-Bi1Vs55F.css fait 98 150 octets (20 457 en gzip). Il contient les keyframes accordion-down, accordion-up, caret-blink, enter, exit et pulse, ainsi que 15 utilitaires animate-*, fade-*, zoom-* et slide-in-* que le portfolio n'utilise pas (seul hero-enter sert).
- **Problème** : Une feuille de style qui bloque le rendu, alourdie par des animations de composants absents de la page. Elle contredit l'interdit « pas de librairie d'animation » de l'audit et retarde le premier rendu sur mobile en 4G, alors que tout le mouvement utile est en CSS maison et en WAAPI.
- **Recommandation** : Dans src/styles.css, ajouter « @source not "./components/ui"; » sous « @source "../src"; » (syntaxe Tailwind 4.1+, compatible avec la 4.3.3 installée) et supprimer « @import "tw-animate-css"; ». Vérifier ensuite par grep qu'aucune classe animate-* n'est utilisée hors de src/components/ui. Recompiler et noter le nouveau poids du CSS (avant : 98,2 ko bruts, 20,5 ko gzip). Si un composant ui est réutilisé un jour, le réinclure explicitement avec « @source "./components/ui/<fichier>.tsx" ».

### MO-07 · Pendant un défilement programmé, l’indicateur actif traverse toutes les sections intermédiaires

⚪ bonus · desktop, tablette · effort M · Corrigé

- **Preuve** : t2 : clic sur « Recommandations » depuis le haut, 6 états successifs en 828 ms (Projets à 343 ms, Parcours 469, Compétences 518, Formation 586, Certifications 652, Recommandations 828). « Retour en haut » : 8 états en 574 ms. CTA « Contact » du hero : 8 états en 769 ms. Chaque état provoque en plus le décalage de MO-06.
- **Problème** : Après un clic, l’utilisateur sait déjà où il va, mais la pastille clignote de lien en lien (environ un changement toutes les 60 à 120 ms). Ce n’est ni fluide ni informatif.
- **Recommandation** : Dans usePortfolioNavigation : « const lockRef = useRef<string | null>(null) ». Dans l'effet, un seul écouteur délégué : « document.addEventListener('click', (e) => { const a = (e.target as Element).closest('a[href^="#"]'); if (!a) return; const id = a.getAttribute('href')!.slice(1); if (!ids.includes(id)) return; lockRef.current = id; activeSectionRef.current = id; setActiveSection(id); const release = () => { lockRef.current = null; scheduleUpdate(); }; window.addEventListener('scrollend', release, { once: true }); window.setTimeout(release, 1000); ['wheel', 'touchstart', 'keydown'].forEach((t) => window.addEventListener(t, release, { once: true, passive: true })); }) ». Dans update(), toujours écrire la barre de progression, mais sauter le calcul de section tant que lockRef.current n'est pas null. Retirer les écouteurs au démontage. Pas d'indicateur glissant. À l'occasion, faire toutes les lectures de géométrie avant l'écriture du transform (ancien MO-18, sans gain mesurable).

### MO-11 · Pas de système de mouvement : 6 durées, 3 courbes, valeurs codées en dur

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : Durées : 150 ms (copier, 1083), 180 ms (nav et pilules, 188-190, 836-838), 200 ms (CTA, 313-316 ; icône contact, 217), 250 ms (carte, 515-517 ; icône summary, 652), 400 ms (révélation, use-reveal.ts:72), 550 ms (hero, 1139). Courbes : var(--ease) sur certaines propriétés, `ease` implicite sur les couleurs (nav, box-shadow et background des CTA : « 0.2s ease » d’après getComputedStyle), cubic-bezier recopié en dur dans use-reveal.ts:74.
- **Problème** : Le site paraît « à peu près » cohérent, mais chaque composant a sa propre vitesse, et les futurs ajouts (widget vidéo, menu, details) n’auront aucune référence. C’est aussi ce qui donne, à la longue, une sensation de flottement.
- **Recommandation** : Créer les tokens dans :root et les utiliser pour TOUT nouveau mouvement (MO-01, 03, 04, 05, 12, 15, 19) : --motion-fast: 120ms, --motion-base: 200ms, --motion-slow: 400ms (la valeur actuelle de la révélation, conservée), --ease-out: cubic-bezier(0.2, 0.65, 0.3, 1) (= --ease actuel, à aliaser) et --ease-in: cubic-bezier(0.4, 0, 1, 1) pour les sorties. Remplacer 150, 180 et 250 ms par --motion-base, mais laisser le hero à 550 ms (valeur unique et validée). Dans use-reveal.ts, importer « export const MOTION = { slow: 400, easeOut: 'cubic-bezier(0.2, 0.65, 0.3, 1)' } » depuis src/lib/motion.ts, avec un commentaire qui renvoie à :root. Pas de getComputedStyle.

### MO-16 · L’adresse e-mail saute de 28 px à l’hydratation (bouton copier rendu côté client)

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : contact-section.tsx:7, 10-12 et 45-58 : canCopy vaut false au rendu statique, puis true après useEffect. t5 : position gauche de .contact-email sans JS 119,3 px contre 91,3 px avec JS à 390 ; 604,4 px contre 576,4 px à 1440 : décalage de 28 px, soit (44 + 12) / 2.
- **Problème** : Mouvement parasite, non déclenché par l’utilisateur. Il est visible si la section contact est à l’écran à l’hydratation (rechargement en bas de page, lien #contact, écrans hauts).
- **Recommandation** : Inchangée : « {canCopy ? <button className='copy-button' …/> : <span className='copy-button copy-slot' aria-hidden='true' />} » avec « .copy-slot { visibility: hidden } ». Sans JS, rien n'est visible ni focalisable et l'adresse reste décalée de 28 px de façon statique.

### MO-V2 · Après un clic de navigation, la section d’arrivée termine encore son fondu une fois le défilement fini

⚪ bonus · desktop, tablette · effort S · Ajout

- **Preuve** : verif/v1.out (1440×900), clic sur « Certifications » depuis le haut : le défilement atteint 3 678 px vers 800 ms. L'opacité minimale des 8 blocs [data-reveal] de #certifications vaut 0 à 746 ms, 0,69 à 855 ms, 0,91 à 965 ms et 1 seulement vers 1 180 ms. Origine : la révélation de 400 ms (use-reveal.ts:66-76) se déclenche quand les blocs entrent dans le viewport en fin de défilement, avec des délais de 0 à 90 ms (sections.tsx:150).
- **Problème** : Le lecteur a choisi sa destination, mais le contenu continue de s'estomper environ 380 ms après l'arrivée. Le temps entre le clic et un contenu net atteint environ 1,2 s, sur l'interaction la plus fréquente du site.
- **Recommandation** : Seulement si MO-07 (verrou) est implémenté : pendant un défilement verrouillé, les blocs qui intersectent ne sont pas animés. Dans le callback de l'IntersectionObserver de use-reveal.ts, « if (document.documentElement.dataset.navScrolling) { pending.delete(element); observer?.unobserve(element); continue; } ». Le drapeau data-nav-scrolling est posé par lockTo() et retiré à la libération. Sinon, ne rien faire : le défaut reste mineur.

**Constats écartés par le relecteur**

- ~~MO-18 · Barre de progression : écriture du transform avant les lectures de géométrie à chaque frame~~ — Le coût annoncé n'existe pas. use-portfolio-navigation.ts:26 lit déjà scrollHeight, ce qui force la mise en page avant l'écriture du transform (ligne 30). Un changement de transform n'invalide pas la mise en page : getBoundingClientRect (33, 37) ne force donc qu'un recalcul de style d'un seul élément, que la frame aurait fait de toute façon. Aucun travail n'est dupliqué et aucun gain n'est mesurable. Le réordonnancement est mentionné pour mémoire dans MO-07.

**Garde-fous de cet angle (à ne pas faire)**

- Curseur personnalisé (rond qui suit, curseur « blob ») : il dégrade la précision, n’existe pas sur tactile, coûte un rAF permanent et constitue la signature n°1 des portfolios générés.
- Boutons magnétiques et cartes en tilt 3D : effet gadget, mal reçu par des recruteurs pressés, sans équivalent mobile.
- Parallaxe sur la photo, les anneaux du hero (.visual-orbit) ou les couvertures de projets : coût de rendu à chaque défilement, nausée chez certains utilisateurs, aucune information ajoutée.
- Scroll-jacking ou défilement « inertiel » (Lenis, Locomotive), sections épinglées, défilement horizontal : casse les ancres, le clavier, find-in-page et le défilement natif déjà fluide (750 à 830 ms mesurés).
- Compteurs qui défilent sur les KPI (+30 %, 140, 500+…) : ce sont les faits que les recruteurs viennent lire. Les animer retarde la lecture, affiche de faux chiffres intermédiaires, casse la lecture sans JS et les captures. Les chiffres restent statiques.
- Révélation lettre par lettre ou mot par mot du titre « De l’idée à l’impact. », texte qui se brouille ou se tape au clavier : très « IA » et nuisible à la lisibilité et aux lecteurs d’écran.
- Révélations en cascade sur chaque élément de liste (puces, pilules, entrées de la timeline) : les 31 blocs [data-reveal] actuels suffisent largement ; ne pas en ajouter, ne pas allonger les délais.
- Soulèvement et ombre au survol des cartes non cliquables (projets, compétences, certifications, formations) : fausse affordance.
- Indicateur de nav « glissant » avec ressort ou rebond, et plus généralement toute courbe à dépassement (back/elastic) : le fondu croisé de fond en 200 ms plus le verrouillage (MO-07) suffisent.
- Pastille vidéo qui pulse ou rebondit en boucle, badge « Nouveau », ouverture automatique ou lecture automatique avec son : invasif, ce qui contredit explicitement la demande.
- Animations de propriétés de mise en page (height, top, width, margin) pour les interactions fréquentes ; seule exception, l’amélioration progressive des <details> via ::details-content + interpolate-size, avec repli instantané.
- Animer backdrop-filter ou filter: blur (header, voile, fenêtre vidéo) : coûteux sur mobile ; le voile reste une couleur semi-transparente.
- Défilement automatique de la bande des marques (marquee) : distrayant, et la liste ne compte que 3 marques.
- Écran de chargement, splash ou « page transition » : site d’une page, pré-rendu, rien à masquer.
- Sons, vibrations (navigator.vibrate) ou confettis au clic sur « copier ».
- Ajouter une librairie d’animation (Framer Motion, GSAP) : CSS + WAAPI couvrent tout le besoin ; une librairie ajouterait des dizaines de ko pour le même résultat.

<details><summary>Livrable détaillé de l'auditeur et corrections du relecteur</summary>

## 1. Tokens de mouvement (à placer dans `:root`, src/styles.css)

```css
:root {
  /* Durées : 3 seulement */
  --motion-fast: 120ms;  /* retour de pression, relâchement */
  --motion-base: 200ms;  /* survol, couleur, icônes, feedback, entrée du menu */
  --motion-slow: 360ms;  /* ouvertures : details, widget, fenêtre vidéo, révélations */

  /* Courbes : 2 seulement */
  --ease-out: cubic-bezier(0.2, 0.65, 0.3, 1); /* = --ease actuel : entrées, survols, états */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);       /* sorties uniquement, durée × 0,6 */

  /* Amplitudes */
  --press-scale: 0.97;       /* boutons et pilules pleins */
  --press-scale-icon: 0.92;  /* boutons icône 44 px (copier, burger) */
  --nudge: 2px;              /* icônes directionnelles au survol */
  --rise: 8px;               /* entrées (hero, révélation, contenu de details) */
}

@media (prefers-reduced-motion: reduce) {
  :root { --press-scale: 1; --press-scale-icon: 1; --nudge: 0px; --rise: 0px; }
  html { scroll-behavior: auto; }
  /* entrées = fondu d'opacité 150 ms, sans translate ni scale */
}

/* Le survol n'existe que pour les vrais pointeurs */
@media (hover: hover) and (pointer: fine) { /* toutes les règles :hover */ }
```

Règles du système :
- **Ce qui bouge** : uniquement `transform` et `opacity` pour les interactions fréquentes ; couleurs et fonds en fondu ; `block-size` seulement pour l'ouverture progressive des `<details>`.
- **Ce qui ne bouge pas** : les cartes non cliquables, les chiffres (KPI), le titre du hero (en dehors de l'entrée existante), la barre de progression (aucune transition), le header.
- **Pression** : instantanée (`transition-duration: 0s` sur `:active`), relâchement en `--motion-fast`.
- **Entrée et sortie** : sortie = 60 % de la durée d'entrée, avec `--ease-in`.
- **Tactile** : jamais de survol ; `:active` + résultat. **Souris** : survol discret + `:active`. **Clavier** : `:focus-visible` (outline actuel, inchangé).
- Hero : `animation: hero-enter calc(var(--motion-slow) * 1.5) var(--ease-out) both;` (≈ 540 ms) ; translateY de 12 px → `var(--rise)`.
- Révélation (use-reveal.ts) : durée `--motion-slow`, translateY(`--rise`), éléments déjà visibles au montage ignorés (MO-09).

## 2. Tableau élément → interaction recommandée

| Élément | Survol (pointer fine) | Pression (:active) | Focus | Retour après action |
|---|---|---|---|---|
| Logo `.header-brand` | `.logo-mark` fond → `var(--primary)` (base) | opacity .7 instantané | outline global | défilement vers le haut, indicateur verrouillé (MO-07) |
| Liens nav desktop `.nav-link` | fond `--secondary` + couleur (existant, passer à `--motion-base`) | fond un cran plus sombre, 0 s | outline global | pastille directement sur la cible, sans gras (MO-06/07) |
| Contact du header | fond → mélange foreground/primary | scale(var(--press-scale)) | outline global | `aria-current` → fond `--primary` (MO-08) |
| Burger `summary` | fond `--secondary` | fond `--secondary` + scale(.92) | outline global | icônes en fondu croisé ; panneau `menu-in` 200 ms depuis le haut à droite ; voile 16 % ; défilement bloqué (MO-05) |
| Liens du menu mobile | — | fond `--secondary`, 0 s | outline global | fermeture du menu (fondu 120 ms si ::details-content), défilement |
| CTA `.action` (hero et contact) | fond seul, sans soulèvement ; ArrowDown +2 px en Y ; ArrowUpRight +2/-2 px | scale(.97), ombre réduite | outline global (rayon 100 px conservé) | défilement ou ouverture du client mail / LinkedIn |
| « Voir les missions » `summary` | libellé `--primary`, cercle `--secondary` derrière + | fond `--secondary` 0 s ; icône scale(.9) | outline global | hauteur animée 360 ms (Chromium), contenu en fondu + 4 px ; + → × (existant) ; libellé « Masquer les missions » ; bordure de carte via `:has([open])` |
| Pilules outils / intérêts | **rien** (non interactives) | — | — | — |
| « Demander la lettre » / « Ouvrir le document » | soulignement qui apparaît (`text-decoration-color`) | opacity .7 | outline global | mailto ou PDF ; ArrowUpRight uniquement si PDF réel (existant) |
| Adresse e-mail (contact) | bordure basse 30 % → 80 % | opacity .8 | outline clair (existant) | ouverture du client mail |
| Copier | fond 8 % → 16 % (existant) | scale(.92) | outline clair | Check en scale .6→1 (200 ms), bouton teinté 2,5 s, statut en fondu ; erreur → sélection du texte (MO-15) |
| LinkedIn | comme CTA + flèche diagonale +2/-2 px | scale(.97) | outline clair | nouvel onglet |
| « Retour en haut » | couleur `--primary` + ArrowUp -2 px | opacity .7 | outline global | défilement, indicateur verrouillé |
| Carte projet | **rien** | — | bordure si summary `:focus-visible` | bordure teintée si ouverte |
| Lien d'évitement | — | — | glisse en translateY 0 (ajouter transition `--motion-base`) | focus sur `main` |
| Barre de progression | — | — | — | suit le défilement frame par frame, **sans** transition |
| Widget vidéo (futur) | anneau/bordure `--primary` + icône lecture +1 px en X | scale(.96) | outline global | ouverture de la fenêtre depuis le coin |

## 3. Widget vidéo : entrée, sortie, fenêtre

**Positionnement** : `position: fixed; right: max(16px, env(safe-area-inset-right)); bottom: max(16px, env(safe-area-inset-bottom)); z-index: 90` (sous le header à 100 et le voile du menu à 99). Masqué quand le menu est ouvert : `html:has(.mobile-menu[open]) .intro-video { opacity: 0; pointer-events: none; }`. Quand le widget est présent, ajouter `padding-bottom: 88px` au footer pour que « Retour en haut » et le bouton copier ne soient jamais recouverts en fin de page.

**a) Carte d'invitation (non modale, `role="dialog"`, `aria-modal="false"`, pas de piège de focus)**
- Apparition : une seule fois, environ 1,2 s après la fin de l'entrée du hero (≈ 2 s après le chargement), jamais si l'utilisateur a déjà choisi « Plus tard » ou fermé (`localStorage` dans try/catch ; sans stockage, simple réapparition à la visite suivante).
- Contenu : vignette (poster) 64 px, « Fiona en 1 min » (durée réelle à fournir), boutons « Regarder » et « Plus tard » ≥ 44 px.
- Entrée : `opacity 0 → 1`, `transform: translateY(12px) scale(.96) → none`, **360 ms `--ease-out`**, `transform-origin: 100% 100%`.
- « Plus tard » : la carte sort en `opacity → 0; scale(.92)` sur **200 ms `--ease-in`**, même origine ; la pastille entre ensuite, **80 ms de chevauchement**, en `scale(.6) → 1` + opacity, **240 ms `--ease-out`**, origine 100 % 100 %. Effet perçu : la carte se replie dans le coin.
- Fermeture définitive (×) : même sortie, sans pastille.

**b) Pastille (widget replié)**
- 56 × 56 px (ou une pilule de 48 px de haut, avec mini-vignette ronde et libellé « Ma présentation » à partir de 720 px). `aria-label="Regarder la vidéo de présentation de Fiona"`.
- Survol (pointer fine) : bordure/anneau `--primary` + icône lecture `translateX(1px)`, `--motion-base`. Pression : `scale(.96)`.
- **Aucune** animation en boucle (pas de pulse, pas de halo).

**c) Fenêtre lecteur (`<dialog>` + `showModal()` : Échap, focus et inert natifs)**
- Desktop et tablette ≥ 720 px : panneau ancré en bas à droite (`right/bottom: 24px`), largeur `min(560px, 100vw - 48px)`, vidéo en 16:9 et barre titre « Fiona Talbi · Présentation » + bouton fermer.
  - Ouverture : `opacity 0 → 1`, `transform: translate(0, 8px) scale(.9) → none`, **360 ms `--ease-out`**, `transform-origin: 100% 100%` (la fenêtre naît de la pastille). `::backdrop` : `oklch(0.2 0.02 285 / 40%)` en fondu de **200 ms**.
  - Fermeture : `opacity → 0; scale(.94)` en **220 ms `--ease-in`** ; la pastille reste en place, sans animation.
- Mobile < 720 px : feuille du bas, pleine largeur, `border-radius: 20px 20px 0 0`, `padding-bottom: env(safe-area-inset-bottom)` ; ouverture `translateY(100%) → 0` en **360 ms `--ease-out`**, fermeture `translateY(100%)` en **240 ms `--ease-in`**.
- Implémentation : `dialog { transition: opacity var(--motion-slow) var(--ease-out), transform var(--motion-slow) var(--ease-out), overlay var(--motion-slow) allow-discrete, display var(--motion-slow) allow-discrete; }` + `@starting-style { dialog[open] { opacity: 0; transform: translateY(8px) scale(.9); } }` (Chromium 117+, Safari 17.5+, Firefox 129+ ; ailleurs ouverture instantanée).
- Vidéo : `preload="none"`, `poster`, `playsinline`, contrôles natifs, `<track kind="captions">` (sous-titres à fournir par Fiona). Lecture lancée au clic « Regarder », geste utilisateur donc son autorisé ; **jamais** au chargement. Pause à la fermeture, reprise au même instant. Source : `import.meta.env.BASE_URL + 'video/presentation.mp4'` ; la vidéo provisoire doit être neutre (pas de faux témoignage, pas de visage d'une autre personne présenté comme Fiona).
- Focus : à l'ouverture, sur le bouton lecture ou fermer ; à la fermeture, retour à la pastille (ou au bouton « Regarder » de la carte).
- Reduced motion : uniquement des fondus d'opacité de 150 ms (ni scale, ni translate, ni feuille qui glisse) ; inclure `::backdrop` et le dialog dans le reset (MO-17).

**Récapitulatif des durées du widget** : invitation 360 / 200, pastille 240, fenêtre 360 / 220, feuille mobile 360 / 240, voile 200, pression 0 → 120.

## 4. Extraits prêts à l'emploi

```css
/* Pression (MO-01) */
.action:active, .header-contact:active { transform: scale(var(--press-scale)); transition-duration: 0s; }
.copy-button:active, .mobile-menu > summary:active { transform: scale(var(--press-scale-icon)); transition-duration: 0s; }
.nav-link:active, .project-details > summary:active { background: var(--secondary); transition-duration: 0s; }
.recommendation-link:active, .contact-email:active, .footer-inner a:active, .header-brand:active { opacity: .7; transition-duration: 0s; }

/* Details (MO-04) */
@supports selector(::details-content) {
  .project-details::details-content {
    block-size: 0; overflow-y: clip; opacity: 0;
    transition: block-size var(--motion-slow) var(--ease-out),
                opacity var(--motion-base) var(--ease-out),
                content-visibility var(--motion-slow) allow-discrete;
  }
  .project-details[open]::details-content { block-size: auto; opacity: 1; }
}
@supports (interpolate-size: allow-keywords) { :root { interpolate-size: allow-keywords; } }

/* Menu mobile (MO-05), dans @media (max-width: 980px) */
.mobile-menu[open] .mobile-nav { animation: menu-in var(--motion-base) var(--ease-out) both; transform-origin: top right; }
@keyframes menu-in { from { opacity: 0; transform: translateY(-6px) scale(.98); } }
html:has(.mobile-menu[open]) { overflow: hidden; }
html:has(.mobile-menu[open]) body::after {
  content: ""; position: fixed; inset: 0; z-index: 99;
  background: oklch(0.255 0.029 285 / 16%);
  animation: fade-in var(--motion-base) var(--ease-out) both;
}
@keyframes fade-in { from { opacity: 0; } }
.mobile-nav { overscroll-behavior: contain; }
```

Captures et scripts de preuve : `audit/motion-interactions/` (t1 à t7 en .mjs, sorties t1.out, t2.out, t4.out, t5.out ; captures details-open-desktop.png, menu-mobile-open.png, menu-tablet-open.png, copy-feedback-mobile.png, focus-summary.png, focus-nav-crop.png).

**Corrections du relecteur sur ce livrable :**

Erreurs à corriger dans l'extra. (1) Extraits de pression (§4) : « transform: scale() » écrase la rotation de 45° de l'icône du summary (styles.css:655-657) et tout translate de survol. Utiliser les propriétés individuelles « scale » et « translate », qui se composent. « .nav-link:active { background: var(--secondary) } » est identique au survol, donc invisible à la souris : le tableau dit d'ailleurs « un cran plus sombre », mais l'extrait ne le fait pas. Le fond sur « .project-details > summary:active » dessine un rectangle sans rayon ni padding horizontal (styles.css:638-647) : utiliser opacity .7 + scale .9 sur l'icône (voir MO-01 corrigé). (2) Extrait MO-04 : passer « interpolate-size » de :root à .project-details (propriété héritée, à cantonner), et retirer « @supports (interpolate-size…) », inutile puisqu'une propriété inconnue est ignorée. Préciser la compatibilité réelle : ::details-content est pris en charge par Chrome/Edge 131+, Safari 18.4+ et Firefox 143+ ; interpolate-size seulement par Chrome/Edge 129+. Repli : hauteur instantanée avec fondu d'opacité (Safari, Firefox), ou comportement actuel (anciens navigateurs). (3) Reduced motion (§1 et MO-17) : ne jamais mettre ::details-content dans une liste avec d'autres sélecteurs. Un pseudo-élément inconnu invalide la règle entière, et le reset global disparaîtrait dans Safari < 18.4 et Firefox < 143. La nouvelle règle « html.smooth-scroll » doit être placée sous « @media (prefers-reduced-motion: no-preference) », sinon sa spécificité bat « html { scroll-behavior: auto } » du bloc reduced-motion (voir MO-10). (4) Tokens (§1) : garder --motion-slow à 400 ms et le hero à 550 ms. Changer des durées validées (400 → 360, 550 → 540, 10 ou 12 px → --rise 8 px) est un remaniement sans bénéfice perceptible. (5) Widget (§3) : remplacer « role=dialog aria-modal=false » par un <aside> nommé. Ajouter un point d'entrée permanent (bouton « Vidéo de présentation » dans le hero), sans lequel la fermeture définitive (×) rend la vidéo introuvable. Après « Plus tard », afficher directement la pastille aux visites suivantes. Placer les transitions de sortie du dialog sous « @supports (overlay: auto) » (Chromium seulement), sinon la sortie peut s'afficher sous le header dans Safari et Firefox. Ne pas afficher « 1 min » tant que la vraie vidéo n'est pas fournie. Mobile : une barre compacte (≤ 72 px) plutôt qu'une carte. (6) Supprimer la mention de l'écouteur touchstart (MO-01) : React 19 en enregistre déjà un sur document (vérifié par CDP). (7) Voile du menu : ajouter « html { scrollbar-gutter: stable } » avec le verrouillage « overflow: hidden ». (8) Lien d'évitement « qui glisse » : un fondu ou l'apparition instantanée suffit ; ce n'est pas une priorité. Le reste de l'extra est juste et proportionné : 3 durées et 2 courbes, survols réservés aux pointeurs fins, aucune animation en boucle, pas d'autoplay, pas de librairie, chiffres statiques. La liste « avoid » est pertinente et à garder telle quelle. Ordre d'implémentation conseillé, du gain au coût : MO-01 + MO-02 + MO-06 + MO-05 (voile, tap traversant), puis MO-09 + MO-10, puis MO-03, MO-08, MO-12 à 15, MO-04, MO-V1, et enfin MO-07 / MO-V2 si le temps le permet. MO-19 forme un chantier à part.

</details>

## Accessibilité

_Le socle d'accessibilité est nettement au-dessus de la moyenne des portfolios : lien d'évitement fonctionnel, <main tabIndex=-1>, contours de focus visibles et jamais rognés (vérifié élément par élément, y compris dans les cartes en overflow:clip), cibles ≥ 44 px partout, Échap qui ferme le menu et rend le focus, prefers-reduced-motion respecté, contenu entièrement lisible sans JavaScript, aucun défilement horizontal à 320 px ni avec l'espacement de texte 1.4.12. axe-core 4.10 (WCAG 2.0/2.1/2.2 A-AA + bonnes pratiques) ne remonte qu'une seule violation, identique à 390 et 1440 px : le contraste des numéros de projet « 01–04 » (3,33 à 3,88:1 au lieu de 4,5:1). Les tests manuels ajoutent deux non-conformités AA : le focus sort du menu mobile ouvert et se cache dessous (2.4.11), et les liens de navigation desktop tombent à 3,1:1 quand la photo du hero passe sous le header translucide (1.4.3). Le reste relève de la robustesse sémantique : aria-label ignorés sur 6 <div> génériques (statistiques, marques), hiérarchie h3/h3 dans la timeline, titres-slogans peu descriptifs pour la navigation par titres, h1 sans le nom de Fiona, mode contrastes forcés incomplet, tailles de police en px qui ignorent la préférence de taille du navigateur. Tout se corrige en CSS/JSX ciblé (effort S pour l'essentiel) sans toucher à l'identité visuelle. Le futur lecteur vidéo est le vrai point de vigilance : une vidéo parlée sans sous-titres français échouerait d'emblée au critère 1.2.2 (niveau A) — la checklist complète est dans « extra »._

### A11Y-18 · Futur lecteur vidéo de présentation : exigences d'accessibilité à intégrer dès la conception

🔴 critique · tous · effort M · Corrigé

- **Preuve** : Demande de l'utilisatrice (README/brief) : proposition de vidéo à l'arrivée + widget « plus tard » en bas à droite. Aucun composant vidéo n'existe encore ; aucun fichier .vtt dans public/. Risques connus : 1.2.2 Sous-titres (niveau A), 1.4.2 Contrôle du son, 2.2.2 Mettre en pause, 2.1.2 Pas de piège clavier, 2.4.3 Ordre du focus, 2.4.11 Focus non masqué (le widget fixe peut couvrir le bouton « Retour en haut » ou le bouton copier du panneau contact).
- **Problème** : Une vidéo parlée sans sous-titres français échoue d'emblée au niveau A ; un widget flottant mal placé dans l'ordre de tabulation ou dans l'empilement z-index reproduit le défaut de A11Y-01.
- **Recommandation** : 1) Piloter la vidéo par les données, comme les recommandations : `introVideo: { src, poster, captions?, transcript?, durationLabel? } | null` dans src/data/portfolio.ts. Avec null, ni carte ni widget ne sont rendus. Chemins préfixés par import.meta.env.BASE_URL. 2) Pendant la phase provisoire : un clip neutre et SANS piste son. 1.2.2 ne s'applique alors pas, aucun sous-titre ni transcription n'est à inventer. Une phrase d'alternative suffit (« Vidéo de démonstration provisoire ») ; durée affichée = durée réelle du fichier. 3) Vidéo réelle (à fournir par Fiona) : <track kind="captions" srclang="fr" label="Français" default> WebVTT relu par Fiona, plus une transcription dans portfolio.ts. 4) Composant src/components/portfolio/intro-video.tsx : carte rendue seulement après montage (useEffect qui lit localStorage dans un try/catch), pour éviter tout décalage d'hydratation et tout flash de la carte chez qui a choisi « Plus tard ». Lecteur en <dialog> ouvert par showModal() sur clic explicite ; <video controls preload="none" playsinline poster> sans autoplay ; pause sur l'événement `close`. Widget = <button> de 48 px. Le reste de la checklist est corrigé dans extra_review. 5) Tests Vitest : jsdom 20 (package.json) n'implémente pas HTMLDialogElement.showModal/close, il faut donc les simuler dans src/test/setup.ts.

### A11Y-01 · Menu mobile : le focus quitte le panneau ouvert et se cache dessous

🟠 important · mobile, tablette, desktop · effort S · Corrigé

- **Preuve** : Test Playwright à 390×844 : menu ouvert au clavier, Tab ×7 parcourt les liens, le 8e Tab focalise « Voir les projets » (top=390 px) alors que open=true et que document.elementFromPoint au centre de l'élément renvoie .mobile-nav ; les 4 Tab suivants (« Contact », 3 résumés) sont aussi masqués. Capture (fichier de travail de l'audit, hors dépôt) accessibilite/shots/menu-tab-out-390.png (contour du résumé à moitié sous le panneau). site-header.tsx:24-48 ne gère que Échap et pointerdown. Concerne aussi le desktop zoomé : à 1440 px, un zoom navigateur ≥ 150 % fait passer sous 981 px CSS et affiche ce menu.
- **Problème** : Échec de 2.4.11 Focus non masqué (minimum, AA, nouveau en WCAG 2.2) : l'utilisateur clavier ou contacteur ne voit plus où il est. De plus, après activation d'un lien du menu au clavier, le panneau se ferme sous l'élément focalisé et le focus retombe sur <body> (mesuré : activeElement = BODY) ; Chrome reprend bien la tabulation à la section cible, mais un lecteur d'écran perd son point de lecture.
- **Recommandation** : 1) Correctif principal, dans le useEffect de SiteHeader (site-header.tsx:26-48) : `const menu = menuRef.current; const onFocusOut = (e: FocusEvent) => { const next = e.relatedTarget; if (menu?.open && next instanceof Node && !menu.contains(next)) closeMenu(); }; menu?.addEventListener('focusout', onFocusOut);`, plus le removeEventListener correspondant au cleanup. Ne pas piéger le focus et ne pas ajouter aria-modal : c'est un menu de navigation non modal. 2) Sortie par un lien : uniquement pour les liens rendus dans .mobile-nav (renderLink est partagé avec le desktop), `onClick={(e) => { const fromMenu = !!e.currentTarget.closest('.mobile-menu'); closeMenu(); if (fromMenu) requestAnimationFrame(() => document.querySelector<HTMLElement>('#' + item.id + ' :is(h1, h2)')?.focus({ preventScroll: true })); }}`, et la même chose pour le lien « Contact » du menu (site-header.tsx:100-108) → '#contact h2'. Mettre tabIndex={-1} sur le h2 de SectionHeading (section-heading.tsx:17) et sur celui de ContactSection (contact-section.tsx:35). CSS : `.section-title:focus, .contact-panel h2:focus { outline: none; }`, car c'est un focus programmatique sur un élément non interactif. Le défilement reste celui de l'ancre native (scroll-padding-top). 3) Test de non-régression Playwright : ouvrir le menu, appuyer 8 fois sur Tab → details.open === false.

### A11Y-03 · Liens du menu desktop à 3,1:1 quand la photo du hero passe sous le header translucide

🟠 important · desktop, tablette · effort S · Vérifié

- **Preuve** : Balayage du défilement tous les 60 px (header-sweep.mjs), texte des liens masqué puis pixel du 5e centile le plus sombre derrière .desktop-nav : pire cas 3,13:1 à 1440 px (scrollY=180, fond rendu rgb(215,183,182) = anthurium rouge sous blanc 70 %) et 3,22:1 à 1024 px (scrollY=180). Capture (fichier de travail de l'audit, hors dépôt) accessibilite/shots/header-scroll180-1440.png (« Parcours », « Compétences » sur fond rosé). Cause : styles.css:136-141 `background: oklch(1 0 0 / 70%)` + styles.css:185-186 `.nav-link { font-size: 13px; color: var(--muted-foreground) }`. En bas de page à 1280×720 (viewport d'ordinateur portable courant), le panneau contact sombre passe sous les liens : 3,06:1 mesuré (fond rgb(187,188,194), calcul théorique 3,07:1).
- **Problème** : Échec 1.4.3 (AA) intermittent : le fond réel du texte dépend du contenu qui défile dessous ; un gris moyen (#646474) en 13 px sur verre à 70 % ne garantit pas 4,5:1.
- **Recommandation** : Donner aux liens une encre plus dense, propre au header : `.nav-link { color: oklch(0.42 0.024 285); }` (#4b4b5a) → 4,62:1 même au pire cas mesuré, et monter le verre à `oklch(1 0 0 / 86%)` dans le bloc @supports → 6,52:1 au pire cas (le flou reste perceptible). Garder --muted-foreground ailleurs : il est conforme sur tous les fonds opaques.

### A11Y-02 · Numéros de projet « 01–04 » sous le seuil de contraste (seule violation axe)

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : axe-core 4.10, règle color-contrast, 4 nœuds à 390 et 1440 px : .project-catman 3,33:1 (#7e75bb sur #e8e6ff), .project-trade 3,43:1 (#5b81a7 sur #dbeefd), .project-social 3,33:1 (#ab726d sur #ffe8e1), .project-influence 3,88:1 (#5c7e69 sur #e1f2e6) ; texte 12 px poids 600. Cause : styles.css:557-561 `.project-number { opacity: 0.7 }`. Résultats bruts : (fichier de travail de l'audit, hors dépôt) accessibilite/axe-results.json.
- **Problème** : Échec 1.4.3 (AA) : texte de 12 px en dessous de 4,5:1 sur les 4 couvertures de projet.
- **Recommandation** : styles.css:557-561 : supprimer `opacity: 0.7` → `.project-number { font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums; }`. Le numéro hérite alors de --project-ink de .project-cover, soit 6,38 à 8,37:1 sur --project-bg. Ajouter aria-hidden="true" sur le <span className="project-number"> (project-card.tsx:19) : le numéro est décoratif et la synthèse vocale lit sinon « zéro un » entre la marque et la catégorie. Le contraste reste corrigé, puisque le numéro est lu visuellement.

### A11Y-04 · Statistiques, résultats et marques : aria-label ignorés sur des <div> génériques, aucune structure

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : hero.tsx:42 `<div className="impact-strip" aria-label=…>`, hero.tsx:69 `<div className="brand-list" aria-label=…>`, project-card.tsx:33-35 `<div className="project-metrics" aria-label=…>` (×4). axe : aria-prohibited-attr (serious) sur les 6 nœuds ; arbre d'accessibilité Chrome (CDP) : rôle « generic », nom non exposé. Snapshot ARIA : les 4 chiffres clés sont lus comme une suite plate « strong +30 % / paragraphe / texte » sans regroupement. Tailwind preflight (dist/client/assets/styles-*.css) applique `ol,ul,menu{list-style:none}`, ce qui retire la sémantique de liste dans Safari/VoiceOver pour .skill-card ul (sections.tsx:95).
- **Problème** : 1.3.1 Info et relations : le regroupement visible (bandeau de 4 KPI, paires valeur/légende, liste de marques) n'existe pas pour les technologies d'assistance ; les libellés « Mes résultats en chiffres », « Résultats : … », « Parcours professionnel » ne sont jamais annoncés (ARIA 1.2 interdit de nommer un rôle generic). « 3+ ans » est lu « 3 plus ans », « 500+ » « 500 plus ».
- **Recommandation** : Remplacer les <div> nommés par des listes nommées. hero.tsx:42 → `<ul className="impact-strip enter enter-3" role="list" aria-label={content.statsLabel}>` avec des `<li className="impact-stat">`. project-card.tsx:33 → `<ul className="project-metrics" role="list" aria-label={sectionContent.projects.resultsLabel + ' : ' + project.category}>` avec des <li>. hero.tsx:69 → `<ul className="brand-list" role="list" aria-label={sectionContent.career.label}>` avec des <li>. Ajouter role="list" sur `.skill-card ul` (sections.tsx:95). Adapter les sélecteurs CSS qui ciblent `> div` (ex. `.project-metrics > div + div` → `> li + li`) et vérifier le rendu à 390, 768 et 1440 px (il doit être identique). Ne pas ajouter de champ srValue.

### A11Y-05 · Hiérarchie de titres incohérente dans Parcours et Langues

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : Plan des titres extrait (1440 px) : « H3 Expériences professionnelles » immédiatement suivi de « H3 Marketing Manager Assistant », « H3 Chargée de communication », « H3 Chargée de relations influenceurs » (sections.tsx:58 et 69) — les postes devraient être enfants du titre de groupe. « H3 Sans frontières. » (sections.tsx:165) introduit les langues alors que src/data/portfolio.ts:497 contient un label « Langues » jamais rendu ; les langues/niveaux sont des <p> isolés (sections.tsx:169-173).
- **Problème** : 1.3.1 / 2.4.6 : en navigation par titres, « Expériences professionnelles » ne contient rien et « Sans frontières. » n'indique pas qu'il s'agit des langues ; le couple langue/niveau n'est pas associé.
- **Recommandation** : Postes en <h4> (sections.tsx:69) et règle `.timeline-item h3` (styles.css:738) renommée en `.timeline-item h4`. Titre des langues (sections.tsx:165-168) : `<h3 className="language-intro"><Globe2 … aria-hidden /><span className="sr-only">{sectionContent.languages.label} : </span>{sectionContent.languages.title}</h3>` (la classe sr-only est bien générée : @source "../src" dans styles.css:2). Ne pas restructurer les langues en <dl> : garder les <div> actuels.

### A11Y-06 · Titres-slogans : la navigation par titres ne dit pas « Projets », « Formation »…

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : Plan des h2 : « Des projets concrets. Des résultats mesurables. », « La curiosité comme moteur. L'impact comme cap. », « De la stratégie au terrain. … », « Apprendre ici. Voir plus loin. », « Toujours en mouvement. … », « La confiance se construit. ». Le mot descriptif est dans le surtitre <p className="section-eyebrow"> hors du h2 (section-heading.tsx:11-14). Même schéma pour les cartes projet (marque et catégorie dans .project-cover, avant le h3 « Repenser le rayon. Booster les ventes. », project-card.tsx:13-31) et la timeline (entreprise dans .timeline-meta avant le h3, sections.tsx:65-69).
- **Problème** : 2.4.6 Titres et étiquettes (AA) : la liste des titres (rotor VoiceOver, touche H de NVDA) — principal moyen de survol d'un recruteur malvoyant — ne permet pas de trouver « Formation » ou « Recommandations », ni de savoir quelle marque correspond à quel projet.
- **Recommandation** : SectionHeading (section-heading.tsx:11-16) : `<p className="section-eyebrow" aria-hidden="true">…</p>` et `<h2 className="section-title"><span className="sr-only">{label} : </span>{title}…</h2>`. Faire de même dans ContactSection (contact-section.tsx:31-39) avec content.label. Cartes projet : `<h3><span className="sr-only">{project.brand}, {project.category} : </span>{project.title}</h3>` et aria-hidden="true" sur .project-cover-top et .project-cover-bottom. Timeline (avec A11Y-05) : `<h4>{experience.role}<span className="sr-only"> chez {experience.company}{experience.location ? ', ' + experience.location : ''}</span></h4>` et .timeline-meta en aria-hidden (cette fois sans perte d'information). Rendu visuel inchangé. Vérifier le résultat dans le snapshot ARIA de Playwright (page.accessibility / ariaSnapshot).

### A11Y-07 · Le h1 ne contient pas le nom de Fiona

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : hero.tsx:13 `<p className="hero-name">Fiona Talbi</p>` puis hero.tsx:14-18 `<h1 id="hero-title">De l'idée<br/>à l'impact.</h1>` ; la région d'accueil (aria-labelledby=hero-title) est annoncée « De l'idée à l'impact. ». Seul le <title> mentionne le nom.
- **Problème** : Un lecteur d'écran qui saute au titre principal entend un slogan sans savoir à qui appartient le portfolio ; même effet pour les extraits de moteurs de recherche et le mode lecture.
- **Recommandation** : hero.tsx:13-18 → `<h1 id="hero-title"><span className="hero-name enter">{profile.name}</span><span className="sr-only">, </span><span className="hero-tagline enter enter-1">{content.title}<br /><span className="hero-accent">{content.accent}</span></span></h1>` (retirer `enter enter-1` du h1 lui-même). CSS : `.hero-name, .hero-tagline { display: block; }` (le transform de l'animation ne s'applique pas à un inline), `.hero-name { line-height: 1.25; }`, et renommer `.hero h1 span` (styles.css:277 et ses éventuelles redéfinitions responsive) en `.hero-accent`. Les autres règles `.hero h1` restent valables. Vérifier visuellement à 390, 768 et 1440 px, ainsi qu'à l'impression (styles.css:1618).

### A11Y-09 · Liens d'action : ouverture de la messagerie et des nouveaux onglets non annoncée

🟡 amélioration · tous · effort S · Vérifié

- **Preuve** : Recommandations : nom « Demander la lettre : Lettre de recommandation 01 » / « … 02 » (sections.tsx:219, titres génériques src/data/portfolio.ts:418 et 423) pour un lien mailto: ; l'icône enveloppe est aria-hidden. LinkedIn (contact-section.tsx:70-77) et le futur PDF (sections.tsx:217) ouvrent un nouvel onglet (target=_blank), signalé uniquement par la flèche diagonale aria-hidden.
- **Problème** : L'utilisateur de lecteur d'écran déclenche sans le savoir l'ouverture de son client e-mail ou d'un onglet (technique consultative G201, 3.2.5) ; les deux cartes de recommandation sont indiscernables à l'oreille.
- **Recommandation** : Libellé visible `requestLabel: "Demander la lettre par e-mail"` ; ajouter dans les liens target=_blank `<span className="sr-only"> (nouvel onglet)</span>` et, pour le PDF, « (PDF, nouvel onglet) ». Remplacer les titres « Lettre de recommandation 01/02 » par le nom et la fonction du recommandant — à fournir par Fiona, avec l'accord des personnes (ne rien inventer). Mettre à jour src/test/recommendations.test.tsx, qui vérifie le nom « Demander la lettre : <titre> ».

### A11Y-11 · Mode contrastes forcés (Windows) : header transparent, barre de progression et puces invisibles

🟡 amélioration · desktop, tablette · effort S · Vérifié

- **Preuve** : Playwright forcedColors: 'active' à 1440 px, scrollY=1500 : le texte des cartes projet apparaît à travers le header et se superpose aux liens ((fichier de travail de l'audit, hors dépôt) accessibilite/shots/forced-colors-1440.png) car la transparence de oklch(1 0 0 / 70%) est conservée ; .scroll-progress calculé en rgb(255,255,255) sur un header Canvas blanc → invisible ; puces .skill-card li::before (styles.css:804-811) et points .timeline-item::before (styles.css:718-728) dessinés en background → effacés ; l'état actif du menu ne tient qu'à la graisse.
- **Problème** : Les utilisateurs de thèmes à contraste élevé perdent la lisibilité du header, la barre de progression (exigence du projet) et l'indication de section active.
- **Recommandation** : Ajouter à la fin de styles.css : `@media (forced-colors: active) { .site-header { background: Canvas; backdrop-filter: none; border-color: CanvasText; } .scroll-progress { forced-color-adjust: none; background: Highlight; } .nav-link[aria-current] { text-decoration: underline 2px; text-underline-offset: 6px; } .skill-card li::before, .timeline-item::before { forced-color-adjust: none; background: CanvasText; } }`.

### A11Y-V1 · Aucun garde-fou automatisé : les régressions ARIA réapparaîtront pendant la refonte

🟡 amélioration · tous · effort S · Ajout

- **Preuve** : src/test ne contient que app-routing.test.tsx et recommendations.test.tsx, sans aucune vérification d'accessibilité ; package.json n'a pas axe-core en dépendance de dev, alors que Vitest 4, jsdom 20 et Testing Library sont déjà configurés (vitest.config.ts:8, environment jsdom). Les défauts structurels de cet audit (6 aria-prohibited-attr, h3/h3 dans la timeline, listes sans rôle) sont détectables automatiquement, et la refonte UI qui suit va réécrire hero, cartes, header et ajouter la vidéo.
- **Problème** : Sans test, chaque itération de la refonte (nouveaux composants, widget vidéo, dialog) peut réintroduire des noms ARIA ignorés, une hiérarchie de titres cassée ou des boutons sans nom, et rien ne le signalera avant publication sur GitHub Pages.
- **Recommandation** : Ajouter `axe-core` (version exacte, ex. 4.10.x) en devDependency et créer src/test/a11y.test.tsx : `render(<Portfolio />)` puis `const r = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } }); expect(r.violations.map(v => v.id)).toEqual([]); expect(r.incomplete.filter(i => i.id === 'aria-prohibited-attr')).toEqual([]);`. Le contraste est désactivé parce que jsdom ne calcule pas les couleurs rendues ; il reste vérifié par le script Playwright existant (axe.mjs et header-sweep.mjs, à conserver dans un dossier scripts/ si l'utilisatrice le souhaite). Ajouter un second test : `getAllByRole('heading', { level: 2 })` contient les libellés « Projets », « Parcours », etc. (garde-fou pour A11Y-06). useReveal sort déjà proprement sans IntersectionObserver (use-reveal.ts:7-9), aucun mock supplémentaire n'est nécessaire.

### A11Y-08 · Lien « Contact » du header : nom accessible « Contacter Fiona Talbi » différent du texte visible

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : site-header.tsx:85 `aria-label={"Contacter " + profile.name}` sur un lien dont le texte visible est « Contact » ; le lien « Contact » du menu mobile (site-header.tsx:100-108) et celui du hero n'ont pas d'aria-label → 3 noms pour la même destination.
- **Problème** : 2.5.3 Label in Name : « Contact » n'apparaît que comme fragment du mot « Contacter » ; une commande vocale « Cliquer Contact » (Voice Control, Dragon) peut échouer. 3.2.4 Identification cohérente : même fonction, noms différents.
- **Recommandation** : Supprimer `aria-label={"Contacter " + profile.name}` (site-header.tsx:85) : le texte visible « Contact » suffit, et l'icône est déjà aria-hidden. Ne pas ajouter de variante « Contact — Fiona Talbi » : le lien est déjà dans un header dont la marque porte le nom.

### A11Y-10 · Tailles de police en px : la préférence « taille du texte » du navigateur est ignorée

⚪ bonus · tous · effort M · Corrigé

- **Preuve** : 94 déclarations font-size/font en px dans src/styles.css, aucune en rem. Test CDP Page.setFontSizes(standard: 24px, préférence « Très grande ») : la racine passe à 24 px mais .hero-description reste à 16 px, .nav-link à 13 px, .project-context à 15 px.
- **Problème** : 1.4.4 est satisfait par le zoom de page, mais les personnes malvoyantes qui règlent la taille de police par défaut (Chrome, Firefox, Edge) n'obtiennent aucun agrandissement. Avec 28 déclarations à 12–13 px, c'est la principale fragilité de lisibilité.
- **Recommandation** : À faire après les chantiers visuels, en une seule passe mécanique. 1) font-size en px → rem (valeur/16 : 12px → 0.75rem, 13px → 0.8125rem, clamp(60px, 6.5vw, 86px) → clamp(3.75rem, 6.5vw, 5.375rem)). Boîtes à texte fixe (.logo-mark, .cert-mark, .section-eyebrow > span) en em. Bordures et espacements inchangés. 2) Convertir les breakpoints en em pour que la mise en page suive la préférence : `@media (max-width: 980px)` → `@media (max-width: 61.25em)`, idem pour les autres. En JS : `matchMedia('(min-width: 61.3125em)')`. 3) Valider avec Page.setFontSizes 20 et 24 px à 1024 et 1440 px : aucun débordement du header, aucun défilement horizontal.

### A11Y-13 · Bouton « Copier » : double annonce et nom qui change sous le focus

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : contact-section.tsx:50 bascule aria-label entre « Copier l'adresse email » et « Adresse email copiée » pendant que contact-section.tsx:60 annonce aussi « Adresse email copiée » dans role=status (aria-live=polite et aria-atomic=true y sont implicites).
- **Problème** : Selon le lecteur d'écran, la confirmation est lue deux fois ou le bouton garde un nom d'état (« copiée ») qui ne décrit plus l'action pendant 2,5 s.
- **Recommandation** : Nom fixe : `aria-label={content.copyLabel}` sur le bouton (contact-section.tsx:50) ; seule la région role=status (inchangée, aria-live et aria-atomic conservés) annonce « Adresse e-mail copiée ». Harmoniser « e-mail » dans copyLabel et copiedLabel (portfolio.ts:516-517).

### A11Y-14 · Expressions anglaises lues avec la phonétique française

⚪ bonus · tous · effort S · Vérifié

- **Preuve** : src/data/portfolio.ts:146 « top stores activés day one », :197 « top stores équipés day one », :141/147/153 « Category management », « Trade marketing », « Social media » ; aucun attribut lang sur ces passages (page en lang="fr").
- **Problème** : 3.1.2 Langue d'un passage (AA) : le jargon métier passé dans l'usage est exempté, mais « day one » ou « top stores » sont prononcés à la française par les synthèses vocales.
- **Recommandation** : Option la plus simple et cohérente avec un site en français : reformuler, sous validation de Fiona (« magasins prioritaires équipés dès le premier jour »). Sinon, ajouter un champ optionnel `lang: "en"` aux métriques et entourer le passage d'un `<span lang="en">` au rendu.

### A11Y-15 · Pastilles d'outils au survol : affordance de clic sur un élément inerte

⚪ bonus · desktop · effort S · Vérifié

- **Preuve** : styles.css:840-843 `.tool-pill:hover { background: var(--secondary); border-color: … }` sur des <span> non interactifs (sections.tsx:107-111).
- **Problème** : Un retour de survol signale habituellement un élément cliquable ; le clic ne fait rien, ce qui trouble les utilisateurs avec des troubles cognitifs et nuit à la promesse « chaque clic satisfaisant ».
- **Recommandation** : Supprimer la règle :hover (et la transition associée) des .tool-pill ; réserver les changements d'état aux liens, boutons et <summary>.

### A11Y-16 · Écrans d'erreur et 404 en anglais dans un document lang="fr"

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : src/routes/__root.tsx:17-36 (« Page not found », « The page you're looking for… », « Go home ») et :39-75 (« This page didn't load », « Try again ») alors que RootShell déclare <html lang="fr">.
- **Problème** : 3.1.1 Langue de la page : si l'hydratation échoue sur GitHub Pages, le visiteur reçoit un message anglais prononcé en phonétique française.
- **Recommandation** : Traduire dans __root.tsx : « Page introuvable », « Cette page n'existe pas ou a été déplacée. », « Retour à l'accueil », « La page n'a pas pu se charger », « Réessayer ». Textes dans un objet `errorContent` de src/data/portfolio.ts, par cohérence avec la séparation contenu/présentation. Pas de 404.html à créer pour cela.

### A11Y-17 · Impression / « Enregistrer en PDF » : missions masquées et accent illisible

⚪ bonus · desktop · effort S · Corrigé

- **Preuve** : Le contenu des 4 <details className="project-details"> fermés n'est pas rendu à l'impression (les règles @media print, styles.css:1601-1645, ne l'ouvrent pas) ; `.contact-panel h2 span` garde oklch(0.78 0.09 288) (#b4afee) sur fond imprimé blanc (~2:1).
- **Problème** : Un recruteur qui imprime ou exporte le portfolio en PDF perd le détail des missions et une partie du titre de contact.
- **Recommandation** : Dans portfolio.tsx : `useEffect(() => { let opened: HTMLDetailsElement[] = []; const before = () => { opened = [...document.querySelectorAll<HTMLDetailsElement>('details.project-details:not([open])')]; opened.forEach(d => (d.open = true)); }; const after = () => { opened.forEach(d => (d.open = false)); opened = []; }; addEventListener('beforeprint', before); addEventListener('afterprint', after); return () => { removeEventListener('beforeprint', before); removeEventListener('afterprint', after); }; }, [])`. Dans @media print : retirer .project-cover de la liste display:none et ajouter `.project-cover { background: none; padding: 0 0 8px; } .cover-rings, .project-number { display: none; } .project-details > summary { display: none; } .contact-panel h2 span, .contact-panel .section-eyebrow { color: var(--primary); }`.

**Constats écartés par le relecteur**

- ~~A11Y-12 · Photo du hero : image d'ambiance décrite comme du contenu, légende-slogan en guise de nom~~ — Preuves inexactes. L'image (src/assets/creative-desk.jpg, 1440×1024) montre bien un carnet, une tasse et un ordinateur portable, qui occupe environ 20 % de la largeur à droite : l'alt n'est pas inexact. Le rognage est inversé : à ≤ 720 px, aspect-ratio 1.7 (styles.css:1308-1310) recadre en hauteur et l'ordinateur reste entier ; c'est sur desktop (aspect-ratio 1, object-position 48 %) qu'il n'en reste qu'une bande d'environ 12 %. Un alt descriptif sur une image d'ambiance n'est pas un échec de 1.1.1 ; passer à alt="" relève de la préférence. Si un portrait est fourni par Fiona (sujet traité par les autres angles), son alt sera à centraliser dans src/data/portfolio.ts à ce moment-là.

**Garde-fous de cet angle (à ne pas faire)**

- Ne pas transformer le menu mobile en modale avec piège de focus, aria-modal ou fond assombri : un menu de navigation non modal doit simplement se fermer quand le focus en sort (A11Y-01).
- Ne pas supprimer ni réduire le contour de focus (outline 3 px, offset 5 px) au profit d'un simple changement de couleur ou d'ombre ; ne pas ajouter `outline: none` global — seul un h2 focalisé par script peut en être dispensé.
- Ne pas ajouter de widget d'accessibilité / overlay (barre « A+ A- », contraste, dyslexie) : ces surcouches dégradent l'expérience des lecteurs d'écran et font « gadget ».
- Ne pas multiplier les landmarks : pas de role="region" ni d'aria-label sur chaque <section>, pas de role="banner"/"contentinfo" redondants avec <header>/<footer> ; la navigation par titres corrigée (A11Y-06) suffit.
- Ne pas mettre d'aria-label sur des <div>/<span> sans rôle (même cause que A11Y-04) ni de texte alternatif sur des icônes décoratives : garder aria-hidden sur les icônes Lucide accompagnées d'un texte.
- Ne pas relancer de vidéo, carrousel, compteur animé ou parallaxe automatique : tout mouvement de plus de 5 s doit pouvoir être mis en pause (2.2.2) et le site respecte aujourd'hui prefers-reduced-motion — à préserver pour chaque nouvel effet.
- Ne pas masquer le header au défilement ni réduire « Contact » / la barre de progression sur mobile et tablette pour gagner de la place à 400 % : le header ne prend que 26 % de la hauteur à 320×256 et reste conforme (contrainte projet).
- Ne pas corriger le contraste du header en ajoutant une ombre portée sous le texte ou en épaississant la police : changer l'encre (oklch 0.42) et l'opacité du verre est plus propre et mesurable.
- Ne pas utiliser de texte en image (chiffres clés, logos de marques textuels) ni de vidéo sans sous-titres « en attendant » : le contenu doit rester du texte réel et lisible sans JavaScript.
- Ne pas inventer les noms des recommandants, une transcription ou des sous-titres non relus : tant que la vidéo réelle et les lettres ne sont pas fournies par Fiona, utiliser un placeholder explicitement neutre et retirer tout faux contenu avant publication.

<details><summary>Livrable détaillé de l'auditeur et corrections du relecteur</summary>

## 1. Checklist accessibilité — vidéo de présentation et widget « Plus tard »

**Principe** : la vidéo est une *option* proposée, jamais imposée. Tout ce qu'elle dit doit exister aussi en texte.

### A. Proposition à l'arrivée (bandeau ou carte non bloquante)
- [ ] **Pas de modale à l'arrivée** : une petite carte non modale (ex. `<aside aria-labelledby="intro-video-title">` en bas de l'écran ou dans le hero) avec 2 vrais `<button>` : « Regarder la présentation (1 min 30) » et « Plus tard ». Durée affichée = à mesurer sur la vraie vidéo fournie par Fiona.
- [ ] **Ne pas voler le focus** au chargement (pas d'`autofocus`, pas de `focus()` programmatique) ; la carte est placée dans le DOM **après `<main>`**, donc après le lien d'évitement et le contenu dans l'ordre de tabulation.
- [ ] **Annonce non intrusive** : pas de `role="alert"` ni d'`aria-live="assertive"`. Si une annonce est souhaitée, une région `role="status"` (polite) une seule fois, texte court.
- [ ] Ne masque ni « Contact » ni la barre de progression ; ne recouvre pas le bouton copier / « Retour en haut » (2.4.11) : réserver un `padding-bottom` au `<footer>` égal à la hauteur du widget + 16 px, ou placer le widget avec `bottom: max(16px, env(safe-area-inset-bottom))`.
- [ ] « Plus tard » : mémoriser en `localStorage` (lecture/écriture dans try/catch, le site doit fonctionner si le stockage échoue) et transformer la carte en widget.

### B. Widget flottant (bas droite)
- [ ] Un seul `<button type="button">` avec texte visible ou `aria-label="Revoir la vidéo de présentation"` (le libellé visible, s'il existe, en tête du nom — 2.5.3). Pas de `<div onClick>`.
- [ ] Cible **≥ 48×48 px** (contrainte 44 px + marge), à ≥ 16 px des bords et des autres cibles ; contraste icône/fond ≥ 3:1 **et** contour ≥ 3:1 contre le contenu qui défile dessous (fond opaque, pas de verre translucide — cf. A11Y-03).
- [ ] Bouton de fermeture séparé (« Masquer », ≥ 44 px) qui supprime le widget pour la session ; jamais de fermeture au survol.
- [ ] Position `fixed` mais **ordre DOM après le footer** : il est atteint en dernier au clavier, n'interrompt pas la lecture.
- [ ] Apparition : `opacity`/`transform` ≤ 200 ms, **désactivée sous `prefers-reduced-motion: reduce`** (déjà couvert par la règle globale `animation/transition: none !important`, styles.css:1583-1600 — ne pas la contourner avec du JS/WAAPI sans vérifier `matchMedia`). Aucune animation en boucle (pulsation, rebond) : 2.2.2.
- [ ] En mode contrastes forcés : bordure `1px solid CanvasText` visible.
- [ ] Impression : `display:none` dans `@media print`.

### C. Lecteur (modale)
- [ ] `<dialog aria-labelledby="video-title">` ouvert par `showModal()` : focus piégé nativement, fond inerte, **Échap** ferme (gérer l'événement `cancel` pour mettre la vidéo en pause).
- [ ] Titre visible `<h2 id="video-title">Fiona se présente</h2>` (formulation à valider) + bouton « Fermer » (`<button>` texte ou `aria-label="Fermer la vidéo"`, ≥ 44 px) en premier élément focalisable.
- [ ] À la fermeture : `video.pause()` et **retour du focus** sur le bouton déclencheur (carte ou widget) — `dialog.close()` le fait si l'ouverture vient d'un clic, sinon le restaurer explicitement.
- [ ] `<video controls preload="none" playsinline poster="…">` : **contrôles natifs** (clavier et lecteurs d'écran compatibles), **pas d'`autoplay` avec son** (1.4.2) ; si une boucle muette d'aperçu est voulue : `muted`, ≤ 5 s ou bouton pause, et rien sous reduced-motion.
- [ ] **Sous-titres français obligatoires** : `<track kind="captions" srclang="fr" label="Français" src={import.meta.env.BASE_URL + "video/presentation.fr.vtt"} default>` — WebVTT relu mot à mot à partir de la vraie vidéo fournie par Fiona (1.2.2, niveau A). Pas de sous-titres incrustés seuls (non redimensionnables).
- [ ] **Transcription** texte intégrale sous la vidéo dans un `<details><summary>Lire la transcription</summary>…</details>`, aussi dans `src/data/portfolio.ts` pour qu'elle soit pré-rendue et lisible sans JavaScript (couvre 1.2.1/1.2.3 et les recruteurs qui ne peuvent pas activer le son).
- [ ] Si des informations n'apparaissent qu'à l'image (texte à l'écran, logos), les dire à l'oral ou les ajouter à la transcription (1.2.5 audiodescription).
- [ ] Contraste des sous-titres : style par défaut du navigateur (fond noir) ou `::cue { background: oklch(0.2 0.02 285 / 85%); color: #fff; }` ≥ 4,5:1 ; aucun texte incrusté à l'image sous 4,5:1.
- [ ] Pas de flash > 3 par seconde (2.3.1) dans le montage.
- [ ] Taille et format : `width: min(100%, 960px)`, `aspect-ratio` réservé (pas de saut de mise en page), `max-height: 80svh`, utilisable à 320 px et en paysage ; vidéo hébergée dans `public/video/` (chemin via `import.meta.env.BASE_URL`), MP4 H.264 ≤ 10 Mo, `preload="none"` pour ne pas peser sur le premier affichage.
- [ ] Sans JavaScript : un simple lien « Voir la vidéo de présentation » vers le fichier MP4 + transcription visible ; la carte et le widget n'apparaissent qu'après hydratation.
- [ ] Tests à ajouter (Vitest + Testing Library) : le bouton ouvre un dialog nommé, Échap ferme et rend le focus, `<track kind="captions" srclang="fr">` présent, pas d'attribut `autoplay`.

## 2. Tableau complet des contrastes mesurés

Méthode : conversion OKLCH → sRGB (matrices d'Ottosson, écrêtage sRGB), composition alpha en sRGB, ratio WCAG 2.x. Script : `(fichier de travail de l'audit, hors dépôt) accessibilite/contrast.mjs` (résultats : `contrast.json`). Recoupé avec axe-core 4.10 (même valeurs à ±0,1 pour .project-number) et avec un échantillonnage de pixels réels sous le header (`header-sweep.mjs`).

| Couple | Où | Taille | Couleurs | Ratio | Seuil | Verdict |
|---|---|---|---|---|---|---|
| --muted-foreground / --background | hero-description, hero-meta 12px, footer 12px, brand-strip p 12px, section-description | 12–16 px | `#646474` / `#fbf8f2` | **5,44:1** | 4,5:1 | ✅ |
| --muted-foreground / --card | project-context, project-metrics span 13px, recommendation p, mobile-nav-label 12px | 13–15 px | `#646474` / `#ffffff` | **5,78:1** | 4,5:1 | ✅ |
| --muted-foreground / --secondary | .nav-link 13px (hover) / survol | 13 px | `#646474` / `#ebebfa` | **4,89:1** | 4,5:1 | ✅ |
| --muted-foreground / .about-section | about-copy p, timeline-item p | 14–15 px | `#646474` / `#efeff6` | **5,06:1** | 4,5:1 | ✅ |
| --muted-foreground / .credentials-section | .language-level 12px | 12 px | `#646474` / `#f7f4ef` | **5,25:1** | 4,5:1 | ✅ |
| --muted-foreground / glass sur background | .impact-stat span 12px | 12 px | `#646474` / `#fefdfc` | **5,70:1** | 4,5:1 | ✅ |
| --muted-foreground / glass sur credentials | .cert-card p 12px | 12 px | `#646474` / `#fdfcfb` | **5,66:1** | 4,5:1 | ✅ |
| --muted-foreground / header blanc 70 % sur background | .nav-link desktop (cas nominal) | 13 px | `#646474` / `#fefdfb` | **5,67:1** | 4,5:1 | ✅ |
| --muted-foreground / header blanc 70 % sur panneau contact sombre | .nav-link desktop quand le header survole .contact-panel | 13 px | `#646474` / `#bcbcc1` | **3,07:1** | 4,5:1 | ❌ |
| --muted-foreground / header blanc 70 % sur primary | .nav-link desktop au-dessus du h1 violet (pire cas coloré) | 13 px | `#646474` / `#d1c7f0` | **3,61:1** | 4,5:1 | ❌ |
| --foreground / header blanc 70 % sur panneau contact | .header-brand quand le header survole .contact-panel | 15 px 650 | `#212130` / `#bcbcc1` | **8,41:1** | 4,5:1 | ✅ |
| --foreground / --background | texte principal | corps | `#212130` / `#fbf8f2` | **14,91:1** | 4,5:1 | ✅ |
| --foreground / glass sur about | .interest-pill | 13 px | `#212130` / `#fcfcfd` | **15,40:1** | 4,5:1 | ✅ |
| --foreground / glass sur background | .tool-pill | 13 px | `#212130` / `#fefdfc` | **15,64:1** | 4,5:1 | ✅ |
| --card / --foreground | .header-contact, .action-primary, .skip-link | 13–14 px | `#ffffff` / `#212130` | **15,85:1** | 4,5:1 | ✅ |
| --card / --primary (survol) | .action-primary:hover | 14 px 650 | `#ffffff` / `#6544cd` | **6,41:1** | 4,5:1 | ✅ |
| --primary / --background | .section-eyebrow 12px | 12 px 650 | `#6544cd` / `#fbf8f2` | **6,04:1** | 4,5:1 | ✅ |
| --primary / --card | .recommendation-link 14px | 14 px 650 | `#6544cd` / `#ffffff` | **6,41:1** | 4,5:1 | ✅ |
| --primary / --secondary | .nav-link.is-active 13px, .section-eyebrow>span 11px, .cert-mark 17px, header-contact mobile 13px | 11–17 px | `#6544cd` / `#ebebfa` | **5,43:1** | 4,5:1 | ✅ |
| --primary / .about-section | .timeline-meta 12px | 12 px 650 | `#6544cd` / `#efeff6` | **5,62:1** | 4,5:1 | ✅ |
| --primary / --background (contour focus) | :focus-visible outline 3px | non-texte | `#6544cd` / `#fbf8f2` | **6,04:1** | 3:1 | ✅ |
| --primary / --card (contour focus) | :focus-visible outline dans les cartes | non-texte | `#6544cd` / `#ffffff` | **6,41:1** | 3:1 | ✅ |
| --primary / --secondary (éducation) | .education-date 12px sur .education-card | 12 px 650 | `#6544cd` / `#ebebfa` | **5,43:1** | 4,5:1 | ✅ |
| .brand-list / --background | .brand-list desktop 24px | 24 px 750 (grand) | `#5f5f69` / `#fbf8f2` | **5,91:1** | 3:1 | ✅ |
| .brand-list / --background (à 4.5) | .brand-list mobile 18–21px gras (≥18.66px gras = grand texte) | 18 px 750 (≤380px) | `#5f5f69` / `#fbf8f2` | **5,91:1** | 4,5:1 | ✅ |
| .section-title>span muted / background | accent des titres h2 | 31–44 px (grand) | `#646474` / `#fbf8f2` | **5,44:1** | 3:1 | ✅ |
| project (défaut violet) : --project-ink / --project-bg | .project-category 12px, .project-brand 24px | 12 px 650 / 24 px | `#50459e` / `#e8e6ff` | **6,42:1** | 4,5:1 | ✅ |
| project (défaut violet) : .project-number (opacity .7) / --project-bg | .project-number opacity:0.7 | 12 px 600 | `#7e75bb` / `#e8e6ff` | **3,34:1** | 4,5:1 | ❌ |
| project (défaut violet) : --project-ink / --card | .project-metrics strong | 34 px (grand) | `#50459e` / `#ffffff` | **7,83:1** | 3:1 | ✅ |
| project-trade : --project-ink / --project-bg | .project-category 12px, .project-brand 24px | 12 px 650 / 24 px | `#245282` / `#dbeefd` | **6,82:1** | 4,5:1 | ✅ |
| project-trade : .project-number (opacity .7) / --project-bg | .project-number opacity:0.7 | 12 px 600 | `#5b81a7` / `#dbeefd` | **3,46:1** | 4,5:1 | ❌ |
| project-trade : --project-ink / --card | .project-metrics strong | 34 px (grand) | `#245282` / `#ffffff` | **8,10:1** | 3:1 | ✅ |
| project-social : --project-ink / --project-bg | .project-category 12px, .project-brand 24px | 12 px 650 / 24 px | `#873f3b` / `#ffe8e1` | **6,38:1** | 4,5:1 | ✅ |
| project-social : .project-number (opacity .7) / --project-bg | .project-number opacity:0.7 | 12 px 600 | `#ab726d` / `#ffe8e1` | **3,35:1** | 4,5:1 | ❌ |
| project-social : --project-ink / --card | .project-metrics strong | 34 px (grand) | `#873f3b` / `#ffffff` | **7,49:1** | 3:1 | ✅ |
| project-influence : --project-ink / --project-bg | .project-category 12px, .project-brand 24px | 12 px 650 / 24 px | `#244c33` / `#e1f2e6` | **8,37:1** | 4,5:1 | ✅ |
| project-influence : .project-number (opacity .7) / --project-bg | .project-number opacity:0.7 | 12 px 600 | `#5d7e69` / `#e1f2e6` | **3,89:1** | 4,5:1 | ❌ |
| project-influence : --project-ink / --card | .project-metrics strong | 34 px (grand) | `#244c33` / `#ffffff` | **9,71:1** | 3:1 | ✅ |
| contact base oklch(0.98 0.005 285) / panneau | .contact-panel h2, .contact-email | corps | `#f8f8fc` / `#212130` | **14,95:1** | 4,5:1 | ✅ |
| .contact-copy oklch(0.78 0.01 285) / panneau | .contact-copy | 14–15 px | `#b6b7be` / `#212130` | **7,90:1** | 4,5:1 | ✅ |
| .contact-copy / panneau + halo violet 32 % | .contact-copy (zone du halo ::before) | 14–15 px | `#b6b7be` / `#373359` | **5,87:1** | 4,5:1 | ✅ |
| eyebrow oklch(0.79 0.085 288) / panneau | .contact-panel .section-eyebrow | 12 px 650 | `#b7b2ef` / `#212130` | **8,05:1** | 4,5:1 | ✅ |
| eyebrow oklch(0.79 0.085 288) / panneau + halo | .contact-panel .section-eyebrow (halo) | 12 px 650 | `#b7b2ef` / `#373359` | **5,98:1** | 4,5:1 | ✅ |
| eyebrow span oklch(0.87 0.025 288) / blanc 8 % sur panneau | .contact-panel .section-eyebrow>span | 11 px | `#d3d2e4` / `#474366` | **6,20:1** | 4,5:1 | ✅ |
| h2 span oklch(0.78 0.09 288) / panneau | .contact-panel h2 span | 30–53 px (grand) | `#b4afee` / `#212130` | **7,76:1** | 3:1 | ✅ |
| .contact-status oklch(0.8 0.055 288) / panneau | .contact-status | 12 px | `#bbb9e0` / `#212130` | **8,39:1** | 4,5:1 | ✅ |
| .copy-button icône oklch(0.85 0.008 285) / blanc 8 % | .copy-button (non-texte) | icône 15px | `#cdcdd3` / `#333341` | **7,88:1** | 3:1 | ✅ |
| .copy-button bord blanc 15 % / panneau | .copy-button limite (non-texte, info) | bordure | `#42424f` / `#212130` | **1,61:1** | 3:1 | ℹ️ non requis |
| focus oklch(0.8 0.09 288) / panneau | .contact-panel :focus-visible | non-texte | `#bab5f5` / `#212130` | **8,32:1** | 3:1 | ✅ |
| .contact-actions .action-secondary texte / blanc 6 % | bouton LinkedIn | 14 px 650 | `#f8f8fc` / `#2e2e3d` | **12,54:1** | 4,5:1 | ✅ |
| .contact-actions .action-primary foreground / blanc | bouton Écrivez-moi | 14 px 650 | `#212130` / `#ffffff` | **15,85:1** | 4,5:1 | ✅ |
| --border / --card (bordures cartes) | bordure .project-card / .skill-card (décorative, info) | non-texte | `#dbdbe6` / `#ffffff` | **1,38:1** | 3:1 | ℹ️ non requis |
| .action-secondary bordure --border / --background | limite du bouton secondaire « Contact » (info — le texte suffit à identifier le bouton) | non-texte | `#dbdbe6` / `#fbf8f2` | **1,30:1** | 3:1 | ℹ️ non requis |
| barre de progression --primary / header | .scroll-progress (aria-hidden) | non-texte | `#6544cd` / `#fefdfb` | **6,30:1** | 3:1 | ✅ |
| sélection : foreground / oklch(0.88 0.07 285) | ::selection | texte | `#212130` / `#d2d2ff` | **10,85:1** | 4,5:1 | ✅ |
| mobile .header-contact --primary / --secondary | .header-contact ≤980px | 13 px 600 | `#6544cd` / `#ebebfa` | **5,43:1** | 4,5:1 | ✅ |

### Mesures en rendu réel (pixels)
| Situation | Mesure | Verdict |
|---|---|---|
| Liens desktop sur header verre 70 % au-dessus de la photo du hero, 1440 px, scrollY 120–240 | 3,13 à 3,40:1 (fond rgb(215,183,182)) | ❌ A11Y-03 |
| Liens desktop sur header au-dessus du panneau contact, 1280×720 en bas de page | 3,06:1 (fond rgb(187,188,194)) | ❌ A11Y-03 |
| Idem 1024 px, scrollY 120–180 | 3,22 à 3,34:1 | ❌ A11Y-03 |
| Liens desktop sur header au-dessus des sections claires | ≥ 4,59:1 | ✅ |
| .project-number (axe, 4 thèmes) | 3,33 / 3,43 / 3,33 / 3,88:1 | ❌ A11Y-02 |
| Correctifs proposés : encre oklch(0.42 0.024 285) sur verre 70 % au pire cas / sur verre 86 % | 4,62:1 / 6,52:1 | ✅ |

ℹ️ Les bordures de cartes (`--border` 1,38:1) et la bordure du bouton secondaire (1,30:1) ne sont pas exigées par 1.4.11 car le texte identifie le composant ; à ne pas « corriger » au détriment du style.

## 3. Scripts et preuves
- `axe.mjs` → `axe-results.json` (390 et 1440 px) ; `behaviour.mjs` → `behaviour.json` / `behaviour.log` (titres, landmarks, ordre de tabulation, menu, cibles, reflow, espacement, sans JS, mouvement) ; `header-sweep.mjs` ; `misc.mjs` (contrastes forcés, arbre CDP) ; `fontsize.mjs`.
- Captures : `shots/menu-tab-out-390.png`, `shots/header-scroll180-1440.png`, `shots/forced-colors-1440.png`, `shots/focus-all.png`, `shots/skip-1440.png`, `shots/reflow-320x256-menu.png`.

**Corrections du relecteur sur ce livrable :**

ERREURS À CORRIGER DANS LA CHECKLIST VIDÉO
1. Placement DOM « après <main> » pour la carte d'arrivée : cela contredit « proposer à l'arrivée ». Au clavier et au lecteur d'écran, l'offre n'apparaîtrait qu'après tout le portfolio. Correction : rendre la carte d'arrivée juste après </header>, avant <main>. Elle reste non focalisée au chargement et le lien d'évitement la contourne, ce qui ne coûte que 2 arrêts Tab. Seul le widget « Revoir la vidéo » (après « Plus tard ») va en fin de DOM.
2. « Sans JavaScript : lien vers le MP4 + transcription visible » contredit « la carte n'apparaît qu'après hydratation » et ajouterait un bloc de texte visible sans JS. Correction : la vidéo est une option. Sans JS, rien n'est affiché : le contenu du portfolio reste entièrement lisible, ce qui respecte la contrainte. Ajouter explicitement que la carte est montée dans un useEffect (lecture de localStorage dans un try/catch). Lire localStorage pendant le rendu provoquerait un décalage d'hydratation avec le HTML pré-rendu, et un flash de la carte chez qui a déjà choisi « Plus tard ».
3. « dialog.close() rend le focus si l'ouverture vient d'un clic » : inexact. La spécification HTML restaure le focus sur l'élément focalisé avant showModal(), quel que soit le mode d'ouverture (Chrome, Firefox et Safari actuels), à condition qu'il soit encore dans le DOM. Le vrai risque est ailleurs : si la carte se transforme en widget ou se démonte pendant que le dialog est ouvert, il faut focaliser explicitement le widget à la fermeture.
4. « Gérer l'événement cancel pour mettre la vidéo en pause » : utiliser `close`, qui couvre Échap, le bouton Fermer et `form method=dialog`. `cancel` ne couvre qu'Échap.
5. « Focus piégé nativement » : formulation inexacte. showModal() rend le reste de la page inerte, mais Tab peut sortir vers l'interface du navigateur, et c'est souhaitable. Ne surtout pas ajouter de piège JS.
6. Tests : jsdom 20 (package.json) n'implémente pas HTMLDialogElement.prototype.showModal ni close. Ajouter dans src/test/setup.ts : `HTMLDialogElement.prototype.showModal ??= function () { this.setAttribute('open', ''); }; HTMLDialogElement.prototype.close ??= function () { this.removeAttribute('open'); this.dispatchEvent(new Event('close')); };`. Sans cela, les tests proposés échouent.
7. Exemple « Regarder la présentation (1 min 30) » : retirer le chiffre de l'exemple. Ce serait une donnée inventée, à reprendre telle quelle. Afficher la durée réelle du fichier, champ durationLabel dans portfolio.ts.

MANQUES
8. Contrainte « ne rien inventer » et publication : la branche connectée se synchronise avec Lovable et GitHub Pages, donc la vidéo provisoire sera en ligne. Il faut une config `introVideo` dans portfolio.ts (null = rien d'affiché) et un clip provisoire SANS son. Sans parole, il n'y a ni sous-titres ni transcription à inventer, et 1.2.2 ne s'applique pas. Une phrase d'alternative suffit (« Vidéo de démonstration provisoire »). Sous-titres et transcription seulement avec la vraie vidéo, relus par Fiona.
9. 2.4.11 avec un widget fixe : le padding-bottom du footer ne protège que le footer. Ajouter `html:has(.video-widget) { scroll-padding-bottom: 96px; }` (48 px de widget + marges) pour qu'aucun élément focalisé, n'importe où dans la page, ne finisse sous le widget.
10. Petites hauteurs : à 1280×720 zoomé à 200 % (640×360 CSS), le header fixe occupe déjà environ 80 px. Ajouter `@media (max-height: 480px) { la carte d'arrivée se réduit directement au widget de 48 px }` pour que header et carte ne dépassent pas environ 35 % de la hauteur (1.4.10).
11. Point d'entrée permanent : après « Masquer », la vidéo devient introuvable. Ajouter un lien texte discret « Voir ma présentation vidéo » dans la section contact, ou dans .hero-meta (button type=button aria-haspopup="dialog"). Il garantit l'accès pour les lecteurs d'écran et permet de mémoriser « Masquer » dans localStorage (et non dans sessionStorage), sans que le widget revienne à chaque visite. L'incohérence actuelle (localStorage pour « Plus tard », session pour « Masquer ») disparaît.
12. Le gestionnaire Échap global de SiteHeader (site-header.tsx:31-35) écoute sur document. Si le dialog est ouvert depuis un état où le menu mobile est encore ouvert, un même appui sur Échap ferme le dialog ET renvoie le focus sur le résumé du menu, ce qui vole la restauration du focus. Correction : fermer le menu avant showModal() (closeMenu exposé, ou `document.querySelector('details.mobile-menu')?.removeAttribute('open')`), ou ignorer Échap dans onEscape quand `document.querySelector('dialog[open]')` existe.

EXCÈS À RETIRER
13. « Contour ≥ 3:1 contre le contenu qui défile dessous » en plus du fond : superflu. Un bouton au fond opaque --foreground (#212130, 14,9:1 sur le beige) est identifiable au sens de 1.4.11. Exiger fond opaque + icône ≥ 3:1 suffit.
14. Aperçu muet en boucle : à proscrire purement et simplement (juste milieu, rien d'invasif) plutôt qu'à encadrer.
15. Tableau des contrastes (environ 55 lignes) : trop long pour le livrable final, il noie les 2 échecs réels. Garder un tableau de 6 lignes (échecs .project-number et header, pire cas mesuré, valeurs corrigées) et renvoyer le reste à contrast.json. Deux lignes sont fausses ou spéculatives. a) « --muted-foreground / --secondary : .nav-link (hover) 4,89:1 » : au survol, .nav-link passe en color: var(--foreground) (styles.css:194-197). La ligne ne correspond donc à aucun élément, et la force « pire cas --secondary » qui s'appuie dessus est à reformuler. b) « header 70 % sur primary au-dessus du h1 violet 3,61:1 » : cas théorique, non observé dans le balayage de pixels (l'accent violet du h1 est dans la colonne gauche, les liens à droite). À retirer, ou à étiqueter « théorique ».
16. Mesures de pixels re-vérifiées (accessibilite-verif/hdr.py) : 3,24:1 (1440, scrollY 180), 3,07:1 (1280×720, bas de page), 3,44:1 (1024, scrollY 180), contre 3,13 / 3,06 / 3,22 chez l'auditeur. Même conclusion. L'encre #4b4b5a seule donne 4,52:1 au pire cas : préciser dans le tableau que le verre à 86 % est requis, pas optionnel.
17. Cohérence du résumé : A11Y-04 dit qu'axe signale aria-prohibited-attr comme « serious », alors que le résumé annonce une seule violation. Écrire « 1 violation (contraste) + 6 nœuds aria-prohibited-attr à vérifier (incomplete) ».

</details>

## Performance, SEO & partage

_Le socle technique est sain : page pré-rendue lisible sans JavaScript, CLS quasi nul (0,0000 sur mobile, 0,0001 sur desktop), défilement fluide (aucune frame au-dessus de 33 ms en parcourant toute la page avec un CPU ralenti 4 fois), aucune erreur console ni écart d’hydratation sur 15 chargements. Les pertes viennent de quelques choix précis et faciles à corriger. L’image du hero pèse 142 Ko et elle est préchargée en priorité haute alors qu’elle est sous la ligne de flottaison sur mobile. Les polices sont découvertes tard. L’animation d’entrée du hero part d’une opacité 0 et retarde le LCP de jusqu’à 600 ms. Tailwind génère 59 Ko de CSS pour 47 composants shadcn jamais importés. react-query est embarqué sans être utilisé. Une build expérimentale qui applique ces corrections, sans aucun changement visuel (captures identiques au pixel près pour la partie CSS), fait passer le LCP mobile de 1 468 à 964 ms en Slow 4G et de 2 876 à 1 748 ms en Fast 3G. Le transfert initial tombe de 352 à 224 Ko. Côté partage, le point bloquant est l’absence d’og:image, d’og:url et de canonical : un lien envoyé sur LinkedIn ou par e-mail à un recruteur s’affiche aujourd’hui sans visuel maîtrisé. Il manque aussi un JSON-LD Person, une page 404 en français et des icônes pour iOS. Le futur widget vidéo peut ne rien coûter au chargement : composant chargé à la demande, preload="none", poster léger et MP4 auto-hébergé sur GitHub Pages, sans traceur tiers._

### PERF-01 · Aucune image de partage (og:image) : aperçu LinkedIn sans visuel maîtrisé

🟠 important · tous · effort S · Corrigé

- **Preuve** : dist/client/index.html <head> : og:title, og:description, og:type et twitter:card=summary_large_image seulement. Ni og:image, ni twitter:image, ni og:url (__root.tsx:79-89, index.tsx:7-14). Prototype généré : og-image.png 1200×630 = 61,6 Ko, og-image.jpg = 52 Ko (prototype hors dépôt).
- **Problème** : Le portfolio va surtout circuler en lien (LinkedIn, e-mail, Slack de recruteurs). Sans og:image, LinkedIn affiche une carte sans visuel ou une image choisie au hasard dans la page (ici une photo de bureau générique). twitter:card=summary_large_image est en plus déclaré sans image. C’est la première impression, avant même la visite.
- **Recommandation** : 1) Produire l'image APRÈS avoir fixé la palette finale (tâche DA de la roadmap). Elle doit utiliser exactement les tokens --background et --primary du site. 2) public/og-image-v1.jpg en 1200×630, JPEG qualité ~85, < 150 Ko, marge intérieure de 60 px. Contenu limité à ce qui reste lisible en miniature : « Fiona Talbi » (≥ 40 px), le H1 « De l'idée / à l'impact. » (≥ 96 px), « Marketing 360 & Communication · Paris » (≥ 32 px), puis les 3 valeurs KPI réelles (+30 %, 140, 500+) en ≥ 64 px, chacune avec un libellé court ≥ 26 px (« ventes · Logitech », « top stores · Logitech », « abonnés · CosmétiCar »). Pas d'URL ni de photo tant que Fiona n'en a pas fourni. Production : Canva, ou le gabarit og-template.html + og.mjs du scratchpad, exécuté en local puis commité (pas de génération au build). 3) Dans portfolio.ts : seo.siteUrl = "https://fio-tlb.github.io/fiona-talbi-portfolio/", seo.ogImage = "og-image-v1.jpg", seo.ogImageAlt. 4) Dans index.tsx : og:image = new URL(seo.ogImage, seo.siteUrl).href (URL absolue), og:image:width 1200, og:image:height 630, og:image:alt, twitter:image. 5) Si l'image est régénérée (nouvelle palette), incrémenter le nom de fichier (og-image-v2.jpg) : LinkedIn met l'aperçu en cache par URL. Puis forcer le rafraîchissement avec linkedin.com/post-inspector. À réaliser avec PERF-07 et PERF-09, dans une seule tâche « head de partage ».

### PERF-02 · Image du hero : JPEG de 142 Ko sans srcset, préchargée en priorité haute alors qu’elle est sous la ligne de flottaison sur mobile

🟠 important · mobile, tablette, desktop · effort S · Corrigé

- **Preuve** : hero.tsx:55-61 (<img src=JPEG 1440×1024 fetchPriority="high">). React ajoute <link rel="preload" as="image" fetchPriority="high"> en tête du <head>, AVANT la feuille de style. Position mesurée : top 825 px pour une fenêtre de 844 px (390×844), 821 px pour 667 px (375×667), donc invisible au premier écran. Largeur réellement affichée (object-fit: cover) : 348 px sur mobile, 401 px à 768, 557 px à 1024, 688 px à 1280-1440. Variantes générées : AVIF 720/1080/1440 = 16,7/29,7/47,9 Ko ; WebP = 21,2/35,3/51,5 Ko. En Slow 4G, l’image (142 Ko) se télécharge de 192 à 1 996 ms, en parallèle du JS (fin à 1 852 ms) et des polices.
- **Problème** : Sur mobile, le plus gros fichier de la page (40 % des 352 Ko transférés) passe en tête de file pour une image que personne ne voit au premier écran, au détriment du CSS bloquant, des polices et du JS d’hydratation. Sur desktop, l’image est le LCP mais 1440 px est surdimensionné pour un écran 1×.
- **Recommandation** : Appliquer à l'image finale du hero (photo de bureau actuelle ou vraie photo fournie par Fiona). Dans hero.tsx, envelopper l'<img> dans un <picture> avec une seule <source type="image/avif" srcSet="…-720.avif 720w, …-1080.avif 1080w, …-1440.avif 1440w" sizes="(max-width: 510px) calc(100vw - 42px), (max-width: 720px) 470px, (max-width: 1120px) 55vw, 690px" />. Garder l'<img> JPEG en repli avec width/height, alt et fetchPriority="high" (LCP sur tablette et desktop ; jamais loading="lazy"). Générer les 3 AVIF une seule fois (qualité ~55 : 16,7 / 29,7 / 47,9 Ko mesurés par l'auditeur) dans src/assets/hero/ et les importer (aucune dépendance). Pas de variantes WebP. Vérifier à 390, 768, 1024 et 1440 que currentSrc correspond à 1080, 1080, 1440 et 720 (DPR 3, 2, 2 et 1).

### PERF-15 · Widget vidéo de présentation : architecture à fixer avant l’implémentation pour qu’il ne coûte rien au chargement

🟠 important · tous · effort M · Corrigé

- **Preuve** : Budget actuel mesuré : 224 Ko transférés et LCP mobile de 964 ms après optimisations (build E). Une vidéo de 60-90 s en 720p H.264 pèse environ 8 à 12 Mo, soit environ 40 à 50 fois la page. Un iframe YouTube ajoute plusieurs centaines de Ko de JS tiers et des traceurs. Placeholder MP4 720p de 12 s généré avec ffmpeg : 186 Ko (prototype hors dépôt).
- **Problème** : Mal intégrée (preload par défaut, iframe chargé d’office, composant dans le bundle principal, modal au chargement), la vidéo annulerait tous les gains ci-dessus, déclencherait une obligation de consentement cookies (embed tiers) et provoquerait du CLS ou un recouvrement du bouton Contact.
- **Recommandation** : MP4 H.264 720p unique dans public/video/ (≤ 10 Mo, -movflags +faststart), poster AVIF ≤ 25 Ko, sous-titres VTT en français. Pas de WebM, d'iframe ni d'autoplay. Composant IntroVideo client uniquement, absent du HTML pré-rendu, monté après requestIdleCallback (ou 2 s après load sur Safari, qui ne l'a pas). Il rend l'invitation et, sans React.lazy, un <dialog> natif contenant <video controls playsInline preload="none" poster>. Au clic sur « Regarder », dans le même gestionnaire synchrone : dialog.showModal() puis video.play(). À l'événement close du dialog : video.pause() et retour du focus sur le déclencheur. « Plus tard » réduit l'invitation en pastille de 56 px en bas à droite (right: 16px; bottom: 16px; fond opaque; cible ≥ 44 px; pas de backdrop-filter), masquée quand activeSection === "contact" (use-portfolio-navigation.ts:74 expose activeSection). Préférence en localStorage ("later" | "dismissed" | "seen") dans un try/catch. Pas de viewport-fit=cover. Données dans portfolio.ts : introVideo { src, poster, captions, durationLabel, published }, chemins préfixés par import.meta.env.BASE_URL.

### PERF-V1 · Le placeholder vidéo partirait en production chez les recruteurs à chaque push sur main

🟠 important · tous · effort S · Ajout

- **Preuve** : .github/workflows/pages.yml:3-5 déploie automatiquement chaque push sur main (et Lovable pousse sur main). Le placeholder proposé dans l'extra (§4) est un fond uni 0xF3EDE4 de 12 s avec piste audio sine=frequency=220 (bip continu de 220 Hz). L'utilisatrice a autorisé « n'importe quoi comme vidéo » pour le développement, pas pour les visiteurs.
- **Problème** : Dès l'intégration du widget, une recruteuse qui clique sur « Regarder » obtiendrait 12 s d'écran beige avec un bip continu. L'effet est pire que l'absence de vidéo et va contre le « premium » recherché.
- **Recommandation** : Dans src/data/portfolio.ts : introVideo = { src, poster, captions, durationLabel, published: false }. Le composant IntroVideo ne s'affiche que si introVideo.published || import.meta.env.DEV : il est visible dans `bun run dev` et dans l'aperçu Lovable (serveur de développement), absent de la build GitHub Pages. Placeholder sans piste audio (ffmpeg … -an, environ 100 Ko) et poster neutre. Passer published à true seulement avec la vraie vidéo et ses sous-titres.

### PERF-03 · L’animation d’entrée du hero part d’une opacité 0 et retarde le LCP de jusqu’à 600 ms

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : styles.css:1138-1165 : .enter = hero-enter 550 ms, from {opacity:0}, fill both, délais de 50 à 170 ms. Appliquée au H1, au nom, aux stats et à la photo (hero.tsx:13-14, 51). Base, mobile Slow 4G : LCP (H1) à 1 540 ms avec animation contre 924 ms en reduced motion. Desktop : l’image n’est retenue comme LCP qu’à 676 ms (après la fin de l’animation). Dans la build optimisée, elle n’est même plus détectée et le LCP se fige sur le lien de menu « Recommandations » (mesure faussée). Variante E (même animation, départ opacity:0.01) : LCP mobile 964 ms (Slow 4G) et 1 748 ms (Fast 3G), LCP desktop = image à 396 ms.
- **Problème** : Chrome ne prend pas en compte un élément peint à opacité 0. Le H1 n’est donc comptabilisé qu’à la fin du fondu. Le hero n’est entièrement visible qu’environ 720 ms après le premier rendu, quel que soit le réseau. Cela pénalise le LCP mesuré sur le terrain (CrUX/Search Console) et donne une impression de lenteur sur des connexions déjà lentes.
- **Recommandation** : Dans styles.css:1138-1165, laisser le H1 et la photo visibles dès le premier rendu : retirer .enter de <h1> (hero.tsx:14) et de .hero-visual (hero.tsx:51), ou leur appliquer une variante .enter-still { animation: hero-rise 380ms var(--ease) both } avec @keyframes hero-rise { from { transform: translateY(8px) } }, sans opacité. Garder le fondu (opacity 0 → 1, translateY(8px), 380 ms) uniquement sur .hero-name, .hero-role, .hero-description, .hero-actions, .hero-meta, .impact-strip et .brand-strip, avec des délais de 0 à 120 ms (au lieu de 50 à 210 ms et 550 ms). Conserver l'annulation en prefers-reduced-motion (styles.css:1583-1599) et le forçage d'opacité en impression. À arbitrer avec l'axe motion-interactions : une seule définition de .enter pour tout l'audit.

### PERF-04 · Polices découvertes tardivement : pas de preload des 2 woff2 latin

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : Aucun <link rel="preload" as="font"> dans dist/client/index.html. Slow 4G : les woff2 ne partent qu’à 730 ms (après l’analyse du CSS) alors que CSS et JS partent à 194 ms. Fin à 1 366 ms (Manrope) et 1 537 ms (DM Sans). Fast 3G : départ à 1 635 ms. Build d’essai avec preload : même nom haché que dans le CSS (manrope-latin-wght-normal-DHIcAJRg.woff2), donc 1 seule requête par police. LCP desktop câble : 652 → 376 ms (FCP 284 → 376 ms, car Chrome attend brièvement les polices préchargées, donc pas de FOUT).
- **Problème** : Le titre et le texte du hero sont d’abord rendus avec la police système, puis basculent (swap) quand les woff2 arrivent, 600 à 1 500 ms plus tard sur mobile. Le LCP réel du H1 dépend de cette arrivée tardive.
- **Recommandation** : Dans __root.tsx, importer manropeLatin depuis "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url" et dmSansLatin depuis "@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2?url" (fichiers présents dans node_modules). Ajouter à links : { rel: "preload", href, as: "font", type: "font/woff2", crossOrigin: "anonymous" } pour chacune. Ne précharger aucun autre sous-ensemble. Vérifier dans dist que le href préchargé est identique à l'URL du @font-face (même hash), puis mesurer ce changement isolément (FCP et LCP mobile et desktop). Le retirer s'il retarde le FCP de plus de 100 ms sans supprimer de bascule visible.

### PERF-05 · CSS bloquant gonflé à 98 Ko par les 47 composants shadcn inutilisés que scanne Tailwind

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : styles.css:1-3 : @source "../src" scanne src/components/ui/*.tsx (47 fichiers, aucun importé hors de ui/ : grep vide). Couverture CSS : 22-27 % utilisés seulement. Build d’essai avec `@source not "./components/ui";` : 98 150 → 40 265 octets (gzip 20,3 → 11,6 Ko). En supprimant aussi `@import "tw-animate-css"` (aucune classe animate-/fade-/zoom- hors ui) : 38 597 octets (gzip 11,3 Ko). Captures pleine page 390/768/1440 identiques au pixel près (ImageChops bbox = None).
- **Problème** : La feuille de style bloque le rendu : chaque Ko retarde le premier affichage sur réseau lent (fin du CSS à 672 ms en Slow 4G). 61 % de son poids sert à des composants absents de la page.
- **Recommandation** : Dans src/styles.css, ajouter seulement, sous @source "../src"; : /* Les composants shadcn de src/components/ui ne sont pas utilisés par le portfolio. Si l'un d'eux est importé, supprimer cette ligne. */ @source not "./components/ui";. Garder @import "tw-animate-css";. Ajouter la même règle en une ligne dans AI_README.md (section Structure). Vérification : captures pleine page à 390, 768 et 1440 identiques, plus le contrôle de la page 404 en développement (bun run dev puis /inexistant).

### PERF-07 · Pas de canonical, d’og:url, d’og:locale ni d’og:site_name ; meta en double entre __root et index

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : dist/client/index.html : aucun <link rel="canonical">, ni og:url, og:locale ou og:site_name. title, description, og:title, og:description, og:type et twitter:card sont déclarés deux fois (__root.tsx:82-88 et index.tsx:8-13). TanStack ne garde que la version de la route enfant (headContentUtils.js : boucle inversée et metaByAttribute), ce qui fonctionne mais rend chaque modification ambiguë.
- **Problème** : Sans canonical ni og:url, les variantes (…/index.html, ?utm_source=linkedin, avec ou sans slash final) sont des URL distinctes pour Google et LinkedIn : statistiques de partage dispersées, risque d’aperçus différents. og:locale absent : LinkedIn et Facebook supposent en_US.
- **Recommandation** : Dans __root.tsx, ne garder que charset, viewport, theme-color (PERF-10), la feuille de style, les preloads de polices et les icônes. Dans index.tsx, toutes les meta de la page, construites par une fonction pure buildPageHead(seo, profile) dans src/lib/seo.ts : title, description, og:type website, og:site_name = profile.name, og:locale fr_FR, og:url = seo.siteUrl, og:title, og:description, les balises image de PERF-01, twitter:card, et links [{ rel: "canonical", href: seo.siteUrl }]. Vérifier dans dist/client/index.html qu'il n'y a qu'une seule balise de chaque. À regrouper avec PERF-01 et PERF-09.

### PERF-09 · Meta description trop longue (183 caractères), tronquée dans Google

🟡 amélioration · tous · effort S · Vérifié

- **Preuve** : src/data/portfolio.ts:120-121 : 183 caractères. Google coupe vers 155-160 caractères (environ 920 px), donc la fin « …mes résultats et mon parcours international » disparaît.
- **Problème** : La partie coupée contient justement l’argument différenciant (résultats, international).
- **Recommandation** : Remplacer par une phrase de 154 caractères avec les mêmes faits : « Portfolio de Fiona Talbi, marketing 360 et communication à Paris : projets Logitech, CosmétiCar et Massilia, résultats chiffrés et parcours international. » Garder socialDescription (110 caractères, avec les chiffres) pour og/twitter.

### PERF-11 · Pages 404 et d’erreur en anglais et génériques ; aucune 404.html sur GitHub Pages

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : dist/client ne contient pas de 404.html : GitHub Pages sert sa page 404 GitHub par défaut, en anglais. __root.tsx:17-37 « Page not found / Go home » et __root.tsx:39-75 « This page didn’t load / Try again » en utilitaires Tailwind (rounded-md, bg-primary), hors charte. src/lib/error-page.ts:3 `<html lang="en">` et :25 `href="/"` (ignore la base /fiona-talbi-portfolio/, utilisé seulement en SSR et dans l’aperçu Lovable).
- **Problème** : Un lien tronqué ou mal copié (fréquent depuis LinkedIn ou un PDF de CV) mène à une page GitHub anglaise sans lien vers le portfolio : le recruteur est perdu. Une erreur d’hydratation afficherait un écran anglais hors charte.
- **Recommandation** : 1) public/404.html statique (environ 2 Ko, sans JS, CSS inline aux couleurs du site, police système) : <html lang="fr">, <meta name="robots" content="noindex">, titre « Page introuvable — Fiona Talbi », texte « Cette page n'existe pas ou a été déplacée. », bouton « Revenir au portfolio » avec href="/fiona-talbi-portfolio/" en absolu, et lien mailto. Noter en commentaire HTML que ce chemin doit changer si la base change (PERF-17). 2) NotFoundComponent et ErrorComponent en français (« Page introuvable » / « Retour au portfolio », « Un problème est survenu » / « Réessayer ») avec les classes .action et .action-primary du site, en conservant le useEffect reportLovableError, router.invalidate() et reset(). 3) error-page.ts : lang="fr", textes en français, href=`${import.meta.env.BASE_URL}` (disponible aussi dans le bundle SSR) au lieu de "/" ou "./".

### PERF-V2 · Futurs PDF de recommandation : indexés par Google, sans titre ni limite de poids

🟡 amélioration · tous · effort S · Ajout

- **Preuve** : sections.tsx:193-218 : lien direct vers import.meta.env.BASE_URL + documentPath (fichier de public/), ouvert en target="_blank". GitHub Pages ne permet pas d'envoyer d'en-tête X-Robots-Tag, et le robots.txt du projet est ignoré (PERF-12). Une fois liés depuis la page, les PDF sont donc indexables tels quels.
- **Problème** : Une lettre scannée pèse souvent 2 à 10 Mo, ce qui est lent à ouvrir sur mobile. Elle porte souvent les coordonnées personnelles du recommandant (téléphone, e-mail, signature), qui deviendraient trouvables sur Google. L'onglet affiche aussi le nom de fichier ou un titre interne (« Scan_0012.pdf ») au lieu d'un intitulé propre.
- **Recommandation** : Avant d'ajouter un PDF (fourni par Fiona, jamais rédigé) : 1) obtenir l'accord du recommandant pour une publication en ligne et masquer son téléphone et son e-mail personnels s'il ne les autorise pas ; 2) compresser sous 1 Mo (`gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -o out.pdf in.pdf`) ; 3) renseigner les métadonnées Title (« Recommandation — Prénom Nom, Entreprise ») et Language fr ; 4) nommer le fichier sans espace ni accent (public/recommandations/logitech.pdf). À défaut d'accord, garder documentPath: null (demande par e-mail).

### PERF-06 · @tanstack/react-query embarqué sans aucune requête

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : router.tsx:1,6,10 et __root.tsx:1,77,122-130 : QueryClient/QueryClientProvider sans aucun useQuery dans src (grep). Build d’essai sans react-query : index.js 350 917 → 326 311 octets (−24,6 Ko bruts, gzip 111,4 → 104,4 Ko). Couverture JS : 34,6 % du bundle principal exécuté.
- **Problème** : Environ 7 Ko gzip à télécharger, analyser et exécuter sur mobile avant l’hydratation, sans aucun usage. Les long tasks mobiles (4 tâches, la plus longue de 231 ms, TBT 274-302 ms avec CPU ×4) se font juste avant l’interactivité.
- **Recommandation** : Optionnel. Si Fiona ne prévoit aucune donnée dynamique via Lovable, ne retirer que le code et garder le paquet dans package.json (le tree-shaking l'exclut du bundle, avec le même gain d'environ 24,6 Ko bruts et sans toucher à bun.lock). Concrètement : router.tsx sans QueryClient et sans context ; __root.tsx avec createRootRoute({...}) au lieu de createRootRouteWithContext<{ queryClient: QueryClient }>(), et un RootComponent qui renvoie <Outlet /> en gardant le commentaire « Required: nested routes render here » ; app-routing.test.tsx avec createRouter({ routeTree }). Lancer lint, test, tsc et GITHUB_PAGES=true bun run build. Si Lovable doit pouvoir ajouter des requêtes, ne rien changer.

### PERF-08 · Aucune donnée structurée Person (JSON-LD)

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : Aucun <script type="application/ld+json"> dans dist/client/index.html. TanStack le gère nativement via une entrée meta { "script:ld+json": {...} } échappée en HTML (node_modules/@tanstack/react-router/dist/esm/headContentUtils.js:23-30).
- **Problème** : Une recherche « Fiona Talbi » n’associe pas explicitement le site au profil LinkedIn, au rôle et aux écoles, alors que ce sont des signaux d’entité simples à donner à Google.
- **Recommandation** : JSON-LD minimal, dérivé des données. Dans portfolio.ts, ajouter un champ explicite institution à chaque formation, recopié des chaînes existantes : "IÉSEG School of Management", "GCU", "ESSCA", "Dorset College" (aucun parsing de chaîne). Dans src/lib/seo.ts, buildPersonJsonLd() : { "@context": "https://schema.org", "@type": "Person", name, givenName: profile.firstName, familyName: profile.lastName, jobTitle: profile.role, url: seo.siteUrl, sameAs: [profile.linkedin], address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" }, alumniOf: education.map(e => ({ "@type": "CollegeOrUniversity", name: e.institution })) }. Pas d'email, d'image, de worksFor ni de knowsAbout. Ajout dans index.tsx via { "script:ld+json": buildPersonJsonLd() }, puis vérification avec validator.schema.org.

### PERF-10 · Icônes et couleur de navigateur incomplètes : pas d’apple-touch-icon, de theme-color ni de color-scheme ; favicon SVG fragile

⚪ bonus · mobile, tablette · effort S · Corrigé

- **Preuve** : Seul <link rel="icon" href="favicon.svg"> (__root.tsx:95-99). public/favicon.svg utilise fill="oklch(…)" et un <text> en font-family Arial (rendu dépendant des polices système, Arial absent d’Android). Pas d’apple-touch-icon (iOS : « Ajouter à l’écran d’accueil », signets, aperçus iMessage), pas de meta theme-color ni color-scheme.
- **Problème** : Sur iPhone, un raccourci ou un signet du portfolio affiche une capture floue au lieu du monogramme. La barre d’adresse mobile garde une couleur par défaut au lieu de s’accorder au fond beige, un détail « premium » perdu. Les couleurs oklch et le texte d’un SVG de favicon ne sont pas garantis dans tous les moteurs (favicons Google, anciens Safari).
- **Recommandation** : 1) favicon.svg : couleurs en hex (fond = couleur --foreground ou bordeaux final, texte #FFFFFF) et texte « ft. » converti en <path> (export Figma ou Inkscape). 2) public/apple-touch-icon.png en 180×180, fond plein, même monogramme. 3) Dans __root.tsx : { name: "theme-color", content: "<hex du --background final>" } et links { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` } en plus du SVG existant. Pas de favicon.ico, de manifest ni de PWA. À faire après la décision de palette.

### PERF-12 · robots.txt sans effet sur un site de projet, pas de sitemap ni de vérification Search Console

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : public/robots.txt (14 lignes, Allow partout) est publié en /fiona-talbi-portfolio/robots.txt. Or les robots ne lisent que https://fio-tlb.github.io/robots.txt (racine de l’hôte, qui dépend d’un autre dépôt). Aucun sitemap. vite.config.ts:20-27 ne prérend que « / ».
- **Problème** : Le fichier donne une fausse impression de contrôle (inoffensif, puisque tout est autorisé par défaut). Sans Search Console, impossible de demander l’indexation, de voir les requêtes « Fiona Talbi » ou de suivre les Core Web Vitals réels.
- **Recommandation** : Aucun changement de code obligatoire. Actions pour Fiona : 1) dans Google Search Console, créer une propriété « préfixe d'URL » https://fio-tlb.github.io/fiona-talbi-portfolio/, la valider par fichier HTML (public/google<jeton>.html fourni par Google, à commiter tel quel) ou par la meta google-site-verification dans __root.tsx, puis lancer « Inspection de l'URL » et « Demander une indexation » ; 2) ajouter l'URL du portfolio dans « Coordonnées > Site web » et dans « Sélection » du profil LinkedIn, ainsi que sur le CV. Laisser robots.txt tel quel et ne pas créer de sitemap.

### PERF-13 · Impression et export PDF : missions masquées, LinkedIn absent, pas de marges

⚪ bonus · desktop · effort S · Corrigé

- **Preuve** : Export PDF A4 (Chromium, media print) : 5 pages (capture hors dépôt). Les 4 <details> de projets restent fermés, donc « Voir les missions + » est imprimé sans contenu. .contact-actions est en display:none (styles.css:1607), donc l’URL LinkedIn n’apparaît nulle part. Aucune règle @page : contenu collé au bord (x=0). Les boutons « Voir les projets / Contact » sont imprimés. Le sur-titre « 07 Et si on échangeait ? » se retrouve seul en bas de la page 4.
- **Problème** : Les recruteurs enregistrent souvent un portfolio en PDF pour un comité. La version imprimée perd les missions détaillées et le moyen de contact principal après l’e-mail.
- **Recommandation** : Dans @media print : @page { size: A4; margin: 14mm 12mm; } ; .hero-actions, .project-details > summary { display: none } ; .project-detail-content { display: block } ; laisser .contact-actions masqué et ajouter dans contact-section.tsx un <p className="print-only">LinkedIn : {profile.linkedin}</p> (.print-only { display: none } à l'écran, display: block en impression) ; .section-eyebrow, h2 { break-after: avoid } ; .contact-panel { break-inside: avoid }. Dans Portfolio, un useEffect avec window beforeprint qui ouvre les .project-details et mémorise ceux qui étaient fermés, puis afterprint qui les referme (environ 10 lignes).

### PERF-14 · Tests et CI : rien ne protège le head, le JSON-LD ni le poids des fichiers

⚪ bonus · tous · effort M · Corrigé

- **Preuve** : src/test ne contient que app-routing.test.tsx (correspondance de route) et recommendations.test.tsx. pages.yml:29-35 : lint, test, tsc, build, puis `test -s index.html`, sans aucune vérification du HTML produit ni des poids.
- **Problème** : Les régressions de cette catégorie sont silencieuses : og:image en URL relative, canonical oublié, composant lourd importé (par exemple Dialog Radix pour la vidéo) ou image non optimisée ne cassent ni le lint ni les tests.
- **Recommandation** : Ne garder qu'un test unitaire src/test/seo.test.ts, qui appelle buildPageHead() et buildPersonJsonLd() et vérifie : og:image et twitter:image absolues commençant par seo.siteUrl, canonical = og:url = seo.siteUrl, og:locale = fr_FR, description ≤ 160 caractères, JSON-LD avec name === profile.name, sameAs contenant profile.linkedin, et sans clés image, email ni worksFor. Pas de check-dist.mjs, de budget en CI ni de hero.test.tsx. Les budgets de l'extra servent de repère manuel avant une grosse modification.

### PERF-17 · URL github.io longue dans les aperçus : un domaine personnel renforcerait la marque

⚪ bonus · tous · effort S · Corrigé

- **Preuve** : L’URL affichée sous l’aperçu LinkedIn et dans Google sera fio-tlb.github.io/fiona-talbi-portfolio (39 caractères, pseudo technique). vite.config.ts:13 fixe base "/fiona-talbi-portfolio/". Un domaine à la racine permettrait aussi un robots.txt et un sitemap effectifs (PERF-12).
- **Problème** : Pour un profil marketing et marque, une URL github.io fait « projet technique » et se retient mal à l’oral ou sur un CV papier.
- **Recommandation** : Si Fiona le décide : acheter un domaine (par exemple fionatalbi.fr, disponibilité à vérifier), le déclarer dans Settings > Pages > Custom domain, cocher Enforce HTTPS, créer les enregistrements DNS indiqués par GitHub (sans fichier CNAME dans public/). Dans vite.config.ts:13, passer la base Pages à "/" ; mettre à jour seo.siteUrl et le lien absolu de public/404.html (PERF-11). Canonical, og:url, og:image et JSON-LD suivent s'ils dérivent de seo.siteUrl. Rafraîchir ensuite l'aperçu dans le LinkedIn Post Inspector.

**Constats écartés par le relecteur**

- ~~PERF-16 · 47 composants shadcn et environ 35 dépendances jamais utilisés dans le dépôt~~ — L'auditeur reconnaît lui-même qu'il n'y a aucun impact visiteur (radix, recharts et embla sont absents du bundle client). Dans un dépôt connecté à Lovable, supprimer src/components/ui et une trentaine de dépendances retire la boîte à outils que l'éditeur utilise par défaut : imports cassés à la prochaine génération Lovable, réinstallation probable, et bun.lock à régénérer (sinon `bun install --frozen-lockfile` échoue en CI, pages.yml:29). Coût et risque sans gain pour la lectrice ou le lecteur. PERF-05 (corrigé) suffit à supprimer l'impact CSS.

**Garde-fous de cet angle (à ne pas faire)**

- Ne pas ajouter de librairie d’animation (framer-motion, GSAP, Lottie, Three.js) pour « l’effet waouh » : chacune ajoute 30 à 60 Ko gzip sur un JS initial déjà à environ 105 Ko, et le CSS ou WAAPI existant suffit (use-reveal.ts).
- Ne pas intégrer la vidéo via un iframe YouTube ou Vimeo chargé dès l’arrivée : centaines de Ko de JS tiers, traceurs soumis au consentement CNIL (même youtube-nocookie dépose des identifiants à la lecture), vidéos suggérées d’autres chaînes en fin de lecture.
- Pas d’autoplay vidéo, pas de preload="auto" ou "metadata", pas de modal plein écran au chargement : l’invitation doit rester une proposition discrète qui ne bloque ni le LCP ni la lecture.
- Ne pas mettre loading="lazy" sur l’image du hero (LCP sur desktop) et ne pas ajouter d’autres preload d’images.
- Ne pas inliner le CSS critique, ni ajouter un service worker, un manifest PWA ou AMP : avec un CSS de 11 Ko gzip, le gain n’est pas mesurable et la complexité augmente (cache périmé d’un service worker après chaque push).
- Ne pas migrer vers un autre framework (Astro, Next) pour gagner environ 100 ms de TBT : le coût de réécriture est sans commune mesure avec le gain.
- Ne pas sous-ensembliser les polices à la main (pyftsubset) : gain inférieur à 20 Ko et risque de glyphes manquants (É, œ, ’, —) à chaque modification de texte.
- Ne pas ajouter content-visibility: auto sur les sections : défilement saccadé de la barre de défilement, ancres et calcul de la section active (getBoundingClientRect) moins fiables, pour un gain non mesuré ici.
- Ne pas ajouter de backdrop-filter supplémentaire (widget vidéo, cartes) : le header flouté suffit. Le widget doit avoir un fond opaque.
- Ne pas obfusquer l’adresse e-mail en JavaScript : cela casse le rendu sans JS, la copie et le mailto pour un gain anti-spam marginal.
- Ne pas ajouter Google Analytics, Hotjar ou des pixels : bannière cookies obligatoire et 50 à 100 Ko de plus. Si une mesure d’audience est voulue, privilégier un outil sans cookie et la Search Console (PERF-12).
- Pas de meta keywords ni de bourrage de mots-clés dans le H1 : ignorés par Google, et contraire au ton éditorial.
- Ne pas générer l’image OG dynamiquement (Satori, fonction edge) : GitHub Pages n’a pas de serveur. Une image statique commitée suffit.
- Ne pas versionner plusieurs encodages successifs de la vidéo ni passer par Git LFS : chaque binaire reste à vie dans l’historique Git/Lovable. Ne commiter que le placeholder léger, puis la version finale.
- Ne pas remplacer le menu mobile en <details> (site-header.tsx) par un menu 100 % JS : c’est lui qui rend la navigation fonctionnelle sans JavaScript (testé).

<details><summary>Livrable détaillé de l'auditeur et corrections du relecteur</summary>

## 1. Mesures (Playwright + CDP, serveur local qui imite GitHub Pages : gzip et Cache-Control max-age=600)

Médiane de 3 runs. Mobile = 390×844, DPR 3, CPU ×4. Profils réseau : Slow 4G (150 ms de latence, 1,6 Mb/s) et Fast 3G (562 ms, 1,44 Mb/s). Desktop = 1440×900, réseau câble (28 ms, 5 Mb/s).

| Profil | Métrique | Actuel | Build D (PERF-02, 04, 05, 06) | Build E (D + PERF-03) |
|---|---|---|---|---|
| Mobile Slow 4G | LCP (H1) | **1 468 ms** | 1 156 ms | **964 ms (−34 %)** |
| Mobile Slow 4G | FCP | 932 ms | 940 ms | 964 ms |
| Mobile Slow 4G | TBT (long tasks > 50 ms) | 274 ms (4 tâches, max 231) | 199 ms | 256 ms (bruit ±50) |
| Mobile Slow 4G | Hydratation terminée | 2 169 ms | 1 703 ms | 1 715 ms |
| Mobile Fast 3G | LCP | **2 876 ms** | 1 968 ms | **1 748 ms (−39 %)** |
| Desktop câble | LCP | 652-680 ms (image) | 376 ms | 392 ms (image à 396 ms) |
| Tous | CLS | 0,0000 à 0,0001 | 0,0000 à 0,0001 | 0,0000 à 0,0001 |
| Tous | Transfert initial | **352 Ko** | 224 Ko (mobile) / 211 Ko (desktop) | idem |

Répartition actuelle du transfert : HTML 7,8 Ko · CSS 20,7 Ko · JS 111,9 + 6,9 Ko · polices 37,1 + 25,0 Ko · image **142,2 Ko**.
Après optimisation : HTML 8,1 · CSS 11,6 · JS 105,1 + 7,2 · polices 62,1 · image AVIF 29,8 Ko (mobile) ou 16,9 Ko (desktop).
Défilement de toute la page avec CPU ×4 : p95 de 16,7 ms par frame, 0 frame au-dessus de 33 ms.
Scripts et résultats bruts : (fichier de travail de l'audit, hors dépôt) (perf.mjs, lcpmotion.mjs, coverage.mjs, scrollperf.mjs, perf-results-*.json, exp/d et exp/e).

## 2. Budget de performance recommandé (à vérifier dans scripts/check-dist.mjs)

| Poste | Budget | Actuel → cible mesurée |
|---|---|---|
| LCP labo, mobile Slow 4G + CPU ×4 | ≤ 1,2 s (terrain p75 ≤ 2,5 s) | 1,47 s → 0,96 s |
| CLS | ≤ 0,02 | 0,0000 |
| TBT labo, mobile CPU ×4 | ≤ 250 ms (INP terrain ≤ 200 ms) | 274-302 → 200-260 ms |
| Transfert avant interaction | ≤ 240 Ko | 352 → 224 Ko |
| JS initial (gzip) | ≤ 115 Ko | 118,8 → 112,3 Ko |
| CSS (gzip, bloquant) | ≤ 15 Ko | 20,7 → 11,3 Ko |
| Polices | 2 woff2, ≤ 65 Ko, préchargées | 62,1 Ko |
| Image hero | ≤ 35 Ko mobile / ≤ 50 Ko desktop | 142 → 29,8 / 16,9 Ko |
| HTML (gzip) | ≤ 12 Ko | 7,8 Ko |
| Vidéo avant intention de lecture | **0 octet** (seul le chunk du widget, ≤ 5 Ko gzip, chargé au repos) | — |

Limite non modifiable : GitHub Pages envoie `Cache-Control: max-age=600` même pour les fichiers hachés. Au-delà de 10 minutes, une nouvelle visite revalide les fichiers (réponses 304 légères). C’est acceptable : ne pas ajouter de service worker pour contourner.

## 3. Balises head exactes à ajouter

Prérequis dans `src/data/portfolio.ts` (objet `seo`) : `siteUrl: "https://fio-tlb.github.io/fiona-talbi-portfolio/"`, `locale: "fr_FR"`, `ogImage: "og-image.jpg"`, `ogImageAlt: "Fiona Talbi — Marketing 360 & Communication : +30 % de ventes, 140 top stores activés, 500+ abonnés Instagram"`, `themeColor: "<hex du fond final>"`, et la nouvelle `description` (154 caractères, PERF-09).

**`__root.tsx` (commun)**
```ts
meta: [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }, // viewport-fit pour env(safe-area-inset-bottom) du widget
  { name: "theme-color", content: seo.themeColor },
  { name: "color-scheme", content: "light" },
  // { name: "google-site-verification", content: "<jeton à fournir par Fiona>" },
],
links: [
  { rel: "preload", href: manropeLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "preload", href: dmSansLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: appCss },
  { rel: "icon", href: `${BASE}favicon.ico`, sizes: "32x32" },
  { rel: "icon", href: `${BASE}favicon.svg`, type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: `${BASE}apple-touch-icon.png` },
]
```

**`index.tsx` (page), généré par `buildPageHead()` dans `src/lib/seo.ts`**
```ts
const ogImage = new URL(seo.ogImage, seo.siteUrl).href; // URL absolue obligatoire
meta: [
  { title: seo.title },
  { name: "description", content: seo.description },
  { name: "author", content: profile.name },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: profile.name },
  { property: "og:locale", content: "fr_FR" },
  { property: "og:url", content: seo.siteUrl },
  { property: "og:title", content: seo.socialTitle },
  { property: "og:description", content: seo.socialDescription },
  { property: "og:image", content: ogImage },
  { property: "og:image:type", content: "image/jpeg" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: seo.ogImageAlt },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: seo.socialTitle },
  { name: "twitter:description", content: seo.socialDescription },
  { name: "twitter:image", content: ogImage },
  { name: "twitter:image:alt", content: seo.ogImageAlt },
  { "script:ld+json": buildPersonJsonLd() },
],
links: [{ rel: "canonical", href: seo.siteUrl }]
```

**JSON-LD Person, dérivé uniquement des données existantes**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Fiona Talbi", "givenName": "Fiona", "familyName": "Talbi",
  "jobTitle": "Marketing 360 & Communication",
  "url": "https://fio-tlb.github.io/fiona-talbi-portfolio/",
  "email": "mailto:fiona.2001@live.fr",
  "sameAs": ["https://www.linkedin.com/in/fiona-talbi-246407193"],
  "address": { "@type": "PostalAddress", "addressLocality": "Paris", "addressCountry": "FR" },
  "alumniOf": [
    { "@type": "CollegeOrUniversity", "name": "IÉSEG School of Management" },
    { "@type": "CollegeOrUniversity", "name": "GCU" },
    { "@type": "CollegeOrUniversity", "name": "ESSCA" },
    { "@type": "CollegeOrUniversity", "name": "Dorset College" }
  ],
  "knowsLanguage": ["fr", "en", "es"],
  "knowsAbout": ["Marketing 360 & trade marketing", "Category management", "Social media & contenus", "Relations influenceurs"]
}
```
Pas de clé `image` tant que Fiona n’a pas fourni de vraie photo. Pas de `worksFor` (aucun poste actuel dans les données).

**Fichiers statiques à ajouter dans `public/`** : `og-image.jpg` (1200×630, < 150 Ko), `apple-touch-icon.png` (180×180), `favicon.ico` (32×32), `404.html` (FR, noindex, lien absolu vers `/fiona-talbi-portfolio/`), `sitemap.xml` (1 URL). Le prototype d’image OG (gabarit HTML et script) est dans (fichier de travail de l'audit, hors dépôt) et `og.mjs` (61,6 Ko en PNG, 52 Ko en JPEG).

## 4. Widget vidéo de présentation : impact et recommandation

**Comportement (non invasif, optionnel)**
1. Rien dans le HTML pré-rendu. Un composant `IntroVideoPrompt` monté côté client, puis affiché après `requestIdleCallback` (repli : 2 s après `load`). Jamais avant le LCP, jamais en modal.
2. Une invitation compacte en bas à droite (`position: fixed`, donc CLS nul) : « Découvrir Fiona en 60 s » avec les boutons « Regarder » et « Plus tard ». Clic sur « Plus tard » : l’invitation se réduit en pastille ronde de 56 px (miniature du poster et icône lecture). Croix pour masquer. Préférence stockée en `localStorage` (`introVideo: "later" | "dismissed" | "seen"`, lecture et écriture dans un try/catch). Placement : `right: 16px; bottom: max(16px, env(safe-area-inset-bottom))`, `z-index` sous le header, cibles ≥ 44 px, fond opaque. Elle ne doit jamais recouvrir le bouton « Contact » du header ni les CTA de la section contact (masquer la pastille quand `activeSection === "contact"`).
3. Clic sur « Regarder » : `React.lazy(() => import("./intro-video-dialog"))` charge un chunk séparé (≤ 3 Ko gzip, `<dialog>` natif : focus piégé et Échap gratuits, aucune dépendance Radix). Puis `<video controls playsInline preload="none" poster>` avec `<track kind="captions" srclang="fr" default>`. Lecture lancée par le clic (geste utilisateur, son autorisé), jamais en autoplay.
4. `prefers-reduced-motion` : pas d’animation d’apparition de l’invitation. Sans JS : rien ne s’affiche (pas de lien mort).

**Formats et poids cibles (vidéo de 60-90 s)**
- MP4 H.264 720p, universel : `ffmpeg -i source.mov -vf "scale=-2:720,fps=30" -c:v libx264 -profile:v high -preset slow -crf 23 -maxrate 1.8M -bufsize 3.6M -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart public/video/presentation-720.mp4` (environ 1,2-1,5 Mb/s, soit **8 à 12 Mo**).
- WebM AV1 optionnel (environ −40 % pour Chrome, Firefox et les Safari récents compatibles) : `ffmpeg -i source.mov -vf "scale=-2:720,fps=30" -c:v libsvtav1 -crf 35 -preset 6 -c:a libopus -b:a 64k public/video/presentation-720.webm`, déclaré en premier avec `type='video/webm; codecs="av01.0.05M.08, opus"'`, le MP4 venant ensuite en repli.
- Vidéo verticale (selfie) : 720×1280 avec les mêmes réglages. Dans ce cas, le dialog mobile s’affiche en plein écran et le desktop dans une colonne de 420 px.
- Poster : une image de la vidéo en AVIF 720p, qualité ~50, **≤ 25 Ko**, chargée seulement quand l’invitation apparaît.
- Sous-titres WebVTT en FR, environ 2 Ko (accessibilité et lecture sans son en open space).
- Placeholder en attendant la vraie vidéo : `ffmpeg -f lavfi -i color=c=0xF3EDE4:s=1280x720:r=30:d=12 -f lavfi -i sine=frequency=220:duration=12 -c:v libx264 -crf 23 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart -shortest public/video/presentation-720.mp4` (**186 Ko** mesuré). Chemin et durée déclarés dans `src/data/portfolio.ts` (`introVideo: { src, poster, captions, durationLabel }`), avec `import.meta.env.BASE_URL` comme préfixe.

**Hébergement**
| Option | Pour | Contre |
|---|---|---|
| **GitHub Pages (recommandé)** | 0 tiers, 0 cookie, aucune bannière RGPD ; même CDN que le site ; gratuit | Fichier < 100 Mo (blocage git, avertissement dès 50 Mo), site ≤ 1 Go, bande passante « soft » de 100 Go/mois (≈ 8 000 lectures complètes de 12 Mo, largement suffisant) ; chaque binaire reste à vie dans l’historique Git/Lovable ; vérifier la prise en charge des Range requests après déploiement (`curl -I -H "Range: bytes=0-1" …/presentation-720.mp4` doit répondre 206) |
| Vimeo (`?dnt=1`, façade) | Débit adaptatif, statistiques | Logo Vimeo sauf offre payante, JS tiers au clic, mention de transfert de données à prévoir |
| YouTube / youtube-nocookie | Gratuit | Plusieurs centaines de Ko de JS, identifiants déposés à la lecture (consentement CNIL), suggestions d’autres vidéos : **à éviter** |

**Recommandation finale** : auto-hébergement sur GitHub Pages d’un MP4 H.264 720p ≤ 12 Mo, avec `+faststart`, un WebM AV1 optionnel, un poster AVIF ≤ 25 Ko et des sous-titres VTT. `preload="none"`, lecteur chargé à la demande dans un `<dialog>` natif, invitation montée au repos. Impact sur le chargement initial : **0 octet de vidéo**, environ 1 Ko de JS pour l’invitation et 0 de CLS. Ne commiter que le placeholder (186 Ko), puis la version finale validée, sans versions intermédiaires.

**Corrections du relecteur sur ce livrable :**

Points justes de l'extra : le tableau de mesures existe vraiment dans le scratchpad (perf-results-base.json : LCP 1 468 ms, FCP 932 ms, transfert 351 813 octets), les builds d'essai sont reproductibles (exp/b : CSS de 38 597 octets ; exp/d : tsc OK et plus de preload d'image), et la recommandation d'hébergement de la vidéo (GitHub Pages, 0 tiers) est la bonne. Corrections à apporter :

1. Mesures. Ce sont des mesures de labo sur un serveur local, pas sur le CDN de GitHub Pages. Sur mon banc (même viewport, CPU ×4, 150 ms, 1,6 Mb/s), le FCP est de 2,1 s et non 0,93 s. Le rapport LCP − FCP (+552 ms avec animation, 0 en reduced motion) confirme la tendance, mais les valeurs absolues dépendent du banc. Présenter les chiffres comme des ordres de grandeur, jamais comme des promesses (« −34 % de LCP »). Attribution erronée : le LCP desktop 652 → 376 ms vient surtout de l'image (142 Ko → 17 Ko), pas des polices. Le tableau doit aussi montrer le FCP desktop dégradé (284 → 376 ms) par le preload des polices.

2. Budget de performance : le retirer de la CI (voir PERF-14). Il est déjà incohérent : TBT de 256 ms en build E pour un budget de 250 ms, et JS initial de 112,3 Ko pour 115 Ko, soit 2,7 Ko de marge. Le garder comme repère manuel uniquement.

3. Balises head : retirer viewport-fit=cover (il étend la page sous l'encoche en paysage et oblige à ajouter des marges safe-area au header fixe et à la barre de progression ; inutile pour un widget à bottom: 16px). Retirer la ligne favicon.ico (PERF-10). Le commentaire « preload avant la feuille de style » ne se contrôle pas : TanStack les émet après les modulepreload (exp/d), et ce n'est pas un problème. La meta author peut rester dans index.tsx.

4. JSON-LD : l'exemple affiche « Dorset College », mais la règle de dérivation (« école avant · ») donnerait « Dublin » (portfolio.ts:299-305). Utiliser un champ institution explicite. Retirer email et knowsAbout. knowsLanguage demanderait une correspondance explicite des id french, english et spanish vers fr, en et es : facultatif.

5. Image OG : trop de texte pour la miniature LinkedIn (libellés KPI de 6 à 8 px une fois réduits), et une palette de la roadmap qui ne correspond pas au site actuel en violet. Générer l'image après la décision de DA, avec un nom de fichier versionné (voir PERF-01 corrigé).

6. Widget vidéo. (a) Pas de React.lazy : 1-3 Ko ne justifient pas un chunk, et l'import asynchrone après le clic peut faire refuser video.play() avec le son sur iOS Safari. Le <dialog> et la <video preload="none"> sont rendus côté client avec l'invitation, et le clic appelle showModal() puis play() de façon synchrone. (b) Pas de WebM AV1 : un deuxième binaire de plusieurs Mo dans l'historique, pour un gain marginal sur une seule vidéo ; un MP4 H.264 ≤ 10 Mo suffit. (c) « Focus piégé gratuit » : showModal() rend bien le reste de la page inerte, mais il faut ajouter video.pause() à l'événement close et vérifier le retour du focus sur le déclencheur. (d) Placeholder : pas de son sinusoïdal (-an) et pas de publication en production tant que la vraie vidéo n'est pas fournie (PERF-V1). (e) Vérifier, avant de commiter un MP4 de 8 à 12 Mo, que la synchronisation GitHub ↔ Lovable l'accepte (non vérifiable ici). Un seul commit de la version finale. (f) Le test des requêtes Range (réponse 206) après déploiement est une bonne pratique : à garder.

7. Points forts à nuancer : « défilement fluide, p95 16,7 ms » a été mesuré en Chromium headless avec un ralentissement CPU seulement. Cela prouve l'absence de long tasks sur le thread principal pendant le défilement, mais ne mesure pas le coût GPU du backdrop-filter: blur(24px) saturate(1.5) du header fixe (styles.css:136-140) sur un Android milieu de gamme. Reformuler en « aucune long task pendant le défilement » et conseiller un test sur un vrai téléphone (débogage à distance de Chrome) avant d'ajouter tout autre flou. « 47 composants shadcn » : src/components/ui en contient 46.

8. Synthèse : le « juste milieu » consiste à garder en priorité le head de partage (PERF-01, 07 et 09), l'image du hero (PERF-02, appliqué à l'image finale), le H1 visible dès le premier rendu (PERF-03) et le cadrage de la vidéo (PERF-15 et V1). Le preload des polices (PERF-04) et l'exclusion du scan Tailwind (PERF-05) sont de petites améliorations à valider par mesure. react-query (PERF-06), les icônes (PERF-10), l'impression (PERF-13), le JSON-LD (PERF-08) et le domaine (PERF-17) sont des bonus. La suppression de tw-animate-css, la suppression de components/ui (PERF-16), les budgets en CI et le favicon.ico sont à écarter : risque Lovable ou CI pour un gain nul ou presque.

</details>

## Vidéo de présentation

_La fonctionnalité s'intègre sans difficulté : le site n'a que deux éléments fixes (skip-link en z-index 200, header en 100), il est pré-rendu et lisible sans JS, et dispose déjà d'un modèle de défilement passif limité à une fois par frame, d'une règle reduced-motion globale et de tests vitest. Les mesures montrent quatre pièges concrets. (1) Une carte en bas à droite affichée au chargement recouvre les KPIs à 390×844 et à 1440×900 : il faut la conditionner à une zone libre. (2) En fin de page, la pastille masque « Retour en haut » sur mobile et tablette. (3) La preflight Tailwind (margin: 0 sur *) casse le centrage natif du <dialog>. (4) Une <video> présente dans le DOM, même dans un dialog fermé, télécharge poster et sous-titres, et une partie du MP4 avec preload=metadata. La conception retenue : une carte non modale qui n'apparaît que lorsque la zone est libre, « Plus tard » qui la replie en pastille à deux cibles de 44 px (rond de 52 px pendant la descente, masquée au-dessus du pied de page et sous le menu mobile), un <dialog> natif centré en 9:16 sur desktop et plein écran sur mobile, une vidéo montée seulement à la première ouverture, une mémoire versionnée dans localStorage sous try/catch, et un lien permanent dans le hero qui fonctionne sans JS. Point d'éthique bloquant : la vidéo de test (clip neutre généré, 236 Ko) doit rester limitée au développement, car chaque push sur main est publié sur GitHub Pages._

### VID-01 · À l'arrivée, une carte fixe en bas à droite recouvrirait les chiffres clés

🔴 critique · mobile, desktop · effort M · Corrigé

- **Preuve** : Mesures Playwright (audit/video-intro/measure.json) : à 390×844, .impact-strip occupe y 498→800 et une carte de 344×144 px posée à 12 px du bas commence à y 688. Elle masque toute la 2ᵉ rangée (« 500+ », « 3+ ans ») : capture proto/m390-1-invite-fold.png. À 1440×900, la bande va de y 736 à 868 et la carte (x 1076→1420, y 707→880) masque le KPI « 3+ ans » (proto/d1440-1-invite-fold.png). À 375×667, la bande va de 494 à 796 pour un viewport de 667 px. En revanche, à 768×1024 (haut de carte 831 > bas de bande 756), 1280×720 (bande sous la ligne de flottaison) et 1920×1080 (marge droite de 370 px, la carte tient de x 1556 à 1900), il n'y a aucun chevauchement.
- **Problème** : Afficher l'invitation sur une minuterie seule cache les résultats chiffrés, c'est-à-dire l'argument principal du hero (contrainte « conserver les KPIs », « résultats avant la photo »), au moment précis où le recruteur les lit. C'est exactement l'effet « invasif » que l'utilisatrice veut éviter.
- **Recommandation** : Une seule règle de déclenchement. L'invitation apparaît au plus tôt 2 500 ms après l'hydratation : l'entrée du hero se termine à 720 ms, soit enter-4 (170 ms de délai) + 550 ms (styles.css:1138-1166). Elle attend aussi que le bas de .impact-strip soit au-dessus de la zone réservée à la carte, soit strip.getBoundingClientRect().bottom ≤ innerHeight − 200 (200 px = carte de 173 px au plus + 20 px de marge, arrondi). On vérifie à l'expiration du délai, puis dans un seul écouteur scroll passif limité à une fois par frame, sur le modèle de use-portfolio-navigation.ts:52-59. Résultats : apparition immédiate à 768×1024 (756 ≤ 824) et à 1920×1080 (868 ≤ 880), après environ 168 px de défilement à 1440×900, environ 218 px à 1024×768 et environ 156 px à 390×844. Si, au moment où la condition est remplie, scrollY > innerHeight (arrivée par une ancre, défilement rapide) ou si matchMedia('(max-height: 520px)') est vrai, on affiche directement la pastille, sans carte. L'écouteur reste ensuite actif pour le repli de VID-19, puis il est retiré. Ne pas ajouter d'IntersectionObserver à rootMargin calculé, de condition sur .site-footer pour la carte (le cas est couvert par la règle scrollY > innerHeight) ni de condition visibilityState. Formuler l'objectif comme « la carte n'apparaît jamais par-dessus les chiffres clés », et non « ne les recouvre jamais » : en remontant, la bande repasse forcément sous un élément fixe.

### VID-02 · La vidéo de test serait publiée telle quelle sur le site public

🔴 critique · tous · effort S · Corrigé

- **Preuve** : .github/workflows/pages.yml:4-5 déclenche un déploiement à chaque push sur main (AI_README.md, ligne « Publication »). Les contraintes du projet interdisent d'inventer des faits (AGENTS.md, AI_README.md « n'inventez pas… »). La demande autorise « n'importe quoi comme vidéo » pour l'instant.
- **Problème** : Un placeholder présenté comme « Fiona se présente », et pire encore une vidéo d'archive montrant une autre personne, serait vu par des recruteurs comme la présentation de Fiona : c'est un contenu trompeur. Inversement, une invitation « Bonjour, moi c'est Fiona » qui ouvre une mire de test fait amateur.
- **Recommandation** : Ajouter isPlaceholder: boolean à IntroVideo. Calculer au rendu, et non en constante de module : const enabled = introVideo !== null && (!introVideo.isPlaceholder || import.meta.env.DEV). Si enabled vaut false, on ne rend rien : ni carte, ni pastille, ni lien dans le hero. Le placeholder est un clip neutre généré (monogramme « ft. », texte « Vidéo de test », compteur de temps), sans personne filmée et avec des sous-titres explicites. Le lecteur s'intitule « Vidéo de test du lecteur » et affiche la durée réelle (« 20 s »). Dans le récapitulatif livré à Fiona, préciser que la vidéo de test est visible avec `bun run dev`, et dans l'aperçu Lovable si celui-ci est en mode dev (à vérifier). Elle n'apparaîtra sur fio-tlb.github.io qu'après le remplacement par la vraie vidéo : isPlaceholder: false, nouvel id et durationSeconds mesurée avec ffprobe.

### VID-03 · La preflight Tailwind casse le centrage natif du <dialog>

🟠 important · tous · effort S · Vérifié

- **Preuve** : src/styles.css:1 importe tailwindcss, dont node_modules/tailwindcss/preflight.css:7-15 applique « margin: 0; padding: 0 » à *, ::backdrop. Dans le prototype injecté sur la page réelle, le dialog ouvert avec showModal() s'est collé en haut à gauche (x 0, y 0) au lieu d'être centré. Avec « margin: auto; width: fit-content », il est centré, en 416×798 px à 1440×900 (proto/d1440-5-dialog.png). Autre piège constaté : « width: auto » avec les inset natifs étire le dialog sur toute la largeur.
- **Problème** : Le comportement par défaut du <dialog> (centrage, taille au contenu) ne s'applique pas dans ce projet. Une implémentation naïve livrerait un lecteur mal placé, et un ::backdrop sans fond défini.
- **Recommandation** : Sur .intro-video-dialog : margin: auto; padding: 0; width: fit-content; max-width: calc(100vw - 48px); max-height: calc(100dvh - 48px); overflow: hidden; border-radius: 24px; et ::backdrop { background: oklch(0.2 0.02 285 / 72%) }. Sous 720 px : margin: 0; width: 100%; height: 100dvh; max-width: none; max-height: none; border-radius: 0; plus padding en env(safe-area-inset-top/bottom). Ajouter html:has(.intro-video-dialog[open]) { overflow: hidden } pour bloquer le défilement de la page.

### VID-04 · Une <video> dans le DOM télécharge des ressources avant toute intention, même dans un dialog fermé

🟠 important · tous · effort S · Corrigé

- **Preuve** : Test Chromium (audit/video-intro/dialog-test.mjs) : avec <video preload="none" poster> placée dans un <dialog> fermé, le poster et le .vtt sont chargés dès l'affichage de la page. Avec preload="metadata", le MP4 est en plus demandé (« Range: bytes=0- ») avant le moindre clic.
- **Problème** : Si le lecteur est rendu d'avance (ou pré-rendu), chaque visite paie poster, sous-titres et une partie de la vidéo, ce qui va contre la demande « pas de chargement avant l'intention ». Sur une vraie vidéo de 8 Mo, le premier segment récupéré n'est pas négligeable sur mobile.
- **Recommandation** : Ne rendre la <video> qu'à la première ouverture (état open), puis la garder montée, cachée avec le dialog fermé : currentTime est ainsi conservé pendant la visite sans aucun stockage. Pour la carte et la pastille, utiliser une <img> du poster (WebP de 360 px, 4,2 Ko pour le placeholder, width et height, decoding async, alt vide) rendue côté client seulement quand elles apparaissent. Pas de règle Save-Data ni effectiveType.

### VID-05 · Lecteur : <dialog> natif plutôt que Radix ou vaul, avec gestion explicite du focus

🟠 important · tous · effort M · Vérifié

- **Preuve** : Test Chromium (dialog-test.mjs) : après showModal(), :modal est vrai, elementFromPoint(200,30) renvoie DIALOG au-dessus d'un header fixe en z-index 100 transformé (comme .site-header, styles.css:124-136), autofocus place le focus sur « Fermer », et Échap ferme en rendant le focus au bouton d'origine. Les composants src/components/ui/dialog.tsx et drawer.tsx existent mais ne sont utilisés nulle part dans le portfolio. jsdom 20.0.3 (node_modules/jsdom/package.json) n'implémente pas showModal (0 occurrence dans HTMLDialogElement-impl.js).
- **Problème** : Une modale en z-index classique entrerait en conflit avec le header (z-index 100, contexte d'empilement créé par transform) et le skip-link (z-index 200), et ajouterait une dépendance pour rien. Autre risque : la carte est remplacée par la pastille pendant la lecture, et le focus rendu à un élément démonté tomberait sur body.
- **Recommandation** : Utiliser <dialog class="intro-video-dialog" aria-labelledby> avec showModal() : top layer, fond inerte, Échap natif via l'événement cancel. Focus initial sur « Fermer la vidéo » (autoFocus). À la fermeture, si l'élément d'origine n'est plus dans le DOM, donner le focus au bouton de lecture de la pastille. Simuler showModal, close, play et pause dans src/test/setup.ts. Carte et pastille en z-index 90 : sous le header et son menu, au-dessus de .project-cover-bottom (z-index 1, styles.css:544-546).

### VID-06 · La pastille recouvre le lien « Retour en haut » en bas de page

🟠 important · mobile, tablette · effort S · Corrigé

- **Preuve** : Page défilée jusqu'en bas (measure.json, atEnd) : à 390×844, le lien du pied de page occupe x 270→370, y 766→810 et une pastille à 12 px du coin le recouvre (proto/m390-4-widget-end.png : le lien n'est plus visible et la signature est tronquée). À 1024×768, lien x 884→984 / y 690→734 contre un rond en x 952→1004 / y 696→748. À 768×1024, lien x 628→728 / y 946→990. À 1440, aucun conflit : le lien s'arrête à x 1310 et le rond commence à 1368.
- **Problème** : Le lien « Retour en haut » (portfolio.tsx:55-58, cible de 44 px) devient inaccessible au toucher au moment où on en a besoin, et la pastille vient distraire de la section Contact, qui est la conversion visée.
- **Recommandation** : Un seul IntersectionObserver (threshold 0) sur .site-footer, qui pose data-away=true sur la pastille, avec un garde if ('IntersectionObserver' in window). En CSS : .intro-widget[data-away=true]:not(:focus-within) { opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity 180ms, transform 180ms, visibility 0s 180ms; }. visibility: hidden retire la pastille de l'ordre de tabulation. Rien à prévoir pour la carte : ce cas est couvert par VID-01 (défilement de plus d'un écran → pastille directe).

### VID-08 · Pastille : deux cibles séparées de 44 px, repli en rond de 52 px pendant la descente

🟠 important · tous · effort M · Corrigé

- **Preuve** : Prototype : la pilule [vignette + « Ma vidéo · 1 min » | ✕] mesure 220×52 px (x 158→378 à 390 px, x 1200→1420 à 1440 px), alors que la colonne de texte mobile va de x 20 à 370 (marge droite de 20 px). En rond de 52×52 (proto/m390-3b-widget-compact.png), elle couvre 4 fois moins de surface. À 1440, la marge droite fait 130 px : le rond (x 1368→1420) ne touche aucun contenu, la pilule si. Le viewport (src/routes/__root.tsx:81) n'a pas viewport-fit=cover.
- **Problème** : Une pastille ronde avec une petite croix en coin crée des cibles qui se chevauchent ou font moins de 44 px (contrainte du projet). Une pilule toujours dépliée masque en continu la fin des lignes sur mobile.
- **Recommandation** : Une pastille de forme fixe, sans logique liée au défilement : un conteneur de 52 px de haut (padding 4 px, border-radius 100px, fond var(--card), bordure 1px var(--border)) avec deux <button> distincts de 44×44 px. Le premier est une vignette ronde du poster avec un petit ▶ (aria-label et title « Regarder ma vidéo de présentation (1 min) ») ; le second est un ✕ (aria-label « Masquer la vidéo flottante »). Elle mesure environ 100×52 px, sans libellé visible : l'utilisatrice vient de cliquer « Plus tard » sur une carte au même endroit, donc le sens est acquis, et le lien du hero reste l'entrée explicite. Position : right et bottom à 20 px au-dessus de 720 px de large, à 12 px en dessous. Ne pas ajouter viewport-fit=cover : il devient alors inutile d'écrire env(safe-area-inset-*), qui vaut 0 sans lui. Pas de vidéo en boucle et aucune animation en dehors de l'apparition (fondu de 180 ms).

### VID-10 · Entrée permanente dans le hero : un vrai lien vers le MP4, placé dans .hero-actions

🟠 important · tous · effort S · Corrigé

- **Preuve** : hero.tsx:21-30 : .hero-actions contient 2 boutons. À 390 px : 154 + 112 + 10 = 276 px sur 350 disponibles. .hero-meta : 89 + 16 + 159 = 264 px sur 350 ; une 3ᵉ entrée d'environ 230 px passe donc à la ligne dans les deux cas. À 1440 px, la colonne fait 625 px et 170 + 124 + 10 + ≈230 = 534 px tiennent sur une ligne. À 1024 px (506 px), retour à la ligne. dist/client/index.html contient le texte du hero : la page est pré-rendue et lisible sans JS.
- **Problème** : Sans entrée fixe, une personne qui a fermé la pastille, qui a JS désactivé, qui est en Save-Data ou qui arrive par une ancre n'a aucun moyen de voir la vidéo. Placé dans .hero-meta, le lien hériterait d'un texte de 12 px et ferait passer la ligne de 18 à 44 px.
- **Recommandation** : Ajouter en 3ᵉ enfant de .hero-actions un <a class=hero-video-link href={import.meta.env.BASE_URL + src}>. C'est un vrai lien vers le MP4, utile sans JS ; avec JS, onClick fait preventDefault() puis ouvre le dialog. Contenu : une pastille ronde de 32 px avec l'icône Play de lucide, suivie du libellé court « Vidéo · 1 min ». min-height de 48 px, sans bordure et sans flèche diagonale. Sous 1000 px de large, le libellé passe en .sr-only et le lien devient un rond de 48×48 px sur la même ligne que les deux CTA. Mesuré : aucun retour à la ligne à 390, 844 et 1024 px, et la bande KPI ne bouge pas. Nom accessible constant : « Voir ma présentation en vidéo (1 min) ». Libellé fixe, sans variante « Revoir ».

### VID-11 · Pré-rendu statique : aucun élément flottant dans le HTML, état lu après hydratation

🟠 important · tous · effort S · Vérifié

- **Preuve** : vite.config.ts:20-26 pré-rend « / » pour Pages ; dist/client/index.html (35 Ko) contient le hero complet. Les effets côté client du projet passent tous par useEffect (contact-section.tsx:10-12 pour canCopy, use-portfolio-navigation.ts:15).
- **Problème** : Une carte ou une pastille rendue côté serveur apparaîtrait puis disparaîtrait chez les visiteurs ayant choisi « fermé » ou « vu » (flash), ou provoquerait un écart d'hydratation si le choix était lu dans localStorage pendant le rendu.
- **Recommandation** : État initial « idle » identique côté serveur et au premier rendu client, avec IntroVideo qui renvoie null. Le stockage est lu dans un useEffect, puis la transition se fait vers waiting, minimized ou hidden. Seul le lien du hero est rendu côté serveur ; son libellé peut passer à « Revoir… » après le montage, ce qui ne pose pas de problème d'hydratation. Test : renderToString(<Portfolio/>) ne contient ni intro-invite ni intro-widget.

### VID-12 · Mémoire des choix versionnée, robuste et synchronisée entre onglets

🟠 important · tous · effort S · Corrigé

- **Preuve** : Le projet n'a aucune persistance aujourd'hui (aucun localStorage dans src/). La consigne demande de ne pas re-proposer l'invitation à chaque visite. localStorage lève une exception quand les données de site sont bloquées.
- **Problème** : Sans versionnement, une vraie vidéo publiée après le placeholder ne serait jamais proposée à quelqu'un ayant fermé la vidéo de test. Sans try/catch, une SecurityError casse tout le composant. Sans synchronisation, deux onglets se contredisent.
- **Recommandation** : Une clé par vidéo : localStorage['ft-intro-video:' + introVideo.id] = 'later' | 'dismissed'. Changer l'id suffit à re-proposer une nouvelle vidéo, sans JSON ni comparaison. readChoice() et writeChoice() passent par try/catch, avec repli sur une variable en mémoire. La lecture se fait dans un useEffect après l'hydratation. Avec later, la pastille s'affiche directement, sans carte. Avec dismissed, rien ne flotte ; seul le lien du hero reste. À la fin de la lecture (ended), écrire dismissed. Pas d'écouteur storage, pas de position persistée, pas de updatedAt.

### VID-13 · Accessibilité de l'invitation : région repérable, sans vol de focus ni annonce intrusive

🟠 important · tous · effort M · Corrigé

- **Preuve** : portfolio.tsx:28-32 : skip-link, puis SiteHeader, puis <main id="contenu" tabIndex={-1}>. Le modèle Échap et clic extérieur existe déjà pour le menu (site-header.tsx:26-48). Le style :focus-visible global se trouve en styles.css:95-99.
- **Problème** : Une invitation en role="dialog" ou aria-live interromprait la lecture d'écran à l'arrivée. Placée en fin de DOM, elle serait introuvable au clavier. « Plus tard » démonte le bouton qui a le focus.
- **Recommandation** : Rendre <aside class=intro-invite aria-labelledby=intro-invite-title> entre <SiteHeader/> et <main>, sans role=dialog ni aria-live. Deux boutons seulement, « Regarder » et « Plus tard », sans croix. Échap, quand le focus est dans la carte, équivaut à « Plus tard ». Si la carte avait le focus au moment où elle disparaît (Plus tard, Échap ou repli automatique), donner le focus au bouton de lecture de la pastille. Le ✕ de la pastille envoie le focus sur main#contenu avec preventScroll. Pas de zone role=status.

### VID-14 · Son, iOS et sous-titres : lecture déclenchée par le clic, playsInline, sous-titres actifs par défaut

🟠 important · mobile, tous · effort S · Vérifié

- **Preuve** : dialog-test.mjs : le <track default> en même origine se charge sans configuration. Le serveur local :4173 ignore les en-têtes Range (« Range: bytes=0-9 » renvoie 200 et 270 octets). github.io n'est pas joignable depuis le bac à sable (403 du proxy), donc la réponse 206 de Pages n'a pas pu être vérifiée.
- **Problème** : Si play() est appelé hors du gestionnaire de clic (après un await, par exemple), iOS bloque le son. Sans playsInline, iOS passe en plein écran natif et la barre de titre, la fermeture et l'écran de fin disparaissent. Beaucoup de recruteurs regardent sans le son, en open space. Safari exige des réponses 206 pour lire une vidéo.
- **Recommandation** : Dans le gestionnaire du clic, de façon synchrone : monter la vidéo (flushSync), appeler showModal(), puis video.play(). Ne jamais mettre muted ni autoplay. Si la promesse de play() est rejetée, laisser la vidéo en pause avec ses contrôles natifs, sans message. Utiliser <video controls playsInline preload="metadata">, <track kind="captions" srcLang="fr" label="Français" default>, et une transcription dans un <details> si transcript est renseigné (à fournir par Fiona). Avant la mise en ligne de la vraie vidéo, la tester sur un iPhone depuis l'URL Pages.

### VID-V1 · Le lecteur est rogné quand la fenêtre est peu haute (téléphone en paysage, petit portable)

🟠 important · mobile, desktop · effort S · Ajout

- **Preuve** : Le CSS de l'extra (§5) a été injecté sur la page réelle (audit/video-intro-verif/dialog.mjs → dialog.json, capture dialog-844x390.png). À 844×390, la règle plein écran (max-width: 720px) ne s'applique pas : la vidéo fait min(82svh, 760px) = 320 px, plus 56 px de barre, soit 376 px pour une max-height de 342 px. scrollHeight (376) dépasse clientHeight (342), et overflow: hidden coupe les 34 px du bas, où se trouve la barre de contrôles native. En général : 56 + 0,82h > h − 48 dès que h < 578 px. Autre écart à 390×844 : flex: 1 n'a aucun effet sans conteneur flex, et la vidéo mesure 390×693 px (bas à y 749, 95 px vides), et non 390×784 comme annoncé.
- **Problème** : Sur un téléphone en paysage ou dans une fenêtre de portable réduite, la barre de lecture native est invisible : impossible de mettre en pause, de régler le son ou d'activer les sous-titres.
- **Recommandation** : 1) En mode centré, video { height: min(100dvh - 104px, 760px) } (48 px de marges + 56 px de barre de titre) au lieu de min(82svh, 760px). 2) Déclencher le plein écran avec @media (max-width: 720px), (max-height: 520px). 3) En plein écran, video { width: 100%; height: calc(100dvh - 56px); object-fit: contain }, plutôt que flex: 1. Si un display: flex est souhaité, le mettre sur .intro-video-dialog[open], jamais sur la classe seule, sinon le dialog fermé s'affiche (la règle d'auteur écrase le display: none de dialog:not([open])).

### VID-V2 · Périmètre trop large : réduire à 3 états d'interface et 7 tests

🟠 important · tous · effort M · Ajout

- **Preuve** : Extra §2 : 5 phases (idle, waiting, invite, minimized, hidden), un indicateur dialogOpen, 4 choix persistés et 3 indicateurs de visibilité, pour 13 transitions dont la synchronisation entre onglets, Save-Data, le hash et la hauteur ≤ 520 px. Extra §9 : 21 cas d'intégration, plus des tests unitaires du reducer, alors que la suite actuelle compte 4 tests (app-routing.test.tsx : 1, recommendations.test.tsx : 3). S'y ajoutent 5 simulations jsdom (showModal, close, play, pause, IntersectionObserver).
- **Problème** : L'utilisatrice veut le juste milieu. Chaque branche ajoutée multiplie les cas, les tests et les risques de bug pour une fonctionnalité optionnelle, sans bénéfice visible pour un recruteur : repli au défilement, onglets, Save-Data, écran de fin, reprise de position, annonce sr-only. Le simple coût de maintenance (une suite de tests multipliée par six) dépasse la valeur ajoutée.
- **Recommandation** : État d'interface : 'none' | 'invite' | 'widget', plus open: boolean pour le dialog. useState suffit, sans useReducer exporté. Choix persisté : 'later' | 'dismissed' (VID-12). Un écouteur passif limité à une fois par frame pour le déclenchement et le repli (VID-01, VID-19), et un IntersectionObserver protégé sur .site-footer (VID-06). Sept tests : 1) introVideo null, ou placeholder hors DEV : rien n'est rendu ; 2) renderToString ne contient ni intro-invite ni intro-widget, et le lien du hero a href BASE_URL + src ; 3) carte présente après 2 500 ms quand getBoundingClientRect de la bande KPI est dégagé (valeur simulée), puis « Plus tard » : pastille, focus sur son bouton de lecture, stockage à later ; 4) later stocké : pastille directe ; dismissed stocké : seul le lien du hero reste ; 5) getItem et setItem qui lèvent une exception : pas de plantage ; 6) « Regarder » : showModal et play sont appelés, le track captions a default, et la pastille apparaît à la fermeture ; 7) les fichiers de public/ existent et le VTT commence par WEBVTT. Simulations jsdom : showModal, close, play et pause seulement. Il n'est pas nécessaire de simuler IntersectionObserver si le hook vérifie sa présence.

### VID-07 · Format recommandé : 9:16 vertical filmé au téléphone, plein écran sur mobile

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : Prototype : à 390×844, le dialog plein écran donne à la vidéo 9:16 toute la largeur, en 390×784 avec contain (proto/m390-5-dialog.png). Une vidéo 16:9 ne ferait que 390×219 px, soit 26 % de la hauteur. Sur desktop, la vidéo 9:16 mesure 416×738 px à min(82svh, 760px) (proto/d1440-5-dialog.png). Le clip de test 720×1280 H.264 + AAC de 20 s pèse 236 Ko (ffprobe).
- **Problème** : La consigne évoque une vidéo filmée au téléphone. Un 16:9 forcé obligerait à tourner à l'horizontale ou à recadrer, et serait minuscule sur mobile. Un 4:5 coupe le haut de la tête dans un cadrage selfie. Sans paramètre de format, le composant ne pourrait pas accueillir une autre vidéo plus tard.
- **Recommandation** : Conseiller à Fiona : tournage vertical en 1080×1920, 45 à 75 s ; export en 720×1280, H.264 CRF 26 à 28, AAC 64 kbit/s, -movflags +faststart ; 8 Mo au plus pour 60 s. Dans les données, stocker width: 720 et height: 1280 plutôt qu'un champ aspectRatio, et les poser en attributs sur <video>. Desktop et tablette : dialog centré, video { height: min(100dvh - 104px, 760px); width: auto } (104 = 48 px de marge + 56 px de barre de titre). Plein écran sous 720 px de large ou sous 520 px de haut (VID-V1), avec object-fit: contain. Contrôles natifs, sans lecteur maison ni bottom sheet.

### VID-09 · Menu mobile ouvert : la pastille reste visible en dessous ou passe sous le panneau selon l'orientation

🟡 amélioration · mobile, tablette · effort S · Vérifié

- **Preuve** : measure.json : à 390×844, le panneau .mobile-nav occupe y 71→478, la pastille (y ≈ 780) reste visible sous le menu. En paysage 844×390, le panneau descend jusqu'à y 389 et la recouvre. site-header.tsx:37-39 ferme le menu sur tout pointerdown extérieur.
- **Problème** : Avec le menu ouvert, la pastille fait concurrence aux liens de navigation. Un tap dessus ferme le menu et ouvre la vidéo dans le même geste, ce qui est surprenant.
- **Recommandation** : Masquer en CSS seul, sans couplage avec SiteHeader : body:has(.mobile-menu[open]) :is(.intro-invite, .intro-widget) { opacity: 0; visibility: hidden; }. :has est pris en charge par Safari 15.4+, Chrome 105+ et Firefox 121+. Garder z-index 90 < 100 pour que le menu passe au-dessus dans tous les cas.

### VID-15 · Repli en cas d'erreur et garde-fou de build sur les fichiers de public/

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : recommendations.test.tsx:51-67 vérifie déjà les chemins préfixés par BASE_URL. Aucun test ne vérifie l'existence des fichiers de public/, et public/ ne contient aujourd'hui que favicon.svg et robots.txt.
- **Problème** : Un fichier oublié ou mal nommé donne un 404 silencieux sur Pages : l'invitation promet une vidéo qui ne se lance pas.
- **Recommandation** : Ajouter un test vitest : fs.existsSync sur public/ + src, poster et captions de introVideo, et vérification que le VTT commence par « WEBVTT ». Dans le lecteur, sur l'événement error de la dernière <source>, remplacer la vidéo par une phrase (« La vidéo ne se lance pas ici. ») et un lien « Ouvrir le fichier vidéo » (même onglet, sans flèche diagonale). Pas de bouton « M'écrire » supplémentaire.

### VID-16 · Fin de vidéo : un écran de fin qui mène vers la suite, et un état « vu »

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : Après la vidéo, la suite logique pour un recruteur est #projets ou #contact (navigation existante, portfolio.tsx:19). Les CTA du hero s'appellent « Voir les projets » et « Contact » (portfolio.ts, sectionContent.hero).
- **Problème** : Laisser le lecteur figé sur la dernière image ne mène à rien. Continuer d'afficher la pastille après un visionnage complet devient du bruit.
- **Recommandation** : Sur ended, appeler writeChoice('dismissed'). À la fermeture du dialog, la pastille disparaît et le lien du hero reste. Pas d'écran de fin, pas de libellé « Revoir », pas de redirection vers #projets.

### VID-17 · Paysage téléphone et arrivée par ancre : pas de carte, la pastille directement

🟡 amélioration · mobile · effort S · Corrigé

- **Preuve** : measure.json : à 844×390, une carte de 144 px occuperait 37 % de la hauteur, et le panneau du menu descend jusqu'à y 389. Les liens partagés (CV, LinkedIn) peuvent pointer vers #contact ou #projets (ancres d'une page unique).
- **Problème** : En paysage, la carte masque plus d'un tiers de l'écran. Un visiteur arrivé directement sur #contact a un objectif précis : une invitation l'interrompt.
- **Recommandation** : Au moment du déclenchement, si matchMedia('(max-height: 520px)').matches est vrai, afficher directement la pastille, sans enregistrer later. Pas de règle spécifique au hash. Le plein écran du dialog en paysage est traité dans VID-V1.

### VID-18 · Mouvement et impression : profiter des règles globales existantes

🟡 amélioration · tous · effort S · Vérifié

- **Preuve** : styles.css:1583-1597 coupe toutes les animations et transitions (!important) en prefers-reduced-motion. styles.css:1601-1645 (@media print) masque header, visuel et actions, mais rien de ce qui sera ajouté.
- **Problème** : Une animation faite en JS (WAAPI, comme dans use-reveal.ts:66) échapperait à la règle globale. Les nouveaux éléments fixes s'imprimeraient par-dessus le contenu.
- **Recommandation** : Animer uniquement en CSS : carte en opacity + translateY(12px → 0) sur 260 ms var(--ease) ; pastille en opacity et transform sur 180 ms. Pas de morphing carte → pastille, pas de pulsation. Dans @media print : .intro-invite, .intro-widget, .intro-video-dialog, .hero-video-link { display: none !important }.

### VID-19 · Repli automatique sans minuterie de disparition

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : Pas de minuterie de disparition, conformément au WCAG 2.2.1 (réglage du délai). Prototype : à 390 px, la carte occupe y 688→832, environ 17 % de la hauteur visible.
- **Problème** : Une carte qui reste ouverte pendant toute la lecture devient un bandeau permanent. À l'inverse, une carte qui disparaît après X secondes pénalise les personnes lentes ou sous lecteur d'écran.
- **Recommandation** : Dans l'écouteur passif de VID-01, limité à une fois par frame, qui reste actif tant que la carte est visible : mémoriser scrollY à l'apparition. Si |scrollY − départ| > innerHeight et que la carte ne contient pas document.activeElement, passer en pastille, écrire later, puis retirer l'écouteur. Aucune minuterie de disparition.

### VID-20 · Données et textes dans portfolio.ts ; rien ne s'affiche si introVideo vaut null

🟡 amélioration · tous · effort S · Corrigé

- **Preuve** : src/data/portfolio.ts:1 indique « données vérifiables, sans dépendance à l'interface ». Les textes de section sont dans sectionContent (portfolio.ts:434-522). Les recommandations suivent déjà ce modèle avec documentPath: null (portfolio.ts:415-426).
- **Problème** : Des textes ou chemins écrits en dur dans les composants briseraient la séparation contenu / présentation et compliqueraient le remplacement de la vidéo par Fiona.
- **Recommandation** : interface IntroVideo { id: string; src: string; poster: string; captions: string | null; width: number; height: number; durationSeconds: number; title: string; isPlaceholder: boolean } et export const introVideo: IntroVideo | null. Limiter sectionContent.introVideo à inviteTitle, inviteText, watchLabel (« Regarder »), laterLabel (« Plus tard »), widgetPlayLabel, widgetDismissLabel, heroLabel (« Vidéo »), closeLabel, errorText et errorOpenLabel. Les chemins sont relatifs à public/ et préfixés au rendu par import.meta.env.BASE_URL. La durée est formatée dans le composant (« 20 s », « 1 min »). Ajouter transcript seulement le jour où Fiona en fournit une.

### VID-V3 · Ombres, fond du lecteur et voile codés en dur dans la teinte violette actuelle

🟡 amélioration · tous · effort S · Ajout

- **Preuve** : Extra §5 : box-shadow oklch(0.3 0.04 285 / 14%) et / 16%, fond du dialog oklch(0.18 0.02 285), ::backdrop oklch(0.2 0.02 285 / 72%). La teinte 285 est le violet de --foreground (styles.css:51) et de --primary (styles.css:53). Or roadmap.md:2 prévoit un passage au beige, au bordeaux et au bleu ciel. L'extra affirme pourtant que « la carte et la pastille suivent sans modification ».
- **Problème** : Au changement de palette, les ombres, le fond du lecteur et le voile resteraient violets. L'incohérence serait visible, et la dette devrait être corrigée à la main, ce qui contredit l'affirmation de l'extra.
- **Recommandation** : Pour la carte et la pastille : box-shadow: 0 18px 48px color-mix(in oklch, var(--foreground) 14%, transparent). Pour le dialog : background: var(--foreground); color: var(--card). Pour ::backdrop, utiliser une valeur littérale neutre (par exemple oklch(0.2 0 0 / 70%)) plutôt que var() : ::backdrop n'hérite des variables de l'élément d'origine que depuis Chrome 122, Firefox 120 et Safari 17.4.

**Constats écartés par le relecteur**

- ~~VID-21 · Plus tard : remplacer la photo d'archive du hero par le poster de la vidéo~~ — La preuve (hero.tsx:55-61, photo de bureau générique) est exacte, mais la recommandation sort du périmètre de la fonctionnalité vidéo et dépend d'un contenu non fourni (un poster portrait). Avec le lien du hero et la carte, un troisième point d'entrée vers la même vidéo dans le premier écran serait de trop. Le remplacement de la photo du hero relève de l'angle direction artistique.

**Garde-fous de cet angle (à ne pas faire)**

- Pas de modale bloquante ni de plein écran à l'arrivée, pas d'autoplay, même muet, et pas de son avant un clic.
- Pas de vidéo en boucle dans la pastille ou la carte : pas d'aperçu animé du visage, pas de GIF. C'est du poids réseau et du mouvement permanent pour un gain faible.
- Pas de pulsation, d'anneau animé, de rebond, de « wiggle » ni de morphing FLIP entre carte et pastille. Un fondu et un léger glissement suffisent.
- Pas de formules d'IA ou de chatbot : pas de « 👋 Hi! », de « Découvrez mon univers ✨ », de « Plongez dans mon parcours », de bulle « Besoin d'aide ? » ni de texte qui s'écrit tout seul.
- Ne jamais publier une vidéo d'archive montrant une autre personne, ni présenter la vidéo de test comme « Fiona se présente ». Ne pas afficher « 1 min » si la vidéo dure 20 s.
- Ne pas ajouter de dépendance (Radix Dialog, vaul, lecteur vidéo tiers, YouTube ou Vimeo en iframe) : le <dialog> et les contrôles natifs suffisent, et YouTube ajouterait des traceurs tiers.
- Ne pas réafficher l'invitation à chaque visite ni la faire réapparaître après « Plus tard ». Ne pas la faire disparaître sur une minuterie.
- Ne pas rendre la carte ou la pastille dans le HTML pré-rendu, et ne pas lire localStorage pendant le rendu.
- Ne pas placer la carte au-dessus des KPIs ni du lien « Retour en haut », ne pas dépasser le z-index 100 du header, et ne pas ajouter viewport-fit=cover pour ce seul widget.
- Ne pas construire de lecteur maison (barre de progression, boutons custom) : les contrôles natifs sont accessibles, gèrent les sous-titres, le plein écran et le PiP.
- Ne pas utiliser de flèche diagonale sur le lien vidéo (ce n'est pas un lien externe) ni ouvrir la vidéo dans un nouvel onglet quand JS est actif.

<details><summary>Livrable détaillé de l'auditeur et corrections du relecteur</summary>

# Spécification « Vidéo de présentation » (prête à implémenter)

## 0. Décisions en une phrase chacune

1. **Aucune modale à l'arrivée.** Une petite **carte non modale** ancrée en bas à droite propose la vidéo ; la page reste lisible et cliquable.
2. **La carte ne recouvre jamais les chiffres clés.** Elle apparaît après 2,5 s **et** seulement quand sa zone ne chevauche ni `.impact-strip` ni `.site-footer` (à 390 × 844, cela veut dire après 120 px de défilement ; à 1440 × 900, après 169 px ; à 768 × 1024 et 1920 × 1080, tout de suite).
3. **« Plus tard » replie la carte en pastille** (bas à droite). La pastille devient un rond de 52 px pendant la descente, se cache au-dessus du pied de page et quand le menu mobile est ouvert.
4. **Le lecteur est un `<dialog>` natif** (`showModal()`) : centré en 9:16 sur desktop et tablette, plein écran sur mobile. Le son démarre après le clic, les sous-titres sont actifs par défaut et la position de lecture est reprise.
5. **Une entrée permanente dans le hero** (`▶ Ma présentation en vidéo · 1 min`) est un vrai lien vers le fichier MP4 : elle fonctionne sans JavaScript et reste disponible après « Ne plus afficher ».
6. **Rien de flottant dans le HTML pré-rendu.** La carte et la pastille n'existent qu'après hydratation et lecture du `localStorage` (protégée par try/catch).
7. **La vidéo de test reste honnête.** Le clip neutre « Vidéo de test » n'apparaît qu'en développement (`import.meta.env.DEV`) tant que `isPlaceholder: true`. Rien de faux n'est publié sur GitHub Pages.

---

## 1. Les 3 états à l'écran

### Mobile (390 × 844)

```
 ÉTAT 1 — INVITATION            ÉTAT 2 — PASTILLE              ÉTAT 3 — LECTEUR
 (après 2,5 s + 120 px)         (après « Plus tard »)          (plein écran, top layer)
┌──────────────────────────┐   ┌──────────────────────────┐   ┌──────────────────────────┐
│ Fiona Talbi.  [Contact] ≡│   │ Fiona Talbi.  [Contact] ≡│   │ Fiona en 1 minute    [✕] │ 56 px
│▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔│   │▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔│   ├──────────────────────────┤
│ 500+        3+ ans       │   │ La curiosité             │   │                          │
│ abonnés…    en marketing │   │ comme moteur.            │   │        vidéo 9:16        │
│                          │   │ Basée à Paris, je        │   │   (object-fit: contain)  │
│ ┌──────────────────────┐ │   │ combine stratégie de     │   │                          │
│ │  [photo du hero]     │ │   │ marque, créativité et    │   │  « sous-titres FR »      │
│ │                      │ │   │ coordination…            │   │                          │
│ ├──────────────────────┤ │   │                          │   │ ▶ 0:12 ━━━━○──── 🔊 ⛶    │
│ │[▶] Vidéo · 1 min     │ │   │ • Logitech · France      │   ├──────────────────────────┤
│ │    Bonjour, moi      │ │   │   Marketing Manager…  ╭──╮│   │ Lire la transcription ▾  │
│ │    c'est Fiona.      │ │   │                       │▶ ││   └──────────────────────────┘
│ │[  Regarder  ][Plus tard]│   │                       ╰──╯│    safe-area en haut et en bas
│ └──────────────────────┘ │   └──────────────────────────┘
└──────────────────────────┘    descente : rond 52 px
 carte : 100vw − 24 px,         montée/focus : pilule
 bas 12 px + safe-area          [▶ Ma vidéo · 1 min │ ✕]
```

### Desktop (1440 × 900)

```
 ÉTAT 1 — INVITATION (après 2,5 s + 169 px de défilement : la bande KPI est dégagée)
┌────────────────────────────────────────────────────────────────────────────────┐
│  ft. Fiona Talbi.   Projets Parcours Compétences Formation …       [Contact ✉] │
│                                                                                │
│   Marketing 360 & Communication                  ┌──────────────────────┐      │
│   J'allie stratégie, création…                   │    photo du hero     │      │
│   [Voir les projets ↓] [Contact ✉]               │                      │      │
│   (▶) Ma présentation en vidéo · 1 min           │                      │      │
│   ⌖ Paris, France   ◎ Un parcours international  └──────────────────────┘      │
│  ┌────────────────────────────────────────────────────────────────────┐        │
│  │ +30 %          140             500+              3+ ans            │        │
│  └────────────────────────────────────────────────────────────────────┘        │
│                                                     ┌──────────────────────────┐│
│                                                     │ [▶] Vidéo · 1 min        ││
│                                                     │     Bonjour, moi c'est   ││
│                                                     │     Fiona.               ││
│                                                     │     Mon parcours en      ││
│                                                     │     quelques mots…       ││
│                                                     │ [   Regarder   ][Plus tard]│
│                                                     └──────────────────────────┘│
└────────────────────────────────────────────────────────────────────────────────┘
   carte 344 px, à 20 px des bords ; sur 1440 px, le lien vidéo tient sur la ligne des boutons

 ÉTAT 2 — PASTILLE                                   ÉTAT 3 — LECTEUR (dialog centré, top layer)
┌───────────────────────────────────────────────┐   ┌──────────── fond voilé 72 % ─────────────┐
│ … contenu (1180 px) …               marge 130 │   │          ┌────────────────────┐          │
│                                               │   │          │ Fiona en 1 min [✕] │  56 px   │
│                                               │   │          ├────────────────────┤          │
│                     ╭───────────────────┬───╮ │   │          │                    │          │
│                     │ (▶) Ma vidéo·1 min│ ✕ │ │   │          │    vidéo 9:16      │ 82svh    │
│                     ╰───────────────────┴───╯ │   │          │    (≤ 760 px)      │ ≈416 px  │
└───────────────────────────────────────────────┘   │          │ ▶ ━━○── CC 🔊 ⛶    │ de large │
  pilule au repos, rond 52 px en descente ;        │          ├────────────────────┤          │
  masquée dès que .site-footer est visible ;       │          │ Lire la transcript.│          │
  dès 1372 px, le rond tient dans la marge droite  │          └────────────────────┘          │
                                                    └──────────────────────────────────────────┘
```

**Écran de fin** (dans le lecteur, sur l'événement `ended`) : « Merci de m'avoir écoutée. » suivi de `[Voir mes projets]` `[M'écrire]` `Revoir`.

---

## 2. Machine à états

État persistant (`choice`) : `none | later | dismissed | watched`, plus `position` (en secondes).
État d'interface (`phase`) : `idle → waiting → invite → minimized → hidden`, avec l'indicateur `dialogOpen` par-dessus. Visibilité de la pastille (pas un état) : `compact`, `away` (pied de page visible), `menu` (menu mobile ouvert).

```
                      MOUNT (après hydratation, lecture du stockage)
 idle (SSR + 1er rendu) ─┬─ choice=dismissed|watched ou Save-Data ───────────────▶ hidden
                         ├─ choice=later, ou hash présent (#contact…), ou hauteur ≤ 520 px ▶ minimized
                         └─ sinon ──────────────────────────────────────────────▶ waiting
 waiting ── 2,5 s écoulées ET onglet visible ET zone libre (KPI + footer) ──────▶ invite
 waiting ── déjà défilé > 1 écran au moment voulu ──────────────────────────────▶ minimized
 invite  ── « Regarder » ──────────────────────────────────────────────────────▶ dialogOpen=true
 invite  ── « Plus tard », Échap ou > 1 écran défilé sans interaction ──────────▶ minimized (choice=later)
 minimized ── clic sur la pastille ────────────────────────────────────────────▶ dialogOpen=true
 minimized ── ✕ « Ne plus afficher » ──────────────────────────────────────────▶ hidden (choice=dismissed)
 (tout état) ── lien du hero ──────────────────────────────────────────────────▶ dialogOpen=true
 dialog CLOSE ── si choice=dismissed|watched ▶ hidden, sinon ▶ minimized (choice=later, position)
 dialog ENDED ── choice=watched ; écran de fin ; à la fermeture ▶ hidden ; le hero affiche « Revoir… »
 STORAGE (autre onglet) ── applique le nouveau choice (dismissed|watched ▶ hidden ; later ▶ minimized)
 VIDEO ERROR ── affiche le repli dans le dialog ; la pastille reste
```

Implémentation : un `useReducer` pur dans `src/hooks/use-intro-video.ts`, exporté pour être testé sans DOM : `introVideoReducer(state, event)`.

---

## 3. Données (`src/data/portfolio.ts`)

```ts
export interface IntroVideo {
  /** Clé de version : la changer re-propose l'invitation aux visiteurs ayant fermé l'ancienne. */
  id: string;
  /** Chemins relatifs à public/, préfixés au rendu par import.meta.env.BASE_URL. */
  src: string;
  type: "video/mp4" | "video/webm";
  poster: string;
  captions: string | null;      // WebVTT, même origine
  transcript: string | null;    // texte brut, à fournir par Fiona
  durationSeconds: number;      // mesurée avec ffprobe
  aspectRatio: "9:16" | "4:5" | "16:9";
  title: string;                // titre du lecteur
  /** true : affichée uniquement en développement (jamais publiée sur Pages). */
  isPlaceholder: boolean;
}

export const introVideo: IntroVideo | null = {
  id: "intro-test-2026-10",
  src: "video/intro-test.mp4",
  type: "video/mp4",
  poster: "video/intro-test-poster.webp",
  captions: "video/intro-test.fr.vtt",
  transcript: null,
  durationSeconds: 20,
  aspectRatio: "9:16",
  title: "Vidéo de test du lecteur",
  isPlaceholder: true,
};
```

Ajouter à `sectionContent` (aucun texte en dur dans les composants) :

```ts
introVideo: {
  regionLabel: "Vidéo de présentation",
  inviteEyebrow: "Vidéo",                       // affiché : « Vidéo · 1 min »
  inviteTitle: "Bonjour, moi c’est Fiona.",
  inviteText: "Mon parcours en quelques mots, de vive voix.",
  watchLabel: "Regarder",
  laterLabel: "Plus tard",
  widgetLabel: "Ma vidéo",                      // affiché : « Ma vidéo · 1 min »
  widgetPlayLabel: "Regarder la vidéo de présentation de Fiona",   // + « (1 min) »
  widgetDismissLabel: "Ne plus afficher la vidéo flottante",
  dismissedStatus: "C’est noté. La vidéo reste disponible en haut de la page.",
  heroLabel: "Ma présentation en vidéo",        // affiché : « … · 1 min »
  heroReplayLabel: "Revoir ma présentation",
  closeLabel: "Fermer la vidéo",
  transcriptLabel: "Lire la transcription",
  endTitle: "Merci de m’avoir écoutée.",
  endProjectsLabel: "Voir mes projets",
  endContactLabel: "M’écrire",
  replayLabel: "Revoir",
  errorText: "La vidéo ne se lance pas sur cet appareil.",
  errorOpenLabel: "Ouvrir le fichier vidéo",
  captionsLabel: "Français",
},
```

Format de la durée (dans le composant, pas dans les données) : `< 60 s → "45 s"`, sinon `Math.round(s / 60) + " min"` (soit « 1 min » pour 50 à 89 s). Avec la vidéo de test, l'affichage honnête est « 20 s ».

Règle d'affichage : `const enabled = introVideo !== null && (!introVideo.isPlaceholder || import.meta.env.DEV)`. Si `enabled` vaut false, **rien** n'est rendu : ni carte, ni pastille, ni lien dans le hero.

---

## 4. Fichiers

| Fichier | Contenu |
|---|---|
| `src/hooks/use-intro-video.ts` | `introVideoReducer` (pur) ; `readChoice()` et `writeChoice()` sous try/catch (mémoire de secours) ; écouteur `storage` ; déclencheurs : minuteur de 2,5 s, visibilité de l'onglet, `IntersectionObserver` sur `.impact-strip` et `.site-footer` ; défilement passif limité à une fois par frame (même modèle que `use-portfolio-navigation.ts:52-59`) pour le mode compact. Tout est protégé si `IntersectionObserver` ou `matchMedia` est absent. |
| `src/components/portfolio/intro-video.tsx` | `IntroVideo` (orchestrateur, monté entre `<SiteHeader/>` et `<main>`), `IntroInvite`, `IntroWidget`, `IntroVideoDialog`. Rend `null` tant que `phase === "idle"`. |
| `src/components/portfolio/hero-video-link.tsx` | `<a className="hero-video-link" href={BASE_URL + src} type="video/mp4">` ; avec JS, `onClick` fait `preventDefault()` puis ouvre le lecteur. Icône `Play` de lucide, sans flèche diagonale. |
| `src/components/portfolio.tsx` | `const intro = useIntroVideo(introVideo)` ; `<IntroVideo controller={intro}/>` après `<SiteHeader/>` ; `<Hero videoEntry={intro.entry}/>`. |
| `src/components/portfolio/hero.tsx` | 3ᵉ enfant de `.hero-actions` (l. 21) : `{videoEntry && <HeroVideoLink …/>}`. |
| `src/data/portfolio.ts` | `IntroVideo`, `introVideo`, `sectionContent.introVideo` (ci-dessus). |
| `src/styles.css` | Bloc `/* Intro video */` (§5) + ajouts dans `@media print`. |
| `public/video/intro-test.mp4`, `intro-test-poster.webp`, `intro-test.fr.vtt` | Clip de test (§7). |
| `src/test/setup.ts` | Simulations jsdom : `showModal`, `close`, `play`, `pause`, `IntersectionObserver`. |
| `src/test/intro-video.test.tsx` | §9. |
| `AI_README.md` | Paragraphe « Vidéo de présentation » : remplacer le fichier, passer `isPlaceholder` à false, changer `id`, mesurer la durée. |

Aucune dépendance ajoutée : pas de Radix Dialog, de vaul ni de sonner, même s'ils figurent déjà dans `package.json`.

---

## 5. Styles (valeurs validées sur prototype, captures dans `audit/video-intro/proto/`)

```css
/* Intro video ------------------------------------------------------ */
.intro-invite,
.intro-widget {
  position: fixed;
  z-index: 90;                       /* sous le header (100) et son menu, sous le skip-link (200) */
  right: calc(20px + env(safe-area-inset-right, 0px));
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
}
.intro-invite {
  width: 344px;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 14px;
  padding: 14px;
  border-radius: 20px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: 0 18px 48px oklch(0.3 0.04 285 / 14%);
  animation: intro-in 260ms var(--ease) both;      /* neutralisée par la règle reduced-motion globale */
}
.intro-thumb { width: 56px; height: 56px; border-radius: 14px; overflow: hidden; position: relative; }
.intro-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; }
/* pastille de lecture 18 px : fond var(--foreground), triangle blanc, en bas à droite de la vignette */
.intro-actions { grid-column: 1 / -1; display: flex; gap: 8px; }
.intro-actions button { min-height: 44px; padding-inline: 18px; border-radius: 100px; font: 650 14px var(--font-sans); }
.intro-watch { flex: 1; background: var(--foreground); color: var(--card); }
.intro-later { border: 1px solid var(--border); background: transparent; }

.intro-widget {
  display: flex; align-items: center;
  height: 52px; padding: 4px;
  border-radius: 100px;
  background: var(--card); border: 1px solid var(--border);
  box-shadow: 0 12px 36px oklch(0.3 0.04 285 / 16%);
  transition: opacity 180ms, transform 180ms var(--ease), visibility 0s linear 0s;
}
.intro-widget-play { display: flex; align-items: center; gap: 10px; min-height: 44px; padding-right: 14px; font: 650 13px var(--font-sans); }
.intro-widget-play .intro-thumb { width: 44px; height: 44px; border-radius: 50%; }
.intro-widget-close { width: 44px; height: 44px; border-left: 1px solid var(--border); border-radius: 0 100px 100px 0; color: var(--muted-foreground); }
.intro-widget[data-away="true"],
body:has(.mobile-menu[open]) .intro-widget,
body:has(.mobile-menu[open]) .intro-invite {
  opacity: 0; visibility: hidden; transform: translateY(8px);
  transition: opacity 180ms, transform 180ms, visibility 0s linear 180ms;
}

/* Repli en rond de 52 px pendant la descente (toutes largeurs) ; la pilule revient au survol, au focus ou à la remontée */
.intro-widget[data-compact="true"]:not(:hover, :focus-within) .intro-widget-label,
.intro-widget[data-compact="true"]:not(:hover, :focus-within) .intro-widget-close { display: none; }
.intro-widget[data-compact="true"]:not(:hover, :focus-within) .intro-widget-play { padding: 0; }

.hero-video-link { display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding-inline: 6px; font-size: 14px; font-weight: 650; }
.hero-video-link .play-dot { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border); background: var(--card); }

/* Lecteur : la preflight Tailwind (margin:0 sur *) casse le centrage natif du <dialog> */
.intro-video-dialog {
  margin: auto; padding: 0;
  width: fit-content;
  max-width: calc(100vw - 48px);
  max-height: calc(100dvh - 48px);
  border-radius: 24px; overflow: hidden;
  background: oklch(0.18 0.02 285); color: var(--card);
  overscroll-behavior: contain;
}
.intro-video-dialog::backdrop { background: oklch(0.2 0.02 285 / 72%); }
.intro-video-dialog video { display: block; height: min(82svh, 760px); aspect-ratio: 9 / 16; background: #000; }
html:has(.intro-video-dialog[open]) { overflow: hidden; }

@media (max-width: 720px) {
  .intro-invite, .intro-widget {
    right: calc(12px + env(safe-area-inset-right, 0px));
    bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  }
  .intro-invite { width: calc(100vw - 24px); }
  .intro-invite .intro-text { display: none; }                  /* carte de 144 px au lieu de 173 px */
  .intro-video-dialog {
    margin: 0; width: 100%; height: 100dvh; max-width: none; max-height: none; border-radius: 0;
    padding: env(safe-area-inset-top, 0px) 0 env(safe-area-inset-bottom, 0px);
  }
  .intro-video-dialog video { width: 100%; height: auto; flex: 1; aspect-ratio: auto; object-fit: contain; }
}
@media (max-height: 520px) { .intro-invite { display: none; } }   /* paysage téléphone : pastille seule */
@media print {
  .intro-invite, .intro-widget, .intro-video-dialog, .hero-video-link { display: none !important; }
}
```

L'apparence générale (couleurs, ombres) suit les tokens de `:root`. Si la palette évolue (bordeaux / bleu bébé, cf. roadmap), la carte et la pastille suivent sans modification.

---

## 6. Comportements détaillés

**Invitation**
- `<aside class="intro-invite" aria-labelledby="intro-invite-title">`, sans `role="dialog"` ni `aria-live` : elle ne vole pas le focus et n'interrompt pas un lecteur d'écran. Dans le DOM, elle se place juste après le header : au clavier, on la trouve après la navigation, et « Aller au contenu » la saute.
- Échap (focus dans la carte) = « Plus tard ». Un « Plus tard » au clavier envoie le focus sur le bouton de lecture de la pastille (sinon il serait perdu sur `body`).
- Pas de croix sur la carte : « Plus tard » est la seule sortie, pour ne pas avoir deux fermetures au sens flou.
- Pas de minuterie de disparition (WCAG 2.2.1). Elle se replie seule en pastille après un écran complet de défilement sans interaction.

**Pastille**
- Deux boutons séparés et de 44 px minimum : `[▶ vignette + « Ma vidéo · 1 min »]` et `[✕]`.
- Juste après « Plus tard », elle s'affiche en pilule : le libellé explique ce qu'elle est. Dès que l'on descend de plus de 24 px cumulés, elle passe en rond de 52 px (`data-compact`). Elle redevient pilule quand on remonte de plus de 24 px, sous 200 px du haut, au survol ou en `:focus-within`. Le rond mesure 52 × 52 px (contre 220 × 52 px mesurés pour la pilule) : à 390 px, il masque 4 fois moins de texte, et à 1440 px il tient entièrement dans la marge droite (x 1368 à 1420, alors que le contenu s'arrête à 1310).
- Elle se masque (`data-away`) quand `.site-footer` entre dans le viewport (le lien « Retour en haut » est sinon recouvert), sauf si elle a le focus.
- Elle disparaît en CSS quand le menu mobile est ouvert (`:has(.mobile-menu[open])`), sans couplage JS avec `SiteHeader`.
- ✕ enregistre `dismissed`, place le focus sur `main#contenu` avec `preventScroll` (main a déjà `tabIndex={-1}`, `portfolio.tsx:32`) et annonce `dismissedStatus` dans une zone `role="status"` `sr-only`.

**Lecteur**
- Dans le gestionnaire du clic, dans cet ordre et de façon synchrone : monter la vidéo si besoin (`flushSync`), appeler `dialog.showModal()`, puis `video.play()`. Le geste utilisateur autorise le son. Si la promesse est rejetée (`NotAllowedError`), on laisse la vidéo en pause avec ses contrôles natifs, sans message.
- `<video controls playsInline preload="metadata" poster=…>` avec `<source type>` et `<track kind="captions" srcLang="fr" label="Français" default>`. Le `<video>` n'est monté qu'à la première ouverture, puis conservé (la position est gardée pendant la session).
- `aria-labelledby` pointe vers le titre ; le focus initial va sur « Fermer la vidéo » (`autoFocus`). Échap ferme (événement `cancel` natif) et le focus revient sur l'élément d'origine ; si celui-ci a disparu (carte remplacée par la pastille), on le donne explicitement à la pastille.
- La position est enregistrée au `pause`, à la fermeture et à `visibilitychange`, jamais à chaque `timeupdate`. La lecture reprend si `3 < position < durée − 3`.
- `ended` affiche l'écran de fin. « Voir mes projets » ferme le lecteur puis fait `location.hash = "#projets"` (le défilement doux existe déjà). « M'écrire » est un `mailto:`. « Revoir » remet `currentTime = 0` et relance la lecture.
- En cas d'`error` sur le `<video>` (ou la dernière `<source>`), la vidéo est remplacée par `errorText`, un lien `errorOpenLabel` vers le fichier (même onglet, sans flèche diagonale) et « M'écrire ».
- La transcription, si `transcript` est renseigné, va dans un `<details>` sous la vidéo (`max-height: 30svh; overflow: auto`).

---

## 7. Vidéo de test : comment la produire et où la servir

**Recommandé : un fichier local dans `public/video/`, servi via `import.meta.env.BASE_URL`.** Il a été généré et mesuré pendant l'audit (`audit/video-intro/placeholder/`) :

```bash
FONT=/usr/share/fonts/opentype/inter/Inter-SemiBold.otf   # ou n'importe quel .ttf/.otf local
ffmpeg -f lavfi -i "color=c=0xF4EDE4:s=720x1280:r=30:d=20" \
  -f lavfi -i "sine=frequency=440:sample_rate=48000:duration=20" \
  -vf "drawbox=x=0:y=1180:w=iw*t/20:h=8:color=0x7A1F2B:t=fill,\
drawtext=fontfile=$FONT:text='ft.':fontsize=220:fontcolor=0x7A1F2B:x=(w-text_w)/2:y=380,\
drawtext=fontfile=$FONT:text='Vidéo de test':fontsize=56:fontcolor=0x2B2230:x=(w-text_w)/2:y=680,\
drawtext=fontfile=$FONT:text='Lecteur du portfolio · format 9\:16':fontsize=30:fontcolor=0x5E5560:x=(w-text_w)/2:y=760,\
drawtext=fontfile=$FONT:text='%{pts\:hms}':fontsize=34:fontcolor=0x5E5560:x=(w-text_w)/2:y=1100" \
  -af "volume=0.04,afade=t=in:d=0.5,afade=t=out:st=19.5:d=0.5" \
  -c:v libx264 -profile:v main -pix_fmt yuv420p -preset slow -crf 30 -tune stillimage \
  -c:a aac -b:a 48k -movflags +faststart -shortest public/video/intro-test.mp4
ffmpeg -ss 1 -i public/video/intro-test.mp4 -frames:v 1 -vf scale=360:-2 -c:v libwebp -quality 72 public/video/intro-test-poster.webp
```

Résultat : MP4 **236 Ko** (H.264 Main + AAC, 720 × 1280, 20 s, `faststart`), poster WebP **4,2 Ko**, VTT **254 o**. Le compteur `hh:mm:ss` à l'image permet de vérifier à l'œil la reprise de position, et le son très faible (440 Hz à 4 %) de vérifier que l'audio part après le clic.

VTT de test (sans aucun propos prêté à Fiona) :

```
WEBVTT

00:00:00.500 --> 00:00:06.000
Vidéo de test du lecteur : aucun propos de Fiona ici.

00:00:06.500 --> 00:00:13.000
Les sous-titres définitifs seront écrits à partir de sa vraie vidéo.

00:00:13.500 --> 00:00:19.500
Fin de la vidéo de test.
```

| Critère | Local (`public/`) | Distant (échantillon hébergé ailleurs) |
|---|---|---|
| Fonctionne sur Pages et hors ligne en dev | oui | dépend d'un tiers |
| `<track>` VTT | même origine, rien à faire | CORS obligatoire + `crossorigin` |
| Vie privée (RGPD) | aucune requête tierce | l'IP du recruteur part chez un tiers |
| Format 9:16 représentatif | oui | rarement (la plupart des échantillons sont en 16:9) |
| Poids dans le dépôt | 240 Ko | 0 |
| Honnêteté | « Vidéo de test » à l'écran | contenu étranger au sujet, voire une personne réelle |

**Vraie vidéo (à fournir par Fiona)** : tournée au téléphone en vertical (1080 × 1920), 45 à 75 s, exportée en 720 × 1280 H.264 CRF 26 à 28 avec `-movflags +faststart`. Viser 8 Mo ou moins pour 60 s. Fournir aussi un poster portrait (visage, regard caméra) en WebP de 360 px de large, les sous-titres VTT et la transcription. Ensuite : passer `isPlaceholder: false`, changer `id`, renseigner `durationSeconds` avec `ffprobe -v error -show_entries format=duration -of csv=p=0 fichier.mp4`, et vérifier la lecture sur un iPhone depuis l'URL Pages réelle (Safari exige des réponses `206` aux requêtes Range).

---

## 8. Stockage

- Clé `ft-intro-video`, valeur `{"videoId":"intro-test-2026-10","choice":"later","position":12.4,"updatedAt":1760000000000}`.
- Si `videoId` ne correspond plus à `introVideo.id`, la valeur est ignorée : une nouvelle vidéo est de nouveau proposée.
- Toutes les lectures et écritures passent par try/catch. En cas d'échec (navigation privée, stockage bloqué, quota), l'état est gardé en mémoire pour la visite en cours seulement.
- La lecture se fait dans un `useEffect`, jamais pendant le rendu : le premier rendu client est identique au HTML pré-rendu, donc aucune erreur d'hydratation.
- L'événement `window.storage` synchronise les autres onglets.

---

## 9. Tests (`src/test/intro-video.test.tsx`)

À ajouter dans `src/test/setup.ts` (jsdom 20.0.3 n'implémente ni `showModal` ni la lecture média) :

```ts
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) { this.setAttribute("open", ""); };
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.removeAttribute("open"); this.dispatchEvent(new Event("close"));
};
Object.defineProperty(HTMLMediaElement.prototype, "play", { configurable: true, value: () => Promise.resolve() });
Object.defineProperty(HTMLMediaElement.prototype, "pause", { configurable: true, value: () => {} });
// IntersectionObserver : classe factice qui expose un trigger(isIntersecting) aux tests
```

Cas (`vi.useFakeTimers()`, `localStorage.clear()` en `beforeEach`) :

1. `introVideo = null` : aucun `region`, `button` ni lien « Ma présentation en vidéo ».
2. `isPlaceholder: true` et `import.meta.env.DEV` faux (`vi.stubEnv("DEV", false)`) : rien n'est rendu.
3. Rendu serveur : `renderToString(<Portfolio/>)` ne contient ni `intro-invite` ni `intro-widget` ; le lien du hero a `href="/fiona-talbi-portfolio/video/…mp4"` quand `BASE_URL` est simulé (même modèle que `recommendations.test.tsx:52`).
4. L'invitation est absente à 2 400 ms et présente à 2 500 ms (stockage vide, zone libre).
5. L'invitation n'apparaît pas tant que l'observer de `.impact-strip` signale un chevauchement, puis apparaît quand il le lève.
6. « Plus tard » : la carte disparaît, la pastille apparaît, `document.activeElement` est le bouton de lecture de la pastille, et le stockage vaut `later`.
7. Échap dans la carte produit le même effet que « Plus tard ».
8. Avec `later` stocké au montage : pastille immédiate, jamais de carte (même après 10 s).
9. Avec `dismissed` ou `watched` stocké : ni carte ni pastille, mais le lien du hero est présent ; avec `watched`, son libellé est « Revoir ma présentation ».
10. Un `videoId` différent dans le stockage est ignoré et la carte réapparaît.
11. `Storage.prototype.getItem` et `setItem` qui lèvent une exception : pas de plantage, la carte s'affiche et « Plus tard » fonctionne en mémoire.
12. « Regarder » : `showModal` et `play` sont appelés, le dialog a un nom accessible (« Vidéo de test du lecteur ») et la piste `captions` a `default`.
13. Fermeture avant la fin : la pastille apparaît et `position` est enregistrée ; à la réouverture, `currentTime` reprend la position.
14. `ended` : l'écran de fin affiche « Voir mes projets » et « M'écrire » (`mailto:`) ; après fermeture, plus rien ne flotte.
15. ✕ de la pastille : stockage `dismissed`, `role="status"` contient le texte prévu, focus sur `main`.
16. `error` sur la vidéo : le message de repli et le lien vers le fichier sont présents.
17. Arrivée avec `location.hash = "#contact"` : pastille directe, jamais de carte.
18. `navigator.connection.saveData = true` : aucune invitation automatique, le lien du hero reste.
19. Événement `storage` venu d'un autre onglet (`dismissed`) : la pastille disparaît.
20. Les fichiers `public/` référencés existent (`fs.existsSync`) et le VTT commence par `WEBVTT`.
21. `introVideoReducer` (tests unitaires purs) : chaque transition du §2.

---

## 10. Cas limites

| Situation | Comportement |
|---|---|
| HTML pré-rendu / premier rendu | Aucun élément flottant. Seul le lien du hero est présent (texte + `href` MP4). |
| JavaScript désactivé | Le lien du hero ouvre le MP4 dans le lecteur natif du navigateur. Ni carte ni pastille. |
| `localStorage` indisponible | État en mémoire. L'invitation revient à chaque chargement, ce qui reste acceptable. |
| Vidéo 404 ou codec non supporté | Repli dans le dialog. Le test n° 20 empêche le 404 au build. |
| Connexion lente | `preload="metadata"`, poster affiché, contrôles natifs (indicateur de chargement intégré). Aucun octet vidéo avant le clic. |
| Save-Data / 2G | Pas d'invitation automatique. Le lien du hero et le lecteur restent disponibles. |
| Lecteur d'écran | La carte est un `aside` repérable (repère « complémentaire »), sans annonce intrusive. Le dialog est nommé, le focus est piégé nativement et rendu à la fermeture. |
| Clavier | Ordre : header → carte ou pastille → contenu. Échap gère la carte et le dialog. Le contour `:focus-visible` existant (`styles.css:95-99`) s'applique. |
| Plusieurs onglets | Synchronisation par l'événement `storage`. |
| Rotation | Hauteur ≤ 520 px : pas de carte, pastille seule. Le dialog est en `100dvh` et la vidéo en `contain`. |
| Clavier virtuel | Le site n'a pas de champ de saisie. Si le clavier s'ouvre (recherche dans la page), la pastille reste fixe et petite. Rien à faire. |
| Menu mobile ouvert | Carte et pastille masquées en CSS (`:has`). Le menu (z-index 100) passe de toute façon au-dessus. |
| Pied de page visible | Pastille masquée : le lien « Retour en haut » reste libre. |
| Impression | Tout est masqué, y compris le lien du hero. |
| `prefers-reduced-motion` | La règle globale (`styles.css:1583-1597`) neutralise les animations et transitions CSS. Aucune animation n'est faite en JS. |
| Arrivée par ancre (`#contact`) | Pastille directe, sans carte. |
| Onglet ouvert en arrière-plan | Le minuteur de 2,5 s ne démarre qu'avec `visibilityState === "visible"`. |

---

## 11. Recette manuelle (avant mise en ligne)

- iPhone (Safari) depuis l'URL Pages : son après le clic, lecture en ligne, sous-titres, safe-area en bas, rotation, retour de focus.
- Android (Chrome) : Save-Data activé, puis désactivé.
- 390, 768, 1024, 1440 et 1920 px : la carte ne recouvre aucun KPI, la pastille ne recouvre pas « Retour en haut ».
- Clavier seul : Tab, Échap, Entrée sur chaque état.
- VoiceOver ou NVDA : noms accessibles de la carte, de la pastille et du dialog.
- Navigation privée : aucun plantage.
- Deuxième visite : pas de nouvelle invitation.
- JavaScript désactivé : le lien du hero lit le MP4.

**Corrections du relecteur sur ce livrable :**

VERDICT GLOBAL : la conception de base est bonne et non invasive. Elle repose sur une carte non modale, le passage en pastille après « Plus tard », un <dialog> natif, une vidéo montée seulement au clic, aucun élément flottant dans le HTML pré-rendu, une vidéo de test réservée au développement et un lien permanent dans le hero. En revanche, l'extra empile environ 15 raffinements qui ne servent pas le besoin exprimé et triplent la surface de code et de tests. ERREURS À CORRIGER : (1) §5 : le lecteur est rogné de 34 px à 844×390, contrôles natifs compris (mesuré, VID-V1). Remplacer min(82svh, 760px) par min(100dvh - 104px, 760px) et déclencher le plein écran avec (max-width: 720px), (max-height: 520px). (2) §5, mobile : flex: 1 sans conteneur flex donne une vidéo de 390×693 px (95 px vides), et non 390×784. Utiliser height: calc(100dvh - 56px). Ne jamais mettre display: flex sur .intro-video-dialog seul, toujours sur [open]. (3) §0.2 annonce que « la carte ne recouvre jamais les chiffres clés » : c'est faux dès qu'on remonte, puisque la bande repasse sous un élément fixe. Écrire « n'apparaît jamais par-dessus ». La mesure à 1024×768, où la carte couvrirait les KPI 3 et 4, est absente. (4) §1 et VID-10 : le libellé du hero mesure 271 px et non environ 230. Il passe à la ligne à 1024 px et sur mobile, et repousse la bande KPI de 39 à 58 px. Utiliser un libellé court et un rond seul sous 1000 px (VID-10 corrigé). (5) §5 affirme que l'apparence « suit les tokens », alors que 4 couleurs sont codées en dur en teinte 285 (VID-V3). (6) env(safe-area-inset-*) vaut 0 sans viewport-fit=cover, que l'extra exclut à juste titre : supprimer ces calc(… + env()) et le padding env() du dialog, qui sont du code mort. (7) html:has(.intro-video-dialog[open]) { overflow: hidden } fait disparaître la barre de défilement classique (Windows) et décale le header et la page de sa largeur à l'ouverture. Ce n'est pas mesurable ici, Chromium headless utilisant des barres en surimpression (clientWidth inchangé à 1440). Ajouter scrollbar-gutter: stable dans la même règle, ou supprimer le verrou : le dialog modal rend déjà la page inerte, et overscroll-behavior: contain suffit. EXCÈS À RETIRER : la machine à états à 5 phases avec reducer exporté (remplacée par 'none' | 'invite' | 'widget' + open) ; la synchronisation entre onglets (événement storage) ; Save-Data et effectiveType ; la règle spéciale du hash (déjà couverte par scrollY > innerHeight) ; la condition visibilityState ; le repli rond ou pilule selon le sens du défilement, avec seuils de 24 px et retour sous 200 px (remplacé par une pastille fixe d'environ 100×52 px à deux boutons de 44 px) ; l'écran de fin et l'état « watched » avec le libellé « Revoir » (ended → dismissed suffit) ; la position persistée entre visites et ses enregistrements au pause et à visibilitychange (la <video> montée garde currentTime pendant la visite) ; la zone role=status sr-only ; l'écran d'erreur à trois actions (une phrase et un lien suffisent) ; le <details> de transcription tant que Fiona n'en fournit pas ; les lignes « Clavier virtuel », « Plusieurs onglets » et « Save-Data » du §10 ; la recette Android Save-Data du §11 ; 21 tests ramenés à 7 (VID-V2) ; et les libellés de sectionContent ramenés de 20 à 10 (VID-20). MANQUES : dire explicitement à Fiona où elle verra la vidéo de test (bun run dev, et l'aperçu Lovable seulement s'il est en mode dev, à vérifier), puisqu'elle n'apparaîtra pas sur Pages ; calculer `enabled` au rendu pour que vi.stubEnv fonctionne ; préciser que la carte n'est pas démontée pendant la lecture, ce qui simplifie le retour de focus. VERSION LA PLUS SIMPLE QUI RESPECTE LE BESOIN : (a) données : introVideo (9 champs, isPlaceholder) et 10 libellés ; (b) hero : un lien « ▶ Vidéo · 1 min » vers le MP4, en rond seul sous 1000 px ; (c) hook use-intro-video : état 'none' | 'invite' | 'widget' + open, stockage try/catch sous la clé 'ft-intro-video:' + id avec la valeur 'later' | 'dismissed', un écouteur scroll passif limité à une fois par frame (apparition à 2,5 s si le bas de la bande KPI est au-dessus de innerHeight − 200 ; pastille directe si scrollY > innerHeight ou max-height ≤ 520 px ; repli en pastille après un écran défilé) et un IntersectionObserver sur .site-footer (data-away) ; (d) composants : IntroInvite (aside, « Regarder » et « Plus tard », Échap), IntroWidget (2 boutons de 44 px, forme fixe), IntroVideoDialog (<dialog> natif, <video controls playsInline preload=metadata> montée au premier clic, flushSync puis showModal() puis play(), sous-titres FR par défaut, repli d'erreur en une phrase) ; (e) CSS : un bloc unique utilisant les tokens, avec margin: auto sur le dialog, le correctif de hauteur VID-V1, :has(.mobile-menu[open]) et l'ajout au @media print ; la règle reduced-motion existante s'applique d'office ; (f) 7 tests ; (g) clip de test de l'auditeur (MP4 de 236 Ko, poster de 4,2 Ko, VTT de 254 o, fichiers vérifiés dans audit/video-intro/placeholder), visible seulement en DEV. Le bip à 440 Hz pendant 20 s est acceptable en développement, mais une piste silencieuse (anullsrc) suffirait si le seul but est de vérifier la présence d'une piste audio.

</details>
