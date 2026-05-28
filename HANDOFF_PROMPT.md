# HANDOFF_PROMPT.md — Sito Dott. Parbonetti

Copia il blocco qui sotto e incollalo come **primo messaggio** nella nuova sessione Claude sul nuovo PC.

---

```markdown
## Contesto progetto

Sono Andrea (formahub3d@gmail.com). Sto lavorando a un sito vetrina statico per il **Dott. Giovanni Parbonetti**, Neurochirurgo e Direttore UOC Neurochirurgia presso l'AORN San Pio di Benevento. Il sito è già completo nelle 3 pagine principali; questa sessione serve per riprendere il lavoro da dove si era fermato.

---

## Stack & Repository

- **Stack:** HTML5 + CSS3 + JavaScript vanilla puro — nessun framework, nessun npm, nessun build step
- **Repository:** https://github.com/formahub3d-cloud/parbonetti-website
- **Branch principale:** `main`
- **Cartella locale (nuovo PC):** dopo il clone, la cartella sarà `parbonetti-website/`

---

## Setup sul nuovo PC

Esegui questi comandi nell'ordine esatto:

```bash
# 1. Clona il repository
git clone https://github.com/formahub3d-cloud/parbonetti-website.git
cd parbonetti-website

# 2. Nessuna dipendenza da installare (sito statico puro)

# 3. Apri il sito nel browser
open index.html
# oppure avvia un server locale:
python3 -m http.server 8080
# poi vai su http://localhost:8080

# 4. Leggi lo stato del progetto
cat TASKS.md
```

> ⚠️ Le immagini `PHOTO-*.jpg` sono incluse nel repo e sono necessarie per la hero section e la sezione about. Se mancano, controlla che `git clone` abbia completato correttamente.

---

## Struttura file principale

```
parbonetti-website/
├── index.html              # Pagina 1: Home / Chi Sono
├── specializzazioni.html   # Pagina 2: Specializzazioni & Media
├── contatti.html           # Pagina 3: Contatti & Prenota
├── style.css               # CSS condiviso (design system, variabili, responsive)
├── animations.js           # Animazioni vanilla JS (zero dipendenze esterne)
├── TASKS.md                # Stato completo del progetto (leggi prima di tutto)
└── PHOTO-*.jpg             # Foto dottore + logo ufficiale
```

---

## Cosa NON fare

- ❌ Non aggiungere npm, webpack, Vite, o qualsiasi build tool
- ❌ Non aggiungere GSAP o altre librerie di animazione CDN (incompatibili con `file://`)
- ❌ Non usare `!important` nel CSS tranne nei reset necessari
- ❌ Non committare `.DS_Store`, `.env*`, credenziali, chiavi API o token
- ❌ Non fare `git push --force` o riscrivere la history del branch `main`
- ❌ Non creare file separati CSS/JS per componenti — tutto va nel file condiviso esistente

---

## Task da riprendere

Leggi **`TASKS.md`** per lo stato aggiornato. Le priorità correnti al momento del handoff erano:

1. **Test animazioni in browser** — Aprire `index.html` e verificare: hero text visibile al caricamento, morph scroll scene funzionante durante lo scroll, card reveal con IntersectionObserver
2. **Test responsive mobile** — Verificare layout su 375px (iPhone) e 768px (iPad)
3. **Form contatti** — Attualmente solo frontend; collegare a [Formspree](https://formspree.io) free tier (aggiungere `action="https://formspree.io/f/YOUR_ID"` al `<form>` in `contatti.html`)

---

## Convenzioni di codice

- **Indentazione:** 2 spazi in HTML/CSS/JS
- **CSS:** classi BEM-like (`stat-card`, `hero-badge`, `section-title`)
- **JS:** IIFE `(function(){ 'use strict'; ... })()`, stile ES5-compatibile
- **Commenti CSS:** `/* ---------- SEZIONE ---------- */`
- **Animazioni scroll:** IntersectionObserver + classe `.visible` su elementi `.fade-in`
- **Hero entrance:** `@keyframes` CSS puri (heroFadeUp, heroSlideRight, heroFloat)

---

## Prima di iniziare a scrivere codice

Chiedimi sempre cosa vuoi fare prima di modificare file. Leggi `TASKS.md` per capire il contesto, poi proponi l'approccio e aspetta conferma.
```

---

## Note per Andrea

- Questo file va copiato **così com'è** nella nuova sessione Claude — il blocco markdown contiene tutto il contesto necessario.
- Dopo il `git clone`, **non serve fare nient'altro** per avviare il sito: nessun `npm install`, nessuna variabile d'ambiente.
- Se il nuovo PC non ha Python 3, usa qualsiasi server locale alternativo (`npx serve`, Live Server in VS Code, ecc.) oppure apri semplicemente `index.html` con doppio click da Finder.
- Il form contatti (`contatti.html`) funziona visivamente ma **non invia email reali** finché non viene collegato a Formspree. È il prossimo task da completare.
- Il repository è pubblico su GitHub: https://github.com/formahub3d-cloud/parbonetti-website
