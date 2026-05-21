# Deploy on cPanel (single Next.js app)

This project is **cPanel-ready**: one Node.js application, no Flask, no second port.

## Git deployment (recommended)

This repo includes **`.cpanel.yml`** for cPanel **Git™ Version Control** push/pull deploy.

### Requirements (cPanel)

- `.cpanel.yml` in the repository root (committed)
- At least one branch
- Clean working tree before deploy in the cPanel UI

### One-time setup

1. **Setup Node.js App** (create before first Git deploy):
   - Application root: `stephenasatsa` → `$HOME/stephenasatsa`
   - Startup file: **`server.js`**
   - Node.js **18** or **20**
2. **Git Version Control** → Clone:
   - URL: `https://github.com/Cyberverse-cent0/from-cursor.git`
   - Repository path: e.g. `repositories/from-cursor` (cPanel default is fine)
3. On the server, create **`~/stephenasatsa/.env`** from `.env.example` (deploy never overwrites `.env`).
4. Create MySQL DB and set `DATABASE_URL` in `.env`.

### What `.cpanel.yml` does

| Step | Action |
|------|--------|
| Sync | `rsync` from Git repo → `~/stephenasatsa` (skips `.git`, `node_modules`, `.next`, `.env`, `data/`) |
| Build | `npm install` → `prisma db push` (non-fatal if DB missing) → `npm run build` |
| Restart | `tmp/restart.txt` + CloudLinux Node restart when available |

### Deploy methods

- **Push**: Add cPanel remote, `git push` to the managed repo → hook runs `.cpanel.yml` automatically.
- **Pull**: Push to GitHub → in cPanel **Update from Remote** → **Deploy HEAD Commit**.

### Customize paths

Edit `.cpanel.yml` if your Node app root is not `stephenasatsa`:

- Change `APP_ROOT` and `app-root` in the `cloudlinux-selector` line.
- If Git clone path **is** the app root (same folder), set `APP_ROOT=.` and comment out the `rsync` line; run install/build in `$PWD` instead.

## 1. Upload source (manual alternative)

Upload the repo (without `node_modules` or `.next`) to e.g. `/home3/USER/stephenasatsa`.

Or clone from GitHub:

```bash
cd ~
git clone https://github.com/Cyberverse-cent0/from-cursor.git stephenasatsa
cd stephenasatsa
```

## 2. Create MySQL database

cPanel → **MySQL Databases** → create database and user → add user to database.

Copy the connection string into `.env`:

```env
DATABASE_URL="mysql://USER:PASS@localhost:3306/DBNAME"
```

## 3. Environment file

```bash
cp .env.example .env
nano .env
```

Required:

- `NEXTAUTH_URL` — `https://yourdomain.com`
- `NEXTAUTH_SECRET` — long random string
- `NEXT_PUBLIC_SITE_URL` — same as domain
- `DATABASE_URL` — MySQL from cPanel
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — for `/admin` login

## 4. Setup Node.js application

cPanel → **Setup Node.js App** → **Create Application**

| Field | Value |
|--------|--------|
| Node.js version | **18** or **20** |
| Application mode | **Production** |
| Application root | `stephenasatsa` (folder with `package.json`) |
| Application URL | your domain |
| Application startup file | **`server.js`** |

Click **Create**, then in the app panel:

1. **Run NPM Install**
2. Open **Terminal** (or SSH):

   ```bash
   source ~/nodevenv/stephenasatsa/XX/bin/activate
   cd ~/stephenasatsa
   npx prisma db push
   npm run build
   ```

3. **Restart** the Node.js app

Startup uses `server.js`, which runs `next start` on the port cPanel assigns.

## 5. Verify

- https://yourdomain.com — homepage
- https://yourdomain.com/contact — contact form (saves to `data/contact-submissions.json`)
- https://yourdomain.com/signin — Google or admin email/password
- https://yourdomain.com/admin — dashboard (admin role)

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `node: command not found` | Activate `~/nodevenv/.../bin/activate` or use cPanel **Run NPM Install** |
| `fork: Resource temporarily unavailable` | Close extra SSH sessions; ask host to raise process limits |
| Build runs out of memory | Run `npm run build` on your PC, upload `.next` folder |
| Images 404 | Set `CPANEL_IMAGE_UNOPTIMIZED=true` in `.env` |
| Prisma errors | Check `DATABASE_URL` and run `npx prisma db push` |

## What we removed for cPanel

- Flask backend (`backend/` is legacy — not started on cPanel)
- API rewrite to `localhost:5001`
- systemd / nginx configs (host manages Apache + Node proxy)
