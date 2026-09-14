# Ariosa & Constructions LLC

Professional multi-page construction & subcontracting website for Southwest Florida.

**Brand:** Building Dreams. Delivering Quality.  
**Phone:** (786) 786-5837 · **Email:** ariosaconstructions@gmail.com  
**Domain:** https://ariosaconstructions.com

## How content works

The site runs on **hardcoded content** in `src/lib/seed-data.ts`.  
No database is required to develop or deploy.

## Required Vercel environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `AUTH_SECRET` | **Yes** | Long random string for Auth.js |
| `ADMIN_EMAIL` | **Yes** | Admin login email |
| `ADMIN_PASSWORD` | **Yes** | Admin login password |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | `https://ariosaconstructions.com` |
| `USE_DATABASE` | Recommended | Set to `false` until Neon is ready |
| `CONTACT_TO_EMAIL` | Recommended | `ariosaconstructions@gmail.com` |
| `DATABASE_URL` | Later | Only when enabling the CMS database |
| `RESEND_API_KEY` | Optional | Email notifications for leads |
| `BLOB_READ_WRITE_TOKEN` | Optional | Admin media uploads |

## Custom domain (ariosaconstructions.com)

1. In Vercel → Project → **Settings → Domains** → add `ariosaconstructions.com` and `www.ariosaconstructions.com`
2. At your domain registrar, point DNS as Vercel instructs (usually A/CNAME records)
3. Set `NEXT_PUBLIC_SITE_URL=https://ariosaconstructions.com` in Vercel env vars
4. Redeploy

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Hardcoded site content (Prisma/Neon ready for later)
- Auth.js credentials for `/admin`
- Vercel Blob + Resend (optional)
