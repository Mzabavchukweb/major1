# CLAUDE.md — Major1 Redesign

> Czytasz to na początku KAŻDEJ sesji. Tu są stałe zasady. Aktualny status w `PROGRESS.md`.

## CEL PROJEKTU

Strona dla Agencji Ochrony Major1 (Poznań). Klient ma wymienić swoją obecną stronę major1.pl na naszą. Naszym zadaniem jest zrobić ją **2-3 poziomy wyżej wizualnie** niż obecna.

## STACK (sztywno, nie odstępować)

- **Czysty HTML + CSS + waniliowy JS**
- **Brak build stepa.** Brak npm, node_modules, Astro, Vite, Tailwind, TypeScript, preprocesorów, frameworków, bibliotek.
- **Google Fonts** przez standardowy `<link rel="stylesheet">` w `<head>`.
- Strony otwierane przez `python3 -m http.server` lub bezpośrednio w przeglądarce.
- Hosting: dowolny statyczny.

## STRUKTURA REPO

```
major1-redesign/
├── CLAUDE.md              ← ten plik
├── PROGRESS.md            ← status projektu, czytasz na początku sesji
├── MOODBOARD.md           ← kierunek wizualny, paleta, type pairing
├── BRIEF-FOTO.md          ← lista zdjęć potrzebnych od klienta (uzupełniany w trakcie)
├── style.css              ← jeden plik: tokens + reset + komponenty + sekcje
├── index.html
├── o-nas.html
├── oferta.html
├── kontakt.html
├── 404.html
├── oferta/
│   ├── ochrona-fizyczna.html
│   ├── ochrona-vip.html
│   ├── monitoring.html
│   └── konwoje.html
├── partials/              ← header.html, footer.html — ładowane przez fetch w main.js
│   ├── header.html
│   └── footer.html
├── js/
│   ├── main.js            ← partial loader, mobile menu, video player
│   └── vip-data.js        ← tablica testimoniali (uzupełniana ręcznie)
├── images/
├── videos/vip/            ← 5× mp4 + 5× plakat
├── favicon.ico, og-default.png
└── brand/                 ← recon Major1 + referencje (NIE rusza klient, nasza praca)
    ├── major1/            ← recon obecnej strony klienta
    │   ├── index.html
    │   ├── style.css
    │   ├── logo/
    │   ├── fonts/
    │   ├── vip-extracted/ ← 5 mp4 z IG + plakaty
    │   └── README.md
    └── refs/              ← screenshoty 5 referencji wizualnych
        ├── 1-anthropic/
        ├── 2-kalshi/
        ├── 3-ssense/
        ├── 4-linear/
        └── 5-character/
```

## KIERUNEK WIZUALNY: EDITORIAL DEFENSE

Estetyka magazynu premium spotyka B2B security. Pełen opis w `MOODBOARD.md` (KROK 2 utworzy ten plik).

Skrót:
- Tło dominujące: kremowy `#F5F2EC`
- Akcent: terracotta `#C8553D` (jeden, oszczędnie). **NIE żółty** (`#fbc30c` to fingerprint Major1).
- Display: Fraunces light 300-400 (NIE bold)
- Body: Inter Tight 17-18px
- Mono: JetBrains Mono dla numerów sekcji ("01 — AGENCJA")
- Border-radius: 0px standard, 4px max na zdjęciach, 9999px na avatarach
- Box-shadow: brak. Granice = `1px solid var(--border)`
- Whitespace: 160px section padding desktop, 96px mobile
- Asymetryczne gridy (5/12 + 7/12, NIE 6/6)

## ZASADA #1 — COPY 1:1

Cały tekst kopiujesz dokładnie z major1.pl. Niczego nie dodajesz, nie zmieniasz, nie skracasz, nie generujesz. Jeśli czegoś brakuje — zostaw `<!-- TBD: brak w major1 -->` i raportuj listą.

## ZASADA #2 — ZAKAZANE

❌ Yellow `#fbc30c` ani okolice  
❌ Outfit jako font (Major1 fingerprint)  
❌ Inter klasyczny / Geist (AI-default fingerprint)  
❌ `border-radius` > 4px (poza pillem)  
❌ `box-shadow` jakikolwiek  
❌ `transform: scale()` na hover  
❌ Lucide / FontAwesome / icons w kółkach jako wyróżniki sekcji  
❌ 3-card grid z hover scale  
❌ Logo slider (Slick / Swiper)  
❌ Stats row "247 obiektów • 24/7 • 100%"  
❌ Testimoniale jako karty z gwiazdkami  
❌ FAQ accordion  
❌ Newsletter signup  
❌ Gradient mesh, blob, glassmorphism, backdrop-blur  
❌ Dekoracyjna tarcza-SVG-opacity-0.25 (Major1 cliché)  
❌ Bootstrap, Tailwind, jQuery, npm packages — ŻADNYCH  
❌ Emoji w nagłówkach 🚀 ✨  
❌ AI-generated images / Storyset / unDraw  
❌ Lorem ipsum  
❌ Fake testimoniale, wymyślone case studies  

## ZASADA #3 — RAPORTOWANIE (krytyczne)

Każda Twoja odpowiedź na koniec kroku zawiera:

1. **Pełną treść** każdego utworzonego/zmienionego pliku w bloku kodu (`cat plik.html`). **Bez skrótów typu `/* tu będzie X linijek */`. Bez "i tak dalej". Bez `[...]`.**
2. **Faktyczne screenshoty** gdy KROK ich wymaga. Ścieżka do PNG na dysku, którą ja otworzę. **NIGDY placeholder `[Image]`** w treści wiadomości — to skutkuje przerwaniem projektu.
3. **Output komend** w pełnej treści (ls, tree, server log) — nieobcięte.
4. **Co nie zostało zrobione** — explicite. "Nie udało się X bo Y" jest wartościowsze niż udawanie sukcesu.

Halucynowanie skutków pracy (np. opisywanie screenshotów których nie zrobiłeś, stuby `/* X linijek */` zamiast kodu) = STOP projektu.

## ZASADA #4 — JEDEN KROK NA SESJĘ

Każdy KROK to osobna sesja Claude Code. Na początku każdej sesji:
1. `cat CLAUDE.md` (przypomnienie zasad)
2. `cat PROGRESS.md` (gdzie jesteśmy)
3. `cat MOODBOARD.md` jeśli istnieje
4. Wykonaj tylko bieżący KROK
5. Dopisz linijkę do PROGRESS.md ("KROK X — done. Output: pliki Y, Z.")
6. Stop. Czekaj na PROMPT do następnego kroku.

NIE skacz między krokami. NIE rób "przy okazji" rzeczy z innych kroków.

## ZASADA #5 — GDY CZEGOŚ BRAKUJE

- Brak treści w major1.pl → `<!-- TBD: brak w major1 -->` + raport
- Brak imion VIP → placeholder `{{VIP_01_NAME}}`, użytkownik uzupełni
- Brak zdjęć od klienta → szary placeholder + dopis do `BRIEF-FOTO.md`
- Brak case studies → sekcja pominięta. NIE wymyślasz.

## PLAN KROKÓW

- KROK 1 — recon major1.pl + struktura katalogów (Ty pobierasz wszystko z neta)
- KROK 2 — `MOODBOARD.md` + screenshoty referencji
- KROK 3 — `style.css` (tokeny + reset + utilities)
- KROK 4 — `styleguide.html` (weryfikacja typo, palety, komponentów)
- KROK 5 — Hero `index.html`
- KROK 6 — Sekcja VIP (flagship)
- KROK 7 — Reszta sekcji index.html
- KROK 8 — Header + footer + partial loader
- KROK 9 — Pozostałe podstrony
- KROK 10 — Polish (Lighthouse, SEO, alt-y, sitemap)
