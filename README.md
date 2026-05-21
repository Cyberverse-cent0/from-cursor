# Dr. Stephen Asatsa — Website

Next.js application for [stephenasatsa.com](https://stephenasatsa.com): public site, research hub, and admin APIs.

## Requirements

- Node.js 18+ and npm
- MySQL (recommended for production / cPanel) or PostgreSQL (update `prisma/schema.prisma`)

## Quick start

```bash
cp .env.example .env
# Edit .env with your database and auth secrets

npm install
npx prisma generate
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Deploy (source-only package)

From the parent monorepo, pack without `node_modules` or `.next`:

```bash
tar -czf stephenasatsa-source.tar.gz \
  --exclude=node_modules --exclude=.next --exclude=backend/venv \
  .
```

On the server: extract, `npm install`, `npm run build`, then configure cPanel **Setup Node.js App** or `npm start`.

## Structure

- `app/` — Next.js App Router pages and API routes
- `components/` — React UI
- `lib/` — Auth, content, utilities
- `prisma/` — Database schema
- `backend/` — Legacy Flask API (optional; prefer Next.js `app/api` on cPanel)

## License

Private / project-specific — see repository owner.
