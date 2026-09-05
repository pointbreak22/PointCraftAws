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
nano .env   # fill in JWT_* once you have an identity provider; ALLOWED_ORIGIN already matches the domain
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

```bash
git pull
docker compose up -d --build
```

## 5. Backing up the SQLite database

```bash
docker run --rm -v pointcraft_api_data:/data -v "$PWD":/backup alpine \
  tar czf /backup/pointcraft-db-backup.tar.gz -C /data .
```

(Volume name may be prefixed with the project/folder name — check `docker volume ls` if this fails.)

## 6. Domain + HTTPS

The site runs on `pointcraft.duckdns.org` (DuckDNS, pointed at the VM's IP — AWS's free EC2
public DNS/IP can't get a Let's Encrypt cert, and there's no paid domain yet). `Caddyfile` is
already configured for this domain, so Caddy requests and renews the certificate automatically.

If the VM's IP ever changes (e.g. after a full Stop/Start without an Elastic IP), update the
A record on [duckdns.org](https://www.duckdns.org) to the new IP — no other config changes needed.

To switch to a real registered domain later: update the DNS A record, replace
`pointcraft.duckdns.org` in `Caddyfile` and `ALLOWED_ORIGIN` in `.env` with the new domain,
`docker compose restart caddy && docker compose up -d api`.

## Notes

- **`my-aws-key.pem`**: this is your SSH private key. Never commit it, never copy it into a
  Docker image. Keep it out of the repo (ideally move it to `~/.ssh/` locally) and
  `chmod 400 my-aws-key.pem`.
- **Migrations**: `Program.cs` applies EF Core migrations on every startup, so there's no
  separate migration step — just restart the `api` container after a schema change.
- **Swapping SQLite for Postgres later**: only `Infrastructure/DependencyInjection.cs`
  (the `UseSqlite(...)` call) and the connection string need to change; everything else
  (repositories, controllers) is provider-agnostic EF Core.
