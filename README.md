# Dr. Stephen Asatsa — Website (cPanel edition)

Next.js 15 site for [stephenasatsa.com](https://stephenasatsa.com): public pages, research hub, contact form, and admin API — **optimized for cPanel shared hosting**.

## Stack

- **Next.js 15** + React 19 + Tailwind CSS
- **NextAuth** (Google OAuth + admin email/password)
- **Prisma** + **MySQL** (cPanel default)
- **JSON content** in `lib/content/` (works without DB for static sections)
- Contact messages → `data/contact-submissions.json`

No Flask. No second server process.

## Local development

```bash
cp .env.example .env
npm install
npx prisma db push   # optional if DATABASE_URL set
npm run dev
```

Open http://localhost:3000

## Production on cPanel

See **[CPANEL.md](./CPANEL.md)** for full steps.

Quick summary:

1. Upload source to `~/stephenasatsa`
2. cPanel → **Setup Node.js App** → startup file **`server.js`**
3. Set `.env` (MySQL, `NEXTAUTH_*`, `ADMIN_*`)
4. `npm install` → `npx prisma db push` → `npm run build` → **Restart**

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server (uses `PORT`) |
| `npm run prisma:push` | Apply schema to MySQL |

## Pages

- `/` — Home
- `/about`, `/services`, `/gallery`, `/contact`
- `/research-hub` — Research showcase
- `/signin` — User / admin login
- `/admin` — Admin dashboard (ADMIN role)

## Repository

https://github.com/Cyberverse-cent0/from-cursor
