# TASKS.md — Sito Vetrina Dott. Giovanni Parbonetti

**Aggiornato:** 2026-05-23 | **Branch:** `main` | **Stack:** HTML5 + CSS3 + JS vanilla puro

---

## Contesto del prodotto

Sito vetrina statico a 3 pagine per il **Dott. Giovanni Parbonetti**, Neurochirurgo e Direttore UOC Neurochirurgia presso l'AORN San Pio di Benevento. Target: pazienti e famiglie che cercano un neurochirurgo di riferimento. Nessun backend, nessun CMS, nessuna dipendenza npm.

---

## Setup minimo

```bash
# 1. Clona il repo
git clone https://github.com/formahub3d-cloud/parbonetti-website.git
cd parbonetti-website

# 2. Nessuna dipendenza da installare (sito statico puro)

# 3. Apri in browser
open index.html
# oppure avvia un server locale:
python3 -m http.server 8080
# poi vai su http://localhost:8080
```

> ⚠️ Le foto del dottore (`PHOTO-*.jpg`) sono file locali inclusi nel repo. Sono necessarie per il corretto funzionamento della hero section e della sezione about.

---

## Variabili d'ambiente

Nessuna. Il sito è completamente statico. Nessuna chiave API, nessun token, nessun backend.

| Servizio | Tipo | Note |
|---|---|---|
| Google Maps | Embed iframe | Nessuna chiave, embed pubblico centrato su Benevento |
| YouTube | Embed iframe | Nessuna chiave, video pubblici |

---

## Struttura file

```
parbonetti-website/
├── index.html              # Pagina 1: Home / Chi Sono
├── specializzazioni.html   # Pagina 2: Specializzazioni & Media
├── contatti.html           # Pagina 3: Contatti & Prenota
├── style.css               # CSS condiviso (1069 righe, CSS custom properties)
├── animations.js           # Animazioni vanilla JS (214 righe, zero dipendenze)
├── PHOTO-2025-05-21-15-43-56.jpg   # Foto dottore → hero + morph scene
├── PHOTO-2025-05-19-22-18-21.jpg   # Foto dottore → sezione about
├── PHOTO-2025-06-05-13-00-34.jpg   # Logo ufficiale (cervello+colonna+mani)
├── PHOTO-2025-06-05-19-09-37.jpg   # Foto aggiuntiva
├── PHOTO-2025-05-19-22-19-26.jpg   # Foto aggiuntiva
├── PHOTO-2025-05-21-15-43-57.jpg   # Foto aggiuntiva
├── PHOTO-2025-05-21-15-43-57 2.jpg # Foto aggiuntiva
├── PHOTO-2025-05-21-15-43-56 2.jpg # Foto aggiuntiva
├── PHOTO-2025-05-21-15-45-39.jpg   # Foto aggiuntiva
├── PHOTO-2026-03-09-12-33-07.jpg   # Timbro con P.IVA 01757220627
├── prompt_cowork_parbonetti.md     # Prompt originale Cowork (riferimento design)
├── TASKS.md                # Questo file
└── HANDOFF_PROMPT.md       # Prompt per riprendere su nuovo PC
```

---

## Palette colori (design system)

| Variabile CSS | Hex | Uso |
|---|---|---|
| `--blue` | `#2E6DB4` | Colore primario (emisfero sx logo) |
| `--green` | `#5BA85A` | Colore accento (emisfero dx logo) |
| `--gray` | `#6B7280` | Colore neutro (mani nel logo) |
| `--dark` | `#0A1F3C` | Sfondi hero/footer |
| `--white` | `#FFFFFF` | Sfondo principale |
| `--light-bg` | `#F4F6F9` | Sfondi sezioni alternate |

**Font:** Montserrat (titoli/navbar, Google Fonts) + Open Sans (testo corpo)

---

## Stato sprint / fasi

### ✅ Completato

| Task | Dettaglio |
|---|---|
| CSS condiviso | `style.css` con design system completo, variabili, responsive, dark navbar |
| `index.html` | Hero con foto reale dottore, morph scroll scene, stats, about, testimonianze, CTA |
| `specializzazioni.html` | 17 patologie card, 3 YouTube embed + 1 OttoChannel card, 4 articoli card |
| `contatti.html` | 3 strutture card, Google Maps embed, form contatti GDPR, WhatsApp/tel CTA |
| `animations.js` | Riscritta da zero in vanilla JS (rimozione GSAP CDN che non funzionava su file://) |
| Fix animazioni | Rimossi script GSAP CDN da tutte e 3 le pagine HTML; ripristinato CSS fade-in |
| Hero keyframes | Aggiunti @keyframes CSS per entrata hero (badge, titolo, foto, float animation) |
| `.fade-left/.fade-right` | Varianti direzionali per IntersectionObserver reveal |
| P.IVA nel footer | `01757220627` aggiunta a tutti i footer |
| Studio Privato | Sostituito Caudimed Clinic → Studio Medico Parbonetti, Via Salvator Rosa 19, BN, tel. 389 066 3144 |
| Repository GitHub | Creato `formahub3d-cloud/parbonetti-website` |

### ⏳ In corso / Da verificare

| Task | Priorità | Note |
|---|---|---|
| **Test animazioni in browser** | 🔴 Alta | Aprire `index.html` e verificare: hero text visibile, morph scroll funzionante, card reveal |
| **Test responsive mobile** | 🟡 Media | Verificare layout su 375px e 768px |
| **Form contatti** | 🟡 Media | Attualmente solo frontend; collegare a Formspree o EmailJS per invio reale |

### ❌ Roadmap futura

| Task | Note |
|---|---|
| Hosting / deploy | Suggeriti: Netlify, Vercel, o GitHub Pages (repo già pubblico) |
| Dominio custom | Da acquistare e configurare (es. `dott-parbonetti.it`) |
| Form backend | Formspree free tier è sufficiente; aggiungere `action="https://formspree.io/f/ID"` al form |
| Analytics | Google Analytics o Plausible (codice da aggiungere nel `<head>`) |
| Foto professionali | Il dottore potrà sostituire le foto PHOTO-* con immagini di qualità professionale |
| LinkedIn | Aggiungere link LinkedIn nella navbar/footer quando fornito |
| Blog / Pubblicazioni | Sezione aggiuntiva con articoli scientifici aggiornabili |

---

## Decisioni tecniche già prese (non rinegoziare)

- [x] **Nessun framework** — HTML/CSS/JS puro per semplicità di manutenzione da parte del cliente
- [x] **Nessun GSAP** — rimosso per incompatibilità con protocollo `file://`; tutte le animazioni sono vanilla JS
- [x] **Nessun CMS** — il dottore aggiorna i testi aprendo i file HTML con un editor
- [x] **Nessun npm/build step** — zero dipendenze, apri e modifica
- [x] **CSS custom properties** — tutte le variabili colore in `:root` su `style.css`
- [x] **3 file HTML separati** — una pagina = un file; nessuna SPA, nessun routing

---

## Convenzioni di codice

- Indentazione: **2 spazi** in HTML/CSS/JS
- CSS: classi BEM-like (`stat-card`, `stat-number`, `hero-badge`)
- JS: IIFE `(function(){ 'use strict'; ... })()`, no arrow functions nelle funzioni principali, no `let`/`const` per IE compatibility (non critico ma lo stile è così)
- Commenti CSS: `/* ---------- SEZIONE ---------- */`
- HTML: `aria-hidden="true"` su elementi decorativi, `alt` significativi su immagini
- **Non usare** `!important` tranne nei reset necessari
- **Non aggiungere** script CDN senza verificare il funzionamento offline

---

## Pagine / route disponibili

| File | URL relativo | Contenuto |
|---|---|---|
| `index.html` | `/` | Home: hero, morph scene, stats, about, tecnologie, testimonianze, CTA |
| `specializzazioni.html` | `/specializzazioni.html` | 17 patologie, video media, articoli stampa |
| `contatti.html` | `/contatti.html` | Strutture, mappa, form, WhatsApp/tel |

---

## Riferimenti rapidi

| Risorsa | Link |
|---|---|
| Repository GitHub | https://github.com/formahub3d-cloud/parbonetti-website |
| Organizzazione GitHub | https://github.com/formahub3d-cloud |
| Prompt originale progetto | `prompt_cowork_parbonetti.md` nella root del repo |
| Riferimento design | https://www.flyward.com/ |
| YouTube Dott. Parbonetti | https://www.youtube.com/watch?v=2kDxqU3r5P0 |
| OttoChannel | https://www.ottochannel.tv/on-demand/tr_3590_/in-salute/ep_5396_/ |
| AORN San Pio | https://www.aosanpio.it |
