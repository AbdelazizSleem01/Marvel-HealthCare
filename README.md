# Marvel Group — Premium Healthcare Website

A world-class corporate portfolio + lead generation platform built with Next.js 16, TypeScript, Tailwind CSS, and MongoDB.

## Quick Start

```bash
npm install
cp .env.example .env.local   # configure MongoDB URI + admin password
npm run dev
```

## Pages
- `/`         → Home (hero, companies, branches, partners, accreditations, portfolio, products, testimonials)
- `/work`     → Portfolio with masonry grid + category filters + project modals
- `/products` → AREEP, MAHER, DynaSync, WaselMail showcase
- `/about`    → Mission, timeline, values, accreditations
- `/contact`  → Lead capture form → MongoDB
- `/admin`    → Password-protected CMS (default pw: marvel2025)

## Stack
Next.js 16 · TypeScript · Tailwind CSS · MongoDB/Mongoose · next-themes · react-icons · Framer Motion · SweetAlert2

## Deploy to Vercel
Set env vars: MONGODB_URI, NEXT_PUBLIC_ADMIN_PASSWORD, NEXT_PUBLIC_APP_URL
