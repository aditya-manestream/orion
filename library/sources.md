# Sources, skills and tools
Manestream Build Library, checked 2 Oct 2026. Free tiers and prices change; confirm before quoting a client.

This is the condensed version. The long indexed lists of free items (Aura's 105 free templates, websiteprompts.ai's 178 prompts, 21st.dev's templates and categories, ThreeUI's 104 components, VibUI's 55 free prompts, Magic UI's 75 components, awesome-design-md's 74 files) are kept in the Web Design & Dev project doc `web-library/sources.md` and in the browsable library page, and are left out here to keep repo context lean. Search the source site when you need an item.

## Prompt sources

### Aura
https://www.aura.build/ . Freemium. **Free plan is personal use only; commercial use needs Pro.**
Meng To's HTML/Tailwind AI site builder with the biggest free prompt catalogue: 4,894 free templates, 2,495 free components, 725 DESIGN.md systems, 191 agent skills.
- Free: browse, remix, export HTML, copy the full prompt and DESIGN.md of any free template. No AI generations, 2 pages per project.
- Paid: Pro $12.50/mo billed yearly (commercial use, Figma export, Pro templates). Max $25/mo, Ultra $50/mo.
- Use for: fast starting specs for almost any industry; DESIGN.md tokens to learn structure from.
- Watch out: client work counts as commercial. Rewrite the free prompts as starting specs, or take Pro for a month.
- Search an industry: `aura.build/browse/components/free-templates?q=jewellery`
- MCP: `claude mcp add --transport http aura https://mcp.aura.build/mcp`
- Links: [Free templates](https://www.aura.build/browse/components/free-templates?page=1) | [DESIGN.md library](https://www.aura.build/design-systems) | [Skills](https://www.aura.build/skills) | [Pricing](https://www.aura.build/pricing)

### MotionSites
https://motionsites.ai/ . Freemium. Paid plans state personal and client work; free prompts have no stated licence.
Cinematic, motion-heavy landing pages and sections (video backgrounds, 3D, carousels) as prompts for Lovable, Bolt, Cursor and Claude.
- Free: cards with a Copy prompt button (24 of 66 when checked). Crowned cards and every Copy source code button are paid. The free set rotates.
- Paid: yearly $279, lifetime $399, packs from $49.
- Use for: hero sections and cinematic one-pagers where motion is the selling point.
- Watch out: prompts hotlink videos from the source's CDN. Replace with licensed footage before launch.
- Links: [Library](https://motionsites.ai/) | [Backgrounds](https://motionsites.ai/backgrounds) | [Pricing](https://motionsites.ai/unlimited)

### VibUI
https://vibui.dev/prompts . Freemium. Membership terms; check before client use.
1,700+ detailed recreation prompts (518 sites, 41 apps, 1,094 sections, 160 backgrounds, 817 design-system prompts).
- Free: use the Free filter (26 site prompts, 8 sections, ~20 backgrounds, 6 apps when checked).
- Paid: one-time $48 (90 days), $99 (year), $179 (lifetime).
- Use for: learning how a recreation-grade prompt is written; section prompts (FAQ, pricing, 404, footer).
- Watch out: free prompts reference videos on a third-party CDN. Swap in your own assets.
- Links: [Prompts](https://vibui.dev/prompts) | [Sections](https://vibui.dev/prompts?kind=sections) | [Backgrounds](https://vibui.dev/prompts?kind=backgrounds)

### websiteprompts.ai
https://websiteprompts.ai/ . Free.
178 free full-site prompts, mostly local business and professional services (law firm, dentist, jeweller, boutique hotel, gym, manufacturing) plus SaaS and portfolios.
- Use for: local-business and service sites for Indian SMB clients. Includes a Manufacturing prompt.
- Run the prompt through the Adapter (W1 in `templates/workflow.md`), then replace its generic fonts with a pairing from `directions.md`.
- Links: [Home](https://websiteprompts.ai/) | [Manufacturing](https://websiteprompts.ai/prompts/manufacturing) | [Local business](https://websiteprompts.ai/prompts/category/local-business) | [Professional services](https://websiteprompts.ai/prompts/category/professional-services)

## Components

### shadcn/ui (official MCP + skill)
https://ui.shadcn.com/docs/mcp . Free, MIT.
The base layer for most of this library. The official MCP lets Claude browse, search and install from shadcn and any shadcn-compatible registry (Magic UI, React Bits, Kokonut, Bklit) by namespace.
- `npx shadcn@latest mcp init --client claude`
- Skill: `npx skills add shadcn-ui/ui --skill shadcn`
- Add registries in components.json under `registries`.

### 21st.dev
https://21st.dev/community/components . Freemium. Per component author (often MIT); check each.
Community registry of React, Tailwind and shadcn components and templates. Every component page has Copy prompt and Copy install command. Heroes, CTAs, navs, features, pricing, FAQs, testimonials, stats, footers and more.
- Free: browsing. Copying needs a free account. 48 templates are free.
- Paid: Builder $6/mo yearly (unlimited copies, MCP and CLI), Builder + AI $15/mo, Team $7.50/seat.
- Install pattern: `npx shadcn@latest add "<url-from-Copy-install-command>"`
- Never ship a component in its default look; restyle to DESIGN.md tokens.
- Links: [Heroes](https://21st.dev/community/components/s/hero) | [Pricing sections](https://21st.dev/community/components/s/pricing-section) | [Testimonials](https://21st.dev/community/components/s/testimonials) | [Free templates](https://21st.dev/community/templates/free)

### Magic UI
https://magicui.design/docs/components . Free, MIT (Pro templates paid).
75 animated React components (Tailwind + Motion) via the shadcn registry: marquee, bento grid, blur fade, number ticker, globe, text animations, backgrounds, device frames. Official agent skill and MCP.
- `npx shadcn@latest add @magicui/marquee`
- MCP: `npx @magicuidesign/cli@latest install claude`
- Use one core component plus one supporting effect per viewport.

### React Bits
https://reactbits.dev/ . Free. **MIT + Commons Clause: free in client sites, but you may not sell or redistribute the components.**
200+ animated components: text animations, backgrounds, cursors, galleries; JS/TS and CSS/Tailwind variants.
- `npx shadcn@latest add @react-bits/BlurText-TS-TW`
- Keep to one signature effect per page. Keep out of any template you sell.

### Kokonut UI
https://kokonutui.com/ . Freemium. Open-source core; Pro is paid.
100+ components (React, Tailwind, Motion, shadcn): buttons, cards, inputs, text effects, backgrounds, nav, AI-chat pieces.
- `npx shadcn@latest add @kokonutui/particle-button`

### Bklit UI
https://bklit.com/docs/installation . Free, MIT (chart components).
Animated chart components as a shadcn registry (area, bar, line, pie, radar, gauge, funnel, sankey and more). Use for results or investor pages with real data.
- `npx shadcn@latest add @bklit/line-chart`

### shadcn-ui MCP server (Jpisnice)
https://github.com/Jpisnice/shadcn-ui-mcp-server . Free, MIT.
Community MCP serving shadcn v4 source, demos and blocks for React, Svelte, Vue and React Native. For React/Next, the official shadcn MCP already covers third-party registries.
- `claude mcp add shadcn-ui -- npx -y @jpisnice/shadcn-ui-mcp-server --github-api-key YOUR_TOKEN`

## Motion and 3D

### GSAP
https://gsap.com/ . Free for everyone including commercial use; all plugins included (ScrollTrigger, ScrollSmoother, SplitText, MorphSVG, DrawSVG, Flip, Draggable, Observer and more).
- `npm i gsap @gsap/react`
- Skills: `npx skills add https://github.com/greensock/gsap-skills`
- Pair with Lenis (sync via `ScrollTrigger.update`).

### Motion (motion.dev)
https://motion.dev/ . Freemium. Library MIT; Motion+ paid.
Successor to Framer Motion: springs, layout animations, gestures, exit animations, scroll-linked values. The AI Kit installs a free /motion skill and MCP.
- `npm i motion`, `import { motion } from "motion/react"`, `npx motion-ai`
- Use Motion for UI state animation and GSAP for scroll choreography; do not mix both on one element.
- Orion already uses Motion.

### Lenis
https://lenis.dev/ . Free, MIT. Under 5 KB smooth scroll by darkroom.engineering.
- `npm i lenis`
- Keep native scroll on touch unless `syncTouch` is tested on real phones (unstable on iOS below 16).
- With GSAP: `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);`
- Orion already uses Lenis.

### Anime.js
https://animejs.com/ . Free, MIT. v4 is modular (~24.5 KB full). Good for lightweight pages and SVG-heavy motion; choose GSAP for pinned scroll stories.
- `npm i animejs`; skill: `npx skills add bowtiedswan/animejs-skills`

### ThreeUI
https://threeui.com/browse . Freemium. Community edition MIT; fonts OFL.
Meng To's library of Three.js, WebGL and Canvas pieces: 104 free community components. Use for one authored 3D moment.
- `npm install @designcodeio/threeui`
- Retheme colours, lighting and motion; cap pixel ratio on mobile.
- Links: [Browse](https://threeui.com/browse) | [GitHub](https://github.com/MengTo/threeui) | [MCP](https://threeui.com/mcp)

### ShaderGradient
https://shadergradient.co/ . Free, MIT. Animated 3D gradient backgrounds; design in the customiser, paste the URL string.
- `npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls`
- Use with intent: generic gradient blobs read as AI-made. Lazy-load after first paint, pause offscreen, static fallback for reduced motion. Next.js App Router needs react-three-fiber v9 with React 19.

### Rive
https://rive.app/ . Freemium. **Free exports show a Rive splash;** Cadet $9/seat/mo removes it.
Interactive state-machine animations (mascots, animated icons) for web and native.
- `npm i @rive-app/react-canvas`

## Design systems

### Refero Styles
https://styles.refero.design/ . Free while in beta.
2,000+ design systems extracted from real product sites, each with DESIGN.md, Tailwind v4 tokens, CSS variables and DO/DON'T lists.
- Watch out: they describe real brands. Mix principles from several; never ship one brand's look.
- Links: [Styles](https://styles.refero.design/) | [Refero MCP](https://refero.design/mcp)

### awesome-design-md (VoltAgent)
https://github.com/VoltAgent/awesome-design-md . Free, MIT (content describes real brands).
74 ready DESIGN.md files (Linear, Stripe, Vercel, Apple, Notion and more). Use as a structural template; replace every value with your brand's.
- `git clone https://github.com/VoltAgent/awesome-design-md`

### DESIGN.md spec + linter (Google Labs)
https://github.com/google-labs-code/design.md . Free, Apache-2.0.
YAML front-matter tokens plus prose. The CLI lints, checks WCAG contrast and token references, and diffs versions.
- `npx @google/design.md lint DESIGN.md`
- `npx @google/design.md diff DESIGN.md DESIGN-v2.md`

### extract-design-system skill
https://github.com/arvindrk/extract-design-system . Free. Extracts tokens, components and patterns from an existing site or codebase. Use for redesigns: capture what the client already has first.
- `npx skills add arvindrk/extract-design-system`

## Inspiration (browse only)
- **Awwwards** https://www.awwwards.com/ . Benchmark craft level and motion ideas; filter by category and technology. Extract principles, not layouts.
- **Recent** https://recent.design/ . Fresh art direction across web, branding, type, motion.
- **Mobbin** https://mobbin.com/ . Real screens and flows from shipped products. Blocks automated access; browse it yourself.
- **Dribbble** https://dribbble.com/ . Mood and art direction. Many shots are unshippable concepts.
- **Behance** https://www.behance.net/ . Full case studies and brand worlds; better than Dribbble for context.
- **Collect UI** https://collectui.com/ . Component-level patterns by category.
- **Podium** https://podium.global/ . Reference site for film-led art direction. Not a tool.

## Skills

### Taste Skill
https://www.tasteskill.dev/ . Free, MIT. The anti-slop frontend skill set. Default `design-taste-frontend` (v2) reads the brief, writes a one-line design read, tunes three dials, bans common AI tells and runs a pre-flight check. Variants: image-to-code, redesign-existing-projects, high-end-visual-design, minimalist-ui, industrial-brutalist-ui, full-output-enforcement and more.
- `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`
- Use `redesign-existing-projects` on sites you inherit.

### Image-to-Code (Taste Skill)
Image-first pipeline: generate section reference images, analyse them, implement with anti-drift rules. For your own screenshot, skip generation and start at analysis.
- `npx skills add https://github.com/Leonxlnx/taste-skill --skill "image-to-code"`

### Impeccable
https://impeccable.style/ . Free, Apache-2.0. 24 commands and 61 detector rules. `/impeccable init` writes PRODUCT.md; then shape, critique, audit, polish, bolder, quieter, distill, harden, animate, typeset, layout, adapt.
- `npx impeccable install` (project root), or `/plugin marketplace add pbakaus/impeccable`
- Review loop: `/impeccable critique`, then `/impeccable polish` before every handoff.

### UI UX Pro Max
https://www.skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max . Freemium, MIT. Searchable design intelligence (192 product types, 192 palettes, 74 font pairings, 79 UI styles, 119 UX guidelines). Needs Python 3.
- `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill`
- Its catalogue includes glassmorphism, claymorphism and neumorphism. Let the house rules veto those.

### Emil Kowalski skills
https://github.com/emilkowalski/skills . Free, MIT. Motion judgement: animate, review-animations, improve-animations, find-animation-opportunities, mobile-native, prototype and more.
- `npx skills@latest add emilkowalski/skills`

### Stop Slop
https://github.com/hardikpandya/stop-slop . Free, MIT. Removes AI tells from prose and scores copy (below 35/50 gets rewritten).
- `npx skills add hardikpandya/stop-slop`

### Humanizer
https://github.com/blader/humanizer . Free, MIT. Rewrites AI-sounding text using 26 patterns from Wikipedia's Signs of AI writing.
- `npx skills add blader/humanizer --global --agent claude-code`

### Web Interface Guidelines (Vercel)
https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md . Free, MIT. Reviews UI code against Vercel's guidelines (fetched fresh each run); terse file:line findings. Pre-launch code review.
- `npx skills add vercel-labs/agent-skills --skill web-design-guidelines`

### Meng To's Skills
https://github.com/MengTo/Skills . Free, MIT. 157 portable skills. Core four: no-ai-design-slop, audit-reference-originality, video-to-superprompt, stitched-full-page-capture. Also worth a look: cinematic-gsap-lenis-motion-system, scroll-world-storytelling, editorial-portfolio-chapters, landing-page, pricing-page, workflow-score-to-target.
- List: `npx skills add https://github.com/MengTo/Skills --list`
- Core four: `npx skills add https://github.com/MengTo/Skills --skill no-ai-design-slop --skill audit-reference-originality --skill video-to-superprompt --skill stitched-full-page-capture`

### Others
- **frontend-design (Anthropic)**: lightweight baseline. `npx skills add anthropics/skills --skill frontend-design`
- **Web quality skills (Addy Osmani)**: accessibility, Core Web Vitals, performance, SEO audit. `npx skills add addyosmani/web-quality-skills`
- **Jakub Krehel's skills**: better-typography, better-colors, better-layout, interface-review. `npx skills add jakubkrehel/skills`
- **UI skills (ibelick)**: create-design-md, fixing-accessibility, fixing-motion-performance. `npx skills add ibelick/ui-skills`
- **Marketing skills (Corey Haines)**: copywriting, CRO, pricing, schema, SEO audit. `npx skills add coreyhaines31/marketingskills --skill copywriting --skill cro`
- **Three.js skills**: ten skills for custom 3D. No licence file in the repo; use, don't redistribute. `npx skills add CloudAI-X/threejs-skills`
- **skills.sh directory** https://www.skills.sh/ : find new skills (Design & UI topic). Prefer high installs plus a known author, and read the SKILL.md before installing. `npx skills update`, `npx skills list`.

## QA and tools

### Playwright CLI
https://github.com/microsoft/playwright-cli . Free, Apache-2.0. Token-efficient browser automation for agents. Screenshot every section at 375 and 1440.
- `npm install -g @playwright/cli@latest` then `playwright-cli install --skills`

### Chrome DevTools MCP
https://github.com/ChromeDevTools/chrome-devtools-mcp . Free, Apache-2.0. Performance traces, Lighthouse, network and console, emulation.
- `claude mcp add chrome-devtools --scope user -- npx chrome-devtools-mcp@latest`
- Google collects usage statistics by default; add `--no-usage-statistics`. Avoid logged-in sessions with client data.

### screenshot-to-code
https://github.com/abi/screenshot-to-code . Free, MIT (you pay your own model API usage). Screenshots, mockups and recordings to HTML + Tailwind or React, with variants across models. For a single screenshot, pasting into Claude Code with image-to-code is usually faster.
- Watch out: rebuilding a paid template pixel for pixel carries its licence problem into the client's site. Run the originality audit.
