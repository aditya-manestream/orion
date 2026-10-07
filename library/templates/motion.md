# Motion prompt templates (M1 to M6)
Manestream Build Library, checked 2 Oct 2026. Placeholders look like `{{THIS}}`.

Orion currently uses Motion (motion.dev) and Lenis. M1 and M2 assume GSAP; do not add GSAP to Orion without asking. Use the Motion-based equivalent or ask first.

## M1: Pinned scroll story (GSAP + Lenis)
Use when: real estate chapters, product stories, case-study reels.
```text
Implement one pinned storytelling sequence for {{SECTION}}: pin it for {{N}} viewport heights and, as the user scrolls, swap {{N}} panels (image plus caption) with a crossfade and a 24px rise, while a progress line scrubs. Use useGSAP or gsap.context for cleanup; use gsap.matchMedia to disable pinning below 768px and show the panels stacked; sync Lenis with lenis.on('scroll', ScrollTrigger.update) and drive lenis.raf from gsap.ticker. Under prefers-reduced-motion, render the stacked version.
```

## M2: Headline reveal (SplitText)
Use when: hero and section headings.
```text
Animate the H1 with GSAP SplitText: split into lines with a mask so each line slides up from 100% with opacity over 0.8s, stagger 0.08s, ease 'expo.out'. Re-split on resize (autoSplit), keep the heading accessible (aria-label with the full text) and skip the animation under reduced motion.
```

## M3: Page transitions
Use when: multi-page sites and work indexes.
```text
Add page transitions between {{ROUTES}} with the View Transitions API and a no-op fallback: the outgoing page fades and moves up 8px, the incoming page fades in, and the case-study image morphs from the index to the detail page via view-transition-name. Keep the whole transition under 400ms.
```

## M4: Micro-interaction pass
Use when: after any build.
```text
Pass over every interactive element: add a :active press of scale(0.97) at 120ms ease-out on buttons; apply hover styles only inside @media (hover: hover); make popovers and dropdowns scale from 0.95 with opacity and set transform-origin at the trigger; remove animation from keyboard-triggered and high-frequency actions; replace every transition: all with explicit properties; make exits faster than entrances.
```

## M5: Accessible marquee
Use when: logos, testimonials, ticker lines.
```text
Build an accessible marquee: duplicate the track for a seamless loop with a linear CSS animation of about 40s; pause on hover and focus-within; under prefers-reduced-motion show a static wrapped row; fade both edges with mask-image; mark the duplicate track aria-hidden.
```

## M6: Honest count-up numbers
Use when: stats bands with real figures.
```text
Animate {{REAL_NUMBERS}} counting up once when 60% visible (IntersectionObserver), 1.2s ease-out, with tabular-nums. Put the final value in the HTML for SEO and no-JS, and format with Intl.NumberFormat('en-IN').
```
