# Deploying PointCraft to a single Ubuntu VM

Stack: `docker-compose.yml` runs three containers — `api` (.NET 10), `client` (Angular SSR),
and `caddy` (reverse proxy on port 80/443). SQLite lives in the `api_data` named volume.

## 1. One-time VM setup (Ubuntu, 8GB RAM)

On the EC2 instance's **security group**, allow inbound:
- 22 (SSH) — ideally restricted to your IP
- 80 (HTTP) and 443 (HTTPS)

SSH in and install Docker:

```bash
ssh -i my-aws-key.pem ubuntu@<VM_IP>

sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker
```

## 2. Get the code onto the VM

```bash
git clone <your-repo-url> pointcraft
cd pointcraft
cp .env.example .env
nano .env   # fill in JWT_SIGNING_KEY/ADMIN_* (see "Admin login" below); ALLOWED_ORIGIN already matches the domain
```

If the code isn't in a git remote yet, `rsync`/`scp` the project folder instead.

## 3. Build and run

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f api   # confirm "Applying migration..." / no errors
```

Visit `https://pointcraft.duckdns.org/` for the app, `https://pointcraft.duckdns.org/api/...` for API routes.

## 4. Redeploying after code changes

**Automatic** — `.github/workflows/deploy.yml` builds the `api`/`client` images on GitHub's
runners (not the VM — it's too small/slow for this, see below), pushes them to GHCR, then SSHes
into the VM to pull and restart. Just push to `main`; nothing to do on the VM.

One-time setup this required:
- `VM_SSH_KEY` repo secret — a **dedicated** deploy keypair (not `my-aws-key.pem`), public half
  appended to the VM's `~/.ssh/authorized_keys`. Keeping it separate means a leaked Actions
  secret can't be used to fully administer the VM the way the real key can.
- After the very first successful workflow run, the two GHCR packages are created as **private**
  by default — go to your GitHub profile → Packages → each package → Package settings → change
  visibility to Public, so `docker compose pull` on the VM doesn't need any registry credentials.

Manual fallback (e.g. workflow is down, or testing a change before pushing):

```bash
git pull
docker compose up -d --build
```

## 5. Backing up the SQLite database

One-off manual backup:

```bash
docker run --rm -v pointcraft_api_data:/data -v "$PWD":/backup alpine \
  tar czf /backup/pointcraft-db-backup.tar.gz -C /data .
```

(Volume name may be prefixed with the project/folder name — check `docker volume ls` if this fails.)

For a backup that actually survives losing the VM/disk, see "Automated backups to S3" below.

## 6. Domain + HTTPS

The site runs on `pointcraft.duckdns.org` (DuckDNS, pointed at the VM's IP — AWS's free EC2
public DNS/IP can't get a Let's Encrypt cert, and there's no paid domain yet). `Caddyfile` is
already configured for this domain, so Caddy requests and renews the certificate automatically.

If the VM's IP ever changes (e.g. after a full Stop/Start without an Elastic IP), update the
A record on [duckdns.org](https://www.duckdns.org) to the new IP — no other config changes needed.

To switch to a real registered domain later: update the DNS A record, replace
`pointcraft.duckdns.org` in `Caddyfile` and `ALLOWED_ORIGIN` in `.env` with the new domain,
`docker compose restart caddy && docker compose up -d api`.

## 7. Admin login

There's exactly one admin account (no AWS Cognito/external identity provider) — the API issues
its own JWT from `POST /api/auth/login`, validated against a local signing key. Setup or
changing the password both work the same way — generate a fresh signing key + password hash and
overwrite `.env`:

```bash
mkdir -p /tmp/pc-keygen && cd /tmp/pc-keygen
dotnet new console -o .
dotnet add package Microsoft.Extensions.Identity.Core
cat > Program.cs <<'EOF'
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
var hasher = new PasswordHasher<object>();
Console.WriteLine("PASSWORD_HASH=" + hasher.HashPassword(new object(), "<your chosen password>"));
Console.WriteLine("SIGNING_KEY=" + Convert.ToBase64String(RandomNumberGenerator.GetBytes(48)));
EOF
dotnet run
```

Put the two printed values into `~/pointcraft/.env` as `JWT_SIGNING_KEY` and
`ADMIN_PASSWORD_HASH`, set `ADMIN_USERNAME` to whatever username you want, then
`docker compose up -d api`. Changing `JWT_SIGNING_KEY` invalidates every previously issued
token, so anyone logged in gets signed out.

## 8. Telegram notifications for new contact requests

Every submitted "Discuss your project" form fires a Telegram message (best-effort — a failed
or unconfigured Telegram send never blocks saving the request). Setup:

1. **Create the bot.** In Telegram, message [@BotFather](https://t.me/BotFather), send
   `/newbot`, follow the prompts (name, username). It replies with a **bot token**
   (looks like `123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`).
2. **Start a chat with your new bot** (search its username, press Start, send it any message —
   e.g. "hi") so it's allowed to message you back.
3. **Get your chat ID.** Open this URL in a browser (replace `<TOKEN>`):
   `https://api.telegram.org/bot<TOKEN>/getUpdates` — after step 2 it returns JSON containing
   `"chat":{"id":123456789,...}`. That number is your **chat ID**.
4. On the VM, in `~/pointcraft/.env`, set:
   ```
   TELEGRAM_BOT_ENABLED=true
   TELEGRAM_BOT_TOKEN=<the bot token>
   ```
5. **Add a recipient row.** Unlike the token, recipients live in the `TelegramSubscribers`
   table (Domain/Entities/TelegramSubscriber.cs), not in `.env` — this is what lets you add
   more people later, or split by notification type (`Requests`, `Logs`, `All`) instead of
   everyone getting everything. Insert one row per recipient:
   ```bash
   docker exec -it pointcraft-api-1 sqlite3 /data/pointcraft.db \
     "INSERT INTO TelegramSubscribers (Id, Name, Username, Type, ChatId, CreatedAtUtc) \
      VALUES (lower(hex(randomblob(16))), 'Your Name', '@yourhandle', 'All', '<your chat id>', datetime('now'));"
   ```
   (`sqlite3` isn't in the api image — if the command above says "not found," run it via a
   throwaway container instead: `docker run --rm -v pointcraft_api_data:/data alpine sh -c
   "apk add --no-cache sqlite >/dev/null && sqlite3 /data/pointcraft.db \"...\""`.)
6. `docker compose up -d api` (recreates the container with the new env vars).

Test it by submitting the contact form on the site — a message should arrive in the chat with
the bot within a couple seconds.

## 9. Automated backups to S3

`scripts/backup-to-s3.sh` snapshots the SQLite DB via `sqlite3 .backup` (safe under concurrent
writes, unlike copying the raw file), gzips it, and uploads it to S3 — all through throwaway
containers, nothing extra installed on the VM.

Setup:

1. **Create an S3 bucket** and an IAM user scoped to only that bucket — attach an inline
   policy like:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": ["s3:PutObject", "s3:GetObject", "s3:ListBucket"],
       "Resource": ["arn:aws:s3:::YOUR_BUCKET", "arn:aws:s3:::YOUR_BUCKET/*"]
     }]
   }
   ```
   Deliberately no `s3:DeleteObject` — a leaked key still can't wipe existing backups.
2. In `~/pointcraft/.env`, set `S3_BACKUP_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
   `AWS_DEFAULT_REGION`.
3. Test it once: `bash scripts/backup-to-s3.sh` — should print `Backup uploaded: s3://...`.
4. Schedule it daily via cron:
   ```bash
   crontab -e
   # add:
   0 3 * * * /bin/bash /home/ubuntu/pointcraft/scripts/backup-to-s3.sh >> /home/ubuntu/pointcraft/backup.log 2>&1
   ```
5. **Retention** — the IAM user can't delete objects, so old backups won't clean themselves up
   automatically. Set an S3 lifecycle rule instead (bucket → Management → Create lifecycle
   rule → expire objects after e.g. 30 days) — this is bucket-level config done as the account
   owner, so it doesn't need any extra permission on the restricted key.

To restore: download a `.gz` from the bucket, `gunzip` it, then copy it into the `api_data`
volume as `pointcraft.db` (with the `api` container stopped) and restart.

## Notes

- **`my-aws-key.pem`**: this is your SSH private key. Never commit it, never copy it into a
  Docker image. Keep it out of the repo (ideally move it to `~/.ssh/` locally) and
  `chmod 400 my-aws-key.pem`.
- **Migrations**: `Program.cs` applies EF Core migrations on every startup, so there's no
  separate migration step — just restart the `api` container after a schema change.
- **Swapping SQLite for Postgres later**: only `Infrastructure/DependencyInjection.cs`
  (the `UseSqlite(...)` call) and the connection string need to change; everything else
  (repositories, controllers) is provider-agnostic EF Core.
