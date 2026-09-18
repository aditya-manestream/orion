# Pre-launch checklist

Tracks work remaining before the Orion Developers site goes live, plus the
real-world details we still need from the client. Items marked **[needs
client input]** are blocked on information we don't have — placeholder or
invented values must not ship in their place.

## Phase 1 — Stop the leaks

- [x] Mobile navigation drawer (header nav links were unreachable below `md`)
- [x] Branded `not-found.tsx` and `error.tsx`
- [ ] **Contact form still composes a `mailto:` link only.** Deliberately
      deferred. On most mobile browsers and for webmail users this silently
      drops the enquiry — the site's primary conversion path is currently
      lossy. Decide before launch between a Resend-backed API route, a
      hosted form endpoint (Web3Forms/Formspree), or a WhatsApp handoff.

## Phase 2 — Findability

- [x] `metadataBase` + per-route Open Graph / Twitter metadata, with a title
      template
- [x] Generated brand share card at the app root, plus a generated
      per-project card compositing the project photo
- [x] `sitemap.ts` and `robots.ts`
- [x] `Organization` + `LocalBusiness` JSON-LD (partial — see below)
- [x] Per-project `CreativeWork` and `BreadcrumbList` JSON-LD
- [ ] **Set `NEXT_PUBLIC_SITE_URL` to the real domain in the hosting
      environment.** Until then everything absolute — canonicals, share
      image URLs, the sitemap — points at the `https://oriondevelopers.in`
      fallback in `src/lib/site.ts`. **[needs client input]**
- [ ] Submit the sitemap in Google Search Console once the domain is live
- [ ] Add `geo` coordinates, `foundingDate` and tax identifiers to the
      `LocalBusiness` block **[needs client input]** — deliberately omitted
      rather than guessed

## Phase 3 — Depth & polish (not started)

- [ ] Extend the `Project` type with area, clear span, completion year and
      town; populate all six case studies **[needs client input]**
- [ ] `prefers-reduced-motion` support across Lenis, Motion reveals and the
      loading-screen video
- [ ] Skip-to-content link and visible focus states sitewide
- [ ] Session-gate the loading screen so returning visitors skip the ~2.6s hold
- [ ] Resolve the global `a { color: apricot }` rule in `globals.css`, which
      competes with component-level link colours
- [ ] Image `sizes` audit and blur placeholders

## Phase 4 — Ship discipline (not started)

- [ ] GitHub Actions running `npm run build` and `npm run lint` on push
- [ ] README refresh

## Outstanding information needed from the client

| Item | Needed for | Status |
| --- | --- | --- |
| Area (sq ft), clear span, completion year and town for each of the 6 projects | Case-study detail panels | **[needs client input]** — using existing site copy meanwhile |
| Founding year, GSTIN / CIN | `LocalBusiness` structured data | **[needs client input]** |
| Google Maps coordinates for the Nashik office | `LocalBusiness` structured data, local search ranking | **[needs client input]** |
| Higher-resolution originals of the site photography | `public/photos/` currently reuses a limited set across sections | **[needs client input]** |
| Preferred enquiry destination (inbox vs WhatsApp) | Contact form backend | **[needs client input]** |
| Production domain | `NEXT_PUBLIC_SITE_URL`, canonicals, sitemap, share-image URLs | **[needs client input]** — falling back to `https://oriondevelopers.in` |

## Content accuracy note

All copy, sector claims and project descriptions currently in the repo came
from the existing site content. None of the specifications, certifications
or figures have been verified against client records — that review should
happen before launch.
