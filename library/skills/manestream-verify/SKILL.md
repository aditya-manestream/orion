---
name: manestream-verify
description: Pre-review and pre-launch verification for a Manestream site: mobile and visual QA at 375 and 1440, performance (LCP, CLS, INP), the craft-floor checklist, and an originality check. Use before a client sees the work or before launch.
---

# Manestream verify

Read `library/house-rules.md` (Craft floor, References and originality) and `library/templates/workflow.md` (W6, W7). Report findings; fix only what I ask you to fix, or what is clearly broken and low-risk, and say which.

## 1. Mobile and visual QA (W6)
Open the running site (start `npm run dev` if needed) at 375x812 and 1440x900 with playwright-cli if installed. Screenshot every section, then check:
- no horizontal scroll at 375, 768 and 1440
- tap targets at least 44px; no text under 14px on mobile
- sticky elements never cover content or focus
- images do not shift layout; they carry width and height
- menus open and close by keyboard and touch; forms show errors and success
- hover, focus-visible, active, disabled, loading and empty states exist where needed
- contrast at least 4.5:1 body, 3:1 large text
- `prefers-reduced-motion` gives a complete static version

## 2. Performance (W7)
If the chrome-devtools MCP is installed, trace the page with mobile emulation (Slow 4G, 4x CPU) and run Lighthouse. Report the LCP element and time, CLS sources, total JavaScript, heaviest images, render-blocking fonts or scripts. Targets: LCP under 2.5s, CLS under 0.1, INP under 200ms. If the MCP is not installed, say so and fall back to `npm run build` output and a code review of image, font and script loading.

## 3. Code review
If the `web-design-guidelines` skill is installed, run it against `src/`. Always run `npm run lint` and `npm run build` and report failures.

## 4. Originality
If any reference, template, screenshot or prompt pack was used, run the `audit-reference-originality` skill if installed; otherwise compare section by section against the reference and list anything that reads as a copy. Check that no asset is hotlinked from a third-party CDN.

## Report format
A short table per area: pass, fail, not run (and why). End with the top five fixes in priority order. Never mark something "pass" that you did not actually run.
