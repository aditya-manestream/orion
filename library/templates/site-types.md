# Site-type prompt templates (T0 to T8)
Manestream Build Library, checked 2 Oct 2026. Placeholders look like `{{THIS}}`. Send each with the House Rules block (`../house-rules.md`) appended.

For Orion (a PEB manufacturer), the closest template is **T2: Industrial and manufacturing B2B**, with the **Industrial Precision** world from `../directions.md`.

## T0: Master brief (any website)
Use when: fill this for every new site. Everything else in this library plugs into it. (append House Rules)
```text
You are building a production website for {{BRAND}}. Read the whole brief before writing code. If something essential is missing, ask me one question, then proceed.

1. PRODUCT TRUTH (use only this; never invent clients, numbers, awards or testimonials)
- What they do: {{ONE_LINE_OFFER}}
- For whom: {{AUDIENCE}} in {{MARKET}} (assume most visitors are on a phone)
- The one action this site exists for: {{PRIMARY_ACTION}}
- Proof we can show: {{REAL_PROOF}}
- Objections to answer: {{OBJECTIONS}}
- Assets supplied: {{PHOTOS_VIDEOS_LOGO_FILES}}

2. DESIGN READ (write this back to me in three lines before you build)
- Mode: {{Persuade | Operate | Read | Experience}}
- Visual thesis in one sentence: {{THESIS}}
- Dials 1-10: layout variance {{V}}, motion {{M}}, density {{D}}
- References: {{LINKS}}. Borrow hierarchy, pacing, contrast and motion grammar only.

3. SYSTEM (write to DESIGN.md first, then build from it)
- Type: display {{DISPLAY_FONT}}, text {{TEXT_FONT}}, fluid scale with clamp()
- Colour: background {{BG}}, surface {{SURFACE}}, ink {{INK}}, muted ink {{MUTED}}, one accent {{ACCENT}} for the primary action only; plus a dark theme if the use scene needs it
- Space: 4px base, section rhythm {{SECTION_GAP}}, max content width {{MAX_W}}
- Shape: radii {{RADII}}; elevation by border OR soft offset shadow
- Motion: entrances ease-out cubic-bezier(0.23,1,0.32,1); moves ease-in-out cubic-bezier(0.77,0,0.175,1); UI 150-250ms; authored scroll moments 600-900ms

4. SECTIONS (in the order the buyer needs them)
{{SECTION_LIST}}

5. STACK
{{STACK}} (default: Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui restyled to the system, GSAP + ScrollTrigger, Lenis). Self-host fonts with next/font. Images through next/image with explicit sizes. Deploy target: {{HOSTING}}.

6. SIGNATURE MOMENT
One interaction people will remember: {{SIGNATURE}}. Everything else stays calm.
```

## T1: Luxury real estate project (scrollytelling)
Use when: new residential or commercial launches; site-visit and enquiry focused. (append House Rules)
```text
Build a mobile-first scrollytelling site for {{PROJECT_NAME}}, a {{CONFIGURATION}} project by {{DEVELOPER}} in {{LOCATION}}. Buyers: {{BUYER_PROFILE}}. The one action: book a site visit, with WhatsApp as the fast lane.

Story, one chapter per section (full viewport on desktop, tight stacked chapters on mobile):
1. Arrival: one establishing visual (render or drone loop) with the project name and one line of positioning. CTA: Book a site visit.
2. Location: why this address. Real travel times to {{LANDMARKS}} as a clean list or an illustrated map. No fake satellite UI.
3. Architecture: two or three design moves told with large imagery and short captions (facade, light, landscape).
4. Residences: tabs per configuration with carpet area in sq ft, floor plan image with pinch-zoom, price from {{PRICE_FROM}} in lakh or crore with Indian digit grouping, or "Price on request".
5. Amenities grouped by moments of life (mornings, family, weekends), not an icon grid.
6. Specifications and approvals: structure, finishes, possession timeline, RERA registration {{RERA_NO}} with the state RERA website.
7. The developer: delivered projects only, with photos.
8. Visit: map, sales gallery address and hours, call, WhatsApp (wa.me/{{PHONE}} with a prefilled message naming the project), and a three-field form (name, phone, preferred visit date).
Mobile: a sticky bottom bar with Call, WhatsApp and Brochure that appears after the hero.

Motion: slow and image-led. Two authored GSAP ScrollTrigger moments only (the arrival reveal and the residences transition). Lenis on desktop, native scroll on touch.
Look: high-contrast serif display with a quiet sans; palette taken from the project's materials (stone, timber, foliage) plus one accent.
Media: client renders and photos only; reserve aspect ratios so nothing shifts; brochure as a compressed PDF.
```

## T2: Industrial and manufacturing B2B
Use when: manufacturers, engineering firms, filtration, PEB, fabrication, exporters. (append House Rules)
```text
Build a B2B website for {{COMPANY}}, a {{WHAT_THEY_MAKE}} manufacturer in {{CITY}} serving {{INDUSTRIES}}. Buyers are engineers and procurement heads who need to trust capability fast. The one action: send an RFQ, with WhatsApp for quick questions.

Pages: Home; Products (family, then product detail); Industries; Capabilities (machines, capacity, QC lab, certifications); Projects and clients (real, with permission); About; Contact and RFQ.
Home order: plain-language positioning plus Request a quote; product families; proof (installed base, certifications {{CERTS}} with certificate numbers, notable projects); how an order runs (enquiry, drawing review, quote, production, dispatch, with real lead times); industries served; RFQ band.
Product detail: real photography, spec table with units and tabular numbers, applications, downloadable datasheet PDF, related products, and a quote button that pre-fills the product.
RFQ form: name, company, email, phone (+91), product, quantity, drawing upload (PDF or DWG), message. The confirmation says when they will hear back.

Look: industrial precision. Technical sans for headings, readable sans for body, monospace only for spec values and part codes. Graphite and steel neutrals with one safety accent. Hairline rules organise spec data; no decorative blueprint grids.
Motion: minimal. Count-ups only for real numbers; one process line that draws on scroll.
SEO: Product and Organization schema, breadcrumbs, one H1 per page, descriptive slugs, fast product pages.
```

## T3: Digital agency or studio
Use when: Manestream-style agency sites: work-first, lead-qualifying. (append House Rules)
```text
Build the website for {{AGENCY}}, a {{SPECIALITY}} studio for {{CLIENT_TYPE}}. The site is itself the portfolio piece: authored, fast on a phone, and built to turn visitors into qualified enquiries. The one action: start a project.

Home: a specific statement of what you make and for whom, with selected work visible immediately (the work is the hero); three to six case studies as large media with one-line outcomes; services as a short scannable list linking to detail pages; process in plain verbs; a qualifying CTA.
Qualifier: four quick steps (project type, budget band in rupees, timeline, contact) with a result screen that says what happens next, plus WhatsApp as the instant option.
Case study page: the challenge, what we did, key screens or video, measurable result (real only), credits, next case study.
Interaction: one signature moment (cursor-reactive media tiles on desktop or a pinned case-study reel), page transitions between work pages, everything else calm.
Avoid agency clichés: no rotated vertical text, no city and time strips, no 'BRAND. MOTION. SPATIAL.' taglines, no marquee of buzzwords.
```

## T4: AI or SaaS product landing
Use when: product launches and SaaS marketing pages. (append House Rules)
```text
Build a landing page for {{PRODUCT}}, which helps {{ICP}} {{JOB_TO_BE_DONE}}. Visitors arrive from {{CHANNEL}} and decide within ten seconds. The one action: {{START_TRIAL_OR_BOOK_DEMO}}.

Order: a headline naming the outcome, a subline naming the mechanism, the primary CTA, and a real product screenshot or 6 to 10 second loop (no div-built fake UI); proof (real logos or one specific usage number); three jobs the product does, each shown with the actual UI state that does it, in alternating layouts; how it works in three verbs; integrations; pricing with a monthly/annual toggle (rupees with GST note for India, dollars if selling abroad); an FAQ that handles security, data, migration and cancellation; final CTA.
Look: calm neutrals, one accent, real screenshots with subtle depth.
Motion: only to explain product states, for example a walkthrough that scrubs with scroll.
```

## T5: D2C fashion, jewellery or boutique storefront
Use when: fashion labels, jewellery, bags, home decor, beauty. (append House Rules)
```text
Build a mobile-first storefront for {{BRAND}}, a {{CATEGORY}} label for {{CUSTOMER}}. It should feel like an editorial lookbook that happens to sell. The one action: add to bag, or order on WhatsApp if there is no checkout.

Home: full-bleed campaign image or short film with the collection name; shop by edit (not a generic category grid); the craft story (materials, makers, process) in close-up photography; bestsellers as an editorial grid with consistent product photography; reviews with names and photos where we have them; care and sizing; Instagram as a link, not an embedded feed.
Product page: large swipeable gallery, price in rupees inclusive of taxes, variant pickers with stock states, delivery estimate by PIN code, COD and returns info, add to bag plus 'Ask about this piece' on WhatsApp, details and care accordions, complete the look.
Platform: {{SHOPIFY_THEME | HYDROGEN | NEXTJS_WITH_STOREFRONT_API}}.
Look: editorial luxury or warm craft, chosen from the brand; a characterful display face; palette drawn from the products themselves.
Motion: image reveals and a soft hover swap to a second photo; no bouncing.
```

## T6: Local service business
Use when: clinics, salons, restaurants, gyms, coaching centres, contractors. (append House Rules)
```text
Build a website for {{BUSINESS}}, a {{TYPE}} in {{AREA}}, {{CITY}}. Most visitors are nearby, on a phone, comparing three options. The one action: {{BOOK_CALL_WHATSAPP_OR_RESERVE}}.

First mobile screen: what you are, where, the Google rating (only if real) and Book, Call, WhatsApp. Then: services or menu with prices; the people with real photos and credentials; the space; attributed reviews; location with map, parking, hours (today highlighted) and holidays; FAQ; booking.
Local SEO: LocalBusiness schema with address, geo and hours; name, address and phone identical to the Google Business Profile; area and city in the title and H1.
Look: taken from the real space (its photos decide the palette). Keep it fast: no heavy WebGL, at most one subtle motion moment.
```

## T7: Personal portfolio
Use when: designers, developers, photographers, architects. (append House Rules)
```text
Build a portfolio for {{NAME}}, a {{ROLE}} who wants {{CLIENTS_JOBS_OR_COLLABORATORS}}. The work leads and the interface recedes.
First viewport: name, one specific line about what you do, and the first project already visible. Work index: large media with hover or tap preview; filters only with 12+ projects. Project page: context, role, process, outcome, next project. About: a real photo, a short bio, selected clients, contact.
One signature interaction that reflects the person's craft (a developer's live playground, a photographer's full-bleed sequencer). Everything else minimal.
```

## T8: Event, launch or waitlist page
Use when: launch events, conferences, exhibitions, pre-launch waitlists. (append House Rules)
```text
Build a single page for {{EVENT_OR_LAUNCH}} on {{DATE}} at {{VENUE_OR_ONLINE}}. The one action: {{REGISTER_OR_JOIN_WAITLIST}}.
Order: name, date, place and the CTA, all visible on a phone without scrolling; why attend (outcomes, not features); speakers or lineup with real photos; agenda as a clean timeline; venue and travel; tickets or waitlist form with a clear confirmation; FAQ; real sponsors only.
Add: add-to-calendar (.ics and Google), a countdown only if the date is fixed, prefilled share text for WhatsApp and LinkedIn.
Motion: one launch moment (title reveal or ticket animation), then calm.
```
