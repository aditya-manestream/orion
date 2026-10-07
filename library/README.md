# Manestream Build Library: start here
Checked 2 Oct 2026 (source: Web Design & Dev project, `web-library/`). Free tiers, prices and free-prompt rotations move, so confirm on the source before quoting a client.

This folder is the working library for building websites at Manestream. Claude Code reads `CLAUDE.md` automatically (the always-on rules); everything else here is pulled in on demand.

## What is where

| File | Use it for |
|---|---|
| `../CLAUDE.md` | Always-on House Rules and Orion-specific context. Loaded every session. |
| `house-rules.md` | The full house rules with the reasoning behind each. |
| `templates/site-types.md` | T0 Master brief, T1 to T8 site-type prompts. |
| `templates/sections.md` | S1 to S14 section prompts (hero, nav, proof, pricing, FAQ, CTA, form, footer, case study). |
| `templates/motion.md` | M1 to M6 motion prompts (GSAP + Lenis, SplitText, transitions, marquee, count-up). |
| `templates/workflow.md` | W1 to W8: adapter, screenshot-to-original, DESIGN.md, taste pass, copy pass, mobile QA, performance, CLAUDE.md starter. |
| `directions.md` | Direction worlds (type pairings, palettes, layout, motion, dials), hero architectures, signature moments. |
| `sources.md` | Every source, skill and tool: cost, licence, install command, gotchas. |
| `setup.sh` | One-time installs for the skills and MCPs the workflow leans on. You run it; Claude does not. |

Skills (in `../.claude/skills/`, invoke by name): `/manestream-kickoff`, `/manestream-taste-pass`, `/manestream-verify`.
The canonical copies live in `skills/` here; `../.claude/skills/` is the live copy Claude Code loads. To use them in another repo: `mkdir -p .claude/skills && cp -R <path-to>/library/skills/. .claude/skills/`. If you edit one copy, edit the other.

Browsable version with search, copy buttons and the Direction generator: https://claude.ai/artifact/J1oiHZkA8pmnGpF9cDoizK

## How we build a site

**1. Brief**: product truth before pixels.
- Collect the offer, audience, primary action, real proof, objections and assets from the client.
- Run `/impeccable init` to write PRODUCT.md.
- Write the three-line design read and pick the mode and dials.
- Tools: Impeccable, UI UX Pro Max

**2. Direction**: one coherent world, borrowed from no single source.
- Pull 6 to 10 references from Awwwards, Recent, Behance, Dribbble, Mobbin and Refero Styles.
- Pick a starting world from `directions.md` and adjust it to the client.
- Write DESIGN.md (template W3) mixing principles from 2 or 3 references, then lint it.
- Tools: Awwwards, Recent, Refero Styles, Mobbin, DESIGN.md spec + linter, awesome-design-md

**3. Structure**: sections that answer the buyer, in order.
- Map the buyer journey and objections to sections.
- Write the copy first (copywriting skill), then run Stop Slop or Humanizer.
- Fill the Master Brief (T0) or a site-type template.
- Tools: Marketing skills (Corey Haines), Stop Slop, Humanizer

**4. Build**: assemble fast from proven parts, then make it yours.
- Start from a free prompt (Aura, websiteprompts.ai, VibUI, MotionSites) through the Adapter prompt (W1), or from the brief alone.
- Pull components through the shadcn MCP (Magic UI, React Bits, Kokonut, Bklit, 21st.dev).
- Restyle every component to DESIGN.md tokens; nothing ships in its default look.
- Tools: Aura, websiteprompts.ai, VibUI, MotionSites, shadcn/ui, Magic UI, React Bits, 21st.dev, Kokonut UI, Bklit UI

**5. Motion**: one or two authored moments that explain.
- Scroll choreography with GSAP + ScrollTrigger + Lenis; UI state motion with Motion.
- 3D or shader moments from ThreeUI or ShaderGradient, lazy-loaded with static fallbacks.
- Run Emil's review-animations skill.
- Tools: GSAP, Lenis, Motion, ThreeUI, ShaderGradient, Rive, Emil Kowalski skills

**6. Taste pass**: remove the reflexes.
- Run `/impeccable critique`, then the Taste pass prompt (W4, or `/manestream-taste-pass`).
- Fix in one batch, then `/impeccable polish`.
- Tools: Taste Skill, Impeccable, Meng To's Skills, Jakub Krehel's skills

**7. Verify**: prove it works on a real phone.
- Playwright CLI screenshots at 375 and 1440 (W6).
- Chrome DevTools MCP trace + Lighthouse on mobile (W7).
- Vercel guidelines review and web quality audit.
- Originality audit if any reference, template or prompt pack was used.
- Or run `/manestream-verify`.

## Which tool for what

| You need | Reach for |
|---|---|
| A complete starting spec for an industry | websiteprompts.ai (local and services), Aura free templates (?q=industry), VibUI free |
| A cinematic, motion-led hero | MotionSites free picks, ThreeUI backgrounds, 21st.dev Heroes; GSAP + Lenis to build it |
| A specific section pattern (pricing, FAQ, testimonials) | 21st.dev category pages, then Copy prompt |
| Small animated UI details | Magic UI, React Bits, Kokonut UI via the shadcn MCP |
| Charts on a results or investor page | Bklit UI |
| A 3D or shader moment | ThreeUI (MIT community), ShaderGradient; Three.js skills for custom scenes |
| Interactive mascot or animated icon | Rive |
| A design system to learn from | Refero Styles, awesome-design-md, Aura DESIGN.md library |
| Industry-specific palette and type ideas | UI UX Pro Max, then filter through the house rules |
| Copy that doesn't sound like AI | copywriting skill, then Stop Slop scoring or Humanizer rewrite |
| Turn a screenshot into code | Paste into Claude Code with the image-to-code skill; screenshot-to-code for multi-model variants |
| Turn a screen recording into a prompt | Meng To's video-to-superprompt skill |
| Check we didn't copy a reference | Meng To's audit-reference-originality skill |
| Mobile and visual QA | Playwright CLI |
| Speed problems | Chrome DevTools MCP + web quality skills |
| New skills | skills.sh Design & UI topic |

## Licences and gotchas

- **Aura's free plan is personal use.** Its pricing page lists the Free plan as personal use only, with commercial use on Pro. For client builds, treat Aura prompts as starting specs you rewrite, or take Pro for that month.
- **Prompt packs hotlink their media.** MotionSites and VibUI prompts point at videos on their own CDN. Download or replace every asset with client-owned or licensed files before launch.
- **React Bits has a Commons Clause.** Free inside client websites, but you may not sell or redistribute the components, so keep them out of any template you sell.
- **Brand DESIGN.md files are references.** Refero Styles and awesome-design-md describe real companies. Mix principles from several; a client site that reads as Stripe or Linear is a liability.
- **Screenshots of paid templates.** Use them to learn structure and pacing. A pixel-faithful rebuild carries the template's licence problem into the client's site and isn't unique work. Run the originality audit.
- **Rive free exports show a splash.** The free plan stamps a Rive splash on exports; Cadet ($9/seat/mo) removes it.
- **Chrome DevTools MCP telemetry.** Google collects usage statistics by default. Add `--no-usage-statistics`, and keep it away from logged-in sessions with client data.
- **Prices and free picks move.** Confirm on the source before quoting a client.

## Testing the library on a work-in-progress project (Orion)

The point of the test is to learn which rules and skills change the output, so keep one variable at a time.

1. Pick one bounded, real task (for example "tighten the homepage hero" or "rework the enquiry form").
2. Run it once on a branch without the library: `git switch -c test/no-library`, and on that branch temporarily revert `CLAUDE.md` to just `@AGENTS.md` and move `.claude/skills/` aside so none of the library rules load.
3. Run the same task on a second branch with the library active (`CLAUDE.md` in place, then `/manestream-taste-pass`).
4. Compare screenshots at 375 and 1440 and the diff. Note which rules caught real problems and which were noise or clashed with the existing Orion design.
5. Feed the findings back: edit `house-rules.md` and `CLAUDE.md`, and update the Project docs so the library stays in one place.

Orion already has a brand theme, fonts and stack in the repo. Where a library rule conflicts with a deliberate Orion decision (for example mono eyebrow labels), record the conflict instead of silently picking a side.
