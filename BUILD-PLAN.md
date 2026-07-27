# AcePointe Website — Build Plan

**Stack:** Astro (static + one server endpoint) · **Form:** HubSpot CRM (+ Resend fallback) · **Ambition:** Elevate · **Scope:** Full site, homepage first
**Source of truth:** `../Website Design/extracted/design_handoff_acepointe_site/` (design prototypes + `README.md` handoff)
**Brand:** AcePointe — forward-deployed data & AI engineering consultancy. Thesis: **Embed. Build. Ship.**

---

## Part A — Design cleanup brief

The prototype is strong and stays the foundation. We preserve the identity (crimson `#c8102e`, dark `#221419`, the section structure, the copy, the data arrays) and fix the defects + elevate the generic parts. Identity is preserved; only the reflex choices get upgraded.

### A1. Fix the AI-grammar tells
- **Eyebrow-on-every-section → new cadence.** Keep exactly ONE kicker: the hero's `FORWARD-DEPLOYED DATA & AI ENGINEERING` (it's real positioning). Drop the tracked-uppercase kicker above Services / Success stories / Approach / Why AcePointe / Contact. Let the H2 carry each section, with the accent-word-in-red device (as "Ship." already does) for emphasis and a one-line lead sentence where needed.
- **Services grid.** Keep the six services but break the identical-card monotony: vary emphasis (e.g. the two flagship services — Forward-Deployed Engineering, AI Consulting — get more weight/space), and drop the decorative `01–06` number pills (they're scaffolding, not a real sequence). The Approach `01/02/03` **stays** — that one is a genuine ordered process.
- **Ghost-card hover.** Current cards use `1px border` + `0 14px 32px` shadow together (flagged pattern). Pick one: default = hairline border only; hover = defined shadow (≤12px blur) + red border, and remove the permanent 1px-plus-big-shadow pairing.

### A2. Elevate (the "make it distinctive" work)
- **Typography.** Retire Poppins/Open Sans (both top-5 monoculture Google fonts). Commit to:
  - **Display / headings: Bricolage Grotesque** (600/700) — a contemporary grotesque with engineered irregularity; carries "Embed. Build. Ship." with more character than Poppins, still corporate-credible.
  - **Body / UI: Hanken Grotesk** (400/500/600) — clean humanist grotesque, excellent at 14–19px, pairs on a subtle contrast axis.
  - Safer alternative if Bricolage reads too characterful: **Schibsted Grotesk** (display) + **Hanken Grotesk** (body).
  - **Self-host** both (woff2, `font-display: swap`) — the prototype hotlinks Google's CDN; production self-hosts for perf + privacy.
  - Display letter-spacing floor `-0.02em` (never tighter than `-0.04em`); `text-wrap: balance` on h1–h3.
- **Hero diagram.** Rebuild `hero-flow.png` (Embed → Build → Ship) as **animated HTML/SVG** instead of a raster (README even suggests this). Crisp at any DPI, themeable, and it earns a first-load animation: cards stagger up, connector arrows draw in. This is the signature "elevate" moment.
- **Imagery.** Replace generated placeholder case images (waveform, etc.) with **real, client-approved project screenshots** (Radix live dashboards, NookTek platform, analytics views) in tasteful device frames. Where a real shot doesn't exist yet, use an on-system crafted SVG consistent with the hero — never a flat colored block.
- **Client logos.** Self-host all (download the hotlinked NookTek logo), and normalize to one treatment (uniform monochrome → color/opacity on hover) so the carousel reads as one system, not mismatched PNGs.
- **Motion, intentional not decorative.** Orchestrated hero page-load (ease-out-expo, staggered). Tasteful per-section scroll reveals (not the uniform fade-everything reflex). Compare-table AcePointe column subtly emphasized on scroll-in. Every animation gets a `prefers-reduced-motion` alternative (instant/crossfade).

### A3. Accessibility & correctness (non-negotiable for production)
- **Responsive** — the whole site is currently `min-width:1200px`, desktop-only. Full responsive build is the single biggest task (details in B3).
- **Forms:** real `<label>`s (not placeholder-only), `aria-describedby` error wiring, visible focus states, focus management on submit.
- **Carousels:** pause-on-hover + pause-on-focus, keyboard operable, `aria-live` region, no auto-advance under reduced-motion, visible focus on arrows/dots.
- **Contrast:** darken muted `#8a8b92` labels toward ink where they fall under 4.5:1 on white/tint; verify all text passes WCAG AA.
- **Semantics:** move off inline styles to scoped component styles + tokens; correct landmark/heading order; skip-to-content link; semantic z-index scale.

### A4. Content truth (before launch)
- Metrics `3.1× / 82% / 6 wks / 3 wks` and all case narratives are **placeholders** — replace with client-approved numbers.
- Confirm logo-usage permission per client; self-host each file.

---

## Part B — Technical build plan

### B1. Architecture
- **Astro + TypeScript**, hybrid rendering: all pages static (SSG); one server endpoint (`/api/contact`) for the form via a serverless adapter.
- **Content collections** for the data-driven parts:
  - `services` (num, title, desc, example)
  - `caseStudies` (slug, category, title, summary, metric, metricCaption, hero image, narrative sections) → drives `/case-studies/[slug]` **and** the homepage/Success-Stories cards from one source
  - `clients` (name, logo, url)
  - `compareRows` (label, ace, si, platform, staffing)
  - All copy lifted directly from the prototype's logic-class arrays (already captured).
- **Design tokens** as CSS custom properties: palette (keep the 3-palette theming — Crimson default, Ruby & ink, Garnet & sand — as build-time config), fluid type scale (`clamp()`, ≥1.25 ratio), spacing scale, radii (cards 12–16px), shadows, semantic z-index scale.
- **Component inventory:** `BaseLayout`, `Nav` (+ mobile drawer), `Footer`, `Button`, `SectionHeader`, `HeroDiagram` (animated), `ServiceCard`, `CaseCard`, `WorkCarousel` (island), `LogoCarousel` (island), `CompareTable` (+ responsive variant), `ApproachSteps` (with icon badges on inner page), `ContactForm` (island), `ImageFrame`.
- **Islands only where needed:** carousels + contact form. Everything else ships zero JS.

### B2. Routes (11 pages)
- `/` homepage
- `/services`, `/success-stories`, `/approach`, `/why-us`, `/contact`
- `/case-studies/[slug]` × 4 — life-insurer, healthcare-voice-ai, nooktek, radix-housing-analytics (one template, content-driven)

### B3. Responsive strategy
- Breakpoints: mobile `<640`, tablet `640–1024`, desktop `>1024`. Content max `1240px`, side padding `clamp(20px, 5vw, 40px)`.
- **Hero:** 2-col → stacked `<900`; H1 `clamp(2.5rem, 6vw, 4.25rem)`; diagram below copy on mobile.
- **Nav:** hamburger + accessible drawer (`<dialog>`/popover) below `900`.
- **Services:** `repeat(auto-fit, minmax(280px, 1fr))` — 3 → 2 → 1 with no breakpoints.
- **Work carousel:** desktop = transform slider; mobile = CSS scroll-snap, one card at a time.
- **Compare table:** the 5-col grid can't shrink — mobile becomes a stacked per-competitor accordion (AcePointe shown first/highlighted), or horizontal-scroll with a sticky label column. Recommend the stacked/accordion for readability.
- **Contact:** 2-col → stacked; dark bands just get responsive padding.

### B4. Contact form → HubSpot
- `/api/contact` endpoint: validate (required fields + email format) → **bot screening** (honeypot + submit-timing + hidden token; match the NookTek site's approach for consistency) → create/update HubSpot contact + attach a note (private-app token; needs HubSpot portal ID + token in env) → send a notification email via **Resend** to `info@acepointe.com` as backup/alert → return JSON.
- Client (island): progressive enhancement — inline validation, loading state on submit, explicit success and error states, focus management.
- **Needs from you:** HubSpot portal ID + private-app token (or form GUID), Resend domain verification for acepointe.com.

### B5. SEO, perf, launch
- Per-page `<title>`/meta/OpenGraph, `Organization` structured data, `sitemap`, `robots.txt`, favicon (have it).
- Astro `<Image>` for all raster assets; self-hosted fonts; Lighthouse budget (target 95+ perf/a11y/SEO).
- Hosting: static + serverless endpoint → **Cloudflare Pages or Vercel** (Astro adapter). Wire `acepointe.com` DNS.
- QA: cross-browser + full responsive pass; axe/a11y audit; test HubSpot submission end-to-end.

---

## Phases (homepage-first)

1. **Foundation** — Astro scaffold, tokens + 3-palette theme, self-hosted fonts, `BaseLayout` + `Nav` + `Footer`, `Button`/`SectionHeader` primitives, asset pipeline (self-host all logos + favicon, download NookTek logo).
2. **Homepage** — all sections responsive + accessible; rebuild hero diagram as animated SVG/HTML; carousels as a11y islands; responsive compare table; motion pass. **← first shippable milestone.**
3. **Contact form** — HubSpot endpoint + validation + bot screening + states + Resend fallback.
4. **Case-study template** — `/case-studies/[slug]` from content collection; 4 studies; cross-links.
5. **Inner pages** — Services, Success Stories, Approach (icon badges), Why Us, Contact.
6. **Polish + launch** — SEO/meta/OG/sitemap, drop in real metrics + approved narratives + confirmed logos, cross-browser/responsive/a11y QA, analytics, deploy.

---

## Decisions still needed from you (don't block the start)
- **Real metrics + case narratives** (currently placeholders) — needed before launch, not before build starts.
- **HubSpot** portal ID + private-app token (or form GUID); **Resend** domain verification for acepointe.com.
- **Font direction:** confirm Bricolage Grotesque (default) or the Schibsted Grotesk alternative.
- **Real case-study screenshots** for the elevated imagery (Radix dashboards, NookTek platform, etc.); crafted SVG stand-ins used until they arrive.
- **Hosting** target (Cloudflare Pages vs Vercel) + `acepointe.com` DNS access.
