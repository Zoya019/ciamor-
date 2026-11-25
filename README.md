# Ciamor: website revamp

Homepage revamp for **Ciamor** ("Siamor"), *Just Nature, Nothing Else*, an Ayurvedic skincare brand
for an international audience. Design: Zoya.

Plain HTML/CSS/JS. No framework, no build step.

## View it locally
Open `index.html` in a browser. That's it.

(If something behaves oddly from `file://`, run a tiny local server from this folder:
`python3 -m http.server` then visit http://localhost:8000.)

## Live preview (Vercel)
- **Live site:** https://ciamor.vercel.app
- **Dashboard (Zoya only):** https://vercel.com/zoya019s-projects/ciamor-
- Every push to `main` redeploys automatically. No build step: Framework Preset is "Other" and Vercel serves the files as-is.
- The original design is also live at `/reference/ciamor-reference.html`, and the archived split-door section at `/archive/dosha-split-door/`.

## Where things live
```
index.html                 the page
css/tokens.css             colours, fonts, type scale: change brand values HERE only
css/base.css               reset + global styles (focus rings, etc.)
css/sections/*.css         one file per section
js/sections/*.js           one file per section that needs behaviour
assets/images/             images used by the live page
reference/                 Zoya's original design build. DO NOT EDIT.
archive/dosha-split-door/  original scroll-pinned dosha section (portfolio, not used live)
docs/screenshots/          verification + review screenshots
handoff.md                 project brief
DECISIONS.md               every design decision + reasoning, client to-dos, images to replace
```

## Adding a section
1. Write the markup in `index.html` inside `<main>`.
2. Create `css/sections/<name>.css` and link it in the `<head>` after the others.
3. If it needs JS, create `js/sections/<name>.js` and add a `<script>` at the bottom of `<body>`.
4. Use only tokens from `tokens.css`. New token? Add it there and log it in `DECISIONS.md`.

## Status
- ✅ Announcement bar, navbar, hero: ported pixel-exact from the reference
- ⏳ Everything below the hero: next, one section at a time
