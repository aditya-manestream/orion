---
name: Orion Developers
status: baseline captured from the repo; items under "Proposals" are not yet approved
colors:
  navy-deep: "#0b1728"
  navy-mid: "#0e1d31"
  navy: "#13243b"
  navy-card: "#182f4c"
  navy-card-hover: "#1b3350"
  rust: "#c2622e"
  rust-dark: "#a5501f"
  apricot: "#e0916a"
  apricot-pale: "#fbe7dc"
  ink-100: "#ffffff"
  ink-200: "#edf1f6"
  ink-300: "#dce4ef"
  ink-400: "#c4d0e0"
  ink-600: "#a9bad1"
  ink-800: "#7a8aa3"
  ink-900: "#5f6e85"
typography:
  display: { family: "Bricolage Grotesque", source: next/font/google, weights: [600, 700], tracking: "-0.025em to -0.035em", leading: "0.9 to 1.0" }
  body: { family: "Hanken Grotesk", source: next/font/google, size: "clamp(15px, 1.2vw, 18px) to clamp(16px, 1.35vw, 20px)", leading: 1.6 }
  label: { family: "JetBrains Mono", source: next/font/google, size: "11px to 13px", tracking: "0.14em to 0.3em", case: uppercase }
rounded: { all: 0 }
spacing:
  base: 4px
  section-y: "clamp(74px, 9vw, 140px)"
  gutter: "24px / 32px / 64px (px-6, sm:px-8, lg:px-16)"
  max-width: 1400px
motion:
  ease-entrance: "cubic-bezier(0.16, 1, 0.3, 1)"
  reveal: "opacity 0 to 1, y 26px to 0, 700ms, once"
  smooth-scroll: "Lenis, duration 1.1, ease-out cubic"
---

# Design system: Orion Developers

## Visual thesis
A steel works seen at dusk: real site photography under deep navy, organised by hairline rules and mono spec labels like a drawing sheet, with rust marking the way to a quote.

Closest library world: **Industrial Precision** (T2). Levers Orion already changes versus that world: typeface (Bricolage Grotesque + Hanken Grotesk, not Barlow/Plex), palette (navy and rust with apricot, not graphite and amber), dark-first surfaces, and a full-bleed photographic hero.

## Colour jobs (as built)
- **navy-deep / navy-mid / navy**: page and section surfaces, alternating to separate sections.
- **rust**: primary buttons, the scroll progress bar, card top borders, list markers, code labels, and two full-section backgrounds (Process, Assurance). Rust currently has many jobs.
- **apricot**: mono labels, links, kicker text.
- **ink scale**: tinted cool neutrals for text. ink-600 is the default body colour on navy.

## Typography roles
- Display (Bricolage): headings, project names, stat values. `text-wrap: balance` is used on h1/h2.
- Body (Hanken): paragraphs, list items, contact details.
- Label (JetBrains Mono, uppercase, wide tracking): kickers, codes (A.01, P.01, Fig. 01), buttons, nav, stat labels. This is a deliberate signature: the "drawing sheet" voice.

## Shape and elevation
Square corners everywhere. Depth by 1px white/alpha borders and gap-px grids on a tinted background. One shadow: rust glow on project-card hover.

## Imagery
Real site photography only (`public/photos/`), cover-cropped under a navy gradient. A labelled anatomy diagram on a light #eef1f4 field. Corner brackets in rust frame some images.

## Motion (as built)
1. Loading screen: 2.6s brand video before the site is shown (every visit).
2. Hero: staggered fade-up starting at 2.7s.
3. `Reveal`: fade-up on nearly every block on scroll.
4. Anatomy scrolly (desktop): 400vh pinned diagram that zooms to each of four systems. This is the one moment that explains something.
5. Hover: project image scale 1.05 plus rust frame and glow; client logo scale 1.05.
6. Lenis smooth scroll site-wide.
No `prefers-reduced-motion` handling exists yet.

## Components
- **Button, primary**: rust fill, mono uppercase 13px, 19px/34px padding, hover rust-dark. No focus-visible or active style.
- **Button, secondary**: 1px white/34% border, hover apricot border and tint.
- **Nav**: top utility bar (location, phone, email) plus a header that gains a blurred navy background after 40px; links hidden below md, only "Request a quote" shows on mobile.
- **Card**: project photo card with tag, category, name, scope.
- **Accordion**: Build section configurations, button with plus/minus.

## Do / don't
- Do keep real photos, square corners, navy surfaces, mono spec labels for real codes and specs.
- Do keep one accent doing the primary action.
- Don't add decorative blueprint grids, fake numbers or fourth-party imagery.
- Don't animate what doesn't explain.

## Proposals (not approved; listed for the taste pass)
- Narrow rust to actions and data markers; reconsider full rust section backgrounds.
- Reduce motion to two authored moments: anatomy scrolly plus one more; drop or shorten the loading screen.
- Add focus-visible, active and reduced-motion states.
- Add a WhatsApp path.
