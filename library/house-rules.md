# House rules (full)
Manestream Build Library, checked 2 Oct 2026. The compact always-on version lives in `../CLAUDE.md`; this file is the full reference. Site and section templates are meant to be sent with the House Rules block appended.

## Decide before you draw
- Write a three-line design read first: who it is for, the one action the page exists for, and one visual thesis sentence.
- Pick the mode: Persuade (marketing), Operate (app/dashboard), Read (docs/blog) or Experience (portfolio). The mode decides how loud the design can be.
- Set the dials 1 to 10: layout variance, motion intensity, visual density.
- Order sections by the buyer's journey and objections, not the default hero, features, testimonials, pricing, FAQ, CTA template.
- Write or update DESIGN.md before building and lint it.

## Layout
- One focal point per viewport and one primary action per flow.
- No grid of identical icon, title and text cards as the page skeleton. No cards inside cards. No three equal feature columns by reflex.
- Use proximity before containers and hierarchy before labels.
- No eyebrow or kicker above headings. No 01, 02, 03 section numbers unless the order itself is information.
- No decorative hairline grids, crosshairs, status dots, locale or time strips, or scroll cues.
- Hero stays readable on a 13 inch laptop and a 375px phone without scrolling.

## Typography
- Not Inter or the system font as the display face. Pick a face with character that fits the brand, and self-host it.
- Body 16 to 18px with a 65 to 75 character measure. Display tracking around -0.02em to -0.03em, never below -0.04em.
- `text-wrap: balance` on headings. Hierarchy comes from clear size and weight steps, not a screaming H1.
- No gradient text. Real quotes and ellipses, tabular numbers for figures, Indian digit grouping for rupees.

## Colour and material
- No pure #000 or flat grey. Tint neutrals toward the palette; never grey text on a coloured background.
- One accent with one job (usually the primary action). Desaturate it to sit with the neutrals.
- No purple-to-blue default gradient, outer glows, neon halos, or glassmorphism as decoration.
- Depth comes from a border or a soft offset shadow, never both. No thick coloured side borders. Hard offset shadows only in a deliberately brutalist world.
- Choose light or dark from where and how the site is used, not from the industry cliché.

## Motion
- Every animation must explain something: state, cause, continuity, feedback or story. Decoration alone is cut.
- One or two authored moments per page beat a fade-up on every section.
- Entrances ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`); on-screen moves ease-in-out (`cubic-bezier(0.77, 0, 0.175, 1)`); loops linear. Never ease-in on an entrance.
- Start from scale 0.95 plus opacity, never scale 0. Exits faster than entrances.
- Animate transform and opacity (blur, clip-path and mask carefully). Never `transition: all`.
- No animation on high-frequency or keyboard actions. Buttons get a press state (scale 0.97).
- `prefers-reduced-motion` gets a complete static version; muted decorative video stops.

## Copy and honesty
- Only real proof: real clients, numbers, reviews and awards with permission. Label illustrative values.
- No placeholder brands (Acme, Nexus), no John Doe, no 99.99%. Demo data should look local and real: Indian names, +91 numbers, rupees.
- No filler verbs (elevate, seamless, unlock, empower, revolutionize), no "not X, it's Y", no em dashes, no rhetorical-question headlines.
- Buttons name the action (Book a site visit, Request a quote). Errors say how to fix them.
- No div-built fake dashboards or terminals in the hero. Use a real screenshot, a real render, or nothing.

## Craft floor (check on the rendered page)
- Contrast at least 4.5:1 for body text and 3:1 for large text.
- Hover, focus-visible, active, disabled, loading, empty and error states exist where needed.
- Theme the browser surfaces: text selection, caret, focus ring, scrollbars, link underline offset.
- Images carry width and height; the LCP image is prioritised; below-fold media lazy-loads; fonts preload with swap.
- Mobile: `100dvh` not `100vh`, inputs at least 16px, tap targets 44px, safe-area insets, no horizontal scroll.
- Screenshot at 375 and 1440, fix everything in one batch, confirm once. Then stop polishing.

## References and originality
- From references, take principles (hierarchy, pacing, contrast, motion grammar), never identity (logo, copy, imagery, a distinctive layout combination).
- Change at least four identity levers versus any reference: typeface pairing, palette, hero composition, signature interaction.
- Never hotlink a source's videos or images. Use client-owned or licensed assets.
- Run an originality audit before launch on anything built from a template, screenshot or prompt pack.

## House rules block (append to prompts)
```text
HOUSE RULES (apply to everything you build)
- Design read first: audience, the one action, one visual thesis sentence. Write DESIGN.md before code.
- Layout: one focal point per viewport; no grids of identical icon cards, no nested cards, no three equal feature columns; no eyebrows, section numbers, scroll cues, status dots or decorative grids.
- Type: no Inter/system display face; body 16-18px at 65-75ch; display tracking -0.02 to -0.03em; text-wrap: balance; no gradient text.
- Colour: tinted neutrals (no #000, no flat grey); one accent with one job; no purple-blue gradients, glows or decorative glass; border OR soft shadow, not both.
- Motion: only when it explains; max two authored moments; ease-out cubic-bezier(0.23,1,0.32,1) for entrances; never scale(0), never transition: all; full prefers-reduced-motion fallback.
- Copy: only real proof; no Acme/John Doe/99.99%; no filler verbs, no "not X, it's Y", no em dashes; buttons name the action.
- No div-built fake product UI; no hotlinked third-party assets.
- Done when: works at 375/768/1440 with no horizontal scroll; all interactive states; contrast >= 4.5:1; images sized; LCP prioritised; selection/focus/scrollbars themed; screenshots at 375 and 1440 reviewed, one fix batch, one confirm.
```
