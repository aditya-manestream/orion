---
name: manestream-kickoff
description: Start or restart a Manestream website build. Writes the three-line design read, PRODUCT.md and DESIGN.md from the library's Master Brief and a direction world. Use at project kickoff, before a major redesign, or when PRODUCT.md or DESIGN.md is missing.
---

# Manestream kickoff

Goal: product truth and a design system on paper before any UI code, without overwriting decisions that already exist in the repo.

## Steps

1. **Read what exists.** Inspect the repo first: `src/app/globals.css` (theme tokens), `src/app/layout.tsx` (fonts), `package.json` (stack), `README.md`, `src/lib/` data, `public/` assets, and any existing `PRODUCT.md` or `DESIGN.md`. Record the current palette, type and motion as the baseline. Existing decisions win unless I say otherwise.
2. **Read the library.** `library/house-rules.md`, the T0 master brief and the closest site-type template in `library/templates/site-types.md`, and `library/directions.md` for the closest world and its default dials.
3. **Fill the gaps with one question.** Using T0 section 1 (product truth), list what is still unknown: offer, audience, primary action, real proof, objections, assets. Ask me at most one consolidated question for the essentials, and only if you cannot infer them from the repo. Never invent clients, numbers, awards or testimonials.
4. **Write the design read back to me** in three lines: mode (Persuade, Operate, Read or Experience), one visual thesis sentence, and dials (layout variance, motion, density). Say which direction world it is closest to and which levers you would change versus that world.
5. **Write `PRODUCT.md`** (offer, audience, primary action, proof, objections, voice, assets) and **`DESIGN.md`** using prompt W3 in `library/templates/workflow.md`: YAML front-matter tokens plus prose roles, mixing principles from at least two references. For an existing site, capture the current tokens first and mark any proposed changes as proposals.
6. **Lint** with `npx @google/design.md lint DESIGN.md` if the network and Node allow it. If you cannot run it, say so; do not claim it passed.
7. **Stop.** Show me the design read and the two files and wait for approval. Do not start building in this skill.

## Rules
- Do not add dependencies or fonts.
- Do not touch existing source files in this skill; it only writes `PRODUCT.md` and `DESIGN.md`.
- Keep both files short enough to read in a minute or two.
