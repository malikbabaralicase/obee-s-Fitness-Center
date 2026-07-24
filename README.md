# Obee's Fitness Center — Premium Cinematic Website

A production-ready, single-page luxury experience for **Obee's Fitness Center** (Rawalpindi). Built to feel like a $5,000 custom site: cinematic scroll storytelling, a procedural Three.js hero sculpture, buttery GSAP + Framer Motion animation, a custom cursor, and a fully validated SMTP-backed contact form.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript** (strict)
- **Tailwind CSS 3.4** — amber re-skin of the NVIDIA design system (2px radius, single accent, hairline cards)
- **Three.js + React Three Fiber + drei** — procedural hero (metallic rings, energy waves, particles, dynamic lights)
- **GSAP + ScrollTrigger** + **Lenis** — cinematic smooth scroll
- **Framer Motion** — reveals, stagger, micro-interactions
- **react-hook-form + Zod** — shared client/server validation
- **nodemailer** — SMTP delivery for the contact form
- **lucide-react** — icons

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

## Contact Form (SMTP)

The form validates on the client and re-validates on the server (`app/api/contact/route.ts`) before sending mail via SMTP.

1. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your SMTP credentials (Gmail app password, Zoho, Hostinger, etc.):
   ```
   SMTP_HOST=smtp.yourprovider.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=you@yourdomain.com
   SMTP_PASS=your-app-password
   SMTP_FROM="Obee's Fitness Center <no-reply@yourdomain.com>"
   CONTACT_TO=where-you-receive@yourdomain.com
   NEXT_PUBLIC_SITE_URL=https://www.obeesfitness.com
   ```

> Without these, the site still builds and runs — the form returns a graceful
> "email service not configured" message pointing users to phone/WhatsApp.

## Accessibility & Performance

- WCAG 2.2 AA: semantic landmarks, single `h1`, keyboard nav, amber focus rings, skip link.
- `prefers-reduced-motion` fully honored — disables Lenis, GSAP, the WebGL canvas (static poster), and the custom cursor.
- Three.js is dynamically imported (`ssr: false`), DPR-capped, and pauses when the tab is hidden.
- SEO: metadata, canonical, Open Graph + Twitter (branded `public/og.png`), `public/robots.txt`, `public/sitemap.xml`, and `HealthClub`/`LocalBusiness` JSON-LD.

> **Changing the domain:** update `NEXT_PUBLIC_SITE_URL` **and** the hard-coded
> URL inside `public/robots.txt` and `public/sitemap.xml` (these are static
> files rather than generated routes — see note below).

> **Note on static SEO files:** `robots.txt`, `sitemap.xml`, `og.png` and the
> favicon live in `public/` rather than using Next's `app/` metadata-route
> conventions. Next.js 14's metadata-route code generator breaks when the
> project's absolute path contains an apostrophe (as in `Obee's Fitness
> Center`), so the static-file approach is used deliberately here.

## Project Structure

```
app/            layout, page, globals.css, api/contact
public/         robots.txt, sitemap.xml, og.png, favicon.svg
components/
  three/        procedural hero scene
  sections/     Hero, About, Membership, Contact, Footer
  ui/           Button, MagneticButton, Reveal, Counter, CornerSquare, ...
  providers/    SmoothScroll (Lenis+GSAP), Providers (MotionConfig + cursor)
  cursor/ nav/ loader/ seo/
hooks/          useMagnetic, useReducedMotion, useMediaQuery
lib/            constants, schema (zod), motion (variants), smtp, cn
```
