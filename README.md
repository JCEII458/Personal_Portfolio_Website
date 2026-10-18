# Joel C. Escareal II — Professional Portfolio

Personal portfolio website for **Joel C. Escareal II**, Civil Engineer | Structural Engineering Specialist.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4**, and **Lucide** icons. All pages are statically
generated except the contact-form API route.

---

## 1. Requirements

- Node.js **20.9 or newer** (developed on Node 22)
- npm 10+

## 2. Getting started

```bash
npm install          # install dependencies
cp .env.example .env.local   # optional: configure site URL / contact form
npm run dev          # http://localhost:3000
```

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Local development server with hot reload        |
| `npm run build`     | Production build                                |
| `npm start`         | Serve the production build (after `build`)      |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript)   |
| `npm run typecheck` | TypeScript type check                           |
| `npm run check`     | Typecheck + lint + build in one go              |

## 3. Project structure

```
public/
  cv/                       ← put the real CV PDF here
  images/
    illustrations/          ← generic technical illustrations (placeholders)
    portrait-placeholder.svg
scripts/
  generate-illustrations.py ← regenerates the placeholder SVG illustrations
src/
  app/                      ← routes (App Router)
    page.tsx                  /            Homepage
    about/                    /about
    projects/                 /projects  and  /projects/[slug]
    expertise/                /expertise
    research/                 /research
    experience/               /experience
    cv/                       /cv
    contact/                  /contact
    api/contact/route.ts      POST /api/contact (form endpoint)
    not-found.tsx             custom 404
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/               ← reusable presentation components
  content/                  ← ALL editable content (edit these files)
    profile.ts                name, headline, biography, contact details, portrait
    projects.ts               project categories + project records
    expertise.ts              skills, software, automation
    experience.ts             career timeline, registrations, education, training, memberships
    research.ts               featured research + future outputs
    site.ts                   site URL, navigation, CV file name, supporting documents
    types.ts                  TypeScript types for the content
  lib/                      ← helpers (CV detection, contact validation)
```

Content is kept separate from presentation: you should almost never need to touch `src/components` to update the site.

## 4. Editing content

### Biography, headline, contact details
Edit `src/content/profile.ts`.
- `contact.email` and `contact.linkedin` are empty on purpose. While empty, the site shows "to be added" instead of a
  broken link. Fill them in once you are happy to publish them.
- `metrics` must contain **only substantiated figures**.
- `consultancyNotice` and `independenceNotice` keep the site consistent with professional/employment rules — adjust
  the wording to your actual situation.

### Skills and software
Edit `src/content/expertise.ts`.
- Software `proficiency` is `null` (shown as "Proficiency to be confirmed"). Set it to `"Working Knowledge"`,
  `"Regular Use"`, or `"Advanced"` only once confirmed.
- Automation `status` values (`"In use"`, `"In development"`, `"Exploring"`) should be honest.
- Software is shown with neutral text marks, not vendor logos. Only add official logos if you have the right to use them.

### Experience and credentials
Edit `src/content/experience.ts`. Entries with `status: "to-confirm"` display a **To be confirmed** label. Replace the
placeholder position, organization, and dates, then set `status: "confirmed"`. Registration numbers are intentionally
not published.

### Research
Edit `src/content/research.ts`. Change `stage` from `"proposed"` → `"ongoing"` → `"completed"` → `"published"` as the
work progresses. Add `findings` **only** once results are established. Add papers, presentations, or tools to
`researchOutputs` (a `file` must exist under `/public`).

### Projects
Edit `src/content/projects.ts`. The eight existing records are **illustrative samples** (`disclosureStatus:
"illustrative-sample"`) with generic titles — replace or remove them before launch.

To add a project, copy a record and update:

| Field              | Notes |
| ------------------ | ----- |
| `slug`             | Unique, URL-safe (becomes `/projects/<slug>`) |
| `title`, `summary`, `overview`, `projectType`, `scope`, `challenge` | Text content |
| `category`         | One of the ids in `projectCategories` |
| `involvement`      | `"designed"`, `"technical-review"`, `"supervised"`, or `"planning-support"` — be precise |
| `disclosureStatus` | `"approved"` or `"sanitized"` for real projects |
| `year`, `location` | Leave `undefined` unless approved for publication (shown as "Not disclosed") |
| `role`, `methodology`, `standards`, `software`, `outcomes`, `lessons` | Lists of strings |
| `images`           | `{ src, alt, caption, width, height, illustrative }` — the first image is the card cover |
| `featured`         | `true` to show on the homepage (first six are used) |
| `keywords`         | Extra search terms (not displayed) |

Cards, category filters, search, project pages, and the sitemap update automatically.

**Never publish** confidential government documents, internal procurement details, restricted drawings, or other
people's personal information. Do not claim outcomes, savings, or ownership that cannot be verified.

## 5. Images

- **Portrait:** add e.g. `public/images/portrait/joel-escareal.jpg` (4:5 ratio, ≥ 800×1000 px), then in
  `profile.ts` set `portrait.src` to `/images/portrait/joel-escareal.jpg`, update `width`/`height`, and set
  `isPlaceholder: false`.
- **Project images:** add files under `public/images/projects/` (JPG/PNG/WebP recommended, ~1600 px wide, 16:10),
  reference them in the project's `images`, write descriptive `alt` text, and set `illustrative: false` only for
  genuine, authorized photos/drawings of that project. Raster images are optimized automatically by Next.js.
- **Placeholder illustrations** in `public/images/illustrations/` are generic diagrams generated by
  `python3 scripts/generate-illustrations.py`. They always carry an "Illustrative" label.

## 6. Adding the real CV

1. Export your CV as PDF.
2. Save it as `public/cv/Joel-C-Escareal-II-CV.pdf` (or change `cvConfig.fileName` in `src/content/site.ts`).
3. Optionally set `cvConfig.lastUpdated` (e.g. `"October 2026"`).
4. Rebuild / redeploy.

The site checks for the file at build time. **If the file is missing, no download button is shown** — the hero shows
"CV & Résumé Summary" and `/cv` shows a "CV not yet uploaded" notice. Sanitized project sheets can be listed in
`supportingDocuments` in `site.ts`.

## 7. Contact form

The form posts to `POST /api/contact`, which:
- validates all fields on the server (shared rules in `src/lib/inquiry.ts`),
- rejects oversized/invalid requests,
- filters spam with a hidden honeypot field and a minimum fill-time check,
- applies a best-effort per-IP rate limit (5 messages / 10 minutes per server instance),
- sends the inquiry as a plain-text email via **[Resend](https://resend.com)** using its REST API (no SDK, API key
  stays on the server).

**Setup**
1. Create a Resend account, verify your sending domain, and create an API key.
2. Set these environment variables (in `.env.local` locally, and in your hosting dashboard for production):
   ```
   RESEND_API_KEY=re_xxx
   CONTACT_TO_EMAIL=you@example.com
   CONTACT_FROM_EMAIL="Portfolio Inquiries <inquiries@yourdomain.com>"
   ```
3. Rebuild / redeploy (the contact page reads the configuration at build time).

**If any variable is missing**, the form is shown disabled with a clear "not active yet" notice, and the API returns
`503` — nothing is ever reported as sent when it was not. For stronger bot protection you can add a CAPTCHA such as
Cloudflare Turnstile to the form and verify its token in `route.ts`. To use another provider, replace the `fetch` call
in `src/app/api/contact/route.ts`.

## 8. Deployment (Vercel)

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repository. The framework (Next.js) is detected automatically;
   build command `npm run build`, output handled by Vercel.
3. Add environment variables: `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.yourdomain.com`) and the three contact
   variables above.
4. Deploy, then add your custom domain under **Settings → Domains**.

Any Node.js host works too: `npm ci && npm run build && npm start` (port via `PORT`, default 3000).

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs, the sitemap, robots.txt, and Open Graph tags. If unset on Vercel,
the production Vercel URL is used; locally it falls back to `http://localhost:3000`.

## 9. Pre-launch checklist

- [ ] Replace or remove all **illustrative sample** projects; confirm every real project is approved for publication.
- [ ] Verify each project's `involvement` type is accurate (designed / reviewed / supervised / supported).
- [ ] Add a professional portrait and set `isPlaceholder: false`.
- [ ] Add the real CV PDF to `public/cv/`.
- [ ] Fill in confirmed experience: position, organization, dates; set `status: "confirmed"`.
- [ ] Add training and memberships, or remove the placeholder entries.
- [ ] Confirm software proficiency labels.
- [ ] Add email and LinkedIn URL in `profile.ts` (if you want them public).
- [ ] Review `consultancyNotice` against your employment rules, conflict-of-interest requirements, and approvals.
- [ ] Configure the contact form and send a test inquiry from the live site.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final domain.
- [ ] Run `npm run check` — typecheck, lint, and build must pass.
- [ ] Check the site on a phone, tablet, and desktop; test keyboard navigation.
- [ ] Submit `https://yourdomain/sitemap.xml` to Google Search Console (optional).

## 10. Accessibility & quality notes

Skip link, semantic landmarks, one `h1` per page, labelled form controls with inline errors, visible focus states,
keyboard-accessible mobile menu (focus trap, Escape to close), `prefers-reduced-motion` support, descriptive alt text,
and a custom 404 page. No analytics, tracking cookies, testimonials, ratings, or structured-data claims are included.
