@AGENTS.md

# Orion Developers: build rules (Manestream Build Library)

Orion is a live, in-progress client site: Orion Developers, a pre-engineered building (PEB) manufacturer in Nashik, Maharashtra. Existing decisions in this repo win: the brand theme in `src/app/globals.css`, the fonts, and the stack in `package.json` (Next.js App Router, Tailwind v4, Motion, Lenis). Use the library to review, improve and extend the site, not to restart the design. Do not add dependencies (GSAP, shadcn, etc.) without asking me first.

## Library (read on demand, not up front)
- `library/README.md`: map of the library and the 7-stage build workflow.
- `library/house-rules.md`: full rules. `library/directions.md`: direction worlds. Closest fit for Orion: Industrial Precision.
- `library/templates/`: site-type (T0 to T8), section (S1 to S14), motion (M1 to M6) and workflow (W1 to W8) prompts. Closest site type: T2 Industrial and manufacturing B2B.
- `library/sources.md`: tools, skills and licences. `library/setup.sh`: one-time installs (I run it, you don't).
- Skills: `/manestream-kickoff` (design read + PRODUCT.md + DESIGN.md), `/manestream-taste-pass` (anti-slop review and one fix batch), `/manestream-verify` (375/1440 screenshots, performance, originality).

## Before any UI work
Read `PRODUCT.md` and `DESIGN.md` if they exist. If either is missing, run `/manestream-kickoff` instead of guessing; ask me at most three questions.
If a third-party skill named in the library (taste, impeccable, stop-slop, playwright-cli, etc.) is not installed, skip it and say so. Do not install anything yourself.

## Market
India first, mobile first. Rupees with Indian digit grouping (₹1,20,000), +91 phone formats, WhatsApp as a primary contact path. Assume most visitors are on a phone.

## House rules (apply to everything you build)
- Design read first: audience, the one action, one visual thesis sentence. Write DESIGN.md before code.
- Layout: one focal point per viewport; no grids of identical icon cards, no nested cards, no three equal feature columns; no eyebrows, section numbers, scroll cues, status dots or decorative grids.
- Type: no Inter/system display face; body 16-18px at 65-75ch; display tracking -0.02 to -0.03em; text-wrap: balance; no gradient text.
- Colour: tinted neutrals (no #000, no flat grey); one accent with one job; no purple-blue gradients, glows or decorative glass; border OR soft shadow, not both.
- Motion: only when it explains; max two authored moments; ease-out cubic-bezier(0.23,1,0.32,1) for entrances; never scale(0), never transition: all; full prefers-reduced-motion fallback.
- Copy: only real proof; no Acme/John Doe/99.99%; no filler verbs, no "not X, it's Y", no em dashes; buttons name the action.
- No div-built fake product UI; no hotlinked third-party assets.
- Done when: works at 375/768/1440 with no horizontal scroll; all interactive states; contrast >= 4.5:1; images sized; LCP prioritised; selection/focus/scrollbars themed; screenshots at 375 and 1440 reviewed, one fix batch, one confirm.

## Working rules
- Where a house rule conflicts with a deliberate Orion design decision (for example the mono labels), do not silently pick a side: flag the conflict and ask.
- After each section: screenshot at 375 and 1440 and fix what you see in one batch (playwright-cli if installed).
- Before launch: Lighthouse and a performance trace; LCP under 2.5s on mobile.
- Real site photography lives in `public/photos/`. Never invent clients, numbers, certifications or testimonials; use only what is in `src/lib/projects.ts` or what I supply.
