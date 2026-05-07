# PROGRESS

## KROK 1 — Recon + struktura
Status: **DONE** (2026-05-04)
Output:
- `brand/major1/` — 3 podstrony HTML, sitemap, robots, 4 CSS, 1 JS, 6 woff2 (Outfit), 168 obrazów, 4 logo/favicon
- `brand/major1/vip-extracted/` — 5× mp4 (filmy IG @major_1_security_agency), 5× poster 0:01, 5× thumb IG, 5× info.json, `CATALOG.md`
- `brand/major1/RECON.md` — kolory, typografia, layout, struktura 8 sekcji homepage, sekcji /oferta/, /kontakt/, dane kontaktowe, identyfikacja fingerprintów
- `brand/major1/README.md`
- Puste katalogi: `brand/refs/`, `oferta/`, `partials/`, `js/`, `images/`, `videos/vip/`

Pending decisions (do KROKU 6):
1. Sekcja flagship VIP — pula contentu: **rozstrzygnięta w KROKU 2** — MIX: warstwa 1 (filmy) + warstwa 2 (galeria 11 zdjęć), zob. `MOODBOARD.md` §9.

## KROK 2 — MOODBOARD + referencje + postery
Status: **DONE** (2026-05-04)
Output:
- `MOODBOARD.md` (rozdziały 1-10) — kierunek wizualny "Editorial Defense", paleta z terracotta + krem, type pairing Fraunces/Inter Tight/JetBrains Mono, type scale, layout, motion, grain overlay, decyzja MIX dla VIP, zakazy
- `brand/refs/{1-anthropic,3-ssense,4-linear}/` — viewport-1440.png + fullpage-1440.png + source.txt (3/5 OK)
- `brand/refs/{2-kalshi,5-character}/` — source.txt z notą o przyczynie braku screenshotu, PNG-i pokazują ekran-blokady (NIE prawdziwą stronę)
- `brand/major1/vip-extracted/ig-{01..05}-poster-options/poster-{5,30,50,70}pct.jpg` — 4×5 = 20 plików

Pending decisions (do KROKU 3):
1. Wybór posteru per film (czeka na user) — 5 filmów × 4 opcje = 20 ścieżek do obejrzenia
2. Co zrobić z Kalshi i Character (sekcja 2 i 5 MOODBOARD-u): (a) zostawić opis "z wiedzy ogólnej", (b) podmienić ręcznie screenshot z normalnej przeglądarki, (c) zastąpić alternatywą (aesop.com / pentagram.com / itsnicethat.com)?

## KROK 3 — style.css (tokeny + reset + utilities)
Status: **DONE** (2026-05-04)
Output:
- `style.css` (442 linii) — wszystkie tokeny z MOODBOARD §2-§7 jako CSS variables, modern reset, body (Inter Tight 17px paper bg ink fg), 13 utility classes typo (.t-display-xl/lg/md/sm, .t-headline, .t-title, .t-quote, .t-body-lg/sm, .t-caption, .t-label, .t-mono), .container (max 1440 + paddingi 48/24), .section + modyfiery --paper/--white/--ink/--deep (z override tokenów dla on-dark text), .grid-12 + .col-span-1..12, .grain z inline SVG fractal noise + multiply blend, .link-editorial (underline grow-from-left 200ms), .btn-text + .btn-text--accent (1px border, hover invert 150ms, 0px radius, dark-section overrides), .figure z .figure-img--bw (filter grayscale, parent-hover release), .figure-caption mono, .eyebrow z dash prefix, .input-text minimal 2px radius, utilities (u-mt-*, u-color-*, u-text-balance), :focus-visible 2px solid accent offset 2px, prefers-reduced-motion override.

## KROK 4 — styleguide.html
Status: **DONE** (2026-05-04)
Output:
- `styleguide.html` (376 linii) — 6 sekcji: 00 header strony, 01 Typography (13 utility classes z meta-labelami "font · weight · size"), 02 Palette (11 swatches w 4-col grid), 03 Components (link-editorial, btn-text, btn-text--accent, figure z BW + grain, .grid-12 visualizacja), 04 On-dark ink (#0F1410) + 04b On-dark deep forest (#1A2F1F), 05 Grain overlay (plain vs grain side-by-side)
- Screenshoty (zweryfikowane przez `file`): `brand/styleguide-shot-viewport.png` 1440×900 81 KB, `brand/styleguide-shot-fullpage.png` 1440×8357 1.08 MB
- Server: Python http.server na :8989 (porty 8000 i 8765 były zajęte przez inne procesy — 8000 PHP, 8765 stary Python serwer "codingmaks")

## KROK 5 — Hero index.html
Status: **DONE** (2026-05-04)
Output:
- `index.html` (271 linii) — head z meta tags + OG + favicony + Google Fonts <link> + style.css; sticky header (logo Major1 SVG + wordmark + 4 linki nav + CTA accent "Zamów rozmowę", height 80px, bg paper, border-bottom var(--border)); HERO section.section--paper.grain z .container i custom .hero__grid 12-col asymetryczny: lewa kolumna .hero__copy (col-span-7) z eyebrow "01 — Agencja Ochrony Major1" + nadtytuł Inter Tight 500 "Agencja Ochrony Major1." + h1 t-display-xl Fraunces 300 "Bezpieczeństwo na najwyższym poziomie." (z polish hyphens auto na mobile) + lead t-body-lg z major1.pl 1:1 ("Działamy od 2011 roku, tworząc zespół wysoko wykwalifikowanych specjalistów..."), CTA-row (btn-text--accent "Skontaktuj się →" + link-editorial "Zobacz pełną ofertę"), values-list (Doświadczenie / Niezawodność / Zaangażowanie z mono + accent dot); prawa kolumna .hero__visual (col-span-5) z outline-only "01" Fraunces 300 clamp(180,22vw,320) -webkit-text-stroke 1px terracotta wystający transform translateX(15%), pod nim mono "Poznań · od 2011"
- Skopiowane assety: `images/logo-major1.svg` (124 KB, z brand/major1/logo/logo-major1-offer.svg), `images/favicon-32x32.png`, `images/favicon-180x180.png`
- Screenshoty (zweryfikowane przez `file`): `brand/hero-shot-1440.png` 1440×900 637 KB, `brand/hero-shot-mobile.png` 750×1800 (375@2x DPR) 651 KB

## KROK 6 — Sekcja VIP flagship (filmy + galeria)
Status: **DONE** (2026-05-04)
Output:
- `videos/vip/{01-adamek,02-kaczmarek,03-borek,04-jedrzejczyk,05-reprezentacja}.mp4` + `*-poster.jpg` (5 mp4 + 5 posterów wybranych przez user — 50/50/30/30/50 pct offsets)
- `images/vip/` — 11 zdjęć skopiowanych z `brand/major1/images/vip/` (50-cent, tiesto, armin-van-buuren, samantha-fox, joanna-krupa, magda-gessler, ishowspeed, rober-lewandowski, jan-bednarek, krzysztof-piatek, natalia-kaczmarek-konrad-bukowiecki)
- `js/main.js` (124 linii) — custom video player (toggle play/pause na klik video lub .vip-play-btn, custom progress bar terracotta na timeupdate, mute toggle, klik na progress przewija — event.offsetX/width*duration), `initLazyVideos()` z IntersectionObserver (rootMargin 200px), `initMobileMenu()` z burger toggle .is-open + Escape close + click-outside close
- Sekcja `#referencje` w index.html: 5 modułów `<article class="vip-film vip-film--left/--right">` naprzemiennie L/R/L/R/L, każdy z numerem mono "03.0X — Sport/Media", imię display-sm, tytuł body, duration mono accent. Custom controls: play-btn terracotta 56-72px center, mute top-right, 2px progress bar bottom z accent fill.
- Sekcja `#wspolpracowali` w index.html: galeria 11 zdjęć w 4-col grid (3-col @ <1025px, 2-col @ <641px), aspect-ratio 3/4 default + 3/5 dla nth-child(7n+1, 7n+5) — asymetria; BW filter z hover release, gradient overlay caption slide-up od dołu z imię + kategoria mono; cytat 1:1 z `oferta.html`: "Współpracowaliśmy ze światowej sławy gwiazdami muzyki, sportu i biznesu, zdobywając cenne doświadczenie..."

## KROK 7 — Reszta sekcji index.html
Status: **DONE** (2026-05-04)
Output:
- Sekcja `#o-nas` — eyebrow "02 — O agencji", h2 "Kim jesteśmy?" (col-span-5) + "Eksperci w dziedzinie bezpieczeństwa." sub-title; col-span-7 z 3 paragrafami body-lg z major1.pl 1:1 (Działamy od 2011…, Naszą siłą są…, Jako jedni z nielicznych…); 3-col `.about__values` z duże outline numbery 01/02/03 Fraunces 96px + nazwy (Doświadczenie/Niezawodność/Zaangażowanie) + opisy 1:1 z major1.pl
- Sekcja `#oferta` — eyebrow "05 — Oferta", h2 "Co oferujemy?", body intro 1:1; `.offer-list` z 3 wierszami w grid-12: 06.01 Ochrona fizyczna obiektów / 06.02 Ochrona VIP / 06.03 Systemy zabezpieczeń, każdy = `<a>` z hover (color → terracotta, border-bottom → terracotta); btn-text--accent "Zobacz pełną ofertę →"
- Sekcja `#zespol` — eyebrow "07 — Zespół", h2 "Poznaj nasz zespół.", body 1:1 ("Nasz zespół to doświadczeni profesjonaliści — utytułowani zawodnicy..."); `.team-grid` 4-col @ desktop / 2-col mobile, 10 figure cards z BW + hover release, imiona Fraunces 24px + role mono "Major1 · Zespół" (nie wymyślam funkcji bo nie ma ich w major1.pl)
- Sekcja `#kontakt` (CTA dolny) — section--ink + grain, eyebrow "08 — Kontakt", h2 t-display-lg "Dołącz do najlepszych.", body 1:1 ("Major1 to marka, której zaufały gwiazdy sportu, celebryci i profesjonaliści. Dołącz do grona tych..."); btn-text--accent "Zamów rozmowę →" + link-editorial "+48 884 636 363" mono
- Header burger: `.menu-toggle` widoczny @media max-width:767px, JS toggle `.site-nav.is-open` + body lock + ESC close + click-on-link close
- `style.css` rozbudowane do 885 linii: dodane sekcje COMPONENT VIP-FILMS, VIP-GALLERY, ABOUT VALUES, OFFER-LIST, TEAM-GRID, CTA-DARK, HEADER MOBILE BURGER
- 4 screenshoty kontrolne (zweryfikowane przez `file`):
  - `brand/home-shot-1440-fullpage.png` 1440×12772 5.95 MB
  - `brand/home-shot-mobile-fullpage.png` 750×26356 (375@2x DPR) 7.3 MB
  - `brand/home-shot-vip-films-1440.png` 1440×900 294 KB
  - `brand/home-shot-vip-gallery-1440.png` 1440×900 456 KB

## PIVOT v2 — Tactical Premium
Status: **DONE** (2026-05-04)
Output:
- `style.css` (1131 linii) — KOMPLETNIE przepisany: nowe tokeny (dark bg #0F1410, żółty akcent #FFC931, Bebas Neue display, Manrope body), nowe sekcje section modyfiery (--ink/--deep/--paper), komponenty (btn-text 2px border, link-editorial żółty underline, eyebrow żółty pasek), hero pełnoekranowy (zdjęcie zespołu + gradient overlay), values-grid (Bebas Neue numery żółte), VIP films (żółty play button, żółty progress bar), VIP gallery (kolor, żółta ramka hover, scale 1.04), offer-list (Bebas Neue numery), team-grid (kolor portrety, żółta linia pod imieniem), CTA dark, footer, header sticky z backdrop-blur
- `index.html` (486 linii) — zaktualizowany head (Bebas Neue + Manrope Google Fonts), hero z pełnoekranowym zdjęciem zespołu (images/hero/major1-team.jpg 2147×1367) + gradient overlay + Bebas Neue h1 z żółtym akcentem, wszystkie sekcje na ciemnych tłach
- `MOODBOARD.md` — dodany §11 (Pivot — Tactical Premium) z nową paletą, type pairing, zmianami vs v1, inspiracjami; zaktualizowany §10 (zakazy — żółty dozwolony, backdrop-blur na header dozwolone)
- Hero zdjęcie: `images/hero/major1-team.jpg` (2147×1367, 756 KB) + `major1-team-mobile.jpg` (992×436, 207 KB)
- Logo SVG transparent — brak białego tła, OK na ciemnym tle
- Screenshoty: `brand/v2-hero-1440.png`, `brand/v2-hero-mobile.png`, `brand/v2-fullpage-1440.png`

Zmiany vs v1 Editorial Defense:
- Tło: krem #F5F2EC → ciemny #0F1410
- Akcent: terracotta #C8553D → żółty #FFC931
- Display: Fraunces 300 serif → Bebas Neue 400 condensed uppercase
- Body: Inter Tight → Manrope
- Hero: abstract "01" outline → pełnoekranowe zdjęcie zespołu z overlay
- Galeria: BW + grain → kolor z żółtą ramką
- Zespół: BW → kolor z żółtą linią
- Grain overlay: usunięty
- backdrop-blur: dozwolony na sticky header

## v7 — stats super-kompaktowe + brand marquee 3 rzędy (kolor)
Status: **DONE** (2026-05-06)
Output:
- **Stats mobile super-kompaktowe** (~54px total height, było 110): value clamp(20,5.6vw,26), label 8.5px / letter-spacing 0.04 / line-height 1.15, padding container 10, padding item `0 4`, margin-bottom value 1, divider 30. Wszystkie 3 etykiety mieszczą się w 1 linię (Lat doświadczenia / Zaufanych klientów / Pełna gotowość)
- **Sekcja #wspolpracuja przebudowana z grid → 3 marquee rzędy**: pełna szerokość viewport, headline + lead w container, marquee na zewnątrz container (full bleed)
- **Distribution**:
  - Row 1 (34 top brands, 100s linear): Fame, Fame Arena, Fame Booster, Fame Chef, Fame Freak, PZPN, Bungee, Raben, TME, Enea Stadion, Hotel Remes, Mlynska, Cuba Libre, Stare Koszary, Slodownia, Granturismo, Garbicz, City Park, Ekwador, DLDK, WMF, Talents MMA, Fabryka Futbolu, Whiskey In The Jar, Concordia Design, Orzo, Koronka, Pijalnia Wodki I Piwa, Ministerstwo Sledzia, Master Lech, Projekt Wilson, FlowEvents, HiFi Hotel, Invest Complex
  - Row 2 (48, 140s reverse): brands-2 alfabetycznie a-l (2progi, 42, 9stop, ahmed, b17, beatka, bilard-club, black-music, ...)
  - Row 3 (48, 120s normal): brands-2 alfabetycznie m-z
- **`.brand-marquee` CSS** (~80 linii): flex column gap 18-22, każdy `__row` overflow:hidden + mask-image fade na bokach (4-96%), `__track` width:max-content + animation brandMarquee 100/140/120s, `--reverse` mod toggle direction, hover pause na .brand-marquee, items 140×76 (mobile) / 180×92 (≥768) / 200×100 (≥1280) padding flex-center, `<img>` max-w/h 100% object-fit contain — **pełen kolor, bez grayscale**
- **CRITICAL FIX `loading="lazy"`**: 260 imgs (130 unique × 2 dla seamless loop) z `loading="lazy"` powodowało że tylko items widoczne above-the-fold w viewport ładowały się — rzędy 2 i 3 były puste (zielone item outline'y w debug ale obrazy nie ładowały). Usunięto `loading="lazy"` ze wszystkich 260 imgs w `#wspolpracuja` (zachowane `decoding="async"`). Po fix: wszystkie 3 rzędy renderują się natychmiast z pełnymi logos
- Screenshoty zweryfikowane (`file`):
  - `brand/v9-marquee-desktop.png` 1440×345 — 3 rzędy z visible logos (top: FAME/PZPN/BUNGEE/RABEN/TME, mid: MUS/2PROGI/42, bot: NOWA CZYTELNIA/OHIA)
  - `brand/v9-brands-mobile.png` 750×1280 (375@2× DPR)
  - `brand/v9-stats-mobile.png` 670×110 (335@2×) — 3 stat columny mieszczą się w jedną linię

## v6 — stats kompaktowe + offer hover off + sekcja Współpracują z nami (130 logo)
Status: **DONE** (2026-05-06)
Output:
- **Stats mobile zmniejszone**: value clamp(34,9vw,44) → clamp(24,6.4vw,32), label 10.5→9.5, padding 22→16, divider 56→38, item-padding 4×6→2×4 — kompaktowy pasek
- **Offer-list bez hover**: usunięte wszystkie reguły `:hover` i `:focus-visible` (poza globalnym focus outline accent), usunięta `::before` rail (yellow scaleY transition) i transitions z `__row`/`__name`/`__arrow`. Klikalne `<a>` z statycznymi numerami/nazwami/strzałkami, focus-visible przez globalny outline 2px var(--accent)
- **130 logo skopiowane**: `brand/major1/images/brands-{1,2}/` → `images/brands/` (14+116=130 PNG)
- **Sekcja #wspolpracuja**: dodana między `#referencje` a `#oferta` jako section--paper (białe tło) — eyebrow "04 — Partnerzy", h2 "Współpracują z nami.", lead 1:1 z major1.pl ("Poznaj naszych partnerów, którzy cenią profesjonalizm i niezawodną ochronę.")
- **`.brand-grid`** (style.css ~50 linii): grid-template-columns repeat(3) mobile / repeat(4) ≥600 / repeat(6) ≥1024; subtle 1px siatki przez gap+border-color trick (var(--border-on-light)); `.brand-grid__item` aspect-ratio 3/2 + flex center + padding 16-22; `<img>` max-w 78%, max-h 70%, object-fit contain, filter grayscale(100%) opacity 0.78. **Bez hover.** Lazy-loaded
- Lista section IDs po insert: `[agencja, referencje, wspolpracuja, oferta, zespol, kontakt]` (6 sekcji)
- Screenshoty: `brand/v6b-{stats,oferta,brands}-{mobile,desktop}.png` (element-based) — wszystkie zweryfikowane wizualnie

## HERO POLISH MOBILE FIX — portrait crop + stats overflow + phone-widget hide
Status: **DONE** (2026-05-06)
Output:
- `images/hero/major1-team-portrait.jpg` — nowy crop 1067×1280 (5:6 portrait, wycięty ffmpegiem ze środka desktop image z czystym czerwonym tłem areny, bez chaotycznych reklam Fame Revolution z poprzedniego mobile asset)
- `index.html` — `<img>` zamieniony na `<picture>` z 2 source: `<source media="(max-width: 600px)" srcset="…portrait.jpg">` + `<source media="(min-width: 601px)" srcset="…desktop.jpg">` — telefon dostaje portrait, tablet+ desktop landscape
- `style.css` mobile breakpoints:
  - `@media max-width: 1024px`: `.hero__right` height 60vh, min 420, max 720; `.hero__image` object-position center 38%; `.hero__overlay` mocniejszy gradient (rgba 0.25→0.05→0.25→0.85→bg-ink); `.hero__left margin-top: -48px` (tekst wpływa pod gradient)
  - `@media max-width: 600px`: `.hero__right { aspect-ratio: 4/3; max-height: 440px }`; portrait crop already centered
- **ROOT CAUSE FIX overflow**: `.hero__roster-track` z `width: max-content` (5572px do marquee animation) rozdmuchywało całe `.hero__content` przez flex `min-width: auto` default. Stats szły 5572px wide → off-screen. Fix:
  - `.hero__left { min-width: 0; overflow: hidden }`
  - `.hero__content { min-width: 0 }`
  - `.hero__roster { min-width: 0; max-width: 100%; overflow: hidden }`
  - `.hero__roster-marquee { width: 100%; min-width: 0 }`
  Po fix: hero, hero__left, content, roster, marquee wszystkie 375/335px (poprawnie); track 5572 ale w marquee z overflow:hidden (poprawne dla animacji)
- Mobile stats wzmocnione: padding 22px, border-top/bottom-color → `--border-accent` (żółty), font-size 34-44px, label 10.5px line-height 1.3, divider height 56px
- **Phone-widget IntersectionObserver hide-on-hero**: dodany `initPhoneWidgetReveal()` w `js/main.js` (15 linii) — observuje `.hero` z rootMargin '0px 0px -40% 0px', toggle `.phone-widget--visible`. CSS: `.phone-widget` domyślnie opacity 0 + pointer-events none + scale 0.85, `.phone-widget--visible` przywraca. Effect: na hero widget hidden (nie zakrywa „24/7" stats), pojawia się gdy user scrolluje poza hero (60% viewport)
- Screenshoty (zweryfikowane): `brand/hero-stats-final-{375,414,768}.png` — stats 14/130+/24/7 widoczne above-the-fold mobile, phone widget hidden na hero

## HERO POLISH — split-reveal + VIP roster marquee
Status: **DONE** (2026-05-06)
Output:
- `index.html` — wstawiony `.hero__roster` między `.hero__lead` a `.hero__cta`: label "Zaufali nam" + marquee (`.hero__roster-marquee` z mask-image fade na bokach + `.hero__roster-track` z dwoma identycznymi `<ul class="hero__roster-list">` dla seamless loop) zawierający 16 nazwisk VIP z assetów: Lewandowski, Adamek, Tiësto, 50 Cent, Reprezentacja Polski, Armin van Buuren, IShowSpeed, Jędrzejczyk, Borek, Gessler, Krupa, Bednarek, Piątek, Kaczmarek, Samantha Fox, Bukowiecki — separator `·` w żółtym akcencie via `::after`
- `style.css` — dodane:
  - `@keyframes heroFadeUp` (translateY 28→0, opacity 0→1)
  - `@keyframes heroMarquee` (translateX 0 → -50% nieskończenie 38s linear)
  - stagger delay 80/160/260/360/460/560/660/760ms dla eyebrow / h1 spans / lead / roster / cta / stats — animation 700ms cubic-bezier(.2,.7,.2,1) forwards
  - `.hero__roster*` style (label mono z accent prefix dash, mask-image gradient na 5%/95%, font Bebas 18-22px, hover pauza marquee)
- Reduced-motion: globalny override (linie 1941-1949) zerowa animation-duration → wszystkie elementy hero natychmiast widoczne, marquee statyczny
- Screenshoty (zweryfikowane przez `file`): `brand/hero-v3-roster-1440.png` 1440×900 862 KB, `brand/hero-v3-roster-mobile.png` 750×1800 (375@2x DPR) 486 KB

## KROK 8 — Header partial + footer + partial loader
Status: TODO

## KROK 9 — Pozostałe podstrony (oferta, kontakt, 404)
Status: TODO

## KROK 10 — Polish (Lighthouse, SEO, alt, sitemap)
Status: TODO

## KROK 9 — Pozostałe podstrony
Status: TODO

## KROK 10 — Polish (Lighthouse, SEO, alt, sitemap)
Status: TODO
