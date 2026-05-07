# MOODBOARD — Major1 Redesign · Editorial Defense

> Strona ochroniarska zaprojektowana jak okładka magazynu. Tonowa, kremowa, powściągliwa.
> Major1 to benchmark do POBICIA, nie do skopiowania.

## 1 · REFERENCJE WIZUALNE

### 1.1 Anthropic — anthropic.com
**Screenshoty:** `brand/refs/1-anthropic/viewport-1440.png` + `fullpage-1440.png` (zweryfikowane wizualnie)

**Co kradniemy:**
- Kremowe tło (~#F5F2EC) jako dominanta — to nie biały, to **paper**. Grafika oddycha.
- Display **serif** w wadze 300-400 ("AI research and products that put safety at the frontier") — NIE bold.
- Asymetryczny grid 7/12 + 5/12: po lewej duży h1, po prawej krótki lead w body. Nigdy 50/50.
- **Underline na kluczowych słowach** w nagłówku ("research", "products", "safety") jako mikro-akcent zamiast koloru.
- Drugi blok ciemny ("Project Glasswing") — krem przeplata się z czarnym ink, sekcja po sekcji. Brak shadow. Tylko border lub change-of-bg.
- Dolna stopka pełna whitespace, top-padding sekcji ~120-160px.

**Czego NIE bierzemy:**
- Linki w stopce/nawigacji w superkrótkim sans-serif (Anthropic używa custom display) — my zostajemy z Inter Tight.

---

### 1.2 Kalshi — kalshi.com
**Screenshoty:** `brand/refs/2-kalshi/` ❌ **NIEDOSTĘPNE** (Vercel Security Checkpoint blokuje headless Chrome — szczegóły w `source.txt`).
**Opis poniżej bazuje na wiedzy ogólnej autora, nie na sfotografowanym zrzucie.**

**Co kradniemy (z pamięci o stronie):**
- Tło prawie czysto białe (#FFFFFF lub #FAFAFA) z minimalnymi blokami koloru.
- **Nagłówek h1 jako BIG sans w 96-128px** zajmuje pół ekranu — żeby było video-game-poster nie web-page.
- **Mono dla danych liczbowych** (rynki prediction): fixed-width bardziej jak terminal niż UI.
- Krótkie zdania, mocna hierarchia: jeden h1, jedna lead, jeden CTA — koniec hero.
- Statystyki nie jako kafle z ikonkami, tylko jako tabela: nazwa po lewej, liczba po prawej, separator 1px.

**Czego NIE bierzemy:**
- Kalshi jest prediction-market: ma dużo "live data" UI (charts, %, trade buttons). Tego u nas nie ma — nie kopiujemy ich modular UI components.

**Działanie dla user-a:** jeśli chcesz fizyczny screenshot kalshi.com, otwórz w normalnej przeglądarce i podmień dwa PNG w `brand/refs/2-kalshi/`.

---

### 1.3 SSENSE Editorial — ssense.com/en-us/editorial
**Screenshoty:** `brand/refs/3-ssense/viewport-1440.png` + `fullpage-1440.png` (zweryfikowane wizualnie, fullpage 2.5 MB)

**Co kradniemy:**
- Czysto białe tło (#FFFFFF) + tekst pure black (#000) — bez kompromisu.
- **"STORIES 2026"** jako BIG SANS-SERIF display — duże, czarne, bez serif, ale z idealnym tracking. Przekonujący argument dla Inter Tight 600 jako alternatywy dla Fraunces w niektórych miejscach.
- **4-kolumnowy magazynowy grid miniatur**: zdjęcie + tytuł sans + 1-zdaniowy lead + kategoria pod spodem małym caps.
- Pionowa nawigacja kategorii po LEWEJ (Art, Beauty, Design, Fashion, Food, …) zamiast horyzontalnej — bardzo magazynowo, wzbudza zaufanie.
- Zero shadow, zero radius, granica = 1px solid czarny lub border-color rgba(0,0,0,.1).
- Whitespace MIĘDZY sekcjami nawet ważniejszy niż wewnątrz — pacing.

**Czego NIE bierzemy:**
- 4 kolumny miniatur to za dużo dla strony ochroniarskiej — u nas max 3, najczęściej 2 w sekcji VIP.
- SSENSE jest e-commerce — nie kopiujemy ich price tags / product cards.

---

### 1.4 Linear — linear.app/blog (przekierowuje do /now)
**Screenshoty:** `brand/refs/4-linear/viewport-1440.png` + `fullpage-1440.png` (zweryfikowane wizualnie)

**Co kradniemy:**
- **Mono dla autorów i dat:** "Doug Parker · Apr 28, 2026" — to czyta się jak credit, nie jak metadata. U nas: NIP, REGON, daty, durations filmów ("00:15"), numery sekcji ("01 — AGENCJA").
- 3-kolumnowy grid kart z 1px border (nie shadow!) — granica zamiast głębokości.
- **Pill-shaped search bar** (border-radius: 9999px) jako *jedyny* pełny pill na stronie — kontekstowo dozwolony wyjątek od reguły "0px radius".
- Jedyny akcent kolorystyczny: pojedynczy żółty dot statusu w mini-UI w karcie ("Properties / Inspect"). To pokazuje: **akcent koloru używany RAZ**.

**Czego NIE bierzemy:**
- Linear ma ciemne tło (#0B0B0B) — my zostajemy z kremowym `#F5F2EC` jako dominantą. Ciemny tylko dla 1-2 sekcji (hero alt + CTA dolny).
- Linear jest tech-product (SaaS) — my idziemy stronę B2B-security-magazine, nie SaaS-product-page.

---

### 1.5 Character — character.work
**Screenshoty:** `brand/refs/5-character/` ❌ **DOMENA MARTWA** — przekierowuje na parking searchhounds.com (HTTP 403 "Access Denied"). Studio designu "Character" prawdopodobnie zniknęło/zmieniło domenę. Szczegóły w `source.txt`.
**Opis poniżej bazuje na wiedzy ogólnej autora o tym studiu, nie na sfotografowanym zrzucie.**

**Co kradniemy (z pamięci):**
- Gładkie kremowe tło z **subtelnym grain** jako dominanta — fotograficzne, "filmowe".
- Case studies prezentowane jak strona z magazynu: BIG photo + numer projektu (mono "01") + tytuł serif.
- **Naprzemienny layout zdjęć** — duże portretowe full-bleed po lewej, krótki tekst po prawej; potem flip.
- Hover na zdjęciu: BW → kolor (200ms ease-out). Subtelny, ale zauważalny.
- Brak nawigacji "tabs/cards" — strona zachowuje się jak katalog projektów: scroll jest podstawowym UX.

**Sugerowane zastępstwa** (zachowują tę samą estetykę "Editorial Defense"):
- **aesop.com** — biały premium, fotografia, fixed sans
- **pentagram.com** — design studio, asymetria, BIG type
- **itsnicethat.com** — editorial krem + serif

**Działanie dla user-a:** powiedz w PROMPT 3 czy chcesz żebym zrobił screenshoty którejś z tych 3 alternatyw zamiast martwego character.work, czy zostawić ten slot pusty.

---

## 2 · PALETA

| Token | Hex | Zastosowanie |
|---|---|---|
| `--bg-paper` | `#F5F2EC` | dominujące tło — krem, "paper" |
| `--bg-white` | `#FAF9F6` | sekcje kontrastujące — odcień jaśniejszy od paper |
| `--bg-ink` | `#0F1410` | dark hero alt / dark CTA bottom |
| `--bg-deep` | `#1A2F1F` | alternatywa ink — deep forest (security-quiet) |
| `--ink` | `#0F1410` | tekst główny |
| `--ink-muted` | `#4A4F49` | podtytuły, lead-paragraphs |
| `--ink-faint` | `#8B8E89` | metadane, captions, eyebrow labels |
| `--accent` | `#C8553D` | terracotta — JEDYNY akcent kolorystyczny |
| `--accent-soft` | `#E8DDD4` | tła hover, subtle bloki kontekstowe |
| `--border` | `rgba(15,20,16,0.12)` | wszystkie linie. **Brak box-shadow.** |
| `--paper-on-ink` | `#F5F2EC` | tekst krem na tle ink (odwrócenie) |

**Świadomie wykluczone:**
- `#fbc30c` (yellow Major1 fingerprint — ZAKAZ #1)
- Tailwind defaults (blue-500 #3B82F6, slate-900 #0F172A, indigo-* itd.) — AI-fingerprint
- Materialne oranże (#FF9800), shadcn defaults
- Wszelkie gradienty (poza grain overlay z sekcji 7)

**Reguła użycia akcentu:** terracotta tylko w 3 miejscach na cały viewport: (1) underline na CTA hover, (2) numer sekcji jeśli wzmacniamy hierarchię, (3) pojedyncze słowo w nagłówku jeśli h1 ma underline-emphasis. Nigdy więcej niż 2 wystąpienia w jednym screenie.

---

## 3 · TYPE PAIRING

| Rola | Font | Google Fonts URL | Weight | Użycie |
|---|---|---|---|---|
| Display | **Fraunces** | https://fonts.google.com/specimen/Fraunces | 300, 400 (z opt italic 400) | H1 96-128px, H2 56-72px, hero sub-display |
| Body / UI | **Inter Tight** | https://fonts.google.com/specimen/Inter+Tight | 400, 500, 600 | paragrafy 17-18px, CTA, nawigacja, formularze |
| Numbers / Labels | **JetBrains Mono** | https://fonts.google.com/specimen/JetBrains+Mono | 400 | "01 — AGENCJA", duration "00:15", NIP, REGON, daty |

**Reguły:**
- Fraunces ZAWSZE light/regular (300-400), **nigdy bold**. Optional Italic 400 dla cytatów.
- Inter Tight nie Inter klasyczny (CLAUDE.md zakaz: "Inter klasyczny / Geist = AI-default fingerprint").
- Mono TYLKO dla: numery sekcji ("01 — AGENCJA"), daty ("Apr 28, 2026"), durations filmów ("00:15"), NIP ("783-168-42-52"), REGON, copy w stopce techniczne.
- Maksymalnie 3 rodziny w całym projekcie. Punkt.
- NIE Outfit (Major1 fingerprint), NIE Inter klasyczny / Geist (AI-default).

**Google Fonts URL do `<link>` w `<head>`:**

```
https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,400&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono&display=swap
```

---

## 4 · TYPE SCALE

| Token | clamp() | Użycie |
|---|---|---|
| `--text-display-xl` | `clamp(56px, 9vw, 128px)` | hero H1 (Fraunces 300) |
| `--text-display-lg` | `clamp(48px, 7vw, 96px)` | page H1 podstron (Fraunces 400) |
| `--text-display-md` | `clamp(40px, 5vw, 72px)` | H2 sekcji (Fraunces 400) |
| `--text-display-sm` | `clamp(32px, 3.5vw, 56px)` | imiona VIP, big quotes (Fraunces 400) |
| `--text-headline` | `clamp(24px, 2.2vw, 32px)` | H3 (Inter Tight 500) |
| `--text-title` | `clamp(20px, 1.8vw, 24px)` | H4, lead-of-section (Inter Tight 500) |
| `--text-body-lg` | `18px` (fixed) | lead-paragraphs |
| `--text-body` | `17px` (fixed) | default tekst |
| `--text-body-sm` | `15px` (fixed) | captions, footer body |
| `--text-caption` | `14px` (fixed) | metadata, photo captions |
| `--text-label` | `12px` (fixed, JetBrains Mono, uppercase, ls 0.08em) | eyebrow labels ("01 — AGENCJA") |

**Body fixed (nie clamp):** czytelność — body nie skaluje się płynnie z vw.
**Display płynne (clamp z vw):** żeby h1 zachowywał impact niezależnie od viewport.
**Line-height:** display `1.05`, body `1.55`.

---

## 5 · LAYOUT & SPACING

- **Container max-width:** 1440px (z auto margin), padding-inline 48px desktop / 24px mobile
- **Gutter:** 48px desktop / 24px mobile
- **Section padding-block:** 160px desktop / 96px mobile (zgodnie z CLAUDE.md)
- **Grid:** 12-col, gap 32px desktop / 16px mobile
- **Asymetryczne podziały:** 5/12 + 7/12 lub 4/12 + 8/12 lub 3/12 + 9/12. **NIGDY 6/6.**
- **Border-radius:**
  - 0px standard wszędzie
  - 2px na inputach (subtle)
  - 4px max na obrazkach (zgodnie z CLAUDE.md)
  - 9999px tylko na pillach (avatary, search bar, status pill)
- **Box-shadow: NONE.** Granice = `1px solid var(--border)`. Hover na karcie nie podnosi cienia, tylko zmienia border-color.
- **Z-index:** sticky header `z-index: 50`. Modal `z-index: 100`. Reszta domyślnie `auto`.

---

## 6 · MOTION

- **Hover na linkach inline:** underline grow-from-left (200ms ease-out, `text-underline-offset: 4px`)
- **Hover na buttonach:** invert bg/fg (150ms ease-out). Brak skalowania.
- **Hover na zdjęciach VIP:** filter grayscale(1) → grayscale(0) (200ms ease-out). Subtelne.
- **Scroll reveal:** brak (przynajmniej w v1). Statyczne strony są szybsze.
- **Prefers-reduced-motion:** wszystko `transition-duration: 0` jeśli user-agent zgłasza preferencję.

**Brak:**
- `transform: scale()` na hover (CLAUDE.md zakaz #6)
- Rosnące box-shadow na hover (no shadow at all)
- Parallax
- Scroll-driven animations
- Hover bouncing

---

## 7 · GRAIN OVERLAY

Subtelny film grain na fotograficznych sekcjach. Implementacja inline-SVG-w-CSS — zero HTTP requestów, zero JS:

```css
.grain {
  position: relative;
  isolation: isolate;
}
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: 0.04;
  mix-blend-mode: multiply;
}
```

**Gdzie używamy:** sekcja hero, sekcja VIP (zdjęcia + filmy), sekcja zespół. **Gdzie NIE:** stopka, formularze, payload-tekstowe sekcje.

---

## 8 · VOICE & TONE WIZUALNY (3 zdania)

> **1.** Strona czyta się jak strona z magazynu — tonowy krem, lekki serif, dużo powietrza, fotografia i typografia pracują same, bez ozdobników.
>
> **2.** Powściągliwa pewność: jeden akcent kolorystyczny używany rzadko, brak shadow i gradientów, brak animacji "wow", w zamian klasyczny editorial pacing — sekcja, oddech, sekcja.
>
> **3.** Bezpieczeństwo jako rzemiosło, nie technologia: zero "AI-tech-corp", zero "blue/purple SaaS", zero ikonek-w-kółkach — w zamian ludzie, portrety, fakty, numery sekcji jak credit w filmie dokumentalnym.

---

## 9 · ARCHITEKTURA SEKCJI VIP (DECYZJA: MIX)

Sekcja flagship dwuwarstwowa — łączymy oba puli contentu zidentyfikowane w KROKU 1 (zob. `brand/major1/RECON.md` §11 i `brand/major1/vip-extracted/CATALOG.md`):

### Warstwa 1 — "Najlepsi pracują z Najlepszymi" (filmy)

- **5 filmów** z `brand/major1/vip-extracted/`:
  - Tomasz Adamek (boks)
  - Natalia Kaczmarek (lekkoatletyka, IO Paryż 2024)
  - Mateusz Borek (dziennikarz sportowy)
  - Joanna Jędrzejczyk (MMA)
  - Reprezentacja Polski w piłce nożnej (zgrupowanie 2021, Hotel Remes Opalenica)
- **Naprzemienny layout L/R/L/R/L** — każdy film osobny pełnoekranowy moduł
- **Custom HTML5 video player** (`<video>` z poster, controls minimalne) — NIE iframe IG, NIE link na IG (chcemy mieć video lokalnie, bez trackerów Meta)
- **Layout per film:** 5/12 (tekst: numer "03.01" mono + imię display + 1-2 zdania kontekstu z opisu IG, verbatim) + 7/12 (video poster lub player)
- Postery: do wyboru z 4 opcji wygenerowanych w KROKU 2 (`brand/major1/vip-extracted/ig-XX-poster-options/poster-{5,30,50,70}pct.jpg`) — user wybiera.

### Warstwa 2 — "Współpracowali z nami" (galeria)

- **11 zdjęć** z `brand/major1/images/vip/` (przeniesione w KROKU 6 do `/images/vip/`):
  50 Cent · Tiësto · Armin van Buuren · Samantha Fox · Joanna Krupa · Magda Gessler · IShowSpeed · Robert Lewandowski · Jan Bednarek · Krzysztof Piątek · Natalia Kaczmarek + Konrad Bukowiecki
- **Editorial gallery:** nieregularna siatka 2/3/4 kolumn (różne aspekty zdjęć w naprzemiennej szachownicy — niektóre full-height, niektóre 2/3-height)
- **Czarno-białe + grain**, hover → kolor + imię (overlay slide-up od dołu, 200ms)
- Pod galerią — jedno zdanie z major1.pl/oferta/ zacytowane 1:1 (TBD verbatim w KROKU 6 — copy z `brand/major1/oferta.html` H2 "Ochrona VIP")

---

## 10 · ZAKAZY (zaktualizowane po PIVOT v2)

❌ Outfit jako font (Major1 fingerprint)
❌ Inter klasyczny / Geist (AI-default fingerprint)
❌ Fraunces / serif display (v1 fingerprint — odrzucone)
❌ Krem/paper jako dominujące tło (v1 — odrzucone)
❌ Terracotta `#C8553D` (v1 — odrzucone)
❌ `border-radius` > 4px (poza pillem 9999px)
❌ `box-shadow` jakikolwiek
❌ `transform: scale()` na hover karty (lekki zoom 1.04 na galerii zdjęć OK)
❌ Lucide / FontAwesome / icons w kółkach jako wyróżniki sekcji
❌ 3-card grid z hover scale
❌ Logo slider (Slick / Swiper)
❌ Stats row "247 obiektów • 24/7 • 100%"
❌ Testimoniale jako karty z gwiazdkami
❌ FAQ accordion
❌ Newsletter signup
❌ Gradient mesh, blob, glassmorphism (backdrop-blur TYLKO na sticky header — wyjątek)
❌ Dekoracyjna tarcza-SVG-opacity-0.25 (Major1 cliché)
❌ Bootstrap, Tailwind, jQuery, npm packages — ŻADNYCH
❌ Emoji w nagłówkach 🚀 ✨
❌ AI-generated images / Storyset / unDraw
❌ Lorem ipsum
❌ Fake testimoniale, wymyślone case studies
❌ Filter grayscale na zdjęciach (v1 — odrzucone, chcemy kolor)
❌ Grain overlay (v1 — odrzucone)

✅ Yellow `#FFC931` — DOZWOLONE jako główny akcent (czystszy niż klienta #fbc30c)
✅ backdrop-filter: blur(8px) — DOZWOLONE TYLKO na .site-header

---

## 11 · PIVOT — Tactical Premium (2026-05-04)

User odrzucił Editorial Defense po obejrzeniu live. Cytat: "wygląda jak galeria sztuki, nie agencja ochrony".

Nowy kierunek: **Tactical Premium**.

### Paleta

| Token | Hex | Zastosowanie |
|---|---|---|
| `--bg-ink` | `#0F1410` | dominujące tło — ciepły deep black |
| `--bg-deep` | `#1A1F1B` | sekcje kontrastujące |
| `--bg-paper` | `#F5F2EC` | jedynie 1-2 sekcje light dla kontrastu |
| `--bg-card` | `#15191A` | kafle, wnętrza komponentów |
| `--accent` | `#FFC931` | żółty Major1 — czystszy |
| `--accent-deep` | `#E0AB1F` | hover, pressed states |
| `--accent-soft` | `rgba(255,201,49,0.12)` | tła hover |
| `--paper` | `#F5F2EC` | tekst główny na dark |
| `--paper-muted` | `rgba(245,242,236,0.72)` | podtytuły, lead |
| `--paper-faint` | `rgba(245,242,236,0.48)` | metadane, captions |

### Type Pairing

| Rola | Font | Weight | Użycie |
|---|---|---|---|
| Display | **Bebas Neue** | 400 | H1 72-200px, H2, numery sekcji, big stats — UPPERCASE, condensed, militarny feel |
| Body / UI | **Manrope** | 300-700 | paragrafy 17-18px, nawigacja, captions, formularze |
| Numbers / Labels | **JetBrains Mono** | 400 | numery sekcji, daty, NIP, REGON |

### Kluczowe zmiany vs v1

- Tło: deep ink #0F1410 dominujące (nie krem)
- Akcent: żółty #FFC931 (nie terracotta)
- Display: Bebas Neue uppercase condensed (nie Fraunces serif light)
- Body: Manrope (nie Inter Tight)
- Logo: 64px w headerze, eksponowane z wordmarkiem Bebas Neue
- Hero: pełnoekranowe zdjęcie zespołu + ciemny gradient overlay (nie abstract "01" outline)
- Galeria gwiazd: KOLOR z żółtą ramką hover (nie BW + grain)
- Zespół: KOLOR portrety z żółtą linią pod imieniem (nie BW)
- Header: sticky z backdrop-blur, ciemny — czytelny nad hero
- Grain overlay: USUNIĘTE
- Buttony: border 2px (mocniej), żółty fill na accent

### Inspiracje wizualne (referencja)

- 5.11 Tactical (5.11.com)
- Magpul (magpul.com)
- Triumph Motorcycles (triumphmotorcycles.com)
- Rivian (rivian.com)
