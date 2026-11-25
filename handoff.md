# HANDOFF: Ciamor Website Revamp

For Claude Code. Read this whole file before doing anything. It is the full history and the brief for this project. The attached `ciamor-reference.html` is the current design build. You'll be working with Zoya, the designer, section by section until the site is finished.

## 1. Who you're working with

Zoya is a final-year Computer Engineering student in India who is moving into product design. She's a self-taught designer and is on this project as both designer and project manager. She writes HTML/CSS/JS herself and is still learning it seriously, so:

- Write clean, readable, well-commented code that she can follow and edit by hand.
- When you make a non-obvious technical choice, explain it in a sentence or two.
- She wants brutal honesty. If a design decision is weak, say so and say why. Don't soften it.
- She thinks out loud and writes casually. Pull out the actual ask and act on it.
- She works section by section: build, show, get feedback, refine, then move on. Don't build ten sections in one go and present them as done.

## 2. The project

Ciamor (pronounced "Siamor", tagline "Just Nature, Nothing Else") is an Ayurvedic skincare brand. It's a foreign company and the site is built for a foreign / international audience, not Indian shoppers.

This is a revamp of their existing e-commerce website, designed by Zoya.

### What makes this brand different

1. The Skin Quiz is the brand's central pitch. It's the main conversion tool and the primary hero CTA.
2. The shop is organised by the three Ayurvedic doshas: Vata, Pitta, Kapha. Each dosha has its own collection.
   - **Vata (Air & Space):** dry, flaky, dehydrated skin. Ritual: Hydration, Repair, Protection. Key ingredients: Ashwagandha, Saffron, Moringa, Aloe Vera.
   - **Pitta (Fire & Water):** reactive, red, acne-prone, heat-triggered skin. Ritual: Cooling, Soothing, Balancing. Key ingredients: Manjistha, Sandalwood, Aloe Vera, Green Tea.
   - **Kapha (Water & Earth):** oily, congested, dull skin. Ritual: Detox, Clarity, Balance. Key ingredients: Neem, Tulsi, Wild Turmeric, Coriander.
3. A foreign customer doesn't know what a dosha is, so a "Shop Pitta" button means nothing to them yet. The site has to educate as well as sell. That's the core design tension (see §5).

## 3. Your first tasks (setup)

1. Create the GitHub repo named `ciamor-website`, using `gh repo create ciamor-website --private` unless Zoya says public. If `gh` isn't authenticated, stop and ask her to run `gh auth login`. Don't work around it.
2. Set up this structure (vanilla HTML/CSS/JS, no framework, so Zoya can read and edit everything):

```
ciamor-website/
├── index.html
├── css/
│   ├── tokens.css        ← design tokens (§4), single source of truth
│   ├── base.css          ← reset, typography, globals
│   └── sections/         ← one CSS file per section (nav.css, hero.css, ...)
├── js/
│   └── sections/         ← one JS file per section that needs it
├── assets/
│   └── images/
├── reference/
│   └── ciamor-reference.html   ← the original attached file, untouched
├── handoff.md            ← this file
├── DECISIONS.md          ← running log of design decisions + reasoning
└── README.md
```

3. Put the original file in `reference/` unchanged. Never edit it. It's the record of what Zoya designed.
4. Get the images out. The reference file is ~2.3 MB because images are embedded as base64 data URIs. Decode them into `assets/images/` with sensible names and reference them by path.
5. Flag every placeholder image. Several images are hotlinked from `i.pinimg.com` (Pinterest) and some are tagged `placeholder`. They're stand-ins only and can't ship, because there are licensing problems and hotlinks break. Keep them for now, but list every one in `DECISIONS.md` under "Images to replace before launch".
6. Make the first commit, push, and set up GitHub Pages (or tell Zoya which one-step option you recommend) so she has a live preview URL.
7. Start `DECISIONS.md` with the decisions in §5 below.

## 4. Design system (pull these from the reference file's `:root`)

```css
/* Colors */
--color-bg-primary:   #E6DFD6;   /* warm beige page background */
--color-text-primary: #583F30;   /* deep brown */
--color-text-secondary: rgba(107, 76, 58, 0.72);
--color-accent:       #6B4C3A;
--color-white:        #FFFFFF;
--color-star:         #C4933F;   /* rating stars, gold */
--color-overlay:      rgba(237, 232, 224, 0.88);

/* Fonts */
--font-display: 'Cormorant Garamond', serif;   /* headings, editorial */
--font-body:    'Poppins', sans-serif;          /* body, UI, CTAs */

/* Type scale */
--fs-h1: 72px;  --fs-h2: 48px;  --fs-body-lg: 26px;
--fs-body-cta: 24px;  --fs-body: 20px;  --fs-label: 14px;  --fs-fine: 12px;
```

The feel is editorial, warm, earthy, premium: an Ayurvedic luxury brand, not a clinical one. Zoya leans towards sharp edges and editorial typography. Every new section has to look like it belongs next to the hero. If you're unsure, match the hero.

Use the tokens. No hardcoded colours or font sizes in section CSS. If you need a new token, add it to `tokens.css` and note it in `DECISIONS.md`.

## 5. History & decisions already made

### ✅ KEEP EXACTLY AS IS: Announcement bar, Navbar, Hero

These are final. Port them from the reference file pixel-for-pixel: same markup, same styles, same behaviour. That covers:

- The announcement bar
- The navbar (logo, links: Shop, About us, Skin Quiz, Ayurveda, Contact, Gift Cards, icon buttons, hamburger + mobile menu)
- The hero: full-bleed model image, headline "Skin that speaks for itself", subcopy, the "Take the Skin Quiz ↗" CTA, and the cream-texture hotspot that reveals five feature labels on hover (already hidden on touch devices)

After porting, take screenshots of the reference and your version side by side and confirm they match. Don't "improve" the hero. One exception, which Zoya has approved in principle: add a secondary "Shop Bestsellers" CTA next to the quiz CTA so people who already know what they want have a direct route to the products. Style it as a quieter secondary button and show Zoya before committing.

### ⚠️ Dosha section: decided to SIMPLIFY (confirm with Zoya before building)

The reference has a 5-slide, scroll-pinned "split-door" section (`.dosha-wrapper`, `height: 500vh`, `position: sticky`). It cancels the mouse wheel and plays a 900ms door-opening animation per slide.

Review outcome: the idea is right, but the execution adds too much friction.

- ✅ Right: educating foreign customers about doshas is necessary, because the whole shop is organised around them.
- ❌ Wrong: hijacking the scroll for 5 screens. The first product doesn't appear until about screen 7. Returning customers get punished. Only the wheel is handled, so keyboard, Page Down, scrollbar dragging and touch laptops all break the effect.
- ❌ Repetition: the shop section also has a "Discovered your Dosha? Find your Ritual" block with Vata/Pitta/Kapha cards.
- ❌ Copy overlap: Vata says "Sensitive" and Pitta says "Sensitive, Reactive", so users can't tell which one they are.

Direction: replace it with one section that shows Vata, Pitta and Kapha side by side, one short line each plus a "Shop [Dosha]" link, plus a "Not sure? Take the Skin Quiz" prompt. Normal scrolling, with gentle reveal-on-scroll animation at most and no pinning or wheel hijacking. Rewrite the descriptors so each dosha is clearly different (Vata = dry/tight, Pitta = hot/red/breakout-prone, Kapha = oily/congested). Let the quiz do the in-depth teaching.

Keep Zoya's original split-door code in a `archive/dosha-split-door/` folder. It's good work for her portfolio even though the live site won't use it.

### Other things to fix while building

- The trust bar says "Free Shipping Above ₹999". The audience is foreign, so the currency is wrong. Use a placeholder like `Free Shipping Above $XX` and flag it for the client.
- "Dermatologist Tested" and "Loved by 10,000+ Customers" are claims the client has to verify before launch. Leave them, but log them in `DECISIONS.md`.
- The Ingredients and Reviews sections in the reference are mostly lorem ipsum and need real structure and content.

## 6. Your main job: research, then build the base design for the rest of the page

Everything below the hero is base design: a solid, on-brand first version that Zoya will refine section by section later. Aim for a strong v1 that she can critique, not a finished, polished final.

### Step 1: Research first (before writing section code)

Look at how strong DTC skincare / wellness e-commerce homepages are structured, especially brands that sell an unfamiliar framework or ritual (Ayurvedic, K-beauty, quiz-led brands). Work out:

- Section order and how soon products appear
- How quiz-led brands balance "learn about yourself" against "just let me buy"
- How ingredient stories, social proof and reviews are presented
- What a premium, editorial skincare footer contains (newsletter, policies, social, payment, etc.)

Write a short summary in `DECISIONS.md`: the patterns you found, which ones you're adopting for Ciamor and why. Show Zoya this summary and your proposed section order before building, so she can redirect you.

### Step 2: Proposed section order (a starting point, challenge it if the research says otherwise)

1. Announcement bar ✅ (keep)
2. Navbar ✅ (keep)
3. Hero ✅ (keep, plus secondary Shop CTA)
4. Trust bar (keep the marquee, fix currency)
5. Bestsellers / Shop section (tabs: All Products, Categories, Shop by Concern, Shop by Dosha; product carousel with Add to Bag, Subscribe & Save 15% option). Consider moving this above the dosha explainer so products show up early.
6. Dosha explainer (simplified, as in §5)
7. Skin Quiz feature block (what the quiz is, how long it takes, what you get)
8. Ingredients: "Ayurvedic wisdom, backed by nature's own science" (replace the lorem ipsum with real ingredient storytelling)
9. Reviews / social proof (4.8 average, 2,300+ verified reviews, real-feeling review cards)
10. About / brand story teaser
11. Newsletter signup
12. Footer

### Step 3: Build rules

- Mobile-first and responsive. Check 375px, 768px, 1280px and 1440px.
- Accessibility: semantic HTML, alt text, visible focus states, keyboard-navigable tabs and carousels, `prefers-reduced-motion` respected, and contrast checked against the beige background.
- Animations: subtle and purposeful, never blocking scroll. This brand should feel calm.
- No scroll hijacking anywhere.
- Keep each section self-contained (its own CSS file, its own JS if needed) so Zoya can work on one without breaking another.
- Use clearly labelled placeholder content where real content doesn't exist yet, e.g. `[CLIENT: product name]`. Never invent fake claims, fake certifications or fake named reviewers presented as real.
- Commit after each section with a clear message, e.g. `feat(ingredients): base layout + 4 ingredient cards`.

## 7. How to work with Zoya from here

- After setup (§3) and the research summary (§6, Step 1), stop and check in.
- Then build one section at a time. After each one: screenshot it, explain the key choices in 2–3 lines, and wait for her feedback before the next.
- Log every agreed decision in `DECISIONS.md` with a one-line reason. She documents her design reasoning carefully, and this file is that record for the repo.
- If she asks for something you think is a bad idea, say so plainly, explain why, offer the alternative, then do what she decides.

## 8. Definition of done (for this phase)

- [ ] `ciamor-website` repo created, pushed, live preview URL working
- [ ] Original file preserved in `reference/`, images extracted, placeholders logged
- [ ] Announcement bar + nav + hero ported pixel-exact (verified with side-by-side screenshots)
- [ ] Research summary + section order approved by Zoya
- [ ] All sections in §6 built as a base design, responsive and accessible
- [ ] `DECISIONS.md` up to date with decisions, client to-dos and images to replace
