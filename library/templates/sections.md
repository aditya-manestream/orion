# Section prompt templates (S1 to S14)
Manestream Build Library, checked 2 Oct 2026. Placeholders look like `{{THIS}}`. Send each with the House Rules block (`../house-rules.md`) appended.

## S1: Hero: type-led editorial
Use when: typography and one strong image should carry the brand. (append House Rules)
```text
Build the hero for {{BRAND}} as a type-led composition. Headline of at most 8 words in {{DISPLAY_FONT}}, tracking -0.02em to -0.03em, balanced wrap. One supporting line of at most 20 words. Primary CTA {{CTA}} and one quiet text link.
Asymmetric layout: the headline spans 8 of 12 columns; supporting media (a real photo or product shot) offsets right and bleeds off the edge. Mobile order: headline, line, CTA, media.
Entrance: words rise 12px with opacity over 700ms, staggered 60ms, ease-out cubic-bezier(0.23,1,0.32,1); media unmasks with clip-path. No eyebrow, no badges, no scroll cue.
```

## S2: Hero: cinematic video
Use when: real estate, hospitality, automotive, launches. (append House Rules)
```text
Build a full-viewport video hero using our own file {{VIDEO_URL}}: muted, playsinline, looping, with a poster image for first paint and preload="metadata". Add a tinted overlay only as strong as needed for 4.5:1 text contrast. Headline bottom-left, CTA beside it.
Pause the video when the hero leaves the viewport and under prefers-reduced-motion (show the poster). On mobile serve a 9:16 cut {{MOBILE_VIDEO_URL}} under 3 MB. Never autoplay audio.
```

## S3: Hero: product proof
Use when: SaaS and AI products where the product is the argument. (append House Rules)
```text
Build a hero that proves the product in the first viewport: an outcome headline, a mechanism subline, the primary CTA, and a real product screenshot {{SCREENSHOT}} in a lightly framed container with a soft offset shadow. Optionally a 6 to 10 second screen-recording loop (MP4 plus WebM) of the core action.
No div-built fake UI and no floating badges with invented metrics. Below: one row of real customer logos at 60% opacity, full on hover.
```

## S4: Hero backdrop: 3D or shader
Use when: adding ShaderGradient or a ThreeUI piece behind a hero. (append House Rules)
```text
Add an animated backdrop to the hero using {{SHADERGRADIENT_URL_OR_THREEUI_COMPONENT}}. Configure it from the palette {{COLORS}} at low speed, behind content, with a solid colour fallback.
Initialise after first paint, cap devicePixelRatio at 1.5, pause when offscreen or when the tab is hidden, and render a static image under prefers-reduced-motion or on low-memory devices (navigator.deviceMemory below 4). Text must stay readable on every frame.
```

## S5: Navigation (mobile-first)
Use when: every site. (append House Rules)
```text
Build the navigation. Desktop: logo left, four or five links, one primary CTA right; the header hides on scroll down and returns on scroll up; the current page is marked.
Mobile: logo, a 44px menu button and the primary CTA stay visible. The menu opens as a full-height sheet with large links and Call, WhatsApp and Email shortcuts; it closes on Escape, link tap and outside tap; focus is trapped while open; body scroll locks with overscroll-behavior: contain. Animate the sheet with transform only: 250ms ease-out in, 200ms out.
```

## S6: Social proof (honest)
Use when: testimonials, logos and numbers. (append House Rules)
```text
Build a social-proof section from these real assets only: {{LOGOS}}, {{TESTIMONIALS_WITH_NAME_ROLE_COMPANY_PHOTO}}, {{NUMBERS_WITH_SOURCE}}. Lead with the single strongest testimonial large (quote in the display face, attribution and photo below), then two to four shorter quotes. Logos as a static row, or a slow marquee that pauses on hover and focus and stops under reduced motion. If we lack something, leave it out. Never fill gaps with invented content.
```

## S7: Features without cards
Use when: replacing the three-identical-cards reflex. (append House Rules)
```text
Present {{FEATURES}} without a grid of identical cards. Alternate rows: each feature gets a short heading (what it does for the user), one or two sentences, and a real visual of that feature (screenshot crop, photo or short loop). Vary the composition every row: image left, image right, one full-bleed row, one row with a pinned visual that changes as its text scrolls. Keep one spacing rhythm and the same type roles throughout.
```

## S8: Process or how it works
Use when: services, B2B, agencies. (append House Rules)
```text
Show the process {{STEPS}} as a sequence where order carries meaning: a vertical line that draws as you scroll (GSAP ScrollTrigger scrub on scaleY), each step named by its verb (Measure, Design, Install), one sentence each, and how long it takes. No 'Step 1' labels and no numbered circles unless the numbers matter.
```

## S9: Pricing (India-ready)
Use when: packages, plans and service tiers. (append House Rules)
```text
Build pricing for {{PLANS}}. Prices in rupees with Indian digit grouping (₹1,20,000), a clear note on whether GST is included, and a monthly/annual toggle that shows the real saving. Highlight one recommended plan through position and weight, not a glowing border. Each plan: who it is for (one line), price, the five to seven inclusions that differ, a CTA. Add a compact comparison table below (tabular numbers, sticky header on mobile). Answer the top three pricing objections in an FAQ right after.
```

## S10: FAQ
Use when: objection handling plus SEO. (append House Rules)
```text
Build an FAQ from these objections: {{QUESTIONS}}. Use an accessible accordion (button with aria-expanded, region with aria-controls), animate height with a grid-template-rows 0fr to 1fr transition, allow several open, and give each question an id for deep links. Add FAQPage schema. Answers in plain language, two to four sentences, with a link when an action follows.
```

## S11: Closing CTA with WhatsApp
Use when: every conversion page in India. (append House Rules)
```text
Close the page with one decisive CTA band: a specific promise ({{PROMISE}}), the primary button {{CTA}}, and a WhatsApp button that opens wa.me/{{PHONE}}?text={{URL_ENCODED_MESSAGE}} with a prefilled message that names the page the visitor came from. On mobile, show a sticky bottom bar with Call and WhatsApp after the hero and hide it when the footer is visible.
```

## S12: Enquiry or RFQ form
Use when: lead capture. (append House Rules)
```text
Build the enquiry form with only the fields we need: {{FIELDS}}. Labels above inputs; correct type, inputmode and autocomplete (tel defaulting to +91, email); validation on blur with errors that say how to fix them; a submit button that disables and shows a loading label while sending; a confirmation that says what happens next and when. Send to {{ENDPOINT}}. Add a honeypot field and basic rate limiting. Fire the conversion event only on success.
```

## S13: Footer
Use when: every site. (append House Rules)
```text
Build a footer that works as a second navigation: brand line, three or four link groups, contact (address, phone, email, WhatsApp), hours if relevant, legal links (privacy, terms; RERA, GST or CIN where applicable) and social links as text or one consistent icon set. Keep it calm; no giant decorative wordmark unless the brand world calls for one.
```

## S14: Case study page
Use when: agency and portfolio work pages. (append House Rules)
```text
Build a case study page for {{PROJECT}} for {{CLIENT}}. Order: title and one-line outcome over a full-bleed key visual; the problem in the client's terms; what we did (strategy, design, build) with process images; the key screens or a short film; results that are real and attributed; credits; next case study as a large teaser. Shared-element transition from the work index image to this page's hero image.
```
