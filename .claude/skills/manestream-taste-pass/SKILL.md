---
name: manestream-taste-pass
description: Anti-slop design review of a page or the whole site against the Manestream house rules, followed by one batch of fixes with before and after screenshots. Use after a first full build, before a client review, or to test the library on work in progress.
---

# Manestream taste pass

Run on the page or section I name (default: the homepage). Read `library/house-rules.md` and `library/templates/workflow.md` (W4) first, plus `PRODUCT.md` and `DESIGN.md` if they exist.

## Steps

1. **Baseline screenshots** at 375x812 and 1440x900 before changing anything (playwright-cli if installed; otherwise any headless browser available; if none works, say so and review from code only). Save them under `.manestream/before/`.
2. **Review as a design director.** Produce a table of the ten highest-impact problems: element, problem, rule it breaks (cite the house rule), fix. Check generic AI patterns (eyebrows, identical cards, gradient text, glows, fake UI, filler copy, em dashes), hierarchy, spacing rhythm, type roles, colour jobs, interactive states, the 375px layout, and whether each animation explains something.
3. **Flag conflicts, do not resolve them.** If a rule clashes with a deliberate Orion decision (brand theme, existing fonts, a signature motion), list it separately as "conflict: decide" and leave that element alone.
4. **Wait for my go-ahead** if the table has more than ten fixes or any change touches copy, brand colour or fonts. Otherwise continue.
5. **Fix in one batch.** Do not add sections, effects, fonts or colours unless a fix needs them. No new dependencies.
6. **After screenshots** at 375 and 1440 into `.manestream/after/`. Show before and after for the changed areas and confirm once. Then stop polishing.
7. **Report**: what changed, which house rules actually caught real problems, which were noise or conflicted with the design. That last part is the point when testing the library, so be specific.

## Rules
- Real content only. Never invent proof, numbers or testimonials.
- Keep `.manestream/` out of commits (suggest adding it to `.gitignore`; do not edit `.gitignore` without asking).
