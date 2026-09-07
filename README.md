# Ariosa & Constructions LLC

Professional multi-page construction website. Built for Vercel.

**Brand:** Building Dreams. Delivering Quality.  
**Phone:** (786) 786-5837 · **Email:** ariosaconstructions@gmail.com

## How content works right now

The site runs on **hardcoded content** in `src/lib/seed-data.ts`.  
No database is required to develop or deploy.

Later, connect Neon Postgres and set:

```
USE_DATABASE=true
DATABASE_URL=...
```

Then run `npm run db:push && npm run db:seed` to load the same content into the CMS.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Hardcoded site content (Prisma/Neon ready for later)
- Auth.js credentials for `/admin`
- Vercel Blob + Resend (optional)

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

- Site: http://localhost:3000  
- Admin login: http://localhost:3000/admin/login  
- Default: `admin@ariosaconstructions.com` / `ariosa-admin-change-me`

Admin CMS edits need `USE_DATABASE=true` + a real database. The public site works without it.

## Enable database later

1. Create a Neon Postgres database  
2. Set `DATABASE_URL` and `USE_DATABASE=true`  
3. Run:

```bash
npm run db:push
npm run db:seed
```

## Vercel deploy

1. Import this GitHub repo in Vercel  
2. Set at least: `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`  
3. Keep `USE_DATABASE=false` until Neon is ready  
4. Build command: `prisma generate && next build` (in `package.json`)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home |
| `/about` | About |
| `/services` | Services + detail |
| `/projects` | Gallery + before/after |
| `/contact` | Contact + map + estimate wizard |
| `/admin` | CMS (DB optional later) |
