# Orion Developers

Marketing website for **Orion Developers**, a pre-engineered building (PEB) company based in Nashik, Maharashtra. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4, custom brand theme (navy / rust / apricot) in `src/app/globals.css`
- **Fonts:** Bricolage Grotesque (display), Hanken Grotesk (body), JetBrains Mono (labels)
- **Animation:** [Motion](https://motion.dev) for scroll-reveal and hover effects, [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling

## Structure

- `/` — homepage (single-page brand story: practice, advantage, capabilities, anatomy, projects, process, assurance, contact)
- `/about` — company story and credentials
- `/capabilities` — systems showcase (design/supply/erection, advantage, anatomy, configurations)
- `/projects` — full project gallery with sector filtering
- `/projects/[slug]` — individual project case studies
- `/contact` — structured project enquiry form

Shared project data lives in `src/lib/projects.ts`. Reusable section/UI components are in `src/components/`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Content notes

- Real site photography lives in `public/photos/`; a few are reused across sections since only a limited set of project photos exists today. Swap in higher-resolution originals as they become available.
- The contact form currently composes a `mailto:` link client-side (no backend). An automated enquiry email flow, project CMS, and CRM integration are scoped as future upgrades per the project proposal.
