# Ariosa & Constructions LLC

Professional multi-page construction & subcontracting website for Southwest Florida.

**Brand:** Building Dreams. Delivering Quality.  
**Phone:** (786) 786-5837 · **Email:** ariosaconstructions@gmail.com  
**Domain:** https://ariosaconstructions.com

## How content works

| Mode | When | Behavior |
|------|------|----------|
| **Seed / hardcoded** | No `DATABASE_URL`, or `USE_DATABASE=false` | Public site reads `src/lib/seed-data.ts` |
| **CMS (database)** | `DATABASE_URL` set (Neon Postgres) | Admin edits drive the live site |

Admin UI is at `/admin` (login works from env even without a database).  
**Saves only stick on the public site after Neon is connected and seeded.**

## Turn on the full CMS (required for editing the live site)

1. Create a free Postgres database at [Neon](https://neon.tech) → copy the connection string.
2. In **Vercel → Project → Settings → Environment Variables**, set:

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | Neon connection string (`?sslmode=require`) |
| `USE_DATABASE` | Leave unset, or `true` (set `false` only to force seed content) |
| `AUTH_SECRET` | Long random string |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `NEXT_PUBLIC_SITE_URL` | `https://ariosaconstructions.com` |
| `BLOB_READ_WRITE_TOKEN` | From Vercel → Storage → Blob (for production photo uploads) |
| `CONTACT_TO_EMAIL` | `ariosaconstructions@gmail.com` |
| `RESEND_API_KEY` | Optional — lead email notifications |

3. From your machine (with `DATABASE_URL` in `.env`):

```bash
npm run db:push
npm run db:seed
```

4. Redeploy on Vercel. Open `/admin` → Dashboard should say **Database: Connected**.

### What you can edit in admin

- **Site Settings** — phone, email, hero, about, map, trust badges, social
- **Projects** — create/edit, before/after, gallery photos, walkthrough video, featured
- **Services** — create/edit, images, order, publish
- **Testimonials** — add / edit / delete
- **Service Areas** — cities on the map & footer
- **Media** — upload photos (Blob in production; `/uploads` locally without Blob)
- **Leads** — estimate & contact inbox

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  

## Custom domain

1. Vercel → Domains → add `ariosaconstructions.com` and `www`
2. Point DNS at your registrar as Vercel instructs
3. Set `NEXT_PUBLIC_SITE_URL=https://ariosaconstructions.com` and redeploy

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + Neon Postgres (CMS)
- Auth.js credentials for `/admin`
- Vercel Blob + Resend (optional)
