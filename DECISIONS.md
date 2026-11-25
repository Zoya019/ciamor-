# Ciamor: Design Decisions Log

Running record of what was decided, why, and what's still open.
Newest entries go at the top of each section. Status: ✅ agreed · ⏳ waiting on Zoya · 🧾 waiting on client.

---

## Open questions for Zoya ⏳

1. **Secondary hero CTA: which style?** Two options were rendered (ghost button vs. underlined text link).
   Recommendation: **text link**. The ghost button looks the same as the quiz CTA's *hover* state
   (transparent + white border), so on hover the two buttons become twins.
2. **Proposed section order** (see Research below). Approve or redirect.
3. **Simplified dosha section.** The handoff says to confirm with you before building.
4. **Type scale vs. reality.** The token scale (72 / 48 / 26 / 24 / 20 / 14 / 12) isn't what the final
   nav/hero use (headline 56px, subtext 15px, CTA 13px, nav 14px). New sections need *one* scale. Options:
   (a) keep the docx scale for new sections (they'll look bigger than the hero), or
   (b) add a second, hero-matched scale (e.g. 56 / 40 / 32 / 15 / 13) and use that. Recommendation: (b), because "match the hero" is the rule.
5. **Logo gold vs. star gold.** The official logo's gold is `#AA8124`; the `--color-star` token is `#C4933F`. Should the rating stars use the real brand gold?
6. **Announcement bar is empty** in the reference (just `&nbsp;`). Ported as-is. What should it say? (Or 🧾 for the client.)

---

## Setup ✅

| Decision | Why |
|---|---|
| Repo is `Zoya019/ciamor-` (not `ciamor-website`) | Zoya created it. Trailing hyphen flagged and kept unless she renames it. |
| Vanilla HTML/CSS/JS, one CSS file per section | Zoya can read and edit everything; sections can't break each other. |
| `reference/ciamor-reference.html` is byte-identical to the original | It's the record of Zoya's design. Never edit it. |
| Only **one** base64 image existed (hero photo) | The handoff expected several; the other images were all external URLs. |
| Hero now uses `assets/images/hero-model.webp` (100 KB) instead of the extracted PNG (1.7 MB) | Zoya supplied the WebP. Same picture (avg. difference ≈1/255, invisible), 17× smaller. |
| Split-door dosha section archived in `archive/dosha-split-door/` as a runnable standalone page | Portfolio piece. Verified the doors still open on scroll, no JS errors. |

### New tokens added during the port
| Token | Value | Why |
|---|---|---|
| `--color-brand-green` / `-gold` / `-ink` | `#516325` / `#AA8124` / `#41392E` | Colours of the official logo, for reference. (Replaced the stand-in `--color-logo-green`.) |
| `--color-white-rgb` | `255, 255, 255` | For transparent whites (`rgba(var(--color-white-rgb), 0.12)`). A hex token can't take an alpha in plain CSS. |
| `--color-text-primary-rgb` | `88, 63, 48` | Same, for the brown hairline borders. |
| `--color-shade-rgb` | `20, 12, 6` | Near-black brown used by hero overlay, hotspot spotlight, mobile menu. |

---

## Real assets swapped in ✅

| Change | Why |
|---|---|
| Hand-rebuilt SVG logo + HTML tagline → **official `assets/images/logo.svg`** (as an `<img>`, 52px tall desktop / 44px mobile) | The real brand file. The stand-in depended on the font loading and had the wrong drop/sprout shapes. The official lockup includes the tagline, so the separate tagline text and its CSS were removed. On mobile it reads better than the old white tagline did. This is the one intentional visual change to the "final" nav. Before/after in `docs/screenshots/logo-before-after.png`. |
| Cream hotspot image added: `assets/images/cream-smear.png` (858×858, transparent) | Was missing from the reference. Hotspot now works as designed. |

## Announcement bar + Navbar + Hero: ported ✅

**Verified pixel-exact:** screenshots of reference vs. port at 375 / 768 / 1280 / 1440, animations frozen →
**0 pixels differ** at every width.

Changes made during the port (none visible to a mouse user):
- Raw colours → tokens with identical values.
- Removed dead code: `.logo-text` rules (matched nothing; the logo is an SVG), `mix-blend-mode: normal` / `isolation` on the headline, `!important` on hero colours, and the inline `style` on the CTA arrow (moved into `hero.css`, same 13px).
- **Accessibility added:** keyboard focus rings (`:focus-visible`, white over the photo); `aria-expanded` + Escape-to-close + focus management on the mobile menu; `aria-hidden` on decorative SVGs/arrow; `<main>` landmark; `prefers-reduced-motion` stops the hotspot pulse.
- Logo SVG left as-is (hex colours inside SVG attributes). It's an asset, not section CSS.

Known issues carried over from the reference (not fixed, because the hero is "final"):
- ~~The cream hotspot image doesn't exist~~ → fixed, Zoya supplied it.
- Hotspot labels are "Feature One … Feature Five" placeholders.
- The hotspot only works on hover, so keyboard and screen-reader users can't reach it. Fine for decoration, but if the five features matter they need to exist as real text somewhere.

---

## Dosha section: simplify ⏳ (confirm before building)

From the handoff review: keep the *education*, drop the *scroll hijack*.
- ❌ 5 pinned screens: first product at ~screen 7; only the mouse wheel is handled (keyboard, Page Down, scrollbar and touch all break it).
- ❌ Repeats the "Discovered your Dosha?" tab in the shop section.
- ❌ Vata "Sensitive" vs. Pitta "Sensitive, Reactive" means users can't tell them apart.
- ➡️ One section: Vata / Pitta / Kapha side by side, one clear line each (dry & tight / hot, red, breakout-prone / oily & congested), "Shop [Dosha]" link each, plus "Not sure? Take the Skin Quiz". Normal scrolling.

---

## Research summary: homepage structure ⏳

> Evidence quality: mostly agency blogs and vendor case studies (quiz-tool companies selling quizzes).
> No public A/B data from Curology, Prose, etc. Treat these as industry convention, not proof.

**1. The homepage is a router, not a billboard.** DTC beauty homepages send visitors down 2–3 purchase paths fast and push long brand storytelling lower down. Baymard: show differentiators without overwhelming.
→ *Adopt:* hero offers Quiz + Shop; brand story near the bottom.

**2. Quiz-led brands don't make the quiz the only door.** Prose, Geologie and others send most *paid* traffic straight to the quiz URL, skipping the homepage. So homepage visitors skew organic/returning, and many already know what they want. Inkey moved its quiz CTA higher and kept shopping open.
→ *Adopt:* secondary "Shop Bestsellers" CTA; products early. 🧾 Client note: ad traffic should land on the quiz page, not the homepage.

**3. Products within the first 1–2 scrolls.** The reference has the first product at ~screen 7, the biggest structural problem.
→ *Adopt:* Bestsellers directly after the trust bar.

**4. Unfamiliar frameworks get one compact teaching moment.** Forest Essentials, Shankara, Moksa and Rituals keep dosha education short on the homepage and hand depth to a quiz/dedicated page.
→ *Adopt:* the simplified 3-column dosha section.

**5. Proof sits close to the decision.** Stars on product cards; a reviews block right after products/quiz, where doubt peaks.
→ *Adopt:* Reviews moved above Ingredients.

**6. Footers are utility + trust.** Newsletter, shop links, help (shipping, returns, FAQ, contact), legal (privacy, terms, cookies), social, payment icons, currency/region selector, copyright. For an international store, currency/region and shipping/returns matter more than usual.
→ *Adopt*, with the newsletter as the footer's top band.

### Proposed section order (changes from the handoff in **bold**)
1. Announcement bar ✅
2. Navbar ✅
3. Hero ✅ + secondary Shop CTA
4. Trust bar (currency fixed)
5. **Bestsellers** (moved up)
6. Dosha explainer (simplified)
7. Skin Quiz feature block
8. **Reviews** (moved above Ingredients)
9. Ingredients
10. About / brand story teaser
11. **Newsletter + Footer merged**

### Challenges to the handoff
- **"Shop by Dosha" tab duplicates the dosha section.** Confirmed in the reference: it's the "Discovered your Dosha? Find your Ritual" block. Recommend dropping the tab.
- **Dosha section + Quiz block sit back-to-back and both push the quiz.** OK only if the jobs differ (dosha = "what are the three"; quiz = "how it works: steps, ~2 min, what you get"). If they converge, merge them.
- **Standalone newsletter section is padding.** Merge into the footer.

Sources: [Splitbase](https://splitbase.com/blog/beauty-ecommerce-optimization) ·
[Baymard DTC benchmark](https://baymard.com/blog/dtc-benchmark) ·
[Contentsquare / Inkey](https://contentsquare.com/customers/inkey/) ·
[Octane AI / Geologie](https://www.octaneai.com/case-studies/geologie) (vendor) ·
[ConvertFlow / Prose](https://www.convertflow.com/blog/prose-funnel-teardown) ·
[involve.me](https://www.involve.me/blog/quiz-for-skincare-brands) (vendor) ·
[Forest Essentials](https://forestessentialsindia.com/decode-your-dosha) ·
[Rituals](https://www.rituals.com/en-us/mag-ayurveda-balance.html) ·
[UXPin footers](https://www.uxpin.com/studio/blog/footer-design-basics/)

---

## Bugs found in the reference's later sections (fix when rebuilding each)

- **Undefined CSS variables:** `--color-text-soft`, `--color-accent-dark`, `--color-bg-card`, `--color-card-bg` are used but never defined, so those styles silently fall back.
- **Review cards have no size on desktop:** `--card-width` / `--card-height` are only set inside `@media (max-width: 640px)`.
- **Stars use `--color-accent` (brown), not `--color-star` (gold).**
- **Trust bar + reviews marquees never pause:** no `prefers-reduced-motion` handling and no pause control (WCAG 2.2.2 for content moving > 5s).
- **Product carousel arrows** (`←` `→`) have no accessible names; the wishlist "♡" isn't a button.
- **Hover-only interactions** (product overlay with Add to Bag, review video flip) are unreachable on touch and keyboard.

---

## Client to-dos 🧾

| Item | Where | Note |
|---|---|---|
| Free-shipping threshold in the right currency | Trust bar | Reference says "₹999"; audience is international. Will ship as `Free Shipping Above $XX`. |
| Verify "Dermatologist Tested" | Trust bar | Needs evidence before launch. |
| Verify "Loved by 10,000+ Customers" | Trust bar | Needs a real number. |
| Verify "Cruelty Free & Vegan" | Trust bar | Usually tied to a certification (e.g. Leaping Bunny, Vegan Society). Which one, if any? |
| Verify "100% Natural Ayurvedic Ingredients" | Trust bar | "100% natural" is a regulated/contested claim in some markets. |
| Confirm "30-Day Easy Returns" policy | Trust bar | Must match the real returns policy. |
| Verify "4.8 average · 2,300+ verified reviews" | Shop header | Needs a real source (review platform). |
| Announcement bar copy | Top of page | Currently empty. |
| Cream hotspot: 5 real feature labels | Hero | Currently "Feature One…Five". |
| ~~Official logo as a vector file~~ | Nav | ✅ Supplied. |
| **Hero image is AI-generated (Gemini watermark)** | Hero | See "Images to replace". Decide: real photoshoot, or licensed AI image + disclosure. |
| Product data (names, prices, ratings, images) | Shop | All placeholder. |

---

## Images to replace before launch

| Image | Where | Problem |
|---|---|---|
| `assets/images/hero-model.webp` | Hero | **AI-generated:** has Google Gemini's sparkle watermark in the bottom-right corner (mostly hidden by the hero's bottom fade, but it's there). Don't edit the mark out. For a skincare brand whose headline is "Skin that speaks for itself", an AI face is a real risk: ad regulators (e.g. UK ASA) treat retouched/generated skin in cosmetics ads as potentially misleading. Also still only **1376×768**, so soft on large screens. Needs a real photograph (≥2560px wide), or a client decision to use AI imagery with appropriate rights/disclosure. |
| `assets/images/cream-smear.png` | Hero hotspot | Supplied by Zoya. Confirm source/licence (is it a stock image?). |
| `i.pinimg.com/736x/44/56/b9/4456b9ee4f97e0d601fe777534a03640.jpg` | Dosha slide 1 (archived) | Pinterest hotlink: licensing + will break. |
| `i.pinimg.com/1200x/b3/a7/de/b3a7de5e4cbe04eabf212acbf5bbc02e.jpg` | Dosha / Vata (archived) | Pinterest hotlink, tagged placeholder. |
| `i.pinimg.com/1200x/d4/51/90/d45190e1ecfececb980773269ecd7648.jpg` | Dosha / Pitta (archived) | Pinterest hotlink. |
| `i.pinimg.com/736x/7a/f6/a1/7af6a1393823c55d46eae227fcdd0f85.jpg` | Dosha / Kapha (archived) | Pinterest hotlink, tagged placeholder. |
| `i.pinimg.com/1200x/65/e2/61/65e2610e83946d9efe705d00f4be48e0.jpg` | Dosha quiz slide (archived) | Pinterest hotlink, tagged placeholder. |
| `placehold.co/…?text=Vata/Pitta/Kapha+Image` (3) | Dosha slides (archived) | Placeholder service. |
| `placehold.co/…?text=Product+1…7` | Shop carousel | Placeholder. Need product photography. |
| `placehold.co/…?text=Face+Cleansers / Scrubs / Masks` | Shop: Categories tab | Placeholder. |
| `placehold.co/…?text=Vata/Pitta/Kapha+Collection` | Shop: Dosha tab | Placeholder. |
| `placehold.co/…?text=Video+Review` + MDN `flower.mp4` | Reviews | Placeholder poster and sample video. Need real customer video (with consent). |

The Pinterest images only live in `archive/` and `reference/` now. They must not be carried into any new live section.
