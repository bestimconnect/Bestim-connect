# bestim-connect

The business side of Bestim: **https://bestim-connect.com** (Arabic first, English second). Today it is the landing page that sells Bestim Connect to companies with many vehicles (and, in one section, to workshops) and collects demo requests. The dashboard itself is **not built yet**; it will live in this same site later (under `/app`), so there is one domain, one project and one login.

Before changing anything, read `../CLAUDE.md`, `../docs/BRAND.md` and `../docs/BACKEND.md`. This site is a sibling of `../bestim-landing/` and follows the same conventions (see `CLAUDE.md` here).

## Run it
```bash
npm install
npm run dev      # http://localhost:3001 (opens the Arabic page)
npm run check    # Arabic and English text files must have the same entries
npm run lint
npm run build    # both languages are built ahead of time
```

## Where things are
| What | Where |
|---|---|
| All the page text | `src/dictionaries/ar.json` and `en.json` (keep both in step: `npm run check`) |
| Site address, WhatsApp number, email, backend address | `src/lib/site.ts` |
| Page sections, top to bottom | `src/app/[lang]/page.tsx` → `src/components/sections/` |
| The dashboard picture (drawn in code, demo data from the dictionaries' `dash` block) | `src/components/DashboardMock.tsx` |
| The demo-request form | `src/components/DemoForm.tsx` → table `connect_leads` (`../bestim-app/supabase/migrations/20261002090000_connect_leads.sql`) |
| The Bestim Connect logo (wordmark + lime CONNECT tag, drawn in code) | `src/components/ConnectLogo.tsx` |
| Brand colors, corner sizes, fonts | `src/app/globals.css` |
| Phone screenshots (copies from `../bestim-landing/src/screens/`) | `src/screens/` |

## Common changes
- **The business WhatsApp number arrives:** put it in `whatsapp` in `src/lib/site.ts` (digits only, with the country code). The WhatsApp buttons appear by themselves.
- **Read the demo requests:** Supabase dashboard → Table editor → `connect_leads`. Nobody is emailed yet when one arrives.
- **Change wording:** edit both dictionary files, then `npm run check`.
- **The official Connect logo file arrives:** put it in `public/brand/` and use it in `ConnectLogo.tsx`.

## Rules for the text
- Written as a live product (Shady, 2026-10-02). Every promise on the page must be something the team can deliver when a company books a demo.
- No prices or plans, no invented testimonials, customer logos or usage numbers. The "numbers" row shows product facts only.
- No GPS or live-tracking claims: the product does not do that.
- Privacy policy and terms are the ones on bestim-eg.com (linked from the footer and the form), not copied here.

## How it is built
Next.js 16 (App Router) + TypeScript + Tailwind v4, static pages for `/ar` and `/en` (`/` redirects to `/ar`), `motion` for animation, no component library. The shared pieces (`Motion.tsx`, `Phone.tsx`, `SectionHeading.tsx`, `LangSwitch.tsx`, `i18n.ts`, `globals.css`) are **copies** from `bestim-landing/`: two sites do not justify a shared package. If a third site appears, make one.

Next.js changes between major versions: read `AGENTS.md` before writing code.

## Still to do
- Business WhatsApp number; official Connect logo file.
- An email alert when a demo request arrives (needs the custom email sender, see `../docs/BACKEND.md`).
- Vercel project and `bestim-connect.com` DNS (the code is on GitHub: `bestimconnect/Bestim-connect`).
- Social share image, Lighthouse pass.
- The dashboard itself: open questions for the founder are in `../docs/IDEAS.md`.
