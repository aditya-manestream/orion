# Workflow prompt templates (W1 to W8)
Manestream Build Library, checked 2 Oct 2026. Placeholders look like `{{THIS}}`. Send each with the House Rules block (`../house-rules.md`) appended where marked.

## W1: Adapter: make a free library prompt ours
Use when: run any Aura, VibUI, MotionSites or websiteprompts.ai prompt through this first. (append House Rules)
```text
Below is a reference prompt from {{SOURCE}}. Treat it as a starting spec, not the final design.
1. Extract its structure: sections, layout devices, motion moments, type and colour roles. Summarise in ten lines.
2. Rebuild it for {{BRAND}} with our content: {{CONTENT}}. Replace every brand name, line of copy, number, logo, image and video. Never hotlink assets from the source's CDN; use our files or clearly marked placeholders.
3. Change at least these identity levers so the result is recognisably ours: typeface pairing, palette, hero composition, signature interaction.
4. Port it to {{STACK}} and our DESIGN.md.
5. Finish with a list of what you changed versus the reference.
---
{{PASTE_REFERENCE_PROMPT}}
```

## W2: Screenshot or reference to an original build
Use when: using a screenshot (including of paid templates) as a learning reference. (append House Rules)
```text
I am attaching screenshots of {{REFERENCE}} as reference only.
1. Describe what makes it work: grid, hierarchy, spacing rhythm, type scale ratios, colour roles, motion cues. Do not describe its brand.
2. Propose two directions for {{BRAND}} that keep those principles but change identity (type, palette, imagery, hero composition, signature interaction). Wait for my pick.
3. Build the chosen direction with our real content, using the image-to-code skill's analysis discipline.
4. Before finishing, compare section by section with the reference and change anything that reads as a copy: layout combination, copy, imagery, distinctive motion. Then run the audit-reference-originality skill.
```

## W3: Write DESIGN.md from references
Use when: kickoff of every project.
```text
Create DESIGN.md for {{BRAND}} from these references: {{REFERENCE_LINKS_OR_DESIGN_MD_FILES}} and these brand facts: {{BRAND_FACTS}}.
Follow the DESIGN.md spec: YAML front matter tokens (colors, typography, rounded, spacing) plus prose sections: overview and visual thesis, colours (each with its job), typography roles (font, sizes via clamp, weights, tracking, line height), spacing, shape and elevation, iconography, imagery rules, motion tokens and rules, component notes (button, input, nav, card) and a do/don't list.
Mix principles from at least two references so the result belongs to no single source. Then run: npx @google/design.md lint DESIGN.md and fix every finding. Also output the tokens as Tailwind v4 @theme CSS variables.
```

## W4: Taste pass (anti-slop review)
Use when: after the first full build. (append House Rules)
```text
Review the current page as a design director. First, list the ten highest-impact problems in a table (element, problem, fix). Check: generic AI patterns (eyebrows, identical cards, gradient text, glows, fake UI, filler copy, em dashes), hierarchy, spacing rhythm, type roles, colour jobs, interactive states, the 375px layout, and whether each animation explains something.
Then fix them in one batch, screenshot at 375 and 1440, and show before and after. Do not add sections, effects, fonts or colours unless a fix needs them.
```

## W5: Copy pass
Use when: before design review; pairs with Stop Slop or Humanizer.
```text
Rewrite all visible copy on {{PAGE}} for {{AUDIENCE}}: active voice, the customer as the subject, specific nouns and numbers we can prove. No filler verbs (elevate, seamless, unlock, empower), no 'not X, it's Y', no em dashes, no rhetorical-question headlines. Headlines under eight words; CTAs name the action (Book a site visit, not Get started). Score each section 1 to 10 on directness, rhythm, trust, authenticity and density, and revise anything under 7.
```

## W6: Mobile and visual QA (Playwright CLI)
Use when: before every client review.
```text
Use playwright-cli to open {{URL}} at 375x812 and 1440x900. Screenshot every section, then check: no horizontal scroll; tap targets at least 44px; no text under 14px on mobile; sticky elements never cover content or focus; images don't shift layout; menus open and close with keyboard and touch; forms show errors and success. Report issues with screenshots, fix them in one batch, then re-check once.
```

## W7: Performance pass (Chrome DevTools MCP)
Use when: before launch.
```text
Use the chrome-devtools MCP to record a performance trace of {{URL}} with mobile emulation (Slow 4G, 4x CPU throttle) and run a Lighthouse audit. Report the LCP element and time, CLS sources, total JavaScript, the heaviest images and any render-blocking fonts or scripts. Targets: LCP under 2.5s, CLS under 0.1, INP under 200ms. Fix the top five issues (image sizes and formats, font preload and subsetting, lazy-loading video and WebGL, code-splitting, dropping unused libraries) and measure again.
```

## W8: CLAUDE.md starter for every client repo
Use when: drop into the project root so Claude Code always follows the house rules. (append House Rules)
```text
# {{CLIENT}} website: build rules for Claude
Stack: {{STACK}}. Hosting: {{HOSTING}}.
Before any UI work, read PRODUCT.md and DESIGN.md. If either is missing, ask me three questions and write it.
Skills to use: design-taste-frontend for building, impeccable for critique and polish, gsap-* for scroll motion, stop-slop for copy, web-design-guidelines for review, audit-reference-originality before launch.
Market: India first, mobile first. Rupees with Indian digit grouping, +91 phone formats, WhatsApp as a primary contact path.
After each section: screenshot at 375 and 1440 with playwright-cli and fix what you see in one batch.
Before launch: Lighthouse and a performance trace via the chrome-devtools MCP; LCP under 2.5s on mobile.
```
