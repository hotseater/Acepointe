# AcePointe website

Marketing site for AcePointe — a forward-deployed data & AI engineering consultancy.
**Embed. Build. Ship.**

Built with [Astro](https://astro.build) (v7). Static pages + one serverless endpoint for the contact form.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # outputs to .vercel/output (Vercel adapter)
```

## Stack

- **Astro 7**, TypeScript (strict)
- **Fonts** self-hosted via the native Astro Fonts API — Bricolage Grotesque (display) + Hanken Grotesk (body)
- **Imagery** — crafted animated SVG (hero diagram, case-study scenes); no raster placeholders
- **Contact form** → HubSpot Forms API + Resend notification, with honeypot + time-trap bot screening
- **Deploy** — Vercel (`@astrojs/vercel` adapter)

## Structure

- `src/pages/` — routes (home, services, success-stories, approach, why-us, contact, 404, privacy, terms)
  - `case-studies/[slug].astro` — templated case-study pages
  - `api/contact.ts` — form endpoint (on-demand)
- `src/components/` — UI components
- `src/data/` — content (services, case studies, comparison, clients)
- `src/styles/` — tokens + global + motion
- `scripts/make-og.mjs` — regenerates the Open Graph image

## Environment variables

Copy `.env.example` to `.env` and fill in (all optional — the form logs to the server console if unset):

| Variable | Purpose |
|---|---|
| `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID` | HubSpot Forms API submission |
| `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` | Email notification |

## Before launch

- Replace placeholder case-study **metrics and narratives** with client-approved numbers
- Add HubSpot + Resend credentials (and verify the Resend sending domain)
- Confirm client **logo usage permission**
- Replace placeholder **Privacy / Terms** copy
